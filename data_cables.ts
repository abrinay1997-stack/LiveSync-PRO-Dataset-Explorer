
import { Concept } from './types';

export const cableData: Concept[] = [
  {
    "id_concepto": "damping_factor_amplificador",
    "categoria": "Ingeniería de Audio",
    "tipo": "Fórmula",
    "titulo": "Factor de Amortiguamiento (LiveSync Pro Amp DF)",
    "fuente": { "documento": "LiveSync Pro: Demystifying Loudspeaker Cables", "año": 2015, "autor": "LiveSync Pro" },
    "contenido_tecnico": {
      "definicion_detallada": "Capacidad teórica del amplificador para controlar el cono, calculada como la relación entre la carga y su impedancia de salida.",
      "formula_latex": "$$ Amp DF = \\frac{Z_{load}}{Z_{out}} $$",
      "variables": { "Z_{load}": "Impedancia del altavoz", "Z_{out}": "Impedancia de salida del amplificador" },
      "restricciones": "Ignora la resistencia del cable y de la bobina móvil."
    },
    "meta_tags": ["damping factor", "amplificador", "impedancia"],
    "version_dataset": "1.1"
  }
];
