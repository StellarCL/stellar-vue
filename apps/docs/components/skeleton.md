# Skeleton

A placeholder loading animation that represents the shape of content before it loads. Use skeletons to reduce perceived loading time and prevent layout shift.

## Installation

::: code-group

```bash [CLI]
npx stellar add skeleton
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Skeleton } from '@stellar-vue-ui/core'
```

## Usage

### Basic

<ComponentPreview title="Basic">
  <SkeletonBasic />
  <template #code>

```vue
<script setup lang="ts">
import { Skeleton } from '@stellar-vue-ui/core'
</script>

<template>
  <Skeleton class="h-4 w-[250px]" />
</template>
```

  </template>
</ComponentPreview>

## Examples

### Card Skeleton

Mimic the shape of a card component while content loads:

```vue
<template>
  <div class="flex items-center space-x-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
```

### Content Lines

Represent loading text content:

```vue
<template>
  <div class="space-y-2">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-3/4" />
  </div>
</template>
```

### Avatar Skeleton

```vue
<template>
  <div class="flex items-center gap-4">
    <Skeleton class="h-10 w-10 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[150px]" />
      <Skeleton class="h-3 w-[100px]" />
    </div>
  </div>
</template>
```

### Table Skeleton

```vue
<template>
  <div class="space-y-3">
    <div class="flex gap-4">
      <Skeleton class="h-4 w-1/4" />
      <Skeleton class="h-4 w-1/4" />
      <Skeleton class="h-4 w-1/4" />
      <Skeleton class="h-4 w-1/4" />
    </div>
    <Skeleton class="h-[1px] w-full" />
    <div v-for="i in 5" :key="i" class="flex gap-4">
      <Skeleton class="h-4 w-1/4" />
      <Skeleton class="h-4 w-1/4" />
      <Skeleton class="h-4 w-1/4" />
      <Skeleton class="h-4 w-1/4" />
    </div>
  </div>
</template>
```

## API Reference

### Props

| Prop    | Type                      | Default     | Description                                                                                 |
| ------- | ------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes. Use Tailwind utilities to control width, height, and border radius. |

### Events

This component does not emit any custom events.

### Slots

This component does not expose any slots. The skeleton is a self-closing `<div>` with a pulse animation.

### CSS Classes

The skeleton applies these base classes:

```
animate-pulse rounded-md bg-muted
```

Override or extend using the `class` prop:

- **Dimensions:** `h-4 w-[200px]`, `h-12 w-12`
- **Border radius:** `rounded-full` (for circles), `rounded-lg`
- **Width:** `w-full`, `w-3/4`, `w-[250px]`

## Accessibility

- Renders with `role="status"` to indicate loading content
- Has `aria-label="Loading"` so screen readers announce the loading state
- The `animate-pulse` animation is CSS-based and respects the `prefers-reduced-motion` media query

## Related

- [Avatar](/components/avatar) -- Use a skeleton circle as an avatar placeholder
- [Card](/components/card) -- Use skeletons inside cards while content loads
- [Data Table](/components/data-table) -- Use table skeletons while data loads
