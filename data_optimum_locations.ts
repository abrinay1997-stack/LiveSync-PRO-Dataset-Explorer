
import { Concept } from './types';

export const optimumLocationsData: Concept[] = [
  {
    "id_concepto": "area_medicion_optima_segmentacion",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Segmentación Óptima del Área de Medición",
    "fuente": { "documento": "Optimum measurement locations for loudspeaker system equalization", "año": 2020, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Región de la profundidad de la audiencia recomendada para colocar micrófonos de medición, evitando las zonas de alta variabilidad por proximidad a la fuente o paredes.",
      "formula_latex": "$$ D_{meas} \\in [1/4 D_{total}, 3/4 D_{total}] $$",
      "variables": { "D_{meas}": "Profundidad de puntos de medición", "D_{total}": "Profundidad total de la audiencia" },
      "restricciones": "Evita el primer 1/4 por irregularidades de campo cercano y el último 1/4 por exceso de reverberación."
    },
    "meta_tags": ["ubicación", "segmentación", "profundidad"],
    "version_dataset": "1.6"
  },
  {
    "id_concepto": "distancia_minima_paredes",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Distancia Mínima a Paredes para Medición",
    "fuente": { "documento": "Optimum measurement locations for loudspeaker system equalization", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Distancia de seguridad respecto a los límites físicos del recinto para evitar contaminar la respuesta con variaciones extremas de reflexiones locales.",
      "formula_latex": "$$ d_{wall} \\geq 3 \\text{ metros} $$",
      "variables": { "d_{wall}": "Distancia a paredes laterales/traseras" },
      "restricciones": "Crítico para evitar errores en la toma de decisiones de EQ global."
    },
    "meta_tags": ["paredes", "reflexiones", "seguridad"],
    "version_dataset": "1.6"
  },
  {
    "id_concepto": "numero_minimo_ubicaciones_eq",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Número Mínimo de Ubicaciones para EQ",
    "fuente": { "documento": "Optimum measurement locations for loudspeaker system equalization", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Cantidad mínima de puntos de medición espacialmente distribuidos para obtener una respuesta representativa que permita optimizar toda el área de audiencia.",
      "formula_latex": "$$ N_{locations} \\geq 8 $$",
      "variables": { "N_{locations}": "Número de puntos de medición" },
      "restricciones": "Aumentar más allá de 8 no ofrece beneficios significativos en la reducción del Risk Factor."
    },
    "meta_tags": ["ubicaciones", "promediado", "espacial"],
    "version_dataset": "1.6"
  },
  {
    "id_concepto": "formula_risk_factor_eq",
    "categoria": "Análisis de Datos",
    "tipo": "Fórmula",
    "titulo": "Fórmula del Risk Factor (RF)",
    "fuente": { "documento": "Optimum measurement locations for loudspeaker system equalization", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Criterio de evaluación para comparar configuraciones de medición, ponderando el error de magnitud por la consistencia de los datos.",
      "formula_latex": "$$ RF(f) = MRE(f) \\cdot \\frac{1}{1 + STD_{config}(f)} $$",
      "variables": { "RF(f)": "Risk Factor a la frecuencia f", "MRE(f)": "Magnitude Response Error", "STD_{config}(f)": "Desviación estándar de la configuración" },
      "restricciones": "Un RF alto indica gran riesgo de tomar una decisión de ecualización incorrecta."
    },
    "meta_tags": ["RF", "error", "consistencia", "estadística"],
    "version_dataset": "1.6"
  },
  {
    "id_concepto": "definicion_low_mid_frequencies",
    "categoria": "Metodología de Medición",
    "tipo": "Definición",
    "titulo": "Definición de Frecuencias Low-Mid",
    "fuente": { "documento": "Optimum measurement locations for loudspeaker system equalization", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Rango específico de frecuencias medias-bajas donde suelen aparecer irregularidades en el campo cercano de arreglos lineales.",
      "formula_latex": "$$ 250 \\text{ Hz} \\leq f \\leq 1000 \\text{ Hz} $$",
      "variables": { "f": "Frecuencia" },
      "restricciones": "Rango crítico para evaluar el acoplamiento de fuentes en line arrays."
    },
    "meta_tags": ["low-mid", "definición", "espectro"],
    "version_dataset": "1.6"
  },
  {
    "id_concepto": "layout_zebra_beneficio",
    "categoria": "Metodología de Medición",
    "tipo": "Hallazgo",
    "titulo": "Beneficio del Layout 'Zebra'",
    "fuente": { "documento": "Optimum measurement locations for loudspeaker system equalization", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Distribución de micrófonos escalonada en ancho y profundidad (no en línea recta) que maximiza la representatividad del campo directo y reflexiones fuertes del recinto.",
      "formula_latex": "$$ Layout = \\text{Zebra} \\rightarrow RF_{min} $$",
      "variables": {},
      "restricciones": "Evitar layouts paralelos a las paredes laterales para prevenir falsos efectos de estabilidad."
    },
    "meta_tags": ["zebra", "layout", "representatividad"],
    "version_dataset": "1.6"
  }
];
