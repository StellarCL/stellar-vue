<script setup lang="ts">
import type { CalendarHeadingProps } from './calendar.types'
import { CalendarHeading as CalendarHeadingPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CalendarHeadingProps>()

const classes = computed(() =>
  cn('text-sm font-medium', props.class),
)
</script>

<template>
  <CalendarHeadingPrimitive v-slot="{ headingValue }" :class="classes">
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </CalendarHeadingPrimitive>
</template>
