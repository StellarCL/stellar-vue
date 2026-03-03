<script setup lang="ts">
import type { DataTableColumnToggleProps } from './data-table.types'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableColumnToggleProps>()

const emit = defineEmits<{
  toggleVisibility: [columnId: string]
}>()

const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const classes = computed(() => cn('relative inline-block', props.class))

const hidableColumns = computed(() => props.columns.filter(col => col.enableHiding !== false))

function toggle() {
  open.value = !open.value
}

function handleToggleVisibility(columnId: string) {
  emit('toggleVisibility', columnId)
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div ref="containerRef" :class="classes" data-column-toggle @keydown="onKeydown">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-haspopup="true"
      :aria-expanded="open"
      @click="toggle"
    >
      <!-- Grid/columns icon -->
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
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
      Columns
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-2 min-w-[150px] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
      role="menu"
    >
      <div class="px-2 py-1.5 text-sm font-semibold">
        Toggle columns
      </div>
      <div class="my-1 h-px bg-border" role="separator" />
      <label
        v-for="col in hidableColumns"
        :key="col.id"
        class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
        role="menuitemcheckbox"
        :aria-checked="props.columnVisibility[col.id] !== false"
      >
        <input
          type="checkbox"
          :checked="props.columnVisibility[col.id] !== false"
          class="h-4 w-4 rounded border border-primary"
          @change="handleToggleVisibility(col.id)"
        >
        {{ typeof col.header === 'string' ? col.header : col.id }}
      </label>
    </div>
  </div>
</template>
