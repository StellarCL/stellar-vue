# Stellar Vue UI — Nuxt 4 Example

A Nuxt 4 application demonstrating the `@stellar-vue-ui/nuxt` module with auto-imports.

## What's Included

- All Stellar UI components available as `UIButton`, `UICard`, `UIInput`, etc. (no import statements required)
- All composables auto-imported: `useTheme`, `useForm`, `useDisclosure`, etc.
- Contact form with Zod schema validation via `vee-validate`
- Theme and dark mode switching
- SSR-compatible setup

## Setup

```bash
# From the monorepo root
pnpm install

# Run the Nuxt dev server
cd apps/examples/nuxt-app
pnpm dev
```

Or from the monorepo root with filtering:

```bash
pnpm --filter @stellar-vue-ui/example-nuxt-app dev
```

## How Auto-Imports Work

The `@stellar-vue-ui/nuxt` module registers all components with the configured `prefix` (default `UI`). Components are globally available in your templates — no import needed:

```vue
<template>
  <!-- No import statement required -->
  <UIButton>Click me</UIButton>
  <UICard>...</UICard>
</template>

<script setup>
// Composables are also auto-imported
const { theme, setTheme } = useTheme()
</script>
```

## nuxt.config.ts Options

```ts
stellarUI: {
  autoImport: true,    // Enable auto-imports (default: true)
  prefix: 'UI',        // Component prefix (default: 'UI')
  theme: 'stellar',    // Active theme (default: 'stellar')
  darkMode: 'class',   // Dark mode strategy (default: 'class')
  // components: ['Button', 'Card'],  // Limit which component families are loaded
}
```
