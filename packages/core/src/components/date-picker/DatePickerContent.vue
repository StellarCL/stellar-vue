<script setup lang="ts">
import type { DatePickerContentProps } from './date-picker.types'
import { PopoverContent as PopoverContentPrimitive, PopoverPortal } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DatePickerContentProps>(), {
  align: 'start',
})

const classes = computed(() =>
  cn(
    'z-50 w-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class,
  ),
)
</script>

<template>
  <PopoverPortal>
    <PopoverContentPrimitive
      :align="props.align"
      :side-offset="4"
      :class="classes"
    >
      <slot />
    </PopoverContentPrimitive>
  </PopoverPortal>
</template>
