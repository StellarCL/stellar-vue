# Avatar

An image element with a fallback for representing a user or entity. Supports four sizes with a circular default shape, automatic fallback rendering when the image fails to load, and an optional fallback delay. Built on Radix Vue's Avatar primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add avatar
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@stellar-vue-ui/core'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```

## Examples

### Sizes

Four sizes are available via the `size` prop:

```vue
<template>
  <div class="flex items-center gap-4">
    <Avatar size="sm">
      <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
    <Avatar size="md">
      <AvatarImage src="https://github.com/shadcn.png" alt="Medium" />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
    <Avatar size="xl">
      <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
      <AvatarFallback>XL</AvatarFallback>
    </Avatar>
  </div>
</template>
```

| Size | Dimensions | Description |
|------|-----------|-------------|
| `sm` | `h-8 w-8` | Compact, for dense lists |
| `md` | `h-10 w-10` | Default size |
| `lg` | `h-12 w-12` | Prominent display |
| `xl` | `h-16 w-16` | Profile pages and hero sections |

### Fallback Only

When no image is available, the fallback content (typically initials) is displayed:

```vue
<template>
  <div class="flex items-center gap-4">
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  </div>
</template>
```

### Delayed Fallback

Use `delayMs` on `AvatarFallback` to only show the fallback after a delay, preventing a flash for users with fast connections:

```vue
<template>
  <Avatar>
    <AvatarImage src="https://example.com/slow-image.png" alt="User" />
    <AvatarFallback :delay-ms="600">
      JD
    </AvatarFallback>
  </Avatar>
</template>
```

### Avatar Group

Stack multiple avatars in a row:

```vue
<template>
  <div class="flex -space-x-3">
    <Avatar class="border-2 border-background">
      <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
      <AvatarFallback>U1</AvatarFallback>
    </Avatar>
    <Avatar class="border-2 border-background">
      <AvatarImage src="https://github.com/radix-vue.png" alt="User 2" />
      <AvatarFallback>U2</AvatarFallback>
    </Avatar>
    <Avatar class="border-2 border-background">
      <AvatarFallback>+3</AvatarFallback>
    </Avatar>
  </div>
</template>
```

## API Reference

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the avatar |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### AvatarImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | URL of the image |
| `alt` | `string` | *required* | Accessible alternative text |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### AvatarFallback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayMs` | `number` | `undefined` | Delay in ms before showing the fallback |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

This component does not emit any custom events.

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Avatar` | `default` | AvatarImage and AvatarFallback |
| `AvatarImage` | -- | No slots; renders the `<img>` element |
| `AvatarFallback` | `default` | Fallback content (typically initials or an icon) |

## Accessibility

- The `AvatarImage` component renders a native `<img>` element with the `alt` attribute for screen readers
- When the image fails to load, the fallback content provides a visual and accessible alternative
- Always provide a meaningful `alt` attribute that describes the person or entity
- For decorative avatars, use `alt=""`

## Related

- [Skeleton](/components/skeleton) -- Use circular skeletons as avatar loading placeholders
- [Tooltip](/components/tooltip) -- Show user names on hover for avatar groups
- [Badge](/components/badge) -- Combine with avatars for status indicators
