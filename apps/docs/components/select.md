# Select

A form control for selecting a single value from a dropdown list of options. Built on Radix Vue's Select primitives with built-in scroll buttons and keyboard navigation.

## Installation

::: code-group

```bash [CLI]
npx stellar add select
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const fruit = ref('')
</script>

<template>
  <Select v-model="fruit">
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">
        Apple
      </SelectItem>
      <SelectItem value="banana">
        Banana
      </SelectItem>
      <SelectItem value="cherry">
        Cherry
      </SelectItem>
    </SelectContent>
  </Select>
</template>
```

## Examples

### With Groups

Organize options into labeled groups:

```vue
<template>
  <Select>
    <SelectTrigger class="w-[200px]">
      <SelectValue placeholder="Select a timezone" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>North America</SelectLabel>
        <SelectItem value="est">
          Eastern (EST)
        </SelectItem>
        <SelectItem value="cst">
          Central (CST)
        </SelectItem>
        <SelectItem value="pst">
          Pacific (PST)
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Europe</SelectLabel>
        <SelectItem value="gmt">
          GMT
        </SelectItem>
        <SelectItem value="cet">
          Central European (CET)
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

### Disabled Items

```vue
<template>
  <Select>
    <SelectTrigger class="w-[200px]">
      <SelectValue placeholder="Select a plan" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="free">
        Free
      </SelectItem>
      <SelectItem value="pro">
        Pro
      </SelectItem>
      <SelectItem value="enterprise" disabled>
        Enterprise (contact us)
      </SelectItem>
    </SelectContent>
  </Select>
</template>
```

### Disabled Select

```vue
<template>
  <Select disabled>
    <SelectTrigger class="w-[200px]">
      <SelectValue placeholder="Disabled" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="a">
        Option A
      </SelectItem>
    </SelectContent>
  </Select>
</template>
```

### With Form

```vue
<script setup lang="ts">
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@stellar-vue-ui/core'
</script>

<template>
  <Form>
    <FormField v-slot="{ field }" name="role">
      <FormItem>
        <FormLabel>Role</FormLabel>
        <Select v-bind="field">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="admin">
              Admin
            </SelectItem>
            <SelectItem value="editor">
              Editor
            </SelectItem>
            <SelectItem value="viewer">
              Viewer
            </SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
  </Form>
</template>
```

## API Reference

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Controlled value (v-model) |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `defaultOpen` | `boolean` | `false` | Open state when initially rendered |

### SelectTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### SelectValue Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `undefined` | Placeholder text when no value is selected |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### SelectContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'popper' \| 'item-aligned'` | `'popper'` | Positioning mode of the content |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### SelectItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | The value of the item |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when the selected value changes |

### Slots

All sub-components expose a `default` slot for their content.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Opens the select; selects the focused item |
| `ArrowDown` | Opens the select; moves focus to next item |
| `ArrowUp` | Moves focus to previous item |
| `Home` | Moves focus to first item |
| `End` | Moves focus to last item |
| `Escape` | Closes the select |
| Type-ahead | Focuses matching item |

### ARIA Attributes

- Trigger has `role="combobox"` with `aria-expanded` and `aria-haspopup="listbox"`
- Content has `role="listbox"`
- Items have `role="option"` with `aria-selected`
- Disabled items have `aria-disabled="true"`
- A chevron icon with `aria-hidden="true"` is rendered in the trigger

## Related

- [Dropdown Menu](/components/dropdown-menu) -- For action menus rather than value selection
- [Command](/components/command) -- For searchable selection
- [Radio Group](/components/radio-group) -- For visible inline option selection
- [Form](/components/form) -- For form validation integration
