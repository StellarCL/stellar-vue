# Stellar Vue UI

> A production-ready Vue 3 component library built on Radix Vue with Tailwind CSS v4

[![CI](https://github.com/StellarCL/stellar-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/StellarCL/stellar-vue/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@stellar-vue-ui/core)](https://www.npmjs.com/package/@stellar-vue-ui/core)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Vue 3](https://img.shields.io/badge/vue-3.5+-42b883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.8+-3178c6.svg)](https://www.typescriptlang.org/)

56 component families, 18 composables, 6 celestial themes, first-class Nuxt support, and a CLI that manages it all. Import from npm or copy components into your project -- you own the code either way.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [New Vue 3 Project (from scratch)](#new-vue-3-project-from-scratch)
  - [Existing Vue 3 Project](#existing-vue-3-project)
  - [Nuxt Project](#nuxt-project)
- [CLI Reference](#cli-reference)
  - [stellar-ui init](#stellar-ui-init)
  - [stellar-ui add](#stellar-ui-add)
  - [stellar-ui update](#stellar-ui-update)
  - [stellar-ui remove](#stellar-ui-remove)
  - [stellar-ui list](#stellar-ui-list)
  - [stellar-ui info](#stellar-ui-info)
  - [stellar-ui deps](#stellar-ui-deps)
  - [stellar-ui audit](#stellar-ui-audit)
  - [stellar-ui theme](#stellar-ui-theme)
- [Usage](#usage)
  - [Importing Components](#importing-components)
  - [Using Composables](#using-composables)
  - [Dark Mode](#dark-mode)
- [Packages](#packages)
- [Components](#components)
- [Composables](#composables)
- [Themes](#themes)
- [Animation System](#animation-system)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

### New Vue 3 Project (from scratch)

#### 1. Scaffold with Vite

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
```

#### 2. Install Stellar Vue UI

```bash
npm install @stellar-vue-ui/core @stellar-vue-ui/theme
npm install @vueuse/core
npm install -D tailwindcss @tailwindcss/vite
```

#### 3. Configure Vite

Replace `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

#### 4. Set up your stylesheet

Replace `src/style.css` with Tailwind and the Stellar design tokens. A complete starter stylesheet is provided in [DEMO.md](./DEMO.md) -- copy the full CSS from Step 4.

The minimum required structure is:

```css
@import 'tailwindcss';

@theme {
  /* Stellar design tokens -- colors, radii, shadows, fonts, animations */
  --color-primary: #4f46e5;
  --color-primary-foreground: #ffffff;
  --color-background: #f8fafc;
  --color-foreground: #334155;
  /* ... see DEMO.md for the full token set */
}

.dark {
  --color-primary: #5f5af6;
  --color-background: #192132;
  --color-foreground: #e7e9ef;
  /* ... dark overrides */
}
```

#### 5. Use a component

```vue
<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Button variant="default" size="md">Get Started</Button>
</template>
```

#### 6. Run

```bash
npm run dev
```

---

### Existing Vue 3 Project

If you already have a Vue 3 + Vite project running:

#### 1. Install packages

```bash
npm install @stellar-vue-ui/core @stellar-vue-ui/theme @vueuse/core
npm install -D tailwindcss @tailwindcss/vite
```

#### 2. Add the Tailwind plugin to `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // add this
  ],
})
```

#### 3. Add design tokens to your CSS

Add `@import 'tailwindcss';` at the top of your main CSS file, followed by the `@theme { }` block with Stellar tokens. See [DEMO.md](./DEMO.md) Step 4 for the complete stylesheet.

> **Tailwind v4 note:** The `@theme` block must be at the top level of the file (not nested inside selectors). Dark mode overrides use plain CSS custom properties inside a `.dark` selector, _not_ `@theme`.

#### 4. Start using components

```vue
<script setup lang="ts">
import { Button, Card, CardContent, CardHeader, CardTitle } from '@stellar-vue-ui/core'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Welcome</CardTitle>
    </CardHeader>
    <CardContent>
      <Button>Click me</Button>
    </CardContent>
  </Card>
</template>
```

Every component is tree-shakeable -- only what you import ends up in your bundle.

---

### Nuxt Project

#### 1. Install

```bash
npm install @stellar-vue-ui/core @stellar-vue-ui/nuxt @stellar-vue-ui/theme @vueuse/core
```

#### 2. Register the module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@stellar-vue-ui/nuxt'],
  stellarUI: {
    theme: 'stellar', // default theme
    darkMode: 'class', // 'class' or 'media'
    autoImport: true, // auto-import all components + composables
    prefix: 'UI', // e.g. <UIButton>, <UICard> (set to '' for no prefix)
  },
})
```

#### 3. Use components (no imports needed)

With `autoImport: true`, all components and composables are available globally:

```vue
<template>
  <UICard>
    <UICardHeader>
      <UICardTitle>Hello from Nuxt</UICardTitle>
    </UICardHeader>
    <UICardContent>
      <UIButton>Click me</UIButton>
    </UICardContent>
  </UICard>
</template>
```

#### Module options

| Option       | Type                 | Default     | Description                              |
| ------------ | -------------------- | ----------- | ---------------------------------------- |
| `autoImport` | `boolean`            | `true`      | Auto-import components and composables   |
| `prefix`     | `string`             | `'UI'`      | Component name prefix (`''` for none)    |
| `theme`      | `string`             | `'stellar'` | Default theme preset                     |
| `darkMode`   | `'class' \| 'media'` | `'class'`   | Dark mode strategy                       |
| `components` | `string[]`           | `undefined` | Limit which component families to import |
| `global`     | `object`             | `undefined` | Global options passed to components      |

To import only specific components (reduces auto-import surface):

```ts
stellarUI: {
  components: ['Button', 'Card', 'Dialog', 'Tabs'],
}
```

---

## CLI Reference

The Stellar CLI manages project initialization, component installation, themes, and dependency auditing.

### Install

```bash
npm install -g @stellar-vue-ui/cli
```

Or use directly with `npx`:

```bash
npx @stellar-vue-ui/cli <command>
```

Once installed globally, the binary is available as `stellar-ui`.

---

### `stellar-ui init`

Initialize Stellar Vue UI in your project. Creates configuration files, a CSS variables file, and a component lock file.

```bash
stellar-ui init
stellar-ui init -y              # skip prompts, use defaults
stellar-ui init --cwd ./my-app  # target a different directory
```

**Interactive prompts** (skipped with `-y`):

| Prompt                | Options                                            | Default           |
| --------------------- | -------------------------------------------------- | ----------------- |
| Framework             | Vue, Nuxt                                          | auto-detected     |
| Components directory  | any path                                           | `./components/ui` |
| Composables directory | any path                                           | `./composables`   |
| Utils directory       | any path                                           | `./lib`           |
| Default theme         | stellar, sirius, polaris, antares, vega, aldebaran | stellar           |
| Include animations?   | yes/no                                             | yes               |
| Icon library          | Lucide, Heroicons, Phosphor, None                  | Lucide            |

**Files created:**

| File                         | Purpose                                 |
| ---------------------------- | --------------------------------------- |
| `.stellar-ui.json`           | Machine-readable config                 |
| `stellar-ui.config.ts`       | Human-readable config                   |
| `./assets/css/variables.css` | Theme CSS variables (`:root` + `.dark`) |
| `components.lock.json`       | Tracks installed components             |

---

### `stellar-ui add`

Add one or more components to your project. Dependencies between components are resolved automatically.

```bash
stellar-ui add button
stellar-ui add dialog card toast       # multiple at once
stellar-ui add button --overwrite      # replace existing files
stellar-ui add button -y               # skip confirmation
```

**What happens:**

1. Resolves peer dependencies (e.g., `form` pulls in `button` + `label`)
2. Creates component files in your configured `componentsDir`
3. Updates `components.lock.json`
4. Prints the `npm install` command for any required npm packages

```
✓ Added 1 component(s): button

Install required dependencies:
  npm install radix-vue@^1.9.0
```

---

### `stellar-ui update`

Update installed components to the latest version. Detects customized files and shows a diff before overwriting.

```bash
stellar-ui update button           # update specific component
stellar-ui update --all            # update all installed components
stellar-ui update button -y        # skip customization prompt
```

If you've modified a component file, the CLI will show the diff and ask for confirmation before overwriting.

---

### `stellar-ui remove`

Remove components from your project. Warns about dependent components before deletion.

```bash
stellar-ui remove button
stellar-ui remove button card -y   # skip confirmation
```

```
✓ Component "button" is used by: form, pagination
Remove "button"? [y/N]

✓ Removed 1 component(s): button

The following npm dependencies may no longer be needed:
  - radix-vue
```

---

### `stellar-ui list`

List available components or see what you've installed.

```bash
stellar-ui list                       # all available, grouped by category
stellar-ui list --installed           # only installed components
stellar-ui list --category forms      # filter by category
```

Categories: `layout`, `forms`, `feedback`, `navigation`, `data-display`, `overlay`.

---

### `stellar-ui info`

Show detailed information about a component, including its files, dependencies, and installation status.

```bash
stellar-ui info button
```

```
Component: button

  Name:        button
  Description: Interactive button with multiple variants
  Category:    forms
  Version:     0.1.0
  Files:       2 files

Files:
  • components/ui/button/Button.vue
  • components/ui/button/index.ts

npm Dependencies:
  • radix-vue ^1.9.0

Status:   ✓ Installed
```

---

### `stellar-ui deps`

Check which npm dependencies your installed components need and whether they're present in your `package.json`.

```bash
stellar-ui deps               # show status
stellar-ui deps --update      # also show the install command
```

```
Installed dependencies (1/2):
  ✓ radix-vue

Missing dependencies (1):
  ⚠ @tanstack/vue-table ^8.20.0

Install missing dependencies:
  npm install @tanstack/vue-table@"^8.20.0"
```

---

### `stellar-ui audit`

Audit your project setup and theme for accessibility compliance.

```bash
stellar-ui audit               # general project health check
stellar-ui audit --contrast    # WCAG AA color contrast check
```

**Default audit** checks:

- Config file exists
- Theme is set
- Components are tracked in lock file
- CSS variables file exists

**Contrast audit** (`--contrast`) tests 8 foreground/background color pairs against the WCAG AA 4.5:1 ratio:

```
Stellar UI - Color Contrast Audit (WCAG AA)

  ✓ PASS foreground / background — 12.53:1
  ✓ PASS primary-foreground / primary — 8.24:1
  ✗ FAIL accent-foreground / accent — 3.2:1 (needs >= 4.5:1)

Results: 7 passing, 1 failing
```

---

### `stellar-ui theme`

Manage themes -- create custom themes, list available ones, apply them, or export in different formats.

#### `theme list`

```bash
stellar-ui theme list
```

Shows all built-in and custom themes.

#### `theme apply`

```bash
stellar-ui theme apply sirius
```

Updates your project config to use the specified theme.

#### `theme create`

```bash
stellar-ui theme create
stellar-ui theme create -y   # use defaults
```

Interactive prompts:

| Prompt                | Default         |
| --------------------- | --------------- |
| Theme name            | `my-theme`      |
| Base theme            | `stellar`       |
| Primary color (oklch) | from base theme |
| Border radius         | `lg` (0.5rem)   |

Creates `themes/<name>.css` with `:root` and `.dark` custom property overrides.

#### `theme export`

```bash
stellar-ui theme export stellar                # CSS (default)
stellar-ui theme export stellar --format json  # JSON tokens
stellar-ui theme export stellar --format tailwind  # Tailwind config
```

---

## Usage

### Importing Components

Every component is a named export from `@stellar-vue-ui/core`:

```vue
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@stellar-vue-ui/core'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Open</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

### Using Composables

```vue
<script setup lang="ts">
import { useToast, useToggle, useMediaQuery } from '@stellar-vue-ui/core'

const { toast } = useToast()
const [isDark, toggleDark] = useToggle(false)
const isMobile = useMediaQuery('(max-width: 768px)')

function notify() {
  toast({ title: 'Saved', description: 'Your changes have been saved.' })
}
</script>
```

### Dark Mode

Stellar supports class-based dark mode. Toggle the `dark` class on your `<html>` element:

```ts
document.documentElement.classList.toggle('dark')
```

All components automatically adapt. The CSS tokens in the `.dark` selector handle every color change.

---

## Packages

| Package                                               | Description                            | npm                                                                                                                         |
| ----------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [`@stellar-vue-ui/core`](./packages/core)             | 56 component families + 18 composables | [![npm](https://img.shields.io/npm/v/@stellar-vue-ui/core)](https://www.npmjs.com/package/@stellar-vue-ui/core)             |
| [`@stellar-vue-ui/theme`](./packages/theme)           | 6 celestial theme presets + generator  | [![npm](https://img.shields.io/npm/v/@stellar-vue-ui/theme)](https://www.npmjs.com/package/@stellar-vue-ui/theme)           |
| [`@stellar-vue-ui/animations`](./packages/animations) | 17 transition presets + components     | [![npm](https://img.shields.io/npm/v/@stellar-vue-ui/animations)](https://www.npmjs.com/package/@stellar-vue-ui/animations) |
| [`@stellar-vue-ui/cli`](./packages/cli)               | CLI for managing components & themes   | [![npm](https://img.shields.io/npm/v/@stellar-vue-ui/cli)](https://www.npmjs.com/package/@stellar-vue-ui/cli)               |
| [`@stellar-vue-ui/nuxt`](./packages/nuxt)             | Nuxt module with auto-imports & SSR    | [![npm](https://img.shields.io/npm/v/@stellar-vue-ui/nuxt)](https://www.npmjs.com/package/@stellar-vue-ui/nuxt)             |
| [`@stellar-vue-ui/test-utils`](./packages/test-utils) | Testing utilities                      | [![npm](https://img.shields.io/npm/v/@stellar-vue-ui/test-utils)](https://www.npmjs.com/package/@stellar-vue-ui/test-utils) |

---

## Components

56 component families covering everything from basic inputs to complex data-driven UIs:

**Layout & Structure:** Accordion, Grid, Stack, Shell, Sidebar, Separator, Card

**Navigation:** Breadcrumb, NavigationMenu, Menubar, Tabs, Pagination, Stepper, Wizard

**Forms & Inputs:** Button, Input, Textarea, Checkbox, RadioGroup, Select, MultiSelect, Combobox, Switch, Slider, DatePicker, Calendar, ColorPicker, FileUpload, Rating, Form, FilterBuilder, RichTextEditor

**Data Display:** Avatar, Badge, Skeleton, Timeline, TreeView, DataTable, Chart, CodeBlock, EmptyState, Loading

**Feedback:** Alert, Toast, Progress, Dialog, Drawer, Sheet, Tooltip, Popover, NotificationCenter

**Overlay:** ContextMenu, DropdownMenu, Command, Carousel

---

## Composables

| Composable         | Description                          |
| ------------------ | ------------------------------------ |
| `useTheme`         | Theme switching and dark mode        |
| `useThemeTokens`   | Access resolved design tokens        |
| `useForm`          | Form state and validation            |
| `useFormField`     | Individual field state               |
| `useDisclosure`    | Open/close toggle pattern            |
| `useToggle`        | Boolean toggle state                 |
| `useSteps`         | Multi-step wizard logic              |
| `usePagination`    | Pagination state and controls        |
| `useFocusTrap`     | Focus trap management                |
| `useKeyboardNav`   | Keyboard navigation helpers          |
| `useDebounce`      | Debounced values                     |
| `useMediaQuery`    | Reactive media query matching        |
| `useClipboard`     | Copy to clipboard                    |
| `useDataTable`     | Table sorting, filtering, pagination |
| `useToast`         | Toast notification management        |
| `useChart`         | Chart data and configuration         |
| `useFileUpload`    | File upload state management         |
| `useNotifications` | Notification center management       |

---

## Themes

Six celestial-themed presets with full dark mode support:

| Theme         | Description                 | Primary |
| ------------- | --------------------------- | ------- |
| **Stellar**   | Default -- balanced, modern | Indigo  |
| **Sirius**    | Bright, high-contrast       | Blue    |
| **Polaris**   | Cool, professional          | Cyan    |
| **Antares**   | Warm, bold                  | Red     |
| **Vega**      | Clean, natural              | Green   |
| **Aldebaran** | Rich, sophisticated         | Amber   |

Apply a theme at runtime:

```ts
import { generateCSS, sirius } from '@stellar-vue-ui/theme'

const style = document.createElement('style')
style.textContent = generateCSS(sirius)
document.head.appendChild(style)
```

Or use the CLI:

```bash
stellar-ui theme apply sirius
```

---

## Animation System

```bash
npm install @stellar-vue-ui/animations
```

17 transition presets: `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `scaleUp`, `scaleDown`, `expand`, `collapse`, `bounce`, `shake`, `blur`.

```vue
<script setup lang="ts">
import { StellarTransition } from '@stellar-vue-ui/animations'
</script>

<template>
  <StellarTransition preset="fadeUp">
    <div v-if="show">Animated content</div>
  </StellarTransition>
</template>
```

---

## Contributing

We welcome contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) for coding standards, file conventions, and the development workflow.

```bash
git clone https://github.com/StellarCL/stellar-vue.git
cd stellar-vue
pnpm install
pnpm vitest run   # 1,879 tests across 92 files
```

---

## License

MIT License -- Copyright (c) 2026 Terry McCann

See [LICENSE](./LICENSE) for full details.
