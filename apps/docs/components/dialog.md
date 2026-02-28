# Dialog

A modal dialog overlay that interrupts the user's workflow with important content or actions. Built on Radix Vue's Dialog primitives with built-in focus trapping, backdrop overlay, and accessible close behavior.

## Installation

::: code-group

```bash [CLI]
npx stellar add dialog
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

## Examples

### Controlled Open State

Use `v-model:open` to control the dialog state programmatically:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open Dialog</Button>

  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Controlled Dialog</DialogTitle>
        <DialogDescription>This dialog is controlled with v-model:open.</DialogDescription>
      </DialogHeader>
      <Button @click="isOpen = false">Close</Button>
    </DialogContent>
  </Dialog>
</template>
```

### With Form Content

```vue
<script setup lang="ts">
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@stellar-vue-ui/core'
import { Button, Input, Label } from '@stellar-vue-ui/core'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

### Default Open

Use the `defaultOpen` prop to show the dialog on initial render:

```vue
<template>
  <Dialog :default-open="true">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Welcome!</DialogTitle>
        <DialogDescription>This dialog appears immediately on mount.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
```

## API Reference

### Dialog Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state. Bind with `v-model:open`. |
| `defaultOpen` | `boolean` | `false` | Open state when initially rendered (uncontrolled) |

### DialogTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element instead of a button |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DialogContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DialogClose Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DialogHeader, DialogFooter, DialogTitle, DialogDescription Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Emitted when the dialog open state changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Dialog` | `default` | Dialog sub-components (Trigger, Content) |
| `DialogTrigger` | `default` | The trigger element |
| `DialogContent` | `default` | Dialog body content. Includes a built-in close button. |
| `DialogHeader` | `default` | Title and description |
| `DialogFooter` | `default` | Action buttons |
| `DialogTitle` | `default` | Heading text |
| `DialogDescription` | `default` | Descriptive text |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Escape` | Closes the dialog |
| `Tab` | Cycles focus within the dialog (focus trapped) |
| `Shift + Tab` | Cycles focus backwards within the dialog |

### ARIA Attributes

- `DialogContent` renders with `role="dialog"` and `aria-modal="true"` (via Radix Vue)
- `DialogTitle` is associated as the dialog's accessible name via `aria-labelledby`
- `DialogDescription` is associated via `aria-describedby`
- Focus is automatically trapped within the dialog content
- Focus returns to the trigger element when the dialog closes
- A built-in close button with `sr-only` text "Close" is included in DialogContent

### Screen Reader Behavior

- When opened, screen readers announce the dialog title and description
- The backdrop overlay prevents interaction with content behind the dialog

## Related

- [Button](/components/button) -- Used as dialog triggers and action buttons
- [Input](/components/input) -- For form content within dialogs
- [Alert](/components/alert) -- For non-blocking status messages
- [Command](/components/command) -- CommandDialog provides a command palette in a dialog
