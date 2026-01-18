
import { Concept } from './types';

export const easeFocusData: Concept[] = [
  {
    "id_concepto": "definicion_sistema_gll",
    "categoria": "Software de Simulación",
    "tipo": "Definición",
    "titulo": "Definición de Sistema GLL (Generic Loudspeaker Library)",
    "fuente": { "documento": "EASE Focus 3 Software Manual", "año": 2019, "autor": "AFMG" },
    "contenido_tecnico": {
      "definicion_detallada": "Archivo de datos que contiene las propiedades mecánicas, electrónicas y acústicas de un sistema de altavoces, compilado vía EASE SpeakerLab.",
      "formula_latex": "$$ GLL = \\{ Mech, Elect, Acoust \\} $$",
      "variables": { "Mech": "Límites de peso y ángulos", "Elect": "Configuraciones de filtros y entradas", "Acoust": "Directividad y sensibilidad" },
      "restricciones": "Debe estar autorizado específicamente por AFMG para ser visible en EASE Focus."
    },
    "meta_tags": ["GLL", "base de datos", "definición"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "sumatoria_presion_hibrida",
    "categoria": "Algoritmos de Audio",
    "tipo": "Hallazgo",
    "titulo": "Modelo de Sumatoria Híbrida (EASE Focus 3)",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 4.2", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Método por defecto para combinar múltiples fuentes. Los elementos internos de un array se suman de forma compleja (coherente), mientras que arrays distintos usan suma de potencia (incoherente) en HF.",
      "formula_latex": "$$ P_{total} = \\sqrt{\\sum |P_{array}|^2} \\quad (f > f_{limit}) $$",
      "variables": { "f_{limit}": "Umbral de transición (default 250 Hz)" },
      "restricciones": "Tiende a subestimar la coherencia entre arrays idénticos muy cercanos en el rango medio."
    },
    "meta_tags": ["sumatoria", "coherencia", "algoritmos"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "transicion_suma_compleja_octava",
    "categoria": "Física Acústica",
    "tipo": "Constante",
    "titulo": "Ancho de Banda de Transición de Suma Compleja",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 4.3", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Rango de frecuencia sobre el cual el algoritmo transiciona de suma compleja (100% coherente) a suma de potencia (0% coherente).",
      "formula_latex": "$$ BW_{trans} \\in [0.707f_c, 1.414f_c] $$",
      "variables": { "f_c": "Frecuencia de corte seleccionada" },
      "restricciones": "En f_c, la sumatoria es exactamente 50% compleja y 50% potencia."
    },
    "meta_tags": ["fase", "coherencia", "BW"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "limite_fuentes_activas_focus",
    "categoria": "Arquitectura de Software",
    "tipo": "Constante",
    "titulo": "Límite Máximo de Fuentes de Sonido",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 2.10", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Capacidad máxima del motor de cálculo para procesar fuentes simultáneas manteniendo el rendimiento.",
      "formula_latex": "$$ N_{sources} \\leq 40 $$",
      "variables": { "N_{sources}": "Total de Line Arrays + Columnas + Subs" },
      "restricciones": "Exceder este límite puede degradar la interactividad del mapeo en tiempo real."
    },
    "meta_tags": ["límites", "fuentes", "rendimiento"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "coordenadas_relativas_dz",
    "categoria": "Geometría de Simulación",
    "tipo": "Definición",
    "titulo": "Sistema de Coordenadas DZ (Relativo al Objeto)",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 1.5", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Sistema utilizado en vistas laterales (Side View) y niveles, donde D es la distancia a lo largo del eje principal del objeto y Z es la elevación.",
      "formula_latex": "$$ D = \\text{Distancia sobre eje axial} $$",
      "variables": {},
      "restricciones": "Por convención, las fuentes radian de izquierda a derecha (+D) en esta vista."
    },
    "meta_tags": ["coordenadas", "DZ", "geometría"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "logica_cabinet_gain_positivo",
    "categoria": "Ingeniería de Audio",
    "tipo": "Definición",
    "titulo": "Comportamiento del Ganancia de Gabinete Positiva",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 6.6", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Debido a que el sistema no puede exceder el MIV (Max Input Voltage), aplicar ganancia positiva a un gabinete (+3dB) resulta en la atenuación de todos los demás gabinetes del array.",
      "formula_latex": "$$ G_{boost} > 0 \\rightarrow G_{others} = G_{norm} - G_{boost} $$",
      "variables": { "G_{boost}": "Ganancia aplicada al gabinete seleccionado" },
      "restricciones": "La exportación XGLC a EASE 4 no soporta este valor y puede mostrar errores visuales en la GUI."
    },
    "meta_tags": ["ganancia", "atenuación", "MIV"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "limite_firmaker_lf_hf",
    "categoria": "Optimización de Cobertura",
    "tipo": "Hallazgo",
    "titulo": "Límites de Rendimiento de FIRmaker",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 6.8", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "La efectividad de los filtros FIR de optimización se ve limitada por la física y la resolución de taps.",
      "formula_latex": "$$ 200 \\text{ Hz} < f_{firmaker} < 8 \\text{ kHz} $$",
      "variables": {},
      "restricciones": "En LF (<200Hz) manda el tamaño del array; en HF (>8kHz) manda la inestabilidad atmosférica."
    },
    "meta_tags": ["FIRmaker", "LF", "HF", "límites"],
    "version_dataset": "2.4"
  },
  {
    "id_concepto": "requisito_firmaker_export",
    "categoria": "Metodología de Calibración",
    "tipo": "Constante",
    "titulo": "Resolución Mínima para Exportación de FIRmaker",
    "fuente": { "documento": "EASE Focus 3 Software Manual / Section 7.8", "año": 2019 },
    "contenido_tecnico": {
      "definicion_detallada": "Número de coeficientes recomendados para evitar truncamiento de la respuesta al impulso en el filtrado FIR.",
      "formula_latex": "$$ N_{taps} \\in [500, 1000] $$",
      "variables": { "N_{taps}": "Número de coeficientes FIR" },
      "restricciones": "Menos de 256 taps pueden causar cortes severos por debajo de 250 Hz (resolución de bins)."
    },
    "meta_tags": ["FIR", "taps", "resolución"],
    "version_dataset": "2.4"
  }
];
