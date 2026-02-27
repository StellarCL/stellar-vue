# Button

A versatile button component with multiple visual variants, sizes, loading state, and full accessibility support. Built on the Radix Vue `Primitive` component for flexible rendering.

## Installation

::: code-group

```bash [CLI]
npx stellar add button
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Button } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Button>Click me</Button>
</template>
```

## Examples

### Variants

The Button component supports 6 visual variants through the `variant` prop:

```vue
<template>
  <div class="flex flex-wrap gap-4">
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
</template>
```

**default** — Primary action with solid background. Use for the most important action on the page.

**secondary** — Subdued background for secondary actions that complement the primary action.

**destructive** — Red-toned variant for dangerous or irreversible actions like deleting data.

**outline** — Bordered button with transparent background. Good for secondary actions alongside a solid button.

**ghost** — No background or border until hovered. Use for tertiary actions or toolbar buttons.

**link** — Renders as a text link with underline on hover. Use for inline navigation actions.

### Sizes

Four sizes are available via the `size` prop:

```vue
<template>
  <div class="flex items-center gap-4">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </Button>
  </div>
</template>
```

| Size | Height | Description |
|------|--------|-------------|
| `sm` | `h-9` | Compact size for dense UIs and inline actions |
| `md` | `h-10` | Default size for most use cases |
| `lg` | `h-11` | Larger size for prominent calls to action |
| `icon` | `h-10 w-10` | Square button for icon-only actions |

### With Icon

Combine text with an icon using the default slot. The button includes a `gap-2` class for automatic spacing:

```vue
<template>
  <Button>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    Continue
  </Button>
</template>
```

### Loading State

Set the `loading` prop to `true` to show a spinner and disable interaction. The button automatically displays an animated SVG spinner alongside the slot content, and sets `aria-busy="true"` for screen readers:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@stellar-vue-ui/core'

const isLoading = ref(false)

async function handleClick() {
  isLoading.value = true
  await submitForm()
  isLoading.value = false
}
</script>

<template>
  <Button :loading="isLoading" @click="handleClick">
    Submit
  </Button>
</template>
```

When `loading` is `true`:
- The button becomes disabled (clicks are ignored)
- An animated spinner SVG is prepended to the slot content
- `aria-disabled` and `aria-busy` are set for assistive technologies

### Disabled

```vue
<template>
  <Button disabled>Disabled</Button>
  <Button variant="outline" disabled>Disabled Outline</Button>
</template>
```

Disabled buttons have `pointer-events: none` and reduced opacity (50%) applied automatically.

### As Link (asChild)

Use the `asChild` prop to render the button styling on a child element, such as a router link. This is powered by Radix Vue's `Primitive` component:

```vue
<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
</script>

<template>
  <Button as-child>
    <a href="https://github.com/StellarCL/stellar-vue">
      GitHub
    </a>
  </Button>
</template>
```

With Vue Router:

```vue
<template>
  <Button as-child>
    <RouterLink to="/dashboard">
      Go to Dashboard
    </RouterLink>
  </Button>
</template>
```

### Full Width

Apply a `w-full` class to make the button span its container:

```vue
<template>
  <Button class="w-full">Full Width Button</Button>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual variant of the button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show the loading spinner and disable interaction |
| `asChild` | `boolean` | `false` | Render as the child element instead of a `<button>`. Uses Radix Vue Primitive. |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes merged via `cn()` |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when the button is clicked. Not fired when `disabled` or `loading` is `true`. |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button content. Can include text, icons, or any inline elements. |

### CSS Classes

The button uses the `buttonVariants` function from `class-variance-authority` to compose its classes. The base classes include:

```
inline-flex items-center justify-center gap-2 whitespace-nowrap
rounded-md text-sm font-medium transition-colors
focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
```

You can access the variant function directly for custom use:

```typescript
import { buttonVariants } from '@stellar-vue-ui/core'

const classes = buttonVariants({ variant: 'outline', size: 'lg' })
```

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Enter` | Activates the button |
| `Space` | Activates the button |

### ARIA Attributes

- Renders as a native `<button>` element with `type="button"` by default (prevents accidental form submission)
- `role="button"` is implicit from the native element
- `aria-disabled` is set when `loading` is `true` (instead of the `disabled` attribute, so screen readers still announce the element)
- `aria-busy="true"` is set during loading state to announce that an operation is in progress
- When using `asChild`, ensure the child element is interactive (e.g., an `<a>` tag) so it remains keyboard accessible

### Screen Reader Behavior

- The button content (default slot) is read as the accessible name
- During loading, screen readers announce "busy" due to `aria-busy`
- Disabled buttons remain in the tab order with `aria-disabled` rather than being removed entirely

## Related

- [Input](/components/input) — Often paired with buttons in forms
- [Dialog](/components/dialog) — Commonly triggered by buttons
- [Form](/components/form) — For form submission patterns
- [Card](/components/card) — Buttons are frequently placed in CardFooter
