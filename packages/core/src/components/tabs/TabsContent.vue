<script setup lang="ts">
import { computed } from 'vue'
import { TabsContent as TabsContentPrimitive } from 'radix-vue'
import type { TabsContentProps } from './tabs.types'
import { cn } from '../../utils'

const props = defineProps<TabsContentProps>()

const classes = computed(() =>
  cn(
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    props.class,
  ),
)
</script>

<template>
  <TabsContentPrimitive :value="props.value" :class="classes">
    <slot />
  </TabsContentPrimitive>
</template>
