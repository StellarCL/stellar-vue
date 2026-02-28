# Technical Specification: Stellar Vue UI

## Executive Summary

A modern, accessible, copy-paste component library for Vue 3 and Nuxt 4 that developers own and control. Built on headless UI primitives with full TypeScript support, composables-first architecture, and Tailwind CSS styling.

---

## 1. PROJECT FOUNDATIONS

### 1.1 Core Philosophy
- **Ownership over abstraction**: Developers copy components into their codebase and own them
- **Composables-first**: Leverage Vue's Composition API for maximum flexibility
- **Accessibility by default**: WCAG 2.1 AA compliance minimum
- **Unstyled primitives**: Built on headless components, styled with utility classes
- **Type-safe**: Full TypeScript support with generic types
- **Framework-agnostic core**: Works with Vue 3, optimized for Nuxt 3

### 1.2 Differentiation Strategy
- **Better than shadcn-vue**: First-class Vue support, not a port
- **Nuxt-native features**: Auto-imports, server components, built-in composables
- **Enhanced DX**: Better CLI, interactive component playground, live theme editor
- **Form-first approach**: Deep integration with VeeValidate and native form handling
- **Animation system**: Built-in animation primitives using Vue's transition system
- **Variants API**: More powerful variant system than class-variance-authority

---

## 2. TECHNICAL ARCHITECTURE

### 2.1 Technology Stack

#### Core Dependencies
- **Vue 3.6+**: Composition API, `<script setup>`, defineModel, generics, Vapor Mode (beta)
- **Radix Vue 1.9+**: Headless UI primitives (https://www.radix-vue.com/)
- **TypeScript 5.8+**: Strict mode, generic components, latest type improvements
- **Tailwind CSS v4.2+**: Next-generation CSS engine with native CSS variables, oxide compiler
- **Vite 6+**: Build tool with Environment API and native Rolldown support
- **Vitest 3+**: Unit testing framework (supports both Vite 5 and 6)
- **Playwright 1.50+**: E2E and accessibility testing

#### Optional/Peer Dependencies
- **Nuxt 4+**: For Nuxt-specific features (released July 2025)
- **VeeValidate 4**: Form validation integration
- **@vueuse/core**: Utility composables
- **Pinia 3+**: State management (Vue 2 support dropped)
- **tailwind-merge**: Intelligent class merging (note: v4 has better native handling)
- **clsx**: Conditional class construction

### 2.2 Package Structure

```
project-root/
├── packages/
│   ├── core/                    # Core component library
│   │   ├── src/
│   │   │   ├── components/      # All components
│   │   │   ├── composables/     # Shared composables
│   │   │   ├── utils/           # Utility functions
│   │   │   ├── types/           # TypeScript definitions
│   │   │   └── index.ts         # Main export
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── cli/                     # CLI tool for adding components
│   │   ├── src/
│   │   │   ├── commands/        # CLI commands
│   │   │   ├── utils/           # CLI utilities
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── nuxt/                    # Nuxt module
│   │   ├── src/
│   │   │   ├── module.ts        # Nuxt module definition
│   │   │   └── runtime/         # Runtime composables
│   │   └── package.json
│   │
│   ├── theme/                   # Theme configuration
│   │   ├── src/
│   │   │   ├── tokens/          # Design tokens
│   │   │   ├── presets/         # Tailwind presets
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── animations/              # Animation primitives
│       ├── src/
│       │   ├── transitions/     # Vue transitions
│       │   ├── composables/     # Animation composables
│       │   └── index.ts
│       └── package.json
│
├── apps/
│   ├── docs/                    # Documentation site (VitePress)
│   ├── playground/              # Interactive component playground
│   └── examples/                # Example projects
│
├── tooling/
│   ├── eslint-config/          # Shared ESLint config
│   ├── tsconfig/               # Shared TypeScript configs
│   └── prettier-config/        # Shared Prettier config
│
└── tests/
    ├── unit/                    # Unit tests
    ├── integration/             # Integration tests
    └── e2e/                     # End-to-end tests
```

### 2.3 Component Architecture

Each component follows this structure:

```typescript
// Example: Button component structure
components/
├── button/
│   ├── Button.vue               # Main component
│   ├── button.types.ts          # TypeScript types
│   ├── button.variants.ts       # Variant definitions
│   ├── button.test.ts           # Unit tests
│   ├── useButton.ts             # Composable (if needed)
│   └── index.ts                 # Exports
```

---

## 3. COMPONENT LIBRARY SPECIFICATIONS

### 3.1 Required Components (Priority Order)

#### Tier 1: Foundational (MVP)
1. **Button** - All variants, sizes, loading states
2. **Input** - Text, email, password, number, etc.
3. **Label** - Form labels with accessibility
4. **Card** - Container component with header/footer
5. **Dialog (Modal)** - Accessible modal dialogs
6. **Dropdown Menu** - Context menus and dropdowns
7. **Select** - Native and custom select components
8. **Checkbox** - Single and group checkboxes
9. **Radio Group** - Radio button groups
10. **Switch (Toggle)** - On/off switches
11. **Textarea** - Multi-line text input
12. **Alert** - Warning, error, success, info alerts
13. **Badge** - Status indicators and labels
14. **Separator** - Visual dividers
15. **Skeleton** - Loading placeholders

#### Tier 2: Advanced UI
16. **Accordion** - Collapsible content sections
17. **Tabs** - Tab navigation
18. **Popover** - Floating content containers
19. **Tooltip** - Contextual hints
20. **Avatar** - User profile images with fallbacks
21. **Progress** - Progress bars and indicators
22. **Slider** - Range input sliders
23. **Form** - Form wrapper with validation
24. **Data Table** - Advanced data tables with server-side pagination, sorting, filtering, row selection, column resizing, inline editing, export, virtual scrolling
25. **Pagination** - Page navigation
26. **Breadcrumb** - Navigation hierarchy
27. **Navigation Menu** - Complex navigation
28. **Command** - Command palette (Cmd+K)
29. **Context Menu** - Right-click menus
30. **Menubar** - Application menu bars
31. **Stepper** - Multi-step progress indicator
32. **Wizard** - Multi-step form wrapper with validation and navigation
33. **Rich Text Editor** - TiptapEditor with toolbar, markdown support
34. **File Upload** - Drag-drop file upload with preview, progress, validation

#### Tier 3: Specialized
35. **Date Picker** - Calendar date selection
36. **Time Picker** - Time selection
37. **Combobox** - Autocomplete/searchable select
38. **Multi-Select** - Multiple selection input
39. **Color Picker** - Color selection
40. **Toast/Notification** - Toast messages and notification center
41. **Drawer** - Slide-out panels
42. **Sheet** - Bottom sheets (mobile)
43. **Calendar** - Full calendar component
44. **Tree View** - Hierarchical data display
45. **Rating** - Star ratings
46. **Timeline** - Event timelines
47. **Carousel** - Image/content carousels
48. **Code Block** - Syntax-highlighted code
49. **Chart** - Line, bar, pie, area charts with theming
50. **Empty State** - Empty state placeholders with illustrations
51. **Loading** - Full-page loaders and smart skeletons
52. **Filter Builder** - Visual query builder for advanced search
53. **Notification Center** - Inbox-style notification management
54. **Layout Components** - Stack, Grid, Sidebar, Shell, Split panes

### 3.2 Component Requirements

Each component must have:

#### Functional Requirements
- **Accessibility**: Full keyboard navigation, ARIA attributes, screen reader support
- **Variants**: At least 3-5 visual variants (when applicable)
- **Sizes**: Minimum sm, md, lg sizes
- **States**: Hover, focus, active, disabled, loading
- **Dark mode**: Full dark mode support via Tailwind
- **Responsive**: Mobile-first responsive design
- **RTL support**: Right-to-left language support
- **Validation**: Error states and validation messages (form components)

#### Technical Requirements
- **TypeScript**: Full type definitions with generics where needed
- **Composables**: Extract logic into reusable composables
- **Props**: Sensible defaults, prop validation
- **Emits**: Properly typed event emissions
- **Slots**: Named slots for customization
- **v-model**: Two-way binding where appropriate
- **Teleport**: Portal/teleport support for overlays
- **SSR**: Server-side rendering compatible
- **Tree-shaking**: Individually importable components

#### Documentation Requirements
- **API documentation**: All props, events, slots, methods
- **Usage examples**: Basic and advanced examples
- **Accessibility notes**: ARIA patterns used
- **Composition examples**: How to combine with other components
- **Storybook/playground**: Interactive examples
- **Code snippets**: Copy-paste ready code

---

## 4. VARIANTS SYSTEM

### 4.1 Custom Variants Implementation

**Variant System:** class-variance-authority (CVA)

Using the battle-tested CVA library for component variants:

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva({
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',

  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-11 px-8 text-lg',
      icon: 'h-10 w-10',
    },
  },

  compoundVariants: [
    {
      variant: 'outline',
      size: 'sm',
      class: 'border-2',
    },
  ],

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
```

Features:
- **Type-safe**: Full TypeScript inference with CVA
- **Compound variants**: Complex variant combinations
- **Default variants**: Sensible defaults
- **TypeScript integration**: VariantProps type helper
- **Production-ready**: Battle-tested by shadcn/ui and others

**Note:** Using CVA for v0.1.0. A custom variant system may be developed in future versions if needed.

### 4.2 Theme System

The library includes a powerful, flexible theming system built on Tailwind v4's CSS variables:

```typescript
// Design token structure
export const tokens = {
  colors: {
    // Semantic color system
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',

    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))',
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',

    // ... full color system with success, warning, info states
  },
  spacing: {
    // Custom spacing scale (extends Tailwind defaults)
  },
  typography: {
    // Font families, sizes, weights, line heights
  },
  borderRadius: {
    // Border radius tokens
  },
  shadows: {
    // Shadow system for elevation
  },
  animation: {
    // Animation durations and easings
  },
}
```

**Theme Features:**

1. **Semantic Color Tokens**: Colors are purpose-driven (primary, destructive, muted) rather than literal (blue, red, gray)

2. **Automatic Dark Mode**: All colors have light and dark mode variants defined in CSS

3. **Runtime Theme Switching**: Change themes without rebuilding using CSS variables

4. **Multiple Theme Presets**: Ships with 6 star-themed variants (Stellar, Sirius, Polaris, Antares, Vega, Aldebaran)

5. **Custom Theme Creation**: CLI tool to generate custom themes

6. **Brand Color Extraction**: Utility to generate full color palette from a single brand color

7. **Accessibility Compliance**: Automatic contrast ratio checking and warnings

**Theme Customization:**

```typescript
// User can override in their project
// theme.config.ts
export default {
  extends: 'default',
  colors: {
    primary: {
      DEFAULT: '#3b82f6', // Custom blue
      foreground: '#ffffff',
    },
  },
  borderRadius: {
    DEFAULT: '0.5rem',
    lg: '0.75rem',
  },
}
```

---

## 5. CLI TOOL SPECIFICATION

### 5.1 CLI Commands

```bash
# Initialize project
npx stellar-ui init

