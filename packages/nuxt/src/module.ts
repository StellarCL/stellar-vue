import type { ModuleOptions } from './types/module'
import {
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'

/**
 * Complete list of all component exports from @stellar-vue-ui/core.
 * Each entry is [exportName, filePath] where filePath is relative to the core package.
 */
const CORE_COMPONENTS: Array<{ name: string, filePath: string }> = [
  // Button
  { name: 'Button', filePath: 'components/button' },
  // Label
  { name: 'Label', filePath: 'components/label' },
  // Separator
  { name: 'Separator', filePath: 'components/separator' },
  // Badge
  { name: 'Badge', filePath: 'components/badge' },
  // Skeleton
  { name: 'Skeleton', filePath: 'components/skeleton' },
  // Alert
  { name: 'Alert', filePath: 'components/alert' },
  { name: 'AlertTitle', filePath: 'components/alert' },
  { name: 'AlertDescription', filePath: 'components/alert' },
  // Card
  { name: 'Card', filePath: 'components/card' },
  { name: 'CardHeader', filePath: 'components/card' },
  { name: 'CardTitle', filePath: 'components/card' },
  { name: 'CardDescription', filePath: 'components/card' },
  { name: 'CardContent', filePath: 'components/card' },
  { name: 'CardFooter', filePath: 'components/card' },
  // Input
  { name: 'Input', filePath: 'components/input' },
  // Textarea
  { name: 'Textarea', filePath: 'components/textarea' },
  // Checkbox
  { name: 'Checkbox', filePath: 'components/checkbox' },
  // RadioGroup
  { name: 'RadioGroup', filePath: 'components/radio-group' },
  { name: 'RadioGroupItem', filePath: 'components/radio-group' },
  // Switch
  { name: 'Switch', filePath: 'components/switch' },
  // Select
  { name: 'Select', filePath: 'components/select' },
  { name: 'SelectTrigger', filePath: 'components/select' },
  { name: 'SelectValue', filePath: 'components/select' },
  { name: 'SelectContent', filePath: 'components/select' },
  { name: 'SelectItem', filePath: 'components/select' },
  { name: 'SelectGroup', filePath: 'components/select' },
  { name: 'SelectLabel', filePath: 'components/select' },
  { name: 'SelectSeparator', filePath: 'components/select' },
  { name: 'SelectScrollUpButton', filePath: 'components/select' },
  { name: 'SelectScrollDownButton', filePath: 'components/select' },
  // Dialog
  { name: 'Dialog', filePath: 'components/dialog' },
  { name: 'DialogTrigger', filePath: 'components/dialog' },
  { name: 'DialogPortal', filePath: 'components/dialog' },
  { name: 'DialogOverlay', filePath: 'components/dialog' },
  { name: 'DialogContent', filePath: 'components/dialog' },
  { name: 'DialogHeader', filePath: 'components/dialog' },
  { name: 'DialogFooter', filePath: 'components/dialog' },
  { name: 'DialogTitle', filePath: 'components/dialog' },
  { name: 'DialogDescription', filePath: 'components/dialog' },
  { name: 'DialogClose', filePath: 'components/dialog' },
  // DropdownMenu
  { name: 'DropdownMenu', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuTrigger', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuContent', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuItem', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuCheckboxItem', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuRadioGroup', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuRadioItem', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuLabel', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuSeparator', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuShortcut', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuGroup', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuSub', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuSubTrigger', filePath: 'components/dropdown-menu' },
  { name: 'DropdownMenuSubContent', filePath: 'components/dropdown-menu' },
  // Form
  { name: 'Form', filePath: 'components/form' },
  { name: 'FormField', filePath: 'components/form' },
  { name: 'FormItem', filePath: 'components/form' },
  { name: 'FormLabel', filePath: 'components/form' },
  { name: 'FormControl', filePath: 'components/form' },
  { name: 'FormDescription', filePath: 'components/form' },
  { name: 'FormMessage', filePath: 'components/form' },
  // Accordion
  { name: 'Accordion', filePath: 'components/accordion' },
  { name: 'AccordionItem', filePath: 'components/accordion' },
  { name: 'AccordionTrigger', filePath: 'components/accordion' },
  { name: 'AccordionContent', filePath: 'components/accordion' },
  // Tabs
  { name: 'Tabs', filePath: 'components/tabs' },
  { name: 'TabsList', filePath: 'components/tabs' },
  { name: 'TabsTrigger', filePath: 'components/tabs' },
  { name: 'TabsContent', filePath: 'components/tabs' },
  // Popover
  { name: 'Popover', filePath: 'components/popover' },
  { name: 'PopoverTrigger', filePath: 'components/popover' },
  { name: 'PopoverContent', filePath: 'components/popover' },
  // Tooltip
  { name: 'TooltipProvider', filePath: 'components/tooltip' },
  { name: 'Tooltip', filePath: 'components/tooltip' },
  { name: 'TooltipTrigger', filePath: 'components/tooltip' },
  { name: 'TooltipContent', filePath: 'components/tooltip' },
  // Avatar
  { name: 'Avatar', filePath: 'components/avatar' },
  { name: 'AvatarImage', filePath: 'components/avatar' },
  { name: 'AvatarFallback', filePath: 'components/avatar' },
  // Progress
  { name: 'Progress', filePath: 'components/progress' },
  // Slider
  { name: 'Slider', filePath: 'components/slider' },
  // Breadcrumb
  { name: 'Breadcrumb', filePath: 'components/breadcrumb' },
  { name: 'BreadcrumbList', filePath: 'components/breadcrumb' },
  { name: 'BreadcrumbItem', filePath: 'components/breadcrumb' },
  { name: 'BreadcrumbLink', filePath: 'components/breadcrumb' },
  { name: 'BreadcrumbPage', filePath: 'components/breadcrumb' },
  { name: 'BreadcrumbSeparator', filePath: 'components/breadcrumb' },
  { name: 'BreadcrumbEllipsis', filePath: 'components/breadcrumb' },
  // Pagination
  { name: 'Pagination', filePath: 'components/pagination' },
  { name: 'PaginationContent', filePath: 'components/pagination' },
  { name: 'PaginationItem', filePath: 'components/pagination' },
  { name: 'PaginationLink', filePath: 'components/pagination' },
  { name: 'PaginationPrevious', filePath: 'components/pagination' },
  { name: 'PaginationNext', filePath: 'components/pagination' },
  { name: 'PaginationEllipsis', filePath: 'components/pagination' },
  { name: 'PaginationFirst', filePath: 'components/pagination' },
  { name: 'PaginationLast', filePath: 'components/pagination' },
  // Command
  { name: 'Command', filePath: 'components/command' },
  { name: 'CommandDialog', filePath: 'components/command' },
  { name: 'CommandInput', filePath: 'components/command' },
  { name: 'CommandList', filePath: 'components/command' },
  { name: 'CommandEmpty', filePath: 'components/command' },
  { name: 'CommandGroup', filePath: 'components/command' },
  { name: 'CommandItem', filePath: 'components/command' },
  { name: 'CommandSeparator', filePath: 'components/command' },
  { name: 'CommandShortcut', filePath: 'components/command' },
  // ContextMenu
  { name: 'ContextMenu', filePath: 'components/context-menu' },
  { name: 'ContextMenuTrigger', filePath: 'components/context-menu' },
  { name: 'ContextMenuContent', filePath: 'components/context-menu' },
  { name: 'ContextMenuItem', filePath: 'components/context-menu' },
  { name: 'ContextMenuCheckboxItem', filePath: 'components/context-menu' },
  { name: 'ContextMenuRadioGroup', filePath: 'components/context-menu' },
  { name: 'ContextMenuRadioItem', filePath: 'components/context-menu' },
  { name: 'ContextMenuLabel', filePath: 'components/context-menu' },
  { name: 'ContextMenuSeparator', filePath: 'components/context-menu' },
  { name: 'ContextMenuShortcut', filePath: 'components/context-menu' },
  { name: 'ContextMenuGroup', filePath: 'components/context-menu' },
  { name: 'ContextMenuSub', filePath: 'components/context-menu' },
  { name: 'ContextMenuSubTrigger', filePath: 'components/context-menu' },
  { name: 'ContextMenuSubContent', filePath: 'components/context-menu' },
  // Menubar
  { name: 'Menubar', filePath: 'components/menubar' },
  { name: 'MenubarMenu', filePath: 'components/menubar' },
  { name: 'MenubarTrigger', filePath: 'components/menubar' },
  { name: 'MenubarContent', filePath: 'components/menubar' },
  { name: 'MenubarItem', filePath: 'components/menubar' },
  { name: 'MenubarCheckboxItem', filePath: 'components/menubar' },
  { name: 'MenubarRadioGroup', filePath: 'components/menubar' },
  { name: 'MenubarRadioItem', filePath: 'components/menubar' },
  { name: 'MenubarLabel', filePath: 'components/menubar' },
  { name: 'MenubarSeparator', filePath: 'components/menubar' },
  { name: 'MenubarShortcut', filePath: 'components/menubar' },
  { name: 'MenubarGroup', filePath: 'components/menubar' },
  { name: 'MenubarSub', filePath: 'components/menubar' },
  { name: 'MenubarSubTrigger', filePath: 'components/menubar' },
  { name: 'MenubarSubContent', filePath: 'components/menubar' },
  // NavigationMenu
  { name: 'NavigationMenu', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuList', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuItem', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuTrigger', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuContent', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuLink', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuViewport', filePath: 'components/navigation-menu' },
  { name: 'NavigationMenuIndicator', filePath: 'components/navigation-menu' },
  // Stepper
  { name: 'Stepper', filePath: 'components/stepper' },
  { name: 'StepperItem', filePath: 'components/stepper' },
  { name: 'StepperTrigger', filePath: 'components/stepper' },
  { name: 'StepperSeparator', filePath: 'components/stepper' },
  { name: 'StepperContent', filePath: 'components/stepper' },
  // Wizard
  { name: 'Wizard', filePath: 'components/wizard' },
  { name: 'WizardStep', filePath: 'components/wizard' },
  { name: 'WizardActions', filePath: 'components/wizard' },
  // DataTable
  { name: 'DataTable', filePath: 'components/data-table' },
  { name: 'DataTableHeader', filePath: 'components/data-table' },
  { name: 'DataTableBody', filePath: 'components/data-table' },
  { name: 'DataTableRow', filePath: 'components/data-table' },
  { name: 'DataTableHead', filePath: 'components/data-table' },
  { name: 'DataTableCell', filePath: 'components/data-table' },
  { name: 'DataTablePagination', filePath: 'components/data-table' },
  { name: 'DataTableColumnHeader', filePath: 'components/data-table' },
  { name: 'DataTableToolbar', filePath: 'components/data-table' },
  { name: 'DataTableRowActions', filePath: 'components/data-table' },
]

/**
 * Complete list of composable exports from @stellar-vue-ui/core.
 */
const CORE_COMPOSABLES = [
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
]

/**
 * Map of component family names (for the components filter option).
 * When a user specifies e.g. ['Button', 'Card'], we match all sub-components
 * that belong to those families.
 */
const COMPONENT_FAMILIES: Record<string, string[]> = {
  Button: ['Button'],
  Label: ['Label'],
  Separator: ['Separator'],
  Badge: ['Badge'],
  Skeleton: ['Skeleton'],
  Alert: ['Alert', 'AlertTitle', 'AlertDescription'],
  Card: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
  Input: ['Input'],
  Textarea: ['Textarea'],
  Checkbox: ['Checkbox'],
  RadioGroup: ['RadioGroup', 'RadioGroupItem'],
  Switch: ['Switch'],
  Select: [
    'Select',
    'SelectTrigger',
    'SelectValue',
    'SelectContent',
    'SelectItem',
    'SelectGroup',
    'SelectLabel',
    'SelectSeparator',
    'SelectScrollUpButton',
    'SelectScrollDownButton',
  ],
  Dialog: [
    'Dialog',
    'DialogTrigger',
    'DialogPortal',
    'DialogOverlay',
    'DialogContent',
    'DialogHeader',
    'DialogFooter',
    'DialogTitle',
    'DialogDescription',
    'DialogClose',
  ],
  DropdownMenu: [
    'DropdownMenu',
    'DropdownMenuTrigger',
    'DropdownMenuContent',
    'DropdownMenuItem',
    'DropdownMenuCheckboxItem',
    'DropdownMenuRadioGroup',
    'DropdownMenuRadioItem',
    'DropdownMenuLabel',
    'DropdownMenuSeparator',
    'DropdownMenuShortcut',
    'DropdownMenuGroup',
    'DropdownMenuSub',
    'DropdownMenuSubTrigger',
    'DropdownMenuSubContent',
  ],
  Form: ['Form', 'FormField', 'FormItem', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage'],
  Accordion: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
  Tabs: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
  Popover: ['Popover', 'PopoverTrigger', 'PopoverContent'],
  Tooltip: ['TooltipProvider', 'Tooltip', 'TooltipTrigger', 'TooltipContent'],
  Avatar: ['Avatar', 'AvatarImage', 'AvatarFallback'],
  Progress: ['Progress'],
  Slider: ['Slider'],
  Breadcrumb: [
    'Breadcrumb',
    'BreadcrumbList',
    'BreadcrumbItem',
    'BreadcrumbLink',
    'BreadcrumbPage',
    'BreadcrumbSeparator',
    'BreadcrumbEllipsis',
  ],
  Pagination: [
    'Pagination',
    'PaginationContent',
    'PaginationItem',
    'PaginationLink',
    'PaginationPrevious',
    'PaginationNext',
    'PaginationEllipsis',
    'PaginationFirst',
    'PaginationLast',
  ],
  Command: [
    'Command',
    'CommandDialog',
    'CommandInput',
    'CommandList',
    'CommandEmpty',
    'CommandGroup',
    'CommandItem',
    'CommandSeparator',
    'CommandShortcut',
  ],
  ContextMenu: [
    'ContextMenu',
    'ContextMenuTrigger',
    'ContextMenuContent',
    'ContextMenuItem',
    'ContextMenuCheckboxItem',
    'ContextMenuRadioGroup',
    'ContextMenuRadioItem',
    'ContextMenuLabel',
    'ContextMenuSeparator',
    'ContextMenuShortcut',
    'ContextMenuGroup',
    'ContextMenuSub',
    'ContextMenuSubTrigger',
    'ContextMenuSubContent',
  ],
  Menubar: [
    'Menubar',
    'MenubarMenu',
    'MenubarTrigger',
    'MenubarContent',
    'MenubarItem',
    'MenubarCheckboxItem',
    'MenubarRadioGroup',
    'MenubarRadioItem',
    'MenubarLabel',
    'MenubarSeparator',
    'MenubarShortcut',
    'MenubarGroup',
    'MenubarSub',
    'MenubarSubTrigger',
    'MenubarSubContent',
  ],
  NavigationMenu: [
    'NavigationMenu',
    'NavigationMenuList',
    'NavigationMenuItem',
    'NavigationMenuTrigger',
    'NavigationMenuContent',
    'NavigationMenuLink',
    'NavigationMenuViewport',
    'NavigationMenuIndicator',
  ],
  Stepper: ['Stepper', 'StepperItem', 'StepperTrigger', 'StepperSeparator', 'StepperContent'],
  Wizard: ['Wizard', 'WizardStep', 'WizardActions'],
  DataTable: [
    'DataTable',
    'DataTableHeader',
    'DataTableBody',
    'DataTableRow',
    'DataTableHead',
    'DataTableCell',
    'DataTablePagination',
    'DataTableColumnHeader',
    'DataTableToolbar',
    'DataTableRowActions',
  ],
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@stellar-vue-ui/nuxt',
    configKey: 'stellarUI',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    autoImport: true,
    prefix: 'UI',
    theme: 'stellar',
    darkMode: 'class',
    components: undefined,
    global: undefined,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Provide module options via runtimeConfig
    nuxt.options.runtimeConfig.public.stellarUI = {
      theme: options.theme,
      darkMode: options.darkMode,
      global: options.global,
    }

    // Register the runtime plugin for theme initialization
    addPlugin({
      src: resolve('./runtime/plugins/stellar-ui'),
      mode: 'all',
    })

    if (!options.autoImport) {
      return
    }

    // Determine which components to include
    const allowedComponentNames = resolveAllowedComponents(options.components)

    // Register component auto-imports with prefix
    for (const component of CORE_COMPONENTS) {
      if (allowedComponentNames && !allowedComponentNames.has(component.name)) {
        continue
      }

      const prefixedName = options.prefix
        ? `${options.prefix}${component.name}`
        : component.name

      addComponent({
        name: prefixedName,
        export: component.name,
        filePath: '@stellar-vue-ui/core',
      })
    }

    // Register composable auto-imports
    addImports(
      CORE_COMPOSABLES.map(name => ({
        name,
        from: '@stellar-vue-ui/core',
      })),
    )

    // Also register the server-safe composable from this module's runtime
    addImports([
      {
        name: 'useServerTheme',
        from: resolve('./runtime/composables/useServerTheme'),
      },
    ])
  },
})

/**
 * Resolve the set of allowed component names based on the components option.
 * When the user specifies family names (e.g., ['Button', 'Card']),
 * this expands them to include all sub-components.
 */
function resolveAllowedComponents(
  components: string[] | undefined,
): Set<string> | null {
  if (!components || components.length === 0) {
    return null // null means allow all
  }

  const allowed = new Set<string>()

  for (const name of components) {
    // Check if it's a family name
    if (COMPONENT_FAMILIES[name]) {
      for (const comp of COMPONENT_FAMILIES[name]) {
        allowed.add(comp)
      }
    }
    else {
      // Direct component name
      allowed.add(name)
    }
  }

  return allowed
}

// Export for testing
export { COMPONENT_FAMILIES, CORE_COMPONENTS, CORE_COMPOSABLES, resolveAllowedComponents }
