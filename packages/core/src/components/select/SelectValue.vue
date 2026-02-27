<script setup lang="ts">
import { computed } from 'vue'
import { SelectValue as SelectValuePrimitive } from 'radix-vue'
import type { SelectValueProps } from './select.types'
import { cn } from '../../utils'

const props = defineProps<SelectValueProps>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <SelectValuePrimitive :placeholder="placeholder" :class="classes">
    <slot />
  </SelectValuePrimitive>
</template>
