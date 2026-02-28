# Card

A container component for grouping related content with an optional header, content area, and footer. Supports multiple visual variants for different content hierarchies.

## Installation

::: code-group

```bash [CLI]
npx stellar add card
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content and main body.</p>
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
</template>
```

## Examples

### Variants

The Card component supports three visual variants through the `variant` prop:

```vue
<template>
  <div class="grid gap-4 md:grid-cols-3">
    <Card variant="default">
      <CardHeader>
        <CardTitle>Default</CardTitle>
        <CardDescription>Standard card with border and light shadow.</CardDescription>
      </CardHeader>
      <CardContent>Default variant content.</CardContent>
    </Card>

    <Card variant="bordered">
      <CardHeader>
        <CardTitle>Bordered</CardTitle>
        <CardDescription>Thicker border, no shadow.</CardDescription>
      </CardHeader>
      <CardContent>Bordered variant content.</CardContent>
    </Card>

    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Elevated</CardTitle>
        <CardDescription>No border, prominent shadow.</CardDescription>
      </CardHeader>
      <CardContent>Elevated variant content.</CardContent>
    </Card>
  </div>
</template>
```

**default** -- Standard card with a thin border and subtle shadow. Best for most use cases.

**bordered** -- Card with a thicker 2px border and no shadow. Good for content that needs clear boundaries.

**elevated** -- Card with no border and a prominent shadow. Use for floating or prominent content.

### Heading Level

The `CardTitle` component renders as `<h3>` by default. Use the `as` prop to change the heading level:

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle as="h2">Section Title</CardTitle>
      <CardDescription>Using h2 for a section-level heading.</CardDescription>
    </CardHeader>
    <CardContent>Content here.</CardContent>
  </Card>
</template>
```

### Simple Card

Cards are flexible -- you can use just the parts you need:

```vue
<template>
  <Card>
    <CardContent class="pt-6">
      <p>A simple card with only content, no header or footer.</p>
    </CardContent>
  </Card>
</template>
```

## API Reference

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bordered' \| 'elevated'` | `'default'` | Visual variant of the card |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### CardTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'` | Heading element to render as |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### CardHeader, CardDescription, CardContent, CardFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Slots

All Card sub-components expose a `default` slot for content:

| Component | Slot | Description |
|-----------|------|-------------|
| `Card` | `default` | Card sub-components (Header, Content, Footer) |
| `CardHeader` | `default` | Title, description, and header content |
| `CardTitle` | `default` | The heading text |
| `CardDescription` | `default` | Descriptive text below the title |
| `CardContent` | `default` | Main card body content |
| `CardFooter` | `default` | Actions and footer content |

## Accessibility

- The `Card` renders as a `<div>` and does not carry any implicit ARIA role
- Use `CardTitle` to provide a meaningful heading for the card content
- Choose the correct heading level (`as` prop) to maintain a logical document outline
- Action buttons placed in `CardFooter` should use descriptive labels

## Related

- [Button](/components/button) -- Commonly placed in CardFooter for actions
- [Dialog](/components/dialog) -- Cards and dialogs share similar content structure
- [Alert](/components/alert) -- For status messages rather than grouped content
