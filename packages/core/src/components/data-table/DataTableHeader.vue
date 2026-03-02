<script setup lang="ts">
import type { DataTableHeaderProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableHeaderProps>()

const classes = computed(() =>
  cn(
    '[&_tr]:border-b [&_tr]:border-slate-150 dark:[&_tr]:border-navy-500 bg-slate-50 dark:bg-navy-800',
    props.class,
  ),
)
</script>

<template>
  <thead :class="classes">
    <slot />
  </thead>
</template>
