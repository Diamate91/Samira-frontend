import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
      
      // Custom plugin to replace env variables in index.html
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Replace all %VITE_*% placeholders with actual env values
          return html.replace(/%(\w+)%/g, (match, key) => {
            return env[key] || match;
          });
        },
      },
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Make sure env variables are exposed
    define: {
      'import.meta.env.VITE_GA4_MEASUREMENT_ID': JSON.stringify(env.VITE_GA4_MEASUREMENT_ID),
      'import.meta.env.VITE_GSC_VERIFICATION_CODE': JSON.stringify(env.VITE_GSC_VERIFICATION_CODE),
    },
  }
})