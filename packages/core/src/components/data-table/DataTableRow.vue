<script setup lang="ts">
import { computed } from 'vue'
import type { DataTableRowProps } from './data-table.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DataTableRowProps>(), {
  selected: false,
})

const classes = computed(() =>
  cn(
    'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    props.class,
  ),
)
</script>

<template>
  <tr
    :class="classes"
    :data-state="selected ? 'selected' : undefined"
  >
    <slot />
  </tr>
</template>