# Add individual component
npx stellar-ui add button

# Add multiple components
npx stellar-ui add button input card

# Add all components
npx stellar-ui add --all

# Update component
npx stellar-ui update button

# Remove component
npx stellar-ui remove button

# List available components
npx stellar-ui list

# Show component details
npx stellar-ui info button

# Create custom theme
npx stellar-ui theme create

# Install dependencies
npx stellar-ui deps
```

### 5.2 CLI Features

#### Interactive Mode
- Component selection with fuzzy search
- Preview component before adding
- Choose variants to include
- Select styling approach (Tailwind/custom)
- Theme customization wizard

#### Configuration
```typescript
// stellar-ui.config.ts
export default {
  // Where to add components
  componentsDir: './components/ui',

  // Where to add composables
  composablesDir: './composables',

  // Where to add utils
  utilsDir: './lib',

  // CSS variables location
  cssVariables: './assets/css/variables.css',

  // Tailwind config path
  tailwindConfig: './tailwind.config.ts',

  // TypeScript config
  typescript: true,

  // Aliases
  aliases: {
    '@': './src',
    '~': './',
  },

  // Framework
  framework: 'nuxt', // or 'vue'

  // Additional features
  features: {
    animations: true,
    forms: true,
    icons: 'lucide', // or 'heroicons', 'phosphor'
  },
}
```

#### Smart Dependency Management
- Auto-detect and install required dependencies
- Warn about peer dependency conflicts
- Suggest complementary packages
- Update package.json automatically

#### Git Integration
- Create commit for each component addition
- Show diffs before applying changes
- Rollback capability

---

## 6. NUXT MODULE SPECIFICATION

### 6.1 Module Features

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['stellar-ui/nuxt'],

  <libraryName>: {
    // Auto-import components
    autoImport: true,

    // Prefix for auto-imported components
    prefix: 'UI',

    // Default theme
    theme: 'default',

    // Dark mode strategy
    darkMode: 'class', // or 'media'

    // Include only specific components
    components: ['Button', 'Input', 'Card'],

    // Global component configuration
    global: {
      button: {
        variant: 'default',
        size: 'md',
      },
    },
  },
})
```

### 6.2 Nuxt-Specific Features

- **Auto-imports**: Automatic component and composable imports
- **Server components**: Server-rendered component support
- **Layouts integration**: Pre-built layout templates
- **DevTools**: Custom Nuxt DevTools tab
- **Module hooks**: Integration with Nuxt lifecycle
- **Nitro integration**: Server-side utilities
- **Route middleware**: Form validation middleware

---

## 7. COMPOSABLES SYSTEM

### 7.1 Core Composables

