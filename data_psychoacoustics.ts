
import { Concept } from './types';

export const psychoData: Concept[] = [
  {
    "id_concepto": "efecto_precedencia_haas",
    "categoria": "Psicoacústica",
    "tipo": "Definición",
    "titulo": "Efecto de Precedencia (Haas) y Ventana de Fusión por Estímulo",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering for sound reinforcement applications (AES 152nd Convention, Paper 10551)", "año": 2022, "autor": "Samuel Moulin & Etienne Corteel (L-Acoustics)", "url": "https://www.l-acoustics.com/wp-content/uploads/2022/07/AES152_Moulin-22-comb-filtering-HF.pdf" },
    "contenido_tecnico": {
      "definicion_detallada": "Cuando llegan dos sonidos similares con un retardo entre ~1 ms y un límite superior Δt_lim, se perciben como un único evento fusionado localizado en la dirección de la fuente que llega primero (fuente líder). Por debajo de ~1 ms actúa la localización por suma (imagen fantasma, ver summing_localization_threshold); por encima de Δt_lim el sonido retrasado se percibe como eco. Δt_lim depende del estímulo: ≈ 5–10 ms para clics y ≈ 30 ms para habla.",
      "formula_latex": "$$ 1\\ \\text{ms} \\leq \\Delta t \\leq \\Delta t_{lim}, \\qquad \\Delta t_{lim,\\,clics} \\in [5, 10]\\ \\text{ms}, \\quad \\Delta t_{lim,\\,habla} \\approx 30\\ \\text{ms} $$",
      "formula_texto": "1 ms ≤ Δt ≤ Δt_lim; Δt_lim ≈ 5–10 ms (clics), ≈ 30 ms (habla)",
      "variables": { "\\Delta t": "Retardo de la fuente retrasada respecto a la líder (ms)", "\\Delta t_{lim}": "Límite superior de fusión (umbral de eco) para el estímulo dado (ms)" },
      "restricciones": "Valores para fuentes al mismo nivel; el límite crece si la fuente retrasada es más débil y varía con el material (clics, habla, música). La fusión no implica ausencia de coloración tímbrica (ver umbral_audibilidad_vs_aceptabilidad_comb)."
    },
    "meta_tags": ["Haas", "precedencia", "fusión", "localización", "clicks", "speech"],
    "version_dataset": "1.9",
    "ids_fusionados": ["ventana_precedencia_estimulos"],
    "nota_verificacion": "Fusión de 'efecto_precedencia_haas' (data_psychoacoustics) y 'ventana_precedencia_estimulos' (data_comb_filtering). verificar: los valores 5–10 ms / 30 ms proceden de la revisión bibliográfica del paper (literatura clásica de precedencia, p. ej. Litovsky et al., JASA 106(4), 1999); confirmar la cita exacta."
  },
  {
    "id_concepto": "rango_frecuencia_ruido_sub",
    "categoria": "Contaminación Acústica",
    "tipo": "Definición",
    "titulo": "Espectro Crítico de Contaminación por Bajas Frecuencias",
    "fuente": { "documento": "On the comparison of flown and ground-stacked subwoofer configurations regarding noise pollution (AES 151st Convention, Paper 10533)", "año": 2021, "autor": "Thomas Mouterde & Etienne Corteel (L-Acoustics)", "url": "https://www.l-acoustics.com/wp-content/uploads/2021/10/AES151_MouterdeEtAl._noisePollutionGroundVsFlown.pdf" },
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
    "fuente": { "documento": "On the comparison of flown and ground-stacked subwoofer configurations regarding noise pollution (AES 151st Convention, Paper 10533)", "año": 2021, "autor": "Thomas Mouterde & Etienne Corteel (L-Acoustics)", "url": "https://www.l-acoustics.com/wp-content/uploads/2021/10/AES151_MouterdeEtAl._noisePollutionGroundVsFlown.pdf" },
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
    "fuente": { "documento": "On the comparison of flown and ground-stacked subwoofer configurations regarding noise pollution (AES 151st Convention, Paper 10533)", "año": 2021, "autor": "Thomas Mouterde & Etienne Corteel (L-Acoustics)", "url": "https://www.l-acoustics.com/wp-content/uploads/2021/10/AES151_MouterdeEtAl._noisePollutionGroundVsFlown.pdf" },
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
