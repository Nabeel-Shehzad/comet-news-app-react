import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    css: {
      devSourcemap: true,
    }
  };
  
  // Only use /news/ as base path in production, use / in development
  if (command === 'build') {
    config.base = '/news/';
  }
  
  return config;
});
