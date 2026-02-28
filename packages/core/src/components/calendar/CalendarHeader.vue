<script setup lang="ts">
import type { CalendarHeaderProps } from './calendar.types'
import { CalendarHeader as CalendarHeaderPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CalendarHeaderProps>()

const classes = computed(() =>
  cn('relative flex w-full items-center justify-between pt-1', props.class),
)
</script>

<template>
  <CalendarHeaderPrimitive :class="classes">
    <slot />
  </CalendarHeaderPrimitive>
</template>
