# Menubar

A horizontal menu bar for application-style navigation, similar to native desktop menus. Each menu in the bar can contain items, checkbox items, radio groups, labels, separators, keyboard shortcuts, and submenus. Built on Radix Vue's Menubar primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add menubar
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@stellar-vue-ui/core'
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab
          <MenubarShortcut>Cmd+T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          New Window
          <MenubarShortcut>Cmd+N</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          Print
          <MenubarShortcut>Cmd+P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Undo
          <MenubarShortcut>Cmd+Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Redo
          <MenubarShortcut>Shift+Cmd+Z</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Cut</MenubarItem>
        <MenubarItem>Copy</MenubarItem>
        <MenubarItem>Paste</MenubarItem>
      </MenubarContent>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Zoom In</MenubarItem>
        <MenubarItem>Zoom Out</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Toggle Fullscreen</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

## Examples

### With Checkbox and Radio Items

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showToolbar = ref(true)
const showSidebar = ref(false)
const theme = ref('system')
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem v-model:checked="showToolbar">
          Toolbar
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model:checked="showSidebar">
          Sidebar
        </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarLabel>Theme</MenubarLabel>
        <MenubarRadioGroup v-model="theme">
          <MenubarRadioItem value="light">
            Light
          </MenubarRadioItem>
          <MenubarRadioItem value="dark">
            Dark
          </MenubarRadioItem>
          <MenubarRadioItem value="system">
            System
          </MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

### With Submenus

```vue
<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>New File</MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>Share</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Email</MenubarItem>
            <MenubarItem>Slack</MenubarItem>
            <MenubarItem>Copy Link</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem disabled>
          Print (unavailable)
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

## API Reference

### Menubar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Controlled open menu value |
| `defaultValue` | `string` | `undefined` | Initially open menu |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Value for controlled open state |

### MenubarTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment against the trigger |
| `sideOffset` | `number` | `8` | Distance from the trigger |
| `alignOffset` | `number` | `-4` | Alignment offset |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarCheckboxItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Controlled checked state |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarRadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Controlled value (v-model) |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarRadioItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | The value of the radio item |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### MenubarSubTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | -- | Emitted when a menu item is selected |

### Slots

All sub-components expose a `default` slot for their content.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `ArrowRight` | Opens the next menu or moves to the next trigger |
| `ArrowLeft` | Opens the previous menu or closes a submenu |
| `ArrowDown` | Opens a menu; moves focus to next item |
| `ArrowUp` | Moves focus to previous item |
| `Enter` / `Space` | Opens a menu from trigger; selects a focused item |
| `Escape` | Closes the current menu |

### ARIA Attributes

- The menubar has `role="menubar"`
- Each trigger has `role="menuitem"` within the bar context
- Content panels have `role="menu"`
- Items have `role="menuitem"`, checkbox items have `role="menuitemcheckbox"`, radio items have `role="menuitemradio"`
- Disabled items have `aria-disabled="true"`

## Related

- [Dropdown Menu](/components/dropdown-menu) -- Single-button dropdown menu
- [Context Menu](/components/context-menu) -- Right-click triggered menu
- [Navigation Menu](/components/navigation-menu) -- For website navigation with content panels
