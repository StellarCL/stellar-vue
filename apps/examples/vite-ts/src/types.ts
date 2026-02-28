import type { ColumnDef } from '@stellar-vue-ui/core'

/**
 * Represents a single row in the user data table.
 */
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  joinedAt: string
}

/**
 * Typed column definitions for the User DataTable.
 * Using ColumnDef<User> ensures the accessorKey values are constrained to User keys.
 */
export const userColumns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    enableSorting: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    enableSorting: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    enableSorting: false,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    enableSorting: true,
  },
  {
    id: 'joinedAt',
    header: 'Joined',
    accessorKey: 'joinedAt',
    enableSorting: true,
  },
]

/**
 * Custom theme configuration shape — strongly typed against @stellar-vue-ui/theme.
 */
export interface AppThemeConfig {
  /** Active theme name */
  themeName: 'stellar' | 'sirius' | 'polaris' | 'antares' | 'vega' | 'aldebaran'
  /** Dark mode preference */
  darkMode: boolean
  /** Persist preference to localStorage */
  persist: boolean
}

/**
 * Props for the typed StatusBadge component.
 */
export interface StatusBadgeProps {
  status: User['status']
}

/**
 * Props for the typed RoleBadge component.
 */
export interface RoleBadgeProps {
  role: User['role']
}
