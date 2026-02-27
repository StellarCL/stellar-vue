# Introduction

Stellar Vue UI is a modern, accessible, and themeable component library for Vue 3. It provides 32 production-ready component families and 14 composables, all built on top of [Radix Vue](https://www.radix-vue.com/) primitives and styled with [Tailwind CSS](https://tailwindcss.com/).

## Philosophy

Stellar Vue UI follows the copy-paste model popularized by shadcn/ui. You can install components via the CLI and they become part of your codebase — you own the code and can customize it freely. Alternatively, you can install the full `@stellar-vue-ui/core` package for a more traditional library experience.

### Core Principles

**Accessible by Default**
Every component is built on Radix Vue primitives, which provide battle-tested WAI-ARIA patterns. Keyboard navigation, focus management, and screen reader announcements work out of the box without any extra configuration.

**Themeable**
Stellar ships with 6 star-themed presets: Stellar (default), Sirius, Polaris, Antares, Vega, and Aldebaran. Each theme is a set of CSS custom properties that you can override, extend, or replace entirely. Switching themes at runtime takes a single function call.

**Composable Architecture**
Components are designed to be composed together. Rather than building monolithic components with dozens of props, Stellar breaks components into small, focused parts. A Dialog is composed of DialogTrigger, DialogContent, DialogHeader, and so on. This gives you full control over rendering and layout.

**TypeScript-First**
Every component, composable, and utility is written in TypeScript. Props interfaces are exported so you can extend them. Return types from composables are fully inferred. You get autocomplete and type checking everywhere.

**Tree-Shakeable**
Import only what you need. If you only use Button and Input, the rest of the library is excluded from your production bundle. Each component is individually exported with no side effects.

## What You Get

| Category | Count | Examples |
|----------|-------|---------|
| Component Families | 32 | Button, Dialog, DataTable, Wizard |
| Composables | 14 | useForm, useDisclosure, useFocusTrap |
| Theme Presets | 6 | Stellar, Sirius, Polaris, Antares, Vega, Aldebaran |
| Animation Presets | 17 | Fade, slide, scale, blur transitions |
| CLI Commands | 10 | init, add, update, remove, list, theme, info, deps, audit |

## Comparison

| Feature | Stellar Vue UI | shadcn-vue | Vuetify | PrimeVue |
|---------|---------------|------------|---------|----------|
| Copy-paste model | Yes | Yes | No | No |
| Radix Vue primitives | Yes | Yes | No | No |
| Theme presets | 6 built-in | 2 | Many | Many |
| Animation system | Built-in | Manual | Built-in | Built-in |
| CLI tool | Yes | Yes | No | No |
| TypeScript | Full | Full | Full | Partial |
| Tailwind CSS | v4 | v3/v4 | Custom | Custom |
| Tree-shaking | Full | Full | Partial | Partial |
| Form composables | Built-in | Manual | Built-in | Manual |

## Next Steps

- [Install Stellar Vue UI](/guide/installation) in your project
- Follow the [Quick Start](/guide/quickstart) guide to build your first page
- Browse the [Components](/components/button) library
- Learn about [Theming](/guide/theming) to customize the look and feel
