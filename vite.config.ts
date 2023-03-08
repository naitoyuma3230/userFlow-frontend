/// <reference types="vitest" />
// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'vuetify.config.js',
    deps: {
      inline: ['vuetify'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
