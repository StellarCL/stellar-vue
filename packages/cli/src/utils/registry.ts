import type { ComponentRegistryEntry } from '../types'
import { COMPONENT_TEMPLATES } from '../templates/components'

/**
 * Embedded component registry.
 * File lists are derived at runtime from COMPONENT_TEMPLATES.
 */
const REGISTRY: ComponentRegistryEntry[] = [
  // --- Layout ---
  {
    name: 'card',
    description: 'Versatile container with header, content, and footer sections',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'separator',
    description: 'Visual divider between content sections',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'skeleton',
    description: 'Placeholder loading animation for content',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'accordion',
    description: 'Collapsible content panels for showing and hiding sections',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'tabs',
    description: 'Tabbed interface for switching between content panels',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'grid',
    description: 'Responsive grid layout system with flexible columns',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'stack',
    description: 'Vertical and horizontal stack layout with spacing control',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'shell',
    description: 'Application shell layout with header, sidebar, and main content',
    category: 'layout',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },

  // --- Forms ---
  {
    name: 'button',
    description: 'Interactive button with multiple variants, sizes, and states',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'input',
    description: 'Text input field with validation and icon support',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: ['label'],
  },
  {
    name: 'textarea',
    description: 'Multi-line text input with auto-resize support',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: ['label'],
  },
  {
    name: 'checkbox',
    description: 'Toggle control for boolean values with indeterminate state',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'radio-group',
    description: 'Group of radio buttons for single selection from options',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'select',
    description: 'Dropdown selection control with search and multi-select',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'switch',
    description: 'Toggle switch for on/off states',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['label'],
  },
  {
    name: 'slider',
    description: 'Range input for selecting a numeric value within a range',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'label',
    description: 'Accessible label for form controls',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'form',
    description: 'Form wrapper with validation integration using vee-validate',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0', 'vee-validate': '^4.13.0' },
    peerDependencies: ['label', 'button'],
  },
  {
    name: 'combobox',
    description: 'Searchable dropdown with autocomplete and custom filtering',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'multi-select',
    description: 'Multi-value selection input with tags and search',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'color-picker',
    description: 'Color selection control with area, hue, and alpha sliders',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'file-upload',
    description: 'File upload with drag-and-drop, previews, and progress',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'filter-builder',
    description: 'Dynamic filter construction with rules and groups',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: ['button', 'select', 'input'],
  },
  {
    name: 'rating',
    description: 'Star rating input for scoring and feedback',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'rich-text-editor',
    description: 'Rich text editor with toolbar and formatting controls',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: {
      '@tiptap/vue-3': '^2.0.0',
      '@tiptap/starter-kit': '^2.0.0',
      '@tiptap/extension-placeholder': '^2.0.0',
      '@tiptap/extension-underline': '^2.0.0',
      '@tiptap/extension-link': '^2.0.0',
      '@tiptap/extension-image': '^2.0.0',
      '@tiptap/extension-character-count': '^2.0.0',
    },
    peerDependencies: [],
  },
  {
    name: 'date-picker',
    description: 'Date selection with calendar dropdown and presets',
    category: 'forms',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0', '@internationalized/date': '^3.0.0' },
    peerDependencies: ['calendar', 'popover', 'button'],
  },

  // --- Feedback ---
  {
    name: 'alert',
    description: 'Contextual feedback messages for user actions',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'badge',
    description: 'Small status indicators and labels',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'progress',
    description: 'Progress bar for indicating completion status',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'stepper',
    description: 'Multi-step progress indicator for guided workflows',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['button'],
  },
  {
    name: 'wizard',
    description: 'Full-featured multi-step wizard with navigation and validation',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: ['button', 'stepper'],
  },
  {
    name: 'loading',
    description: 'Loading indicators with spinner, dots, bar, and overlay variants',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'toast',
    description: 'Toast notifications with variants and auto-dismiss',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'timeline',
    description: 'Chronological timeline display for events and history',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'empty-state',
    description: 'Placeholder display for empty content areas',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'notification-center',
    description: 'Notification management panel with grouping and actions',
    category: 'feedback',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },

  // --- Navigation ---
  {
    name: 'breadcrumb',
    description: 'Navigation breadcrumb trail showing page hierarchy',
    category: 'navigation',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'navigation-menu',
    description: 'Accessible navigation menu with nested submenus',
    category: 'navigation',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'menubar',
    description: 'Horizontal menu bar with dropdown menus',
    category: 'navigation',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'pagination',
    description: 'Page navigation controls for paginated content',
    category: 'navigation',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['button'],
  },
  {
    name: 'command',
    description: 'Command palette with search and keyboard navigation',
    category: 'navigation',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: ['dialog'],
  },
  {
    name: 'sidebar',
    description: 'Collapsible sidebar navigation with menu items and groups',
    category: 'navigation',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },

  // --- Data Display ---
  {
    name: 'avatar',
    description: 'User avatar with image fallback and status indicator',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'data-table',
    description: 'Feature-rich data table with sorting, filtering, and pagination',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: { '@tanstack/vue-table': '^8.20.0' },
    peerDependencies: ['button', 'input', 'select', 'pagination'],
  },
  {
    name: 'calendar',
    description: 'Calendar display for date browsing and selection',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0', '@internationalized/date': '^3.0.0' },
    peerDependencies: [],
  },
  {
    name: 'chart',
    description: 'Data visualization charts with container, tooltip, and legend',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'carousel',
    description: 'Content carousel with slide navigation and autoplay',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'code-block',
    description: 'Code display with syntax highlighting and copy support',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },
  {
    name: 'tree-view',
    description: 'Hierarchical tree display with expand/collapse',
    category: 'data-display',
    version: '0.1.0',
    files: [],
    dependencies: {},
    peerDependencies: [],
  },

  // --- Overlay ---
  {
    name: 'dialog',
    description: 'Modal dialog with accessible focus management',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'dropdown-menu',
    description: 'Dropdown menu triggered by a button or anchor',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'context-menu',
    description: 'Right-click context menu with nested submenus',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'popover',
    description: 'Floating content panel anchored to a trigger element',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'tooltip',
    description: 'Informational popup on hover or focus',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'sheet',
    description: 'Slide-out panel from any edge of the screen',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
  {
    name: 'drawer',
    description: 'Bottom or side drawer overlay panel',
    category: 'overlay',
    version: '0.1.0',
    files: [],
    dependencies: { 'radix-vue': '^1.9.0' },
    peerDependencies: [],
  },
]

/**
 * Augment a registry entry with files from COMPONENT_TEMPLATES.
 */
function withTemplateFiles(entry: ComponentRegistryEntry): ComponentRegistryEntry {
  const templates = COMPONENT_TEMPLATES[entry.name]
  if (templates) {
    return { ...entry, files: Object.keys(templates) }
  }
  return entry
}

/**
 * Return the full list of available components.
 */
export function getRegistry(): ComponentRegistryEntry[] {
  return REGISTRY.map(withTemplateFiles)
}

/**
 * Get a specific component by name.
 */
export function getComponent(name: string): ComponentRegistryEntry | null {
  const entry = REGISTRY.find(c => c.name === name) ?? null
  if (!entry)
    return null
  return withTemplateFiles(entry)
}

/**
 * Get all components in a given category.
 */
export function getComponentsByCategory(category: string): ComponentRegistryEntry[] {
  return REGISTRY.filter(c => c.category === category).map(withTemplateFiles)
}

/**
 * Search components by name using case-insensitive substring matching.
 */
export function searchComponents(query: string): ComponentRegistryEntry[] {
  const lower = query.toLowerCase()
  return REGISTRY.filter(
    c => c.name.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower),
  ).map(withTemplateFiles)
}

/**
 * Resolve all dependencies for a component (recursive).
 * Returns a flat array of all peer dependency component names (excluding the component itself).
 */
export function resolveDependencies(name: string): string[] {
  const resolved = new Set<string>()
  const visited = new Set<string>()

  function resolve(componentName: string): void {
    if (visited.has(componentName))
      return
    visited.add(componentName)

    const entry = getComponent(componentName)
    if (!entry)
      return

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
