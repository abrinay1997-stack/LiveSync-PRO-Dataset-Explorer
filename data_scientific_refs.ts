
import { Concept } from './types';

export const scientificRefsData: Concept[] = [
  // ATMOSFÉRICO & AMBIENTAL
  {
    "id_concepto": "iso_9613_1_atenuacion",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Coeficiente de Atenuación Atmosférica (ISO 9613-1)",
    "fuente": { "documento": "ISO 9613-1:1993 — Acoustics: Attenuation of sound during propagation outdoors, Part 1: Calculation of the absorption of sound by the atmosphere", "año": 1993, "autor": "ISO (ISO/TC 43/SC 1)", "seccion": "Cláusula 6, ecs. (3)–(5)" },
    "contenido_tecnico": {
      "definicion_detallada": "Coeficiente de absorción atmosférica pura (sin divergencia geométrica, suelo ni barreras). Suma la absorción clásica y rotacional (primer término) y la relajación vibracional del oxígeno y del nitrógeno, cuyas frecuencias de relajación f_rO y f_rN dependen de la concentración molar de vapor de agua h. Es la corrección dominante en HF para predicciones de largo alcance.",
      "formula_latex": "$$ \\begin{gathered} \\alpha = 8.686\\, f^2 \\left[ 1.84\\times10^{-11} \\left(\\frac{p_a}{p_r}\\right)^{-1} \\left(\\frac{T}{T_0}\\right)^{1/2} + \\left(\\frac{T}{T_0}\\right)^{-5/2} \\left( \\frac{0.01275\\, e^{-2239.1/T}}{f_{rO} + f^2/f_{rO}} + \\frac{0.1068\\, e^{-3352.0/T}}{f_{rN} + f^2/f_{rN}} \\right) \\right] \\\\ f_{rO} = \\frac{p_a}{p_r} \\left( 24 + 4.04\\times10^{4}\\, h\\, \\frac{0.02 + h}{0.391 + h} \\right) \\\\ f_{rN} = \\frac{p_a}{p_r} \\left(\\frac{T}{T_0}\\right)^{-1/2} \\left( 9 + 280\\, h\\, e^{-4.170 \\left[ (T/T_0)^{-1/3} - 1 \\right]} \\right) \\end{gathered} $$",
      "formula_texto": "alpha = 8.686·f²·[1.84e-11·(pa/pr)^-1·(T/T0)^0.5 + (T/T0)^-2.5·(0.01275·exp(-2239.1/T)/(frO + f²/frO) + 0.1068·exp(-3352.0/T)/(frN + f²/frN))]; frO = (pa/pr)·(24 + 4.04e4·h·(0.02 + h)/(0.391 + h)); frN = (pa/pr)·(T/T0)^-0.5·(9 + 280·h·exp(-4.170·((T/T0)^(-1/3) - 1)))",
      "variables": {
        "\\alpha": "Coeficiente de atenuación atmosférica (dB/m)",
        "f": "Frecuencia (Hz); para bandas usar la frecuencia central exacta (p. ej. 7943 Hz, no 8000 Hz)",
        "T": "Temperatura absoluta del aire (K)",
        "T_0": "Temperatura de referencia, 293.15 K",
        "p_a": "Presión atmosférica (kPa)",
        "p_r": "Presión de referencia, 101.325 kPa",
        "h": "Concentración molar de vapor de agua, en PORCENTAJE (ver concentracion_molar_vapor)",
        "f_{rO}": "Frecuencia de relajación del oxígeno (Hz)",
        "f_{rN}": "Frecuencia de relajación del nitrógeno (Hz)"
      },
      "restricciones": "Precisión declarada por la norma ≈ ±10 % para h entre 0.05 % y 5 %, T entre −20 °C y +50 °C, p_a < 200 kPa y f/p_a entre 4×10⁻⁴ y 10 Hz/Pa (verificar los límites exactos en la cláusula 8 de la norma). Supone aire homogéneo y en reposo: no incluye refracción, turbulencia, suelo ni divergencia.",
      "ejemplo": "20 °C, 70 % HR, 101.325 kPa (h ≈ 1.61 %): α(1 kHz) ≈ 4.98 dB/km; α(7943 Hz) ≈ 76.6 dB/km, es decir ≈ 7.7 dB de absorción adicional en 100 m. Coincide con la Tabla 2 de ISO 9613-2 (5.0 y 76.6 dB/km). A 20 °C y 50 % HR: α(1 kHz) ≈ 4.66 dB/km."
    },
    "meta_tags": ["LSP-IN-USE", "ISO 9613-1", "absorción", "aire"],
    "version_dataset": "3.1",
    "verificado": true
  },
  {
    "id_concepto": "concentracion_molar_vapor",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Concentración Molar de Vapor de Agua",
    "fuente": { "documento": "ISO 9613-1:1993 — Acoustics: Attenuation of sound during propagation outdoors, Part 1: Calculation of the absorption of sound by the atmosphere", "año": 1993, "autor": "ISO (ISO/TC 43/SC 1)", "seccion": "Annex B, ecs. (B.1)–(B.3)" },
    "contenido_tecnico": {
      "definicion_detallada": "Convierte la humedad relativa en la concentración molar de vapor de agua h que usa ISO 9613-1 para calcular las frecuencias de relajación f_rO y f_rN. La presión de vapor de saturación se aproxima con la expresión del Anexo B de la norma.",
      "formula_latex": "$$ h = h_r\\, \\frac{p_{sat}/p_r}{p_a/p_r}, \\qquad \\frac{p_{sat}}{p_r} = 10^{C}, \\qquad C = -6.8346 \\left(\\frac{T_{01}}{T}\\right)^{1.261} + 4.6151 $$",
      "formula_texto": "h = h_r·(psat/pr)/(pa/pr); psat/pr = 10^C; C = -6.8346·(T01/T)^1.261 + 4.6151",
      "variables": {
        "h": "Concentración molar de vapor de agua (%)",
        "h_r": "Humedad relativa (%)",
        "p_{sat}": "Presión de vapor de saturación (kPa)",
        "p_a": "Presión atmosférica (kPa)",
        "p_r": "Presión de referencia, 101.325 kPa",
        "T": "Temperatura absoluta del aire (K)",
        "T_{01}": "Temperatura del punto triple del agua, 273.16 K"
      },
      "restricciones": "h se expresa en PORCENTAJE (no como fracción 0–1), porque así entra en las expresiones de f_rO y f_rN de ISO 9613-1; valores típicos 0.2–4 %. Usar h como fracción subestima f_rO/f_rN y falsea la absorción en HF.",
      "ejemplo": "20 °C (293.15 K), 101.325 kPa: C = −1.637 → p_sat/p_r ≈ 0.02306. Con h_r = 50 % → h ≈ 1.15 %; con h_r = 70 % → h ≈ 1.61 %."
    },
    "meta_tags": ["LSP-IN-USE", "humedad", "moléculas"],
    "version_dataset": "3.1",
    "verificado": true
  },
  {
    "id_concepto": "velocidad_sonido_aire_lineal",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Velocidad del Sonido en Aire (Aprox. Lineal)",
    "fuente": { "documento": "Fundamentals of Acoustics, 4th ed.", "año": 2000, "autor": "L. E. Kinsler, A. R. Frey, A. B. Coppens & J. V. Sanders" },
    "contenido_tecnico": {
      "definicion_detallada": "Aproximación lineal (desarrollo de primer orden alrededor de 0 °C) de la velocidad del sonido en aire seco, c = 331.3·√(1 + T/273.15). Estándar para ingeniería de campo.",
      "formula_latex": "$$ c \\approx 331.3 + 0.6\\,T \\qquad \\left( \\text{exacta: } c = 331.3 \\sqrt{1 + T/273.15} \\right) $$",
      "formula_texto": "c ≈ 331.3 + 0.6·T (exacta: c = 331.3·sqrt(1 + T/273.15))",
      "variables": { "T": "Temperatura del aire (°C)", "c": "Velocidad del sonido (m/s)" },
      "restricciones": "Válida entre −20 °C y +40 °C con error ≤ 0.6 m/s (0.16 %, máximo a +40 °C). Ignora la humedad (+0.1–0.3 % en condiciones normales) y el viento (ver velocidad_sonido_efectiva).",
      "ejemplo": "T = 20 °C: lineal 343.3 m/s, exacta 343.2 m/s. T = 40 °C: lineal 355.3 m/s, exacta 354.7 m/s."
    },
    "meta_tags": ["LSP-IN-USE", "c", "temperatura"],
    "version_dataset": "3.1",
    "verificado": true
  },
  // TEORÍA ACÚSTICA
  {
    "id_concepto": "ley_inverso_cuadrado",
    "categoria": "Teoría Acústica",
    "tipo": "Fórmula",
    "titulo": "Ley del Inverso del Cuadrado (Fuente Puntual)",
    "fuente": { "documento": "Fundamentals of Acoustics, 4th ed.", "año": 2000, "autor": "L. E. Kinsler, A. R. Frey, A. B. Coppens & J. V. Sanders" },
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
    "fuente": { "documento": "Acoustical Engineering", "año": 1957, "autor": "Harry F. Olson" },
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
    "fuente": { "documento": "Sound Fields Radiated by Multiple Sound Sources Arrays (AES 92nd Convention, Preprint 3269); criterios ampliados en 'Wavefront Sculpture Technology', JAES 51(10), 2003", "año": 1992, "autor": "Christian Heil & Marcel Urban (L-Acoustics); Urban, Heil & Bauman (2003)" },
    "contenido_tecnico": {
      "definicion_detallada": "Criterios WST para que un arreglo de fuentes discretas se comporte como una fuente lineal continua, sin lóbulos secundarios (grating lobes) y con un frente de onda controlado. (a) Acoplamiento: o bien la suma de las áreas radiantes isofásicas individuales cubre al menos el 80 % de la superficie total del arreglo (Active Radiating Factor, ARF ≥ 0.8), o bien el paso entre fuentes es menor que λ/2. Por eso en HF, donde λ/2 es de milímetros, el acoplamiento depende de guías de onda que generan frentes planos casi contiguos (ARF ≥ 0.8), no del espaciado. (b) Deformación del frente de onda: la desviación respecto al frente ideal (plano o con la curvatura diseñada) debe ser menor que λ/4 a la frecuencia máxima de trabajo (≈ 5 mm a 16 kHz). (c) Arreglos curvos: el ángulo entre elementos está limitado en función de la altura del elemento y de la distancia de escucha, y para un SPL homogéneo en profundidad la curvatura debe ser variable, con ángulos entre elementos aproximadamente inversamente proporcionales a la distancia que cubre cada uno (forma en 'J').",
      "formula_latex": "$$ \\begin{gathered} \\text{ARF} = \\frac{\\sum_i S_i}{S_{total}} \\geq 0.8 \\quad \\text{o} \\quad \\text{STEP} \\leq \\frac{\\lambda}{2} = \\frac{c}{2f} \\\\ \\Delta_{\\text{frente}} \\leq \\frac{\\lambda}{4} \\;\\; \\text{a } f_{max} \\end{gathered} $$",
      "formula_texto": "ARF = ΣS_i / S_total ≥ 0.8  o  STEP ≤ λ/2 = c/(2f);  desviación del frente ≤ λ/4 a f_max",
      "variables": {
        "\\text{ARF}": "Active Radiating Factor: fracción de la altura/superficie del arreglo ocupada por frentes isofásicos (adimensional)",
        "S_i": "Área (o altura) radiante isofásica del elemento i",
        "S_{total}": "Área (o altura) total del arreglo",
        "\\text{STEP}": "Paso (distancia entre centros acústicos de fuentes adyacentes, m)",
        "\\lambda": "Longitud de onda a la frecuencia considerada (m)",
        "f_{max}": "Frecuencia máxima de trabajo (Hz)",
        "\\Delta_{\\text{frente}}": "Desviación del frente de onda respecto al ideal (m)"
      },
      "restricciones": "Los criterios (a) son alternativos (basta uno a cada frecuencia). Con c = 343 m/s: λ/2 = 17.2 mm a 10 kHz y λ/4 = 5.4 mm a 16 kHz. Los criterios de curvatura (c) se resumen aquí cualitativamente; su forma cuantitativa está en el paper de 2003.",
      "ejemplo": "Elemento de 0.35 m de paso cuya guía de onda produce un frente isofásico de 0.30 m: ARF = 0.30/0.35 ≈ 0.86 ≥ 0.8 → acopla como línea continua en HF aunque el paso (350 mm) sea muy superior a λ/2 a 10 kHz (17.2 mm). Sin guía de onda (fuentes cónicas, ARF < 0.8) haría falta un paso ≤ 17 mm para acoplar hasta 10 kHz."
    },
    "meta_tags": ["LSP-IN-USE", "WST", "coherencia", "ARF"],
    "version_dataset": "3.1",
    "nota_verificacion": "verificar: numeración exacta de los criterios WST (el paper de 2003 enumera varios) y la forma cuantitativa del criterio de ángulo máximo entre elementos en arreglos curvos (Urban, Heil & Bauman, JAES 51(10), 2003). Los valores numéricos de λ/2 y λ/4 están verificados."
  },
  {
    "id_concepto": "directividad_olson_sinc",
    "categoria": "Teoría Acústica",
    "tipo": "Fórmula",
    "titulo": "Directividad de Fuente Lineal (Olson)",
    "fuente": { "documento": "Acoustical Engineering", "año": 1957, "autor": "Harry F. Olson" },
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
    "fuente": { "documento": "Wavefront Sculpture Technology (J. Audio Eng. Soc., Vol. 51 No. 10)", "año": 2003, "autor": "Marcel Urban, Christian Heil & Paul Bauman (L-Acoustics)" },
    "contenido_tecnico": {
      "definicion_detallada": "Punto de transición donde el frente de onda cilíndrico se vuelve esférico.",
      "formula_latex": "$$ D_{limit} \\approx H^2 f / (2c) $$",
      "variables": { "H": "Altura del arreglo", "f": "Frecuencia" },
      "restricciones": "Para H=5m a 1kHz, D ≈ 36m."
    },
    "meta_tags": ["LSP-IN-USE", "transición", "campo cercano"],
    "version_dataset": "3.0"
  },
  // ACÚSTICA DE SALAS
  {
    "id_concepto": "sabine_rt60",
    "categoria": "Acústica de Salas",
    "tipo": "Fórmula",
    "titulo": "Fórmula de Sabine (RT60)",
    "fuente": { "documento": "Reverberation (The American Architect and The Engineering Record, 1900); reimpreso en Collected Papers on Acoustics (1922)", "año": 1900, "autor": "Wallace Clement Sabine" },
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
    "fuente": { "documento": "Room Acoustics, 6th ed.", "año": 2016, "autor": "Heinrich Kuttruff" },
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
    "fuente": { "documento": "Room Acoustics, 6th ed.", "año": 2016, "autor": "Heinrich Kuttruff" },
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
    "fuente": { "documento": "IEC 60268-16:2020 — Sound system equipment, Part 16: Objective rating of speech intelligibility by speech transmission index", "año": 2020, "autor": "IEC (TC 100); método de T. Houtgast & H. J. M. Steeneken" },
    "contenido_tecnico": {
      "definicion_detallada": "Métrica de calidad de transferencia del habla basada en MTF, SNR y RT60.",
      "formula_latex": "$$ STI = f(MTF, SNR, RT60) $$",
      "variables": { "STI > 0.6": "Bueno", "STI > 0.75": "Excelente" },
      "restricciones": "Requiere equipo de medición específico."
    },
    "meta_tags": ["LSP-IN-USE", "habla", "calidad"],
    "version_dataset": "3.0"
  },
  // FASE & ALINEAMIENTO
  {
    "id_concepto": "diferencia_fase_dist",
    "categoria": "Fase & Alineamiento",
    "tipo": "Fórmula",
    "titulo": "Diferencia de Fase por Distancia",
    "fuente": { "documento": "Sound Systems: Design and Optimization, 3rd ed.", "año": 2016, "autor": "Bob McCarthy" },
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
    "fuente": { "documento": "Sound Systems: Design and Optimization, 3rd ed.", "año": 2016, "autor": "Bob McCarthy" },
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
    "fuente": { "documento": "Active Crossover Networks for Noncoincident Drivers (J. Audio Eng. Soc., Vol. 24 No. 1)", "año": 1976, "autor": "Siegfried H. Linkwitz (filtro desarrollado con Russ Riley)" },
    "contenido_tecnico": {
      "definicion_detallada": "Retardo de grupo τ_g = −dφ/dω de un filtro Linkwitz-Riley de 4º orden (dos Butterworth de 2º orden en cascada, −6 dB en f_c). Las salidas paso-bajo y paso-alto están en fase a todas las frecuencias, por lo que tienen el MISMO retardo de grupo, igual al del all-pass de 2º orden que resulta de su suma. No es constante ni simétrico: vale √2/(π f_c) ≈ 0.450/f_c en continua y otra vez en f_c, alcanza un máximo ≈ 0.543/f_c en f ≈ 0.644·f_c y cae rápidamente por encima de f_c.",
      "formula_latex": "$$ \\tau_g(f) = \\frac{2\\sqrt{2}\\,(1 + \\Omega^2)}{2\\pi f_c\\,(1 + \\Omega^4)}, \\qquad \\Omega = \\frac{f}{f_c} $$",
      "formula_texto": "tau_g(f) = 2·sqrt(2)·(1 + Ω²) / (2π·f_c·(1 + Ω⁴)), con Ω = f/f_c",
      "variables": {
        "\\tau_g": "Retardo de grupo (s)",
        "f_c": "Frecuencia de cruce (Hz)",
        "\\Omega": "Frecuencia normalizada f/f_c (adimensional)"
      },
      "restricciones": "Filtro analógico ideal (o IIR equivalente con f_c ≪ f_s/2). Valores de referencia: τ_g·f_c = 0.450 (Ω→0), 0.530 (Ω = 0.5), 0.543 máx. (Ω ≈ 0.644), 0.450 (Ω = 1), 0.132 (Ω = 2), 0.030 (Ω = 4). La suma LP+HP tiene magnitud plana (all-pass) pero no fase lineal. El valor '0.5/f_c' que figuraba antes es sólo una aproximación gruesa: sobreestima un 11 % el valor en continua y en f_c y subestima un 8 % el máximo.",
      "ejemplo": "f_c = 100 Hz: τ_g = 4.50 ms en continua y a 100 Hz, máximo 5.43 ms a ≈ 64 Hz, 1.32 ms a 200 Hz. Verificado derivando numéricamente la fase de H(s) = 1/(s² + √2·s + 1)²."
    },
    "meta_tags": ["LSP-IN-USE", "filtros", "delay"],
    "version_dataset": "3.1",
    "verificado": true
  },
  // INGENIERÍA ELÉCTRICA
  {
    "id_concepto": "ley_de_ohm_base",
    "categoria": "Ingeniería Eléctrica",
    "tipo": "Fórmula",
    "titulo": "Leyes Fundamentales de Ohm y Potencia",
    "fuente": { "documento": "Die galvanische Kette, mathematisch bearbeitet", "año": 1827, "autor": "Georg Simon Ohm (ley de Joule para P = I²R)" },
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
    "fuente": { "documento": "NFPA 70 — National Electrical Code (NEC), ed. 2023", "año": 2023, "autor": "NFPA", "seccion": "Art. 210.19(A), nota informativa" },
    "contenido_tecnico": {
      "definicion_detallada": "Pérdida de tensión por la resistencia del conductor en un circuito monofásico (ida y vuelta, de ahí 2L). En trifásico equilibrado el factor 2 se sustituye por √3.",
      "formula_latex": "$$ V_{drop} = I \\cdot \\frac{\\rho \\cdot 2L}{A} $$",
      "formula_texto": "V_drop = I·ρ·2L/A",
      "variables": { "V_{drop}": "Caída de tensión (V)", "I": "Corriente (A)", "L": "Longitud del tendido, un sentido (m)", "A": "Sección del conductor (mm²)", "\\rho": "Resistividad (Ω·mm²/m); cobre ≈ 0.0172 a 20 °C" },
      "restricciones": "Ignora la reactancia (válido en secciones pequeñas a 50/60 Hz) y el aumento de ρ con la temperatura del conductor. La nota informativa de NEC 210.19(A) recomienda —sin obligar— no superar el 3 % en el circuito derivado y el 5 % en total (alimentador + derivado). No sustituye el dimensionamiento por ampacidad.",
      "ejemplo": "16 A, 50 m, 2.5 mm² de cobre: R = 0.0172·100/2.5 = 0.688 Ω → V_drop ≈ 11.0 V, es decir 4.8 % de 230 V (supera la recomendación del 3 %)."
    },
    "meta_tags": ["LSP-IN-USE", "NEC", "cables"],
    "version_dataset": "3.0"
  },
  {
    "id_concepto": "potencia_trifasica_p",
    "categoria": "Ingeniería Eléctrica",
    "tipo": "Fórmula",
    "titulo": "Potencia Trifásica Equilibrada",
    "fuente": { "documento": "Power System Analysis", "año": 1994, "autor": "John J. Grainger & William D. Stevenson Jr." },
    "contenido_tecnico": {
      "definicion_detallada": "Cálculo de potencia real en sistemas de 3 fases.",
      "formula_latex": "$$ P = \\sqrt{3} V_{line} I_{line} PF $$",
      "variables": { "PF": "Power Factor", "\\sqrt{3}": "Factor de suma fasorial" },
      "restricciones": "Válido para cargas balanceadas."
    },
    "meta_tags": ["LSP-IN-USE", "trifásica", "watts"],
    "version_dataset": "3.0"
  },
  // RIGGING & SEGURIDAD
  {
    "id_concepto": "wll_safety_factor",
    "categoria": "Rigging & Seguridad",
    "tipo": "Fórmula",
    "titulo": "WLL - Working Load Limit",
    "fuente": { "documento": "Entertainment Rigging: A Practical Guide for Riggers, Designers and Managers", "año": 2002, "autor": "Harry Donovan" },
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
    "fuente": { "documento": "Entertainment Rigging: A Practical Guide for Riggers, Designers and Managers", "año": 2002, "autor": "Harry Donovan" },
    "contenido_tecnico": {
      "definicion_detallada": "Tensión en cada pata de un bridle simétrico de dos patas. Convención: θ es el ángulo de CADA pata respecto a la vertical; el ángulo incluido entre las dos patas es β = 2θ. Cada pata transmite además una componente horizontal H que tira de los puntos de anclaje hacia el centro.",
      "formula_latex": "$$ T = \\frac{W}{2\\cos\\theta}, \\qquad H = \\frac{W}{2}\\tan\\theta, \\qquad \\beta = 2\\theta $$",
      "formula_texto": "T = W/(2·cos θ); H = (W/2)·tan θ; β = 2θ",
      "variables": {
        "W": "Carga total suspendida (kN o kgf)",
        "T": "Tensión en cada pata (mismas unidades que W)",
        "H": "Componente horizontal en cada punto de anclaje",
        "\\theta": "Ángulo de cada pata respecto a la vertical (°)",
        "\\beta": "Ángulo incluido entre las dos patas (°)"
      },
      "restricciones": "Bridle simétrico (patas de igual longitud, carga centrada, puntos a la misma altura). Con β = 120° (θ = 60°) cada pata soporta el 100 % de la carga; con β > 120° (θ > 60°) la tensión en cada pata SUPERA la carga total y crece muy rápido (β = 150° → 1.93·W). Práctica habitual: β ≤ 120°, preferible ≤ 90°. Dimensionar cada componente (WLL) con T, no con W/2.",
      "ejemplo": "W = 1000 kgf: β = 60° (θ = 30°) → T = 577 kgf; β = 90° (θ = 45°) → T = 707 kgf y H = 500 kgf; β = 120° (θ = 60°) → T = 1000 kgf; β = 150° (θ = 75°) → T = 1932 kgf."
    },
    "meta_tags": ["LSP-IN-USE", "bridle", "fuerza"],
    "version_dataset": "3.1",
    "verificado": true
  },
  {
    "id_concepto": "carga_viento_drag",
    "categoria": "Rigging & Seguridad",
    "tipo": "Fórmula",
    "titulo": "Carga de Viento (Drag Force)",
    "fuente": { "documento": "EN 1991-1-4:2005 — Eurocódigo 1: Acciones en estructuras, Parte 1-4: Acciones generales, acciones de viento", "año": 2005, "autor": "CEN (Comité Europeo de Normalización)" },
    "contenido_tecnico": {
      "definicion_detallada": "Presión dinámica ejercida por el viento sobre superficies planas o arreglos.",
      "formula_latex": "$$ F = 0.5 \\rho v^2 Cd A $$",
      "variables": { "v": "Velocidad del viento", "Cd": "Coeficiente de arrastre", "A": "Área proyectada" },
      "restricciones": "Crítico para estructuras temporales y PA volada."
    },
    "meta_tags": ["LSP-IN-USE", "viento", "drag"],
    "version_dataset": "3.0"
  },
  // AUDIO DIGITAL
  {
    "id_concepto": "ancho_banda_dante",
    "categoria": "Audio Digital",
    "tipo": "Fórmula",
    "titulo": "Ancho de Banda de Audio sobre IP (RTP / AES67)",
    "fuente": { "documento": "AES67-2018 — High-performance streaming audio-over-IP interoperability (cabeceras: IEEE 802.3, RFC 791, RFC 768, RFC 3550)", "año": 2018, "autor": "Audio Engineering Society (AES); IEEE 802.3; IETF" },
    "contenido_tecnico": {
      "definicion_detallada": "Ancho de banda en el cable de flujos de audio PCM sobre RTP/UDP/IPv4/Ethernet: carga útil de audio más una sobrecarga fija por paquete. La sobrecarga relativa depende del tiempo de paquete (muestras por paquete) y del número de canales por flujo, por lo que no existe un porcentaje fijo.",
      "formula_latex": "$$ BW = N_{ch}\\, b\\, F_s + N_{flujos}\\, \\frac{8\\, O}{t_p}, \\qquad O = 8 + 14 + 4 + 12 + 20 + 8 + 12 = 78\\ \\text{bytes} $$",
      "formula_texto": "BW = N_ch·b·Fs + N_flujos·8·O/t_p, con O = 78 bytes por paquete (preámbulo+SFD 8, Ethernet 14, FCS 4, IFG 12, IPv4 20, UDP 8, RTP 12)",
      "variables": {
        "BW": "Ancho de banda en el cable (bit/s)",
        "N_{ch}": "Número total de canales de audio",
        "b": "Bits por muestra (L24 = 24, L16 = 16)",
        "F_s": "Frecuencia de muestreo (Hz)",
        "N_{flujos}": "Número de flujos (streams) RTP",
        "t_p": "Tiempo de paquete (s); AES67: 1 ms por defecto, 125 µs opcional",
        "O": "Sobrecarga por paquete en el cable (bytes): preámbulo+SFD 8, cabecera Ethernet 14, FCS 4, IFG 12, IPv4 20, UDP 8, RTP 12 (+4 con etiqueta 802.1Q)"
      },
      "restricciones": "Sin cifrado, sin extensiones de cabecera RTP ni opciones IP. La sobrecarga relativa va del ≈ 7 % (8 canales, 1 ms) al ≈ 54 % (8 canales, 125 µs). Dante (Audinate) es propietario: su tiempo de paquete y canales por flujo dependen de la latencia y del tipo de flujo configurados, así que el ancho de banda real debe leerse en Dante Controller. El factor fijo '×1.2 (20 % de overhead)' que figuraba antes no tiene fuente publicada y se retiró.",
      "ejemplo": "64 canales, 24 bit, 48 kHz → carga útil 73.73 Mb/s. Con 8 flujos de 8 canales a t_p = 1 ms (1152 bytes de audio por paquete): 78.7 Mb/s. Con 8 flujos de 8 canales a t_p = 125 µs: 113.7 Mb/s. Con 16 flujos de 4 canales a 1 ms: 83.7 Mb/s."
    },
    "meta_tags": ["LSP-IN-USE", "Dante", "AES67", "RTP", "redes"],
    "version_dataset": "3.1",
    "verificado": true,
    "nota_verificacion": "La fórmula y los ejemplos son para RTP/AES67 genérico. verificar: parámetros reales de flujos Dante (propietarios) antes de aplicarla a Dante nativo."
  },
  {
    "id_concepto": "ptp_precision_sync",
    "categoria": "Audio Digital",
    "tipo": "Constante",
    "titulo": "Sincronización de Reloj en Audio sobre IP (PTP / gPTP)",
    "fuente": { "documento": "IEEE Std 1588-2008 (PTPv2) e IEEE Std 802.1AS-2020 (gPTP); perfiles de uso en AES67-2018 y en la especificación Avnu Milan", "año": 2008, "autor": "IEEE; AES; Avnu Alliance" },
    "contenido_tecnico": {
      "definicion_detallada": "Todos los dispositivos de una red de audio deben compartir un reloj común (grandmaster) para reproducir cada muestra en el mismo instante. Cada ecosistema usa un protocolo distinto: AES67 usa IEEE 1588-2008 (PTPv2); Dante usa de forma nativa IEEE 1588-2002 (PTPv1) y PTPv2 en modo AES67; Milan, construido sobre AVB/TSN, usa IEEE 802.1AS (gPTP), un perfil derivado de 1588 en el que todos los switches deben participar en la sincronización. Milan NO usa IEEE 1588 como base (ver comparativa_precision_ptp_hops en el módulo de redes).",
      "formula_latex": "$$ |t_i - t_{GM}| \\lesssim 1\\ \\mu\\text{s} \\;\\Rightarrow\\; \\Delta\\phi_{20\\,\\text{kHz}} = 360^\\circ \\cdot 20\\,000\\ \\text{Hz} \\cdot 10^{-6}\\ \\text{s} = 7.2^\\circ $$",
      "formula_texto": "|t_i - t_GM| ≲ 1 µs  →  Δφ(20 kHz) = 360°·20000·1e-6 = 7.2°",
      "variables": {
        "t_i": "Tiempo del reloj local del dispositivo i (s)",
        "t_{GM}": "Tiempo del reloj grandmaster (s)",
        "\\Delta\\phi": "Error de fase resultante entre dos dispositivos (°)"
      },
      "restricciones": "1 µs es un objetivo de diseño para sistemas de refuerzo (ver error_sincronia_maximo_fase), no un valor exigido por IEEE 1588. La precisión real depende de que los switches actúen como transparent/boundary clocks (PTPv2) o sean gPTP-aware (802.1AS) y de la carga de la red.",
      "ejemplo": "Un error de 1 µs equivale a 7.2° de fase a 20 kHz; en la suma coherente de dos señales iguales la pérdida es 20·log10(cos(3.6°)) ≈ −0.017 dB, inaudible."
    },
    "meta_tags": ["LSP-IN-USE", "PTP", "gPTP", "sincronía"],
    "version_dataset": "3.1",
    "verificado": true
  },
  // DINÁMICA TÉRMICA
  {
    "id_concepto": "compresion_potencia_thermal",
    "categoria": "Dinámica Térmica",
    "tipo": "Fórmula",
    "titulo": "Compresión de Potencia (Pérdida Térmica)",
    "fuente": { "documento": "Heat Dissipation and Power Compression in Loudspeakers (J. Audio Eng. Soc., Vol. 40 No. 1/2)", "año": 1992, "autor": "Douglas J. Button" },
    "contenido_tecnico": {
      "definicion_detallada": "Pérdida de SPL causada por el calentamiento de la bobina. La resistencia DC sube según R_hot = R_cold·[1 + α·(T − T_0)]. Con el amplificador como fuente de tensión, la corriente es I = V/R_e y, en la banda donde |Z| ≈ R_e, la fuerza Bl·I y la presión radiada son proporcionales a I: el SPL cae 20·log10(R_hot/R_cold). La potencia eléctrica absorbida (V²/R_e) sólo cae 10·log10(R_hot/R_cold); no deben confundirse.",
      "formula_latex": "$$ \\Delta L = -20 \\log_{10} \\frac{R_{hot}}{R_{cold}} = -20 \\log_{10}\\left[ 1 + \\alpha\\,(T - T_0) \\right] $$",
      "formula_texto": "ΔL = -20·log10(R_hot/R_cold) = -20·log10(1 + α·(T - T0))",
      "variables": {
        "\\Delta L": "Variación de SPL a tensión constante (dB)",
        "R_{hot}, R_{cold}": "Resistencia DC de la bobina en caliente y en frío (Ω)",
        "\\alpha": "Coeficiente de temperatura de la resistividad (1/K): cobre ≈ 0.00393 (a 20 °C, IEC 60028); aluminio ≈ 0.0040",
        "T": "Temperatura de la bobina (°C)",
        "T_0": "Temperatura de referencia (20 °C)"
      },
      "restricciones": "Válido en la banda donde la impedancia está dominada por R_e (por encima de la resonancia y por debajo de la zona inductiva) y con amplificador de baja impedancia de salida. Ignora cambios de Bl, de suspensión y de inductancia con la temperatura. El valor anterior '2–3 dB a +50 °C' era incorrecto: 2 dB y 3 dB corresponden a ΔT ≈ 66 K y ≈ 105 K en cobre.",
      "ejemplo": "Cobre, ΔT = +50 K: R_hot/R_cold = 1 + 0.00393·50 = 1.1965 → ΔL = −20·log10(1.1965) ≈ −1.56 dB (la potencia eléctrica cae sólo 0.78 dB). ΔT = +100 K → −2.88 dB; ΔT = +150 K → −4.03 dB."
    },
    "meta_tags": ["LSP-IN-USE", "térmico", "compresión de potencia", "bobina"],
    "version_dataset": "3.1",
    "verificado": true
  },
  {
    "id_concepto": "resistencia_bobina_temp",
    "categoria": "Dinámica Térmica",
    "tipo": "Fórmula",
    "titulo": "Resistencia de Bobina vs Temperatura",
    "fuente": { "documento": "IEC 60028:1925 — International standard of resistance for copper", "año": 1925, "autor": "IEC" },
    "contenido_tecnico": {
      "definicion_detallada": "Variación de la resistencia DC (R_e) de la bobina con la temperatura. Invirtiendo la relación se estima la temperatura media de la bobina a partir de su resistencia medida. Ojo: la impedancia nominal (p. ej. '8 Ω') NO es la resistencia DC; en un altavoz de 8 Ω nominales R_e suele estar entre ≈ 5.5 y 7 Ω.",
      "formula_latex": "$$ R(T) = R_0 \\left[ 1 + \\alpha\\,(T - T_0) \\right] \\qquad \\Leftrightarrow \\qquad T = T_0 + \\frac{R(T)/R_0 - 1}{\\alpha} $$",
      "formula_texto": "R(T) = R0·(1 + α·(T - T0));  T = T0 + (R/R0 - 1)/α",
      "variables": {
        "R(T)": "Resistencia DC a la temperatura T (Ω)",
        "R_0": "Resistencia DC a T_0 = 20 °C (Ω), no la impedancia nominal",
        "\\alpha": "Coeficiente de temperatura: cobre recocido 0.00393 1/K a 20 °C (IEC 60028)",
        "T": "Temperatura de la bobina (°C)",
        "T_0": "Temperatura de referencia, 20 °C"
      },
      "restricciones": "Aproximación lineal, adecuada en el rango de trabajo de bobinas. Medir R_e en DC (o a muy baja frecuencia), nunca la impedancia a frecuencias de audio.",
      "ejemplo": "R_e = 8.00 Ω a 20 °C, T = 70 °C (+50 K): R = 8 × (1 + 0.00393·50) = 9.57 Ω (no 10 Ω como se indicaba antes). Altavoz de 8 Ω nominales con R_e = 6.00 Ω: 7.18 Ω a 70 °C. Inverso: si R_e pasa de 6.00 a 7.18 Ω, T ≈ 20 + (1.197 − 1)/0.00393 ≈ 70 °C."
    },
    "meta_tags": ["LSP-IN-USE", "resistencia", "calor"],
    "version_dataset": "3.1",
    "verificado": true
  },
  {
    "id_concepto": "constante_tiempo_termica",
    "categoria": "Dinámica Térmica",
    "tipo": "Fórmula",
    "titulo": "Constante de Tiempo Térmica (τ)",
    "fuente": { "documento": "Heat-Transfer Mechanisms in Loudspeakers: Analysis, Measurement, and Design (J. Audio Eng. Soc., Vol. 35 No. 10)", "año": 1987, "autor": "Clifford A. Henricksen" },
    "contenido_tecnico": {
      "definicion_detallada": "Constante de tiempo de un modelo térmico de primer orden (capacidad concentrada): tras un escalón de potencia la temperatura alcanza el 63 % de su incremento final en τ, y se enfría con la misma constante. Un altavoz se modela al menos con dos etapas en serie: la bobina (rápida) y el conjunto imán/estructura (lenta).",
      "formula_latex": "$$ \\tau = R_{th}\\, C_{th} = \\frac{m\\, c_p}{h\\, A} $$",
      "formula_texto": "τ = R_th·C_th = m·c_p/(h·A)",
      "variables": {
        "\\tau": "Constante de tiempo térmica (s)",
        "m": "Masa (kg)",
        "c_p": "Calor específico (J/(kg·K)); cobre ≈ 385, acero ≈ 460",
        "h": "Coeficiente de transferencia de calor (W/(m²·K))",
        "A": "Área de intercambio térmico (m²)",
        "R_{th}": "Resistencia térmica 1/(h·A) (K/W)",
        "C_{th}": "Capacidad térmica m·c_p (J/K)"
      },
      "restricciones": "Supone temperatura uniforme en cada masa (número de Biot ≪ 1). h aumenta con la ventilación y el movimiento del cono (convección forzada), por lo que la τ de la bobina cambia con el nivel y la frecuencia de la señal. Órdenes de magnitud: bobina, de segundos a decenas de segundos; imán/estructura, decenas de minutos. El valor anterior 'woofers grandes τ ≈ 5–10 min' no distinguía entre ambas etapas.",
      "ejemplo": "Valores ilustrativos: bobina de cobre de 15 g (C_th = 0.015·385 ≈ 5.8 J/K) con R_th bobina→imán = 2 K/W → τ ≈ 12 s. Imán + chasis de acero de 5 kg (C_th ≈ 2300 J/K) con R_th imán→ambiente = 1 K/W → τ ≈ 2300 s ≈ 38 min."
    },
    "meta_tags": ["LSP-IN-USE", "térmico", "tiempo"],
    "version_dataset": "3.1",
    "verificado": true
  }
];
