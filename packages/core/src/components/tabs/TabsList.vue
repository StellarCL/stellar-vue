<script setup lang="ts">
import { computed } from 'vue'
import { TabsList as TabsListPrimitive } from 'radix-vue'
import type { TabsListProps } from './tabs.types'
import { cn } from '../../utils'

const props = defineProps<TabsListProps>()

const classes = computed(() =>
  cn(
    'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <TabsListPrimitive :class="classes">
    <slot />
  </TabsListPrimitive>
</template>
