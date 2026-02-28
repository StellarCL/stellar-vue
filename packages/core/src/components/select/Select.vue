<script setup lang="ts">
import type { SelectProps } from './select.types'
import { SelectRoot } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <SelectRoot
    :model-value="modelValue"
    :disabled="disabled"
    :default-open="defaultOpen"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </SelectRoot>
</template>
