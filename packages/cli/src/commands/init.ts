import type { StellarConfig } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import prompts from 'prompts'
import { THEME_TEMPLATES } from '../templates/themes'
import { UTIL_TEMPLATES } from '../templates/utils'
import { defineConfig, getDefaultPaths } from '../types'
import { findConfig, writeConfig, writeLockFile } from '../utils/config'
import { installDependencies } from '../utils/package-manager'
import { header, newLine, styles } from '../utils/prompts'

const THEMES = ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran'] as const

interface InitOptions {
  cwd?: string
  yes?: boolean
}

/**
 * Detect the framework by looking for nuxt.config.ts or nuxt.config.js in the working directory.
 */
function detectFramework(cwd: string): 'vue' | 'nuxt' {
  const nuxtConfigFiles = ['nuxt.config.ts', 'nuxt.config.js']
  for (const file of nuxtConfigFiles) {
    if (fs.existsSync(path.join(cwd, file))) {
      return 'nuxt'
    }
  }
  return 'vue'
}

export async function initCommand(options: InitOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  header('Stellar UI - Project Setup')
  console.log(styles.info('Initializing Stellar UI in your project...\n'))

  // 1. Check if config already exists
  const existingConfigDir = await findConfig(cwd)
  if (existingConfigDir) {
    if (options.yes) {
      console.log(styles.warning('Existing config found. Overwriting with defaults.'))
    }
    else {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'A Stellar UI config already exists. Overwrite?',
        initial: false,
      })

      if (!overwrite) {
        console.log(styles.info('Init cancelled.'))
        return
      }
    }
  }

  // 2. Detect framework
  const detectedFramework = detectFramework(cwd)

  let config: StellarConfig
  let selectedTheme = 'stellar'

  if (options.yes) {
    // Use all defaults without prompting (framework-aware)
    config = defineConfig({
      framework: detectedFramework,
    })
  }
  else {
    // 3. Interactive prompts — ask framework first so we can compute defaults
    const { framework } = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Framework',
      choices: [
        { title: 'Vue', value: 'vue' },
        { title: 'Nuxt', value: 'nuxt' },
      ],
      initial: detectedFramework === 'nuxt' ? 1 : 0,
    })

    // Handle user cancellation (Ctrl+C)
    if (framework === undefined) {
      console.log(styles.info('Init cancelled.'))
      return
    }

    const defaults = getDefaultPaths(framework)

    const response = await prompts([
      {
        type: 'text',
        name: 'componentsDir',
        message: 'Components directory',
        initial: defaults.componentsDir,
      },
      {
        type: 'text',
        name: 'composablesDir',
        message: 'Composables directory',
        initial: defaults.composablesDir,
      },
      {
        type: 'text',
        name: 'utilsDir',
        message: 'Utils directory',
        initial: defaults.utilsDir,
      },
      {
        type: 'text',
        name: 'cssVariables',
        message: 'CSS variables file',
        initial: defaults.cssVariables,
      },
      {
        type: 'select',
        name: 'theme',
        message: 'Default theme',
        choices: THEMES.map(t => ({ title: t.charAt(0).toUpperCase() + t.slice(1), value: t })),
        initial: 0,
      },
      {
        type: 'confirm',
        name: 'animations',
        message: 'Include animations?',
        initial: true,
      },
      {
        type: 'select',
        name: 'icons',
        message: 'Icon library',
        choices: [
          { title: 'Lucide', value: 'lucide' },
          { title: 'Heroicons', value: 'heroicons' },
          { title: 'Phosphor', value: 'phosphor' },
          { title: 'None', value: 'none' },
        ],
        initial: 0,
      },
    ])

    // Handle user cancellation (Ctrl+C)
    if (response.componentsDir === undefined) {
      console.log(styles.info('Init cancelled.'))
      return
    }

    selectedTheme = response.theme ?? 'stellar'

    config = defineConfig({
      framework,
      componentsDir: response.componentsDir ?? defaults.componentsDir,
      composablesDir: response.composablesDir ?? defaults.composablesDir,
      utilsDir: response.utilsDir ?? defaults.utilsDir,
      cssVariables: response.cssVariables ?? defaults.cssVariables,
      features: {
        animations: response.animations ?? true,
        forms: true,
        icons: response.icons ?? 'lucide',
      },
    })
  }

  newLine()
  const spinner = ora('Writing configuration files...').start()

  try {
    // 4. Write config files
    await writeConfig(config, cwd)
    spinner.succeed('Config files created')

    // 5. Write initial CSS file with theme tokens
    const cssDir = path.dirname(path.join(cwd, config.cssVariables))
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true })
    }
    const cssPath = path.join(cwd, config.cssVariables)
    const themeCSS = THEME_TEMPLATES[selectedTheme] ?? THEME_TEMPLATES.stellar
    fs.writeFileSync(cssPath, themeCSS, 'utf-8')
    const cssSpinner = ora('CSS variables file created').start()
    cssSpinner.succeed('CSS variables file created')

    // 6. Create project directories
    const dirs = [config.componentsDir, config.composablesDir]
    for (const dir of dirs) {
      const absDir = path.join(cwd, dir)
      if (!fs.existsSync(absDir)) {
        fs.mkdirSync(absDir, { recursive: true })
      }
    }
    const dirsSpinner = ora('Project directories created').start()
    dirsSpinner.succeed('Project directories created')

    // 8. Create components.lock.json
    await writeLockFile(
      {
        version: '1.0.0',
        components: {},
      },
      cwd,
    )
    const lockSpinner = ora('Lock file created').start()
    lockSpinner.succeed('Lock file created')

    // 9. Write shared utils (cn.ts, variants.ts, index.ts)
    const utilsAbsDir = path.join(cwd, config.utilsDir)
    if (!fs.existsSync(utilsAbsDir)) {
      fs.mkdirSync(utilsAbsDir, { recursive: true })
    }
    for (const [fileName, content] of Object.entries(UTIL_TEMPLATES)) {
      fs.writeFileSync(path.join(utilsAbsDir, fileName), content, 'utf-8')
    }
    const utilsSpinner = ora('Shared utils created').start()
    utilsSpinner.succeed('Shared utils created')

    // 10. Install core dependencies
    const coreDeps = [
      'tailwindcss',
      config.framework === 'nuxt' ? '@nuxtjs/tailwindcss' : '@tailwindcss/vite',
      'radix-vue',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
    ]
    await installDependencies(coreDeps, cwd)

    // 11. Success message
    newLine()
    console.log(styles.success('Stellar UI initialized successfully!'))
    newLine()
    console.log(styles.highlight('Next steps:'))
    if (config.framework === 'vue') {
      console.log(styles.dim(`  1. Add the Tailwind plugin to vite.config.ts:`))
      console.log(styles.dim(`     import tailwindcss from '@tailwindcss/vite'`))
      console.log(styles.dim(`     // add tailwindcss() to the plugins array`))
      console.log(styles.dim(`  2. Add @import 'tailwindcss' to your main CSS file`))
      console.log(styles.dim(`  3. Add components:  npx stellar-ui add button`))
    }
    else {
      console.log(styles.dim(`  1. Add '@nuxtjs/tailwindcss' to your nuxt.config modules`))
      console.log(styles.dim(`  2. Add components:  npx stellar-ui add button`))
    }
    console.log(
      styles.dim(
        `  ${config.framework === 'vue' ? '4' : '3'}. Customize theme in ${config.cssVariables}`,
      ),
    )
    newLine()
  }
  catch (error) {
    spinner.fail('Failed to initialize Stellar UI')
    const message = error instanceof Error ? error.message : String(error)
    console.error(styles.error(message))
    process.exitCode = 1
  }
}
