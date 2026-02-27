<script setup lang="ts">
import { computed } from 'vue'
import { CalendarHeadCell as CalendarHeadCellPrimitive } from 'radix-vue'
import type { CalendarHeadCellProps } from './calendar.types'
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
