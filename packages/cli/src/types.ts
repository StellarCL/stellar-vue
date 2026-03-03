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

/**
 * Get framework-aware default paths.
 * Vue projects use src/-prefixed paths; Nuxt projects use root-level paths.
 */
export function getDefaultPaths(framework: 'vue' | 'nuxt' = 'vue') {
  const prefix = framework === 'nuxt' ? '.' : './src'
  return {
    componentsDir: `${prefix}/components/ui`,
    composablesDir: `${prefix}/composables`,
    utilsDir: `${prefix}/lib`,
    cssVariables: `${prefix}/assets/css/variables.css`,
  }
}

const DEFAULT_CONFIG: StellarConfig = {
  ...getDefaultPaths('vue'),
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
  const frameworkPaths = getDefaultPaths(config.framework ?? 'vue')
  return {
    ...DEFAULT_CONFIG,
    ...frameworkPaths,
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
