<script setup lang="ts">
import type { DataTableFilterProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableFilterProps>()

const emit = defineEmits<{
  'update:filter': [columnId: string, value: string]
  'clear': []
}>()

const classes = computed(() => cn('flex flex-wrap items-center gap-2', props.class))

const filterableColumns = computed(() => props.columns.filter(col => col.filterable === true))

const hasActiveFilters = computed(() => Object.values(props.filter).some(v => v.length > 0))

function handleInput(columnId: string, event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:filter', columnId, value)
}

function handleClear() {
  emit('clear')
}
</script>

<template>
  <div v-if="filterableColumns.length > 0" :class="classes">
    <div v-for="col in filterableColumns" :key="col.id" class="flex items-center gap-1.5">
      <label :for="`filter-${col.id}`" class="text-sm font-medium text-muted-foreground">
        {{ typeof col.header === 'string' ? col.header : col.id }}
      </label>
      <input
        :id="`filter-${col.id}`"
        type="text"
        :value="props.filter[col.id] ?? ''"
        :placeholder="`Filter ${typeof col.header === 'string' ? col.header.toLowerCase() : col.id}...`"
        class="h-8 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        @input="handleInput(col.id, $event)"
      >
    </div>

    <button
      v-if="hasActiveFilters"
      type="button"
      class="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      @click="handleClear"
    >
      <!-- X icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      Clear filters
    </button>
  </div>
</template>
