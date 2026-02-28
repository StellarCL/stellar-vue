import { beforeEach, describe, expect, it, vi } from 'vitest'

import moduleDefinition, {
  COMPONENT_FAMILIES,
  CORE_COMPONENTS,
  CORE_COMPOSABLES,
  resolveAllowedComponents,
} from '../src/module'

/**
 * Since @nuxt/test-utils requires a full Nuxt context and is heavy for unit testing,
 * we test the module's logic directly by importing the module definition and
 * verifying its configuration, component lists, and setup behavior.
 */

// Mock @nuxt/kit before importing the module
const mockAddPlugin = vi.fn()
const mockAddImports = vi.fn()
const mockAddComponent = vi.fn()
const mockCreateResolver = vi.fn(() => ({
  resolve: (path: string) => `/resolved${path}`,
}))

vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: (config: any) => config,
  addPlugin: (...args: any[]) => mockAddPlugin(...args),
  addImports: (...args: any[]) => mockAddImports(...args),
  addComponent: (...args: any[]) => mockAddComponent(...args),
  createResolver: (...args: any[]) => mockCreateResolver(...args),
}))

describe('@stellar-vue-ui/nuxt module', () => {
  let nuxtMock: any

  beforeEach(() => {
    vi.clearAllMocks()
    nuxtMock = {
      options: {
        runtimeConfig: {
          public: {
            stellarUI: {},
          },
        },
      },
    }
  })

  describe('module meta', () => {
    it('should have correct meta configuration', () => {
      expect(moduleDefinition.meta).toEqual({
        name: '@stellar-vue-ui/nuxt',
        configKey: 'stellarUI',
        compatibility: {
          nuxt: '>=3.0.0',
        },
      })
    })
  })

  describe('module defaults', () => {
    it('should register with correct default options', () => {
      expect(moduleDefinition.defaults).toEqual({
        autoImport: true,
        prefix: 'UI',
        theme: 'stellar',
        darkMode: 'class',
        components: undefined,
        global: undefined,
      })
    })
  })

  describe('setup - runtime config', () => {
    it('should provide module options via runtimeConfig', () => {
      const options = {
        ...moduleDefinition.defaults,
        theme: 'sirius',
        darkMode: 'media' as const,
      }

      moduleDefinition.setup(options, nuxtMock)

      expect(nuxtMock.options.runtimeConfig.public.stellarUI).toEqual({
        theme: 'sirius',
        darkMode: 'media',
        global: undefined,
      })
    })
  })

  describe('setup - plugin registration', () => {
    it('should register the theme initialization plugin', () => {
      moduleDefinition.setup({ ...moduleDefinition.defaults }, nuxtMock)

      expect(mockAddPlugin).toHaveBeenCalledTimes(1)
      expect(mockAddPlugin).toHaveBeenCalledWith({
        src: expect.stringContaining('stellar-ui'),
        mode: 'all',
      })
    })
  })

  describe('setup - component auto-imports', () => {
    it('should register all components with the default UI prefix', () => {
      moduleDefinition.setup({ ...moduleDefinition.defaults }, nuxtMock)

      // Verify addComponent was called for each component
      expect(mockAddComponent).toHaveBeenCalledTimes(CORE_COMPONENTS.length)

      // Verify prefix is applied
      const firstCall = mockAddComponent.mock.calls[0][0]
      expect(firstCall.name).toBe('UIButton')
      expect(firstCall.export).toBe('Button')
      expect(firstCall.filePath).toBe('@stellar-vue-ui/core')
    })

    it('should register all 32 component families worth of components', () => {
      // Count total components from families
      const familyComponentCount = Object.values(COMPONENT_FAMILIES).reduce(
        (sum, comps) => sum + comps.length,
        0,
      )
      expect(CORE_COMPONENTS.length).toBe(familyComponentCount)
    })

    it('should use custom prefix when configured', () => {
      const options = { ...moduleDefinition.defaults, prefix: 'S' }
      moduleDefinition.setup(options, nuxtMock)

      const firstCall = mockAddComponent.mock.calls[0][0]
      expect(firstCall.name).toBe('SButton')
    })

    it('should use no prefix when empty string is configured', () => {
      const options = { ...moduleDefinition.defaults, prefix: '' }
      moduleDefinition.setup(options, nuxtMock)

      const firstCall = mockAddComponent.mock.calls[0][0]
      expect(firstCall.name).toBe('Button')
    })
  })

  describe('setup - composable auto-imports', () => {
    it('should register all 14 composables', () => {
      moduleDefinition.setup({ ...moduleDefinition.defaults }, nuxtMock)

      // addImports is called twice: once for core composables, once for useServerTheme
      expect(mockAddImports).toHaveBeenCalledTimes(2)

      // First call should be core composables
      const coreImports = mockAddImports.mock.calls[0][0]
      expect(coreImports).toHaveLength(CORE_COMPOSABLES.length)
      expect(coreImports).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'useTheme', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useThemeTokens', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useForm', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useFormField', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useDisclosure', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useToggle', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useSteps', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'usePagination', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useFocusTrap', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useKeyboardNav', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useDebounce', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useMediaQuery', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useClipboard', from: '@stellar-vue-ui/core' }),
          expect.objectContaining({ name: 'useDataTable', from: '@stellar-vue-ui/core' }),
        ]),
      )

      // Second call should be the useServerTheme composable
      const serverThemeImports = mockAddImports.mock.calls[1][0]
      expect(serverThemeImports).toHaveLength(1)
      expect(serverThemeImports[0].name).toBe('useServerTheme')
    })
  })

  describe('setup - selective component import', () => {
    it('should only import specified component families', () => {
      const options = {
        ...moduleDefinition.defaults,
        components: ['Button', 'Card'],
      }
      moduleDefinition.setup(options, nuxtMock)

      // Button (1) + Card family (6) = 7 components
      expect(mockAddComponent).toHaveBeenCalledTimes(7)

      const registeredNames = mockAddComponent.mock.calls.map(
        (call: any[]) => call[0].export,
      )
      expect(registeredNames).toContain('Button')
      expect(registeredNames).toContain('Card')
      expect(registeredNames).toContain('CardHeader')
      expect(registeredNames).toContain('CardTitle')
      expect(registeredNames).toContain('CardDescription')
      expect(registeredNames).toContain('CardContent')
      expect(registeredNames).toContain('CardFooter')

      // Should NOT include other components
      expect(registeredNames).not.toContain('Input')
      expect(registeredNames).not.toContain('Dialog')
    })

    it('should handle individual sub-component names', () => {
      const options = {
        ...moduleDefinition.defaults,
        components: ['Button', 'CardHeader'],
      }
      moduleDefinition.setup(options, nuxtMock)

      const registeredExports = mockAddComponent.mock.calls.map(
        (call: any[]) => call[0].export,
      )
      expect(registeredExports).toContain('Button')
      expect(registeredExports).toContain('CardHeader')
      // Card family not expanded since we specified individual sub-component
      expect(registeredExports).not.toContain('Card')
    })
  })

  describe('setup - autoImport disabled', () => {
    it('should skip component and composable registration when autoImport is false', () => {
      const options = { ...moduleDefinition.defaults, autoImport: false }
      moduleDefinition.setup(options, nuxtMock)

      // Plugin should still be registered
      expect(mockAddPlugin).toHaveBeenCalledTimes(1)
      // But no components or composables
      expect(mockAddComponent).not.toHaveBeenCalled()
      expect(mockAddImports).not.toHaveBeenCalled()
    })
  })

  describe('setup - dark mode config', () => {
    it('should pass class dark mode strategy through runtimeConfig', () => {
      const options = { ...moduleDefinition.defaults, darkMode: 'class' as const }
      moduleDefinition.setup(options, nuxtMock)

      expect(nuxtMock.options.runtimeConfig.public.stellarUI.darkMode).toBe('class')
    })

    it('should pass media dark mode strategy through runtimeConfig', () => {
      const options = { ...moduleDefinition.defaults, darkMode: 'media' as const }
      moduleDefinition.setup(options, nuxtMock)

      expect(nuxtMock.options.runtimeConfig.public.stellarUI.darkMode).toBe('media')
    })
  })

  describe('resolveAllowedComponents', () => {
    it('should return null when components is undefined', () => {
      expect(resolveAllowedComponents(undefined)).toBeNull()
    })

    it('should return null when components is empty array', () => {
      expect(resolveAllowedComponents([])).toBeNull()
    })

    it('should expand family names to all sub-components', () => {
      const allowed = resolveAllowedComponents(['Card'])!
      expect(allowed.has('Card')).toBe(true)
      expect(allowed.has('CardHeader')).toBe(true)
      expect(allowed.has('CardTitle')).toBe(true)
      expect(allowed.has('CardDescription')).toBe(true)
      expect(allowed.has('CardContent')).toBe(true)
      expect(allowed.has('CardFooter')).toBe(true)
      expect(allowed.size).toBe(6)
    })

    it('should handle individual component names that are not families', () => {
      const allowed = resolveAllowedComponents(['CardHeader'])!
      expect(allowed.has('CardHeader')).toBe(true)
      expect(allowed.size).toBe(1)
    })

    it('should handle mixed family and individual names', () => {
      const allowed = resolveAllowedComponents(['Button', 'Dialog', 'CardHeader'])!
      expect(allowed.has('Button')).toBe(true)
      expect(allowed.has('Dialog')).toBe(true)
      expect(allowed.has('DialogTrigger')).toBe(true)
      expect(allowed.has('DialogContent')).toBe(true)
      expect(allowed.has('CardHeader')).toBe(true)
      // Dialog family has 10 components + Button (1) + CardHeader (1) = 12
      expect(allowed.size).toBe(12)
    })
  })

  describe('component and composable completeness', () => {
    it('should have all 32 component families defined', () => {
      const families = Object.keys(COMPONENT_FAMILIES)
      expect(families).toHaveLength(32)
      expect(families).toEqual(
        expect.arrayContaining([
          'Button',
          'Label',
          'Separator',
          'Badge',
          'Skeleton',
          'Alert',
          'Card',
          'Input',
          'Textarea',
          'Checkbox',
          'RadioGroup',
          'Switch',
          'Select',
          'Dialog',
          'DropdownMenu',
          'Form',
          'Accordion',
          'Tabs',
          'Popover',
          'Tooltip',
          'Avatar',
          'Progress',
          'Slider',
          'Breadcrumb',
          'Pagination',
          'Command',
          'ContextMenu',
          'Menubar',
          'NavigationMenu',
          'Stepper',
          'Wizard',
          'DataTable',
        ]),
      )
    })

    it('should have all 14 composables defined', () => {
      expect(CORE_COMPOSABLES).toHaveLength(14)
      expect(CORE_COMPOSABLES).toEqual(
        expect.arrayContaining([
          'useTheme',
          'useThemeTokens',
          'useForm',
          'useFormField',
          'useDisclosure',
          'useToggle',
          'useSteps',
          'usePagination',
          'useFocusTrap',
          'useKeyboardNav',
          'useDebounce',
          'useMediaQuery',
          'useClipboard',
          'useDataTable',
        ]),
      )
    })

    it('should have consistent CORE_COMPONENTS and COMPONENT_FAMILIES', () => {
      // Every component in CORE_COMPONENTS should appear in exactly one family
      const allFamilyComponents = new Set<string>()
      for (const comps of Object.values(COMPONENT_FAMILIES)) {
        for (const comp of comps) {
          allFamilyComponents.add(comp)
        }
      }

      for (const { name } of CORE_COMPONENTS) {
        expect(allFamilyComponents.has(name)).toBe(true)
      }

      // And the counts should match
      expect(CORE_COMPONENTS.length).toBe(allFamilyComponents.size)
    })
  })
})
