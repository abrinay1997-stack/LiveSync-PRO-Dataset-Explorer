#!/usr/bin/env node
// Exporta el dataset a knowledge/concepts.jsonl (una línea JSON por concepto) para
// ingesta en la plataforma LiveSync Pro (RAG / Vectorize) y otras herramientas.
//
// Uso:  npm run export:knowledge      (equivale a: npx tsx scripts/export-knowledge.mjs)
// Requiere tsx porque importa directamente los módulos TypeScript del dataset.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acousticDataset } from '../data.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'knowledge', 'concepts.jsonl');

// ---------------------------------------------------------------------------
// LaTeX -> texto plano (subconjunto usado en el dataset)
// ---------------------------------------------------------------------------
const SYMBOLS = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', eta: 'η', theta: 'θ',
  kappa: 'κ', lambda: 'λ', mu: 'µ', nu: 'ν', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', phi: 'φ',
  varphi: 'φ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Sigma: 'Σ',
  Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
  cdot: '·', times: '×', div: '÷', pm: '±', mp: '∓', leq: '≤', le: '≤', geq: '≥', ge: '≥', neq: '≠',
  approx: '≈', sim: '~', simeq: '≃', lesssim: '≲', gtrsim: '≳', ll: '≪', gg: '≫', propto: '∝',
  infty: '∞', partial: '∂', nabla: '∇', sum: 'Σ', prod: 'Π', int: '∫', in: '∈', notin: '∉',
  rightarrow: '→', to: '→', leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔',
  leftrightarrow: '↔', uparrow: '↑', downarrow: '↓', circ: '°', degree: '°', dots: '…', ldots: '…',
  cdots: '⋯', mid: '|', vert: '|', lvert: '|', rvert: '|', lVert: '‖', rVert: '‖', langle: '⟨', rangle: '⟩',
  log: 'log', ln: 'ln', exp: 'exp', sin: 'sin', cos: 'cos', tan: 'tan', max: 'max', min: 'min', lim: 'lim',
  quad: ' ', qquad: ' ', ',': ' ', ';': ' ', ':': ' ', '!': '', ' ': ' ', '%': '%', '{': '{', '}': '}',
  '_': '_', '&': '&', '#': '#', '$': '$', '\\': '; ',
};
const DROP = new Set(['left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'displaystyle', 'limits', 'nolimits']);
const TEXT_LIKE = new Set(['text', 'mathrm', 'mathit', 'mathbf', 'mathsf', 'mathtt', 'operatorname', 'textrm', 'textit', 'textbf', 'boldsymbol']);
const ENVIRONMENTS = new Set(['gathered', 'aligned', 'cases', 'array', 'matrix', 'pmatrix', 'bmatrix', 'split']);

/** Lee un grupo {…} (o un único token) desde la posición i. Devuelve [contenido, nuevaPosición]. */
function readGroup(src, i) {
  while (src[i] === ' ') i++;
  if (src[i] === '{') {
    let depth = 1, j = i + 1;
    while (j < src.length && depth > 0) {
      if (src[j] === '\\') { j += 2; continue; }
      if (src[j] === '{') depth++;
      else if (src[j] === '}') depth--;
      j++;
    }
    return [src.slice(i + 1, j - 1), j];
  }
  if (src[i] === '\\') {
    const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i));
    return [m[0], i + m[0].length];
  }
  return [src[i] ?? '', i + 1];
}

const needsParens = (s) => !/^[\p{L}\p{N}.°′″_]+$/u.test(s);

