# Label

An accessible label element that associates with form controls. Built on Radix Vue's Label primitive for consistent cross-browser behavior.

## Installation

::: code-group

```bash [CLI]
npx stellar add label
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Label } from '@stellar-vue-ui/core'
```

## Usage

### Basic

<ComponentPreview title="Basic">
  <LabelBasic />
  <template #code>

```vue
<script setup lang="ts">
import { Label } from '@stellar-vue-ui/core'
</script>

<template>
  <Label for="name">Full Name</Label>
</template>
```

  </template>
</ComponentPreview>

## Examples

### With Input

```vue
<script setup lang="ts">
import { Input, Label } from '@stellar-vue-ui/core'
</script>

<template>
  <div class="grid gap-2">
    <Label for="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
</template>
```

### Required Indicator

When the `required` prop is set, an asterisk is displayed after the label text:

```vue
<template>
  <div class="grid gap-2">
    <Label for="password" required>Password</Label>
    <Input id="password" type="password" required />
  </div>
</template>
```

### With Checkbox

```vue
<script setup lang="ts">
import { Checkbox, Label } from '@stellar-vue-ui/core'
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</template>
```

## API Reference

### Props

| Prop       | Type                      | Default     | Description                                              |
| ---------- | ------------------------- | ----------- | -------------------------------------------------------- |
| `for`      | `string`                  | `undefined` | The id of the form element this label is associated with |
| `required` | `boolean`                 | `false`     | Whether to show a required asterisk indicator            |
| `class`    | `HTMLAttributes['class']` | `undefined` | Additional CSS classes merged via `cn()`                 |

### Events

This component does not emit any custom events.

### Slots

| Slot      | Description        |
| --------- | ------------------ |
| `default` | Label text content |

## Accessibility

### Keyboard Interaction

- Clicking the label focuses or activates the associated form control (native `<label>` behavior via Radix Vue)

### ARIA Attributes

- Renders using Radix Vue's `Label` primitive, which provides a native `<label>` element
- The `for` prop creates the programmatic association between label and form control
- Disabled form controls automatically apply `cursor-not-allowed` and reduced opacity to peer labels

## Related

- [Input](/components/input) -- Primary use case for labels
- [Checkbox](/components/checkbox) -- Pair with labels for accessible checkboxes
- [Switch](/components/switch) -- Pair with labels for accessible toggles
- [Form](/components/form) -- FormLabel wraps this component for form integration
