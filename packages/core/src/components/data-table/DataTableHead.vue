<script setup lang="ts">
import { computed } from 'vue'
import type { DataTableHeadProps } from './data-table.types'
import { cn } from '../../utils'

const props = defineProps<DataTableHeadProps>()

const classes = computed(() =>
  cn(
    'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
    props.class,
  ),
)
</script>

<template>
  <th :class="classes">
    <slot />
  </th>
</template>
