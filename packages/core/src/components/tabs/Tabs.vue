<script setup lang="ts">
import { TabsRoot } from 'radix-vue'
import type { TabsProps } from './tabs.types'

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: 'horizontal',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <TabsRoot
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
    :class="props.class"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <slot />
  </TabsRoot>
</template>
