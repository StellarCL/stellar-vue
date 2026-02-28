<script setup lang="ts">
import type { ComboboxGroupProps } from './combobox.types'
import { ComboboxGroup as ComboboxGroupPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ComboboxGroupProps>()

const classes = computed(() => cn('p-1 overflow-hidden', props.class))
</script>

<template>
  <ComboboxGroupPrimitive :class="classes">
    <slot />
  </ComboboxGroupPrimitive>
</template>
