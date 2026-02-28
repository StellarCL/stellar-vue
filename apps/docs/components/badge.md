# Badge

A small inline status indicator for labeling, categorizing, or highlighting content. Supports four visual variants for different semantic meanings.

## Installation

::: code-group

```bash [CLI]
npx stellar add badge
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Badge } from '@stellar-vue-ui/core'
```

You can also import the variant function directly for use outside the component:

```typescript
import { badgeVariants } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Badge } from '@stellar-vue-ui/core'
</script>

<template>
  <Badge>Badge</Badge>
</template>
```

## Examples

### Variants

The Badge component supports four visual variants through the `variant` prop:

```vue
<template>
  <div class="flex gap-2">
    <Badge variant="default">
      Default
    </Badge>
    <Badge variant="secondary">
      Secondary
    </Badge>
    <Badge variant="destructive">
      Destructive
    </Badge>
    <Badge variant="outline">
      Outline
    </Badge>
  </div>
</template>
```

**default** -- Primary color with solid background. Use for the most prominent labels.

**secondary** -- Subdued background. Use for secondary or supplementary labels.

**destructive** -- Red-toned for error states, warnings, or deprecated labels.

**outline** -- Bordered with transparent background. A subtle indicator that blends with content.

### In a Card

```vue
<script setup lang="ts">
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@stellar-vue-ui/core'
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center gap-2">
        <CardTitle>Feature Request</CardTitle>
        <Badge variant="secondary">
          In Progress
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p>Add dark mode support to the dashboard.</p>
    </CardContent>
  </Card>
</template>
```

### Using badgeVariants

Apply badge styling to other elements using the exported variant function:

```vue
<script setup lang="ts">
import { badgeVariants } from '@stellar-vue-ui/core'
</script>

<template>
  <a href="/docs" :class="badgeVariants({ variant: 'outline' })">
    Documentation
  </a>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Visual variant |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes merged via `cn()` |

### Events

This component does not emit any custom events.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Badge content (text, icons, or inline elements) |

## Accessibility

- The Badge renders as a `<div>` with no implicit interactive role
- For badges that convey important status information, consider adding `aria-label` or visually hidden text for screen readers
- Badges are not focusable or interactive by default

## Related

- [Alert](/components/alert) -- For larger status messages
- [Button](/components/button) -- For interactive labeled elements
- [Card](/components/card) -- Badges are commonly used within cards
