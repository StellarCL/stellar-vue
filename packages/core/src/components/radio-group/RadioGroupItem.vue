<script setup lang="ts">
import type { RadioGroupItemProps } from './radio-group.types'
import { RadioGroupIndicator, RadioGroupItem } from 'radix-vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  disabled: false,
})
</script>

<template>
  <RadioGroupItem
    :id="id"
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'aspect-square h-5 w-5 rounded-full border border-slate-400/70 dark:border-navy-450 text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <div class="h-2.5 w-2.5 rounded-full bg-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
