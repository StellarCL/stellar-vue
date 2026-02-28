<script setup lang="ts">
import type { SelectGroupProps } from './select.types'
import { SelectGroup as SelectGroupPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SelectGroupProps>()

const classes = computed(() => cn('p-1', props.class))
</script>

<template>
  <SelectGroupPrimitive :class="classes">
    <slot />
  </SelectGroupPrimitive>
</template>
