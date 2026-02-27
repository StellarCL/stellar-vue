<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonProps } from './skeleton.types'
import { cn } from '../../utils'

const props = defineProps<SkeletonProps>()

const classes = computed(() =>
  cn('animate-pulse rounded-md bg-muted', props.class),
)
</script>

<template>
  <div
    :class="classes"
    role="status"
    aria-label="Loading"
  />
</template>
