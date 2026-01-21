
import { Concept } from './types';

export const psychoData: Concept[] = [
  {
    "id_concepto": "efecto_precedencia_haas",
    "categoria": "Psicoacústica",
    "tipo": "Definición",
    "titulo": "Efecto de Precedencia (LiveSync Pro Core)",
    "fuente": { "documento": "LiveSync Pro Research Paper 10551", "año": 2022, "autor": "LiveSync Pro R&D" },
    "contenido_tecnico": {
      "definicion_detallada": "Fusión de sonidos similares donde la dirección se determina por la fuente líder.",
      "formula_latex": "$$ 1 \\text{ ms} \\leq \\Delta t \\leq \\Delta t_{limit} $$",
      "variables": { "\\Delta t": "Retardo entre señales", "\\Delta t_{limit}": "Límite de fusión" },
      "restricciones": "Depende del estímulo (clics vs habla)."
    },
    "meta_tags": ["Haas", "fusión", "localización"],
    "version_dataset": "1.0"
  },
  {
    "id_concepto": "umbral_coloracion_unacceptable",
    "categoria": "Calidad Sonora",
    "tipo": "Constante",
    "titulo": "Área de Coloración Tonal Inaceptable",
    "fuente": { "documento": "LiveSync Pro Research Paper 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "Región angular donde una reflexión a -6dB genera coloración inaceptable.",
      "formula_latex": "$$ \\theta_{unacceptable} \\approx \\pm 41^\\circ $$",
      "variables": { "\\theta": "Ángulo de lateralización" },
      "restricciones": "Fuente líder a 0°."
    },
    "meta_tags": ["coloración", "timbre"],
    "version_dataset": "1.0"
  },
  {
    "id_concepto": "rango_frecuencia_ruido_sub",
    "categoria": "Contaminación Acústica",
    "tipo": "Definición",
    "titulo": "Espectro Crítico de Contaminación por Bajas Frecuencias",
    "fuente": { "documento": "LiveSync Pro Subwoofer Configuration Study", "año": 2021, "autor": "LiveSync Pro Engineering" },
    "contenido_tecnico": {
      "definicion_detallada": "Rango donde la absorción atmosférica y los obstáculos tienen menor impacto, convirtiendo a los subwoofers en la fuente principal de molestias a larga distancia.",
      "formula_latex": "$$ 20 \\text{ Hz} \\leq f \\leq 250 \\text{ Hz} $$",
      "variables": { "f": "Frecuencia" },
      "restricciones": "Considerado el 'punto ciego' en muchas regulaciones antiguas de dBA."
    },
    "meta_tags": ["noise pollution", "subwoofers", "bajas frecuencias"],
    "version_dataset": "1.1"
  }
];
