
import { Concept } from './types';

export const easeManualData: Concept[] = [
  {
    "id_concepto": "ecuacion_reverberacion_eyring_ease",
    "categoria": "Acústica Estadística",
    "tipo": "Fórmula",
    "titulo": "Tiempo de Reverberación de Eyring",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Appendix A", "año": 2025, "autor": "AFMG Technologies" },
    "contenido_tecnico": {
      "definicion_detallada": "Modelo estadístico utilizado por EASE para calcular el RT60 considerando la absorción media y la atenuación del aire.",
      "formula_latex": "$$ T = k_T \\frac{V}{4mV - S \\ln(1 - \\bar{\\alpha})} $$",
      "variables": { "k_T": "0.161 s/m (constante)", "V": "Volumen (m³)", "S": "Superficie total (m²)", "\\bar{\\alpha}": "Coeficiente de absorción medio", "m": "Coeficiente de atenuación del aire" },
      "restricciones": "Asume un campo difuso establecido. El indicador de volumen en EASE debe estar en verde (recinto cerrado)."
    },
    "meta_tags": ["Eyring", "reverberación", "RT60", "atenuación"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "formula_distancia_critica_ease",
    "categoria": "Acústica de Salas",
    "tipo": "Fórmula",
    "titulo": "Distancia Crítica (Radio de Reverberación)",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Appendix A", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Distancia desde la fuente donde el nivel de energía directa es igual al nivel de energía reverberante.",
      "formula_latex": "$$ r_H = \\sqrt{\\frac{A}{16\\pi}} $$",
      "variables": { "r_H": "Distancia crítica", "A": "Área de absorción total (m² Sabines)" },
      "restricciones": "Fórmula para fuente omnidireccional. EASE muestra el mapeo en múltiplos de esta distancia."
    },
    "meta_tags": ["distancia crítica", "reverberación", "mapeo"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "discrepancia_spl_acousteer_hallazgo",
    "categoria": "Simulación Numérica",
    "tipo": "Hallazgo",
    "titulo": "Diferencia de Nivel por Ancho de Banda (Acousteer vs Módulos)",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 13.4", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "El motor Acousteer usa banda ancha (20Hz-20kHz) mientras que los módulos de mapeo estático se limitan a 100Hz-10kHz, lo que genera una diferencia en los valores absolutos de SPL.",
      "formula_latex": "$$ \\Delta SPL_{abs} \\approx 1 \\text{ a } 1.5 \\text{ dB} $$",
      "variables": {},
      "restricciones": "Ocurre porque la energía se distribuye en más bandas de 1/3 de octava en Acousteer."
    },
    "meta_tags": ["Acousteer", "SPL", "error", "ancho de banda"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "limite_complejidad_modelo_ease",
    "categoria": "Diseño de Sistemas",
    "tipo": "Constante",
    "titulo": "Límites de Optimización del Modelo",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 3.4.1", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Capacidad máxima recomendada para mantener la interactividad en tiempo real y la precisión geométrica.",
      "formula_latex": "$$ Faces_{max} = 10,000, \\quad Lspk_{max} = 1,000 $$",
      "variables": { "Faces": "Caras del modelo", "Lspk": "Fuentes de sonido" },
      "restricciones": "Dimensiones superiores a 3km pueden inducir artefactos visuales e imprecisiones de cálculo."
    },
    "meta_tags": ["límites", "caras", "loudspeakers", "rendimiento"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "formula_alcons_sti_ease",
    "categoria": "Inteligibilidad",
    "tipo": "Fórmula",
    "titulo": "Derivación de ALCons desde STI",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 19.2.11", "año": 2025, "autor": "Farrel-Becker" },
    "contenido_tecnico": {
      "definicion_detallada": "Ecuación utilizada por EASE para estimar la pérdida de articulación de consonantes a partir del índice STI.",
      "formula_latex": "$$ AL_{cons} = e^{5.42(0.9482 - STI)} $$",
      "variables": { "STI": "Speech Transmission Index", "AL_{cons}": "Pérdida de consonantes (%)" },
      "restricciones": "Valores > 18% se consideran inaceptables."
    },
    "meta_tags": ["ALCons", "STI", "inteligibilidad"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "criterios_claridad_c80_musical",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Escala de Claridad C80 por Género/Instrumento",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 19.2.8", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Rangos ideales de la relación energía temprana/tardía (80ms) para diferentes ejecuciones musicales.",
      "formula_latex": "$$ C_{80} \\in \\{ [0 \\pm 2] \\text{ Organ}, [2 \\pm 2] \\text{ Classical}, [6 \\pm 2] \\text{ Rock} \\} \\text{ dB} $$",
      "variables": {},
      "restricciones": "Valores > +8 dB no son recomendables para música en vivo."
    },
    "meta_tags": ["C80", "claridad", "música"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "loudspeaker_overlap_logic",
    "categoria": "Ingeniería de Audio",
    "tipo": "Fórmula",
    "titulo": "Índice de Solapamiento de Altavoces (Overlap)",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 19.2.3", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Relación entre la energía total de todos los altavoces y la del altavoz más fuerte en un punto dado.",
      "formula_latex": "$$ O_{lsp} = \\frac{E_{dir}}{E_{max}} $$",
      "variables": { "E_{dir}": "Energía directa total", "E_{max}": "Energía del altavoz más fuerte" },
      "restricciones": "Ideal entre 1 y 1.5 para garantizar localización clara por una sola fuente."
    },
    "meta_tags": ["solapamiento", "overlap", "localización"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "resoluciones_espaciales_acousteer",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Resolución de Puntos en Mapeo Real-Time",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 13.2", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Densidad de puntos de cálculo para la generación de mapas de SPL en el motor Acousteer.",
      "formula_latex": "$$ Pts \\in \\{ 2.5k \\text{ (Low)}, 10k \\text{ (Int)}, 40k \\text{ (High)}, 160k \\text{ (Max)} \\} $$",
      "variables": {},
      "restricciones": "La resolución intermedia (10k) es el estándar para optimización interactiva."
    },
    "meta_tags": ["puntos", "mapeo", "Acousteer", "resolución"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "privacy_index_ai_logic",
    "categoria": "Psicoacústica",
    "tipo": "Fórmula",
    "titulo": "Índice de Privacidad (PI)",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 19.2.13", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Calculado a partir del Índice de Articulación (AI), describe cuánto habla queda enmascarada por el ruido.",
      "formula_latex": "$$ PI = (1 - AI) \\cdot 100\\% $$",
      "variables": { "AI": "Articulation Index" },
      "restricciones": "PI > 95% indica privacidad confidencial (habla inaudible/ininteligible)."
    },
    "meta_tags": ["privacidad", "AI", "PI", "enmascaramiento"],
    "version_dataset": "2.3"
  },
  {
    "id_concepto": "itd_gap_definition",
    "categoria": "Psicoacústica",
    "tipo": "Definición",
    "titulo": "Brecha de Tiempo Inicial (ITD Gap)",
    "fuente": { "documento": "EASE 5 Third Edition Manual / Section 19.2.7", "año": 2025 },
    "contenido_tecnico": {
      "definicion_detallada": "Diferencia temporal entre la llegada del sonido directo del primer altavoz y el siguiente altavoz en tiempo.",
      "formula_latex": "$$ ITD_{gap} = t_{arr, 2} - t_{arr, 1} $$",
      "variables": { "t_{arr}": "Tiempo de llegada" },
      "restricciones": "Factor clave para evaluar la claridad y la posible percepción de ecos."
    },
    "meta_tags": ["ITD", "delay", "precedencia"],
    "version_dataset": "2.3"
  }
];
