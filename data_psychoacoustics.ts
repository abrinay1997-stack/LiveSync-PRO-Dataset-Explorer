
import { Concept } from './types';

export const psychoData: Concept[] = [
  {
    "id_concepto": "efecto_precedencia_haas",
    "categoria": "Psicoacústica",
    "tipo": "Definición",
    "titulo": "Efecto de Precedencia (Haas)",
    "fuente": { "documento": "AES Convention Paper 10551", "año": 2022, "autor": "Moulin & Corteel" },
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
    "fuente": { "documento": "AES Convention Paper 10551", "año": 2022 },
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
    "fuente": { "documento": "Comparison of flown and ground-stacked subwoofer configurations", "año": 2021, "autor": "Mouterde & Corteel" },
    "contenido_tecnico": {
      "definicion_detallada": "Rango donde la absorción atmosférica y los obstáculos tienen menor impacto, convirtiendo a los subwoofers en la fuente principal de molestias a larga distancia.",
      "formula_latex": "$$ 20 \\text{ Hz} \\leq f \\leq 250 \\text{ Hz} $$",
      "variables": { "f": "Frecuencia" },
      "restricciones": "Considerado el 'punto ciego' en muchas regulaciones antiguas de dBA."
    },
    "meta_tags": ["noise pollution", "subwoofers", "bajas frecuencias"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "bandas_octava_criticas_sub",
    "categoria": "Medición",
    "tipo": "Constante",
    "titulo": "Bandas de Octava Críticas para Subwoofers",
    "fuente": { "documento": "Comparison of flown and ground-stacked subwoofer configurations", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Frecuencias centrales esenciales para evaluar el rendimiento y spill del sistema.",
      "formula_latex": "$$ f_c \\in \\{31.5, 63, 125\\} \\text{ Hz} $$",
      "variables": { "f_c": "Frecuencia central de octava" },
      "restricciones": "31.5Hz (energía sub), 63Hz (zona de cruce), 125Hz (sistema principal solo)."
    },
    "meta_tags": ["octava", "frecuencias centrales", "análisis"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "hallazgo_viento_sub_config",
    "categoria": "Propagación / Refuerzo Sonoro",
    "tipo": "Hallazgo",
    "titulo": "Impacto del Viento en Subwoofers Volados vs Suelo",
    "fuente": { "documento": "Comparison of flown and ground-stacked subwoofer configurations", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "El viento impacta más a los subwoofers en el suelo (ground-stacked) que a los volados (flown) a larga distancia (300m), debido a la mayor variabilidad de SPL bajo gradientes de viento positivos.",
      "formula_latex": "$$ \\Delta SPL_{ground, wind} > \\Delta SPL_{flown, wind} $$",
      "variables": {},
      "restricciones": "Observado en condiciones de viento fuerte (10m/s) en la dirección de propagación (downwind)."
    },
    "meta_tags": ["flown", "ground-stacked", "viento", "refracción"],
    "version_dataset": "1.1"
  }
];
