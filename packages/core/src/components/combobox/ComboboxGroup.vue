<script setup lang="ts">
import { computed } from 'vue'
import { ComboboxGroup as ComboboxGroupPrimitive } from 'radix-vue'
import type { ComboboxGroupProps } from './combobox.types'
import { cn } from '../../utils'

const props = defineProps<ComboboxGroupProps>()

const classes = computed(() => cn('p-1 overflow-hidden', props.class))
</script>

<template>
  <ComboboxGroupPrimitive :class="classes">
    <slot />
  </ComboboxGroupPrimitive>
</template>
