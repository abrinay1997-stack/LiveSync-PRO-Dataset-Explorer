
import { Concept } from './types';

export const physicsData: Concept[] = [
  {
    "id_concepto": "velocidad_sonido_efectiva",
    "categoria": "Física Ondulatoria",
    "tipo": "Fórmula",
    "titulo": "Velocidad Efectiva del Sonido (Viento)",
    "fuente": { "documento": "On the comparison of flown and ground-stacked subwoofer configurations regarding noise pollution (AES 151st Convention, Paper 10533)", "año": 2021, "autor": "Thomas Mouterde & Etienne Corteel (L-Acoustics)", "url": "https://www.l-acoustics.com/wp-content/uploads/2021/10/AES151_MouterdeEtAl._noisePollutionGroundVsFlown.pdf" },
    "contenido_tecnico": {
      "definicion_detallada": "Alteración de la propagación por la componente vectorial del viento.",
      "formula_latex": "$$ c(z) = c_0 + v(z) \\cos(\\alpha) $$",
      "variables": { "c(z)": "Velocidad efectiva", "v(z)": "Velocidad viento", "\\alpha": "Ángulo" },
      "restricciones": "Atmósfera estratificada."
    },
    "meta_tags": ["viento", "refracción"],
    "version_dataset": "1.1",
    "nota_verificacion": "verificar: la versión original del dataset citaba 'Atmospheric Propagation Study / AES 2021' sin título exacto; se asocia al paper AES 151 de Mouterde & Corteel (mismo año y tema). La relación es la aproximación estándar de velocidad efectiva del sonido (p. ej. Salomons, Computational Atmospheric Acoustics, 2001)."
  },
  {
    "id_concepto": "perfil_viento_logaritmico",
    "categoria": "Meteorología / Acústica Ambiental",
    "tipo": "Fórmula",
    "titulo": "Perfil Logarítmico de Velocidad de Viento",
    "fuente": { "documento": "On the comparison of flown and ground-stacked subwoofer configurations regarding noise pollution (AES 151st Convention, Paper 10533)", "año": 2021, "autor": "Thomas Mouterde & Etienne Corteel (L-Acoustics)", "seccion": "Ec. 3", "url": "https://www.l-acoustics.com/wp-content/uploads/2021/10/AES151_MouterdeEtAl._noisePollutionGroundVsFlown.pdf" },
    "contenido_tecnico": {
      "definicion_detallada": "Describe cómo aumenta la velocidad del viento con la altura, influenciada por la rugosidad del terreno.",
      "formula_latex": "$$ v(z) = v_m \\frac{\\ln(z/z_0 + 1)}{\\ln(z_m/z_0 + 1)} $$",
      "variables": { "v(z)": "Velocidad a altura z", "v_m": "Velocidad medida a z_m", "z_0": "Longitud de rugosidad" },
      "restricciones": "Fundamental para calcular la refracción de rayos sonoros hacia el suelo."
    },
    "meta_tags": ["capa límite", "gradiente", "rugosidad"],
    "version_dataset": "1.1"
  }
];
