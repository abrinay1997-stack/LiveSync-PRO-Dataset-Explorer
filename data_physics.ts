
import { Concept } from './types';

export const physicsData: Concept[] = [
  {
    "id_concepto": "velocidad_sonido_efectiva",
    "categoria": "Atmosférico & Ambiental",
    "tipo": "Fórmula",
    "titulo": "Velocidad Efectiva del Sonido y Refracción por Viento",
    "fuente": { "documento": "Computational Atmospheric Acoustics", "año": 2001, "autor": "Erik M. Salomons (Kluwer Academic Publishers)" },
    "contenido_tecnico": {
      "definicion_detallada": "En propagación casi horizontal, el viento se suma a la velocidad del sonido a través de su componente en la dirección de propagación (aproximación de velocidad efectiva). Como el viento crece con la altura (ver perfil_viento_logaritmico), c_eff varía con z y los rayos se curvan: con dc_eff/dz > 0 (a favor del viento, o inversión térmica) se curvan hacia el suelo y aumentan el nivel lejano; con dc_eff/dz < 0 (contra el viento) se curvan hacia arriba y crean zonas de sombra. Aplicación a subwoofers volados vs. apilados en suelo: Mouterde & Corteel, AES 151st Convention, Paper 10533 (2021).",
      "formula_latex": "$$ c_{\\text{eff}}(z) = c(z) + u(z)\\cos\\varphi, \\qquad \\Delta c = u(z)\\cos\\varphi $$",
      "formula_texto": "c_eff(z) = c(z) + u(z)·cos φ;  Δc = u(z)·cos φ",
      "variables": {
        "c_{\\text{eff}}(z)": "Velocidad efectiva del sonido a la altura z (m/s)",
        "c(z)": "Velocidad del sonido sin viento a la altura z, función de la temperatura (m/s)",
        "u(z)": "Velocidad del viento a la altura z (m/s)",
        "\\varphi": "Ángulo entre la dirección del viento y la de propagación (0° = a favor)",
        "\\Delta c": "Incremento de velocidad debido al viento (m/s)"
      },
      "restricciones": "Atmósfera estratificada (horizontalmente homogénea), propagación casi horizontal y |u| ≪ c (error de orden u²/c²). Ignora la componente vertical del viento y la turbulencia, que en HF dominan la inestabilidad de las medidas a larga distancia.",
      "ejemplo": "c = 343.2 m/s (20 °C), viento de 10 m/s: a favor (φ = 0°) c_eff = 353.2 m/s; contra (φ = 180°) 333.2 m/s; transversal (φ = 90°) 343.2 m/s. A 300 m, el tiempo de llegada difiere ≈ 51 ms entre ambos sentidos (300/333.2 − 300/353.2 s)."
    },
    "meta_tags": ["LSP-IN-USE", "viento", "refracción", "velocidad efectiva"],
    "version_dataset": "3.1",
    "verificado": true,
    "ids_fusionados": ["refraccion_gradiente_viento"],
    "nota_verificacion": "Fusión de 'velocidad_sonido_efectiva' (data_physics) y 'refraccion_gradiente_viento' (data_scientific_refs), que describían la misma relación. Se cita como fuente principal la referencia estándar de acústica atmosférica; la versión original citaba 'Atmospheric Propagation Study / AES 2021' sin título exacto."
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
