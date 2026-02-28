<script setup lang="ts">
import type { CalendarGridBodyProps } from './calendar.types'
import { CalendarGridBody as CalendarGridBodyPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CalendarGridBodyProps>()

const classes = computed(() =>
  cn('', props.class),
)
</script>

<template>
  <CalendarGridBodyPrimitive :class="classes">
    <slot />
  </CalendarGridBodyPrimitive>
</template>
