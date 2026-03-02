<script setup lang="ts">
import type { DataTableRowProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DataTableRowProps>(), {
  selected: false,
})

const classes = computed(() =>
  cn(
    'border-b border-slate-150 dark:border-navy-500 transition-colors hover:bg-slate-50 dark:hover:bg-navy-600/50 data-[state=selected]:bg-muted',
    props.class,
  ),
)
</script>

<template>
  <tr :class="classes" :data-state="selected ? 'selected' : undefined">
    <slot />
  </tr>
</template>
