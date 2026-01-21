
import { Concept } from './types';

export const scientificRefsData: Concept[] = [
  // CATEGORÍA 1: ATMOSFÉRICO & AMBIENTAL
  {
    "id_concepto": "iso_9613_1_atenuacion",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Coeficiente de Atenuación Atmosférica (ISO 9613-1)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1993, "autor": "ISO" },
    "contenido_tecnico": {
      "definicion_detallada": "Incluye la absorción clásica y la relajación molecular de O₂ y N₂. Es fundamental para predicciones de largo alcance.",
      "formula_latex": "$$ \\alpha = 8.686 f^2 [1.84 \\cdot 10^{-11} \\frac{\\sqrt{T/T_r}}{p_r} + (T/T_r)^{-2.5} (\\dots)] $$",
      "variables": { "f": "Frecuencia", "T": "Temperatura", "p_r": "Presión de referencia", "\\alpha": "Atenuación (dB/m)" },
      "restricciones": "Depende altamente de la humedad relativa y temperatura."
    },
    "meta_tags": ["LSP-IN-USE", "ISO 9613-1", "absorción", "aire"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "concentracion_molar_vapor",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Concentración Molar de Vapor de Agua",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Determina cómo la humedad afecta las frecuencias de relajación molecular en el aire.",
      "formula_latex": "$$ h = (RH/100) \\cdot (p_{sat}/p) $$",
      "variables": { "RH": "Humedad Relativa (%)", "p_{sat}": "Presión de saturación", "p": "Presión atmosférica" },
      "restricciones": "Adimensional (0-1)."
    },
    "meta_tags": ["LSP-IN-USE", "humedad", "moléculas"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "velocidad_sonido_aire_lineal",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Velocidad del Sonido en Aire (Aprox. Lineal)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Aproximación estándar para ingeniería de campo.",
      "formula_latex": "$$ c = 331.3 + 0.6T $$",
      "variables": { "T": "Temperatura en °C", "c": "Velocidad (m/s)" },
      "restricciones": "Válida entre -20°C y +40°C."
    },
    "meta_tags": ["LSP-IN-USE", "c", "temperatura"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "refraccion_gradiente_viento",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Refracción por Gradiente de Viento",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Componente vectorial del viento que altera el frente de onda.",
      "formula_latex": "$$ \\Delta c = v \\cdot \\cos(\\theta) $$",
      "variables": { "v": "Velocidad del viento", "\\theta": "Ángulo de propagación" },
      "restricciones": "Afecta la focalización del sonido a grandes distancias."
    },
    "meta_tags": ["LSP-IN-USE", "viento", "refracción"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 2: TEORÍA ACÚSTICA
  {
    "id_concepto": "ley_inverso_cuadrado",
    "categoria": "Teoría Acústica",
    "tipo": "Fórmula",
    "titulo": "Ley del Inverso del Cuadrado (Fuente Puntual)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Reducción de nivel por expansión esférica.",
      "formula_latex": "$$ SPL(d) = SPL(d_0) - 20 \\log_{10}(d/d_0) $$",
      "variables": { "d": "Distancia final", "d_0": "Distancia de referencia" },
      "restricciones": "Válido solo en campo lejano y condiciones de espacio libre."
    },
    "meta_tags": ["LSP-IN-USE", "6dB", "propagación"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "propagacion_cilindrica_la",
    "categoria": "Teoría Acústica",
    "tipo": "Fórmula",
    "titulo": "Propagación Cilíndrica (Line Array)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1957, "autor": "Harry F. Olson" },
    "contenido_tecnico": {
      "definicion_detallada": "Decaimiento de 3dB por duplicación de distancia en la zona de acoplamiento lineal.",
      "formula_latex": "$$ SPL(d) = SPL(d_0) - 10 \\log_{10}(d/d_0) $$",
      "variables": { "d": "Distancia", "SPL": "Nivel de presión sonora" },
      "restricciones": "Válido dentro del límite de campo cercano del arreglo."
    },
    "meta_tags": ["LSP-IN-USE", "3dB", "line array"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "wst_criteria_heil",
    "categoria": "Teoría Acústica",
    "tipo": "Constante",
    "titulo": "WST - Wavefront Sculpture Technology",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1992, "autor": "Christian Heil" },
    "contenido_tecnico": {
      "definicion_detallada": "Criterio de espaciado para evitar lóbulos de interferencia en arreglos lineales.",
      "formula_latex": "$$ d < \\lambda/2 = c / (2f) $$",
      "variables": { "d": "Espaciado físico", "f": "Frecuencia máxima" },
      "restricciones": "Para 10kHz, d debe ser < 17mm."
    },
    "meta_tags": ["LSP-IN-USE", "WST", "coherencia"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "directividad_olson_sinc",
    "categoria": "Teoría Acústica",
    "tipo": "Fórmula",
    "titulo": "Directividad de Fuente Lineal (Olson)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1957, "autor": "Harry F. Olson" },
    "contenido_tecnico": {
      "definicion_detallada": "Función sinc que describe el patrón de radiación de un segmento de línea.",
      "formula_latex": "$$ R(\\theta) = |\\sin(x)/x| \\quad \\text{donde } x = (\\pi H \\sin(\\theta))/\\lambda $$",
      "variables": { "H": "Altura de la fuente", "\\theta": "Ángulo de observación" },
      "restricciones": "El primer null ocurre cuando H sin(θ) = λ."
    },
    "meta_tags": ["LSP-IN-USE", "sinc", "directividad"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "line_array_limit_dist",
    "categoria": "Teoría Acústica",
    "tipo": "Fórmula",
    "titulo": "Line Array Limit (Transición de Campo)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Punto de transición donde el frente de onda cilíndrico se vuelve esférico.",
      "formula_latex": "$$ D_{limit} \\approx H^2 f / (2c) $$",
      "variables": { "H": "Altura del arreglo", "f": "Frecuencia" },
      "restricciones": "Para H=5m a 1kHz, D ≈ 36m."
    },
    "meta_tags": ["LSP-IN-USE", "transición", "campo cercano"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 3: ACÚSTICA DE SALAS
  {
    "id_concepto": "sabine_rt60",
    "categoria": "Acústica de Salas",
    "tipo": "Fórmula",
    "titulo": "Fórmula de Sabine (RT60)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1898, "autor": "Wallace Clement Sabine" },
    "contenido_tecnico": {
      "definicion_detallada": "Tiempo de decaimiento de 60dB en salas con campo difuso.",
      "formula_latex": "$$ RT60 = 0.161 V / A $$",
      "variables": { "V": "Volumen (m³)", "A": "Absorción total (Sabines)" },
      "restricciones": "Válido para absorciones bajas (ᾱ < 0.2)."
    },
    "meta_tags": ["LSP-IN-USE", "reverberación", "Sabine"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "modos_propios_rectangulares",
    "categoria": "Acústica de Salas",
    "tipo": "Fórmula",
    "titulo": "Frecuencias de Modos Propios (Eigenmodes)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Resonancias naturales de un espacio cerrado según sus dimensiones.",
      "formula_latex": "$$ f(p,q,r) = (c/2) \\sqrt{(p/L)^2 + (q/W)^2 + (r/H)^2} $$",
      "variables": { "L,W,H": "Dimensiones de la sala", "p,q,r": "Enteros de modo" },
      "restricciones": "Válido para salas ortogonales."
    },
    "meta_tags": ["LSP-IN-USE", "modos", "resonancia"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "distancia_critica_dc",
    "categoria": "Acústica de Salas",
    "tipo": "Fórmula",
    "titulo": "Distancia Crítica (Dc)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Punto donde el nivel de sonido directo es igual al nivel reverberante.",
      "formula_latex": "$$ Dc = 0.057 \\sqrt{Q V / RT60} $$",
      "variables": { "Q": "Factor de directividad", "V": "Volumen" },
      "restricciones": "Crucial para el diseño de inteligibilidad."
    },
    "meta_tags": ["LSP-IN-USE", "campo difuso", "inteligibilidad"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "sti_speech_index",
    "categoria": "Acústica de Salas",
    "tipo": "Hallazgo",
    "titulo": "STI - Speech Transmission Index",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024, "autor": "IEC 60268-16" },
    "contenido_tecnico": {
      "definicion_detallada": "Métrica de calidad de transferencia del habla basada en MTF, SNR y RT60.",
      "formula_latex": "$$ STI = f(MTF, SNR, RT60) $$",
      "variables": { "STI > 0.6": "Bueno", "STI > 0.75": "Excelente" },
      "restricciones": "Requiere equipo de medición específico."
    },
    "meta_tags": ["LSP-IN-USE", "habla", "calidad"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 4: FASE & ALINEAMIENTO
  {
    "id_concepto": "diferencia_fase_dist",
    "categoria": "Fase & Alineamiento",
    "tipo": "Fórmula",
    "titulo": "Diferencia de Fase por Distancia",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Relación entre el tiempo de llegada y el ángulo de fase.",
      "formula_latex": "$$ \\Delta \\phi = 360 f \\Delta t $$",
      "variables": { "\\Delta t": "Retardo (s)", "f": "Frecuencia (Hz)" },
      "restricciones": "A 90Hz, 1ms equivale a 32.4°."
    },
    "meta_tags": ["LSP-IN-USE", "fase", "delay"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "suma_coherente_vectorial",
    "categoria": "Fase & Alineamiento",
    "tipo": "Fórmula",
    "titulo": "Suma Coherente (Vectorial)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Cálculo del nivel total resultante de la suma de dos señales con desfase.",
      "formula_latex": "$$ L_{total} = 20 \\log_{10} \\sqrt{2 + 2 \\cos(\\Delta \\phi)} $$",
      "variables": { "\\Delta \\phi": "Diferencia de fase" },
      "restricciones": "0° = +6dB, 120° = 0dB, 180° = -inf."
    },
    "meta_tags": ["LSP-IN-USE", "sumatoria", "vectores"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "group_delay_lr24",
    "categoria": "Fase & Alineamiento",
    "tipo": "Fórmula",
    "titulo": "Group Delay Linkwitz-Riley 24dB/oct",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1976, "autor": "Linkwitz & Riley" },
    "contenido_tecnico": {
      "definicion_detallada": "Retardo de grupo simétrico característico de los filtros LR4.",
      "formula_latex": "$$ \\tau_g = 0.5 / f_c $$",
      "variables": { "f_c": "Frecuencia de corte" },
      "restricciones": "Respuesta plana en suma."
    },
    "meta_tags": ["LSP-IN-USE", "filtros", "delay"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 5: INGENIERÍA ELÉCTRICA
  {
    "id_concepto": "ley_de_ohm_base",
    "categoria": "Ingeniería Eléctrica",
    "tipo": "Fórmula",
    "titulo": "Leyes Fundamentales de Ohm y Potencia",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 1827, "autor": "Georg Simon Ohm" },
    "contenido_tecnico": {
      "definicion_detallada": "Relaciones básicas de corriente, voltaje, resistencia y potencia.",
      "formula_latex": "$$ V = I R \\quad | \\quad P = V I \\quad | \\quad P = I^2 R $$",
      "variables": { "V": "Voltios", "I": "Amperios", "R": "Ohmios", "P": "Watts" },
      "restricciones": "Base de todos los cálculos eléctricos del sistema."
    },
    "meta_tags": ["LSP-IN-USE", "eléctrica", "Ohm"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "caida_voltaje_cable",
    "categoria": "Ingeniería Eléctrica",
    "tipo": "Fórmula",
    "titulo": "Caída de Voltaje en Cable (NEC)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024, "autor": "NEC Art 210.19" },
    "contenido_tecnico": {
      "definicion_detallada": "Pérdida de potencial por resistencia del conductor.",
      "formula_latex": "$$ V_{drop} = I \\cdot (\\rho \\cdot 2L / A) $$",
      "variables": { "L": "Longitud", "A": "Sección transversal", "\\rho": "Resistividad" },
      "restricciones": "Caídas > 3% degradan el rendimiento severamente."
    },
    "meta_tags": ["LSP-IN-USE", "NEC", "cables"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "potencia_trifasica_p",
    "categoria": "Ingeniería Eléctrica",
    "tipo": "Fórmula",
    "titulo": "Potencia Trifásica Equilibrada",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024, "autor": "IEC 60038" },
    "contenido_tecnico": {
      "definicion_detallada": "Cálculo de potencia real en sistemas de 3 fases.",
      "formula_latex": "$$ P = \\sqrt{3} V_{line} I_{line} PF $$",
      "variables": { "PF": "Power Factor", "\\sqrt{3}": "Factor de suma fasorial" },
      "restricciones": "Válido para cargas balanceadas."
    },
    "meta_tags": ["LSP-IN-USE", "trifásica", "watts"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 6: RIGGING & SEGURIDAD
  {
    "id_concepto": "wll_safety_factor",
    "categoria": "Rigging & Seguridad",
    "tipo": "Fórmula",
    "titulo": "WLL - Working Load Limit",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024, "autor": "EN 13157" },
    "contenido_tecnico": {
      "definicion_detallada": "Carga de trabajo segura basada en la carga de rotura y factor de seguridad.",
      "formula_latex": "$$ WLL = MBS / SF $$",
      "variables": { "MBS": "Minimum Breaking Strength", "SF": "Safety Factor (típico 5:1 o 7:1)" },
      "restricciones": "Obligatorio para eventos públicos bajo normas internacionales."
    },
    "meta_tags": ["LSP-IN-USE", "rigging", "seguridad"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "geometria_bridle_tension",
    "categoria": "Rigging & Seguridad",
    "tipo": "Fórmula",
    "titulo": "Geometría de Bridle (Tensión en Patas)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Distribución de carga en puntos de suspensión angulados.",
      "formula_latex": "$$ T = (W/2) / \\cos(\\theta) $$",
      "variables": { "W": "Peso total", "\\theta": "Ángulo respecto a vertical" },
      "restricciones": "Ángulos > 120° causan tensiones peligrosas."
    },
    "meta_tags": ["LSP-IN-USE", "bridle", "fuerza"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "carga_viento_drag",
    "categoria": "Rigging & Seguridad",
    "tipo": "Fórmula",
    "titulo": "Carga de Viento (Drag Force)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024, "autor": "EN 1991-1-4" },
    "contenido_tecnico": {
      "definicion_detallada": "Presión dinámica ejercida por el viento sobre superficies planas o arreglos.",
      "formula_latex": "$$ F = 0.5 \\rho v^2 Cd A $$",
      "variables": { "v": "Velocidad del viento", "Cd": "Coeficiente de arrastre", "A": "Área proyectada" },
      "restricciones": "Crítico para estructuras temporales y PA volada."
    },
    "meta_tags": ["LSP-IN-USE", "viento", "drag"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 7: AUDIO DIGITAL
  {
    "id_concepto": "ancho_banda_dante",
    "categoria": "Audio Digital",
    "tipo": "Fórmula",
    "titulo": "Ancho de Banda Dante (Estimación)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024, "autor": "Audinate" },
    "contenido_tecnico": {
      "definicion_detallada": "Carga de red considerando overhead de paquetes.",
      "formula_latex": "$$ BW = Fs \\cdot BitDepth \\cdot Channels \\cdot 1.2 $$",
      "variables": { "Fs": "Sampling Rate", "1.2": "20% overhead Ethernet" },
      "restricciones": "64ch @ 48k/24bit ≈ 89 Mbps."
    },
    "meta_tags": ["LSP-IN-USE", "Dante", "redes"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "ptp_precision_sync",
    "categoria": "Audio Digital",
    "tipo": "Constante",
    "titulo": "PTP - Precision Time Protocol (IEEE 1588)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2008, "autor": "IEEE 1588" },
    "contenido_tecnico": {
      "definicion_detallada": "Sincronización necesaria para audio sobre IP sin distorsión de fase.",
      "formula_latex": "$$ Jitter < 1 \\mu s $$",
      "variables": { "\\mu s": "microsegundos" },
      "restricciones": "Base para Milan, Dante y AES67."
    },
    "meta_tags": ["LSP-IN-USE", "PTP", "sincronía"],
    "version_dataset": "3.0"
  },

  // CATEGORÍA 8: DINÁMICA TÉRMICA
  {
    "id_concepto": "compresion_potencia_thermal",
    "categoria": "Dinámica Térmica",
    "tipo": "Fórmula",
    "titulo": "Compresión de Potencia (Pérdida Térmica)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Pérdida de eficiencia por el aumento de temperatura en la bobina.",
      "formula_latex": "$$ \\Delta L = -10 \\log_{10}[1 + \\alpha (T - T_0)] $$",
      "variables": { "\\alpha": "0.00393 (Cobre)", "T": "Temperatura final" },
      "restricciones": "A +50°C se pierde aprox 2-3 dB."
    },
    "meta_tags": ["LSP-IN-USE", "térmico", "KS28", "bobina"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "resistencia_bobina_temp",
    "categoria": "Dinámica Térmica",
    "tipo": "Fórmula",
    "titulo": "Resistencia de Bobina vs Temperatura",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Cambio en la impedancia DC por calor.",
      "formula_latex": "$$ R(T) = R_0 [1 + \\alpha (T - T_0)] $$",
      "variables": { "R_0": "Resistencia a 20°C" },
      "restricciones": "8Ω a 20°C llega a 10Ω a 70°C."
    },
    "meta_tags": ["LSP-IN-USE", "resistencia", "calor"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "constante_tiempo_termica",
    "categoria": "Dinámica Térmica",
    "tipo": "Fórmula",
    "titulo": "Constante de Tiempo Térmica (τ)",
    "fuente": { "documento": "REFERENCIAS CIENTÍFICAS DE LIVESYNC PRO", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Tiempo que tarda un driver en enfriarse o calentarse.",
      "formula_latex": "$$ \\tau = m Cp / h $$",
      "variables": { "m": "Masa", "Cp": "Calor específico" },
      "restricciones": "Woofers grandes: τ ≈ 5-10 min."
    },
    "meta_tags": ["LSP-IN-USE", "térmico", "tiempo"],
    "version_dataset": "3.0"
  }
];
