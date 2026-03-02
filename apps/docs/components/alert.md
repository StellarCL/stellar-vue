# Alert

A component for displaying important messages and feedback to users. Supports five semantic variants for different alert types with optional title and description sub-components.

## Installation

::: code-group

```bash [CLI]
npx stellar add alert
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Alert, AlertDescription, AlertTitle } from '@stellar-vue-ui/core'
```

## Usage

### Basic

<ComponentPreview title="Basic">
  <AlertBasic />
  <template #code>

```vue
<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@stellar-vue-ui/core'
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription> You can add components to your app using the CLI. </AlertDescription>
  </Alert>
</template>
```

  </template>
</ComponentPreview>

## Examples

### Variants

The Alert component supports five visual variants through the `variant` prop:

```vue
<template>
  <div class="grid gap-4">
    <Alert variant="default">
      <AlertTitle>Default</AlertTitle>
      <AlertDescription>A standard informational alert.</AlertDescription>
    </Alert>

    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>

    <Alert variant="success">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>

    <Alert variant="warning">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Your session is about to expire.</AlertDescription>
    </Alert>

    <Alert variant="info">
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>A new version is available for download.</AlertDescription>
    </Alert>
  </div>
</template>
```

**default** -- Standard alert with neutral styling. Use for general information.

**destructive** -- Red-toned alert for errors and critical failures.

**success** -- Green-toned alert for successful operations.

**warning** -- Yellow-toned alert for warnings that need attention.

**info** -- Blue-toned alert for informational notices.

### With Icon

Place an SVG icon before the title to create an icon + text alert. The alert's CSS automatically positions the icon and adjusts content padding:

```vue
<template>
  <Alert variant="destructive">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
  </Alert>
</template>
```

### Description Only

You can use just the description without a title:

```vue
<template>
  <Alert>
    <AlertDescription> This is a simple alert with only a description. </AlertDescription>
  </Alert>
</template>
```

## API Reference

### Alert Props

| Prop      | Type                                                             | Default     | Description            |
| --------- | ---------------------------------------------------------------- | ----------- | ---------------------- |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning' \| 'info'` | `'default'` | Visual variant         |
| `class`   | `HTMLAttributes['class']`                                        | `undefined` | Additional CSS classes |

### AlertTitle Props

| Prop    | Type                      | Default     | Description            |
| ------- | ------------------------- | ----------- | ---------------------- |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### AlertDescription Props

| Prop    | Type                      | Default     | Description            |
| ------- | ------------------------- | ----------- | ---------------------- |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

This component does not emit any custom events.

### Slots

| Component          | Slot      | Description                                           |
| ------------------ | --------- | ----------------------------------------------------- |
| `Alert`            | `default` | SVG icon (optional), AlertTitle, and AlertDescription |
| `AlertTitle`       | `default` | Title text content                                    |
| `AlertDescription` | `default` | Description text content                              |

## Accessibility

- The `Alert` component renders with `role="alert"`, which causes screen readers to announce the content immediately when it appears in the DOM
- Use `AlertTitle` to provide a concise summary
- SVG icons placed as first children are automatically positioned and colored to match the variant

## Related

- [Card](/components/card) -- For general content containers rather than status messages
- [Dialog](/components/dialog) -- For alerts that require user action
- [Badge](/components/badge) -- For inline status indicators
