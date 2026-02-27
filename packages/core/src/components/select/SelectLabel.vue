<script setup lang="ts">
import { computed } from 'vue'
import { SelectLabel as SelectLabelPrimitive } from 'radix-vue'
import type { SelectLabelProps } from './select.types'
import { cn } from '../../utils'

const props = defineProps<SelectLabelProps>()

const classes = computed(() => cn('py-1.5 pl-8 pr-2 text-sm font-semibold', props.class))
</script>

<template>
  <SelectLabelPrimitive :class="classes">
    <slot />
  </SelectLabelPrimitive>
</template>
