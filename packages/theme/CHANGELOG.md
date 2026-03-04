# @stellar-vue-ui/theme

## 0.3.0

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
