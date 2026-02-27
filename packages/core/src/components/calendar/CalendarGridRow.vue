<script setup lang="ts">
import { computed } from 'vue'
import { CalendarGridRow as CalendarGridRowPrimitive } from 'radix-vue'
import type { CalendarGridRowProps } from './calendar.types'
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
