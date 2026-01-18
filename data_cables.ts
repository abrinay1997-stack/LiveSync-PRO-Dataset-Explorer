
import { Concept } from './types';

export const cableData: Concept[] = [
  {
    "id_concepto": "damping_factor_amplificador",
    "categoria": "Ingeniería de Audio",
    "tipo": "Fórmula",
    "titulo": "Factor de Amortiguamiento del Amplificador (Amp DF)",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Capacidad teórica del amplificador para controlar el cono, calculada como la relación entre la carga y su impedancia de salida.",
      "formula_latex": "$$ Amp DF = \\frac{Z_{load}}{Z_{out}} $$",
      "variables": { "Z_{load}": "Impedancia del altavoz", "Z_{out}": "Impedancia de salida del amplificador" },
      "restricciones": "Ignora la resistencia del cable y de la bobina móvil."
    },
    "meta_tags": ["damping factor", "amplificador", "impedancia"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "overall_damping_factor",
    "categoria": "Ingeniería de Audio",
    "tipo": "Fórmula",
    "titulo": "Factor de Amortiguamiento Global (Overall DF)",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015, "autor": "Augsperger (1967) via L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Incluye la resistencia de la bobina móvil en la carga, proporcionando una visión más realista del control sobre el sistema resonante.",
      "formula_latex": "$$ Overall DF = \\frac{Z_{load}}{Z_{out} + Z_{load}} $$",
      "variables": { "Z_{load}": "Impedancia total percibida", "Z_{out}": "Impedancia de salida" },
      "restricciones": "Demuestra que valores de Amp DF > 20 tienen rendimientos decrecientes."
    },
    "meta_tags": ["Augsperger", "amortiguamiento real", "bobina móvil"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "damping_factor_con_cable",
    "categoria": "Ingeniería de Audio",
    "tipo": "Fórmula",
    "titulo": "Factor de Amortiguamiento con Cable",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Impedancia real percibida por el altavoz incluyendo la resistencia añadida por el cableado.",
      "formula_latex": "$$ DF = \\frac{Z_{load}}{Z_{out} + Z_{cable}} $$",
      "variables": { "Z_{load}": "Carga altavoz", "Z_{cable}": "Resistencia del cable (ida y vuelta)" },
      "restricciones": "Criterio estándar en pro-audio para limitar la resistencia del cable."
    },
    "meta_tags": ["damping factor", "cables", "instalación"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "resistencia_cable_dc",
    "categoria": "Electrónica",
    "tipo": "Fórmula",
    "titulo": "Resistencia Óhmica del Cable",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015 },
    "contenido_tecnico": {
      "definicion_detallada": "Resistencia básica en DC de un par de conductores.",
      "formula_latex": "$$ R_{cable} = 2 \\frac{\\rho \\cdot l}{S} $$",
      "variables": { "\\rho": "Resistividad", "l": "Longitud (un sentido)", "S": "Sección transversal" },
      "restricciones": "El factor 2 compensa el par de conductores."
    },
    "meta_tags": ["resistencia", "cobre", "DC"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "reactancia_inductiva_cable",
    "categoria": "Electromagnetismo",
    "tipo": "Fórmula",
    "titulo": "Reactancia Inductiva del Cable",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015 },
    "contenido_tecnico": {
      "definicion_detallada": "Impedancia compleja debida a la auto-inductancia del cable, proporcional a la frecuencia.",
      "formula_latex": "$$ Z_L = 2 j L_0 l \\omega $$",
      "variables": { "L_0": "Auto-inductancia lineal", "l": "Longitud", "\\omega": "Frecuencia angular (2πf)" },
      "restricciones": "Causa principal de pérdida de potencia en altas frecuencias."
    },
    "meta_tags": ["inductancia", "reactancia", "HF loss"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "profundidad_piel_skin_effect",
    "categoria": "Electromagnetismo",
    "tipo": "Fórmula",
    "titulo": "Profundidad de Piel (Skin Depth)",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015 },
    "contenido_tecnico": {
      "definicion_detallada": "Decaimiento de la densidad de corriente hacia el centro del conductor en AC.",
      "formula_latex": "$$ \\delta = \\sqrt{\\frac{\\rho}{\\pi \\mu f}} $$",
      "variables": { "\\delta": "Profundidad piel", "f": "Frecuencia" },
      "restricciones": "Crítico en secciones >6mm² por encima de 3kHz."
    },
    "meta_tags": ["skin effect", "AC resistance"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "ganancia_relativa_cable_loss",
    "categoria": "Medición",
    "tipo": "Fórmula",
    "titulo": "Ecuación de Pérdida de Potencia (Transferencia)",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015 },
    "contenido_tecnico": {
      "definicion_detallada": "Predice la influencia directa del cable en la respuesta en frecuencia del altavoz.",
      "formula_latex": "$$ G_{dB} = 20 \\log \\left| \\frac{Z_{load}}{Z_{out} + Z_{cable} + Z_{load}} \\right| $$",
      "variables": { "G_{dB}": "Pérdida/Ganancia relativa", "Z_{load}": "Impedancia compleja altavoz" },
      "restricciones": "Permite modelar el 'boost' de nivel en frecuencias donde la fase del altavoz es negativa."
    },
    "meta_tags": ["SPL loss", "transferencia", "respuesta frecuencia"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "hallazgo_mito_df_20",
    "categoria": "Psicoacústica / Ingeniería",
    "tipo": "Hallazgo",
    "titulo": "Rendimientos Decrecientes en Damping Factor",
    "fuente": { "documento": "Demystifying Loudspeaker Cables", "año": 2015 },
    "contenido_tecnico": {
      "definicion_detallada": "Aumentar el Amp DF por encima de 20 no aumenta significativamente el Overall DF debido a la resistencia interna de la bobina móvil del altavoz.",
      "formula_latex": "$$ Amp DF > 20 \\rightarrow \\text{Efecto despreciable en control} $$",
      "variables": {},
      "restricciones": "Sugiere que invertir en cables excesivamente gruesos para subir el DF es ineficiente."
    },
    "meta_tags": ["mito", "damping factor", "eficiencia"],
    "version_dataset": "1.1"
  }
];