function latexToText(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i));
      const cmd = m[1];
      i += m[0].length;
      if (cmd === 'frac' || cmd === 'dfrac' || cmd === 'tfrac') {
        const [num, a] = readGroup(src, i);
        const [den, b] = readGroup(src, a);
        i = b;
        const n = latexToText(num), d = latexToText(den);
        out += `${needsParens(n) ? `(${n})` : n}/${needsParens(d) ? `(${d})` : d}`;
      } else if (cmd === 'sqrt') {
        const [arg, a] = readGroup(src, i);
        i = a;
        out += `sqrt(${latexToText(arg)})`;
      } else if (cmd === 'bar' || cmd === 'overline' || cmd === 'hat' || cmd === 'vec' || cmd === 'tilde') {
        const [arg, a] = readGroup(src, i);
        i = a;
        const mark = { bar: '\u0304', overline: '\u0304', hat: '\u0302', vec: '\u20d7', tilde: '\u0303' }[cmd];
        out += latexToText(arg) + mark;
      } else if (TEXT_LIKE.has(cmd)) {
        const [arg, a] = readGroup(src, i);
        i = a;
        out += latexToText(arg);
      } else if (cmd === 'begin' || cmd === 'end') {
        const [env, a] = readGroup(src, i);
        i = a;
        if (!ENVIRONMENTS.has(env)) out += env;
        if (cmd === 'begin' && env === 'array') { const [, b] = readGroup(src, i); i = b; } // spec de columnas
      } else if (DROP.has(cmd)) {
        // \left( -> (
      } else if (cmd in SYMBOLS) {
        out += SYMBOLS[cmd];
      } else {
        out += cmd; // comando desconocido: conservar el nombre sin barra
      }
    } else if (ch === '^' || ch === '_') {
      const [arg, a] = readGroup(src, i + 1);
      i = a;
      const t = latexToText(arg);
      if (ch === '^' && (t === '°' || arg.trim() === '\\circ')) out += '°';
      else out += `${ch}${needsParens(t) ? `(${t})` : t}`;
    } else if (ch === '{' || ch === '}') {
      i++;
    } else if (ch === '&') {
      out += ' ';
      i++;
    } else if (ch === '~') {
      out += ' ';
      i++;
    } else {
      out += ch;
      i++;
    }
  }
  return out;
}

const cleanLatex = (tex) => tex.replace(/\$\$/g, '').trim();
const toText = (tex) =>
  latexToText(cleanLatex(tex))
    .replace(/\s+/g, ' ')
    .replace(/\s*;\s*;\s*/g, '; ')
    .replace(/\s+([,;)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim();

// ---------------------------------------------------------------------------
// Exportación
// ---------------------------------------------------------------------------
const splitAuthors = (autor) => (autor ? [autor] : []);

const records = acousticDataset.map((c) => {
  const ct = c.contenido_tecnico;
  const variables = Object.fromEntries(
    Object.entries(ct.variables).map(([name, description]) => [toText(name), description])
  );
  const source = {
    document: c.fuente.documento,
    authors: splitAuthors(c.fuente.autor),
    year: c.fuente.año,
    ...(c.fuente.seccion ? { section: c.fuente.seccion } : {}),
    ...(c.fuente.url ? { url: c.fuente.url } : {}),
    ...(c.fuente.doi ? { doi: c.fuente.doi } : {}),
  };
  return {
    id: c.id_concepto,
    title: c.titulo,
    category: c.categoria,
    type: c.tipo,
    definition: ct.definicion_detallada,
    formula_latex: cleanLatex(ct.formula_latex),
    formula_text: ct.formula_texto ?? toText(ct.formula_latex),
    variables,
    constraints: ct.restricciones,
    ...(ct.ejemplo ? { example: ct.ejemplo } : {}),
    source,
    tags: c.meta_tags,
    verified: c.verificado === true,
    ...(c.nota_verificacion ? { verification_note: c.nota_verificacion } : {}),
    ...(c.ids_fusionados?.length ? { merged_ids: c.ids_fusionados } : {}),
    dataset_version: c.version_dataset,
    language: 'es',
  };
});

// Comprobaciones de integridad: IDs únicos, sin LaTeX residual en el texto plano,
// y ninguna fuente atribuida a LiveSync Pro (regla de procedencia, ver CLAUDE.md).
const problems = [];
const seen = new Set();
for (const r of records) {
  if (seen.has(r.id)) problems.push(`ID duplicado: ${r.id}`);
  seen.add(r.id);
  if (r.formula_text.includes('\\')) problems.push(`${r.id}: formula_text contiene LaTeX sin convertir: ${r.formula_text}`);
  for (const k of Object.keys(r.variables)) if (k.includes('\\')) problems.push(`${r.id}: variable sin convertir: ${k}`);
  if (/livesync/i.test(JSON.stringify(r.source))) problems.push(`${r.id}: la fuente menciona LiveSync Pro`);
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, records.map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8');
const verified = records.filter((r) => r.verified).length;
console.log(`Exportados ${records.length} conceptos (${verified} verificados) -> ${OUT.replace(ROOT + '/', '')}`);
