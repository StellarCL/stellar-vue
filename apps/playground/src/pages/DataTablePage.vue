<script setup lang="ts">
import type { ColumnDef } from '@stellar-vue-ui/core'
import { DataTable } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

// ── User data ──
interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 8, name: 'Henry Moore', email: 'henry@example.com', role: 'Viewer', status: 'Active' },
]

const userColumns: ColumnDef<User>[] = [
  { id: 'id', header: 'ID', accessorKey: 'id', enableSorting: true, size: 60 },
  { id: 'name', header: 'Name', accessorKey: 'name', enableSorting: true },
  { id: 'email', header: 'Email', accessorKey: 'email', enableSorting: true },
  { id: 'role', header: 'Role', accessorKey: 'role', enableSorting: true },
  { id: 'status', header: 'Status', accessorKey: 'status', enableSorting: true },
]

// ── Task data ──
interface Task {
  id: string
  title: string
  priority: string
  assignee: string
  dueDate: string
}

const tasks: Task[] = [
  {
    id: 'TASK-001',
    title: 'Design landing page',
    priority: 'High',
    assignee: 'Alice',
    dueDate: '2026-03-05',
  },
  {
    id: 'TASK-002',
    title: 'Set up CI pipeline',
    priority: 'Medium',
    assignee: 'Bob',
    dueDate: '2026-03-10',
  },
  {
    id: 'TASK-003',
    title: 'Write API documentation',
    priority: 'Low',
    assignee: 'Carol',
    dueDate: '2026-03-15',
  },
  {
    id: 'TASK-004',
    title: 'Fix login bug',
    priority: 'High',
    assignee: 'David',
    dueDate: '2026-03-02',
  },
  {
    id: 'TASK-005',
    title: 'Add dark mode support',
    priority: 'Medium',
    assignee: 'Eve',
    dueDate: '2026-03-08',
  },
  {
    id: 'TASK-006',
    title: 'Optimize image loading',
    priority: 'Low',
    assignee: 'Frank',
    dueDate: '2026-03-20',
  },
  {
    id: 'TASK-007',
    title: 'Create onboarding flow',
    priority: 'High',
    assignee: 'Grace',
    dueDate: '2026-03-12',
  },
  {
    id: 'TASK-008',
    title: 'Refactor auth module',
    priority: 'Medium',
    assignee: 'Henry',
    dueDate: '2026-03-18',
  },
  {
    id: 'TASK-009',
    title: 'Add unit tests',
    priority: 'High',
    assignee: 'Alice',
    dueDate: '2026-03-25',
  },
  {
    id: 'TASK-010',
    title: 'Deploy staging server',
    priority: 'Medium',
    assignee: 'Bob',
    dueDate: '2026-03-22',
  },
  {
    id: 'TASK-011',
    title: 'Review PR #42',
    priority: 'Low',
    assignee: 'Carol',
    dueDate: '2026-03-28',
  },
  {
    id: 'TASK-012',
    title: 'Update dependencies',
    priority: 'Low',
    assignee: 'David',
    dueDate: '2026-03-30',
  },
]

const taskColumns: ColumnDef<Task>[] = [
  { id: 'id', header: 'Task ID', accessorKey: 'id', enableSorting: true, size: 100 },
  { id: 'title', header: 'Title', accessorKey: 'title', enableSorting: true },
  { id: 'priority', header: 'Priority', accessorKey: 'priority', enableSorting: true },
  { id: 'assignee', header: 'Assignee', accessorKey: 'assignee', enableSorting: true },
  { id: 'dueDate', header: 'Due Date', accessorKey: 'dueDate', enableSorting: true },
]
</script>

<template>
  <div>
    <PageHeader
      title="Data Table"
      description="A powerful table component with sorting, pagination, and row selection. Built on top of a composable-driven architecture."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic User Table -->
      <DemoSection
        title="User Table"
        description="A simple table with user data, sortable columns, and row selection checkboxes."
      >
        <DataTable :columns="userColumns" :data="users" :page-size="5" />
      </DemoSection>

      <!-- Task Table with Pagination -->
      <DemoSection
        title="Task Table with Pagination"
        description="A larger dataset showing pagination in action. Page size is set to 5 rows."
      >
        <DataTable :columns="taskColumns" :data="tasks" :page-size="5" />
      </DemoSection>

      <!-- Small Page Size -->
      <DemoSection
        title="Compact View (3 rows per page)"
        description="Demonstrate pagination with a very small page size."
      >
        <DataTable :columns="userColumns" :data="users" :page-size="3" />
      </DemoSection>
    </div>
  </div>
</template>
