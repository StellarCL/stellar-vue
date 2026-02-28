# Form

A structured form system for building validated forms with accessible labels, descriptions, and error messages. Integrates with VeeValidate for declarative field-level validation and error handling.

## Installation

::: code-group

```bash [CLI]
npx stellar add form
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

::: tip
The Form component depends on `vee-validate` for field validation. Install it as a peer dependency:
```bash
pnpm add vee-validate
```
:::

## Import

```typescript
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@stellar-vue-ui/core'
import { Input, Button } from '@stellar-vue-ui/core'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <Form @submit="onSubmit">
    <FormField v-slot="{ field }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="johndoe" v-bind="field" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
</template>
```

## Examples

### Multiple Fields

```vue
<script setup lang="ts">
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@stellar-vue-ui/core'
import { Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button } from '@stellar-vue-ui/core'
import { useForm } from 'vee-validate'
</script>

<template>
  <Form @submit="handleSubmit">
    <FormField v-slot="{ field }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Your name" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="you@example.com" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us about yourself" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">Save profile</Button>
  </Form>
</template>
```

### With Checkbox and Switch

```vue
<script setup lang="ts">
import { Form, FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from '@stellar-vue-ui/core'
import { Checkbox, Switch, Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="terms">
      <FormItem class="flex items-start gap-2">
        <FormControl>
          <Checkbox v-bind="field" />
        </FormControl>
        <div class="grid gap-1 leading-none">
          <FormLabel>Accept terms and conditions</FormLabel>
          <FormDescription>You agree to our Terms of Service.</FormDescription>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="marketing">
      <FormItem class="flex items-center justify-between rounded-lg border p-4">
        <div>
          <FormLabel>Marketing emails</FormLabel>
          <FormDescription>Receive emails about new products.</FormDescription>
        </div>
        <FormControl>
          <Switch v-bind="field" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button type="submit">Submit</Button>
  </Form>
</template>
```

## API Reference

### Form Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### FormField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | *required* | Field name for VeeValidate registration |

### FormItem, FormLabel, FormControl, FormDescription, FormMessage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `submit` | `Event` | Native form submission event |

### Slots

| Component | Slot | Props | Description |
|-----------|------|-------|-------------|
| `Form` | `default` | -- | FormField elements and submit button |
| `FormField` | `default` | `{ field, error, meta }` | Field binding object, error message, and VeeValidate meta |
| `FormItem` | `default` | -- | Label, control, description, message |
| `FormLabel` | `default` | -- | Label text |
| `FormControl` | `default` | -- | The form control (Input, Select, etc.) |
| `FormDescription` | `default` | -- | Help text below the control |
| `FormMessage` | `default` | -- | Validation error message (auto-populated from VeeValidate) |

### FormField Slot Props

The `FormField` scoped slot exposes:

| Prop | Type | Description |
|------|------|-------------|
| `field` | `object` | Binding object with `name`, `modelValue`, `onUpdate:modelValue`, `onBlur` |
| `error` | `string \| undefined` | Current validation error message |
| `meta` | `FieldMeta` | VeeValidate field metadata (touched, dirty, valid, etc.) |

## Accessibility

- `FormLabel` renders as a `<label>` element associated with the control via auto-generated IDs
- `FormDescription` is associated with the control via `aria-describedby`
- `FormMessage` is associated with the control via `aria-describedby` when an error is present
- Invalid fields have `aria-invalid="true"` set automatically
- The form renders as a native `<form>` element with `space-y-6` layout

## Related

- [Input](/components/input) -- Text input control for forms
- [Textarea](/components/textarea) -- Multi-line text input
- [Select](/components/select) -- Dropdown selection
- [Checkbox](/components/checkbox) -- Boolean form controls
- [Switch](/components/switch) -- Toggle controls
- [Radio Group](/components/radio-group) -- Mutually exclusive options
