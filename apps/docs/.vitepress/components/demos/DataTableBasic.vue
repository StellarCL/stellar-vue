<script setup lang="ts">
import { DataTable } from '@stellar-vue-ui/core'

const columns = [
  { id: 'name', accessorKey: 'name', header: 'Name', enableSorting: true },
  { id: 'email', accessorKey: 'email', header: 'Email' },
  { id: 'role', accessorKey: 'role', header: 'Role' },
]

const data = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer' },
]
</script>
<template>
  <DataTable :columns="columns" :data="data" class="w-full max-w-2xl" />
</template>
