# LiveSync PRO — Dataset Explorer

Base de conocimiento científico del ecosistema [LiveSync Pro](https://livesyncpro.com): fórmulas,
definiciones, constantes y hallazgos de acústica y refuerzo sonoro (propagación atmosférica, line
arrays, psicoacústica, medición, redes de audio, electricidad, rigging...). Cada concepto cita a su
autor original —normas ISO/IEC/IEEE, papers AES, manuales de AFMG y L-Acoustics, libros de
referencia—; el material de terceros pertenece a sus autores.

## Uso

Requisitos: Node 22.

```bash
npm ci
npm run dev                # http://localhost:3000
npm run build              # genera dist/
npm run verify:formulas    # recalcula los ejemplos resueltos
npm run export:knowledge   # regenera knowledge/concepts.jsonl (para el asistente de IA / RAG)
```

## Datos

- `types.ts` — modelo `Concept`.
- `data_*.ts` — un módulo por documento o tema; `data.ts` los agrega.
- `knowledge/concepts.jsonl` — exportación en JSON Lines (una línea por concepto) para ingesta.

## Despliegue

- Netlify: `netlify.toml` (build `npm run build`, publica `dist/`).
- Cloudflare Workers (assets estáticos): `wrangler.jsonc` → `npm run deploy:cloudflare`.

Las reglas de contribución (procedencia, exactitud, verificación numérica) y el estado del proyecto
están en [`CLAUDE.md`](./CLAUDE.md).
