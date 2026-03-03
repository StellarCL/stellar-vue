<script setup lang="ts">
import type { AccordionItemProps } from './accordion.types'
import { AccordionItem } from 'radix-vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
})
</script>

<template>
  <AccordionItem
    :value="value"
    :disabled="disabled"
    :class="cn('border-b border-border', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
