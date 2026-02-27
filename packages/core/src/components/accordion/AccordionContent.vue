<script setup lang="ts">
import { AccordionContent } from 'radix-vue'
import type { AccordionContentProps } from './accordion.types'
import { cn } from '../../utils'

const props = defineProps<AccordionContentProps>()
</script>

<template>
  <AccordionContent
    :class="cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      props.class
    )"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>
