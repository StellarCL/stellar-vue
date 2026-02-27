<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarMenuProps } from './sidebar.types'
import { cn } from '../../utils'

const props = defineProps<SidebarMenuProps>()

const classes = computed(() =>
  cn('flex w-full min-w-0 flex-col gap-1', props.class),
)
</script>

<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>
