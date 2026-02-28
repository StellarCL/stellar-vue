<script setup lang="ts">
import type { DataTableHeaderProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableHeaderProps>()

const classes = computed(() => cn('[&_tr]:border-b', props.class))
</script>

<template>
  <thead :class="classes">
    <slot />
  </thead>
</template>
