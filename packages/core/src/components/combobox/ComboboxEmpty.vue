<script setup lang="ts">
import type { ComboboxEmptyProps } from './combobox.types'
import { ComboboxEmpty as ComboboxEmptyPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ComboboxEmptyProps>()

const classes = computed(() =>
  cn(
    'py-6 text-center text-sm',
    props.class,
  ),
)
</script>

<template>
  <ComboboxEmptyPrimitive :class="classes">
    <slot>No results found.</slot>
  </ComboboxEmptyPrimitive>
</template>
