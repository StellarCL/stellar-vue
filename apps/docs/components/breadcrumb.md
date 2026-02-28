# Breadcrumb

A navigation aid that shows the user's current location within a hierarchical structure. Supports custom separators, ellipsis for collapsed paths, and accessible ARIA landmarks.

## Installation

::: code-group

```bash [CLI]
npx stellar add breadcrumb
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@stellar-vue-ui/core'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

## Examples

### With Ellipsis

Use `BreadcrumbEllipsis` to collapse long paths:

```vue
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

### Custom Separator

Override the default chevron separator using the slot:

```vue
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">
          Docs
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Current</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

### With Router Links

Use `asChild` to render custom link components (e.g., Vue Router `RouterLink`):

```vue
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <RouterLink to="/">
            Home
          </RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Dashboard</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

## API Reference

### Breadcrumb Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessible label for the navigation landmark |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### BreadcrumbLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `undefined` | URL the link points to |
| `asChild` | `boolean` | `false` | Render as child element (for custom link components) |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

This component does not emit any custom events. Navigation is handled by the link elements.

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Breadcrumb` | `default` | BreadcrumbList |
| `BreadcrumbList` | `default` | BreadcrumbItem and BreadcrumbSeparator elements |
| `BreadcrumbItem` | `default` | BreadcrumbLink, BreadcrumbPage, or BreadcrumbEllipsis |
| `BreadcrumbLink` | `default` | Link text |
| `BreadcrumbPage` | `default` | Current page text |
| `BreadcrumbSeparator` | `default` | Custom separator character (defaults to chevron icon) |

## Accessibility

### ARIA Attributes

- `Breadcrumb` renders as `<nav>` with `aria-label` (defaults to "Breadcrumb")
- `BreadcrumbList` renders as an `<ol>` (ordered list) reflecting the hierarchical structure
- `BreadcrumbPage` renders with `role="link"` and `aria-current="page"` to indicate the current location
- `BreadcrumbSeparator` is marked with `aria-hidden="true"` so screen readers skip the visual separators
- `BreadcrumbEllipsis` is typically hidden from assistive technologies

### Screen Reader Behavior

- Screen readers announce the breadcrumb as a navigation landmark
- The list structure communicates the hierarchical relationship
- The current page is announced with "current page" context

## Related

- [Navigation Menu](/components/navigation-menu) -- For primary site navigation
- [Tabs](/components/tabs) -- For switching between content panels
