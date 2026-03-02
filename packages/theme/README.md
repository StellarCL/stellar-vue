# @stellar-vue-ui/theme

Theme system and star-themed design token presets for Stellar Vue UI.

## Installation

```bash
npm install @stellar-vue-ui/theme
```

## Usage

```ts
import { defineTheme, generateThemeCSS } from '@stellar-vue-ui/theme'
import { stellar } from '@stellar-vue-ui/theme/themes'

const css = generateThemeCSS(stellar)
```

## Included Themes

- **Stellar** — Default theme with a balanced, modern palette
- **Sirius** — Bright and high-contrast
- **Polaris** — Cool, professional tones
- **Antares** — Warm, vibrant accent colors
- **Vega** — Soft pastels
- **Aldebaran** — Deep, rich color scheme

## Features

- Type-safe theme definition with `defineTheme`
- CSS custom property generation
- WCAG contrast validation
- Light and dark mode support

## License

[MIT](./LICENSE)
