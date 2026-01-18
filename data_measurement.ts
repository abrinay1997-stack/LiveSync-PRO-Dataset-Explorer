
import { Concept } from './types';

export const measurementData: Concept[] = [
  {
    "id_concepto": "definicion_low_frequencies_lisa",
    "categoria": "Metodología de Medición",
    "tipo": "Definición",
    "titulo": "Definición de Bajas Frecuencias (LF)",
    "fuente": { "documento": "How to improve measurement quality at low frequencies?", "año": 2020, "autor": "L-Acoustics" },
    "contenido_tecnico": {
      "definicion_detallada": "Rango de frecuencias inferior cuando el espectro audible se divide en tres bandas (low/medium/high).",
      "formula_latex": "$$ f_{LF} < 250 \\text{ Hz} $$",
      "variables": { "f_{LF}": "Rango de bajas frecuencias" },
      "restricciones": "Banda crítica donde el ruido de fondo impacta más la calidad de la medición."
    },
    "meta_tags": ["LF", "definición", "espectro"],
    "version_dataset": "1.4"
  },
  {
    "id_concepto": "pendiente_espectro_ruido",
    "categoria": "Acústica Ambiental",
    "tipo": "Constante",
    "titulo": "Pendiente Típica del Espectro de Ruido de Fondo",
    "fuente": { "documento": "How to improve measurement quality at low frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Característica de paso bajo del ruido de fondo ambiental (impulsivo, viento, HVAC).",
      "formula_latex": "$$ \\text{Slope}_{noise} = -6 \\text{ dB/octave} $$",
      "variables": { "Slope_{noise}": "Pendiente de caída del ruido" },
      "restricciones": "Genera mayores errores de medición en la región de baja frecuencia del altavoz."
    },
    "meta_tags": ["ruido", "pendiente", "espectro"],
    "version_dataset": "1.4"
  },
  {
    "id_concepto": "numero_sweeps_optimo",
    "categoria": "Metodología de Medición",
    "tipo": "Constante",
    "titulo": "Número Recomendado de Barridos (Sweeps)",
    "fuente": { "documento": "How to improve measurement quality at low frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Parámetro crítico para mejorar la consistencia y reducir la inestabilidad de la medición frente al ruido inestable.",
      "formula_latex": "$$ N_{ext} = 8, \\quad N_{int} = 4 $$",
      "variables": { "N_{ext}": "Sweeps para exterior", "N_{int}": "Sweeps para interior" },
      "restricciones": "Duplicar el número de sweeps reduce el error de magnitud extremo en aprox. 2 dB."
    },
    "meta_tags": ["sweeps", "barridos", "metodología"],
    "version_dataset": "1.4"
  },
  {
    "id_concepto": "mejora_snr_por_acumulacion",
    "categoria": "Procesamiento de Señal",
    "tipo": "Hallazgo",
    "titulo": "Mejora de SNR por Multiplicación de Sweeps",
    "fuente": { "documento": "How to improve measurement quality at low frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Incremento observado en la relación señal-ruido al promediar múltiples adquisiciones consecutivas.",
      "formula_latex": "$$ \\Delta SNR_{1 \\rightarrow 8} \\approx 8 \\text{ a } 9 \\text{ dB} $$",
      "variables": { "\\Delta SNR": "Mejora en la relación señal-ruido" },
      "restricciones": "En valores de SNR extremadamente bajos, la mejora se limita a 4-5 dB."
    },
    "meta_tags": ["SNR", "ganancia", "promediado"],
    "version_dataset": "1.4"
  },
  {
    "id_concepto": "ganancia_snr_duracion_sweep",
    "categoria": "Procesamiento de Señal",
    "tipo": "Fórmula",
    "titulo": "Ganancia Teórica de SNR por Duración de Sweep",
    "fuente": { "documento": "How to improve measurement quality at low frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Relación entre el aumento del tiempo de integración del barrido y la mejora de la relación señal-ruido, asumiendo ruido decorrelacionado.",
      "formula_latex": "$$ \\Delta SNR = 10 \\log_{10} \\left( \\frac{t_{new}}{t_{old}} \\right) $$",
      "variables": { "t": "Duración del sweep (M, L, XL)" },
      "restricciones": "Duplicar la duración (M a L) aporta 3 dB; cuadruplicarla (M a XL) aporta 6 dB."
    },
    "meta_tags": ["SNR", "tiempo", "integración"],
    "version_dataset": "1.4"
  },
  {
    "id_concepto": "variabilidad_ruido_fondo",
    "categoria": "Acústica Ambiental",
    "tipo": "Constante",
    "titulo": "Variabilidad Máxima del Ruido de Fondo",
    "fuente": { "documento": "How to improve measurement quality at low frequencies?", "año": 2020 },
    "contenido_tecnico": {
      "definicion_detallada": "Inestabilidad típica del ruido de fondo en mediciones acústicas profesionales.",
      "formula_latex": "$$ Var_{ext} \\approx 20 \\text{ dB}, \\quad Var_{int} \\approx 12 \\text{ dB} $$",
      "variables": { "Var": "Rango de variación de nivel" },
      "restricciones": "Valores observados a una frecuencia dada bajo condiciones normales de trabajo."
    },
    "meta_tags": ["ruido", "variabilidad", "incertidumbre"],
    "version_dataset": "1.4"
  }
];
