# @stellar-vue-ui/core

## 0.3.0

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

## 0.2.1

### Patch Changes

- 7122dc6: Fix five component bugs found during evaluation:
  - Card default variant now has a visible border
  - AppShell uses row flex direction for proper sidebar layout
  - SidebarMenuButton respects the asChild prop
  - Accordion height animations now work (added missing @utility directives)
  - DataTable uses design token classes instead of hardcoded colors

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
