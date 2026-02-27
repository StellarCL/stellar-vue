<script setup lang="ts">
import { computed } from 'vue'
import type { DataTableColumnHeaderProps } from './data-table.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DataTableColumnHeaderProps>(), {
  canSort: false,
  sortDirection: false,
})

const emit = defineEmits<{
  sort: []
}>()

const classes = computed(() =>
  cn(
    'flex items-center gap-2',
    props.canSort && 'cursor-pointer select-none',
    props.class,
  ),
)

function handleSort() {
  if (props.canSort) {
    emit('sort')
  }
}
</script>

<template>
  <div
    :class="classes"
    @click="handleSort"
  >
    <span>{{ title }}</span>
    <template v-if="canSort">
      <!-- ArrowUp: ascending -->
      <svg
        v-if="sortDirection === 'asc'"
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
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
      <!-- ArrowDown: descending -->
      <svg
        v-else-if="sortDirection === 'desc'"
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
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
      <!-- ChevronsUpDown: unsorted -->
      <svg
        v-else
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
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </template>
  </div>
</template>
