<script setup lang="ts">
import type { ContextMenuRadioGroupProps } from './context-menu.types'
import { ContextMenuRadioGroup as ContextMenuRadioGroupPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ContextMenuRadioGroupProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <ContextMenuRadioGroupPrimitive
    :model-value="modelValue"
    :class="classes"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ContextMenuRadioGroupPrimitive>
</template>
