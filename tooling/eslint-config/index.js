import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      'dist',
      'node_modules',
      '.nuxt',
      '.output',
      'coverage',
      '*.d.ts',
      '**/*.md',
      '.claude/**',
      'apps/**',
    ],
  },
  {
    files: ['packages/cli/**/*.ts', 'playwright.config.ts'],
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
