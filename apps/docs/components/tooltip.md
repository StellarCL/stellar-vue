# Tooltip

A popup that displays additional information when hovering over or focusing a trigger element. Tooltips are non-interactive and are used for supplementary descriptions. Built on Radix Vue's Tooltip primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add tooltip
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

Wrap your app (or the relevant section) with `TooltipProvider`, then use individual tooltips:

```vue
<script setup lang="ts">
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

## Examples

### Positioning

Control the tooltip position with the `side` prop:

```vue
<template>
  <TooltipProvider>
    <div class="flex gap-4">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
```

### Custom Delay

Configure the delay before the tooltip appears using `TooltipProvider`:

```vue
<template>
  <TooltipProvider :delay-duration="500">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">Slow tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>Appears after 500ms</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

### Icon Button Tooltip

Tooltips are essential for icon-only buttons to provide accessible labels:

```vue
<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add new item</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

## API Reference

### TooltipProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayDuration` | `number` | `200` | Delay in ms before the tooltip opens |
| `skipDelayDuration` | `number` | `300` | Time in ms a user has to enter another trigger without a delay |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Tooltip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state (v-model:open) |
| `defaultOpen` | `boolean` | `undefined` | Open state when initially rendered |

### TooltipTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### TooltipContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preferred side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Preferred alignment |
| `sideOffset` | `number` | `4` | Distance in pixels from the anchor |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Emitted when the tooltip visibility changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `TooltipProvider` | `default` | Tooltip instances |
| `Tooltip` | `default` | Trigger and Content |
| `TooltipTrigger` | `default` | The trigger element |
| `TooltipContent` | `default` | Tooltip text |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Focus triggers the tooltip to appear |
| `Escape` | Closes the tooltip |

### ARIA Attributes

- Content has `role="tooltip"`
- Trigger has `aria-describedby` pointing to the tooltip content
- Content is portaled to prevent overflow clipping
- Tooltips are non-interactive -- they dismiss when the user clicks, scrolls, or presses Escape
- For icon-only buttons, tooltips serve as the accessible name

## Related

- [Popover](/components/popover) -- For interactive floating content
- [Button](/components/button) -- Icon buttons should always have tooltips
- [Dropdown Menu](/components/dropdown-menu) -- For action menus
