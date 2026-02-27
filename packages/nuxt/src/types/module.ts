/**
 * Module options for @stellar-vue-ui/nuxt
 */
export interface ModuleOptions {
  /**
   * Whether to auto-import components and composables.
   * @default true
   */
  autoImport: boolean

  /**
   * Prefix for auto-imported components.
   * For example, with prefix 'UI', Button becomes UIButton.
   * Set to empty string for no prefix.
   * @default 'UI'
   */
  prefix: string

  /**
   * Default theme name to apply on initialization.
   * @default 'stellar'
   */
  theme: string

  /**
   * Dark mode strategy.
   * - 'class': Uses the 'dark' class on the html element
   * - 'media': Uses the prefers-color-scheme media query
   * @default 'class'
   */
  darkMode: 'class' | 'media'

  /**
   * List of specific component names to import.
   * When undefined, all components are imported.
   * Use the base component names without prefix (e.g., ['Button', 'Card', 'Input']).
   * @default undefined
   */
  components: string[] | undefined

  /**
   * Global options passed to components.
   * @default undefined
   */
  global: Record<string, any> | undefined
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    stellarUI: {
      theme: string
      darkMode: 'class' | 'media'
      global: Record<string, any> | undefined
    }
  }
}
