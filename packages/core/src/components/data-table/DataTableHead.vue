<script setup lang="ts">
import type { DataTableHeadProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableHeadProps>()

const classes = computed(() =>
  cn(
    'h-12 px-4 text-left align-middle font-semibold uppercase text-xs tracking-wide text-slate-800 dark:text-navy-100 [&:has([role=checkbox])]:pr-0',
    props.class,
  ),
)
</script>

<template>
  <th :class="classes">
    <slot />
  </th>
</template>
