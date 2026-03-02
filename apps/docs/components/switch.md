# Switch

A toggle control that allows the user to switch between on and off states. Supports three sizes and integrates with forms. Built on Radix Vue's Switch primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add switch
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Switch } from '@stellar-vue-ui/core'
```

## Usage

### Basic

<ComponentPreview title="Basic">
  <SwitchBasic />
  <template #code>

```vue
<script setup lang="ts">
import { Label, Switch } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch id="airplane" v-model="enabled" />
    <Label for="airplane">Airplane Mode</Label>
  </div>
</template>
```

  </template>
</ComponentPreview>

## Examples

### Sizes

Three sizes are available via the `size` prop:

```vue
<template>
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-2">
      <Switch size="sm" />
      <Label>Small</Label>
    </div>
    <div class="flex items-center gap-2">
      <Switch size="md" />
      <Label>Medium</Label>
    </div>
    <div class="flex items-center gap-2">
      <Switch size="lg" />
      <Label>Large</Label>
    </div>
  </div>
</template>
```

| Size | Dimensions        | Thumb Size | Description                       |
| ---- | ----------------- | ---------- | --------------------------------- |
| `sm` | `h-5 w-9`         | `h-4 w-4`  | Compact size for dense UIs        |
| `md` | `h-6 w-11`        | `h-5 w-5`  | Default size                      |
| `lg` | `h-7 w-[3.25rem]` | `h-6 w-6`  | Larger size for prominent toggles |

### Disabled

```vue
<template>
  <div class="flex items-center gap-2">
    <Switch disabled />
    <Label class="opacity-50">Disabled switch</Label>
  </div>
</template>
```

### With Form

```vue
<script setup lang="ts">
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Switch,
} from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="marketing">
      <FormItem class="flex items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <FormLabel>Marketing emails</FormLabel>
          <FormDescription>Receive emails about new products and features.</FormDescription>
        </div>
        <FormControl>
          <Switch v-bind="field" />
        </FormControl>
      </FormItem>
    </FormField>
  </Form>
</template>
```

## API Reference

### Props

| Prop         | Type                      | Default     | Description                 |
| ------------ | ------------------------- | ----------- | --------------------------- |
| `modelValue` | `boolean`                 | `false`     | The checked state (v-model) |
| `disabled`   | `boolean`                 | `false`     | Prevents interaction        |
| `size`       | `'sm' \| 'md' \| 'lg'`    | `'md'`      | Size of the switch          |
| `class`      | `HTMLAttributes['class']` | `undefined` | Additional CSS classes      |

### Events

| Event               | Payload   | Description                            |
| ------------------- | --------- | -------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the checked state changes |

### Slots

This component does not expose any slots. The thumb is rendered internally.

## Accessibility

### Keyboard Interaction

| Key     | Action                         |
| ------- | ------------------------------ |
| `Space` | Toggles the switch             |
| `Enter` | Toggles the switch             |
| `Tab`   | Moves focus to/from the switch |

### ARIA Attributes

- Renders with `role="switch"` (via Radix Vue)
- `aria-checked` reflects the current on/off state
- `aria-disabled` is set when disabled
- The switch uses `peer` CSS class so adjacent labels can react to its disabled state
- Focus ring is visible when navigating with keyboard

## Related

- [Checkbox](/components/checkbox) -- For on/off toggles that are part of a form submission
- [Radio Group](/components/radio-group) -- For mutually exclusive selections
- [Label](/components/label) -- Always pair switches with labels
- [Form](/components/form) -- For form validation integration
