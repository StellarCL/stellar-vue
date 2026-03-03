<script setup lang="ts">
import type { AccordionTriggerProps } from './accordion.types'
import { AccordionHeader, AccordionTrigger } from 'radix-vue'
import { cn } from '../../utils'

const props = defineProps<AccordionTriggerProps>()
</script>

<template>
  <AccordionHeader as="div">
    <AccordionTrigger
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-base font-medium text-foreground transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 shrink-0 transition-transform duration-200"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </AccordionTrigger>
  </AccordionHeader>
</template>
