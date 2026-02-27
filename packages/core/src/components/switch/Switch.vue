<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import type { SwitchProps } from './switch.types'
import { switchVariants } from './switch.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
})

const model = defineModel<boolean>({ default: false })

const thumbSizeClasses: Record<NonNullable<SwitchProps['size']>, string> = {
  sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  md: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
  lg: 'h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0',
}
</script>

<template>
  <SwitchRoot
    :checked="model"
    :disabled="disabled"
    :class="cn(switchVariants({ size }), props.class)"
    @update:checked="model = $event"
  >
    <SwitchThumb
      :class="cn(
        'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
        thumbSizeClasses[size ?? 'md'],
      )"
    />
  </SwitchRoot>
</template>
