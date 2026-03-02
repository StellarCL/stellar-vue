<script setup lang="ts">
import type { SkeletonProps } from './skeleton.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SkeletonProps>()

const classes = computed(() =>
  cn(
    'animate-skeleton-wave rounded-md bg-gradient-to-r from-slate-150 via-slate-200 to-slate-150 dark:from-navy-500 dark:via-navy-600 dark:to-navy-500 bg-[length:200%_100%]',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" role="status" aria-label="Loading" />
</template>
