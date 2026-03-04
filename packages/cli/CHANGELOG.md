# @stellar-vue-ui/cli

## 0.7.0

### Minor Changes

- 5e8751a: ### @stellar-vue-ui/theme
  - **5-color palette theme generator**: New `generateThemeFromPalette()` accepts 5 hex colors (primary, secondary, accent, background, foreground) and derives all ~30 theme tokens with WCAG AA compliance
  - **OKLCH color utilities**: Pure hex-to-OKLCH conversion, contrast approximation, lightness/chroma adjustment with no external dependencies
  - **`deriveTokensFromPalette()`**: Derives surfaces, semantic colors (fixed hues), focus variants, and auto-calculated foregrounds from a 5-color palette
  - **`derivePaletteFromBrandColor()`**: Backward-compatible single-color to palette derivation for legacy `generateTheme()` usage

  ### @stellar-vue-ui/cli
  - **`theme create` palette prompts**: Now prompts for 5 hex colors and light/dark mode instead of base theme + OKLCH primary
  - **Correct CSS output format**: Custom themes use `@theme { --color-* }` blocks matching built-in templates, with dark mode overrides, keyframes, and animation utilities
  - **`@stellar-vue-ui/theme` integration**: CLI imports derivation logic from the theme package as single source of truth

### Patch Changes

- Updated dependencies [5e8751a]
  - @stellar-vue-ui/theme@0.4.0

## 0.6.0

### Minor Changes

- a21a8a6: ### @stellar-vue-ui/theme
  - **5-color palette theme generator**: New `generateThemeFromPalette()` accepts 5 hex colors (primary, secondary, accent, background, foreground) and derives all ~30 theme tokens with WCAG AA compliance
  - **OKLCH color utilities**: Pure hex→OKLCH conversion, contrast approximation, lightness/chroma adjustment — no external dependencies
  - **`deriveTokensFromPalette()`**: Intelligently derives surfaces, semantic colors (fixed hues), focus variants, and auto-calculated foregrounds from a 5-color palette
  - **`derivePaletteFromBrandColor()`**: Backward-compatible single-color→palette derivation for legacy `generateTheme()` usage
  - **Shared contrast checker**: Refactored `validateTheme` to use shared OKLCH utilities

  ### @stellar-vue-ui/cli
  - **`theme create` palette prompts**: Now prompts for 5 hex colors (primary, secondary, accent, background, foreground) and light/dark mode instead of base theme + OKLCH primary
  - **Palette-based CSS generation**: All generated theme files use `deriveTokensFromPalette` for fully derived tokens — no more hardcoded OKLCH values
  - **`@stellar-vue-ui/theme` integration**: CLI now imports derivation logic from the theme package (single source of truth)

### Patch Changes

- Updated dependencies [a21a8a6]
  - @stellar-vue-ui/theme@0.3.0

## 0.5.0

### Minor Changes

- f74b7bd: ### @stellar-vue-ui/core
  - **Composable barrel exports**: Component barrel files now re-export their associated composables (e.g., `useToast` from `toast/index.ts`), making imports more intuitive for CLI users
  - **SidebarMenuButton**: Fixed `asChild` to use Radix `Primitive` component for proper attribute forwarding
  - **DataTable enhancements**: Added column filtering (`setFilter`, `clearFilters`, `filteredData`), `DataTableColumnToggle` component, `DataTableFilter` component, and `exportTableData` CSV/clipboard utility
  - **useCommand composable + CommandPalette**: New composable for registering app-wide command actions with fuzzy search, keyboard shortcuts (Cmd+K), recent history, and a pre-wired `CommandPalette` component
  - **AutoForm**: New `toFormFields()` utility that introspects Zod schemas into form field configs, plus `AutoForm` component for automatic form generation with slot overrides

  ### @stellar-vue-ui/cli
  - **`stellar-ui doctor`**: New diagnostic command with 10 checks (config, CSS wiring, Tailwind integration, component files, peer deps, composables, import paths, NPM deps, lock file integrity). Supports `--fix`, `--verbose`, and `--json` flags
  - **`stellar-ui init --scaffold`**: New flag that generates an App.vue with AppShell + Sidebar layout and auto-installs required components
  - **Template regeneration**: CLI templates updated to include new components and composables

## 0.4.2

### Patch Changes

- Fix `theme apply` to write CSS tokens to the variables file. Fix `update` command to write real component source code with `--force` flag for pulling template changes at the same version.

## 0.4.0

### Minor Changes

- f2e5c22: Generate correct Tailwind v4 theme CSS during init. The CLI now produces `@theme` blocks with `--color-*` tokens, dark mode overrides, keyframes, and `@utility` blocks so components render correctly out of the box. Also fix `theme apply` to actually write the theme's CSS tokens to the variables file instead of only updating the config.

### Patch Changes

- 562939f: Fix missing composables when adding components. The `add` command now copies composable files (e.g. `useFormField`, `useToast`) that components depend on and rewrites their import paths correctly.
- b142766: Fix `update` command to write real component code instead of stub comments. The command now uses the same `COMPONENT_TEMPLATES` + `rewriteImports()` pipeline as `add`, syncs composable dependencies, and installs npm deps. Adds `--force` flag to pull latest template changes even when the lock file version already matches the registry.
- 7122dc6: Fix five component bugs found during evaluation:
  - Card default variant now has a visible border
  - AppShell uses row flex direction for proper sidebar layout
  - SidebarMenuButton respects the asChild prop
  - Accordion height animations now work (added missing @utility directives)
  - DataTable uses design token classes instead of hardcoded colors

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
