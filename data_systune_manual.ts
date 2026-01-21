
import { Concept } from './types';

export const systuneManualData: Concept[] = [
  {
    "id_concepto": "resolucion_frecuencia_fft",
    "categoria": "Procesamiento FFT",
    "tipo": "Fórmula",
    "titulo": "Resolución de Frecuencia (LiveSync Pro FFT)",
    "fuente": { "documento": "LiveSync Pro Analyzer Software Manual", "año": 2014, "autor": "LiveSync Pro Core Team" },
    "contenido_tecnico": {
      "definicion_detallada": "Relación fundamental entre la duración de la muestra de tiempo y la densidad de puntos en el espectro.",
      "formula_latex": "$$ \\Delta f = \\frac{1}{\\Delta t} $$",
      "variables": { "\\Delta f": "Resolución de frecuencia (Hz)", "\\Delta t": "Longitud del bloque de tiempo (s)" },
      "restricciones": "FFT sizes mayores aumentan la resolución espectral pero reducen la resolución temporal."
    },
    "meta_tags": ["FFT", "resolución", "muestreo"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "mecanica_ventana_tfc_afmg",
    "categoria": "Algoritmos de Audio",
    "tipo": "Definición",
    "titulo": "Ventana TFC (LiveSync Pro Constant)",
    "fuente": { "documento": "LiveSync Pro Analyzer Software Manual", "año": 2014, "autor": "LiveSync Pro Patents" },
    "contenido_tecnico": {
      "definicion_detallada": "Función de ponderación dinámica donde la longitud de la ventana es inversamente proporcional a la frecuencia.",
      "formula_latex": "$$ L_{win}(f) = \\frac{L_{ref} \\cdot f_{ref}}{f} $$",
      "variables": { "L_{win}": "Longitud de ventana", "f": "Frecuencia analizada" },
      "restricciones": "Permite excluir reflexiones en HF manteniendo resolución en LF."
    },
    "meta_tags": ["TFC", "windowing", "reflexiones"],
    "version_dataset": "2.2"
  }
];