```typescript
// Form composables
useForm() // Form state management
useFieldArray() // Dynamic form arrays
useFormContext() // Access parent form context

// UI state composables
useDisclosure() // Open/close state
useToggle() // Boolean toggle
useSteps() // Multi-step flows
usePagination() // Pagination logic
useInfiniteScroll() // Infinite scrolling

// Accessibility composables
useFocusTrap() // Trap focus within element
useAriaDescribe() // ARIA descriptions
useKeyboardNav() // Keyboard navigation

// Animation composables
useTransition() // Vue transitions
usePresence() // Enter/exit animations
useMotion() // Motion animations

// Utility composables
useDebounce() // Debounced values
useThrottle() // Throttled functions
useClipboard() // Clipboard operations
useMediaQuery() // Responsive breakpoints
useLocalStorage() // Persistent state

// Validation composables
useValidation() // Field validation
useAsyncValidation() // Async validators
useFormValidation() // Form-level validation
```

### 7.2 Composable Architecture

```typescript
// Example: useDisclosure composable
export function useDisclosure(options?: {
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}) {
  const isOpen = ref(options?.defaultOpen ?? false)

  const open = () => {
    isOpen.value = true
    options?.onOpen?.()
  }

  const close = () => {
    isOpen.value = false
    options?.onClose?.()
  }

  const toggle = () => {
    isOpen.value ? close() : open()
  }

  return {
    isOpen: readonly(isOpen),
    open,
    close,
    toggle,
  }
}
```

---

## 8. FORM SYSTEM SPECIFICATION

### 8.1 Form Architecture

Deep integration with VeeValidate:

```vue
<script setup lang="ts">
import { useForm } from 'stellar-ui/form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  // Submit logic
})
</script>

<template>
  <Form @submit="onSubmit">
    <FormField name="email">
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" />
      </FormControl>
      <FormMessage />
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
```

### 8.2 Validation System

Support multiple validation libraries:
- **Zod**: TypeScript-first schemas
- **Yup**: Object schema validation
- **Valibot**: Lightweight alternative
- **Custom validators**: Function-based validation

### 8.3 Form Components

- `Form`: Form wrapper with context
- `FormField`: Field wrapper with validation
- `FormLabel`: Accessible labels
- `FormControl`: Input wrapper
- `FormDescription`: Help text
- `FormMessage`: Error messages
- `FormItem`: Field group container

---

## 9. ANIMATION SYSTEM

### 9.1 Animation Primitives

```typescript
// Built-in transitions
export const transitions = {
  fade: {
    enterActiveClass: 'transition-opacity duration-200',
    leaveActiveClass: 'transition-opacity duration-150',
    enterFromClass: 'opacity-0',
    leaveToClass: 'opacity-0',
  },

  slideDown: {
    enterActiveClass: 'transition-all duration-200',
    leaveActiveClass: 'transition-all duration-150',
    enterFromClass: 'opacity-0 -translate-y-2',
    leaveToClass: 'opacity-0 -translate-y-2',
  },

  scale: {
    enterActiveClass: 'transition-all duration-200',
    leaveActiveClass: 'transition-all duration-150',
    enterFromClass: 'opacity-0 scale-95',
    leaveToClass: 'opacity-0 scale-95',
  },

  // More transitions...
}
```

### 9.2 Animation Composables

```typescript
// usePresence: Manage enter/exit animations
const { isPresent, safeToRemove } = usePresence(isOpen)

// useMotion: Animation orchestration
const { variant, animate } = useMotion()

// useAnimationFrame: RAF-based animations
const { start, stop } = useAnimationFrame(callback)
```

---

## 10. STYLING SYSTEM

### 10.1 Tailwind v4 Configuration

Tailwind v4 uses CSS-based configuration instead of JavaScript:

```css
/* app.css or main.css */
@import "tailwindcss";

@theme {
  /* Color system using CSS variables */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(9% 0.03 285.82);
  --color-card: oklch(100% 0 0);
  --color-card-foreground: oklch(9% 0.03 285.82);
  --color-popover: oklch(100% 0 0);
  --color-popover-foreground: oklch(9% 0.03 285.82);

  --color-primary: oklch(26.47% 0.043 285.82);
  --color-primary-foreground: oklch(98% 0 0);

  --color-secondary: oklch(96.1% 0 0);
  --color-secondary-foreground: oklch(26.47% 0.043 285.82);

  --color-muted: oklch(96.1% 0 0);
  --color-muted-foreground: oklch(54.12% 0.015 285.82);

  --color-accent: oklch(96.1% 0 0);
  --color-accent-foreground: oklch(26.47% 0.043 285.82);

  --color-destructive: oklch(61.42% 0.204 27.32);
  --color-destructive-foreground: oklch(98% 0 0);

  --color-border: oklch(91.15% 0.006 286.07);
  --color-input: oklch(91.15% 0.006 286.07);
  --color-ring: oklch(9% 0.03 285.82);

  /* Border radius tokens */
  --radius-lg: 0.5rem;
  --radius-md: calc(var(--radius-lg) - 2px);
  --radius-sm: calc(var(--radius-lg) - 4px);

  /* Container configuration */
  --container-center: true;
  --container-padding: 2rem;
  --breakpoint-2xl: 1400px;

  /* Custom animations */
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
}

/* Dark mode colors */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(9% 0.03 285.82);
    --color-foreground: oklch(98% 0 0);
    --color-card: oklch(9% 0.03 285.82);
    --color-card-foreground: oklch(98% 0 0);
    --color-popover: oklch(9% 0.03 285.82);
    --color-popover-foreground: oklch(98% 0 0);

    --color-primary: oklch(98% 0 0);
    --color-primary-foreground: oklch(26.47% 0.043 285.82);

    --color-secondary: oklch(20.37% 0.027 285.88);
    --color-secondary-foreground: oklch(98% 0 0);

    --color-muted: oklch(20.37% 0.027 285.88);
    --color-muted-foreground: oklch(70.89% 0.013 286.75);

    --color-accent: oklch(20.37% 0.027 285.88);
    --color-accent-foreground: oklch(98% 0 0);

    --color-destructive: oklch(42.09% 0.177 27.32);
    --color-destructive-foreground: oklch(98% 0 0);

    --color-border: oklch(20.37% 0.027 285.88);
    --color-input: oklch(20.37% 0.027 285.88);
    --color-ring: oklch(83.33% 0.017 286.71);
  }
}

/* Or use class-based dark mode */
.dark {
  @theme {
    --color-background: oklch(9% 0.03 285.82);
    --color-foreground: oklch(98% 0 0);
    /* ... rest of dark mode colors ... */
  }
}

/* Custom keyframes */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

**Key changes in Tailwind v4:**
- **CSS-first configuration**: No more `tailwind.config.js`, everything in CSS
- **Native CSS variables**: Better browser performance and runtime theming
- **Oxide compiler**: 10x faster builds
- **Simplified @theme syntax**: Cleaner theme definitions
- **Better color system**: OKLCH color space support for perceptually uniform colors
- **Smaller output**: Improved CSS generation
- **Container queries**: Built-in support without plugins

**Optional tailwind.config.ts** (for advanced JS-based config):

```typescript
// tailwind.config.ts (only if needed for plugins or complex logic)
import type { Config } from 'tailwindcss'

