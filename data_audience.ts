
import { Concept } from './types';

export const audienceData: Concept[] = [
  {
    "id_concepto": "modelo_audiencia_porosa",
    "categoria": "Física Acústica",
    "tipo": "Definición",
    "titulo": "Audiencia como Medio Poroso",
    "fuente": { "documento": "Audience Effect in the Low-Frequency Range, Part 2", "año": 2024, "autor": "Mouterde et al. (AES 10184)" },
    "contenido_tecnico": {
      "definicion_detallada": "La audiencia puede modelarse como un material poroso que reduce la velocidad de propagación de la onda sonora. La velocidad disminuye a medida que aumenta la densidad de personas.",
      "formula_latex": "$$ v_{sound} = f(\text{densidad\_audiencia}) \\downarrow $$",
      "variables": { "v_{sound}": "Velocidad del sonido en la audiencia" },
      "restricciones": "Impacto crítico en fuentes cercanas al suelo."
    },
    "meta_tags": ["densidad", "propagación", "material poroso"],
    "version_dataset": "1.3"
  },
  {
    "id_concepto": "desfase_inducido_audiencia_gr_sub",
    "categoria": "Ingeniería de Audio",
    "tipo": "Constante",
    "titulo": "Desfase por Audiencia en Subwoofers de Suelo",
    "fuente": { "documento": "Audience Effect in the Low-Frequency Range, Part 2", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Valores de cambio de fase observados en subwoofers apoyados en suelo debido a la presencia física del público, que rompe el alineamiento optimizado en salas vacías.",
      "formula_latex": "$$ \\Delta \\phi_{50Hz} \\approx 105^\\circ, \\quad \\Delta \\phi_{75Hz} \\approx 180^\\circ $$",
      "variables": { "\\Delta \\phi": "Cambio de fase inducido" },
      "restricciones": "Resulta en una pérdida severa de suma en el rango de crossover."
    },
    "meta_tags": ["fase", "ground-stacked", "crossover"],
    "version_dataset": "1.3"
  },
  {
    "id_concepto": "ralentizacion_vs_altura_fuente",
    "categoria": "Física Acústica",
    "tipo": "Hallazgo",
    "titulo": "Ralentización de Propagación vs. Altura de Fuente",
    "fuente": { "documento": "Audience Effect in the Low-Frequency Range, Part 2", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "La audiencia ralentiza las fuentes cercanas al suelo de forma mucho más significativa que las fuentes voladas (flown). Las fuentes por encima de los 5m presentan un desfase casi insignificante.",
      "formula_latex": "$$ z_{source} > 5m \\rightarrow \\text{PS}(f) \\approx 0 $$",
      "variables": { "z_{source}": "Altura de la fuente", "PS": "Phase Shift (Desfase)" },
      "restricciones": "Explica por qué los sistemas volados mantienen mejor el alineamiento que los de suelo."
    },
    "meta_tags": ["altura", "flown", "ground-stacked"],
    "version_dataset": "1.3"
  },
  {
    "id_concepto": "ajuste_alineamiento_temporal_audiencia",
    "categoria": "Calibración / Sistemas",
    "tipo": "Hallazgo",
    "titulo": "Ajuste de Delay para Realineamiento con Audiencia",
    "fuente": { "documento": "Audience Effect in the Low-Frequency Range, Part 2", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Para compensar la ralentización de los subwoofers en suelo frente a los volados, se requiere reducir el delay aplicado a los subwoofers de suelo una vez que la audiencia está presente.",
      "formula_latex": "$$ \\text{Delay}_{update} \\approx -3.84 \\text{ a } -6 \\text{ ms} $$",
      "variables": { "\\text{Delay}_{update}": "Reducción de retardo sugerida" },
      "restricciones": "Basado en mediciones FOH a 33m-42m."
    },
    "meta_tags": ["delay", "calibración", "realineamiento"],
    "version_dataset": "1.3"
  }
];
