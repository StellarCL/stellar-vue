<script setup lang="ts">
import type { DropdownMenuRadioGroupProps } from './dropdown-menu.types'
import { DropdownMenuRadioGroup as DropdownMenuRadioGroupPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DropdownMenuRadioGroupProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <DropdownMenuRadioGroupPrimitive
    :model-value="modelValue"
    :class="classes"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </DropdownMenuRadioGroupPrimitive>
</template>
