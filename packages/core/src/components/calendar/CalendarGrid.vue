<script setup lang="ts">
import { computed } from 'vue'
import { CalendarGrid as CalendarGridPrimitive } from 'radix-vue'
import type { CalendarGridProps } from './calendar.types'
import { cn } from '../../utils'

const props = defineProps<CalendarGridProps>()

const classes = computed(() =>
  cn('w-full border-collapse space-y-1', props.class),
)
</script>

<template>
  <CalendarGridPrimitive :class="classes">
    <slot />
  </CalendarGridPrimitive>
</template>
