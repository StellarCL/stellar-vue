<script setup lang="ts">
import { computed } from 'vue'
import { CalendarHeader as CalendarHeaderPrimitive } from 'radix-vue'
import type { CalendarHeaderProps } from './calendar.types'
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