export default {
  // Content handled by @import in CSS
  plugins: [
    // Custom plugins only
  ],
} satisfies Config
```

### 10.2 Migration from v3 to v4

If migrating from Tailwind v3, key changes:

**Before (v3):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}
```

**After (v4):**
```css
@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(9% 0.03 285.82);
}
```

**Benefits of v4:**
- No more `hsl(var(--color))` wrappers needed
- Direct color references: `bg-background` just works
- Better color accuracy with OKLCH
- Runtime theming without performance penalty
- Automatic color space interpolation
- Native CSS nesting support

---

## 11. ACCESSIBILITY STANDARDS

### 11.1 WCAG 2.1 Compliance

All components must meet WCAG 2.1 Level AA:

- **Perceivable**: Text alternatives, adaptable content, distinguishable
- **Operable**: Keyboard accessible, enough time, seizure prevention, navigable
- **Understandable**: Readable, predictable, input assistance
- **Robust**: Compatible with assistive technologies

### 11.2 ARIA Patterns

Implement WAI-ARIA authoring practices:

- **Button**: `role="button"`, keyboard support
- **Dialog**: `role="dialog"`, `aria-modal`, `aria-labelledby`
- **Tabs**: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- **Menu**: `role="menu"`, `role="menuitem"`
- **Combobox**: `role="combobox"`, `aria-expanded`, `aria-autocomplete`
- **Listbox**: `role="listbox"`, `role="option"`
- **Accordion**: `role="region"`, `aria-expanded`
- **Alert**: `role="alert"`, `aria-live`

### 11.3 Keyboard Navigation

- **Tab**: Move focus between interactive elements
- **Shift+Tab**: Move focus backwards
- **Enter/Space**: Activate buttons and checkboxes
- **Arrow keys**: Navigate within composite widgets
- **Escape**: Close dialogs and menus
- **Home/End**: Jump to first/last item
- **Page Up/Down**: Navigate long lists

### 11.4 Screen Reader Support

- Meaningful labels and descriptions
- Status updates announced
- Form validation errors announced
- Dynamic content changes announced
- Skip navigation links
- Landmark regions

---

## 12. TESTING STRATEGY

### 12.1 Unit Tests (Vitest)

```typescript
import { mount } from '@vue/test-utils'
// Example: Button component test
import { describe, expect, it } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      props: { variant: 'default' },
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'destructive' },
    })
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('handles disabled state', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
```

### 12.2 Accessibility Tests (Playwright)

```typescript
// Example: Accessibility test
import { expect, test } from '@playwright/test'
import { checkA11y, injectAxe } from 'axe-playwright'

test('Button is accessible', async ({ page }) => {
  await page.goto('/components/button')
  await injectAxe(page)
  await checkA11y(page)
})

test('Dialog keyboard navigation', async ({ page }) => {
  await page.goto('/components/dialog')

  // Open dialog
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Verify focus trap
  await page.keyboard.press('Tab')
  const focused = await page.evaluate(() => document.activeElement?.tagName)
  expect(focused).toBe('BUTTON')

  // Close with Escape
  await page.keyboard.press('Escape')
  const dialogVisible = await page.isVisible('[role="dialog"]')
  expect(dialogVisible).toBe(false)
})
```

### 12.3 Visual Regression Tests

- Capture component screenshots in different states
- Compare against baseline images
- Test across browsers (Chrome, Firefox, Safari)
- Test across viewports (mobile, tablet, desktop)
- Test dark/light modes

### 12.4 E2E Tests

- Complete user flows
- Form submission
- Multi-step processes
- Real API integration
- Error handling

---

## 13. DOCUMENTATION SYSTEM

### 13.1 Documentation Site Structure

```
docs/
├── guide/
│   ├── introduction.md
│   ├── installation.md
│   ├── theming.md
│   ├── dark-mode.md
│   ├── cli.md
│   └── accessibility.md
│
├── components/
│   ├── button.md
│   ├── input.md
│   ├── card.md
│   └── ...
│
├── composables/
│   ├── use-disclosure.md
│   ├── use-form.md
│   └── ...
│
├── examples/
│   ├── forms/
│   ├── layouts/
│   └── patterns/
│
└── api/
    ├── types.md
    ├── utilities.md
    └── configuration.md
```

### 13.2 Component Documentation Template

Each component page should include:

1. **Overview**: What the component does
2. **Installation**: CLI command to add it
3. **Usage**: Basic example
4. **API Reference**: Props, events, slots
5. **Examples**: Common use cases
6. **Variants**: Visual examples of all variants
7. **Accessibility**: ARIA patterns and keyboard support
8. **Composition**: Using with other components
9. **Customization**: How to modify styles
10. **Troubleshooting**: Common issues

### 13.3 Interactive Examples

- Live code editor (Monaco or CodeMirror)
- Hot reload preview
- Copy code button
- Open in StackBlitz/CodeSandbox
- Variant switcher
- Dark mode toggle
- Responsive preview

---

## 14. ICON SYSTEM

### 14.1 Icon Integration

**Default Icon Library:** Lucide Vue Next
**Package:** `lucide-vue-next`

**Why Lucide:**
- Most comprehensive (1400+ icons)
- Perfect Tailwind integration
- Tree-shakeable
- Active maintenance
- Vue 3 native support

Support multiple icon libraries:

```typescript
// Using Lucide (default and recommended)
<script setup>
import { Check, X, ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <Check class="h-4 w-4" />
  <X class="h-5 w-5" />
  <ChevronDown class="h-6 w-6" />
</template>
```

### 14.2 Supported Icon Libraries

**Primary (Recommended):**
- **Lucide Vue Next**: Default and recommended, 1400+ icons

**Also Supported (User Import):**
- **Heroicons**: Tailwind's icon set (user can install)
- **Phosphor**: Flexible icon family (user can install)
- **Tabler Icons**: Clean and minimal (user can install)
- **Custom SVGs**: User-provided icons

**Installation:**
```bash
# Lucide (recommended, used in all examples)
pnpm add lucide-vue-next

# Optional alternatives (if user prefers)
pnpm add @heroicons/vue
pnpm add @phosphor-icons/vue
```

---

## 15. PERFORMANCE OPTIMIZATION

### 15.1 Bundle Size

- Individual component imports (tree-shaking)
- No unnecessary dependencies
- CSS purging via Tailwind
- Code splitting for large components
- Lazy loading for heavy components

### 15.2 Runtime Performance

- Minimal re-renders
- Efficient reactive state
- Virtual scrolling for lists
- Debounced input handlers
- Memoized computed properties
- Lazy component registration

### 15.3 SSR Optimization

- No client-only code in setup
- Proper hydration
- Teleport SSR support
- Critical CSS inlining
- Lazy hydration for below-fold content

---

## 16. VERSIONING & RELEASES

### 16.1 Semantic Versioning

