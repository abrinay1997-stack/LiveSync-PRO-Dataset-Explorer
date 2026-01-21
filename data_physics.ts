
import { Concept } from './types';

export const physicsData: Concept[] = [
  {
    "id_concepto": "velocidad_sonido_efectiva",
    "categoria": "Física Ondulatoria",
    "tipo": "Fórmula",
    "titulo": "Velocidad Efectiva del Sonido (Viento)",
    "fuente": { "documento": "LiveSync Pro Atmospheric Study", "año": 2021 },
    "contenido_tecnico": {
      "definicion_detallada": "Alteración de la propagación por la componente vectorial del viento.",
      "formula_latex": "$$ c(z) = c_0 + v(z) \\cos(\\alpha) $$",
      "variables": { "c(z)": "Velocidad efectiva", "v(z)": "Velocidad viento", "\\alpha": "Ángulo" },
      "restricciones": "Atmósfera estratificada."
    },
    "meta_tags": ["viento", "refracción"],
    "version_dataset": "1.1"
  },
  {
    "id_concepto": "perfil_viento_logaritmico",
    "categoria": "Meteorología / Acústica Ambiental",
    "tipo": "Fórmula",
    "titulo": "Perfil Logarítmico de Velocidad de Viento",
    "fuente": { "documento": "LiveSync Pro Subwoofer Configuration Study", "año": 2021, "autor": "LiveSync Pro Engineering" },
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
