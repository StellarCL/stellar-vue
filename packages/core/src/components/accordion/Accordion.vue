<script setup lang="ts">
import { AccordionRoot } from 'radix-vue'
import type { AccordionProps } from './accordion.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | undefined]
}>()
</script>

<template>
  <AccordionRoot
    :type="type"
    :model-value="modelValue"
    :collapsible="collapsible"
    :disabled="disabled"
    :class="cn(props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </AccordionRoot>
</template>
