// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // Enable Nuxt DevTools
  devtools: { enabled: true },

  // Register the Stellar Vue UI Nuxt module
  modules: ['@stellar-vue-ui/nuxt'],

  // Stellar Vue UI module configuration
  stellarUI: {
    // Auto-import all components with the "UI" prefix (e.g., UIButton, UICard)
    autoImport: true,
    prefix: 'UI',
    // Use the default stellar (cosmic purple) theme
    theme: 'stellar',
    // Dark mode via CSS class on <html>
    darkMode: 'class',
  },

  // Tailwind CSS via Vite plugin
  vite: {
    plugins: [],
  },

  // TypeScript strict mode
  typescript: {
    strict: true,
  },
})
