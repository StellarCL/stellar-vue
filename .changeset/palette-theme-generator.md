---
'@stellar-vue-ui/theme': minor
'@stellar-vue-ui/cli': minor
---

### @stellar-vue-ui/theme

- **5-color palette theme generator**: New `generateThemeFromPalette()` accepts 5 hex colors (primary, secondary, accent, background, foreground) and derives all ~30 theme tokens with WCAG AA compliance
- **OKLCH color utilities**: Pure hex→OKLCH conversion, contrast approximation, lightness/chroma adjustment — no external dependencies
- **`deriveTokensFromPalette()`**: Intelligently derives surfaces, semantic colors (fixed hues), focus variants, and auto-calculated foregrounds from a 5-color palette
- **`derivePaletteFromBrandColor()`**: Backward-compatible single-color→palette derivation for legacy `generateTheme()` usage
- **Shared contrast checker**: Refactored `validateTheme` to use shared OKLCH utilities

### @stellar-vue-ui/cli

- **`theme create` palette prompts**: Now prompts for 5 hex colors (primary, secondary, accent, background, foreground) and light/dark mode instead of base theme + OKLCH primary
- **Palette-based CSS generation**: All generated theme files use `deriveTokensFromPalette` for fully derived tokens — no more hardcoded OKLCH values
- **`@stellar-vue-ui/theme` integration**: CLI now imports derivation logic from the theme package (single source of truth)
