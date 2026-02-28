<script setup lang="ts">
import type { CalendarGridRowProps } from './calendar.types'
import { CalendarGridRow as CalendarGridRowPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CalendarGridRowProps>()

const classes = computed(() =>
  cn('flex', props.class),
)
</script>

<template>
  <CalendarGridRowPrimitive :class="classes">
    <slot />
  </CalendarGridRowPrimitive>
</template>
