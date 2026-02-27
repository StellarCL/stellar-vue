export default defineNuxtConfig({
  modules: ['../src/module'],

  stellarUI: {
    autoImport: true,
    prefix: 'UI',
    theme: 'stellar',
    darkMode: 'class',
  },

  devtools: { enabled: true },

  compatibilityDate: '2025-01-01',
})
