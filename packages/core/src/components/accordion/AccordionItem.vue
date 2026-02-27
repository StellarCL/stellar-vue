<script setup lang="ts">
import { AccordionItem } from 'radix-vue'
import type { AccordionItemProps } from './accordion.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
})
</script>

<template>
  <AccordionItem
    :value="value"
    :disabled="disabled"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
