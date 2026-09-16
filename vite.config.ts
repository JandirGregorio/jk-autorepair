/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * base is the one knob that changes when the custom domain arrives.
 *
 * GitHub Pages serves this repo at /jk-autorepair/ until a domain is attached.
 * Then set VITE_BASE=/ and VITE_SITE_URL=https://<domain> and add public/CNAME.
 */
const base = process.env.VITE_BASE ?? '/jk-autorepair/'

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
