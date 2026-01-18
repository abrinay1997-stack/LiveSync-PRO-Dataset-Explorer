
import { Concept } from './types';

export const networkingData: Concept[] = [
  {
    "id_concepto": "requisito_escala_nodos_red",
    "categoria": "Arquitectura de Red",
    "tipo": "Constante",
    "titulo": "Escala de Nodos en Sistemas de Refuerzo Sonoro",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024, "autor": "Kaltheuner et al." },
    "contenido_tecnico": {
      "definicion_detallada": "Capacidad de direccionamiento y procesamiento necesaria para redes de gran escala en giras y estadios (ej. Metallica M72).",
      "formula_latex": "$$ N_{nodes} \\approx 1000 $$",
      "variables": { "N_{nodes}": "Número de nodos de red (altavoces/amplificadores)" },
      "restricciones": "La tecnología de red debe escalar desde 10 hasta 1000 nodos sin sobrecostos de flujo de trabajo."
    },
    "meta_tags": ["escala", "nodos", "nodos de red"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "latencia_transporte_red_milan",
    "categoria": "Arquitectura de Red",
    "tipo": "Constante",
    "titulo": "Límite de Latencia de Transporte (Nodo a Nodo)",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Tiempo máximo permitido para el transporte de paquetes entre la fuente (source) y el destino (sink) en la capa de red.",
      "formula_latex": "$$ t_{net} \\leq 1 \\text{ ms} $$",
      "variables": { "t_{net}": "Latencia de transporte de red" },
      "restricciones": "Debe tener un límite superior garantizado (deterministic) con probabilidad de error cero."
    },
    "meta_tags": ["latencia", "determinismo", "jitter"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "error_sincronia_maximo_fase",
    "categoria": "Sincronización",
    "tipo": "Constante",
    "titulo": "Error Máximo de Sincronía (Suma Eléctrica)",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Desviación temporal máxima tolerada entre altavoces para evitar distorsiones espectrales audibles.",
      "formula_latex": "$$ \\Delta t_{sync} \\approx 1 \\text{ } \\mu s \\quad (\\Delta \\phi \\leq 10^\\circ @ 20 \\text{ kHz}) $$",
      "variables": { "\\Delta t_{sync}": "Error de sincronía", "\\Delta \\phi": "Desviación de fase" },
      "restricciones": "Resulta en una pérdida de nivel < 0.1 dB a 20 kHz, por debajo del JND."
    },
    "meta_tags": ["sincronización", "fase", "jitter", "PTP"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "comparativa_precision_ptp_hops",
    "categoria": "Sincronización",
    "tipo": "Hallazgo",
    "titulo": "Precisión de gPTP (802.1as) vs PTP V1/V2",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Error de tiempo máximo observado tras 6 saltos (hops) en la red bajo condiciones de tráfico pesado.",
      "formula_latex": "$$ \\epsilon_{gPTP} \\leq 0.063 \\text{ } \\mu s \\ll \\epsilon_{PTPv1} (2500 \\text{ } \\mu s) $$",
      "variables": { "\\epsilon": "Error de tiempo máximo en el 6to salto" },
      "restricciones": "Solo gPTP cumple el requisito de sincronía de 1µs en redes cargadas."
    },
    "meta_tags": ["gPTP", "AVB", "Milan", "PTP"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "credit_based_shaping_cbs",
    "categoria": "Protocolos de Red",
    "tipo": "Definición",
    "titulo": "Conformación de Tráfico Basada en Créditos (802.1Qav)",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Mecanismo de Capa 2 que suaviza ráfagas de tráfico y evita congestión en los puertos de los switches mediante un sistema de créditos.",
      "formula_latex": "$$ \\text{CBS} = \\text{Traffic Smoothing} \\rightarrow \\text{Zero Congestion} $$",
      "variables": {},
      "restricciones": "Evita que el tráfico de control (TCP/IP) degrade los flujos de audio críticos."
    },
    "meta_tags": ["CBS", "QoS", "Shaping", "Milan"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "stream_reservation_protocol_srp",
    "categoria": "Protocolos de Red",
    "tipo": "Definición",
    "titulo": "Protocolo de Reserva de Flujos (802.1Qat)",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Protocolo que garantiza ancho de banda de extremo a extremo a través de toda la ruta de red antes de iniciar la transmisión.",
      "formula_latex": "$$ BW_{reserved} \\leq 75\\% \\text{ BW}_{link} $$",
      "variables": { "BW": "Ancho de banda (Bandwidth)" },
      "restricciones": "Si el ancho de banda no está disponible, el switch notifica al nodo y no permite la conexión, garantizando fiabilidad."
    },
    "meta_tags": ["SRP", "Bandwidth", "Fiabilidad"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "capacidad_canales_milan_stream",
    "categoria": "Estándares Milan",
    "tipo": "Constante",
    "titulo": "Capacidad de Canales por Flujo Milan",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Número de canales de audio de 32 bits (AAF) transportados en un único flujo determinista.",
      "formula_latex": "$$ Ch_{base} \\in \\{1, 2, 4, 6, 8\\}, \\quad Ch_{max} \\leq 60 $$",
      "variables": { "Ch_{base}": "Formatos base Milan", "Ch_{max}": "Formatos de alta capacidad" },
      "restricciones": "Un solo switch Milan puede gestionar hasta 150 flujos (streams) reservados."
    },
    "meta_tags": ["Milan", "AAF", "canales", "estándar"],
    "version_dataset": "2.0"
  },
  {
    "id_concepto": "limite_hops_latencia_milan",
    "categoria": "Arquitectura de Red",
    "tipo": "Hallazgo",
    "titulo": "Límite de Saltos (Hops) para Latencia Determinista",
    "fuente": { "documento": "Requirements and Solutions for Audio Networking / AES 2024", "año": 2024 },
    "contenido_tecnico": {
      "definicion_detallada": "Relación entre el número de switches en cascada y la latencia de buffering necesaria en los dispositivos finales.",
      "formula_latex": "$$ Hops_{max} = 14 \\rightarrow t_{buffer} \\approx 2 \\text{ ms} $$",
      "variables": { "Hops_{max}": "Máximo de saltos en la ruta", "t_{buffer}": "Latencia de buffering en el receptor" },
      "restricciones": "Asumiendo una latencia por salto de 125µs en una red de 1Gbps."
    },
    "meta_tags": ["hops", "buffering", "daisy-chain"],
    "version_dataset": "2.0"
  }
];
