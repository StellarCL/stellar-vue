# Data Table

A full-featured data table with sorting, pagination, row selection, and column visibility controls. Uses the `useDataTable` composable internally for state management. Built for displaying tabular data with interactive features.

## Installation

::: code-group

```bash [CLI]
npx stellar add data-table
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTableRowActions,
  DataTablePagination,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

The simplest usage is to pass `columns` and `data` to the `DataTable` component:

```vue
<script setup lang="ts">
import { DataTable } from '@stellar-vue-ui/core'
import type { ColumnDef } from '@stellar-vue-ui/core'

interface User {
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
]

const data: User[] = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Viewer' },
]
</script>

<template>
  <DataTable :columns="columns" :data="data" />
</template>
```

## Examples

### With Sorting

Enable sorting on columns by setting `enableSorting: true`:

```vue
<script setup lang="ts">
import { DataTable } from '@stellar-vue-ui/core'
import type { ColumnDef } from '@stellar-vue-ui/core'

interface Payment {
  id: string
  amount: number
  status: string
  email: string
}

const columns: ColumnDef<Payment>[] = [
  { id: 'email', header: 'Email', accessorKey: 'email', enableSorting: true },
  { id: 'amount', header: 'Amount', accessorKey: 'amount', enableSorting: true },
  { id: 'status', header: 'Status', accessorKey: 'status' },
]

const data: Payment[] = [
  { id: '1', amount: 100, status: 'Paid', email: 'a@test.com' },
  { id: '2', amount: 250, status: 'Pending', email: 'b@test.com' },
  { id: '3', amount: 50, status: 'Failed', email: 'c@test.com' },
]
</script>

<template>
  <DataTable :columns="columns" :data="data" />
</template>
```

### Custom Cell Renderer

Use the `cell` option in column definitions to customize cell rendering:

```vue
<script setup lang="ts">
import { h } from 'vue'
import { DataTable } from '@stellar-vue-ui/core'
import { Badge } from '@stellar-vue-ui/core'
import type { ColumnDef } from '@stellar-vue-ui/core'

interface Task {
  title: string
  status: 'todo' | 'in-progress' | 'done'
}

const columns: ColumnDef<Task>[] = [
  { id: 'title', header: 'Title', accessorKey: 'title' },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => {
      const status = getValue() as string
      const variant = status === 'done' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline'
      return h(Badge, { variant }, () => status)
    },
  },
]
</script>
```

### Page Size

Control the number of rows per page:

```vue
<template>
  <DataTable :columns="columns" :data="data" :page-size="5" />
</template>
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | *required* | Column definitions array |
| `data` | `T[]` | *required* | Row data array |
| `pageSize` | `number` | `10` | Number of rows per page |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### ColumnDef Interface

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | *required* | Unique column identifier |
| `header` | `string \| Component` | `undefined` | Column header label |
| `accessorKey` | `string` | `undefined` | Key on the row object for cell value |
| `accessorFn` | `(row: T) => any` | `undefined` | Function to derive cell value |
| `cell` | `(info) => string \| VNode` | `undefined` | Custom cell renderer |
| `enableSorting` | `boolean` | `false` | Whether this column supports sorting |
| `enableHiding` | `boolean` | `true` | Whether this column can be hidden |
| `size` | `number` | `undefined` | Preferred column width in pixels |

### DataTableRow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Whether this row is selected |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DataTableColumnHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | *required* | Column title |
| `sortDirection` | `'asc' \| 'desc' \| false` | `undefined` | Current sort direction |
| `canSort` | `boolean` | `false` | Whether sorting is enabled |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### DataTablePagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | *required* | Total number of rows |
| `page` | `number` | *required* | Current page (1-indexed) |
| `pageSize` | `number` | *required* | Rows per page |
| `selectedCount` | `number` | *required* | Number of selected rows |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:page` | `number` | Emitted when the page changes (on DataTablePagination) |
| `sort` | -- | Emitted when a sortable column header is clicked |

### Slots

The `DataTable` component renders its entire table structure internally. For custom layouts, use the individual sub-components directly.

## Accessibility

- The table renders as a native `<table>` element with proper `<thead>`, `<tbody>` structure
- Row selection checkboxes include descriptive `aria-label` attributes ("Select row N", "Select all rows")
- Sortable column headers are interactive buttons
- Empty state is displayed when no data matches

## Related

- [Pagination](/components/pagination) -- Standalone pagination component
- [Skeleton](/components/skeleton) -- For table loading placeholders
- [Badge](/components/badge) -- For status columns
- [Dropdown Menu](/components/dropdown-menu) -- For row action menus
