# Progress

A visual indicator showing the completion status of a task or process. Supports four color variants and customizable max value. Built on Radix Vue's Progress primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add progress
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Progress } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Progress } from '@stellar-vue-ui/core'
</script>

<template>
  <Progress :model-value="33" />
</template>
```

## Examples

### Variants

The Progress component supports four color variants:

```vue
<template>
  <div class="grid gap-4">
    <Progress variant="default" :model-value="60" />
    <Progress variant="success" :model-value="100" />
    <Progress variant="warning" :model-value="45" />
    <Progress variant="destructive" :model-value="80" />
  </div>
</template>
```

**default** -- Primary color. Use for general progress indicators.

**success** -- Green. Use when progress represents a positive outcome.

**warning** -- Yellow. Use to indicate attention-needed progress.

**destructive** -- Red. Use for quota usage approaching limits.

### Dynamic Progress

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Progress } from '@stellar-vue-ui/core'

const progress = ref(0)

onMounted(() => {
  const timer = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) clearInterval(timer)
  }, 500)
})
</script>

<template>
  <Progress :model-value="progress" />
</template>
```

### Custom Max

Use the `max` prop for values other than 100:

```vue
<template>
  <div class="space-y-2">
    <Progress :model-value="3" :max="5" />
    <p class="text-sm text-muted-foreground">3 of 5 steps completed</p>
  </div>
</template>
```

### With Label

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@stellar-vue-ui/core'

const value = ref(66)
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between text-sm">
      <span>Storage used</span>
      <span>{{ value }}%</span>
    </div>
    <Progress :model-value="value" />
  </div>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Current progress value |
| `max` | `number` | `100` | Maximum progress value |
| `variant` | `'default' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | Color variant |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

This component does not emit any custom events. The value is controlled via the `modelValue` prop.

### Slots

This component does not expose any slots. The indicator bar is rendered internally.

## Accessibility

### ARIA Attributes

- Renders with `role="progressbar"` (via Radix Vue)
- `aria-valuenow` is set to the current value
- `aria-valuemin` is set to `0`
- `aria-valuemax` is set to the `max` prop
- Screen readers announce the current progress percentage
- When `modelValue` is `undefined` or `null`, the progress is treated as indeterminate

## Related

- [Skeleton](/components/skeleton) -- For loading placeholders instead of progress bars
- [Slider](/components/slider) -- For user-adjustable values
- [Stepper](/components/stepper) -- For discrete step-based progress
