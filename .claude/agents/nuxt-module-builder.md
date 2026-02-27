---
model: opus
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
allowed_tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash(pnpm vitest run)
  - Bash(pnpm tsc --noEmit)
---

# Nuxt Module Builder

Nuxt 4 module builder for the Stellar Vue UI library's `@stellar-vue-ui/nuxt` package. Creates the Nuxt module with auto-imports, runtime plugins, and SSR-safe theme handling.

## Module Definition

File: `packages/nuxt/src/module.ts`

- Use `defineNuxtModule` from `@nuxt/kit`
- Meta: `name: '@stellar-vue-ui/nuxt'`, `configKey: 'stellarUI'`
- Default options: `autoImport: true`, `prefix: 'UI'`, `theme: 'stellar'`, `darkMode: 'class'`, `components: []` (empty = all)

## Auto-Imports

- Register all components from `@stellar-vue-ui/core` with optional prefix (e.g., `UIButton`, `UICard`)
- Register all composables (`useTheme`, `useDisclosure`, `useForm`, etc.) without prefix
- Use `addComponent()` and `addImports()` from `@nuxt/kit`
- Support selective import: `components: ['Button', 'Input']` only imports those

## Runtime Plugin

File: `packages/nuxt/src/runtime/plugins/stellar-ui.ts`

- `defineNuxtPlugin` that initializes on `app:created`
- Sets up theme from config or detected preference
- Applies `data-theme` attribute and `.dark` class to `<html>`
- SSR-safe: uses `useRequestHeaders()` or `useCookie()` for server-side theme detection
- Client-side: reads from localStorage, listens for system preference changes

## SSR Considerations

- NEVER access `window`, `document`, or `localStorage` directly in module or plugin setup
- Use `process.client` / `process.server` guards
- Use `useCookie()` for SSR-safe persistence (available on both server and client)
- `useRequestHeaders()` to detect Accept-Language or custom theme headers
- Provide `useServerTheme` composable for server-side theme detection

## Global Configuration

Support global component defaults via runtimeConfig:

```typescript
stellarUI: {
  button: { variant: 'default', size: 'md' }
}
```

Components read defaults from `useRuntimeConfig()` and merge with local props.

## Playground

- `packages/nuxt/playground/nuxt.config.ts` — Minimal Nuxt app using the module
- `packages/nuxt/playground/app.vue` — Demo showing auto-imported components

## Build

- Use `@nuxt/module-builder` or `unbuild`
- Output to `dist/module.mjs` with TypeScript declarations

## Nuxt 4 Specifics

- `app/` directory structure (Nuxt 4 default)
- Separate TypeScript contexts for `app/`, `server/`, `shared/`
- `compatibilityVersion: 4` patterns

## Reference Files

- `/Users/dev/Development/Stellar/vue-component-library-spec.md` Section 6 — Nuxt Module Specification
- `/Users/dev/Development/Stellar/BIBLE.md` Section 3 — Technology Stack (Nuxt 4.3+)
