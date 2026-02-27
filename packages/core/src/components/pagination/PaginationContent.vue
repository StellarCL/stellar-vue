<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationContentProps } from './pagination.types'
import { cn } from '../../utils'

const props = defineProps<PaginationContentProps>()

const classes = computed(() =>
  cn('flex flex-row items-center gap-1', props.class),
)
</script>

<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>
