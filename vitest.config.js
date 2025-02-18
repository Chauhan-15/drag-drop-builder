// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom', // Ensure jsdom is being used
      },
  plugins: [vue()],
});

// vitest.config.js