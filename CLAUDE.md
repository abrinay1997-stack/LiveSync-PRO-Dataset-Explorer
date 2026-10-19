# CLAUDE.md — LiveSync PRO Dataset Explorer (contexto permanente para agentes)

> Léelo completo al iniciar cada sesión. Si cambia algo de lo descrito aquí (modelo de datos,
> comandos, despliegue, pendientes), **actualiza este archivo en el mismo commit**.
> El CLAUDE.md maestro del ecosistema está en `abrinay1997-stack/LiveSync-Pro`.

## 1. Papel en el ecosistema LiveSync Pro

| Repo | Qué es |
|---|---|
| `LiveSync-Pro` | App principal (motor físico, UI, cuentas). Contiene el CLAUDE.md maestro. |
| `Manual-LiveSync-PRO` | Manual de usuario. |
| **`LiveSync-PRO-Dataset-Explorer` (este)** | **Base de conocimiento científico**: fórmulas, definiciones, constantes y hallazgos de acústica y refuerzo sonoro, cada uno con su fuente original. |

Este repo cumple dos funciones:
1. **Explorador web** (React) para consultar los conceptos. Hoy en `data-livesync.netlify.app`;
   destino: **`livesyncpro.com/ciencia/`**, compilado dentro del Worker de la app principal
   (`LiveSync-Pro/scripts/build-platform.mjs`). Enlaces profundos por concepto: `#<id_concepto>`
   (también resuelve `ids_fusionados`); los usan las citas del asistente de IA.
2. **Fuente de verdad del conocimiento** para el asistente de IA de LiveSync Pro (RAG con Vectorize):
   `knowledge/concepts.jsonl` es el artefacto que se ingiere.

Idioma: contenido, UI y documentación en **español**; código e identificadores en inglés
(los campos del tipo `Concept` están en español por compatibilidad histórica; el JSONL usa inglés).

## 2. Stack y comandos

- React 19 + TypeScript 5.7 + Vite 6, `lucide-react`. Node 22.
- Tailwind 3.4 **compilado** en el build (`tailwind.config.js`, `postcss.config.js`, `index.css`).
  Las clases deben aparecer completas en el código (nada de `text-${color}`): el compilador solo ve
  lo que está escrito. Estilos propios y animaciones en el `<style>` de `index.html`.
- KaTeX 0.16.22 **empaquetado** (npm) y cargado bajo demanda (`import('katex')` + su CSS en
  `MathRenderer`, App.tsx): sin CDN, funciona sin conexión y permite una CSP estricta. Si la carga
  falla se muestra `formula_texto`.
- Sin dependencias de terceros en runtime.

```bash
npm ci                      # dependencias (package-lock.json versionado)
npm run dev                 # servidor local en :3000
npx tsc --noEmit            # typecheck
npm run build               # tsc && vite build → dist/
npm run verify:formulas     # recalcula los ejemplos resueltos (scripts/verify-formulas.mjs)
npm run export:knowledge    # regenera knowledge/concepts.jsonl (tsx scripts/export-knowledge.mjs)
npm run deploy:cloudflare   # build + npx wrangler deploy (requiere credenciales de Cloudflare)
```

Antes de cada commit: `npx tsc --noEmit && npm run build && npm run verify:formulas && npm run export:knowledge`
(y versionar el JSONL si cambió).

## 3. Modelo de datos

- `types.ts`: `Concept`, `Fuente`, `ConceptType` (`'Fórmula' | 'Definición' | 'Constante' | 'Hallazgo'`).
- `data_*.ts`: un módulo por documento/tema (exporta `Concept[]`); `data.ts` los agrega en
  `acousticDataset` y calcula estadísticas. Un módulo nuevo debe importarse en `data.ts`.
