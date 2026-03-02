import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        'vue',
        'radix-vue',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
        inlineDynamicImports: true,
      },
    },
  },
})
