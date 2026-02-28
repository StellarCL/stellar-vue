# Separator

A visual divider for separating content into distinct sections. Supports horizontal and vertical orientations. Built on Radix Vue's Separator primitive with proper ARIA semantics.

## Installation

::: code-group

```bash [CLI]
npx stellar add separator
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Separator } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Separator } from '@stellar-vue-ui/core'
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold">Section Title</h2>
    <Separator class="my-4" />
    <p>Content below the separator.</p>
  </div>
</template>
```

## Examples

### Horizontal (Default)

```vue
<template>
  <div class="space-y-1">
    <h4 class="text-sm font-medium">Stellar Vue UI</h4>
    <p class="text-sm text-muted-foreground">An open-source component library.</p>
  </div>
  <Separator class="my-4" />
  <div class="flex gap-4 text-sm">
    <span>Blog</span>
    <span>Docs</span>
    <span>Source</span>
  </div>
</template>
```

### Vertical

Use the `orientation="vertical"` prop for vertical separators. The parent container needs a defined height or use `flex`:

```vue
<template>
  <div class="flex h-5 items-center gap-4 text-sm">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
</template>
```

### Decorative

When the separator is purely decorative (not semantically separating content), set the `decorative` prop to remove the `role="separator"` attribute:

```vue
<template>
  <Separator decorative class="my-4" />
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the separator |
| `decorative` | `boolean` | `false` | When true, renders `role="none"` instead of `role="separator"` |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes merged via `cn()` |

### Events

This component does not emit any custom events.

### Slots

This component does not expose any slots.

## Accessibility

- Renders with `role="separator"` by default (via Radix Vue), which semantically marks a division between content sections
- `aria-orientation` is set to match the `orientation` prop
- When `decorative` is `true`, the separator renders with `role="none"`, removing it from the accessibility tree
- Screen readers announce separators as content dividers

## Related

- [Card](/components/card) -- Content container that may use separators internally
- [Dropdown Menu](/components/dropdown-menu) -- DropdownMenuSeparator divides menu sections
