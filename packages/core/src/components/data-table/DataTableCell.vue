<script setup lang="ts">
import type { DataTableCellProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableCellProps>()

const classes = computed(() =>
  cn(
    'p-4 align-middle [&:has([role=checkbox])]:pr-0',
    props.class,
  ),
)
</script>

<template>
  <td :class="classes">
    <slot />
  </td>
</template>
