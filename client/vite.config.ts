/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/project2',
  test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './src/test/setUp.ts'
    },
});