- **Major**: Breaking changes
- **Minor**: New features (backwards compatible)
- **Patch**: Bug fixes

### 16.2 Release Process

1. Update CHANGELOG.md
2. Run full test suite
3. Build packages
4. Update documentation
5. Publish to npm
6. Create GitHub release
7. Announce on social media

### 16.3 Migration Guides

- Document all breaking changes
- Provide codemods for major versions
- Deprecation warnings before removal
- Clear upgrade paths

---

## 17. COMMUNITY & ECOSYSTEM

### 17.1 Community Features

- GitHub Discussions for questions
- Discord server for real-time chat
- Twitter/X for announcements
- Monthly community calls
- Showcase gallery of projects
- Contributor recognition

### 17.2 Contribution Guidelines

- Code of conduct
- Contribution guide
- Component proposal process
- PR template
- Issue templates
- Development setup guide

### 17.3 Ecosystem Packages

Potential expansion packages:

- **Templates**: Starter templates for common use cases
- **Blocks**: Pre-built section components (hero, pricing, etc.)
- **Charts**: Data visualization components
- **Editor**: Rich text editor components
- **Dashboard**: Admin dashboard components
- **Marketing**: Landing page components

---

## 18. MONETIZATION STRATEGY (Optional)

### 18.1 Open Source Model

- Core library: MIT license (free)
- Premium components: Paid license
- Templates: One-time purchase
- Support contracts: Enterprise

### 18.2 Premium Features

- Advanced components (data grid, chart library)
- Figma design system
- Tailwind UI style blocks
- Private Discord channel
- Priority support
- Early access to new features

---

## 19. INITIAL ROADMAP

### Phase 1: Foundation (Months 1-2)
- Set up monorepo
- Build core infrastructure
- Implement variants system
- Create CLI tool
- Build 15 Tier 1 components
- Set up documentation site

### Phase 2: Expansion (Months 3-4)
- Add 15 Tier 2 components
- Nuxt module
- Form system integration
- Animation system
- Accessibility testing
- Community launch

### Phase 3: Advanced Features (Months 5-6)
- Add 20 Tier 3 components
- Theme builder
- Templates/blocks
- Advanced documentation
- Performance optimization
- v1.0 release

### Phase 4: Ecosystem (Months 7-12)
- Premium components
- Figma design system
- Video tutorials
- Enterprise features
- Community growth
- Additional framework support

---

## 20. TECHNICAL DECISIONS

### 20.1 Why Radix Vue?

- Battle-tested accessibility patterns
- Unstyled primitives (full styling control)
- Active maintenance
- TypeScript support
- Comprehensive component coverage

### 20.2 Why Not Build Headless UI From Scratch?

- Accessibility is complex and time-consuming
- Radix Vue is production-ready
- Focus on styling and DX instead
- Faster time to market

### 20.3 Why Tailwind CSS v4?

- **10x faster builds**: New Oxide compiler written in Rust
- **CSS-native configuration**: No JavaScript config needed
- **Better color system**: OKLCH for perceptually uniform colors
- **Native CSS variables**: Simpler theming and runtime updates
- **Utility-first approach**: Perfect for copy-paste component model
- **Excellent dark mode**: Built-in with media or class strategies
- **Container queries**: Native support without plugins
- **Smaller bundles**: More efficient CSS generation
- **Easy customization**: Theme directly in CSS
- **Large community**: Extensive ecosystem and resources

### 20.4 Why TypeScript?

- Type safety prevents bugs
- Better DX with autocomplete
- Self-documenting code
- Required for generic components
- Industry standard

---

## 21. COMPETITIVE ANALYSIS

### 21.1 vs shadcn/ui (React)
- **Advantage**: First-class Vue support, not a port
- **Advantage**: Better composables over hooks
- **Advantage**: Nuxt-specific optimizations
- **Challenge**: Smaller React ecosystem

### 21.2 vs shadcn-vue
- **Advantage**: Original design, not a port
- **Advantage**: Better form integration
- **Advantage**: Enhanced variants system
- **Advantage**: Nuxt module
- **Advantage**: Better documentation

### 21.3 vs Vuetify/PrimeVue
- **Advantage**: Copy-paste ownership model
- **Advantage**: Smaller bundle size
- **Advantage**: More modern styling approach
- **Challenge**: Smaller component library initially

### 21.4 vs Headless UI
- **Advantage**: Styled by default
- **Advantage**: More components
- **Advantage**: Better DX with CLI
- **Challenge**: Less flexibility

---

## 22. SUCCESS METRICS

### 22.1 Technical Metrics
- Bundle size < 50KB for core components
- Lighthouse score > 95
- 100% accessibility test pass rate
- < 100ms component render time
- Zero runtime dependencies (except Radix Vue)

### 22.2 Community Metrics
- GitHub stars (target: 10k in year 1)
- npm downloads (target: 100k/month in year 1)
- Discord members (target: 5k in year 1)
- Showcase submissions (target: 100 in year 1)

### 22.3 Quality Metrics
- 90%+ test coverage
- < 5 open critical bugs
- < 7 day issue response time
- Monthly releases
- Comprehensive documentation

---

## 23. NAMING CONSIDERATIONS

The library name should:
- Be memorable and unique
- Relate to Vue/components/UI
- Be available on npm and GitHub
- Have available domain (.com, .dev)
- Not conflict with existing projects

Potential naming directions:
- **Nature-inspired**: Petal, Bloom, Willow, Cedar
- **Craft-focused**: Forge, Craft, Foundry, Workshop
- **Speed/Modern**: Velocity, Swift, Rapid, Pulse
- **Elemental**: Prism, Quantum, Nexus, Flux
- **Abstract**: Aria, Echo, Nova, Zen

---

## 24. FINAL CHECKLIST

### Pre-Launch
- [ ] Set up monorepo with pnpm workspaces
- [ ] Configure TypeScript strict mode
- [ ] Set up ESLint + Prettier
- [ ] Configure Vitest for testing
- [ ] Set up Playwright for E2E
- [ ] Create documentation site (VitePress)
- [ ] Build CLI tool
- [ ] Implement variants system
- [ ] Create Tailwind preset
- [ ] Build 15 core components
- [ ] Write comprehensive docs
- [ ] Set up CI/CD pipeline
- [ ] Create GitHub repo
- [ ] Publish to npm (alpha)

### Launch
- [ ] Create landing page
- [ ] Write announcement post
- [ ] Share on Twitter/X, Reddit, Hacker News
- [ ] Submit to Vue.js newsletter
- [ ] Create demo videos
- [ ] Set up Discord server
- [ ] Enable GitHub Discussions
- [ ] v1.0 release

### Post-Launch
- [ ] Monitor feedback and issues
- [ ] Build community
- [ ] Iterate on components
- [ ] Add requested features
- [ ] Create templates
- [ ] Write tutorials
- [ ] Grow ecosystem

---

## CONCLUSION

This specification provides a comprehensive blueprint for building a premium Vue component library that rivals shadcn/ui for React. The key differentiators are:

