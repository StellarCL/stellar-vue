# Theming

Stellar Vue UI ships with a powerful theme system built on CSS custom properties. You can use one of the 6 built-in cosmic theme presets, customize them, or create your own from scratch.

## How It Works

Every Stellar component uses semantic color tokens like `bg-primary`, `text-muted-foreground`, and `border-input`. These map to CSS custom properties that you define in your Tailwind theme configuration. Changing the values of these properties changes the appearance of every component at once.

The token system uses these semantic categories:

| Token | Purpose |
|-------|---------|
| `background` / `foreground` | Page-level background and text |
| `primary` / `primary-foreground` | Primary actions (buttons, links) |
| `secondary` / `secondary-foreground` | Secondary actions and subtle emphasis |
| `accent` / `accent-foreground` | Hover states and highlights |
| `destructive` / `destructive-foreground` | Dangerous or destructive actions |
| `muted` / `muted-foreground` | Subdued backgrounds and helper text |
| `border` | Default border color |
| `input` | Form input borders |
| `ring` | Focus ring color |
| `radius-*` | Border radius scale (sm, md, lg, xl) |

## Built-In Presets

Stellar includes 6 star-themed presets, each with carefully tuned light and dark mode palettes:

### Stellar (Default)
The default theme featuring deep purple-to-indigo tones inspired by the night sky. Professional and versatile, suitable for most applications.

### Sirius
Named after the brightest star. Features a bold blue-white palette with high contrast. Ideal for data-heavy dashboards and technical interfaces.

### Polaris
Inspired by the North Star. Cool grays with subtle blue undertones create a calm, focused atmosphere. Great for content-rich applications and documentation.

### Antares
Named after the red supergiant. Warm reds and oranges deliver an energetic, bold feel. Well-suited for creative tools and marketing sites.

### Vega
Inspired by the bright blue star. Clean teals and cyans for a fresh, modern look. Works well for health, wellness, and environmental applications.

### Aldebaran
Named after the orange giant star. Warm amber and gold tones create a luxurious, premium feeling. Ideal for finance, enterprise, and editorial interfaces.

## Applying a Theme

### With the Theme Package

Install the theme package:

```bash
pnpm add @stellar-vue-ui/theme
```

Apply a preset in your application entry point:

```typescript
import { applyTheme } from '@stellar-vue-ui/theme'
import { polaris } from '@stellar-vue-ui/theme/themes'

applyTheme(polaris)
```

### With the useTheme Composable

You can switch themes at runtime using the `useTheme` composable:

```vue
<script setup lang="ts">
import { useTheme } from '@stellar-vue-ui/core'

const { setTheme, currentTheme } = useTheme()
</script>

<template>
  <select @change="setTheme($event.target.value)">
    <option value="stellar">
      Stellar
    </option>
    <option value="sirius">
      Sirius
    </option>
    <option value="polaris">
      Polaris
    </option>
    <option value="antares">
      Antares
    </option>
    <option value="vega">
      Vega
    </option>
    <option value="aldebaran">
      Aldebaran
    </option>
  </select>
</template>
```

### With the CLI

During project initialization, the CLI lets you pick a theme:

```bash
npx stellar init
# Select your preferred theme preset when prompted

# Or apply a theme to an existing project
npx stellar theme apply polaris
```

## Customizing a Preset

You can extend a built-in preset by overriding specific tokens:

```typescript
import { applyTheme, createTheme } from '@stellar-vue-ui/theme'
import { stellar } from '@stellar-vue-ui/theme/themes'

const customTheme = createTheme({
  ...stellar,
  colors: {
    ...stellar.colors,
    'primary': 'oklch(60% 0.2 270)',
    'primary-foreground': 'oklch(98% 0 0)',
  },
  radius: {
    ...stellar.radius,
    md: '0.75rem', // rounder corners
  },
})

applyTheme(customTheme)
```

## Creating a Theme from Scratch

A theme is a plain object that maps token names to CSS values. You can define light and dark mode palettes separately:

```typescript
import { applyTheme, createTheme } from '@stellar-vue-ui/theme'

const myTheme = createTheme({
  name: 'midnight',
  colors: {
    'background': 'oklch(100% 0 0)',
    'foreground': 'oklch(15% 0.02 260)',
    'primary': 'oklch(55% 0.22 260)',
    'primary-foreground': 'oklch(98% 0 0)',
    'secondary': 'oklch(95% 0 0)',
    'secondary-foreground': 'oklch(25% 0.04 260)',
    'accent': 'oklch(95% 0 0)',
    'accent-foreground': 'oklch(25% 0.04 260)',
    'destructive': 'oklch(60% 0.2 27)',
    'destructive-foreground': 'oklch(98% 0 0)',
    'muted': 'oklch(95% 0 0)',
    'muted-foreground': 'oklch(55% 0.02 260)',
    'border': 'oklch(90% 0.01 260)',
    'input': 'oklch(90% 0.01 260)',
    'ring': 'oklch(55% 0.22 260)',
  },
  dark: {
    'background': 'oklch(10% 0.02 260)',
    'foreground': 'oklch(98% 0 0)',
    'primary': 'oklch(65% 0.2 260)',
    'primary-foreground': 'oklch(10% 0.02 260)',
    // ... remaining dark tokens
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
})

applyTheme(myTheme)
```

## CSS Variables Reference

All theme tokens are applied as CSS custom properties on the `:root` element. You can inspect and override them directly in CSS:

```css
:root {
  --color-primary: oklch(58.42% 0.187 285.82);
  --color-primary-foreground: oklch(98% 0 0);
  /* ... */
}

/* Override for a specific section */
.marketing-section {
  --color-primary: oklch(65% 0.25 330);
}
```

Components will automatically pick up the scoped values, so you can have different color schemes in different parts of your page.

## Next Steps

- Set up [Dark Mode](/guide/dark-mode) with automatic detection and persistence
- Browse the [Components](/components/button) to see themes in action
- Use the [CLI theme commands](/guide/cli) to manage themes from the terminal
