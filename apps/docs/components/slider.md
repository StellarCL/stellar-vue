# Slider

An input control for selecting a value or range from a continuous set. Supports min/max, step increments, multiple thumbs for range selection, and vertical orientation. Built on Radix Vue's Slider primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add slider
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Slider } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Slider } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const value = ref([50])
</script>

<template>
  <Slider v-model="value" :max="100" :step="1" />
</template>
```

## Examples

### With Value Display

```vue
<script setup lang="ts">
import { Slider } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const volume = ref([75])
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between text-sm">
      <span>Volume</span>
      <span>{{ volume[0] }}%</span>
    </div>
    <Slider v-model="volume" :max="100" :step="1" />
  </div>
</template>
```

### Range Slider

Pass an array with two values to create a range slider with two thumbs:

```vue
<script setup lang="ts">
import { Slider } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const priceRange = ref([20, 80])
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between text-sm">
      <span>Price Range</span>
      <span>${{ priceRange[0] }} - ${{ priceRange[1] }}</span>
    </div>
    <Slider v-model="priceRange" :max="100" :step="5" />
  </div>
</template>
```

### Custom Step

```vue
<script setup lang="ts">
import { Slider } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const value = ref([25])
</script>

<template>
  <Slider v-model="value" :max="100" :step="25" />
</template>
```

### Disabled

```vue
<template>
  <Slider :model-value="[50]" :max="100" disabled />
</template>
```

### Vertical Orientation

```vue
<script setup lang="ts">
import { Slider } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const value = ref([50])
</script>

<template>
  <div class="h-[200px]">
    <Slider v-model="value" :max="100" orientation="vertical" />
  </div>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number[]` | `[0]` | Current value(s). Use a single-element array for single slider, two elements for a range. |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the slider |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number[]` | Emitted when the slider value(s) change |

### Slots

This component does not expose any slots. The track, range, and thumb(s) are rendered internally.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowUp` | Increases the value by one step |
| `ArrowLeft` / `ArrowDown` | Decreases the value by one step |
| `Home` | Sets the value to the minimum |
| `End` | Sets the value to the maximum |
| `Page Up` | Increases the value by a large step |
| `Page Down` | Decreases the value by a large step |

### ARIA Attributes

- Each thumb has `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-orientation` matches the `orientation` prop
- Disabled thumbs have `aria-disabled="true"`
- Focus ring is visible when navigating with keyboard

## Related

- [Progress](/components/progress) -- For read-only progress indicators
- [Input](/components/input) -- For precise numeric input
- [Form](/components/form) -- For form validation integration
