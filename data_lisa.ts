
import { Concept } from './types';

export const lisaData: Concept[] = [
  {
    "id_concepto": "umbral_separacion_vertical_lisa",
    "categoria": "Psicoacústica / Inmersión",
    "tipo": "Constante",
    "titulo": "Umbral de Separación Vertical (LiveSync Pro Immersive)",
    "fuente": { "documento": "LiveSync Pro Hyperreal Sound Requirements", "año": 2020, "autor": "LiveSync Pro" },
    "contenido_tecnico": {
      "definicion_detallada": "Ángulo máximo de separación vertical entre la posición física del intérprete y el sistema para mantener la coherencia.",
      "formula_latex": "$$ \\theta_{vert} < 30^\\circ $$",
      "variables": { "\\theta_{vert}": "Ángulo de separación vertical" },
      "restricciones": "Superar este umbral rompe la ilusión de que el sonido emana del intérprete."
    },
    "meta_tags": ["coherencia", "vertical", "LiveSync Pro", "localización"],
    "version_dataset": "1.2"
  }
];
