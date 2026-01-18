
import { Concept } from './types';

export const lisaData: Concept[] = [
  {
    "id_concepto": "umbral_separacion_vertical_lisa",
    "categoria": "Psicoacústica / Inmersión",
    "tipo": "Constante",
    "titulo": "Umbral de Separación Vertical para Consistencia Audio-Visual",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Benefits and Requirements", "año": 2020, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Ángulo máximo de separación vertical entre la posición física del intérprete en el escenario y el sistema de altavoces volado para mantener la coherencia de la imagen sonora.",
      "formula_latex": "$$ \\theta_{vert} < 30^\\circ $$",
      "variables": { "\\theta_{vert}": "Ángulo de separación vertical" },
      "restricciones": "Superar este umbral rompe la ilusión de que el sonido emana del intérprete."
    },
    "meta_tags": ["coherencia", "vertical", "L-ISA", "localización"],
    "version_dataset": "1.2"
  },
  {
    "id_concepto": "error_localizacion_horizontal_negligible",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Error de Localización Horizontal Despreciable",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Benefits and Requirements", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Margen de error angular en el plano horizontal entre la posición del objeto de audio y la percepción del oyente que se considera aceptable para garantizar consistencia audio-visual.",
      "formula_latex": "$$ \\epsilon_{horiz} \\leq 7.5^\\circ $$",
      "variables": { "\\epsilon_{horiz}": "Error angular horizontal" },
      "restricciones": "Garantiza consistencia incluso para oyentes fuera del eje (offside)."
    },
    "meta_tags": ["horizontal", "error", "consistencia"],
    "version_dataset": "1.2"
  },
  {
    "id_concepto": "algoritmo_panning_lisa",
    "categoria": "Algoritmos de Audio",
    "tipo": "Definición",
    "titulo": "Algoritmo de Paneo Basado en Amplitud (L-ISA)",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Benefits and Requirements", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Sistema basado en VBAP (Vector Based Amplitude Panning) y MDAP (Multiple Directions Amplitude Panning) con mejoras propietarias para compensación de bajas frecuencias y control de decorrelación.",
      "formula_latex": "$$ P_{out} = f(VBAP, MDAP) + \\text{LF}_{comp} + \\text{Decorr} $$",
      "variables": { "VBAP": "Vector Based Amplitude Panning", "MDAP": "Multiple Directions Amplitude Panning", "LF_{comp}": "Compensación de acumulación de graves" },
      "restricciones": "Requiere un mínimo de 5 altavoces frontales compartiendo cobertura."
    },
    "meta_tags": ["panning", "amplitud", "decorrelación", "VBAP"],
    "version_dataset": "1.2"
  },
  {
    "id_concepto": "hallazgo_desenmascaramiento_espacial",
    "categoria": "Psicoacústica",
    "tipo": "Hallazgo",
    "titulo": "Ventaja del Desenmascaramiento Espacial en Algoritmos de Amplitud",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Benefits and Requirements", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Los algoritmos basados en amplitud mantienen una mayor separación espacial de los intérpretes en comparación con los basados en retardo (WFS), reduciendo a la mitad la pérdida de inteligibilidad cuando los intérpretes se mueven hacia el fondo del escenario (upstage).",
      "formula_latex": "$$ Unmasking_{amp} > Unmasking_{delay} \\times 2 \\text{ (upstage)} $$",
      "variables": {},
      "restricciones": "Crítico para reducir la necesidad de compresión y ecualización agresiva en la mezcla."
    },
    "meta_tags": ["spatial unmasking", "inteligibilidad", "mezcla"],
    "version_dataset": "1.2"
  },
  {
    "id_concepto": "limite_wfs_espaciado_grande",
    "categoria": "Ingeniería de Audio",
    "tipo": "Hallazgo",
    "titulo": "Limitación de WFS con Espaciado de Altavoces Grande",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Benefits and Requirements", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "En sistemas de gran escala con espaciado entre altavoces > 4m, la síntesis de campo de onda (WFS) no logra una reconstrucción física del frente de onda por debajo de 100 Hz, comportándose como una delta-estereofonía basada en precedencia.",
      "formula_latex": "$$ d_{sp} > 4m \\rightarrow f_{limit} < 100 \\text{ Hz} $$",
      "variables": { "d_{sp}": "Distancia entre fuentes", "f_{limit}": "Límite superior de reconstrucción física" },
      "restricciones": "Induce coloración tonal y artefactos temporales en objetos móviles."
    },
    "meta_tags": ["WFS", "espaciado", "delta-estereofonía", "artefactos"],
    "version_dataset": "1.2"
  },
  {
    "id_concepto": "umbral_blur_localizacion",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Umbral Mínimo de Blur de Localización (L-ISA)",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Benefits and Requirements", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "La incertidumbre en la localización (blur) se minimiza en L-ISA al posicionar objetos directamente en el eje de un altavoz, alcanzando el límite del sistema auditivo humano.",
      "formula_latex": "$$ Blur_{min} \\approx 2^\\circ $$",
      "variables": { "Blur_{min}": "Incertidumbre mínima de localización" },
      "restricciones": "En algoritmos basados en retardo, el blur aumenta gradualmente con la profundidad hasta alcanzar los 8°-10°."
    },
    "meta_tags": ["blur", "incertidumbre", "precisión"],
    "version_dataset": "1.2"
  }
];
