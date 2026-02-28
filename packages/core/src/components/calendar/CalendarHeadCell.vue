<script setup lang="ts">
import type { CalendarHeadCellProps } from './calendar.types'
import { CalendarHeadCell as CalendarHeadCellPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CalendarHeadCellProps>()

const classes = computed(() =>
  cn(
    'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <CalendarHeadCellPrimitive :class="classes">
    <slot />
  </CalendarHeadCellPrimitive>
</template>
