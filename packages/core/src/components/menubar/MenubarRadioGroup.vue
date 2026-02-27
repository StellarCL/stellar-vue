<script setup lang="ts">
import { computed } from 'vue'
import { MenubarRadioGroup as MenubarRadioGroupPrimitive } from 'radix-vue'
import type { MenubarRadioGroupProps } from './menubar.types'
import { cn } from '../../utils'

const props = defineProps<MenubarRadioGroupProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <MenubarRadioGroupPrimitive
    :model-value="modelValue"
    :class="classes"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </MenubarRadioGroupPrimitive>
</template>
