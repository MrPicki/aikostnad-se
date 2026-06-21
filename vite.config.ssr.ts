/**
 * Vite config for the SSR bundle (build-time pre-rendering only).
 * Used as: vite build --ssr src/entry-server.tsx --config vite.config.ssr.ts
 *
 * Key difference from vite.config.ts:
 *   emptyOutDir: false — don't clear dist/ before building.
 *   The client build (via vite.config.ts) runs first and populates dist/.
 *   The SSR build adds dist/entry-server.js without touching existing files.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2020',
  },
})
