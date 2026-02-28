<script setup lang="ts">
import type { ComboboxProps } from './combobox.types'
import { ComboboxRoot } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<ComboboxProps>(), {
  disabled: false,
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:open': [value: boolean]
}>()
</script>

<template>
  <ComboboxRoot
    :model-value="modelValue"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :name="name"
    @update:model-value="emit('update:modelValue', $event as string)"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </ComboboxRoot>
</template>