1. **First-class Vue support** - Not a port, built for Vue from the ground up
2. **Nuxt optimization** - Deep integration with Nuxt 3
3. **Enhanced DX** - Better CLI, theme builder, and documentation
4. **Form-first approach** - Superior form handling with VeeValidate
5. **Animation system** - Built-in animation primitives
6. **Ownership model** - Copy-paste components developers control

The technical foundation is solid (Radix Vue, TypeScript, Tailwind), the architecture is scalable (monorepo, composables, variants), and the roadmap is realistic.

Success will depend on:
- **Quality**: Exceptional components and documentation
- **Community**: Building an engaged, helpful community
- **Consistency**: Regular releases and updates
- **Innovation**: Unique features that set it apart

With dedicated effort and community support, this could become the go-to component library for Vue developers.

---

## APPENDIX A: TAILWIND V4 MIGRATION GUIDE

### Installation

```bash
npm install tailwindcss@next @tailwindcss/vite@next
```

### Vite Configuration

```typescript
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
```

### CSS Setup

```css
/* src/assets/main.css */
@import "tailwindcss";

/* Your custom theme */
@theme {
  /* All your design tokens here */
}
```

### Key Differences from v3

1. **No tailwind.config.js required** - Define theme in CSS
2. **Color format change** - Use OKLCH instead of HSL
3. **Direct variable usage** - No more `hsl(var(--color))` wrappers
4. **@theme directive** - New way to define tokens
5. **Container queries** - Built-in, no plugin needed
6. **Faster builds** - Oxide compiler is significantly faster

### Color Conversion Tool

Create a utility to convert HSL to OKLCH:

```typescript
// utils/color-converter.ts
import { hslToOklch } from 'culori'

export function convertThemeColors(hslColors: Record<string, string>) {
  const oklchColors: Record<string, string> = {}

  for (const [key, value] of Object.entries(hslColors)) {
    // Parse HSL format: "222.2 84% 4.9%"
    const [h, s, l] = value.split(' ').map(v => Number.parseFloat(v))
    const oklch = hslToOklch({ mode: 'hsl', h, s: s / 100, l: l / 100 })
    oklchColors[key] = `oklch(${oklch.l * 100}% ${oklch.c} ${oklch.h})`
  }

  return oklchColors
}
```

### Advantages for Component Library

1. **Runtime theming** - Change colors without rebuilding
2. **Better gradients** - OKLCH creates smoother color interpolation
3. **Simpler syntax** - Less boilerplate in component styles
4. **Performance** - Faster builds and smaller CSS output
5. **Future-proof** - Native CSS features, better browser support

---

## APPENDIX B: VERSION UPDATES (February 2026)

### Latest Ecosystem Versions

All dependencies have been updated to their latest stable versions as of February 2026:

**Core Framework:**
- **Vue 3.6** (beta): Includes Vapor Mode for better performance and smaller bundle sizes. Vapor Mode uses a compilation strategy similar to Solid.js/Svelte 5 for drastically improved performance. Uses alien-signals for optimized reactivity.
- **Nuxt 4.3**: Stable release (July 2025). Includes app/ directory structure, improved data fetching, better TypeScript support. Nuxt 3 EOL extended to July 31, 2026.

**Build Tools:**
- **Vite 6**: Released November 2024. Major improvements include Environment API for better SSR/SSG support, native Rolldown integration for faster builds, and improved HMR performance.
- **Vitest 3**: Released January 2025 to align with Vite 6. Supports both Vite 5 and 6. Includes 25% faster startup times, visual regression testing in browser mode, and improved programmatic API.

**UI & Styling:**
- **Radix Vue 1.9**: Latest stable version. Well-maintained with 90k+ weekly downloads. Currently in v1.2.0-beta for upcoming v2 features.
- **Tailwind CSS v4.2**: Complete rewrite with CSS-first configuration, OKLCH color system, 10x faster builds via oxide compiler, native container queries.

**TypeScript:**
- **TypeScript 5.8**: Latest version with improved type inference, better performance, and enhanced error messages.

**State Management:**
- **Pinia 3**: Dropped Vue 2 support, simplified for Vue 3-only projects. API remains stable and unchanged from Pinia 2.

### Key Breaking Changes to Be Aware Of

**Vite 5 → 6:**
- New Environment API (optional, but recommended for SSR apps)
- Node.js 18/20/22+ support (Node 21 dropped)
- Default build target changed to 'baseline-widely-available'
- Sass legacy API removed (modern API only)

**Vitest 2 → 3:**
- Requires Vite 5 or 6
- Fake timers config changed (no default list)
- Browser mode improvements

**Nuxt 3 → 4:**
- New app/ directory structure (optional but recommended)
- Separate TypeScript contexts for app/, server/, shared/
- Breaking changes in data fetching behavior
- Component auto-naming changes
- Use compatibilityVersion: 4 to test in Nuxt 3.12+

**Tailwind v3 → v4:**
- CSS-first configuration (@theme instead of tailwind.config.js)
- Color format changed from HSL to OKLCH
- No more hsl(var(--color)) wrappers needed
- Container queries built-in (no plugin)
- Faster compilation via oxide

**Pinia 2 → 3:**
- Vue 2 support dropped (Vue 3+ only)
- No API changes (smooth upgrade)

### Migration Strategy

1. **Phase 1**: Update to latest patch versions of current majors
2. **Phase 2**: Upgrade build tools (Vite 6, Vitest 3)
3. **Phase 3**: Update framework (Vue 3.6, Nuxt 4)
4. **Phase 4**: Migrate to Tailwind v4 CSS configuration
5. **Phase 5**: Test thoroughly with updated dependencies

### Recommended Package.json Versions

```json
{
  "dependencies": {
    "vue": "^3.6.0",
    "radix-vue": "^1.9.0",
    "@vueuse/core": "^11.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vitest": "^3.0.0",
    "typescript": "^5.8.0",
    "tailwindcss": "^4.2.0",
    "@tailwindcss/vite": "^4.2.0",
    "playwright": "^1.50.0",
    "nuxt": "^4.3.0",
    "vee-validate": "^4.14.0",
    "pinia": "^3.0.0"
  }
}
```

### Performance Benefits

By using these latest versions, you get:
- **10x faster builds** (Tailwind v4 + Vite 6 + Rolldown)
- **25% faster test startup** (Vitest 3)
- **Smaller bundles** (Vue 3.6 Vapor Mode, Vite 6 optimization)
- **Better HMR** (Vite 6, Nuxt 4)
- **Improved TypeScript performance** (TS 5.8)

### Future-Proofing

**Coming in 2026:**
- **Nuxt 5**: Will include Nitro v3, planned after Nuxt 4 stabilizes
- **Vue Vapor Mode stable**: Currently beta in Vue 3.6, will be production-ready
- **Vite unified toolchain**: "Vite Plus" for enterprise use
- **More native tooling**: Continued shift from JavaScript to Rust-based tools

