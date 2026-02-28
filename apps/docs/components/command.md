# Command

A searchable command palette for quickly finding and executing actions or navigating content. Supports grouping, keyboard navigation, keyboard shortcuts display, and a dialog variant. Can be used standalone or inside a dialog overlay.

## Installation

::: code-group

```bash [CLI]
npx stellar add command
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@stellar-vue-ui/core'
</script>

<template>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Search Emoji</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

## Examples

### Command Dialog

Use `CommandDialog` to render the command palette in a modal overlay, typically triggered by a keyboard shortcut:

```vue
<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@stellar-vue-ui/core'
import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    open.value = !open.value
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <p class="text-sm text-muted-foreground">
    Press <kbd>Cmd+K</kbd> to open the command palette.
  </p>

  <CommandDialog v-model:open="open">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Search Emoji</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          Profile
          <CommandShortcut>Cmd+P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Settings
          <CommandShortcut>Cmd+S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
```

### With Groups and Separators

```vue
<template>
  <Command class="rounded-lg border shadow-md">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Recent">
        <CommandItem>Dashboard</CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Actions">
        <CommandItem>New File</CommandItem>
        <CommandItem>New Project</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

### Disabled Items

```vue
<template>
  <Command>
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandGroup heading="Actions">
        <CommandItem>Copy</CommandItem>
        <CommandItem>Paste</CommandItem>
        <CommandItem disabled>
          Delete (no permission)
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

## API Reference

### Command Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `undefined` | Placeholder override for CommandInput |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### CommandDialog Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state (v-model:open) |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes for the Command root |

### CommandInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `modelValue` | `string` | `''` | Input value (v-model) |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### CommandGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `undefined` | Group heading label |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### CommandItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Value used for filtering. Falls back to text content. |
| `disabled` | `boolean` | `false` | Prevents selection |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Emitted when CommandDialog open state changes |
| `select` | -- | Emitted when a CommandItem is selected |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Command` | `default` | CommandInput, CommandList |
| `CommandDialog` | `default` | CommandInput, CommandList |
| `CommandList` | `default` | CommandGroup, CommandEmpty, CommandSeparator |
| `CommandGroup` | `default` | CommandItem elements |
| `CommandItem` | `default` | Item label and optional CommandShortcut |
| `CommandShortcut` | `default` | Keyboard shortcut text |
| `CommandEmpty` | `default` | Content shown when no items match |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `ArrowDown` | Moves highlight to next item |
| `ArrowUp` | Moves highlight to previous item |
| `Enter` | Selects the highlighted item |
| `Escape` | Closes the command dialog |
| Type-ahead | Filters items in real-time |

### ARIA Attributes

- The Command root has `role="combobox"` with `aria-haspopup="listbox"`
- Items are highlighted visually and announced by screen readers
- Disabled items are skipped during keyboard navigation
- The search input filters items in real time, updating the accessible list
- In dialog mode, focus is trapped within the dialog

## Related

- [Dialog](/components/dialog) -- CommandDialog builds on the Dialog component
- [Dropdown Menu](/components/dropdown-menu) -- For action menus without search
- [Select](/components/select) -- For selecting a value from a list
