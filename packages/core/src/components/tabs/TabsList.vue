<script setup lang="ts">
import type { TabsListProps } from './tabs.types'
import { TabsList as TabsListPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<TabsListProps>()

const classes = computed(() =>
  cn('inline-flex items-center border-b border-slate-150 dark:border-navy-600', props.class),
)
</script>

<template>
  <TabsListPrimitive :class="classes">
    <slot />
  </TabsListPrimitive>
</template>
