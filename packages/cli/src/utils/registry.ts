import type { ComponentRegistryEntry } from '../types'

/**
 * Embedded component registry.
 * In a future version this will be fetched from an API endpoint.
 */
const REGISTRY: ComponentRegistryEntry[] = [
  // --- Layout ---
  {
    name: 'card',
    description: 'Versatile container with header, content, and footer sections',
    category: 'layout',
    version: '0.1.0',
    files: ['components/ui/card/Card.vue', 'components/ui/card/CardHeader.vue', 'components/ui/card/CardTitle.vue', 'components/ui/card/CardDescription.vue', 'components/ui/card/CardContent.vue', 'components/ui/card/CardFooter.vue', 'components/ui/card/index.ts'],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'separator',
    description: 'Visual divider between content sections',
    category: 'layout',
    version: '0.1.0',
    files: ['components/ui/separator/Separator.vue', 'components/ui/separator/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'skeleton',
    description: 'Placeholder loading animation for content',
    category: 'layout',
    version: '0.1.0',
    files: ['components/ui/skeleton/Skeleton.vue', 'components/ui/skeleton/index.ts'],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'accordion',
    description: 'Collapsible content panels for showing and hiding sections',
    category: 'layout',
    version: '0.1.0',
    files: ['components/ui/accordion/Accordion.vue', 'components/ui/accordion/AccordionItem.vue', 'components/ui/accordion/AccordionTrigger.vue', 'components/ui/accordion/AccordionContent.vue', 'components/ui/accordion/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'tabs',
    description: 'Tabbed interface for switching between content panels',
    category: 'layout',
    version: '0.1.0',
    files: ['components/ui/tabs/Tabs.vue', 'components/ui/tabs/TabsList.vue', 'components/ui/tabs/TabsTrigger.vue', 'components/ui/tabs/TabsContent.vue', 'components/ui/tabs/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },

  // --- Forms ---
  {
    name: 'button',
    description: 'Interactive button with multiple variants, sizes, and states',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/button/Button.vue', 'components/ui/button/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'input',
    description: 'Text input field with validation and icon support',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/input/Input.vue', 'components/ui/input/index.ts'],
    dependencies: {},
    peerDependencies: ['label'],
  },
  {
    name: 'textarea',
    description: 'Multi-line text input with auto-resize support',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/textarea/Textarea.vue', 'components/ui/textarea/index.ts'],
    dependencies: {},
    peerDependencies: ['label'],
  },
  {
    name: 'checkbox',
    description: 'Toggle control for boolean values with indeterminate state',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/checkbox/Checkbox.vue', 'components/ui/checkbox/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'radio-group',
    description: 'Group of radio buttons for single selection from options',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/radio-group/RadioGroup.vue', 'components/ui/radio-group/RadioGroupItem.vue', 'components/ui/radio-group/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'select',
    description: 'Dropdown selection control with search and multi-select',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/select/Select.vue', 'components/ui/select/SelectTrigger.vue', 'components/ui/select/SelectContent.vue', 'components/ui/select/SelectItem.vue', 'components/ui/select/SelectGroup.vue', 'components/ui/select/SelectLabel.vue', 'components/ui/select/SelectSeparator.vue', 'components/ui/select/SelectValue.vue', 'components/ui/select/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'switch',
    description: 'Toggle switch for on/off states',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/switch/Switch.vue', 'components/ui/switch/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'slider',
    description: 'Range input for selecting a numeric value within a range',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/slider/Slider.vue', 'components/ui/slider/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'label',
    description: 'Accessible label for form controls',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/label/Label.vue', 'components/ui/label/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'form',
    description: 'Form wrapper with validation integration using vee-validate',
    category: 'forms',
    version: '0.1.0',
    files: ['components/ui/form/Form.vue', 'components/ui/form/FormField.vue', 'components/ui/form/FormItem.vue', 'components/ui/form/FormLabel.vue', 'components/ui/form/FormControl.vue', 'components/ui/form/FormDescription.vue', 'components/ui/form/FormMessage.vue', 'components/ui/form/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0', 'vee-validate': '^4.13.0' },
    peerDependencies: ['label', 'button'],
  },

  // --- Feedback ---
  {
    name: 'alert',
    description: 'Contextual feedback messages for user actions',
    category: 'feedback',
    version: '0.1.0',
    files: ['components/ui/alert/Alert.vue', 'components/ui/alert/AlertTitle.vue', 'components/ui/alert/AlertDescription.vue', 'components/ui/alert/index.ts'],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'badge',
    description: 'Small status indicators and labels',
    category: 'feedback',
    version: '0.1.0',
    files: ['components/ui/badge/Badge.vue', 'components/ui/badge/index.ts'],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'progress',
    description: 'Progress bar for indicating completion status',
    category: 'feedback',
    version: '0.1.0',
    files: ['components/ui/progress/Progress.vue', 'components/ui/progress/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'stepper',
    description: 'Multi-step progress indicator for guided workflows',
    category: 'feedback',
    version: '0.1.0',
    files: ['components/ui/stepper/Stepper.vue', 'components/ui/stepper/StepperItem.vue', 'components/ui/stepper/StepperTrigger.vue', 'components/ui/stepper/StepperContent.vue', 'components/ui/stepper/StepperSeparator.vue', 'components/ui/stepper/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['button'],
  },
  {
    name: 'wizard',
    description: 'Full-featured multi-step wizard with navigation and validation',
    category: 'feedback',
    version: '0.1.0',
    files: ['components/ui/wizard/Wizard.vue', 'components/ui/wizard/WizardStep.vue', 'components/ui/wizard/WizardNavigation.vue', 'components/ui/wizard/index.ts'],
    dependencies: {},
    peerDependencies: ['button', 'stepper'],
  },

  // --- Navigation ---
  {
    name: 'breadcrumb',
    description: 'Navigation breadcrumb trail showing page hierarchy',
    category: 'navigation',
    version: '0.1.0',
    files: ['components/ui/breadcrumb/Breadcrumb.vue', 'components/ui/breadcrumb/BreadcrumbList.vue', 'components/ui/breadcrumb/BreadcrumbItem.vue', 'components/ui/breadcrumb/BreadcrumbLink.vue', 'components/ui/breadcrumb/BreadcrumbSeparator.vue', 'components/ui/breadcrumb/BreadcrumbPage.vue', 'components/ui/breadcrumb/index.ts'],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'navigation-menu',
    description: 'Accessible navigation menu with nested submenus',
    category: 'navigation',
    version: '0.1.0',
    files: ['components/ui/navigation-menu/NavigationMenu.vue', 'components/ui/navigation-menu/NavigationMenuList.vue', 'components/ui/navigation-menu/NavigationMenuItem.vue', 'components/ui/navigation-menu/NavigationMenuTrigger.vue', 'components/ui/navigation-menu/NavigationMenuContent.vue', 'components/ui/navigation-menu/NavigationMenuLink.vue', 'components/ui/navigation-menu/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'menubar',
    description: 'Horizontal menu bar with dropdown menus',
    category: 'navigation',
    version: '0.1.0',
    files: ['components/ui/menubar/Menubar.vue', 'components/ui/menubar/MenubarMenu.vue', 'components/ui/menubar/MenubarTrigger.vue', 'components/ui/menubar/MenubarContent.vue', 'components/ui/menubar/MenubarItem.vue', 'components/ui/menubar/MenubarSeparator.vue', 'components/ui/menubar/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'pagination',
    description: 'Page navigation controls for paginated content',
    category: 'navigation',
    version: '0.1.0',
    files: ['components/ui/pagination/Pagination.vue', 'components/ui/pagination/PaginationContent.vue', 'components/ui/pagination/PaginationItem.vue', 'components/ui/pagination/PaginationLink.vue', 'components/ui/pagination/PaginationPrev.vue', 'components/ui/pagination/PaginationNext.vue', 'components/ui/pagination/PaginationEllipsis.vue', 'components/ui/pagination/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['button'],
  },
  {
    name: 'command',
    description: 'Command palette with search and keyboard navigation',
    category: 'navigation',
    version: '0.1.0',
    files: ['components/ui/command/Command.vue', 'components/ui/command/CommandInput.vue', 'components/ui/command/CommandList.vue', 'components/ui/command/CommandEmpty.vue', 'components/ui/command/CommandGroup.vue', 'components/ui/command/CommandItem.vue', 'components/ui/command/CommandSeparator.vue', 'components/ui/command/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['dialog'],
  },

  // --- Data Display ---
  {
    name: 'avatar',
    description: 'User avatar with image fallback and status indicator',
    category: 'data-display',
    version: '0.1.0',
    files: ['components/ui/avatar/Avatar.vue', 'components/ui/avatar/AvatarImage.vue', 'components/ui/avatar/AvatarFallback.vue', 'components/ui/avatar/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'data-table',
    description: 'Feature-rich data table with sorting, filtering, and pagination',
    category: 'data-display',
    version: '0.1.0',
    files: ['components/ui/data-table/DataTable.vue', 'components/ui/data-table/DataTableHeader.vue', 'components/ui/data-table/DataTableBody.vue', 'components/ui/data-table/DataTableRow.vue', 'components/ui/data-table/DataTableCell.vue', 'components/ui/data-table/DataTablePagination.vue', 'components/ui/data-table/index.ts'],
    dependencies: { '@tanstack/vue-table': '^8.20.0' },
    peerDependencies: ['button', 'input', 'select', 'pagination'],
  },

  // --- Overlay ---
  {
    name: 'dialog',
    description: 'Modal dialog with accessible focus management',
    category: 'overlay',
    version: '0.1.0',
    files: ['components/ui/dialog/Dialog.vue', 'components/ui/dialog/DialogTrigger.vue', 'components/ui/dialog/DialogContent.vue', 'components/ui/dialog/DialogHeader.vue', 'components/ui/dialog/DialogTitle.vue', 'components/ui/dialog/DialogDescription.vue', 'components/ui/dialog/DialogFooter.vue', 'components/ui/dialog/DialogClose.vue', 'components/ui/dialog/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'dropdown-menu',
    description: 'Dropdown menu triggered by a button or anchor',
    category: 'overlay',
    version: '0.1.0',
    files: ['components/ui/dropdown-menu/DropdownMenu.vue', 'components/ui/dropdown-menu/DropdownMenuTrigger.vue', 'components/ui/dropdown-menu/DropdownMenuContent.vue', 'components/ui/dropdown-menu/DropdownMenuItem.vue', 'components/ui/dropdown-menu/DropdownMenuSeparator.vue', 'components/ui/dropdown-menu/DropdownMenuLabel.vue', 'components/ui/dropdown-menu/DropdownMenuGroup.vue', 'components/ui/dropdown-menu/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'context-menu',
    description: 'Right-click context menu with nested submenus',
    category: 'overlay',
    version: '0.1.0',
    files: ['components/ui/context-menu/ContextMenu.vue', 'components/ui/context-menu/ContextMenuTrigger.vue', 'components/ui/context-menu/ContextMenuContent.vue', 'components/ui/context-menu/ContextMenuItem.vue', 'components/ui/context-menu/ContextMenuSeparator.vue', 'components/ui/context-menu/ContextMenuLabel.vue', 'components/ui/context-menu/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'popover',
    description: 'Floating content panel anchored to a trigger element',
    category: 'overlay',
    version: '0.1.0',
    files: ['components/ui/popover/Popover.vue', 'components/ui/popover/PopoverTrigger.vue', 'components/ui/popover/PopoverContent.vue', 'components/ui/popover/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'tooltip',
    description: 'Informational popup on hover or focus',
    category: 'overlay',
    version: '0.1.0',
    files: ['components/ui/tooltip/Tooltip.vue', 'components/ui/tooltip/TooltipTrigger.vue', 'components/ui/tooltip/TooltipContent.vue', 'components/ui/tooltip/TooltipProvider.vue', 'components/ui/tooltip/index.ts'],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
]

/**
 * Return the full list of available components.
 */
export function getRegistry(): ComponentRegistryEntry[] {
  return [...REGISTRY]
}

/**
 * Get a specific component by name.
 */
export function getComponent(name: string): ComponentRegistryEntry | null {
  return REGISTRY.find(c => c.name === name) ?? null
}

/**
 * Get all components in a given category.
 */
export function getComponentsByCategory(category: string): ComponentRegistryEntry[] {
  return REGISTRY.filter(c => c.category === category)
}

/**
 * Search components by name using case-insensitive substring matching.
 */
export function searchComponents(query: string): ComponentRegistryEntry[] {
  const lower = query.toLowerCase()
  return REGISTRY.filter(c =>
    c.name.toLowerCase().includes(lower)
    || c.description.toLowerCase().includes(lower),
  )
}

/**
 * Resolve all dependencies for a component (recursive).
 * Returns a flat array of all peer dependency component names (excluding the component itself).
 */
export function resolveDependencies(name: string): string[] {
  const resolved = new Set<string>()
  const visited = new Set<string>()

  function resolve(componentName: string): void {
    if (visited.has(componentName)) return
    visited.add(componentName)

    const entry = getComponent(componentName)
    if (!entry) return

    for (const dep of entry.peerDependencies) {
      resolved.add(dep)
      resolve(dep)
    }
  }

  resolve(name)
  // Remove the component itself if it somehow ended up in the set
  resolved.delete(name)
  return Array.from(resolved)
}
