
import { Concept } from './types';

export const combFilteringData: Concept[] = [
  {
    "id_concepto": "definicion_comb_filtering",
    "categoria": "Fenómenos Acústicos",
    "tipo": "Definición",
    "titulo": "Filtrado de Peine (Comb-filtering)",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022, "autor": "Moulin & Corteel" },
    "contenido_tecnico": {
      "definicion_detallada": "Patrón de interferencia que ocurre cuando dos o más señales idénticas se presentan con un retardo corto entre ellas, resultando en cancelaciones y refuerzos periódicos en el espectro.",
      "formula_latex": "$$ f_{notch} = \\frac{2n+1}{2\\Delta t} $$",
      "variables": { "\\Delta t": "Retardo entre señales", "f_{notch}": "Frecuencias de cancelación", "n": "Número entero (0, 1, 2...)" },
      "restricciones": "Crítico en áreas de cobertura compartida (overlap) entre sistemas principales y de relleno."
    },
    "meta_tags": ["interferencia", "fase", "coloración"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "summing_localization_threshold",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Umbral de Localización por Suma (Summing Localization)",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "Rango de retardo dentro del cual el oyente fusiona dos fuentes en una única imagen fantasma cuya posición depende de la diferencia de tiempo.",
      "formula_latex": "$$ \\Delta t < 1 \\text{ ms} $$",
      "variables": { "\\Delta t": "Retardo entre fuentes" },
      "restricciones": "Más allá de este umbral, entra en juego el efecto de precedencia (Haas)."
    },
    "meta_tags": ["localización", "fusión", "imagen fantasma"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "ventana_precedencia_estimulos",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Ventana del Efecto de Precedencia por Estímulo",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "Límite superior de tiempo donde dos sonidos se perciben como un evento único fusionado en la dirección de la fuente líder.",
      "formula_latex": "$$ \\Delta t_{clicks} \\in [5, 10] \\text{ ms}, \\quad \\Delta t_{speech} \\approx 30 \\text{ ms} $$",
      "variables": { "\\Delta t": "Ventana de fusión temporal" },
      "restricciones": "Valores para fuentes al mismo nivel SPL."
    },
    "meta_tags": ["Haas", "precedencia", "clicks", "speech"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "umbral_audibilidad_vs_aceptabilidad_comb",
    "categoria": "Psicoacústica",
    "tipo": "Constante",
    "titulo": "Áreas de Coloración Audible vs. Inaceptable",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "Diferenciación angular de la zona donde una reflexión a -6 dB genera degradación tímbrica audible frente a la zona donde es subjetivamente inaceptable.",
      "formula_latex": "$$ \\theta_{audible} = \\pm 50^\\circ, \\quad \\theta_{unacceptable} = \\pm 41^\\circ $$",
      "variables": { "\\theta": "Ángulo de lateralización respecto a 0°" },
      "restricciones": "Basado en una fuente lag a -6 dB relativo a la fuente líder."
    },
    "meta_tags": ["coloración", "aceptabilidad", "límites"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "niveles_criticos_aceptabilidad_config",
    "categoria": "Calidad Sonora",
    "tipo": "Constante",
    "titulo": "Niveles Críticos de Aceptabilidad por Configuración",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "Nivel relativo de la fuente lag necesario para alcanzar el umbral de inaceptabilidad según la separación angular y el retardo.",
      "formula_latex": "$$ L_{crit} = \\begin{cases} -6.7 \\text{ dB} & (10 \\text{ ms} / 30^\\circ) \\\\ -2.2 \\text{ dB} & (1 \\text{ ms} / 10^\\circ) \\end{cases} $$",
      "variables": { "L_{crit}": "Nivel relativo de la fuente retrasada" },
      "restricciones": "Demuestra que a mayor separación angular y retardo, la coloración se tolera menos a niveles altos de lag."
    },
    "meta_tags": ["umbral", "aceptabilidad", "nivel crítico"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "audibilidad_coloracion_separacion_espacial",
    "categoria": "Hallazgo",
    "tipo": "Hallazgo",
    "titulo": "Reducción de Coloración por Separación Angular",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "La audibilidad de la coloración espectral se reduce considerablemente cuando las fuentes están separadas espacialmente, incluso con ángulos pequeños.",
      "formula_latex": "$$ \\text{Audibilidad}_{color} \\downarrow \\text{ as } \\theta_{azimuth} \\geq 10^\\circ $$",
      "variables": { "\\theta_{azimuth}": "Ángulo de separación horizontal" },
      "restricciones": "El caso más crítico es la suma eléctrica (0° de separación)."
    },
    "meta_tags": ["coloración", "azimut", "separación"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "delays_criticos_por_material",
    "categoria": "Calidad Sonora",
    "tipo": "Hallazgo",
    "titulo": "Delays Críticos según Material de Audio",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "El retardo donde la coloración es más inaceptable varía según el contenido armónico y temporal de la señal.",
      "formula_latex": "$$ \\Delta t_{crit, ORCH} \\approx 2 \\text{ ms}, \\quad \\Delta t_{crit, VOICE} \\approx 10 \\text{ ms} $$",
      "variables": {},
      "restricciones": "Basado en pruebas de audibilidad con música orquestal y voz seca."
    },
    "meta_tags": ["retardo", "música", "voz", "coloración"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "descriptores_degradacion_espacial_comb",
    "categoria": "Psicoacústica",
    "tipo": "Definición",
    "titulo": "Descriptores de Degradación Espacial",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "Atributos perceptuales utilizados para calificar la alteración de la imagen sonora debido al filtrado de peine.",
      "formula_latex": "$$ \\text{Degrad}_{spatial} \\in \\{ \\text{Width, Shift, 2 Sources} \\} $$",
      "variables": { "Width": "Aumento del ancho de fuente o blur", "Shift": "Desplazamiento del origen espacial", "2 Sources": "Percepción de separación física" },
      "restricciones": "El tipo de degradación percibida depende casi exclusivamente del nivel relativo y la separación, no del retardo."
    },
    "meta_tags": ["espacialidad", "blur", "localización"],
    "version_dataset": "1.8"
  },
  {
    "id_concepto": "modificacion_espacial_a_minus6db",
    "categoria": "Psicoacústica",
    "tipo": "Hallazgo",
    "titulo": "Modificación de Ancho de Imagen a -6 dB",
    "fuente": { "documento": "Spectral and spatial perceptions of comb-filtering / AES 10551", "año": 2022 },
    "contenido_tecnico": {
      "definicion_detallada": "A un nivel relativo de -6 dB, la fuente retrasada (lag source) modifica principalmente el ancho percibido de la imagen sonora, sin desplazar severamente la localización.",
      "formula_latex": "$$ L_{lag} = -6 \\text{ dB} \\rightarrow \\Delta \\text{Width} \\uparrow $$",
      "variables": { "L_{lag}": "Nivel relativo de la fuente retrasada" },
      "restricciones": "A medida que el nivel aumenta hacia 0 dB, la percepción cambia a desplazamiento de localización o separación de fuentes."
    },
    "meta_tags": ["ancho", "espacialidad", "imagen"],
    "version_dataset": "1.8"
  }
];
