<script setup lang="ts">
import type { SkeletonProps } from './skeleton.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SkeletonProps>()

const classes = computed(() =>
  cn(
    'animate-skeleton-wave rounded-md bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%]',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" role="status" aria-label="Loading" />
</template>
