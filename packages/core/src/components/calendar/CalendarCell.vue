<script setup lang="ts">
import { computed } from 'vue'
import { CalendarCell as CalendarCellPrimitive } from 'radix-vue'
import type { CalendarCellProps } from './calendar.types'
import { cn } from '../../utils'

const props = defineProps<CalendarCellProps>()

const classes = computed(() =>
  cn(
    'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
    props.class,
  ),
)
</script>

<template>
  <CalendarCellPrimitive :date="props.date" :class="classes">
    <slot />
  </CalendarCellPrimitive>
</template>
