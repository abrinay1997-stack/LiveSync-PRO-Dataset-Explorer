import React, { useState, useEffect, useMemo, useRef } from 'react';
import { acousticDataset, getDatasetStats } from './data';
import { Concept, ConceptType } from './types';
import { Search, Filter, Database, Info, Activity, Menu, X, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';

const CONCEPT_TYPES: ConceptType[] = ['Fórmula', 'Definición', 'Constante', 'Hallazgo'];

/** Logo de la marca; si el CDN externo falla se usa el icono local (public/favicon.svg). */
const LOGO_URL = 'https://hostedimages-cdn.aweber-static.com/MjM0MTQ0NQ==/optimized/20657f92efa544489526caee3beef9d2.png';
const LOGO_FALLBACK = 'favicon.svg'; // relativo al documento: vale en / y en /ciencia/
const useLocalLogo = (e: React.SyntheticEvent<HTMLImageElement>) => {
  if (!e.currentTarget.src.endsWith('favicon.svg')) e.currentTarget.src = LOGO_FALLBACK;
};

/** Resuelve un id de concepto (vigente o fusionado) para los enlaces profundos `#id`. */
const conceptById = new Map<string, Concept>();
for (const c of acousticDataset) conceptById.set(c.id_concepto, c);
for (const c of acousticDataset) for (const old of c.ids_fusionados ?? []) if (!conceptById.has(old)) conceptById.set(old, c);

const conceptFromHash = (): string | null => {
  let id = window.location.hash.slice(1);
  try { id = decodeURIComponent(id); } catch { return null; }
  return conceptById.get(id)?.id_concepto ?? null;
};

/** Texto en minúsculas y sin diacríticos, para que "presion" encuentre "presión". */
const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Versión en texto plano de la fórmula, usada como respaldo si KaTeX no está disponible. */
const plainFormula = (c: Concept) =>
  c.contenido_tecnico.formula_texto ?? c.contenido_tecnico.formula_latex.replace(/\$\$/g, '').trim();

/** Todo el texto buscable de un concepto, precalculado una sola vez. */
const searchIndex = new Map<string, string>(
  acousticDataset.map(c => {
    const ct = c.contenido_tecnico;
    const parts = [
      c.id_concepto, c.titulo, c.categoria, c.tipo, ...c.meta_tags,
      ct.definicion_detallada, ct.formula_texto ?? '', ct.restricciones, ct.ejemplo ?? '',
      ...Object.entries(ct.variables).flat(),
      c.fuente.documento, c.fuente.autor ?? '', String(c.fuente.año),
      ...(c.ids_fusionados ?? []),
    ];
    return [c.id_concepto, normalize(parts.join(' \u0000 '))];
  })
);

type KatexWindow = Window & { katex?: { renderToString: (tex: string, opts: object) => string } };

const KATEX_MAX_WAIT_MS = 8000;

const MathRenderer: React.FC<{ tex: string; fallback: string }> = ({ tex, fallback }) => {
  const [html, setHtml] = useState<string>('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    setHtml('');
    setFailed(false);

    const renderMath = () => {
      if (cancelled) return;
      const katex = (window as KatexWindow).katex;
      if (katex) {
        try {
          const cleanTex = tex.replace(/\$\$/g, '').trim();
          setHtml(katex.renderToString(cleanTex, { throwOnError: false, displayMode: true, strict: false }));
        } catch {
          setFailed(true);
        }
      } else if (Date.now() - started < KATEX_MAX_WAIT_MS) {
        // El script de KaTeX se carga con `defer`; se reintenta con un límite de tiempo.
        timer = setTimeout(renderMath, 150);
      } else {
        setFailed(true);
      }
    };
    renderMath();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [tex]);

  if (failed) {
    return (
      <code className="block my-4 text-xs font-mono text-cyan-400/80 whitespace-pre-wrap break-words" title="KaTeX no disponible: fórmula en texto plano">
        {fallback}
      </code>
    );
  }
  if (!html) return <div className="h-16 flex items-center justify-center text-slate-800 animate-pulse" aria-hidden="true">...</div>;
  return <div className="my-2 overflow-x-auto" role="math" aria-label={fallback} dangerouslySetInnerHTML={{ __html: html }} />;
};

const ReadingProgress: React.FC<{ contentKey: string }> = ({ contentKey }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const mainArea = document.getElementById('main-content');
    if (!mainArea) return;

    const update = () => {
      const scrollable = mainArea.scrollHeight - mainArea.clientHeight;
      // Sin contenido desplazable (p. ej. pocos resultados) no hay progreso que mostrar.
      const progress = scrollable > 0 ? (mainArea.scrollTop / scrollable) * 100 : 0;
      setWidth(Math.min(100, Math.max(0, progress)));
    };

    update();
    mainArea.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      mainArea.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [contentKey]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[110]"
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-500 transition-all duration-150 shadow-[0_0_10px_#06b6d4]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const ConceptCard: React.FC<{ concept: Concept; index: number }> = ({ concept, index }) => {
  const colorMap: Record<ConceptType, string> = {
    'Fórmula': 'text-cyan-400 border-cyan-400/20',
    'Definición': 'text-emerald-400 border-emerald-400/20',
    'Constante': 'text-amber-400 border-amber-400/20',
    'Hallazgo': 'text-purple-400 border-purple-400/20'
  };
  const ct = concept.contenido_tecnico;
  const { fuente } = concept;
  const sourceLink = fuente.url ?? (fuente.doi ? `https://doi.org/${fuente.doi}` : undefined);
  const variables = Object.entries(ct.variables);

  return (
    <article
      className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group flex flex-col h-full animate-slide-up"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      aria-labelledby={`title-${concept.id_concepto}`}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:bg-cyan-400 transition-colors" aria-hidden="true"></div>

      <div className="flex justify-between items-start mb-6 gap-4">
        <div className="flex flex-col min-w-0">
          <a
            href={`#${concept.id_concepto}`}
            className="text-[9px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-[0.15em] mb-1 break-all transition-colors"
            title="Enlace directo a este concepto"
          >
            ID: {concept.id_concepto}
          </a>
          <div className="flex gap-2 items-center flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true"></span>
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
              Dataset v{concept.version_dataset}
            </span>
            {concept.verificado && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest" title="Fórmula contrastada con la referencia y ejemplo verificado numéricamente">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Verificado
              </span>
            )}
          </div>
        </div>
        <span className={`shrink-0 text-[10px] font-bold px-3 py-1 rounded-full border bg-white/5 uppercase tracking-widest ${colorMap[concept.tipo]}`}>
          {concept.tipo}
        </span>
      </div>

      <h3 id={`title-${concept.id_concepto}`} className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
        {concept.titulo}
      </h3>
      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-[0.1em] mb-1">
        {sourceLink ? (
          <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors inline-flex items-start gap-1">
            <span>{fuente.documento} • {fuente.año}</span>
            <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="sr-only">(abre la fuente en una pestaña nueva)</span>
          </a>
        ) : (
          <>{fuente.documento} • {fuente.año}</>
        )}
      </p>
      {(fuente.autor || fuente.seccion) && (
        <p className="text-[11px] text-slate-400 mb-6">
          {fuente.autor && <><span className="text-slate-600">Autor: </span>{fuente.autor}</>}
          {fuente.autor && fuente.seccion && ' · '}
          {fuente.seccion && <><span className="text-slate-600">Sección: </span>{fuente.seccion}</>}
        </p>
      )}
      {!(fuente.autor || fuente.seccion) && <div className="mb-6" />}

      <div className="flex-1">
        <p className="text-slate-400 text-sm leading-[1.7] mb-6">
          {ct.definicion_detallada}
        </p>
        <MathRenderer tex={ct.formula_latex} fallback={plainFormula(concept)} />

        {ct.restricciones && (
          <div className="mt-4">
            <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Restricciones y validez</span>
            <p className="text-xs text-slate-400 leading-relaxed">{ct.restricciones}</p>
          </div>
        )}

        {ct.ejemplo && (
          <div className="mt-4 bg-cyan-500/[0.03] border border-cyan-500/10 rounded-xl p-4">
            <span className="block text-[9px] font-black text-cyan-600 uppercase tracking-widest mb-2">Ejemplo resuelto</span>
            <p className="text-xs text-slate-300 leading-relaxed">{ct.ejemplo}</p>
          </div>
        )}

        {concept.nota_verificacion && (
          <div className="mt-4 flex gap-2 items-start bg-amber-500/[0.04] border border-amber-500/15 rounded-xl p-4" role="note">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[11px] text-amber-200/80 leading-relaxed">{concept.nota_verificacion}</p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="sm:col-span-2">
          <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Variables</span>
          {variables.length === 0 ? (
            <span className="text-[11px] text-slate-600">—</span>
          ) : (
            <dl className="space-y-1.5">
              {variables.map(([name, description]) => (
                <div key={name} className="flex gap-2 items-baseline">
                  <dt className="shrink-0">
                    <code className="text-[10px] font-mono text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                      {name}
                    </code>
                  </dt>
                  <dd className="text-[11px] text-slate-400 leading-snug">{description}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="sm:text-right">
          <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Categoría</span>
          <span className="text-xs text-slate-300 font-semibold">{concept.categoria}</span>
        </div>
      </div>
    </article>
  );
};

export default function App() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [sourceFilter, setSourceFilter] = useState<string>('Todas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(() => conceptFromHash());
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const stats = useMemo(() => getDatasetStats(), []);
  const sources = useMemo(() => Array.from(new Set(acousticDataset.map(d => d.fuente.documento))), []);

  // Enlaces profundos: #id_concepto muestra solo ese concepto (lo usan el manual y las citas de la IA).
  useEffect(() => {
    const onHash = () => setFocusId(conceptFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const clearFocus = () => {
    setFocusId(null);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  const filtered = useMemo(() => {
    if (focusId) return acousticDataset.filter(c => c.id_concepto === focusId);
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return acousticDataset.filter(c => {
      const haystack = searchIndex.get(c.id_concepto) ?? '';
      const matchesQuery = terms.every(t => haystack.includes(t));
      const matchesType = typeFilter === 'Todos' || c.tipo === typeFilter;
      const matchesSource = sourceFilter === 'Todas' || c.fuente.documento === sourceFilter;
      return matchesQuery && matchesType && matchesSource;
    });
  }, [query, typeFilter, sourceFilter, focusId]);

  // Cerrar el menú lateral con Escape (móvil).
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSidebarOpen]);

  const handleSourceSelect = (s: string) => {
    if (focusId) clearFocus();
    setSourceFilter(s);
    setIsSidebarOpen(false); // Cierra el menú en móviles tras seleccionar
  };

  const resetFilters = () => { clearFocus(); setQuery(''); setTypeFilter('Todos'); setSourceFilter('Todas'); };

  return (
    <div className="flex h-screen bg-[#050505] text-slate-400 font-sans relative overflow-hidden">
      <ReadingProgress contentKey={`${query}|${typeFilter}|${sourceFilter}|${focusId ?? ''}`} />

      {/* Fondo del menú lateral en móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navegación lateral (escritorio y móvil) */}
      <aside
        id="sidebar"
        aria-label="Módulos de la biblioteca"
        className={`
        fixed lg:relative inset-y-0 left-0 w-80 bg-[#080808] border-r border-white/5 flex flex-col z-[105]
        transition-transform duration-500 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
          <button
            className="lg:hidden absolute top-6 right-6 text-slate-500 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Cerrar menú de módulos"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Marca */}
          <div className="flex flex-col items-center mb-16">
            <div className="relative w-16 h-16 mb-6 group cursor-pointer">
              <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true"></div>
              <img
                src={LOGO_URL}
                onError={useLocalLogo}
                alt="Logotipo de LiveSync Pro"
                className="relative w-full h-full object-contain opacity-90"
              />
            </div>
            <h1 className="text-xl font-bold tracking-[0.25em] uppercase">
              <span className="text-white">LIVESYNC</span> <span className="gradient-text">PRO</span>
            </h1>
            <p className="text-[#666] text-[9px] uppercase tracking-[0.3em] mt-2 font-bold text-center">
              Base de Conocimiento Científico
            </p>
          </div>

          <nav className="space-y-12" aria-label="Filtro por documento fuente">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-3 h-3 text-cyan-500" aria-hidden="true" />
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Documentos fuente</h2>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleSourceSelect('Todas')}
                  aria-pressed={sourceFilter === 'Todas'}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${
                    sourceFilter === 'Todas'
                      ? 'bg-white/5 border-white/10 text-white border-l-2 border-l-cyan-500'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  TODA LA BASE DE CONOCIMIENTO
                </button>
                {sources.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSourceSelect(s)}
                    aria-pressed={sourceFilter === s}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${
                      sourceFilter === s
                        ? 'bg-white/5 border-white/10 text-white border-l-2 border-l-cyan-500'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-3 h-3 text-purple-500" aria-hidden="true" />
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Métricas</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#0f0f0f] border border-white/5 p-5 rounded-2xl">
                  <div className="text-white font-bold text-2xl mb-1 tracking-tighter">{stats.total}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500">Conceptos</div>
                </div>
                <div className="bg-[#0f0f0f] border border-white/5 p-5 rounded-2xl">
                  <div className="text-cyan-500 font-bold text-2xl mb-1 tracking-tighter">{stats.porTipo['Fórmula'] || 0}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500">Fórmulas analíticas</div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="p-8 border-t border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" aria-hidden="true"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Base de datos en línea</span>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main id="main-content" className="flex-1 overflow-y-auto relative bg-[#050505]">
        <header className="sticky top-0 z-50 glass border-b border-white/5 px-6 md:px-8 lg:px-16 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">

            {/* Marca en móvil */}
            <div className="flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-4">
                <button
                  ref={menuButtonRef}
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Abrir menú de módulos"
                  aria-expanded={isSidebarOpen}
                  aria-controls="sidebar"
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 group">
                    <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-30" aria-hidden="true"></div>
                    <img
                      src={LOGO_URL}
                onError={useLocalLogo}
                      alt=""
                      className="relative w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-black tracking-[0.2em] uppercase leading-none">
                      <span className="text-white">LIVESYNC</span> <span className="gradient-text">PRO</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></div>
                <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest">LSP-DATA v1.2.4</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
              <div className="relative w-full md:w-2/3 group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" aria-hidden="true">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="search"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all shadow-2xl"
                  placeholder="Buscar en títulos, definiciones, variables, restricciones, autores..."
                  aria-label="Buscar conceptos"
                  value={query}
                  onChange={e => { if (focusId) clearFocus(); setQuery(e.target.value); }}
                />
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
                  <select
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl pl-10 pr-10 py-4 text-xs font-bold text-white uppercase tracking-widest outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
                    aria-label="Filtrar por tipo de concepto"
                    value={typeFilter}
                    onChange={e => { if (focusId) clearFocus(); setTypeFilter(e.target.value); }}
                  >
                    {['Todos', ...CONCEPT_TYPES].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Resultados */}
        <div className="px-6 md:px-8 lg:px-16 py-8 md:py-16 max-w-6xl mx-auto min-h-screen">
          <p className="sr-only" aria-live="polite">{filtered.length} conceptos encontrados</p>
          {focusId && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl px-6 py-4 animate-fade-in">
              <p className="text-xs text-slate-300">
                Mostrando el concepto <code className="text-cyan-400">{focusId}</code>
              </p>
              <button
                onClick={clearFocus}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-colors"
              >
                Ver todos los conceptos
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filtered.map((concept, idx) => (
              <ConceptCard key={concept.id_concepto} concept={concept} index={idx} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 md:py-48 text-center border border-dashed border-white/10 rounded-[2rem] md:rounded-[3rem] animate-fade-in bg-white/[0.01]">
              <div className="text-cyan-500/10 mb-8 flex justify-center" aria-hidden="true">
                <Activity className="w-16 md:w-24 h-16 md:h-24" strokeWidth={0.5} />
              </div>
              <p className="text-slate-600 text-lg md:text-xl font-medium tracking-tight mb-6 px-4">No hay conceptos que coincidan con la búsqueda.</p>
              <button
                onClick={resetFilters}
                className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all shadow-2xl"
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </div>

        <footer className="px-8 lg:px-16 py-12 md:py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.25em] text-slate-700 gap-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800" aria-hidden="true"></span>
            LIVESYNC PRO · ECOSISTEMA
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="font-black text-slate-500">Dataset Explorer v1.2.4</p>
            <p className="text-slate-800 normal-case tracking-normal">Cada concepto cita a su autor original; el material de terceros pertenece a sus autores.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
