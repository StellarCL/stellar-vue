<script setup lang="ts">
import { computed } from 'vue'
import { SelectGroup as SelectGroupPrimitive } from 'radix-vue'
import type { SelectGroupProps } from './select.types'
import { cn } from '../../utils'

const props = defineProps<SelectGroupProps>()

const classes = computed(() => cn('p-1', props.class))
</script>

<template>
  <SelectGroupPrimitive :class="classes">
    <slot />
  </SelectGroupPrimitive>
</template>
