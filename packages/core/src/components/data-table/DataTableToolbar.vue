<script setup lang="ts">
import type { DataTableToolbarProps } from './data-table.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DataTableToolbarProps>()

const classes = computed(() => cn('flex items-center justify-between', props.class))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
