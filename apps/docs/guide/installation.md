# Installation

Stellar Vue UI can be used in two ways: as a full package install, or by copying individual components into your project via the CLI.

## Prerequisites

Before installing, make sure your project has these peer dependencies:

- **Vue 3.5+** — Stellar uses the latest Vue 3 APIs including `defineModel` and improved TypeScript support
- **Tailwind CSS v4** — All component styling uses Tailwind utility classes
- **Radix Vue** — Accessible primitives that power interactive components

## Package Install

Install the core package along with its peer dependencies:

::: code-group

```bash [pnpm]
pnpm add @stellar-vue-ui/core radix-vue
```

```bash [npm]
npm install @stellar-vue-ui/core radix-vue
```

```bash [yarn]
yarn add @stellar-vue-ui/core radix-vue
```

:::

### Optional Packages

```bash
# Theme presets (6 cosmic themes)
pnpm add @stellar-vue-ui/theme

# Animation system (17 transition presets)
pnpm add @stellar-vue-ui/animations

# CLI tool (copy-paste workflow)
pnpm add -D @stellar-vue-ui/cli
```

## CLI Install (Copy-Paste)

The CLI approach copies component source files directly into your project so you own the code completely.

### 1. Install the CLI

```bash
pnpm add -D @stellar-vue-ui/cli
```

### 2. Initialize your project

```bash
npx stellar init
```

This will:
- Detect your project structure (Vite, Nuxt, etc.)
- Create a `stellar.config.ts` configuration file
- Set up the component output directory
- Install required dependencies

### 3. Add components

```bash
npx stellar add button input card dialog
```

Components are copied to your configured directory (default: `src/components/ui/`) and become part of your codebase.

## Nuxt Module

For Nuxt 3/4 projects, use the dedicated Nuxt module:

```bash
pnpm add @stellar-vue-ui/nuxt
```

Add it to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@stellar-vue-ui/nuxt'],
  stellar: {
    prefix: 'S', // optional: prefix all components (e.g., SButton)
    theme: 'stellar', // default theme preset
  },
})
```

The Nuxt module automatically:
- Registers all components globally with tree-shaking
- Sets up the theme system with SSR support
- Configures dark mode detection
- Provides auto-imports for composables

## Tailwind CSS Setup

Stellar Vue UI requires Tailwind CSS v4. Make sure your project has it configured:

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

In your main CSS file (e.g., `app.css` or `main.css`), import Tailwind and set up the Stellar color tokens:

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(9% 0.03 285.82);

  --color-primary: oklch(58.42% 0.187 285.82);
  --color-primary-foreground: oklch(98% 0 0);

  --color-secondary: oklch(96.1% 0 0);
  --color-secondary-foreground: oklch(26.47% 0.043 285.82);

  --color-accent: oklch(96.1% 0 0);
  --color-accent-foreground: oklch(26.47% 0.043 285.82);

  --color-destructive: oklch(61.42% 0.204 27.32);
  --color-destructive-foreground: oklch(98% 0 0);

  --color-muted: oklch(96.1% 0 0);
  --color-muted-foreground: oklch(54.12% 0.015 285.82);

  --color-border: oklch(91.15% 0.006 286.07);
  --color-input: oklch(91.15% 0.006 286.07);
  --color-ring: oklch(9% 0.03 285.82);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

If you are using a theme preset, import it instead:

```typescript
import { applyTheme } from '@stellar-vue-ui/theme'
import { stellar } from '@stellar-vue-ui/theme/themes'

applyTheme(stellar)
```

## Verifying Installation

Create a simple test to verify everything is working:

```vue
<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Button variant="default">
    It works!
  </Button>
</template>
```

If the button renders with proper styling, your setup is complete.

## Next Steps

- Follow the [Quick Start](/guide/quickstart) to build your first page
- Learn about the [Theme System](/guide/theming)
- Browse available [Components](/components/button)
