
import { Concept } from './types';

export const easeManualData: Concept[] = [
  {
    "id_concepto": "ecuacion_reverberacion_eyring_ease",
    "categoria": "Acústica Estadística",
    "tipo": "Fórmula",
    "titulo": "Tiempo de Reverberación (LiveSync Pro Modeler)",
    "fuente": { "documento": "LiveSync Pro Modeler Manual", "año": 2025, "autor": "LiveSync Pro Engineering" },
    "contenido_tecnico": {
      "definicion_detallada": "Modelo estadístico considerando la absorción media y la atenuación del aire.",
      "formula_latex": "$$ T = k_T \\frac{V}{4mV - S \\ln(1 - \\bar{\\alpha})} $$",
      "variables": { "k_T": "0.161 s/m", "V": "Volumen (m³)", "S": "Superficie total (m²)", "\\bar{\\alpha}": "Coeficiente de absorción medio", "m": "Atenuación del aire" },
      "restricciones": "Asume un campo difuso establecido."
    },
    "meta_tags": ["Eyring", "reverberación", "RT60", "atenuación"],
    "version_dataset": "2.3"
  }
];
