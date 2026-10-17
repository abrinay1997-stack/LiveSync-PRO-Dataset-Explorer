
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: el mismo build sirve en la raíz (Netlify / Worker propio) y bajo
  // livesyncpro.com/ciencia/ (plataforma unificada). La navegación es por hash (#id_concepto).
  base: './',
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
