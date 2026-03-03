# @stellar-vue-ui/cli

## 0.4.0

### Minor Changes

- f2e5c22: Generate correct Tailwind v4 theme CSS during init. The CLI now produces `@theme` blocks with `--color-*` tokens, dark mode overrides, keyframes, and `@utility` blocks so components render correctly out of the box.

## 0.3.1

### Patch Changes

- d50450f: Create `components/ui` and `composables` directories during `init` so the full project structure is visible immediately.

## 0.3.0

### Minor Changes

- 62ec1ab: Improve CLI defaults and auto-install dependencies.
  - **Framework-aware default paths**: Vue projects now default to `src/`-prefixed paths (`./src/components/ui`, `./src/composables`, `./src/lib`, `./src/assets/css/variables.css`). Nuxt projects use root-level paths (`./components/ui`, etc.).
  - **CSS variables path prompt**: The `init` command now asks where to place the CSS variables file, instead of silently hardcoding it.
  - **Auto-install dependencies**: The `init`, `add`, and `deps --update` commands now automatically install npm dependencies using the detected package manager (pnpm, yarn, bun, or npm) instead of just printing the command.

## 0.2.2

### Patch Changes

- 71277c6: Fix `add` command to copy real component source files instead of empty placeholder stubs. The CLI now embeds all 56 component families and writes actual `.vue`, `.types.ts`, `.variants.ts`, and other source files. Import paths (`../../utils`) are automatically rewritten to match the user's configured `utilsDir`. The `init` command now also writes shared utils (`cn.ts`, `variants.ts`) and prints the required npm dependencies.

## 0.2.1

### Patch Changes

- a3b50ca: Fix CLI crash: remove duplicate shebang and replace import.meta.url with CJS-compatible \_\_dirname

## 0.2.0

### Minor Changes

- acc9ece: v0.1.0 - Initial release of Stellar Vue UI

  A celestial-themed Vue 3 component library built on Radix Vue with Tailwind CSS.

  **Core:** 56 component families covering layout, navigation, forms, data display, feedback, and overlays. 18 composables for theme management, form handling, pagination, keyboard navigation, clipboard, and more. Full TypeScript support with tree-shakeable exports.

  **Themes:** 6 celestial-themed presets (Stellar, Sirius, Polaris, Antares, Vega, Aldebaran) with dark mode support, CSS custom property generation, and contrast validation.

  **Animations:** 17 transition presets (fade, slide, scale, expand, collapse, bounce, shake, blur variants), StellarTransition and StellarTransitionGroup components, usePresence and useMotion composables.

  **CLI:** 10 commands for project initialization, component management (add, update, remove, list), theme management, dependency checking, and auditing.

  **Nuxt:** Nuxt 4 module with auto-imports for all components and composables, theme plugin integration, and SSR support.

  **Test Utils:** renderWithTheme helper, mock generators, accessibility matchers, and form testing utilities.

  **Infrastructure:** VitePress documentation site, interactive playground, example projects, 1879 tests, Playwright E2E with axe-core, GitHub Actions CI/CD.
