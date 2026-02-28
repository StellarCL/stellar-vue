# Stellar Vue UI

> A celestial-themed Vue 3 component library

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-brightgreen.svg)](./CHANGELOG.md)
[![Vue 3](https://img.shields.io/badge/vue-3.5+-42b883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.8+-3178c6.svg)](https://www.typescriptlang.org/)

Stellar Vue UI is a production-ready Vue 3 component library built on [Radix Vue](https://www.radix-vue.com/) with [Tailwind CSS](https://tailwindcss.com/). Copy-paste components you own and control, with version management that actually works.

---

## Features

- **56 Component Families** -- from buttons and inputs to data tables, wizards, and rich text editors
- **18 Composables** -- reusable logic for forms, themes, pagination, keyboard navigation, and more
- **6 Celestial Themes** -- Stellar, Sirius, Polaris, Antares, Vega, and Aldebaran presets
- **Dark Mode** -- built-in dark mode support across all themes
- **Animation System** -- 17 transition presets, StellarTransition components, usePresence, and useMotion
- **Accessibility First** -- built on Radix Vue primitives with full WAI-ARIA compliance
- **TypeScript** -- complete type definitions for every component, composable, and utility
- **Tree-Shakeable** -- import only what you need with zero unused code in your bundle
- **Nuxt Integration** -- first-class Nuxt 4 module with auto-imports and SSR support
- **CLI Tool** -- add, update, and manage components from the command line

## Quick Start

### Installation

```bash
pnpm add @stellar-vue-ui/core
```

Or with npm:

```bash
npm install @stellar-vue-ui/core
```

### Basic Usage

```vue
<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Button variant="default" size="md">
    Get Started
  </Button>
</template>
```

### Theme Setup

```ts
import { useTheme } from '@stellar-vue-ui/core'
import { stellar } from '@stellar-vue-ui/theme'
import { createApp } from 'vue'

const app = createApp(App)

// Apply a theme
const { setTheme } = useTheme()
setTheme(stellar)
```

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@stellar-vue-ui/core`](./packages/core) | Components and composables | 0.1.0 |
| [`@stellar-vue-ui/theme`](./packages/theme) | Theme presets and system | 0.1.0 |
| [`@stellar-vue-ui/animations`](./packages/animations) | Transition presets and components | 0.1.0 |
| [`@stellar-vue-ui/cli`](./packages/cli) | CLI tool for managing components | 0.1.0 |
| [`@stellar-vue-ui/nuxt`](./packages/nuxt) | Nuxt 4 module | 0.1.0 |
| [`@stellar-vue-ui/test-utils`](./packages/test-utils) | Testing utilities | 0.1.0 |

## Components

Stellar Vue UI includes 56 component families:

**Layout & Structure:** Grid, Stack, Shell, Sidebar, Separator

**Navigation:** Breadcrumb, Navigation Menu, Menubar, Tabs, Pagination, Stepper, Wizard

**Forms & Inputs:** Button, Input, Textarea, Checkbox, Radio Group, Select, Multi-Select, Combobox, Switch, Slider, Date Picker, Calendar, Color Picker, File Upload, Rating, Form, Filter Builder, Rich Text Editor

**Data Display:** Card, Avatar, Badge, Skeleton, Timeline, Tree View, Data Table, Chart, Code Block, Empty State, Loading

**Feedback:** Alert, Toast, Progress, Dialog, Drawer, Sheet, Tooltip, Popover, Notification Center

**Overlay:** Context Menu, Dropdown Menu, Command, Carousel

**Content:** Accordion

## Composables

18 composables for common UI patterns:

| Composable | Description |
|------------|-------------|
| `useTheme` | Theme switching and dark mode |
| `useThemeTokens` | Access resolved theme tokens |
| `useForm` | Form state and validation |
| `useFormField` | Individual field state |
| `useDisclosure` | Open/close toggle pattern |
| `useToggle` | Boolean toggle state |
| `useSteps` | Multi-step wizard logic |
| `usePagination` | Pagination state and controls |
| `useFocusTrap` | Focus trap management |
| `useKeyboardNav` | Keyboard navigation helpers |
| `useDebounce` | Debounced values |
| `useMediaQuery` | Reactive media query matching |
| `useClipboard` | Copy to clipboard |
| `useDataTable` | Table sorting, filtering, pagination |
| `useToast` | Toast notification management |
| `useChart` | Chart data and configuration |
| `useFileUpload` | File upload state management |
| `useNotifications` | Notification center management |

## Themes

Six celestial-themed presets with full dark mode support:

- **Stellar** -- the default theme with a balanced, modern aesthetic
- **Sirius** -- bright and high-contrast, inspired by the brightest star
- **Polaris** -- cool blues and silvers, inspired by the North Star
- **Antares** -- warm reds and oranges, inspired by the red supergiant
- **Vega** -- soft purples and teals, inspired by the blue-white star
- **Aldebaran** -- earthy golds and ambers, inspired by the orange giant

## Animation System

```bash
pnpm add @stellar-vue-ui/animations
```

17 transition presets: fade, fadeUp, fadeDown, fadeLeft, fadeRight, slideUp, slideDown, slideLeft, slideRight, scale, scaleUp, scaleDown, expand, collapse, bounce, shake, blur.

```vue
<script setup lang="ts">
import { StellarTransition } from '@stellar-vue-ui/animations'
</script>

<template>
  <StellarTransition preset="fadeUp">
    <div v-if="show">
      Animated content
    </div>
  </StellarTransition>
</template>
```

## Nuxt Integration

```bash
pnpm add @stellar-vue-ui/nuxt
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@stellar-vue-ui/nuxt'],
  stellarVueUI: {
    theme: 'stellar',
    darkMode: true,
    autoImport: true,
  },
})
```

All components and composables are auto-imported with full SSR support.

## CLI Tool

```bash
# Initialize Stellar Vue UI in your project
npx stellar-vue init

# Add components
npx stellar-vue add button
npx stellar-vue add dialog card toast

# Update components to latest version
npx stellar-vue update button

# Remove components
npx stellar-vue remove button

# List available components
npx stellar-vue list

# Apply a theme
npx stellar-vue theme apply stellar

# Show component info
npx stellar-vue info button

# Check component dependencies
npx stellar-vue deps button

# Audit installed components
npx stellar-vue audit
```

## Documentation

Full documentation is available at [stellar-vue-ui.dev](https://stellar-vue-ui.dev) (coming soon).

To run the docs locally:

```bash
cd apps/docs
npx vitepress dev
```

## Playground

An interactive playground is available for exploring components:

```bash
cd apps/playground
pnpm dev
```

## Example Projects

Example projects demonstrating Stellar Vue UI in different setups:

- **[Basic Vue](./apps/examples/basic-vue)** -- minimal Vue 3 + Vite setup
- **[Vite TypeScript](./apps/examples/vite-ts)** -- Vue 3 + Vite + TypeScript
- **[Nuxt App](./apps/examples/nuxt-app)** -- Nuxt 4 integration

## Contributing

We welcome contributions! Here is how to get started:

1. Fork the repository
2. Clone your fork and install dependencies:
   ```bash
   pnpm install
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
4. Make your changes, ensuring tests pass:
   ```bash
   pnpm vitest run
   ```
5. Submit a pull request

Please see the [BIBLE.md](./BIBLE.md) for coding standards, file naming conventions, and component patterns.

## License

MIT License - Copyright (c) 2026 Terry McCann

See [LICENSE](./LICENSE) for full details.
