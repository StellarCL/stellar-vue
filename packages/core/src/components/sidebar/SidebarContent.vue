<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarContentProps } from './sidebar.types'
import { cn } from '../../utils'

const props = defineProps<SidebarContentProps>()

const classes = computed(() =>
  cn('flex-1 overflow-y-auto overflow-x-hidden', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
