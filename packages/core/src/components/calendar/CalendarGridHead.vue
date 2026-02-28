<script setup lang="ts">
import type { CalendarGridHeadProps } from './calendar.types'
import { CalendarGridHead as CalendarGridHeadPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CalendarGridHeadProps>()

const classes = computed(() =>
  cn('', props.class),
)
</script>

<template>
  <CalendarGridHeadPrimitive :class="classes">
    <slot />
  </CalendarGridHeadPrimitive>
</template>
