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
  
  // Use root path for the production build since we're deploying to root domain
  if (command === 'build') {
    config.base = '/';
  }
  
  return config;
});
