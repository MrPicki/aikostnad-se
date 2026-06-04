import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers — smaller output, no unnecessary polyfills
    target: 'es2020',
    // Raise chunk size warning threshold (we split deliberately below)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — loaded first, cached aggressively
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          // Router — second-most critical for SPA
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-router'
          }
          // Helmet (SEO) — used on every page, worth isolating
          if (id.includes('node_modules/react-helmet')) {
            return 'vendor-helmet'
          }
          // Vercel analytics — non-critical, own chunk
          if (id.includes('node_modules/@vercel/analytics')) {
            return 'vendor-analytics'
          }
          // All other node_modules → single vendor chunk
          if (id.includes('node_modules/')) {
            return 'vendor-misc'
          }
        },
      },
    },
  },
})
