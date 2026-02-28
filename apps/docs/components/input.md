# Input

A text input field for capturing user data. Supports multiple input types, error states, and integrates seamlessly with the Form component for validation.

## Installation

::: code-group

```bash [CLI]
npx stellar add input
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Input } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Input } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="Enter your name" />
</template>
```

## Examples

### Input Types

The Input component supports several HTML input types through the `type` prop:

```vue
<template>
  <div class="grid gap-4">
    <Input type="text" placeholder="Text input" />
    <Input type="email" placeholder="Email address" />
    <Input type="password" placeholder="Password" />
    <Input type="number" placeholder="Number" />
    <Input type="search" placeholder="Search..." />
    <Input type="tel" placeholder="Phone number" />
    <Input type="url" placeholder="https://example.com" />
  </div>
</template>
```

### With Label

Pair the Input with a Label component for accessible form fields:

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

### Error State

Set the `error` prop to `true` to apply destructive styling, indicating a validation error:

```vue
<template>
  <div class="grid gap-2">
    <Label for="username">Username</Label>
    <Input id="username" error placeholder="Required field" />
    <p class="text-sm text-destructive">This field is required.</p>
  </div>
</template>
```

### Disabled

```vue
<template>
  <Input disabled placeholder="Disabled input" />
</template>
```

### Read-only

```vue
<template>
  <Input readonly model-value="Read-only value" />
</template>
```

### With Form

Use Input inside the Form component for validation integration:

```vue
<script setup lang="ts">
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input } from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="you@example.com" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </Form>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | The type of the input element |
| `modelValue` | `string \| number` | `undefined` | The controlled value of the input (for v-model) |
| `placeholder` | `string` | `undefined` | Placeholder text displayed when the input is empty |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `error` | `boolean` | `false` | Whether the input is in an error state |
| `id` | `string` | auto-generated | The id attribute of the input element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes merged via `cn()` |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number` | Emitted when the input value changes (for v-model binding) |

### Slots

This component does not expose any slots. Content is controlled via the `modelValue` prop.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the input |
| Standard text input keys | Normal text entry behavior |

### ARIA Attributes

- Renders as a native `<input>` element for built-in accessibility
- `disabled` attribute is set when the input is disabled
- `required` attribute is set when the input is required
- `readonly` attribute is set when the input is read-only
- Use a `<Label>` component with a matching `for` attribute for accessible labeling
- When in error state, pair with an error message and use `aria-describedby` for association

## Related

- [Label](/components/label) -- Always pair inputs with labels for accessibility
- [Textarea](/components/textarea) -- For multi-line text input
- [Form](/components/form) -- For form validation and field management
- [Button](/components/button) -- Often paired with inputs in forms
