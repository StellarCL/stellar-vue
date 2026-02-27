<script setup lang="ts">
import { computed } from 'vue'
import type { MultiSelectEmptyProps } from './multi-select.types'
import { cn } from '../../utils'

const props = defineProps<MultiSelectEmptyProps>()

const classes = computed(() =>
  cn(
    'py-6 text-center text-sm text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" data-multi-select-empty>
    <slot>No results found.</slot>
  </div>
</template>
