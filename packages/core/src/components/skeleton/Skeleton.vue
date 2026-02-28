<script setup lang="ts">
import type { SkeletonProps } from './skeleton.types'
import { computed } from 'vue'
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
