
import { Concept } from './types';

export const spatialFillsData: Concept[] = [
  {
    "id_concepto": "requisito_cobertura_cruzada_sf",
    "categoria": "Diseño de Sistemas",
    "tipo": "Constante",
    "titulo": "Requisito de Cobertura Cruzada para Spatial-fills",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Condición necesaria de diseño para implementar la solución de spatial-fills en sistemas distribuidos. Cualquier oyente en el área de audiencia correspondiente debe estar dentro del área de cobertura de un número mínimo de altavoces físicos.",
      "formula_latex": "$$ N_{loudspeakers} \\geq 3 $$",
      "variables": { "N_{loudspeakers}": "Número de altavoces con cobertura compartida" },
      "restricciones": "Fundamental para permitir la creación de réplicas virtuales que restauren la cobertura cruzada necesaria para el renderizado espacial."
    },
    "meta_tags": ["cobertura", "spatial-fills", "diseño"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "parametros_virtualizacion_sf",
    "categoria": "Algoritmos de Audio",
    "tipo": "Definición",
    "titulo": "Parámetros de Virtualización de Altavoces de Relleno",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Variables de control del algoritmo basado en retardos que crea réplicas virtuales del sistema principal (Scene) utilizando los sistemas de relleno distribuidos.",
      "formula_latex": "$$ SF_{params} = \\{ d_{virtual}, \\nabla G \\} $$",
      "variables": { "d_{virtual}": "Distancia virtual desde el sistema de relleno (m)", "\\nabla G": "Gradiente de ganancia entre altavoces virtuales (dB)" },
      "restricciones": "Un gradiente de ganancia mayor mejora la consistencia AV pero puede afectar la homogeneidad de nivel."
    },
    "meta_tags": ["virtualización", "delay", "ganancia"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "config_optima_front_fills_sf",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Configuración Óptima para Front-fills (L-ISA SF)",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Valores recomendados para el despliegue de front-fills que proporcionan el mejor balance entre homogeneidad de nivel, desenmascaramiento espacial y consistencia audio-visual.",
      "formula_latex": "$$ d_{v,front} = 5 \\text{ m}, \\quad \\nabla G_{front} = 8 \\text{ dB} $$",
      "variables": { "d_{v,front}": "Distancia virtual (aprox. 1/3 del ancho del escenario)", "\\nabla G_{front}": "Gradiente de ganancia óptimo" },
      "restricciones": "Basado en un escenario de recinto tipo shoe-box de 16m de ancho."
    },
    "meta_tags": ["front-fills", "configuración", "optimización"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "config_optima_under_balcony_sf",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Configuración para Under-balcony (L-ISA SF)",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Ajustes sugeridos para sistemas bajo balcón situados a larga distancia del escenario para mantener la espacialización sin comprometer la cobertura.",
      "formula_latex": "$$ d_{v,ub} = 16 \\text{ m}, \\quad \\nabla G_{ub} = 4 \\text{ dB} $$",
      "variables": { "d_{v,ub}": "Distancia virtual (distancia del escenario al sistema)", "\\nabla G_{ub}": "Gradiente de ganancia reducido" },
      "restricciones": "Diseñado para áreas situadas a 16m del escenario con 8m de profundidad."
    },
    "meta_tags": ["under-balcony", "delay", "gradiente"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "umbral_calidad_homogeneidad_sf",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Umbral de Calidad para Homogeneidad de Nivel (4*)",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Puntuación máxima de calidad (4*) basada en el diferencial de SPL (percentil 95) entre todas las posiciones de la audiencia para mantener la consistencia de la mezcla.",
      "formula_latex": "$$ \\Delta SPL_{95} \\leq 6 \\text{ dB} $$",
      "variables": { "\\Delta SPL_{95}": "Diferencial de SPL en el peor caso" },
      "restricciones": "Valores > 12 dB se consideran de calidad deficiente (1*)."
    },
    "meta_tags": ["calidad", "SPL", "homogeneidad"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "umbral_calidad_unmasking_sf",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Umbral de Calidad para Desenmascaramiento Espacial",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Valor mediano de desenmascaramiento espacial necesario para una separación clara de objetos en la mezcla inmersiva.",
      "formula_latex": "$$ Unmasking_{median} > 4 \\text{ dB} $$",
      "variables": { "Unmasking_{median}": "Mejora de la inteligibilidad/separación en dB" },
      "restricciones": "Puntuación máxima (4*). Valores < 1 dB no ofrecen beneficio espacial real."
    },
    "meta_tags": ["unmasking", "inteligibilidad", "calidad"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "umbral_calidad_error_localización_sf",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Umbral de Calidad para Error de Localización",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Error mediano de localización angular aceptable para mantener una alta consistencia audio-visual entre el objeto sonoro y el intérprete.",
      "formula_latex": "$$ \\epsilon_{loc} < 5^\\circ $$",
      "variables": { "\\epsilon_{loc}": "Error de localización mediano" },
      "restricciones": "Un error > 20° se considera inaceptable para sistemas de alta fidelidad espacial."
    },
    "meta_tags": ["localización", "error", "consistencia"],
    "version_dataset": "1.7"
  },
  {
    "id_concepto": "hallazgo_superioridad_spatial_fills",
    "categoria": "Algoritmos de Audio",
    "tipo": "Hallazgo",
    "titulo": "Balance de Rendimiento de la Solución Spatial-fills",
    "fuente": { "documento": "L-ISA Hyperreal Sound: Optimizing coverage and spatial rendering for fill systems", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Comparativa de rendimiento entre soluciones para sistemas de relleno. Solo Spatial-fills (S-Fills) logra un equilibrio óptimo entre los tres criterios fundamentales.",
      "formula_latex": "$$ S\\text{-Fills} = \\text{opt}(\\text{Homog}, \\text{Unmask}, \\text{Consist\_AV}) $$",
      "variables": {},
      "restricciones": "Las soluciones Mono priorizan solo homogeneidad; WFS (Delay-based) prioriza consistencia AV a costa de homogeneidad de nivel."
    },
    "meta_tags": ["S-Fills", "comparativa", "WFS", "Mono"],
    "version_dataset": "1.7"
  }
];
