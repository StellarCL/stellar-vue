# Checkbox

A form control that allows the user to toggle between checked, unchecked, and optionally indeterminate states. Built on Radix Vue's Checkbox primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add checkbox
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Checkbox } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Checkbox, Label } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" v-model="checked" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</template>
```

## Examples

### With Label

```vue
<template>
  <div class="flex items-center gap-2">
    <Checkbox id="newsletter" />
    <Label for="newsletter">Subscribe to newsletter</Label>
  </div>
</template>
```

### Indeterminate State

The checkbox supports an indeterminate state, commonly used for "select all" patterns:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, Label } from '@stellar-vue-ui/core'

const selectAll = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="select-all" v-model="selectAll" />
    <Label for="select-all">Select All</Label>
  </div>
</template>
```

### Disabled

```vue
<template>
  <div class="flex items-center gap-2">
    <Checkbox id="disabled" disabled />
    <Label for="disabled" class="opacity-50">Disabled checkbox</Label>
  </div>
</template>
```

### With Form

```vue
<script setup lang="ts">
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@stellar-vue-ui/core'
import { Checkbox } from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="terms">
      <FormItem class="flex items-start gap-2">
        <FormControl>
          <Checkbox v-bind="field" />
        </FormControl>
        <div class="grid gap-1.5 leading-none">
          <FormLabel>Accept terms</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
  </Form>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean \| 'indeterminate'` | `false` | The checked state (v-model) |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `required` | `boolean` | `false` | Indicates the checkbox must be checked before form submission |
| `id` | `string` | `undefined` | The id attribute of the checkbox element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean \| 'indeterminate'` | Emitted when the checked state changes |

### Slots

This component does not expose any slots. The check and indeterminate icons are rendered internally.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Space` | Toggles the checkbox |
| `Tab` | Moves focus to/from the checkbox |

### ARIA Attributes

- Uses Radix Vue's `CheckboxRoot` which renders with `role="checkbox"`
- `aria-checked` reflects the current state: `true`, `false`, or `mixed` (for indeterminate)
- `aria-required` is set when `required` is true
- `aria-disabled` is set when `disabled` is true
- A checkmark icon is shown for checked state, a dash icon for indeterminate state
- The checkbox uses `peer` CSS class so adjacent labels can react to its disabled state

## Related

- [Label](/components/label) -- Always pair checkboxes with labels
- [Switch](/components/switch) -- For on/off toggles with immediate effect
- [Radio Group](/components/radio-group) -- For mutually exclusive selections
- [Form](/components/form) -- For form validation integration
