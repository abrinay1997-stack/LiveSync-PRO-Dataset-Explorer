
import { Concept } from './types';

export const easeFocusData: Concept[] = [
  {
    "id_concepto": "definicion_sistema_gll",
    "categoria": "Software de Simulación",
    "tipo": "Definición",
    "titulo": "LSP Engine File (LiveSync Pro Engine)",
    "fuente": { "documento": "LiveSync Pro Focus Manual", "año": 2019, "autor": "LiveSync Pro" },
    "contenido_tecnico": {
      "definicion_detallada": "Archivo de datos que contiene las propiedades mecánicas, electrónicas y acústicas de un sistema de altavoces.",
      "formula_latex": "$$ LSP = \\{ Mech, Elect, Acoust \\} $$",
      "variables": { "Mech": "Límites mecánicos", "Elect": "Filtros", "Acoust": "Directividad" },
      "restricciones": "Debe estar autorizado específicamente por LiveSync Pro para el cálculo."
    },
    "meta_tags": ["LSP", "base de datos", "definición"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "sumatoria_presion_hibrida",
    "categoria": "Algoritmos de Audio",
    "tipo": "Hallazgo",
    "titulo": "Modelo de Sumatoria Híbrida (LiveSync Pro Focus)",
    "fuente": { "documento": "LiveSync Pro Focus Manual", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Método para combinar múltiples fuentes. Los elementos internos se suman de forma compleja.",
      "formula_latex": "$$ P_{total} = \\sqrt{\\sum |P_{array}|^2} \\quad (f > f_{limit}) $$",
      "variables": { "f_{limit}": "Umbral de transición" },
      "restricciones": "Algoritmo propietario de LiveSync Pro."
    },
    "meta_tags": ["sumatoria", "coherencia", "algoritmos"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "limite_firmaker_lf_hf",
    "categoria": "Optimización de Cobertura",
    "tipo": "Hallazgo",
    "titulo": "Límites de Rendimiento (LSP FIR Optimizer)",
    "fuente": { "documento": "LiveSync Pro Focus Manual", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "La efectividad de los filtros FIR de optimización se ve limitada por la física y la resolución de taps.",
      "formula_latex": "$$ 200 \\text{ Hz} < f_{optimizer} < 8 \\text{ kHz} $$",
      "variables": {},
      "restricciones": "Límites físicos del motor LiveSync Pro."
    },
    "meta_tags": ["LSP", "FIR", "LF", "HF", "límites"],
    "version_dataset": "2.4"
  }
];