---

## APPENDIX C: ADVANCED THEMING GUIDE

### Multi-Theme Support

The library supports multiple themes that can be switched at runtime:

```typescript
// Available built-in themes
// Theme switching composable
import { useTheme } from 'stellar-ui'

const themes = [
  'stellar', // Default purple/cosmic theme
  'sirius', // Bright blue theme
  'polaris', // Cool neutral theme
  'antares', // Warm red/orange theme
  'vega', // Green/teal theme
  'aldebaran', // Amber/gold theme
]

const { theme, setTheme, themes } = useTheme()

// Switch themes
setTheme('sirius')

// Get current theme
console.log(theme.value) // 'sirius'
```

### Theme Structure

Each theme follows this structure:

```typescript
// themes/sirius.ts
export const sirius = {
  name: 'Sirius',
  type: 'dark', // or 'light'
  colors: {
    background: 'oklch(24.23% 0.019 256.85)',
    foreground: 'oklch(93.37% 0.012 253.89)',
    primary: {
      DEFAULT: 'oklch(71.19% 0.101 250.01)',
      foreground: 'oklch(24.23% 0.019 256.85)',
    },
    secondary: {
      DEFAULT: 'oklch(55.37% 0.044 252.52)',
      foreground: 'oklch(93.37% 0.012 253.89)',
    },
    // ... all semantic colors
  },
  borderRadius: {
    DEFAULT: '0.5rem',
    lg: '0.75rem',
  },
  // ... other tokens
}
```

### Creating Custom Themes

**Option 1: CLI Tool**

```bash
npx stellar-ui theme create

# Interactive prompts:
# ? Theme name: My Custom Theme
# ? Base theme: default
# ? Primary color: #ff6b6b
# ? Border radius: 0.5rem
# ? Generate dark variant? Yes
```

This generates:
- CSS files with all color tokens
- TypeScript theme configuration
- Preview HTML page
- Export for sharing

**Option 2: Manual Creation**

```typescript
// themes/custom.ts
import { defineTheme } from 'stellar-ui/theme'

export default defineTheme({
  name: 'Custom',
  colors: {
    primary: {
      DEFAULT: '#ff6b6b',
      foreground: '#ffffff',
    },
    // Only define what you want to override
    // Rest will inherit from base theme
  },
  extends: 'default',
})
```

**Option 3: From Brand Color**

```typescript
import { generateTheme } from 'stellar-ui/theme'

// Generate entire theme from single brand color
const myTheme = generateTheme({
  brandColor: '#ff6b6b',
  name: 'Brand Theme',
  type: 'light',
  // Automatically generates:
  // - Complementary colors
  // - Accessible foreground colors
  // - Dark mode variant
  // - All semantic tokens
})
```

### Color System Best Practices

**Semantic Naming:**
- **primary**: Main brand color, call-to-actions
- **secondary**: Secondary actions, less emphasis
- **accent**: Highlights, hover states
- **destructive**: Errors, dangerous actions
- **muted**: Subtle backgrounds, disabled states
- **success**: Success messages, confirmations
- **warning**: Warnings, cautionary actions
- **info**: Informational messages

**Color Token Pairs:**
Each color has a foreground pair for text on that background:
```typescript
bg-primary text-primary-foreground // Always accessible contrast
```

**OKLCH Benefits:**
- Perceptually uniform (unlike HSL)
- Consistent lightness across hues
- Better interpolation for gradients
- Wider color gamut support
- Better for generating palettes

### Theme Switching Strategies

**1. User Preference (Recommended)**
```vue
<script setup>
import { useTheme } from 'stellar-ui'

const { theme, setTheme, isDark } = useTheme()

// Persists to localStorage
function toggleTheme() {
  setTheme(isDark.value ? 'light' : 'dark')
}
</script>
```

**2. System Preference**
```vue
<script setup>
import { useTheme } from 'stellar-ui'

const { theme, setTheme } = useTheme()

// Follow system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

prefersDark.addEventListener('change', (e) => {
  setTheme(e.matches ? 'dark' : 'light')
})
</script>
```

**3. Contextual Theming**
```vue
<!-- Different theme per section -->
<div data-theme="dark">
  <Card>Dark themed card</Card>
</div>

<div data-theme="polaris">
  <Card>Nord themed card</Card>
</div>
```

### CSS Custom Properties

All theme values are exposed as CSS custom properties:

```css
/* Access in custom CSS */
.my-element {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### Dynamic Theme Generation

Create themes programmatically at runtime:

```typescript
import { createTheme } from 'stellar-ui/theme'

// Generate theme from user input
function createUserTheme(userColor: string) {
  return createTheme({
    name: 'User Theme',
    baseColor: userColor,
    // Auto-generates full palette
  })
}

// Apply immediately
const newTheme = createUserTheme('#8b5cf6')
setTheme(newTheme)
```

### Theme Validation

Built-in contrast ratio checking:

```typescript
import { validateTheme } from 'stellar-ui/theme'

const issues = validateTheme(myTheme)

issues.forEach((issue) => {
  console.warn(`${issue.token}: Contrast ratio ${issue.ratio}
               is below WCAG AA standard (${issue.required})`)
})
```

### Exporting & Sharing Themes

```bash
# Export theme as JSON
npx stellar-ui theme export my-theme --format json

# Export as CSS variables
npx stellar-ui theme export my-theme --format css

# Export as Tailwind config
npx stellar-ui theme export my-theme --format tailwind

# Share theme (generates shareable link)
npx stellar-ui theme share my-theme
```

### Pre-built Theme Showcase

The documentation site includes:
- Interactive theme preview
- Copy theme code
- Try before applying
- Community-submitted themes
- Theme editor with live preview

### Nuxt-Specific Theming

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  <libraryName>: {
    theme: {
      default: 'dark',
      // Server-side theme detection
      preferenceDetection: true,
      // CSS variable prefix
      cssVarPrefix: 'ui',
      // Generate theme CSS at build time
      buildTimeGeneration: true,
    },
  },
})
```

### Theme Persistence

Automatic theme persistence:

```typescript
import { useTheme } from 'stellar-ui'

const { theme, setTheme } = useTheme({
  // Where to persist
  storage: 'localStorage', // or 'sessionStorage', 'cookie'

  // Storage key
  key: 'app-theme',

  // Auto-sync across tabs
  sync: true,
})
```

### Advanced: Theme Variables in JS

Access theme tokens in JavaScript:

```typescript
import { useThemeTokens } from 'stellar-ui'

const tokens = useThemeTokens()

// Reactive access to current theme values
console.log(tokens.colors.primary.DEFAULT)
console.log(tokens.borderRadius.lg)

// Watch for changes
watch(() => tokens.colors.primary, (newPrimary) => {
  console.log('Primary color changed:', newPrimary)
})
```

This comprehensive theming system provides maximum flexibility while maintaining accessibility and great developer experience.

---

## APPENDIX D: ADVANTAGES OVER SHADCN/UI

### Critical Improvements

