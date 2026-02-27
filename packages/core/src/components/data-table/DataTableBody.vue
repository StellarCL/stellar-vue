<script setup lang="ts">
import { computed } from 'vue'
import type { DataTableBodyProps } from './data-table.types'
import { cn } from '../../utils'

const props = defineProps<DataTableBodyProps>()

const classes = computed(() => cn('[&_tr:last-child]:border-0', props.class))
</script>

<template>
  <tbody :class="classes">
    <slot />
  </tbody>
</template>
