# Radio Group

A set of mutually exclusive radio buttons where only one option can be selected at a time. Built on Radix Vue's RadioGroup primitives with full keyboard navigation support.

## Installation

::: code-group

```bash [CLI]
npx stellar add radio-group
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { RadioGroup, RadioGroupItem } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@stellar-vue-ui/core'
import { Label } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const plan = ref('free')
</script>

<template>
  <RadioGroup v-model="plan">
    <div class="flex items-center gap-2">
      <RadioGroupItem id="free" value="free" />
      <Label for="free">Free</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="pro" value="pro" />
      <Label for="pro">Pro</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="enterprise" value="enterprise" />
      <Label for="enterprise">Enterprise</Label>
    </div>
  </RadioGroup>
</template>
```

## Examples

### Horizontal Orientation

Use the `orientation` prop to lay out options horizontally:

```vue
<template>
  <RadioGroup orientation="horizontal" default-value="medium">
    <div class="flex items-center gap-2">
      <RadioGroupItem id="small" value="small" />
      <Label for="small">Small</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="medium" value="medium" />
      <Label for="medium">Medium</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="large" value="large" />
      <Label for="large">Large</Label>
    </div>
  </RadioGroup>
</template>
```

### Disabled Items

```vue
<template>
  <RadioGroup default-value="standard">
    <div class="flex items-center gap-2">
      <RadioGroupItem id="standard" value="standard" />
      <Label for="standard">Standard shipping</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="express" value="express" disabled />
      <Label for="express" class="opacity-50">Express shipping (unavailable)</Label>
    </div>
  </RadioGroup>
</template>
```

### Disabled Group

```vue
<template>
  <RadioGroup disabled default-value="a">
    <div class="flex items-center gap-2">
      <RadioGroupItem id="a" value="a" />
      <Label for="a">Option A</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="b" value="b" />
      <Label for="b">Option B</Label>
    </div>
  </RadioGroup>
</template>
```

### With Form

```vue
<script setup lang="ts">
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@stellar-vue-ui/core'
import { RadioGroup, RadioGroupItem } from '@stellar-vue-ui/core'
import { Label } from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="notification">
      <FormItem>
        <FormLabel>Notification preference</FormLabel>
        <FormControl>
          <RadioGroup v-bind="field">
            <div class="flex items-center gap-2">
              <RadioGroupItem id="all" value="all" />
              <Label for="all">All notifications</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem id="important" value="important" />
              <Label for="important">Important only</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem id="none" value="none" />
              <Label for="none">None</Label>
            </div>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </Form>
</template>
```

## API Reference

### RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | The controlled value (v-model) |
| `disabled` | `boolean` | `false` | Disables all radio items in the group |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout orientation |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### RadioGroupItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | The value of the radio item |
| `disabled` | `boolean` | `false` | Prevents interaction with this item |
| `id` | `string` | `undefined` | The id attribute of the radio element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when the selected value changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `RadioGroup` | `default` | RadioGroupItem elements |
| `RadioGroupItem` | -- | No slots; the indicator circle is rendered internally |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into and out of the radio group |
| `ArrowDown` / `ArrowRight` | Moves focus and selection to next item |
| `ArrowUp` / `ArrowLeft` | Moves focus and selection to previous item |
| `Space` | Selects the focused item |

### ARIA Attributes

- `RadioGroup` renders with `role="radiogroup"` (via Radix Vue)
- Each `RadioGroupItem` has `role="radio"` with `aria-checked`
- Disabled items have `aria-disabled="true"`
- `orientation` attribute affects arrow key navigation direction
- A filled circle indicator is shown for the selected item

## Related

- [Checkbox](/components/checkbox) -- For individual or multiple selections
- [Select](/components/select) -- For selecting from a dropdown list
- [Switch](/components/switch) -- For binary on/off toggles
- [Form](/components/form) -- For form validation integration
