# Contributing to Stellar Vue UI

Thank you for your interest in contributing to Stellar Vue UI! This document outlines the process for contributing to this project.

## Table of Contents

- [Development Setup](#development-setup)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Component Development Checklist](#component-development-checklist)

---

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Getting Started

```bash
# Clone the repository
git clone https://github.com/StellarCL/stellar-vue.git
cd stellar-vue

# Install dependencies
pnpm install

# Start development
pnpm dev
```

### Additional Commands

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run E2E tests
pnpm test:e2e

# Lint the codebase
pnpm lint

# Fix lint issues
pnpm lint:fix

# Format code
pnpm format

# Type check
pnpm typecheck

# Build all packages
pnpm build
```

### Recommended IDE Setup

- **Editor:** VS Code
- **Extensions:**
  - Vue - Official
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

---

## Branch Naming Convention

Branches must follow this format:

```
<type>/<scope>-<brief-description>
```

### Types

| Type        | Purpose                                   |
| ----------- | ----------------------------------------- |
| `feature/`  | New components or features                |
| `fix/`      | Bug fixes                                 |
| `refactor/` | Code improvements without behavior change |
| `docs/`     | Documentation updates                     |

### Examples

```
feature/button-component
fix/123-dropdown-keyboard-nav
refactor/variants-system
docs/installation-guide
feature/cli-add-command
fix/456-dialog-focus-trap
```

---

## Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `feat`     | New feature                                                |
| `fix`      | Bug fix                                                    |
| `docs`     | Documentation only changes                                 |
| `style`    | Code style changes (formatting, missing semi-colons, etc.) |
| `refactor` | Code refactor without feature or bug changes               |
| `perf`     | Performance improvement                                    |
| `test`     | Adding or updating tests                                   |
| `chore`    | Maintenance tasks                                          |
| `ci`       | CI/CD configuration changes                                |
| `build`    | Build system changes                                       |
| `revert`   | Revert a previous commit                                   |

### Scopes

| Scope           | Description                                      |
| --------------- | ------------------------------------------------ |
| `core`          | Core package (`@stellar-vue-ui/core`)            |
| `cli`           | CLI tool (`@stellar-vue-ui/cli`)                 |
| `nuxt`          | Nuxt module (`@stellar-vue-ui/nuxt`)             |
| `docs`          | Documentation site                               |
| `theme`         | Theme system (`@stellar-vue-ui/theme`)           |
| `animations`    | Animation system (`@stellar-vue-ui/animations`)  |
| `test-utils`    | Testing utilities (`@stellar-vue-ui/test-utils`) |
| Component names | e.g., `button`, `dialog`, `table`, `input`       |

### Examples

```
feat(button): add loading state variant
fix(cli): resolve dependency conflict on Windows
docs(installation): add Nuxt 4 setup guide
refactor(theme): simplify color token generation
test(dialog): add keyboard navigation tests
perf(core): reduce bundle size with tree-shaking improvements
chore: update dependencies to latest versions
ci: add ecosystem compatibility tests
```

### Breaking Changes

For breaking changes, add `!` after the type/scope or include a `BREAKING CHANGE:` footer:

```
feat(core)!: drop Vue 3.5 and below support

BREAKING CHANGE: Vue 3.6+ is now required as a minimum peer dependency.
```

---

## Pull Request Process

### Steps

1. **Create a feature branch** from `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** using atomic commits that follow the commit convention above.

3. **Add tests** - Tests are required for all component changes. New code must maintain >80% coverage.

4. **Update documentation** for any user-facing changes.

5. **Run all checks locally** before opening a PR:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

6. **Create a PR** targeting the `develop` branch using the PR template. Follow the PR title format:

   ```
   <type>(<scope>): <description>

   Examples:
   feat(data-table): add server-side pagination
   fix(combobox): correct keyboard navigation in virtualized list
   ```

7. **Address review feedback** with additional commits (do not force-push during review).

8. **Squash and merge** after receiving approval from a maintainer.

### PR Requirements

- 1 maintainer approval required
- All CI checks must pass:
  - Lint
  - Type check
  - Tests (>80% coverage for new code)
  - Build
  - No merge conflicts

---

## Component Development Checklist

When developing a new component or modifying an existing one, verify all items below before submitting a PR.

### File Structure

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

### Requirements Checklist

- [ ] **TypeScript types** with JSDoc comments on all props and emits
- [ ] **Variants system** implemented for all visual variations
- [ ] **Accessibility** - ARIA attributes and keyboard navigation implemented
- [ ] **Unit tests** with >80% coverage
- [ ] **Slots** provided for composition where appropriate
- [ ] **v-model support** implemented for form inputs
- [ ] **Disabled state** handled correctly
- [ ] **Loading state** included (if async operations are involved)
- [ ] **Error state** included (if validation is needed)
- [ ] **Dark mode** support via Tailwind CSS classes
- [ ] **Responsive** behavior implemented where needed
- [ ] **Documentation** written with usage examples
- [ ] **No console.logs** or debugger statements left in code
- [ ] **Commit messages** follow the Conventional Commits format

### Code Quality

- [ ] Uses `cn()` utility for class merging
- [ ] Uses CVA (class-variance-authority) for variant definitions
- [ ] Props use `withDefaults(defineProps<T>(), {})` pattern
- [ ] Emits are typed with `defineEmits<{}>()` pattern
- [ ] Component uses `<script setup lang="ts">` syntax
- [ ] All exported types are documented with JSDoc

---

## Questions?

If you have questions about contributing, open a [GitHub Discussion](https://github.com/StellarCL/stellar-vue/discussions) or reach out to the maintainer, [Terry McCann](mailto:terry@stellarcl.dev).
