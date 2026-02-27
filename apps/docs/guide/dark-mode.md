# Dark Mode

Stellar Vue UI provides first-class dark mode support with two detection strategies, SSR-safe behavior, and seamless transitions. Every component includes dark mode styles that respond automatically to the active strategy.

## Strategies

Stellar supports two dark mode strategies:

### Class Strategy (Recommended)

The `class` strategy toggles dark mode by adding or removing the `dark` class on the `<html>` element. This gives you full programmatic control and works well with user preferences and persistence.

```html
<!-- Light mode -->
<html>
  <body>...</body>
</html>

<!-- Dark mode -->
<html class="dark">
  <body>...</body>
</html>
```

### Media Strategy

The `media` strategy uses the `prefers-color-scheme` CSS media query to follow the user's operating system setting. No JavaScript is needed, but users cannot override it within your application.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: oklch(9% 0.03 285.82);
    --color-foreground: oklch(98% 0 0);
    /* ... */
  }
}
```

## Using the useTheme Composable

The `useTheme` composable is the primary way to manage dark mode in your application:

```vue
<script setup lang="ts">
import { useTheme } from '@stellar-vue-ui/core'

const {
  isDark,       // Ref<boolean> - whether dark mode is active
  toggleDark,   // () => void - toggle between light and dark
  setDark,      // (value: boolean) => void - explicitly set dark mode
} = useTheme({
  strategy: 'class',     // 'class' or 'media'
  storageKey: 'stellar-theme',  // localStorage key for persistence
  defaultDark: false,    // default state before detection
})
</script>

<template>
  <Button variant="outline" @click="toggleDark">
    {{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
  </Button>
</template>
```

## Building a Theme Toggle

Here is a complete theme toggle component:

```vue
<script setup lang="ts">
import { useTheme } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="toggleDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun icon for dark mode (click to go light) -->
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
    <!-- Moon icon for light mode (click to go dark) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </Button>
</template>
```

## Persistence

By default, `useTheme` persists the dark mode preference to `localStorage`. When the user returns to your site, their preference is restored automatically.

```typescript
const { isDark } = useTheme({
  storageKey: 'my-app-dark-mode',  // custom storage key
})
```

Set `storageKey` to `null` to disable persistence entirely:

```typescript
const { isDark } = useTheme({
  storageKey: null,  // no persistence
})
```

## SSR Considerations

When rendering on the server, there is no way to know the user's dark mode preference before the page loads. This can cause a flash of incorrect colors (FOIC). To prevent this:

### Inline Script Approach

Add a small inline script to your HTML `<head>` that runs before Vue hydrates. This sets the `dark` class synchronously before any content paints:

```html
<head>
  <script>
    (function () {
      const stored = localStorage.getItem('stellar-theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (stored === 'dark' || (!stored && prefersDark)) {
        document.documentElement.classList.add('dark')
      }
    })()
  </script>
</head>
```

### Nuxt Module

The `@stellar-vue-ui/nuxt` module handles SSR dark mode automatically. It injects the flash-prevention script and syncs the server-rendered HTML with the client's preference:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@stellar-vue-ui/nuxt'],
  stellar: {
    darkMode: 'class',  // or 'media'
  },
})
```

## Smooth Transitions

To add a smooth transition when switching between light and dark mode, add this CSS:

```css
html {
  transition: color 0.3s ease, background-color 0.3s ease;
}

html * {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
```

::: warning
Broad transition rules can impact performance on complex pages. For production, consider applying transitions only to specific elements or using the `view-transition` API for a more performant approach.
:::

## Next Steps

- Learn how to customize colors with the [Theme System](/guide/theming)
- Read about [Accessibility](/guide/accessibility) considerations for dark mode
- See how the [Button](/components/button) and other components adapt to dark mode
