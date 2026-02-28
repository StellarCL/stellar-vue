<script setup lang="ts">
import type { RadioGroupProps } from './radio-group.types'
import { RadioGroupRoot } from 'radix-vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  orientation: 'vertical',
})

const model = defineModel<string>()
</script>

<template>
  <RadioGroupRoot
    :model-value="model"
    :disabled="disabled"
    :orientation="orientation"
    :class="cn(
      orientation === 'horizontal' ? 'flex gap-2' : 'grid gap-2',
      props.class,
    )"
    @update:model-value="model = $event"
  >
    <slot />
  </RadioGroupRoot>
</template>
