<script setup lang="ts">
import { computed } from 'vue'
import type { TimelineConnectorProps } from './timeline.types'
import { cn } from '../../utils'

const props = defineProps<TimelineConnectorProps>()

const classes = computed(() =>
  cn('w-px flex-1 bg-border', props.class),
)
</script>

<template>
  <div :class="classes" />
</template>