#### 1. Component Version Management
**shadcn Problem:** Once copied, components never update. Breaking changes in dependencies break components with no fix.

**Our Solution:**
```bash
# Track component versions
npx stellar-ui list --versions

# Update specific component with diff preview
npx stellar-ui update button

# Update all components
npx stellar-ui update --all

# Rollback if something breaks
npx stellar-ui rollback button
```

Includes:
- `components.lock.json` tracking installed versions
- Smart diff showing what changed
- Breaking change warnings
- Dependency monitoring for Radix Vue updates
- Customization detection (warns if you modified component)

#### 2. Component Composition Patterns
**shadcn Problem:** Provides atomic components only, no guidance on combining them.

**Our Solution:**
- **Recipe System**: Pre-built component combinations
```bash
npx stellar-ui recipe data-table-with-filters
npx stellar-ui recipe multi-step-wizard
npx stellar-ui recipe settings-panel
npx stellar-ui recipe user-profile-card
```

- **Pattern Library**: 20+ documented composition patterns
- **Block System**: 100+ pre-built UI sections (hero, pricing, testimonials, etc.)
```bash
npx stellar-ui block add hero-gradient
npx stellar-ui template add saas-landing
```

#### 3. Advanced Data Table
**shadcn Problem:** Basic table only.

**Our Solution:** Production-ready DataTable with:
- Server-side pagination, sorting, filtering
- Row selection and bulk actions
- Column resizing, reordering, hiding
- Expandable rows
- Inline editing
- Export to CSV/Excel
- Virtual scrolling for 10k+ rows
- Search and advanced filter builder
- Saved views and presets

#### 4. Form Validation Integration
**shadcn Problem:** Minimal validation integration.

**Our Solution:**
- Deep VeeValidate integration
- Declarative form builder
- Real-time, async, cross-field validation
- Consistent error display patterns
- Built-in submission states

```vue
<FormBuilder :schema="schema" @submit="handleSubmit">
  <FormField name="email" rules="required|email" />
  <FormField name="password" type="password" rules="required|min:8" />
</FormBuilder>
```

#### 5. Multi-Step Forms/Wizard
**shadcn Problem:** No stepper or wizard component.

**Our Solution:**
```vue
<Wizard v-model:step="currentStep" :total="3">
  <WizardStep :step="1" title="Account Info" :validate="validateStep1">
    <AccountForm />
  </WizardStep>
  <!-- More steps -->
</Wizard>
```

#### 6. Rich Text Editor
**shadcn Problem:** No rich text editor.

**Our Solution:** TiptapEditor component with:
- Customizable toolbar
- Markdown import/export
- Image upload and handling
- Code blocks with syntax highlighting
- Collaboration support (optional)

#### 7. File Upload Component
**shadcn Problem:** Basic input only.

**Our Solution:**
```vue
<FileUpload
  accept="image/*"
  :max-size="5000000"
  :max-files="5"
  drag-drop
  preview
  v-model="files"
/>
```

#### 8. Migration Tools
**shadcn Problem:** No migration path from shadcn-vue.

**Our Solution:**
```bash
# Automatic migration
npx stellar-ui migrate from shadcn-vue

# Run compatibility check
npx stellar-ui migrate check

# Side-by-side mode during migration
npx stellar-ui migrate compatibility-mode
```

#### 9. Testing Utilities
**shadcn Problem:** No testing helpers.

**Our Solution:** `@stellar-ui/test-utils` package with:
- Component wrappers
- Mock data generators
- Accessibility matchers
- Form testing utilities

```typescript
import { renderWithTheme, mockFormData } from '@stellar-ui/test-utils'

test('button renders', () => {
  const { getByRole } = renderWithTheme(<Button>Click me</Button>)
  expect(getByRole('button')).toBeInTheDocument()
})
```

#### 10. Layout Components
**shadcn Problem:** No layout primitives.

**Our Solution:**
- `<Stack>` - Vertical/horizontal spacing
- `<Grid>` - Responsive grid
- `<Sidebar>` - Collapsible sidebars
- `<Shell>` - App shell/scaffold
- `<Split>` - Resizable split panes

#### 11. Animation System
**shadcn Problem:** No animation presets.

**Our Solution:**
- 20+ entrance/exit animations
- Named transitions (fade, slide, scale, bounce, etc.)
- Scroll-triggered animations
- Micro-interactions library
- `useTransition()` composable

#### 12. Notification Center
**shadcn Problem:** Just toasts.

**Our Solution:**
- Inbox-style notification center
- Persistent notifications
- Actionable notifications
- Badge counts
- Mark as read/unread
- Notification preferences

#### 13. Advanced Search/Filters
**shadcn Problem:** No filter UI.

**Our Solution:**
```vue
<FilterBuilder
  v-model="filters"
  :fields="filterableFields"
  :operators="['equals', 'contains', 'greater_than']"
/>
```

#### 14. Charts & Visualization
**shadcn Problem:** Basic recharts only.

**Our Solution:**
- Multiple chart types (line, bar, pie, area, scatter, radar)
- Interactive tooltips, zoom, pan
- Real-time data support
- Theme integration
- Export capabilities

#### 15. Internationalization (i18n)
**shadcn Problem:** No i18n support.

**Our Solution:**
- vue-i18n integration
- RTL language support
- Locale-aware date/number formatting
- Translatable validation messages
- Language-specific components

#### 16. Accessibility Audit
**shadcn Problem:** Components are accessible but no testing tools.

**Our Solution:**
```bash
# Audit accessibility
npx stellar-ui audit

# Check contrast ratios
npx stellar-ui audit --contrast

# Test keyboard navigation
npx stellar-ui audit --keyboard
```

#### 17. Design Token Export
**shadcn Problem:** Can't export tokens.

**Our Solution:**
```bash
# Export to Figma
npx stellar-ui export figma

# Export to CSS
npx stellar-ui export css

# Export to Tailwind config
npx stellar-ui export tailwind
```

### Development Experience Improvements

**Better CLI:**
- More helpful error messages
- Interactive prompts
- Progress indicators
- Auto-fix suggestions
- Conflict resolution

**Better Documentation:**
- Interactive component playground
- Live code editor
- Composition examples
- Video tutorials
- Migration guides

**Better Tooling:**
- VS Code extension
- Figma plugin
- Theme generator UI
- Component dependency graph
- Bundle size analyzer

### Why Choose Our Library Over shadcn-vue?

1. **Updates Work**: Biggest pain point solved
2. **Form-First**: Production-ready forms from day one
3. **Data-Heavy Apps**: DataTable, charts, filters built-in
4. **Complete Patterns**: Not just atoms, full UI patterns
5. **Vue-Native**: Not a React port
6. **Nuxt-Optimized**: Deep Nuxt 4 integration
7. **Testing Built-In**: First-class testing support
8. **Migration Path**: Easy to switch from shadcn-vue
9. **Better DX**: Superior tooling and documentation
10. **Future-Proof**: Active development with clear roadmap
