<script setup lang="ts">
import type { CheckboxProps } from './checkbox.types'
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
})

const model = defineModel<boolean | 'indeterminate'>({ default: false })
</script>

<template>
  <CheckboxRoot
    :id="id"
    :checked="model"
    :disabled="disabled"
    :required="required"
    :class="
      cn(
        'peer h-5 w-5 shrink-0 rounded-sm border border-slate-400/70 dark:border-navy-450 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
    @update:checked="model = $event"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <svg
        v-if="model === true"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <svg
        v-else-if="model === 'indeterminate'"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
