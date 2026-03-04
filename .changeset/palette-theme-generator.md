---
'@stellar-vue-ui/theme': minor
'@stellar-vue-ui/cli': minor
---

### @stellar-vue-ui/theme

- **5-color palette theme generator**: New `generateThemeFromPalette()` accepts 5 hex colors (primary, secondary, accent, background, foreground) and derives all ~30 theme tokens with WCAG AA compliance
- **OKLCH color utilities**: Pure hex-to-OKLCH conversion, contrast approximation, lightness/chroma adjustment with no external dependencies
- **`deriveTokensFromPalette()`**: Derives surfaces, semantic colors (fixed hues), focus variants, and auto-calculated foregrounds from a 5-color palette
- **`derivePaletteFromBrandColor()`**: Backward-compatible single-color to palette derivation for legacy `generateTheme()` usage

### @stellar-vue-ui/cli

- **`theme create` palette prompts**: Now prompts for 5 hex colors and light/dark mode instead of base theme + OKLCH primary
- **Correct CSS output format**: Custom themes use `@theme { --color-* }` blocks matching built-in templates, with dark mode overrides, keyframes, and animation utilities
- **`@stellar-vue-ui/theme` integration**: CLI imports derivation logic from the theme package as single source of truth
