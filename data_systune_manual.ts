
import { Concept } from './types';

export const systuneManualData: Concept[] = [
  {
    "id_concepto": "resolucion_frecuencia_fft",
    "categoria": "Procesamiento FFT",
    "tipo": "Fórmula",
    "titulo": "Resolución de Frecuencia en la FFT",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014, "autor": "Oppenheim & Schafer" },
    "contenido_tecnico": {
      "definicion_detallada": "Relación fundamental entre la duración de la muestra de tiempo y la densidad de puntos en el espectro de frecuencia resultante.",
      "formula_latex": "$$ \\Delta f = \\frac{1}{\\Delta t} $$",
      "variables": { "\\Delta f": "Resolución de frecuencia (Hz)", "\\Delta t": "Longitud del bloque de tiempo (s)" },
      "restricciones": "FFT sizes mayores aumentan la resolución espectral pero reducen la resolución temporal."
    },
    "meta_tags": ["FFT", "resolución", "muestreo"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "fórmula_fase_total_tf",
    "categoria": "Procesamiento de Señal",
    "tipo": "Fórmula",
    "titulo": "Composición de la Fase en la Función de Transferencia",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "La fase medida es la suma de la fase inherente del sistema y la fase introducida por el retardo de propagación.",
      "formula_latex": "$$ \\Phi_{total} = \\Phi_{inherent} - 2\\pi f \\cdot \\text{Delay} $$",
      "variables": { "\\Phi_{total}": "Fase medida", "f": "Frecuencia", "Delay": "Tiempo de vuelo / Latencia" },
      "restricciones": "Un delay no compensado produce una pendiente de fase (slope) que dificulta ver la fase real del dispositivo."
    },
    "meta_tags": ["fase", "delay", "propagación"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "definicion_t20_iso3382",
    "categoria": "Acústica de Salas",
    "tipo": "Constante",
    "titulo": "Tiempo de Reverberación T20 (ISO 3382)",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Método de cálculo del RT60 basado en el decaimiento de la integral de Schroeder desde -5 dB hasta -25 dB.",
      "formula_latex": "$$ RT_{T20} = 3 \\cdot (t_{-25dB} - t_{-5dB}) $$",
      "variables": { "t": "Tiempo en la curva de decaimiento" },
      "restricciones": "Requiere compensación de ruido (Noise Comp) para evitar sobreevaluación del RT en colas ruidosas."
    },
    "meta_tags": ["reverberación", "RT60", "T20", "ISO3382"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "mecanica_ventana_tfc_afmg",
    "categoria": "Algoritmos de Audio",
    "tipo": "Definición",
    "titulo": "Ventana TFC (Time-Frequency-Constant)",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014, "autor": "Patent-Pending AFMG" },
    "contenido_tecnico": {
      "definicion_detallada": "Función de ponderación dinámica donde la longitud de la ventana es inversamente proporcional a la frecuencia.",
      "formula_latex": "$$ L_{win}(f) = \\frac{L_{ref} \\cdot f_{ref}}{f} $$",
      "variables": { "L_{win}": "Longitud de ventana", "f": "Frecuencia analizada" },
      "restricciones": "Permite excluir reflexiones en HF manteniendo resolución en LF. La ventana base es una Tukey 50%."
    },
    "meta_tags": ["TFC", "windowing", "reflexiones"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "proceso_deconvolucion_wiener",
    "categoria": "Matemáticas de Medición",
    "tipo": "Definición",
    "titulo": "De-convolución Adaptada (Algoritmo Wiener)",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Método para derivar la respuesta al impulso dividiendo el espectro de salida por el de entrada, aplicando un umbral para evitar división por cero.",
      "formula_latex": "$$ H(f) = \\frac{Y(f) \\cdot X^*(f)}{|X(f)|^2 + \\epsilon} $$",
      "variables": { "X(f)": "Señal de referencia", "Y(f)": "Señal medida", "\\epsilon": "Factor de estabilidad (Wiener)" },
      "restricciones": "Solo puede derivar la TF en frecuencias excitadas por el estímulo."
    },
    "meta_tags": ["de-convolución", "Wiener", "TF"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "estadios_filtro_ssa",
    "categoria": "Procesamiento de Señal",
    "tipo": "Definición",
    "titulo": "Etapas del Filtro SSA (Spectrally Selective Accumulation)",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Algoritmo de tres etapas para mediciones con música o voz: 1. Umbral de señal, 2. Filtro de excursión (comparación con promedio), 3. Filtro de coherencia.",
      "formula_latex": "$$ \\text{Weight}_{SSA} = f(\\text{Thresh}, \\text{Excursion}, \\text{Coherence}) $$",
      "variables": {},
      "restricciones": "Mejora drásticamente la inmunidad al ruido en mediciones en vivo."
    },
    "meta_tags": ["SSA", "filtrado", "medición en vivo"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "metrica_sti_iec60268_16",
    "categoria": "Inteligibilidad",
    "tipo": "Constante",
    "titulo": "Índice de Transmisión del Habla (STI)",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014, "autor": "IEC 60268-16" },
    "contenido_tecnico": {
      "definicion_detallada": "Medida de inteligibilidad basada en la preservación de las frecuencias de modulación (1 a 12 Hz) en 7 bandas de octava.",
      "formula_latex": "$$ 0.00 \\text{ (Ininteligible)} \\rightarrow 1.00 \\text{ (Excelente)} $$",
      "variables": {},
      "restricciones": "Valores > 0.5 se consideran suficientes según el estándar."
    },
    "meta_tags": ["STI", "inteligibilidad", "IEC60268"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "limite_modulo_delay_offset",
    "categoria": "Configuración de Software",
    "tipo": "Constante",
    "titulo": "Límite del Módulo de Delay Offset",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Restricción técnica sobre el valor máximo de compensación de retardo permitida en relación a la longitud de la FFT.",
      "formula_latex": "$$ |\\text{Delay}_{offset}| \\leq \\min(0.25 \\cdot L_{FFT}, 0.25 \\cdot L_{play}) $$",
      "variables": { "L_{FFT}": "Longitud de la FFT", "L_{play}": "Longitud de la señal de estímulo" },
      "restricciones": "Garantiza la validez de la correlación de los bloques."
    },
    "meta_tags": ["delay", "FFT", "límites"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "relacion_pico_rms_sinusoidal",
    "categoria": "Metrología",
    "tipo": "Constante",
    "titulo": "Relación Peak-to-RMS para Ondas Sinusoidales",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Diferencia de nivel expresada en dB entre el valor de pico (Time Signal) y el valor eficaz (Spectrum) para un tono puro.",
      "formula_latex": "$$ L_{peak} = L_{rms} + 3 \\text{ dB} $$",
      "variables": {},
      "restricciones": "Solo válido para señales senoidales puras."
    },
    "meta_tags": ["Peak", "RMS", "dB"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "umbral_coherencia_validez",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Umbrales Típicos de Coherencia",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Valores de referencia para determinar si un punto de la respuesta en frecuencia es estadísticamente fiable.",
      "formula_latex": "$$ \\gamma^2_{low} \\approx 25\\%, \\quad \\gamma^2_{high} \\approx 50\\% $$",
      "variables": { "\\gamma^2": "Función de coherencia" },
      "restricciones": "Valores más bajos son aceptables con un número muy alto de promedios."
    },
    "meta_tags": ["coherencia", "fiabilidad", "SNR"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "ganancia_snr_promedio_temporal",
    "categoria": "Procesamiento de Señal",
    "tipo": "Hallazgo",
    "titulo": "Mejora de SNR por Promediado de Bloques",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Reducción del piso de ruido aleatorio lograda al duplicar la cantidad de promedios (averages) de bloques FFT.",
      "formula_latex": "$$ \\Delta SNR = +3 \\text{ dB per doubling of averages} $$",
      "variables": {},
      "restricciones": "Asume ruido con distribución aleatoria y señal coherente."
    },
    "meta_tags": ["SNR", "averaging", "ruido"],
    "version_dataset": "2.2"
  },
  {
    "id_concepto": "definicion_etc_log_ir",
    "categoria": "Análisis de Tiempo",
    "tipo": "Definición",
    "titulo": "Curva de Energía-Tiempo (ETC)",
    "fuente": { "documento": "AFMG SysTune Software Manual Rev. 5", "año": 2014 },
    "contenido_tecnico": {
      "definicion_detallada": "Representación logarítmica de la respuesta al impulso elevada al cuadrado, esencial para visualizar reflexiones y decaimiento.",
      "formula_latex": "$$ \\text{ETC}(t) = 10 \\log_{10}(|h(t)|^2) $$",
      "variables": { "h(t)": "Respuesta al impulso en el tiempo" },
      "restricciones": "Permite identificar reflexiones discretas y el inicio del campo difuso."
    },
    "meta_tags": ["ETC", "reflexiones", "energía"],
    "version_dataset": "2.2"
  }
];