- Campos de `Concept`:
  - `id_concepto` — snake_case, **estable** (lo referencian la app y el RAG). No renombrar.
  - `categoria` — categoría temática real (p. ej. "Psicoacústica", "Metodología de Medición").
    Nunca un tipo ("Hallazgo") como categoría.
  - `tipo` — uno de `ConceptType`.
  - `fuente` — `{ documento, año, autor?, seccion?, url?, doi? }` con el autor REAL.
  - `contenido_tecnico` — `definicion_detallada`, `formula_latex` (entre `$$ … $$`, KaTeX),
    `formula_texto?` (texto plano), `variables` (símbolo LaTeX → descripción **con unidades**),
    `restricciones` (dominio de validez), `ejemplo?` (ejemplo resuelto verificado).
  - `verificado?` — `true` solo si la fórmula se contrastó con la referencia (o con su derivación /
    tablas de la norma) **y** el ejemplo se recalculó en `scripts/verify-formulas.mjs`.
  - `nota_verificacion?` — dudas abiertas; empiezan por `verificar:` cuando falta comprobar algo.
  - `ids_fusionados?` — IDs de duplicados absorbidos por este concepto (se conservan para que las
    referencias antiguas sigan resolviendo; la búsqueda y el JSONL los incluyen).
- Escapes: los `.ts` usan cadenas JSON-like, así que cada barra de LaTeX va **doble** (`\\text`,
  `\\alpha`, `\\\\` para salto de línea). Una sola barra (`\text`, `\_`) produce caracteres de control
  o se pierde. `export-knowledge` falla si queda LaTeX sin convertir en el texto plano.

## 4. Reglas no negociables

1. **Procedencia — nunca atribuir a LiveSync Pro material de terceros.** Cada concepto cita al autor
   real (norma, paper, manual de fabricante, libro): AFMG, L-Acoustics, AES y sus autores, ISO/IEC,
   IEEE, etc. Prohibido "LiveSync Pro" como autor/documento de material ajeno, y afirmaciones como
   "patente de LiveSync Pro" o "autorizado por LiveSync Pro". Si la procedencia es dudosa, se deja la
   mejor fuente conocida con `nota_verificacion: "verificar: …"`. El export falla si una fuente
   menciona LiveSync. (Historial: `e19b1c7` re-etiquetó material de terceros; corregido en `1a7e283`.)
2. **Exactitud — toda fórmula lleva referencia + unidades + ejemplo resuelto verificado
   numéricamente.** Añadir el ejemplo en `contenido_tecnico.ejemplo` y su comprobación en
   `scripts/verify-formulas.mjs`; sólo entonces `verificado: true`. Nada de valores inventados ni
   "reglas del pulgar" sin fuente: si no hay fuente, se retira o se marca `verificar:`.
3. Declarar límites de validez en `restricciones` (rango, hipótesis, qué ignora).
4. No eliminar conceptos útiles: los duplicados se **fusionan** (registrando `ids_fusionados`).
5. Sin datos personales ni secretos en el repo.

## 5. Añadir o corregir un concepto (checklist)

1. Fuente real completa (documento exacto, autor/organismo, año, sección, URL/DOI si se conoce).
2. `formula_latex` válida en KaTeX + `formula_texto` si la conversión automática no queda clara.
3. Variables con unidades; `restricciones` con dominio de validez.
4. Ejemplo resuelto + comprobación en `scripts/verify-formulas.mjs` → `verificado: true`.
5. `npm run verify:formulas && npm run build && npm run export:knowledge`; versionar el JSONL.

## 6. Exportación para IA (`knowledge/concepts.jsonl`)

`npm run export:knowledge` escribe una línea JSON por concepto con: `id`, `title`, `category`,
`type`, `definition`, `formula_latex`, `formula_text`, `variables` (nombre en texto plano →
descripción), `constraints`, `example?`, `source {document, authors[], year, section?, url?, doi?}`,
`tags`, `verified`, `verification_note?`, `merged_ids?`, `dataset_version`, `language`.
El archivo se regenera y se versiona en el mismo commit que cualquier cambio de datos.

