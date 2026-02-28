<script setup lang="ts">
import type { SidebarMenuItemProps } from './sidebar.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SidebarMenuItemProps>()

const classes = computed(() =>
  cn('group/menu-item relative', props.class),
)
</script>

<template>
  <li :class="classes">
    <slot />
  </li>
</template>
