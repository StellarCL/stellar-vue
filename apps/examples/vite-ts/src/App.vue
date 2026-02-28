<script setup lang="ts">
import { ref, h } from 'vue'
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator,
  DataTable,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@stellar-vue-ui/core'
import { useTheme } from '@stellar-vue-ui/core'
import type { ColumnDef } from '@stellar-vue-ui/core'
import StatusBadge from '@/components/StatusBadge.vue'
import RoleBadge from '@/components/RoleBadge.vue'
import type { User, AppThemeConfig } from '@/types'

// ----- Theme management -----

const appThemeConfig = ref<AppThemeConfig>({
  themeName: 'stellar',
  darkMode: false,
  persist: true,
})

const { theme, isDark, setTheme, toggleDark, themes } = useTheme({
  defaultTheme: appThemeConfig.value.themeName,
  storage: appThemeConfig.value.persist ? 'localStorage' : 'sessionStorage',
})

function switchTheme(t: AppThemeConfig['themeName']): void {
  appThemeConfig.value.themeName = t
  setTheme(t)
}

function handleToggleDark(): void {
  appThemeConfig.value.darkMode = !appThemeConfig.value.darkMode
  toggleDark()
}

// ----- Typed DataTable data -----

const users = ref<User[]>([
  { id: 1, name: 'Alice Chen',    email: 'alice@example.com',   role: 'admin',  status: 'active',   joinedAt: '2024-01-15' },
  { id: 2, name: 'Bob Martinson', email: 'bob@example.com',     role: 'editor', status: 'active',   joinedAt: '2024-02-20' },
  { id: 3, name: 'Carol White',   email: 'carol@example.com',   role: 'viewer', status: 'inactive', joinedAt: '2024-03-10' },
  { id: 4, name: 'Dan Patel',     email: 'dan@example.com',     role: 'editor', status: 'pending',  joinedAt: '2024-04-05' },
  { id: 5, name: 'Eva Kowalski',  email: 'eva@example.com',     role: 'viewer', status: 'active',   joinedAt: '2024-05-18' },
  { id: 6, name: 'Frank Lee',     email: 'frank@example.com',   role: 'admin',  status: 'active',   joinedAt: '2024-06-01' },
  { id: 7, name: 'Grace Okafor',  email: 'grace@example.com',   role: 'editor', status: 'pending',  joinedAt: '2024-07-22' },
  { id: 8, name: 'Hugo Silva',    email: 'hugo@example.com',    role: 'viewer', status: 'inactive', joinedAt: '2024-08-30' },
  { id: 9, name: 'Isla Murphy',   email: 'isla@example.com',    role: 'editor', status: 'active',   joinedAt: '2024-09-11' },
  { id: 10, name: 'Jake Turner',  email: 'jake@example.com',    role: 'viewer', status: 'active',   joinedAt: '2024-10-03' },
  { id: 11, name: 'Kai Nakamura', email: 'kai@example.com',     role: 'admin',  status: 'active',   joinedAt: '2024-11-14' },
  { id: 12, name: 'Luna Park',    email: 'luna@example.com',    role: 'viewer', status: 'pending',  joinedAt: '2025-01-07' },
])

/**
 * Typed column definitions for the User table.
 * ColumnDef<User> constrains accessorKey to keyof User.
 */
const columns: ColumnDef<User>[] = [
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
    accessorFn: (row: User) => row.role,
    // Custom typed cell renderer using h() — returns a VNode
    cell: ({ row }: { row: User; getValue: () => User['role'] }) =>
      h(RoleBadge, { role: row.role }),
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    enableSorting: true,
    cell: ({ row }: { row: User; getValue: () => User['status'] }) =>
      h(StatusBadge, { status: row.status }),
  },
  {
    id: 'joinedAt',
    header: 'Joined',
    accessorKey: 'joinedAt',
    enableSorting: true,
  },
]
</script>

<template>
  <div class="min-h-screen p-6 md:p-10">
    <!-- Header -->
    <header class="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Stellar Vue UI</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Vite + Vue 3 + TypeScript strict mode — typed props, composables, and DataTable
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Badge variant="secondary">{{ theme }}</Badge>
        <Button size="sm" variant="outline" @click="handleToggleDark">
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </Button>
      </div>
    </header>

    <Separator class="mb-8" />

    <!-- Tabs navigation -->
    <Tabs default-value="datatable" class="space-y-6">
      <TabsList>
        <TabsTrigger value="datatable">DataTable</TabsTrigger>
        <TabsTrigger value="theme">Theme Config</TabsTrigger>
      </TabsList>

      <!-- DataTable tab -->
      <TabsContent value="datatable" class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Users</h2>
          <p class="text-muted-foreground text-sm mt-1">
            Typed <code class="font-mono">ColumnDef&lt;User&gt;</code> with custom cell renderers
            for <code class="font-mono">StatusBadge</code> and <code class="font-mono">RoleBadge</code>.
          </p>
        </div>
        <DataTable
          :columns="columns"
          :data="users"
          :page-size="5"
          class="rounded-md border border-border"
        />
      </TabsContent>

      <!-- Theme config tab -->
      <TabsContent value="theme" class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold">Theme Configuration</h2>
          <p class="text-muted-foreground text-sm mt-1">
            Demonstrates the typed <code class="font-mono">AppThemeConfig</code> interface
            and <code class="font-mono">useTheme</code> composable.
          </p>
        </div>

        <!-- Current config card -->
        <Card>
          <CardHeader>
            <CardTitle>Current Config</CardTitle>
            <CardDescription>
              <code class="font-mono">AppThemeConfig</code> is a strongly-typed interface
              defined in <code class="font-mono">src/types.ts</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre class="rounded-md bg-muted p-4 text-sm overflow-auto"><code>{{ JSON.stringify(appThemeConfig, null, 2) }}</code></pre>
          </CardContent>
        </Card>

        <!-- Theme switcher -->
        <Card>
          <CardHeader>
            <CardTitle>Switch Theme</CardTitle>
            <CardDescription>
              Each button calls <code class="font-mono">switchTheme(t)</code> which is typed
              to accept only valid <code class="font-mono">AppThemeConfig['themeName']</code> values.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-2">
            <Button
              v-for="t in themes"
              :key="t"
              :variant="appThemeConfig.themeName === t ? 'default' : 'outline'"
              size="sm"
              @click="switchTheme(t as AppThemeConfig['themeName'])"
            >
              {{ t }}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