## 7. Despliegue

- **Netlify (actual):** `netlify.toml` → `npm run build`, publica `dist/`, redirección SPA.
- **Cloudflare (destino):** `wrangler.jsonc` → Worker `livesync-knowledge` sólo con assets
  (`./dist`, `not_found_handling: single-page-application`, `compatibility_date` 2026-10-01).
  Validado con `npx wrangler deploy --dry-run`. Despliegue con `npm run deploy:cloudflare`, Workers
  Builds conectado al repo o GitHub Actions con `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
  En el entorno cloud de agentes `api.cloudflare.com` está bloqueado: no se puede desplegar desde ahí.
- **Plataforma unificada (destino final):** la app principal compila este repo con
  `vite build --outDir <app>/dist/ciencia` y lo sirve en `livesyncpro.com/ciencia/` (mismo Worker).
  Por eso `vite.config.ts` usa `base: './'` y todo recurso del HTML/JS debe ser **relativo**
  (`logo-livesyncpro.png`, no `/logo-livesyncpro.png` en código; Vite reescribe el `index.html`). El CI de la app
  clona este repo (público) en cada despliegue: los cambios llegan a producción con el siguiente
  deploy de la app. El Worker propio `livesync-knowledge` queda como alternativa.
- Netlify, Worker propio y plataforma conviven hasta el corte de DNS; después
  `data-livesync.netlify.app` debe redirigir a `livesyncpro.com/ciencia/`.

## 8. Estado y pendientes (actualizar en cada sesión)

Última actualización: **2026-10-17** — 136 conceptos (tras fusionar 3 duplicados), 12 verificados.

Pendientes de verificación (no se pudo acceder a las fuentes desde el entorno de agentes):
- [ ] `formula_risk_factor_eq`: RF = MRE/(1+STD) contradice su definición; contrastar con el white
      paper "Optimum measurement locations" de L-Acoustics.
- [ ] `data_audience.ts`: AES Convention Paper 10184 con año 2024 (157th Convention) — el número no
      encaja con la numeración AES (la Parte 1 es el Paper 10398, 2020); confirmar en AES E-Library.
- [ ] `wst_criteria_heil`: numeración exacta de los criterios WST y forma cuantitativa del criterio
      de curvatura (Urban, Heil & Bauman, JAES 51(10), 2003).
- [ ] `efecto_precedencia_haas`: cita exacta de los valores 5–10 ms / 30 ms.
- [ ] `data_networking.ts`: "Requirements and Solutions for Audio Networking / AES 2024" sin título
      ni autores completos (sólo "Kaltheuner et al." en una entrada).
- [ ] `data_hf_measurement.ts`: título exacto del white paper de L-Acoustics sobre estabilidad en HF.
- [ ] Ampliar `verificado: true` al resto de fórmulas (hoy sólo las 12 revisadas el 2026-10-16:
      11 de `data_scientific_refs.ts` y `velocidad_sonido_efectiva`).
- [ ] Solapamientos con fuentes distintas que se mantienen a propósito: distancia crítica (Kuttruff
      vs. manual EASE) y STI (IEC 60268-16 vs. manual SysTune). Valorar referencias cruzadas.
- [ ] Taxonomía: unificar categorías casi duplicadas ("Meteorología / Acústica" vs. "Meteorología /
      Acústica Ambiental", "Medición" vs. "Metodología de Medición"...).
- [x] Logo local desde el 2026-10-19 (`public/logo-livesyncpro.png`, 256 px, del original del dueño; +
      `favicon.png`, `apple-touch-icon.png`). Sin CDN de terceros en runtime.

## 9. Convenciones de trabajo

- Rama de desarrollo por sesión (la indica el sistema); commits pequeños y descriptivos; push
  frecuente (el contenedor de la sesión es efímero).
- Mensajes de commit en español o inglés, con las líneas de atribución que indique el sistema.
