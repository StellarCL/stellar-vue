# Popover

A floating panel that appears when a trigger is clicked. Useful for displaying additional information, forms, or controls without navigating away from the current context. Built on Radix Vue's Popover primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add popover
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Popover, PopoverTrigger, PopoverContent } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p>This is the popover content.</p>
    </PopoverContent>
  </Popover>
</template>
```

## Examples

### With Form Content

```vue
<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from '@stellar-vue-ui/core'
import { Button, Input, Label } from '@stellar-vue-ui/core'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Dimensions</Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="width">Width</Label>
            <Input id="width" value="100%" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="height">Height</Label>
            <Input id="height" value="25px" class="col-span-2 h-8" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
```

### Positioning

Control the popover position with `side` and `align` props:

```vue
<template>
  <div class="flex gap-4">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline">Top</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <p>Popover on top</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline">Right</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <p>Popover on right</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline">Left</Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <p>Popover on left</p>
      </PopoverContent>
    </Popover>
  </div>
</template>
```

### Controlled

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Popover, PopoverTrigger, PopoverContent } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'

const isOpen = ref(false)
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button variant="outline">{{ isOpen ? 'Close' : 'Open' }}</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p>Controlled popover content.</p>
      <Button size="sm" @click="isOpen = false">Done</Button>
    </PopoverContent>
  </Popover>
</template>
```

## API Reference

### Popover Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state (v-model:open) |
| `defaultOpen` | `boolean` | `undefined` | Open state when initially rendered |

### PopoverTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### PopoverContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side to render against |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Preferred alignment against the anchor |
| `sideOffset` | `number` | `4` | Distance in pixels from the anchor |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Emitted when the popover open state changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Popover` | `default` | Trigger and Content elements |
| `PopoverTrigger` | `default` | The trigger element |
| `PopoverContent` | `default` | Popover body content |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens/closes the popover from the trigger |
| `Escape` | Closes the popover |
| `Tab` | Cycles focus within the popover content |

### ARIA Attributes

- Trigger has `aria-haspopup="dialog"` and `aria-expanded`
- Content is portaled to `document.body` to prevent overflow clipping
- Focus is automatically moved to the popover content when opened
- Focus returns to the trigger when the popover closes

## Related

- [Tooltip](/components/tooltip) -- For hover-triggered non-interactive hints
- [Dialog](/components/dialog) -- For modal content requiring user action
- [Dropdown Menu](/components/dropdown-menu) -- For action menus
