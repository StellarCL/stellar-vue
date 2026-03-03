<script setup lang="ts">
import type { DataTableRowProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DataTableRowProps>(), {
  selected: false,
})

const classes = computed(() =>
  cn(
    'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    props.class,
  ),
)
</script>

<template>
  <tr :class="classes" :data-state="selected ? 'selected' : undefined">
    <slot />
  </tr>
</template>
