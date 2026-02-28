# Dropdown Menu

A menu of actions or options triggered by a button. Supports items, checkbox items, radio groups, separators, labels, keyboard shortcuts, submenus, and disabled states. Built on Radix Vue's DropdownMenu primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add dropdown-menu
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@stellar-vue-ui/core'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Open Menu
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

## Examples

### With Labels and Groups

```vue
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        My Account
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>Shift+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>Cmd+B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>Cmd+S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Checkbox Items

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showStatusBar = ref(true)
const showActivityBar = ref(false)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuCheckboxItem v-model:checked="showStatusBar">
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem v-model:checked="showActivityBar">
        Activity Bar
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Radio Items

```vue
<script setup lang="ts">
import { ref } from 'vue'

const position = ref('bottom')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Panel Position
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="position">
        <DropdownMenuRadioItem value="top">
          Top
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">
          Bottom
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">
          Right
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Submenus

```vue
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Options
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuItem>New Tab</DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Save Page As...</DropdownMenuItem>
          <DropdownMenuItem>Developer Tools</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled>
        Print (unavailable)
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

## API Reference

### DropdownMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Open state when initially rendered |

### DropdownMenuTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DropdownMenuContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sideOffset` | `number` | `4` | Distance in pixels from the trigger |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DropdownMenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding for alignment with indicator items |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DropdownMenuCheckboxItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Controlled checked state |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DropdownMenuRadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Controlled value (v-model) |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DropdownMenuRadioItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | The value of the radio item |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DropdownMenuSubTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Emitted when the menu open state changes |
| `select` | -- | Emitted when a DropdownMenuItem is selected |

### Slots

All sub-components expose a `default` slot for their content.

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Opens the menu from trigger; selects a focused item |
| `ArrowDown` | Opens the menu; moves focus to next item |
| `ArrowUp` | Moves focus to previous item |
| `ArrowRight` | Opens a submenu when focused on a sub-trigger |
| `ArrowLeft` | Closes a submenu |
| `Escape` | Closes the menu |

### ARIA Attributes

- Trigger has `aria-haspopup="menu"` and `aria-expanded`
- Content has `role="menu"`
- Items have `role="menuitem"`
- Checkbox items have `role="menuitemcheckbox"` with `aria-checked`
- Radio items have `role="menuitemradio"` with `aria-checked`
- Disabled items have `aria-disabled="true"`

## Related

- [Context Menu](/components/context-menu) -- Right-click triggered menu with the same item types
- [Menubar](/components/menubar) -- Horizontal menu bar with dropdown menus
- [Command](/components/command) -- Searchable command palette
- [Select](/components/select) -- For selecting a single value from a list
