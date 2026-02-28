# Stellar Vue UI — Basic Vue Example

A minimal Vite + Vue 3 application demonstrating Stellar Vue UI integration with the "stellar" theme.

## What's Included

- Button (all variants and sizes)
- Card with header, content, and footer
- Input with Label
- Badge
- Separator
- Theme switcher using `useTheme`
- Dark mode toggle

## Setup

```bash
# From the monorepo root
pnpm install

# Run the dev server
cd apps/examples/basic-vue
pnpm dev
```

Or from the monorepo root with filtering:

```bash
pnpm --filter @stellar-vue-ui/example-basic-vue dev
```

## Build

```bash
pnpm build
```

## How It Works

The stellar theme is loaded in `src/main.ts` using the `generateCSS` function from `@stellar-vue-ui/theme`. The generated CSS variables are injected into the document `<head>` and the `data-theme` attribute is set on `<html>`.

Components are imported directly from `@stellar-vue-ui/core` and the `useTheme` composable manages runtime theme switching.
