<script setup lang="ts">
import type { TabsTriggerProps } from './tabs.types'
import { TabsTrigger as TabsTriggerPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
})

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent -mb-px px-4 py-2 text-sm font-medium tracking-wide text-muted-foreground transition-all focus:outline-none hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-primary',
    props.class,
  ),
)
</script>

<template>
  <TabsTriggerPrimitive :value="props.value" :disabled="props.disabled" :class="classes">
    <slot />
  </TabsTriggerPrimitive>
</template>
