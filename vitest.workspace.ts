import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/core',
  'packages/theme',
  'packages/animations',
  'packages/cli',
  'packages/nuxt',
  'packages/test-utils',
])
