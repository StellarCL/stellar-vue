# Stellar Vue UI — Vite + TypeScript Example

A Vite + Vue 3 application with TypeScript strict mode demonstrating typed component props, DataTable with custom cell renderers, and theme configuration.

## What's Included

- `strict: true` TypeScript configuration
- Typed `ColumnDef<User>` column definitions for DataTable
- Custom typed cell renderers using `h()` that return `VNode`
- Strongly-typed `StatusBadge` and `RoleBadge` sub-components using `defineProps<T>()`
- `AppThemeConfig` interface with constrained union types for theme names
- `useTheme` composable with typed `defaultTheme` parameter
- Tabs, Card, Button, Badge components

## Setup

```bash
# From the monorepo root
pnpm install

# Run the dev server
cd apps/examples/vite-ts
pnpm dev
```

Or from the monorepo root with filtering:

```bash
pnpm --filter @stellar-vue-ui/example-vite-ts dev
```

## Build (with type checking)

```bash
# Full build: vue-tsc type check + vite build
pnpm build

# Vite build only (skip type check)
pnpm build:vite

# Type check only
pnpm typecheck
```

## TypeScript Highlights

### Typed column definitions

```ts
import type { ColumnDef } from '@stellar-vue-ui/core'

interface User {
  id: number
  name: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
}

// accessorKey is constrained to keyof User
const columns: ColumnDef<User>[] = [
  { id: 'name', accessorKey: 'name', enableSorting: true },
  {
    id: 'status',
    accessorKey: 'status',
    cell: ({ row }) => h(StatusBadge, { status: row.status }),
  },
]
```

### Typed component props

```vue
<script setup lang="ts">
import type { BadgeVariants } from '@stellar-vue-ui/core'
import type { StatusBadgeProps } from '@/types'

const props = defineProps<StatusBadgeProps>()

const variantMap: Record<StatusBadgeProps['status'], BadgeVariants['variant']> = {
  active: 'default',
  inactive: 'secondary',
  pending: 'outline',
}
</script>
```

### Typed theme config

```ts
interface AppThemeConfig {
  themeName: 'stellar' | 'sirius' | 'polaris' | 'antares' | 'vega' | 'aldebaran'
  darkMode: boolean
  persist: boolean
}

function switchTheme(t: AppThemeConfig['themeName']): void {
  setTheme(t)
}
```
