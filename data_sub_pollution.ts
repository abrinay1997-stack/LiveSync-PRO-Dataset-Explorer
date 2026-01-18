
import { Concept } from './types';

export const subPollutionData: Concept[] = [
  {
    "id_concepto": "definicion_contaminacion_acustica_spl",
    "categoria": "Acústica Ambiental",
    "tipo": "Definición",
    "titulo": "Contaminación Acústica por SPL a Larga Distancia",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021, "autor": "Mouterde & Corteel" },
    "contenido_tecnico": {
      "definicion_detallada": "Molestia sonora causada por el nivel de presión sonora generado por el sistema de altavoces en distancias remotas (ej. 250m), donde las bajas frecuencias son dominantes debido a la baja absorción.",
      "formula_latex": "$$ SPL_{pollution} = f(SPL_{source}, \\text{Directivity}, \\text{Atmosphere}) $$",
      "variables": { "SPL_{source}": "Nivel en la fuente", "Directivity": "Control de radiación (cardioide/arreglos)" },
      "restricciones": "La reducción efectiva se logra mediante la orientación del escenario y el control de directividad en LF."
    },
    "meta_tags": ["noise pollution", "SPL", "LF"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "rechazo_lateral_arc_sub_hallazgo",
    "categoria": "Ingeniería de Audio",
    "tipo": "Hallazgo",
    "titulo": "Eficiencia de Rechazo Lateral: Arc Sub vs Sub Beside",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "El Arc Sub (suelo) ofrece el mejor rechazo en la octava de 31.5 Hz, pero el peor rendimiento global en la banda A-weighted (20-160 Hz). La configuración 'Sub Beside' (volado al lado) es superior para rechazo lateral global.",
      "formula_latex": "$$ Rejection_{Side, 63Hz}: \\text{Sub Beside} > \\text{Arc Sub} $$",
      "variables": {},
      "restricciones": "Basado en mediciones de rechazo en dB respecto al nivel frontal."
    },
    "meta_tags": ["Arc Sub", "rechazo lateral", "Sub Beside"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "preset_cardioide_extendido_3_1",
    "categoria": "Configuración de Sistemas",
    "tipo": "Constante",
    "titulo": "Beneficio del Preset Cardioide Extendido (Ratio 3/1)",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Mejora del rechazo trasero utilizando una relación de 3 altavoces frontales por 1 trasero (ratio 3/1).",
      "formula_latex": "$$ \\text{Ratio}_{cardioid} = 3:1 $$",
      "variables": { "3": "Fuentes hacia adelante", "1": "Fuente de cancelación hacia atrás" },
      "restricciones": "El beneficio es significativamente mayor en configuraciones de subwoofers volados (flown) que en suelo."
    },
    "meta_tags": ["cardioide", "KS28", "rechazo trasero"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "refraccion_atmosferica_viento_hallazgo",
    "categoria": "Física Acústica",
    "tipo": "Hallazgo",
    "titulo": "Impacto de la Refracción por Viento (Downwind vs Upwind)",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "La velocidad del viento varía con la altura, creando un gradiente que curva los rayos sonoros.",
      "formula_latex": "$$ \\text{Downwind} \\rightarrow \\text{Refracción Abajo} \\rightarrow SPL \\uparrow $$",
      "variables": { "Downwind": "Viento a favor (fuente a receptor)", "Upwind": "Viento en contra (receptor a fuente)" },
      "restricciones": "La refracción hacia arriba (Upwind) crea zonas de sombra con menor contaminación acústica."
    },
    "meta_tags": ["viento", "refracción", "propagación"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "inversion_termica_nocturna_spl",
    "categoria": "Meteorología / Acústica",
    "tipo": "Hallazgo",
    "titulo": "Impacto de la Inversión Térmica Nocturna",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Durante la noche, el gradiente de temperatura positivo (la temperatura aumenta con la altitud) provoca una refracción hacia abajo de las ondas sonoras.",
      "formula_latex": "$$ \\frac{dT}{dz} > 0 \\rightarrow SPL_{ground} \\uparrow \\uparrow $$",
      "variables": { "T": "Temperatura", "z": "Altitud" },
      "restricciones": "Incrementa el nivel de presión sonora en todas las bandas de octava estudiadas a larga distancia."
    },
    "meta_tags": ["inversión térmica", "noche", "refracción"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "metodo_ecuaciones_parabolicas_pe",
    "categoria": "Simulación Numérica",
    "tipo": "Definición",
    "titulo": "Simulación mediante Ecuaciones Parabólicas (PE)",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Método numérico avanzado para simular la propagación de ondas de baja frecuencia en atmósferas inhomogéneas.",
      "formula_latex": "$$ \\frac{\\partial \\psi}{\\partial x} = ik_0[\\sqrt{1 + \\frac{1}{k_0^2} \\frac{\\partial^2}{\\partial z^2}} - 1]\\psi $$",
      "variables": { "\\psi": "Campo sonoro", "k_0": "Número de onda", "x": "Distancia", "z": "Altura" },
      "restricciones": "Considera impedancia variable del suelo y perfiles de celeridad vertical de forma más precisa que el trazado de rayos."
    },
    "meta_tags": ["PE", "simulación", "propagación", "algoritmos"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "criterio_normalizacion_comparativa_ruido",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Normalización para Comparativa de Contaminación Acústica",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Para que los diseños sean comparables, deben proporcionar la misma experiencia sonora en la audiencia.",
      "formula_latex": "$$ SPL_{target} = 99 \\text{ dB(A)} / 112 \\text{ dB(C)} @ 40 \\text{ m} $$",
      "variables": { "SPL_{target}": "Nivel de presión sonora objetivo para la mezcla" },
      "restricciones": "Ajuste promediado a lo largo del ancho de la audiencia."
    },
    "meta_tags": ["normalización", "metodología", "comparativa"],
    "version_dataset": "2.1"
  },
  {
    "id_concepto": "segmentacion_angular_espacio_farfield",
    "categoria": "Análisis de Datos",
    "tipo": "Definición",
    "titulo": "Segmentación Angular del Espacio (Far-field)",
    "fuente": { "documento": "Flown subwoofers do not generate more noise pollution / L-Acoustics", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "División del espacio alrededor del sistema para el análisis de spill y cobertura.",
      "formula_latex": "$$ \\text{Sectores} = \\{ \\text{Front} (60^\\circ), \\text{Rear} (120^\\circ), \\text{Sides} (\\text{Resto}) \\} $$",
      "variables": {},
      "restricciones": "El sector 'Front' corresponde al ancho de audiencia típico."
    },
    "meta_tags": ["segmentación", "polar", "far-field"],
    "version_dataset": "2.1"
  }
];
