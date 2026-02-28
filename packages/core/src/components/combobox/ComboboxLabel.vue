<script setup lang="ts">
import type { ComboboxLabelProps } from './combobox.types'
import { ComboboxLabel as ComboboxLabelPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ComboboxLabelProps>()

const classes = computed(() => cn('py-1.5 pl-8 pr-2 text-sm font-semibold', props.class))
</script>

<template>
  <ComboboxLabelPrimitive :class="classes">
    <slot />
  </ComboboxLabelPrimitive>
</template>
