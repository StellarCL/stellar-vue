# Context Menu

A menu that appears on right-click, providing contextual actions for the target element. Supports the same item types as Dropdown Menu: standard items, checkbox items, radio groups, labels, separators, shortcuts, and submenus. Built on Radix Vue's ContextMenu primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add context-menu
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

<ComponentPreview title="Basic">
  <ClientOnly>
    <ContextMenuBasic />
  </ClientOnly>
  <template #code>

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@stellar-vue-ui/core'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>Alt+Left</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Forward
        <ContextMenuShortcut>Alt+Right</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Reload
        <ContextMenuShortcut>Cmd+R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>View Source</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

  </template>
</ComponentPreview>

## Examples

### With Checkbox Items

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showBookmarks = ref(true)
const showFullUrls = ref(false)
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed"
    >
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent class="w-64">
      <ContextMenuCheckboxItem v-model:checked="showBookmarks">
        Show Bookmarks Bar
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem v-model:checked="showFullUrls">
        Show Full URLs
      </ContextMenuCheckboxItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

### With Radio Group

```vue
<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('system')
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed"
    >
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent class="w-64">
      <ContextMenuLabel>Theme</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup v-model="theme">
        <ContextMenuRadioItem value="light"> Light </ContextMenuRadioItem>
        <ContextMenuRadioItem value="dark"> Dark </ContextMenuRadioItem>
        <ContextMenuRadioItem value="system"> System </ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

### With Submenus

```vue
<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed"
    >
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent class="w-64">
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Paste</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Email</ContextMenuItem>
          <ContextMenuItem>Slack</ContextMenuItem>
          <ContextMenuItem>Copy Link</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

## API Reference

### ContextMenu Props

| Prop          | Type      | Default     | Description                        |
| ------------- | --------- | ----------- | ---------------------------------- |
| `open`        | `boolean` | `undefined` | Controlled open state              |
| `defaultOpen` | `boolean` | `false`     | Open state when initially rendered |

### ContextMenuTrigger Props

| Prop      | Type                      | Default     | Description             |
| --------- | ------------------------- | ----------- | ----------------------- |
| `asChild` | `boolean`                 | `false`     | Render as child element |
| `class`   | `HTMLAttributes['class']` | `undefined` | Additional CSS classes  |

### ContextMenuContent Props

| Prop          | Type                      | Default     | Description               |
| ------------- | ------------------------- | ----------- | ------------------------- |
| `sideOffset`  | `number`                  | `0`         | Distance from the trigger |
| `alignOffset` | `number`                  | `2`         | Alignment offset          |
| `class`       | `HTMLAttributes['class']` | `undefined` | Additional CSS classes    |

### ContextMenuItem Props

| Prop       | Type                      | Default     | Description                     |
| ---------- | ------------------------- | ----------- | ------------------------------- |
| `inset`    | `boolean`                 | `false`     | Adds left padding for alignment |
| `disabled` | `boolean`                 | `false`     | Prevents interaction            |
| `class`    | `HTMLAttributes['class']` | `undefined` | Additional CSS classes          |

### ContextMenuCheckboxItem Props

| Prop       | Type                      | Default     | Description              |
| ---------- | ------------------------- | ----------- | ------------------------ |
| `checked`  | `boolean`                 | `false`     | Controlled checked state |
| `disabled` | `boolean`                 | `false`     | Prevents interaction     |
| `class`    | `HTMLAttributes['class']` | `undefined` | Additional CSS classes   |

### ContextMenuRadioGroup Props

| Prop         | Type                      | Default     | Description                |
| ------------ | ------------------------- | ----------- | -------------------------- |
| `modelValue` | `string`                  | `undefined` | Controlled value (v-model) |
| `class`      | `HTMLAttributes['class']` | `undefined` | Additional CSS classes     |

### ContextMenuRadioItem Props

| Prop       | Type                      | Default     | Description                 |
| ---------- | ------------------------- | ----------- | --------------------------- |
| `value`    | `string`                  | _required_  | The value of the radio item |
| `disabled` | `boolean`                 | `false`     | Prevents interaction        |
| `class`    | `HTMLAttributes['class']` | `undefined` | Additional CSS classes      |

### Events

| Event         | Payload   | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `update:open` | `boolean` | Emitted when the menu open state changes |
| `select`      | --        | Emitted when an item is selected         |

### Slots

All sub-components expose a `default` slot for their content.

## Accessibility

### Keyboard Interaction

| Key               | Action                       |
| ----------------- | ---------------------------- |
| `ArrowDown`       | Moves focus to next item     |
| `ArrowUp`         | Moves focus to previous item |
| `ArrowRight`      | Opens a submenu              |
| `ArrowLeft`       | Closes a submenu             |
| `Enter` / `Space` | Selects the focused item     |
| `Escape`          | Closes the context menu      |

### ARIA Attributes

- Content has `role="menu"`
- Items have `role="menuitem"`
- Checkbox items have `role="menuitemcheckbox"` with `aria-checked`
- Radio items have `role="menuitemradio"` with `aria-checked`
- Disabled items have `aria-disabled="true"`

## Related

- [Dropdown Menu](/components/dropdown-menu) -- Button-triggered menu with the same item types
- [Menubar](/components/menubar) -- Horizontal application menu bar
- [Command](/components/command) -- Searchable command palette
