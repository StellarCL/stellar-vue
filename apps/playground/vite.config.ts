import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Resolve workspace packages to their source directly (no build needed)
      '@stellar-vue-ui/core': resolve(__dirname, '../../packages/core/src/index.ts'),
      '@stellar-vue-ui/theme': resolve(__dirname, '../../packages/theme/src/index.ts'),
    },
  },
})
