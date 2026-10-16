#!/usr/bin/env node
// Verificación numérica de los ejemplos resueltos del dataset (regla de exactitud, ver CLAUDE.md).
// Cada bloque recalcula el ejemplo de un concepto y comprueba el valor publicado.
// Uso: node scripts/verify-formulas.mjs   (sale con código 1 si algo no coincide)

let failures = 0;
const check = (id, label, actual, expected, tol) => {
  const ok = Math.abs(actual - expected) <= tol;
  if (!ok) failures++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${id} · ${label}: ${actual.toFixed(4)} (esperado ${expected} ± ${tol})`);
};

// --- ISO 9613-1 (iso_9613_1_atenuacion, concentracion_molar_vapor) ---
function iso9613(f, tempC, rh, pa = 101.325) {
  const pr = 101.325, T = tempC + 273.15, T0 = 293.15, T01 = 273.16;
  const C = -6.8346 * Math.pow(T01 / T, 1.261) + 4.6151;
  const h = rh * Math.pow(10, C) / (pa / pr); // en %
  const frO = (pa / pr) * (24 + 4.04e4 * h * (0.02 + h) / (0.391 + h));
  const frN = (pa / pr) * Math.pow(T / T0, -0.5) * (9 + 280 * h * Math.exp(-4.170 * (Math.pow(T / T0, -1 / 3) - 1)));
  const alpha = 8.686 * f * f * (
    1.84e-11 * Math.pow(pa / pr, -1) * Math.pow(T / T0, 0.5) +
    Math.pow(T / T0, -2.5) * (
      0.01275 * Math.exp(-2239.1 / T) / (frO + f * f / frO) +
      0.1068 * Math.exp(-3352.0 / T) / (frN + f * f / frN)));
  return { alpha, h }; // alpha en dB/m
}
// Referencia: ISO 9613-2:1996 Tabla 2 (20 °C, 70 % HR): 1 kHz 5.0 dB/km, 8 kHz 76.6 dB/km
check('iso_9613_1_atenuacion', 'α(1 kHz, 20 °C, 70 %) dB/km', iso9613(1000, 20, 70).alpha * 1000, 4.98, 0.02);
check('iso_9613_1_atenuacion', 'α(7943 Hz, 20 °C, 70 %) dB/km', iso9613(7943.3, 20, 70).alpha * 1000, 76.6, 0.1);
check('iso_9613_1_atenuacion', 'α(1 kHz, 20 °C, 50 %) dB/km', iso9613(1000, 20, 50).alpha * 1000, 4.66, 0.02);
check('iso_9613_1_atenuacion', 'α(4 kHz exacta, 10 °C, 70 %) dB/km vs tabla 32.8', iso9613(3981.1, 10, 70).alpha * 1000, 32.8, 0.3);
check('concentracion_molar_vapor', 'h (20 °C, 50 %) %', iso9613(1000, 20, 50).h, 1.153, 0.002);
check('concentracion_molar_vapor', 'h (20 °C, 70 %) %', iso9613(1000, 20, 70).h, 1.614, 0.002);

// --- Velocidad del sonido ---
check('velocidad_sonido_aire_lineal', 'error lineal vs exacta a 40 °C (m/s)', (331.3 + 0.6 * 40) - 331.3 * Math.sqrt(1 + 40 / 273.15), 0.57, 0.01);
check('velocidad_sonido_efectiva', 'Δt llegada 300 m, ±10 m/s (ms)', (300 / 333.2 - 300 / 353.2) * 1000, 51.0, 0.1);

// --- WST ---
check('wst_criteria_heil', 'λ/2 a 10 kHz (mm)', 343 / 10000 / 2 * 1000, 17.15, 0.01);
check('wst_criteria_heil', 'λ/4 a 16 kHz (mm)', 343 / 16000 / 4 * 1000, 5.36, 0.01);
check('wst_criteria_heil', 'ARF 0.30/0.35', 0.30 / 0.35, 0.857, 0.001);

// --- LR4: retardo de grupo derivando numéricamente la fase de 1/(s²+√2 s+1)² ---
const lr4Phase = (w) => -2 * Math.atan2(Math.SQRT2 * w, 1 - w * w);
const groupDelayFc = (w) => { // τ_g·f_c
  const d = 1e-6; let dp = lr4Phase(w + d) - lr4Phase(w - d);
  while (dp > Math.PI) dp -= 2 * Math.PI; while (dp < -Math.PI) dp += 2 * Math.PI;
  return (-dp / (2 * d)) / (2 * Math.PI);
};
const closedForm = (W) => 2 * Math.SQRT2 * (1 + W * W) / (2 * Math.PI * (1 + W ** 4));
check('group_delay_lr24', 'τ_g·f_c en continua', groupDelayFc(1e-4), 0.450, 0.001);
check('group_delay_lr24', 'τ_g·f_c en f_c', groupDelayFc(1), 0.450, 0.001);
check('group_delay_lr24', 'τ_g·f_c máx en 0.644·f_c', groupDelayFc(Math.sqrt(Math.SQRT2 - 1)), 0.543, 0.001);
check('group_delay_lr24', 'τ_g·f_c en 2·f_c', groupDelayFc(2), 0.132, 0.001);
check('group_delay_lr24', 'fórmula cerrada = derivada numérica (Ω=0.5)', closedForm(0.5), groupDelayFc(0.5), 1e-6);

// --- Eléctrico / térmico ---
const aCu = 0.00393;
check('caida_voltaje_cable', 'V_drop 16 A, 50 m, 2.5 mm² (V)', 16 * 0.0172 * 100 / 2.5, 11.0, 0.05);
check('compresion_potencia_thermal', 'ΔL SPL +50 K (dB)', 20 * Math.log10(1 + aCu * 50), 1.558, 0.001);
check('compresion_potencia_thermal', 'ΔL potencia eléctrica +50 K (dB)', 10 * Math.log10(1 + aCu * 50), 0.779, 0.001);
check('compresion_potencia_thermal', 'ΔL SPL +150 K (dB)', 20 * Math.log10(1 + aCu * 150), 4.03, 0.01);
check('compresion_potencia_thermal', 'ΔT para 2 dB (K)', (Math.pow(10, 2 / 20) - 1) / aCu, 65.9, 0.1);
check('resistencia_bobina_temp', 'R(70 °C) con R_e = 8 Ω', 8 * (1 + aCu * 50), 9.572, 0.001);
check('resistencia_bobina_temp', 'R(70 °C) con R_e = 6 Ω', 6 * (1 + aCu * 50), 7.179, 0.001);
check('constante_tiempo_termica', 'τ bobina 15 g, 2 K/W (s)', 0.015 * 385 * 2, 11.55, 0.01);
check('constante_tiempo_termica', 'τ imán 5 kg, 1 K/W (min)', 5 * 460 * 1 / 60, 38.3, 0.1);

// --- Rigging ---
const bridle = (incl) => 1 / (2 * Math.cos((incl / 2) * Math.PI / 180));
check('geometria_bridle_tension', 'T/W a 90° entre patas', bridle(90), 0.707, 0.001);
check('geometria_bridle_tension', 'T/W a 120° entre patas', bridle(120), 1.000, 0.001);
check('geometria_bridle_tension', 'T/W a 150° entre patas', bridle(150), 1.932, 0.001);

// --- Audio sobre IP ---
const O = 8 + 14 + 4 + 12 + 20 + 8 + 12; // bytes por paquete en el cable
const bw = (ch, bits, fs, streams, tp) => (ch * bits * fs + streams * 8 * O / tp) / 1e6;
check('ancho_banda_dante', 'O (bytes)', O, 78, 0);
check('ancho_banda_dante', '64 ch, 8 flujos, 1 ms (Mb/s)', bw(64, 24, 48000, 8, 1e-3), 78.7, 0.05);
check('ancho_banda_dante', '64 ch, 8 flujos, 125 µs (Mb/s)', bw(64, 24, 48000, 8, 125e-6), 113.7, 0.05);
check('ancho_banda_dante', '64 ch, 16 flujos, 1 ms (Mb/s)', bw(64, 24, 48000, 16, 1e-3), 83.7, 0.05);
check('ptp_precision_sync', 'Δφ a 20 kHz con 1 µs (°)', 360 * 20000 * 1e-6, 7.2, 1e-9);
check('ptp_precision_sync', 'pérdida de suma con 7.2° (dB)', 20 * Math.log10(Math.cos(3.6 * Math.PI / 180)), -0.017, 0.001);

console.log(failures === 0 ? '\nTodos los ejemplos verificados.' : `\n${failures} comprobaciones fallidas.`);
process.exit(failures === 0 ? 0 : 1);
