<script setup lang="ts">
import type { TimelineConnectorProps } from './timeline.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<TimelineConnectorProps>()

const classes = computed(() =>
  cn('w-px flex-1 bg-border', props.class),
)
</script>

<template>
  <div :class="classes" />
</template>
