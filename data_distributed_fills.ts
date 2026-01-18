
import { Concept } from './types';

export const distributedFillsData: Concept[] = [
  {
    "id_concepto": "cambios_paradigma_audio_inmersivo",
    "categoria": "Arquitectura de Sistemas",
    "tipo": "Definición",
    "titulo": "Cambios de Paradigma en Reproducción Inmersiva",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021, "autor": "Corteel, Roskam & Moulin" },
    "contenido_tecnico": {
      "definicion_detallada": "Tres transiciones fundamentales requeridas para pasar de sistemas convencionales a inmersivos de alta calidad.",
      "formula_latex": "$$ \\text{Paradigma} = \\{ \\text{Channel} \\rightarrow \\text{Object}, \\text{Algoritmo Metadata}, \\text{Diseño Adaptado} \\} $$",
      "variables": {},
      "restricciones": "El diseño debe garantizar cobertura independiente de la posición del objeto."
    },
    "meta_tags": ["paradigma", "objetos", "metadata"],
    "version_dataset": "1.9"
  },
  {
    "id_concepto": "layout_minimo_escena_lisa",
    "categoria": "Diseño de Sistemas",
    "tipo": "Constante",
    "titulo": "Layout Mínimo del Sistema de Escena (Scene)",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Configuración mínima de fuentes de rango completo para permitir el refuerzo sonoro espacial sobre el escenario.",
      "formula_latex": "$$ N_{scene, min} = 5 \\text{ fuentes} $$",
      "variables": { "N_{scene, min}": "Número mínimo de fuentes frontales" },
      "restricciones": "Las fuentes deben abarcar todo el ancho del escenario y maximizar la cobertura compartida."
    },
    "meta_tags": ["escena", "diseño", "frontales"],
    "version_dataset": "1.9"
  },
  {
    "id_concepto": "taxonomia_sistemas_relleno_inmersivos",
    "categoria": "Diseño de Sistemas",
    "tipo": "Definición",
    "titulo": "Taxonomía de Sistemas de Relleno (Fills)",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Clasificación de sistemas suplementarios según el área de audiencia y posicionamiento físico.",
      "formula_latex": "$$ \\text{Fills} \\in \\{ \\text{Front}, \\text{In}, \\text{Out}, \\text{Under-balcony}, \\text{Delay} \\} $$",
      "variables": { "In-fills": "Lados del escenario hacia adentro", "Out-fills": "Lados del escenario hacia afuera", "Delay-fills": "Fuentes separadas a gran distancia" },
      "restricciones": "Clásicamente alimentados en mono, limitando la información espacial."
    },
    "meta_tags": ["fills", "relleno", "front-fills", "under-balcony"],
    "version_dataset": "1.9"
  },
  {
    "id_concepto": "limite_aliasing_wfs_espaciado",
    "categoria": "Algoritmos de Audio",
    "tipo": "Hallazgo",
    "titulo": "Límite de Aliasing en WFS por Espaciado de Fuentes",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "En sistemas frontales con gran espaciado entre altavoces, la reconstrucción física del campo sonoro es inexacta por encima de la frecuencia de aliasing.",
      "formula_latex": "$$ d_{sp} > 4 \\text{ m} \\rightarrow f_{alias} < 100 \\text{ Hz} $$",
      "variables": { "d_{sp}": "Espaciado entre altavoces", "f_{alias}": "Frecuencia de aliasing espacial" },
      "restricciones": "Por encima de este límite, la localización se rige por precedencia (Haas) y no por síntesis física."
    },
    "meta_tags": ["WFS", "aliasing", "frecuencia límite"],
    "version_dataset": "1.9"
  },
  {
    "id_concepto": "umbral_consistencia_av_horizontal_7_5",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Umbral de Error de Localización Horizontal (AV)",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Error angular máximo en el plano horizontal para garantizar que el sonido y la imagen visual se fundan en un único objeto perceptual.",
      "formula_latex": "$$ \\epsilon_{accept} = 7.5^\\circ $$",
      "variables": { "\\epsilon_{accept}": "Error angular máximo aceptable" },
      "restricciones": "Valor crítico para el diseño de sistemas de front-fills y su alineamiento con el sistema de escena."
    },
    "meta_tags": ["localización", "error", "consistencia"],
    "version_dataset": "1.9"
  },
  {
    "id_concepto": "criterio_alineamiento_temporal_inmersivo",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Criterio de Alineamiento Temporal para Sistemas Inmersivos",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Condiciones para considerar que dos fuentes están alineadas temporalmente sin percepción de artefactos o ecos.",
      "formula_latex": "$$ \\Delta t \\leq 10 \\text{ ms} \\quad \\text{para fuentes con } \\Delta L \\leq \\pm 6 \\text{ dB} $$",
      "variables": { "\\Delta t": "Retardo relativo", "\\Delta L": "Diferencia de nivel relativo" },
      "restricciones": "Fuentes > 6 dB por debajo de la referencia se consideran aisladas y no causan eco crítico."
    },
    "meta_tags": ["alineamiento", "delay", "fase", "eco"],
    "version_dataset": "1.9"
  },
  {
    "id_concepto": "superioridad_homogeneidad_sf_hallazgo",
    "categoria": "Algoritmos de Audio",
    "tipo": "Hallazgo",
    "titulo": "Superioridad de Homogeneidad de Nivel de Spatial-fills",
    "fuente": { "documento": "Spatial rendering over distributed fill systems / Proc. IoA Vol. 43", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Comparativa de homogeneidad de nivel (SPL) entre un front-fill físico individual y una réplica virtual creada por el algoritmo de Spatial-fills.",
      "formula_latex": "$$ \\Delta SPL_{physical} = 30 \\text{ dB} \\rightarrow \\Delta SPL_{S-Fills} = 8 \\text{ dB} $$",
      "variables": {},
      "restricciones": "Medido en las posiciones más cercanas al escenario (depth = -2m)."
    },
    "meta_tags": ["SPL", "homogeneidad", "S-Fills"],
    "version_dataset": "1.9"
  }
];
