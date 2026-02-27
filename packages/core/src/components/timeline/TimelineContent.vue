<script setup lang="ts">
import { computed } from 'vue'
import type { TimelineContentProps } from './timeline.types'
import { cn } from '../../utils'

const props = defineProps<TimelineContentProps>()

const classes = computed(() =>
  cn('text-sm text-foreground', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
