# BIBLE.md - stellar-vue-ui

> **Single Source of Truth**
> This document contains all definitive decisions, configurations, and standards for the stellar-vue-ui project.
> When in doubt, refer to this document. If something is not documented here, it should be added.

**Last Updated:** February 27, 2026
**Version:** 0.1.0
**Status:** Pre-release Development

---

## TABLE OF CONTENTS

1. [Project Identity](#1-project-identity)
2. [Repository Structure](#2-repository-structure)
3. [Technology Stack](#3-technology-stack)
4. [Package Configuration](#4-package-configuration)
5. [Development Workflow](#5-development-workflow)
6. [Component Standards](#6-component-standards)
7. [Styling System](#7-styling-system)
8. [Theme System](#8-theme-system)
9. [Testing Strategy](#9-testing-strategy)
10. [Documentation Standards](#10-documentation-standards)
11. [Release Process](#11-release-process)
12. [CLI Tool Specifications](#12-cli-tool-specifications)
13. [File Naming Conventions](#13-file-naming-conventions)
14. [Code Style Guide](#14-code-style-guide)
15. [Accessibility Requirements](#15-accessibility-requirements)
16. [Performance Budgets](#16-performance-budgets)
17. [Security Policies](#17-security-policies)
18. [Community Guidelines](#18-community-guidelines)

---

## 1. PROJECT IDENTITY

### 1.1 Core Information

**Project Name:** stellar-vue-ui
**Display Name:** Stellar Vue UI
**Tagline:** A modern, accessible component library for Vue 3 that you own
**Description:** Production-ready Vue 3 components built on Radix Vue with Tailwind CSS. Copy-paste components you own and control, with version management that actually works.

**Package Names:**
- Core: `@stellar-vue-ui/core`
- CLI: `@stellar-vue-ui/cli`
- Nuxt Module: `@stellar-vue-ui/nuxt`
- Test Utils: `@stellar-vue-ui/test-utils`
- Theme: `@stellar-vue-ui/theme`
- Animations: `@stellar-vue-ui/animations`

### 1.2 Ownership

**Organization:** StellarCL
**Author:** Terry McCann
**GitHub:** https://github.com/StellarCL/stellar-vue
**NPM Scope:** All packages under `@stellar-vue-ui/*` scope
**License:** MIT
**Copyright:** Copyright (c) 2026 Terry McCann

### 1.3 Repository URLs

**Main Repository:** https://github.com/StellarCL/stellar-vue.git
**Documentation:** https://stellar-vue-ui.dev (CloudFlare Pages)
**NPM Package:** https://www.npmjs.com/package/@stellar-vue-ui/core
**Issue Tracker:** https://github.com/StellarCL/stellar-vue/issues
**Discussions:** https://github.com/StellarCL/stellar-vue/discussions

### 1.4 Version Information

**Initial Version:** 0.1.0
**Versioning:** Semantic Versioning 2.0.0
**Release Cadence:** Minor releases every 3-4 months, patch releases as needed
**LTS Policy:** Major version supported for 18 months after next major release

### 1.5 Brand Colors

**Primary Brand:** `#667eea` (Stellar Purple)
**Secondary Brand:** `#764ba2` (Cosmic Purple)
**Accent:** `#f093fb` (Nova Pink)

### 1.6 Supported Frameworks

**Current:** Vue 3.6+ only
**Future:** Stellar Svelte UI (separate repo), Stellar React UI (separate repo)
**No Support:** Vue 2.x (end of life)

---

## 2. REPOSITORY STRUCTURE

### 2.1 Monorepo Layout

```
stellar-vue/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── release.yml
│   │   ├── docs-deploy.yml
│   │   └── ecosystem-ci.yml
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
│
├── packages/
│   ├── core/                           # Main component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   │   ├── Button.vue
│   │   │   │   │   ├── button.types.ts
│   │   │   │   │   ├── button.variants.ts
│   │   │   │   │   ├── button.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── [50+ other components]/
│   │   │   ├── composables/
│   │   │   │   ├── useDisclosure.ts
│   │   │   │   ├── useForm.ts
│   │   │   │   └── [20+ composables]/
│   │   │   ├── utils/
│   │   │   │   ├── cn.ts              # Class merger
│   │   │   │   ├── variants.ts        # Variant system
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── components.ts
│   │   │   │   └── global.d.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── README.md
│   │
│   ├── cli/                            # CLI tool
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── init.ts
│   │   │   │   ├── add.ts
│   │   │   │   ├── update.ts
│   │   │   │   ├── remove.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── theme.ts
│   │   │   │   ├── recipe.ts
│   │   │   │   ├── block.ts
│   │   │   │   ├── migrate.ts
│   │   │   │   └── audit.ts
│   │   │   ├── utils/
│   │   │   │   ├── registry.ts
│   │   │   │   ├── diff.ts
│   │   │   │   ├── git.ts
│   │   │   │   └── prompts.ts
│   │   │   ├── templates/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── nuxt/                           # Nuxt 4 module
│   │   ├── src/
│   │   │   ├── module.ts
│   │   │   ├── runtime/
│   │   │   │   ├── composables/
│   │   │   │   ├── components/
│   │   │   │   └── plugins/
│   │   │   └── types/
│   │   ├── package.json
│   │   └── playground/                # Test Nuxt app
│   │
│   ├── theme/                          # Theme system
│   │   ├── src/
│   │   │   ├── themes/
│   │   │   │   ├── stellar.ts         # Default theme
│   │   │   │   ├── sirius.ts
│   │   │   │   ├── polaris.ts
│   │   │   │   ├── antares.ts
│   │   │   │   ├── vega.ts
│   │   │   │   ├── aldebaran.ts
│   │   │   │   └── index.ts
│   │   │   ├── tokens/
│   │   │   ├── generator/
│   │   │   ├── validator/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── animations/                     # Animation system
│   │   ├── src/
│   │   │   ├── transitions/
│   │   │   ├── composables/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── test-utils/                     # Testing utilities
│       ├── src/
│       │   ├── wrappers/
│       │   ├── mocks/
│       │   ├── matchers/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── apps/
│   ├── docs/                           # VitePress documentation
│   │   ├── .vitepress/
│   │   │   ├── config.ts
│   │   │   ├── theme/
│   │   │   └── components/
│   │   ├── guide/
│   │   ├── components/
│   │   ├── examples/
│   │   ├── recipes/
│   │   ├── blocks/
│   │   └── index.md
│   │
│   ├── playground/                     # Interactive playground
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── examples/                       # Example projects
│       ├── basic-vue/
│       ├── nuxt-app/
│       └── vite-ts/
│
├── tooling/
│   ├── eslint-config/
│   │   ├── index.js
│   │   └── package.json
│   ├── tsconfig/
│   │   ├── base.json
│   │   ├── vue.json
│   │   ├── nuxt.json
│   │   └── package.json
│   └── prettier-config/
│       ├── index.js
│       └── package.json
│
├── tests/
│   ├── unit/                           # Shared unit tests
│   ├── integration/                    # Integration tests
│   ├── e2e/                           # Playwright E2E tests
│   └── a11y/                          # Accessibility tests
│
├── scripts/
│   ├── build.ts
│   ├── release.ts
│   ├── generate-component.ts
│   └── sync-versions.ts
│
├── .changeset/                         # Changesets for releases
├── .husky/                            # Git hooks
├── pnpm-workspace.yaml
├── package.json                        # Root package
├── tsconfig.json                       # Root TS config
├── turbo.json                         # Turborepo config
├── .gitignore
├── .npmrc
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── BIBLE.md                           # This file
└── TECHNICAL_SPEC.md                  # Technical specification
```

### 2.2 Monorepo Tool

**Tool:** Turborepo
**Why:** Superior caching, great DX, works perfectly with pnpm workspaces
**Alternatives Considered:** Nx (too complex), pnpm workspaces only (no caching)

**Configuration File:** `turbo.json`

---

## 3. TECHNOLOGY STACK

### 3.1 Core Dependencies

**Runtime Framework:**
- Vue: `^3.6.0`
- Radix Vue: `^1.9.0`

**Build Tools:**
- Vite: `^6.0.0`
- TypeScript: `^5.8.0`
- Turborepo: `^2.0.0`

**Styling:**
- Tailwind CSS: `^4.2.0`
- @tailwindcss/vite: `^4.2.0`

**Testing:**
- Vitest: `^3.0.0`
- Playwright: `^1.50.0`
- @testing-library/vue: `^8.0.0`
- axe-playwright: `latest`

**Form Validation:**
- VeeValidate: `^4.14.0`
- Zod: `^3.23.0` (for schema validation)

**Utilities:**
- @vueuse/core: `^11.0.0`
- clsx: `^2.1.0`
- tailwind-merge: `^2.5.0`

### 3.2 Development Dependencies

**Code Quality:**
- ESLint: `^9.0.0`
- @antfu/eslint-config: `^3.0.0` (opinionated but excellent)
- Prettier: `^3.3.0`
- TypeScript-ESLint: `^8.0.0`

**Git Hooks:**
- Husky: `^9.0.0`
- lint-staged: `^15.0.0`

**Changesets:**
- @changesets/cli: `^2.27.0`

**Documentation:**
- VitePress: `^1.5.0`

### 3.3 Peer Dependencies

Components will have these as peer dependencies:
- vue: `>=3.6.0`
- @vueuse/core: `>=11.0.0`

### 3.4 Icon Library

**Default:** Lucide Vue
**Package:** `lucide-vue-next`
**Why:**
- Most comprehensive icon set
- Perfect Tailwind integration
- Tree-shakeable
- Active maintenance
- 1400+ icons

**Supported Alternatives:**
- Heroicons (via user import)
- Phosphor (via user import)
- Custom SVGs

---

## 4. PACKAGE CONFIGURATION

### 4.1 Root package.json

```json
{
  "name": "stellar-vue-ui-monorepo",
  "version": "0.1.0",
  "private": true,
  "description": "Monorepo for Stellar Vue UI component library",
  "author": "Terry McCann <terry@stellarcl.dev>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/StellarCL/stellar-vue.git"
  },
  "homepage": "https://stellar-vue-ui.dev",
  "bugs": {
    "url": "https://github.com/StellarCL/stellar-vue/issues"
  },
  "keywords": [
    "vue",
    "vue3",
    "components",
    "ui",
    "tailwind",
    "radix-vue",
    "accessible",
    "typescript",
    "nuxt"
  ],
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@9.14.2",
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "test:unit": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "typecheck": "turbo typecheck",
    "clean": "turbo clean && rm -rf node_modules",
    "prepare": "husky install",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "turbo build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "@antfu/eslint-config": "^3.0.0",
    "eslint": "^9.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.3.0",
    "turbo": "^2.0.0",
    "typescript": "^5.8.0",
    "vitest": "^3.0.0",
    "@playwright/test": "^1.50.0"
  }
}
```

### 4.2 Core Package Configuration

**Package Name:** `@stellar-vue-ui/core`

```json
{
  "name": "@stellar-vue-ui/core",
  "version": "0.1.0",
  "description": "Production-ready Vue 3 components built on Radix Vue with Tailwind CSS",
  "author": "Terry McCann <terry@stellarcl.dev>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/StellarCL/stellar-vue.git",
    "directory": "packages/core"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./components/*": {
      "types": "./dist/components/*/index.d.ts",
      "import": "./dist/components/*/index.mjs",
      "require": "./dist/components/*/index.cjs"
    },
    "./composables/*": {
      "types": "./dist/composables/*.d.ts",
      "import": "./dist/composables/*.mjs"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.mjs"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": false,
  "peerDependencies": {
    "vue": ">=3.6.0",
    "@vueuse/core": ">=11.0.0"
  },
  "dependencies": {
    "radix-vue": "^1.9.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  }
}
```

### 4.3 CLI Package Configuration

**Package Name:** `@stellar-vue-ui/cli`

```json
{
  "name": "@stellar-vue-ui/cli",
  "version": "0.1.0",
  "description": "CLI tool for Stellar Vue UI",
  "author": "Terry McCann <terry@stellarcl.dev>",
  "license": "MIT",
  "bin": {
    "stellar-ui": "./dist/index.cjs"
  },
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "templates"
  ],
  "dependencies": {
    "commander": "^12.0.0",
    "prompts": "^2.4.2",
    "picocolors": "^1.1.0",
    "ora": "^8.0.0",
    "execa": "^9.0.0",
    "fast-glob": "^3.3.0",
    "diff": "^5.2.0"
  }
}
```

---

## 5. DEVELOPMENT WORKFLOW

### 5.1 Branch Strategy

**Main Branches:**
- `main` - Production-ready code, protected
- `develop` - Integration branch for features
- `docs` - Documentation updates (auto-deploys to staging)

**Feature Branches:**
- `feature/component-name` - New components
- `feature/cli-command` - CLI features
- `fix/issue-number` - Bug fixes
- `refactor/scope` - Code improvements
- `docs/topic` - Documentation updates

**Naming Convention:**
```
<type>/<scope>-<brief-description>

Examples:
feature/button-component
fix/123-dropdown-keyboard-nav
refactor/variants-system
docs/installation-guide
```

### 5.2 Commit Message Convention

**Format:** Conventional Commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, missing semi-colons, etc)
- `refactor` - Code refactor
- `perf` - Performance improvement
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Revert previous commit

**Scopes:**
- `core` - Core package
- `cli` - CLI tool
- `nuxt` - Nuxt module
- `docs` - Documentation
- `theme` - Theme system
- `animations` - Animation system
- `test-utils` - Testing utilities
- Component names (e.g., `button`, `dialog`, `table`)

**Examples:**
```
feat(button): add loading state variant
fix(cli): resolve dependency conflict on Windows
docs(installation): add Nuxt 4 setup guide
refactor(theme): simplify color token generation
test(dialog): add keyboard navigation tests
```

### 5.3 Pull Request Process

1. **Create Feature Branch** from `develop`
2. **Make Changes** with atomic commits
3. **Add Tests** (required for components)
4. **Update Docs** if user-facing changes
5. **Run Checks Locally:**
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```
6. **Create PR** to `develop` with template
7. **Address Review** feedback
8. **Squash and Merge** after approval

**PR Title Format:**
```
<type>(<scope>): <description>

Example:
feat(data-table): add server-side pagination
```

### 5.4 Code Review Requirements

**Required Approvals:** 1 maintainer
**Required Checks:**
- ✅ Lint passes
- ✅ Type check passes
- ✅ Tests pass (>80% coverage for new code)
- ✅ Build succeeds
- ✅ No merge conflicts

**Review Checklist:**
- [ ] Follows component standards
- [ ] Includes tests
- [ ] Documentation updated
- [ ] Accessibility verified
- [ ] TypeScript types complete
- [ ] No console.logs or debugger statements
- [ ] Commit messages follow convention

### 5.5 Local Development Setup

```bash
# Clone repository
git clone https://github.com/StellarCL/stellar-vue.git
cd stellar-vue

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build
```

**IDE Setup:**
- VS Code (recommended)
- Extensions:
  - Vue - Official
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

---

## 6. COMPONENT STANDARDS

### 6.1 Component File Structure

Every component must follow this structure:

```
component-name/
├── ComponentName.vue           # Main component file
├── component-name.types.ts     # TypeScript types & interfaces
├── component-name.variants.ts  # Variant definitions (if applicable)
├── component-name.test.ts      # Unit tests (required)
├── useComponentName.ts         # Composable (if complex logic)
└── index.ts                    # Public exports
```

### 6.2 Component Template

**ComponentName.vue:**
```vue
<script setup lang="ts">
import type { ComponentNameProps } from './component-name.types'
import { computed } from 'vue'
import { cn } from '@/utils'
import { componentNameVariants } from './component-name.variants'

// Props with defaults
const props = withDefaults(defineProps<ComponentNameProps>(), {
  variant: 'default',
  size: 'md',
})

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent]
  change: [value: string]
}>()

// Computed classes
const classes = computed(() =>
  cn(
    componentNameVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class
  )
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

**component-name.types.ts:**
```typescript
import type { HTMLAttributes } from 'vue'

export interface ComponentNameProps {
  /**
   * Visual variant of the component
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'destructive'

  /**
   * Size of the component
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean
}

export interface ComponentNameEmits {
  /** Fired when component is clicked */
  click: [event: MouseEvent]
  /** Fired when value changes */
  change: [value: string]
}
```

**component-name.variants.ts:**
```typescript
import { cva, type VariantProps } from 'class-variance-authority'

export const componentNameVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export type ComponentNameVariants = VariantProps<typeof componentNameVariants>
```

**index.ts:**
```typescript
export * from './component-name.types'
export * from './component-name.variants'
export { default as ComponentName } from './ComponentName.vue'
export { default as useComponentName } from './useComponentName'
```

### 6.3 Component Requirements Checklist

Every component MUST have:

- [ ] **TypeScript types** with JSDoc comments
- [ ] **Variants system** for visual variations
- [ ] **Accessibility** - ARIA attributes, keyboard navigation
- [ ] **Unit tests** with >80% coverage
- [ ] **Slots** for composition where appropriate
- [ ] **v-model support** for form inputs
- [ ] **Disabled state** handling
- [ ] **Loading state** (if async operations)
- [ ] **Error state** (if validation needed)
- [ ] **Dark mode** support via Tailwind classes
- [ ] **Responsive** behavior where needed
- [ ] **Documentation** with examples
- [ ] **Storybook story** (optional but recommended)

### 6.4 Composable Standards

**Naming:** `use<Name>.ts` (e.g., `useDisclosure.ts`)

**Structure:**
```typescript
import { computed, ref } from 'vue'

export interface UseDisclosureOptions {
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const isOpen = ref(options.defaultOpen ?? false)

  function open() {
    isOpen.value = true
    options.onOpen?.()
  }

  function close() {
    isOpen.value = false
    options.onClose?.()
  }

  function toggle() {
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

## 7. STYLING SYSTEM

### 7.1 Tailwind Configuration

**File:** `tailwind.config.ts` (in each app/package as needed)

**CSS File:** `app.css`

```css
@import "tailwindcss";

@theme {
  /* Color system using CSS variables */
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

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(9% 0.03 285.82);
    --color-foreground: oklch(98% 0 0);
    /* ... rest of dark colors ... */
  }
}

/* Or class-based dark mode */
.dark {
  @theme {
    --color-background: oklch(9% 0.03 285.82);
    --color-foreground: oklch(98% 0 0);
    /* ... rest of dark colors ... */
  }
}
```

### 7.2 Utility Functions

**File:** `packages/core/src/utils/cn.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 7.3 Styling Rules

**DO:**
- ✅ Use Tailwind utility classes
- ✅ Use semantic color tokens (e.g., `bg-primary`)
- ✅ Use the `cn()` utility for class merging
- ✅ Follow mobile-first responsive design
- ✅ Use CSS variables from theme
- ✅ Support dark mode via `dark:` classes

**DON'T:**
- ❌ Write custom CSS in components
- ❌ Use inline styles
- ❌ Use arbitrary values unless absolutely necessary
- ❌ Use hard-coded colors (e.g., `bg-blue-500`)
- ❌ Create global CSS files (except theme)

---

## 8. THEME SYSTEM

### 8.1 Built-in Themes

**Required Themes (Ship with v0.1.0):**

1. **Stellar** (default) - Purple/cosmic theme, brand colors
2. **Sirius** - Bright blue theme
3. **Polaris** - Cool neutral theme
4. **Antares** - Warm red/orange theme
5. **Vega** - Green/teal theme
6. **Aldebaran** - Amber/gold theme

**Theme File Structure:**
```typescript
// packages/theme/src/themes/stellar.ts
import { defineTheme } from '../generator'

export const stellar = defineTheme({
  name: 'Stellar',
  type: 'dark',
  colors: {
    primary: {
      DEFAULT: 'oklch(58.42% 0.187 285.82)',
      foreground: 'oklch(98% 0 0)',
    },
    // ... all semantic colors
  },
  borderRadius: {
    DEFAULT: '0.5rem',
    lg: '0.75rem',
  },
})
```

### 8.2 Theme Generator

**API:**
```typescript
import { generateTheme } from '@stellar-vue-ui/theme'

const myTheme = generateTheme({
  name: 'My Theme',
  brandColor: '#667eea',
  type: 'light',
})
```

### 8.3 Theme Switching

**Composable:**
```typescript
import { useTheme } from 'stellar-vue-ui'

const { theme, setTheme, themes } = useTheme()

// Switch theme
setTheme('sirius')

// Get current theme
console.log(theme.value) // 'sirius'

// List all themes
console.log(themes.value) // ['stellar', 'sirius', ...]
```

---

## 9. TESTING STRATEGY

### 9.1 Testing Pyramid

**Unit Tests (70%)** - Vitest
- All components
- All composables
- All utilities
- Target: >80% coverage

**Integration Tests (20%)** - Vitest
- Component interactions
- Form flows
- Complex compositions

**E2E Tests (10%)** - Playwright
- Critical user journeys
- Accessibility
- Cross-browser compatibility

### 9.2 Unit Test Template

```typescript
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies variant classes', () => {
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

### 9.3 Accessibility Testing

Every component must pass:
- ✅ axe-core automated checks
- ✅ Keyboard navigation tests
- ✅ Screen reader compatibility
- ✅ Color contrast (WCAG AA minimum)

**Example:**
```typescript
import { checkA11y, injectAxe } from 'axe-playwright'

test('Button is accessible', async ({ page }) => {
  await page.goto('/components/button')
  await injectAxe(page)
  await checkA11y(page)
})
```

### 9.4 Test Coverage Requirements

**Minimum Coverage:**
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

**Exemptions:**
- Type definition files
- Config files
- Build scripts

---

## 10. DOCUMENTATION STANDARDS

### 10.1 Documentation Structure

```
apps/docs/
├── .vitepress/
│   └── config.ts
├── index.md                    # Homepage
├── guide/
│   ├── introduction.md
│   ├── installation.md
│   ├── quickstart.md
│   ├── theming.md
│   ├── dark-mode.md
│   ├── accessibility.md
│   ├── cli.md
│   └── migration.md
├── components/
│   ├── button.md
│   ├── input.md
│   └── [all components]/
├── composables/
│   ├── use-disclosure.md
│   ├── use-form.md
│   └── [all composables]/
├── recipes/
│   ├── data-table-with-filters.md
│   ├── multi-step-wizard.md
│   └── [all recipes]/
├── blocks/
│   ├── hero-sections.md
│   ├── pricing-tables.md
│   └── [all block categories]/
└── api/
    ├── types.md
    ├── utilities.md
    └── configuration.md
```

### 10.2 Component Documentation Template

**File:** `apps/docs/components/button.md`

```markdown
# Button

A versatile button component with multiple variants, sizes, and states.

## Installation

```bash
npx stellar-ui add button
```

## Usage

```vue
<script setup lang="ts">
import { Button } from 'stellar-vue-ui'
</script>

<template>
  <Button>Click me</Button>
</template>
```

## Examples

### Variants

<ComponentPreview>
  <Button variant="default">Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
</ComponentPreview>

### Sizes

<ComponentPreview>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</ComponentPreview>

### With Icon

<ComponentPreview>
  <Button>
    <IconPlus class="mr-2 h-4 w-4" />
    Add Item
  </Button>
</ComponentPreview>

### Loading State

<ComponentPreview>
  <Button :loading="true">Loading...</Button>
</ComponentPreview>

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'destructive'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of button |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `loading` | `boolean` | `false` | Show loading state |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when button is clicked |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button content |

## Accessibility

- Keyboard: `Space` or `Enter` to activate
- ARIA: `role="button"` automatically applied
- Screen readers: Content is announced
- Focus: Visible focus ring on keyboard navigation

## Related

- [Icon Button](/components/icon-button)
- [Button Group](/components/button-group)
```

### 10.3 Code Comments

**JSDoc Required For:**
- All public functions
- All component props
- All composable parameters
- All exported types

**Example:**
```typescript
/**
 * Merges CSS classes using clsx and tailwind-merge
 *
 * @param inputs - Class values to merge
 * @returns Merged class string with Tailwind conflicts resolved
 *
 * @example
 * ```ts
 * cn('px-4 py-2', 'px-6') // 'px-6 py-2'
 * cn('text-red-500', someCondition && 'text-blue-500')
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 11. RELEASE PROCESS

### 11.1 Versioning Strategy

**Semantic Versioning:** MAJOR.MINOR.PATCH

**Version Increments:**
- **PATCH** (0.1.0 → 0.1.1): Bug fixes, minor improvements
- **MINOR** (0.1.0 → 0.2.0): New features, backwards compatible
- **MAJOR** (0.1.0 → 1.0.0): Breaking changes

**Pre-release Versions:**
- Alpha: `0.1.0-alpha.1` (internal testing)
- Beta: `0.1.0-beta.1` (public testing)
- RC: `0.1.0-rc.1` (release candidate)

### 11.2 Release Checklist

**Before Release:**
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped via changesets
- [ ] Build successful
- [ ] No security vulnerabilities
- [ ] License headers present

**Release Process:**
```bash
# 1. Create changesets for changes
pnpm changeset

# 2. Version packages
pnpm changeset version

# 3. Build all packages
pnpm build

# 4. Run final tests
pnpm test

# 5. Publish to npm
pnpm changeset publish

# 6. Push tags
git push --follow-tags

# 7. Create GitHub release
```

### 11.3 Changelog Format

**File:** `CHANGELOG.md`

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature description

### Changed
- Changed feature description

### Deprecated
- Deprecated feature description

### Removed
- Removed feature description

### Fixed
- Bug fix description

### Security
- Security fix description

## [0.1.0] - 2026-03-15

### Added
- Initial release
- 15 core components
- CLI tool
- Theme system
```

### 11.4 Release Cadence

**Minor Releases:** Every 3-4 months
**Patch Releases:** As needed (typically weekly)
**Major Releases:** Once per year

**Release Schedule:**
- v0.1.0: March 2026 (MVP)
- v0.2.0: June 2026 (30 components)
- v0.3.0: September 2026 (50 components)
- v1.0.0: December 2026 (stable)

---

## 12. CLI TOOL SPECIFICATIONS

### 12.1 CLI Commands

All commands use the binary name `stellar-ui`:

```bash
# Initialize project
npx stellar-ui init

# Add component(s)
npx stellar-ui add button
npx stellar-ui add button input card

# Update component
npx stellar-ui update button
npx stellar-ui update --all

# Remove component
npx stellar-ui remove button

# List components
npx stellar-ui list
npx stellar-ui list --installed

# Component info
npx stellar-ui info button

# Add recipe (composition pattern)
npx stellar-ui recipe add data-table-with-filters

# Add block (UI section)
npx stellar-ui block add hero-gradient

# Add template (full page)
npx stellar-ui template add saas-landing

# Theme management
npx stellar-ui theme create
npx stellar-ui theme list
npx stellar-ui theme apply sirius

# Migration
npx stellar-ui migrate from shadcn-vue
npx stellar-ui migrate check

# Audit
npx stellar-ui audit
npx stellar-ui audit --contrast
npx stellar-ui audit --keyboard

# Dependencies
npx stellar-ui deps
npx stellar-ui deps --update
```

### 12.2 Configuration File

**File:** `stellar-ui.config.ts`

```typescript
import { defineConfig } from 'stellar-vue-ui-cli'

export default defineConfig({
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

  // TypeScript
  typescript: true,

  // Aliases
  aliases: {
    '@': './src',
    '~': './',
  },

  // Framework
  framework: 'nuxt', // or 'vue'

  // Features
  features: {
    animations: true,
    forms: true,
    icons: 'lucide',
  },
})
```

### 12.3 Component Registry

**File:** `components.lock.json` (auto-generated)

```json
{
  "version": "1.0.0",
  "components": {
    "button": {
      "version": "0.1.0",
      "installedAt": "2026-02-27T10:30:00.000Z",
      "customized": false,
      "files": [
        "components/ui/button/Button.vue",
        "components/ui/button/button.types.ts",
        "components/ui/button/button.variants.ts",
        "components/ui/button/index.ts"
      ],
      "dependencies": {
        "radix-vue": "^1.9.0"
      }
    }
  }
}
```

---

## 13. FILE NAMING CONVENTIONS

### 13.1 Vue Components

**Format:** PascalCase

```
Button.vue
DataTable.vue
MultiStepWizard.vue
```

### 13.2 TypeScript Files

**Format:** kebab-case (except types/interfaces)

```
button.types.ts
button.variants.ts
use-disclosure.ts
cn.ts
```

**Types/Interfaces:** PascalCase within files
```typescript
export interface ButtonProps { }
export type ButtonVariant = 'default' | 'primary'
```

### 13.3 Test Files

**Format:** Same as source file + `.test.ts`

```
Button.test.ts
use-disclosure.test.ts
cn.test.ts
```

### 13.4 Documentation Files

**Format:** kebab-case.md

```
button.md
getting-started.md
multi-step-forms.md
```

### 13.5 Directory Names

**Format:** kebab-case

```
components/
composables/
button/
data-table/
multi-step-wizard/
```

---

## 14. CODE STYLE GUIDE

### 14.1 TypeScript

**Rules:**
- ✅ Use `type` for simple types, `interface` for objects
- ✅ Prefer `const` over `let`, never `var`
- ✅ Use arrow functions for methods
- ✅ Use template literals for string concatenation
- ✅ Use optional chaining (`?.`) and nullish coalescing (`??`)
- ✅ Explicit return types on exported functions
- ✅ No `any` types (use `unknown` if needed)

**Example:**
```typescript
// Good
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Bad
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

### 14.2 Vue

**Rules:**
- ✅ Use `<script setup>` syntax
- ✅ Use Composition API
- ✅ Use `defineProps` with TypeScript
- ✅ Use `defineEmits` with TypeScript
- ✅ Use `computed` for derived state
- ✅ Use `ref` for reactive primitives
- ✅ Use `reactive` for objects (sparingly)
- ✅ Use `v-bind` shorthand (`:`)
- ✅ Use `v-on` shorthand (`@`)

**Example:**
```vue
<script setup lang="ts">
// Good
import { computed } from 'vue'

interface Props {
  count: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  increment: []
}>()

const doubled = computed(() => props.count * 2)
</script>
```

### 14.3 CSS/Tailwind

**Rules:**
- ✅ Use Tailwind utilities
- ✅ Use semantic color tokens
- ✅ Use responsive prefixes (`sm:`, `md:`, `lg:`)
- ✅ Use dark mode prefix (`dark:`)
- ✅ Group related classes
- ✅ Use `cn()` for conditional classes

**Example:**
```vue
<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center',
      'rounded-md font-medium',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'bg-primary text-primary-foreground hover:bg-primary/90',
      props.class,
    )"
  >
    <slot />
  </button>
</template>
```

### 14.4 Imports

**Order:**
1. Vue imports
2. Third-party imports
3. Internal imports (components, composables, utils)
4. Types
5. CSS

```typescript
// 4. Types
import type { ButtonProps } from './button.types'

// 1. Vue
import { computed, onMounted, ref } from 'vue'
// 2. Third-party
import { useRouter } from 'vue-router'

import { z } from 'zod'
// 3. Internal
import Button from '@/components/ui/button/Button.vue'
import { useDisclosure } from '@/composables'

import { cn } from '@/utils'

// 5. CSS (rarely needed)
import './styles.css'
```

---

## 15. ACCESSIBILITY REQUIREMENTS

### 15.1 WCAG Compliance

**Level:** WCAG 2.1 Level AA (minimum)
**Target:** WCAG 2.1 Level AAA where possible

### 15.2 Keyboard Navigation

All interactive components must support:
- `Tab` - Move focus forward
- `Shift + Tab` - Move focus backward
- `Enter` - Activate button/link
- `Space` - Activate button/checkbox
- `Escape` - Close dialog/dropdown
- `Arrow keys` - Navigate within composite widgets

### 15.3 Screen Reader Support

- ✅ Meaningful labels
- ✅ ARIA attributes where needed
- ✅ Live regions for dynamic content
- ✅ Status messages announced
- ✅ Form errors announced
- ✅ Landmark regions

### 15.4 Color Contrast

**Minimum Ratios:**
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1
- Graphical objects: 3:1

**Tool:** Use theme validator to check all color combinations

### 15.5 Focus Indicators

All focusable elements must have:
- Visible focus ring (2px minimum)
- High contrast outline
- No removal of focus styles

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

---

## 16. PERFORMANCE BUDGETS

### 16.1 Bundle Size

**Core Package:**
- Uncompressed: < 200KB
- Gzipped: < 50KB
- Individual component: < 5KB (gzipped)

**Full Library (all components):**
- Uncompressed: < 500KB
- Gzipped: < 100KB

### 16.2 Runtime Performance

**Component Render:**
- First render: < 16ms (60fps)
- Re-render: < 8ms (120fps)

**Interaction:**
- Click response: < 100ms
- Keyboard response: < 50ms

### 16.3 Tree-Shaking

All components must be individually importable and tree-shakeable:

```typescript
// Good - only imports Button
import { Button } from 'stellar-vue-ui'

// Also good - explicit import
import Button from 'stellar-vue-ui/components/button'
```

---

## 17. SECURITY POLICIES

### 17.1 Vulnerability Reporting

**Contact:** security@stellarcl.dev
**Response Time:** 48 hours
**Disclosure:** Coordinated disclosure policy

### 17.2 Dependencies

**Audit Frequency:** Weekly
**Tool:** `pnpm audit`
**Action:** Critical/High vulnerabilities must be patched within 7 days

### 17.3 Code Security

**Rules:**
- ❌ No eval() or Function()
- ❌ No innerHTML (use textContent or v-html with sanitization)
- ❌ No external scripts without SRI
- ✅ Sanitize user input
- ✅ Validate all props
- ✅ Use TypeScript strict mode

---

## 18. COMMUNITY GUIDELINES

### 18.1 Code of Conduct

**Standards:**
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints
- No harassment, discrimination, or trolling

**Enforcement:**
- Warning for first offense
- Temporary ban for repeated offenses
- Permanent ban for severe violations

### 18.2 Contributing

**Ways to Contribute:**
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Help others in discussions
- Create themes
- Share examples

**Recognition:**
- Contributors list in README
- "Contributor" badge in discussions
- Mention in release notes

### 18.3 Support Channels

**GitHub Issues:** Bug reports and feature requests
**GitHub Discussions:** Questions, ideas, showcases
**Discord:** Real-time chat (to be created)
**Twitter/X:** @StellarVueUI (announcements)

---

## APPENDIX A: COMPONENT CHECKLIST

### Pre-Development
- [ ] Component spec written
- [ ] Design reviewed
- [ ] Radix Vue primitive identified (if applicable)
- [ ] Accessibility requirements defined

### Development
- [ ] Component.vue created
- [ ] Types defined
- [ ] Variants defined
- [ ] Composable created (if needed)
- [ ] Tests written (>80% coverage)
- [ ] Accessibility verified

### Documentation
- [ ] Component docs written
- [ ] Examples added
- [ ] API reference complete
- [ ] Accessibility notes added

### Review
- [ ] Code review passed
- [ ] Tests passing
- [ ] Lint/type check passing
- [ ] Accessibility audit passed
- [ ] Documentation reviewed

### Release
- [ ] Changeset created
- [ ] Version bumped
- [ ] Published to npm
- [ ] Docs deployed
- [ ] Announcement posted

---

## APPENDIX B: COMMAND REFERENCE

### Development
```bash
pnpm dev              # Start all dev servers
pnpm build            # Build all packages
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix linting issues
pnpm typecheck        # Check TypeScript types
pnpm format           # Format code with Prettier
pnpm clean            # Clean build artifacts
```

### Package Management
```bash
pnpm install          # Install dependencies
pnpm add <pkg>        # Add dependency
pnpm add -D <pkg>     # Add dev dependency
pnpm remove <pkg>     # Remove dependency
pnpm update           # Update dependencies
```

### Release
```bash
pnpm changeset        # Create changeset
pnpm changeset version # Bump versions
pnpm release          # Publish to npm
```

### Git
```bash
git add .
git commit -m "feat(button): add loading state"
git push origin feature/button-loading
```

---

## APPENDIX C: USEFUL LINKS

**Official:**
- Repository: https://github.com/StellarCL/stellar-vue
- Documentation: https://stellar-vue-ui.dev
- NPM: https://npmjs.com/package/stellar-vue-ui

**Dependencies:**
- Vue: https://vuejs.org
- Radix Vue: https://radix-vue.com
- Tailwind v4: https://tailwindcss.com/docs/v4-beta
- Vite: https://vite.dev
- VitePress: https://vitepress.dev
- Vitest: https://vitest.dev

**Tools:**
- Turborepo: https://turbo.build
- Changesets: https://github.com/changesets/changesets
- Playwright: https://playwright.dev

**Standards:**
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- Semantic Versioning: https://semver.org
- Conventional Commits: https://conventionalcommits.org

---

## DOCUMENT HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-27 | Terry McCann | Initial creation |

---

**END OF BIBLE.md**
