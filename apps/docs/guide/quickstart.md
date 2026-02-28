# Quick Start

This guide walks you through setting up a new Vue 3 + Vite project with Stellar Vue UI, from creating the project to rendering your first components.

## Create a Vue Project

Start with a fresh Vue 3 project using Vite:

```bash
pnpm create vue@latest my-stellar-app
cd my-stellar-app
```

Select TypeScript when prompted. Then install dependencies:

```bash
pnpm install
```

## Install Stellar Vue UI

Add the core package and its peer dependency:

```bash
pnpm add @stellar-vue-ui/core radix-vue
pnpm add -D tailwindcss @tailwindcss/postcss
```

## Configure Tailwind CSS

Create or update your `postcss.config.js`:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Update your main CSS file (`src/assets/main.css`) with Tailwind and the Stellar color tokens:

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(9% 0.03 285.82);
  --color-primary: oklch(58.42% 0.187 285.82);
  --color-primary-foreground: oklch(98% 0 0);
  --color-secondary: oklch(96.1% 0 0);
  --color-secondary-foreground: oklch(26.47% 0.043 285.82);
  --color-accent: oklch(96.1% 0 0);
  --color-accent-foreground: oklch(26.47% 0.043 285.82);
  --color-destructive: oklch(61.42% 0.204 27.32);
  --color-destructive-foreground: oklch(98% 0 0);
  --color-muted: oklch(96.1% 0 0);
  --color-muted-foreground: oklch(54.12% 0.015 285.82);
  --color-border: oklch(91.15% 0.006 286.07);
  --color-input: oklch(91.15% 0.006 286.07);
  --color-ring: oklch(9% 0.03 285.82);
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

## Build Your First Page

Replace the contents of `src/App.vue` with the following:

```vue
<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)

function handleSubmit() {
  if (email.value) {
    submitted.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Stellar</CardTitle>
        <CardDescription>
          Enter your email to get started with our newsletter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!submitted" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div v-else class="text-center py-4">
          <p class="text-lg font-medium">
            Thanks for subscribing!
          </p>
          <p class="text-muted-foreground">
            We sent a confirmation to {{ email }}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          v-if="!submitted"
          class="w-full"
          @click="handleSubmit"
        >
          Subscribe
        </Button>
        <Button
          v-else
          variant="outline"
          class="w-full"
          @click="submitted = false; email = ''"
        >
          Subscribe another email
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
```

## Run the Dev Server

```bash
pnpm dev
```

Open your browser to `http://localhost:5173` and you should see a card with a subscription form, styled with Stellar's default theme.

## Add a Theme

To use one of the 6 built-in theme presets, install the theme package:

```bash
pnpm add @stellar-vue-ui/theme
```

Then apply it in your `main.ts`:

```typescript
import { applyTheme } from '@stellar-vue-ui/theme'
import { sirius } from '@stellar-vue-ui/theme/themes'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Apply the Sirius theme
applyTheme(sirius)

createApp(App).mount('#app')
```

The theme will override the CSS custom properties, giving your entire app the Sirius look and feel.

## Add Dark Mode

Use the `useTheme` composable to toggle dark mode:

```vue
<script setup lang="ts">
import { Button, useTheme } from '@stellar-vue-ui/core'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <Button variant="outline" @click="toggleDark">
    {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
  </Button>
</template>
```

## Next Steps

- Browse the full [Components](/components/button) library
- Learn the [Theme System](/guide/theming) in depth
- Set up [Dark Mode](/guide/dark-mode) with persistence
- Explore [Composables](/composables/) for form validation, focus trapping, and more
