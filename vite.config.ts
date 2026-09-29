/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * base is the path the site is served from.
 *
 * Cloudflare Pages serves it from the root of jk-autorepair.pages.dev, so the
 * default is /. A host that serves from a subpath needs VITE_BASE set to that
 * path, and VITE_SITE_URL changes with it.
 */
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
  },
})
