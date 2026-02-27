<script setup lang="ts">
import { computed, provide } from 'vue'
import type { TimelineProps } from './timeline.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<TimelineProps>(), {
  layout: 'left',
})

provide('timeline-layout', computed(() => props.layout))

const classes = computed(() =>
  cn('relative space-y-0', props.class),
)
</script>

<template>
  <ul :class="classes" role="list">
    <slot />
  </ul>
</template>
