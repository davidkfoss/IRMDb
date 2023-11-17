import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const PROD_BASENAME = '/project2';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // The command value is 'serve' when running dev, and 'build' when running prod
  // We only need to set the base when running production build.
  const base = command === 'serve' ? undefined : PROD_BASENAME;

  return {
    plugins: [react()],
    base,
  };
});
