# Pagination

A navigation component for splitting content across multiple pages. Supports page links, first/last navigation, ellipsis indicators, and configurable sibling count. Uses the `usePagination` composable internally.

## Installation

::: code-group

```bash [CLI]
npx stellar add pagination
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <Pagination v-model:page="page" :total="100" :page-size="10">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink :page="1" :is-active="page === 1" @click="page = 1" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink :page="2" :is-active="page === 2" @click="page = 2" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink :page="3" :is-active="page === 3" @click="page = 3" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
```

## Examples

### With First and Last

Add first/last page navigation buttons:

```vue
<template>
  <Pagination v-model:page="page" :total="200" :page-size="10">
    <PaginationContent>
      <PaginationItem>
        <PaginationFirst />
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious />
      </PaginationItem>
      <!-- Page links would go here -->
      <PaginationItem>
        <PaginationNext />
      </PaginationItem>
      <PaginationItem>
        <PaginationLast />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
```

### Sibling Count

Control how many page numbers are visible on each side of the current page:

```vue
<template>
  <!-- Show 2 siblings on each side -->
  <Pagination v-model:page="page" :total="100" :page-size="10" :sibling-count="2">
    <!-- ... -->
  </Pagination>
</template>
```

## API Reference

### Pagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | *required* | Total number of items |
| `pageSize` | `number` | `10` | Items per page |
| `page` | `number` | `1` | Current page (v-model:page) |
| `siblingCount` | `number` | `1` | Number of sibling pages on each side |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### PaginationLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | *required* | Page number this link navigates to |
| `isActive` | `boolean` | `false` | Whether this is the active page |
| `disabled` | `boolean` | `false` | Whether the link is non-interactive |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### PaginationPrevious, PaginationNext, PaginationFirst, PaginationLast Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the button is non-interactive |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:page` | `number` | Emitted when the current page changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Pagination` | `default` | PaginationContent |
| `PaginationContent` | `default` | PaginationItem elements |
| `PaginationItem` | `default` | Navigation elements (links, buttons, ellipsis) |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus between pagination controls |
| `Enter` / `Space` | Activates the focused page link or button |

### ARIA Attributes

- The root element renders as `<nav>` with `role="navigation"` and `aria-label="pagination"`
- Active page links have `aria-current="page"`
- Disabled buttons have `aria-disabled="true"`
- Previous/Next buttons have descriptive accessible names

## Related

- [Data Table](/components/data-table) -- Uses pagination internally
- [Button](/components/button) -- Pagination links use button-like styling
