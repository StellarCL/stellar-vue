# Textarea

A multi-line text input for capturing longer form text content. Supports error states, auto-generated IDs, and form integration.

## Installation

::: code-group

```bash [CLI]
npx stellar add textarea
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Textarea } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Textarea } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <Textarea v-model="message" placeholder="Type your message here" />
</template>
```

## Examples

### With Label

```vue
<script setup lang="ts">
import { Label, Textarea } from '@stellar-vue-ui/core'
</script>

<template>
  <div class="grid gap-2">
    <Label for="bio">Bio</Label>
    <Textarea id="bio" placeholder="Tell us about yourself" />
  </div>
</template>
```

### Custom Rows

Control the visible height with the `rows` prop:

```vue
<template>
  <div class="grid gap-4">
    <Textarea rows="2" placeholder="Short textarea (2 rows)" />
    <Textarea rows="6" placeholder="Tall textarea (6 rows)" />
  </div>
</template>
```

### Error State

Set the `error` prop to apply destructive styling:

```vue
<template>
  <div class="grid gap-2">
    <Label for="comment">Comment</Label>
    <Textarea id="comment" error placeholder="Required field" />
    <p class="text-sm text-destructive">
      Please enter a comment.
    </p>
  </div>
</template>
```

### Disabled

```vue
<template>
  <Textarea disabled placeholder="Disabled textarea" />
</template>
```

### Read-only

```vue
<template>
  <Textarea readonly model-value="This content is read-only and cannot be modified." />
</template>
```

### With Form

```vue
<script setup lang="ts">
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little about yourself" v-bind="field" />
        </FormControl>
        <FormDescription>
          You can use up to 500 characters.
        </FormDescription>
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
| `modelValue` | `string` | `undefined` | The controlled value (v-model) |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `required` | `boolean` | `false` | Whether the textarea is required |
| `readonly` | `boolean` | `false` | Whether the textarea is read-only |
| `error` | `boolean` | `false` | Whether the textarea is in an error state |
| `rows` | `number` | `3` | The number of visible text rows |
| `id` | `string` | auto-generated | The id attribute of the textarea element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes merged via `cn()` |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when the textarea value changes |

### Slots

This component does not expose any slots.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the textarea |
| Standard text input keys | Normal text entry behavior |

### ARIA Attributes

- Renders as a native `<textarea>` element for built-in accessibility
- `disabled`, `required`, and `readonly` attributes are set from props
- Use a `<Label>` component with a matching `for` attribute for accessible labeling
- When in error state, pair with an error message using `aria-describedby`

## Related

- [Input](/components/input) -- For single-line text input
- [Label](/components/label) -- Always pair textareas with labels
- [Form](/components/form) -- For form validation integration
