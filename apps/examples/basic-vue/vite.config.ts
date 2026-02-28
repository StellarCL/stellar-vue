import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Resolve workspace packages from source so the example works without
// pre-building the packages (no dist/ required).
const MONOREPO_ROOT = resolve(__dirname, '../../..')

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@stellar-vue-ui/core': resolve(MONOREPO_ROOT, 'packages/core/src/index.ts'),
      '@stellar-vue-ui/theme': resolve(MONOREPO_ROOT, 'packages/theme/src/index.ts'),
    },
  },
})
