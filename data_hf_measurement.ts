
import { Concept } from './types';

export const hfMeasurementData: Concept[] = [
  {
    "id_concepto": "definicion_high_frequencies_lisa",
    "categoria": "Metodología de Medición",
    "tipo": "Definición",
    "titulo": "Definición de Altas Frecuencias (HF)",
    "fuente": { "documento": "How to obtain stable measurements at high frequencies?", "año": 2020, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Rango de frecuencias superior cuando el espectro audible se divide en dos bandas (low/high) para propósitos de análisis de estabilidad.",
      "formula_latex": "$$ f_{HF} > 1 \\text{ kHz} $$",
      "variables": { "f_{HF}": "Rango de altas frecuencias" },
      "restricciones": "Banda donde las condiciones atmosféricas (especialmente el viento) impactan severamente la repetibilidad."
    },
    "meta_tags": ["HF", "definición", "espectro"],
    "version_dataset": "1.5"
  },
  {
    "id_concepto": "limite_distancia_medicion_hf",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Límite Recomendado de Distancia para Medición de HF",
    "fuente": { "documento": "How to obtain stable measurements at high frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Distancia máxima recomendada para realizar capturas acústicas de HF. Más allá de este punto, la inestabilidad atmosférica hace que las capturas únicas sean irrelevantes para la toma de decisiones de EQ.",
      "formula_latex": "$$ d_{limit} \\approx 60 \\text{ m} $$",
      "variables": { "d_{limit}": "Distancia máxima de medición confiable" },
      "restricciones": "Se recomienda confiar en simulaciones (Soundvision/Autoclimate) para optimización HF a distancias mayores."
    },
    "meta_tags": ["HF", "distancia", "límite", "estabilidad"],
    "version_dataset": "1.5"
  },
  {
    "id_concepto": "reduccion_inestabilidad_hf_40m",
    "categoria": "Hallazgo",
    "tipo": "Hallazgo",
    "titulo": "Reducción de Inestabilidad en HF a 40m",
    "fuente": { "documento": "How to obtain stable measurements at high frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Mejora en la repetibilidad de la medición al promediar múltiples barridos en exteriores a una distancia de 40m.",
      "formula_latex": "$$ \\text{Var}_{1 \\rightarrow 8} : 10 \\text{ dB} \\rightarrow 3 \\text{ dB} $$",
      "variables": { "Var": "Inestabilidad de la respuesta medida" },
      "restricciones": "Valores obtenidos con 8 sweeps outdoor."
    },
    "meta_tags": ["inestabilidad", "sweeps", "repetibilidad"],
    "version_dataset": "1.5"
  },
  {
    "id_concepto": "inestabilidad_hf_larga_distancia",
    "categoria": "Hallazgo",
    "tipo": "Hallazgo",
    "titulo": "Inestabilidad Residual HF a Larga Distancia",
    "fuente": { "documento": "How to obtain stable measurements at high frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "A partir de los 60m, la inestabilidad de la medición en exteriores permanece alta debido a las variaciones del viento, independientemente del número de promedios.",
      "formula_latex": "$$ d > 60 \\text{ m} \\rightarrow \\text{Inestabilidad} \\approx 3 \\text{ a } 5 \\text{ dB} $$",
      "variables": {},
      "restricciones": "Dato medido incluso utilizando el máximo recomendado de 8 sweeps a 80m."
    },
    "meta_tags": ["HF", "larga distancia", "viento", "error"],
    "version_dataset": "1.5"
  },
  {
    "id_concepto": "influencia_hvac_estabilidad_hf",
    "categoria": "Física Acústica",
    "tipo": "Hallazgo",
    "titulo": "Influencia de Sistemas HVAC en Estabilidad HF Indoor",
    "fuente": { "documento": "How to obtain stable measurements at high frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Los sistemas de calefacción, ventilación y aire acondicionado (HVAC) en recintos cerrados favorecen la circulación del aire, induciendo inestabilidad en las altas frecuencias similar al viento suave en exteriores.",
      "formula_latex": "$$ \\text{Instability}_{indoor} = f(\\text{HVAC}_{air\_flow}) $$",
      "variables": {},
      "restricciones": "Requiere al menos 4 sweeps en interior para estabilizar la captura."
    },
    "meta_tags": ["indoor", "HVAC", "estabilidad", "HF"],
    "version_dataset": "1.5"
  }
];
