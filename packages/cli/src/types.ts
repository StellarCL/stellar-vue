export interface StellarConfig {
  componentsDir: string
  composablesDir: string
  utilsDir: string
  cssVariables: string
  tailwindConfig: string
  typescript: boolean
  aliases: Record<string, string>
  framework: 'vue' | 'nuxt'
  features: {
    animations: boolean
    forms: boolean
    icons: 'lucide' | 'heroicons' | 'phosphor' | 'none'
  }
}

export interface ComponentLock {
  version: string
  components: Record<string, ComponentEntry>
}

export interface ComponentEntry {
  version: string
  installedAt: string
  customized: boolean
  files: string[]
  dependencies: Record<string, string>
}

export interface ComponentRegistryEntry {
  name: string
  description: string
  category: string
  version: string
  files: string[]
  dependencies: Record<string, string>
  peerDependencies: string[] // other stellar components this depends on
}

const DEFAULT_CONFIG: StellarConfig = {
  componentsDir: './components/ui',
  composablesDir: './composables',
  utilsDir: './lib',
  cssVariables: './assets/css/variables.css',
  tailwindConfig: './tailwind.config.ts',
  typescript: true,
  aliases: {
    '@': './src',
    '~': './',
  },
  framework: 'vue',
  features: {
    animations: true,
    forms: true,
    icons: 'lucide',
  },
}

export function defineConfig(config: Partial<StellarConfig>): StellarConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    aliases: {
      ...DEFAULT_CONFIG.aliases,
      ...(config.aliases ?? {}),
    },
    features: {
      ...DEFAULT_CONFIG.features,
      ...(config.features ?? {}),
    },
  }
}
