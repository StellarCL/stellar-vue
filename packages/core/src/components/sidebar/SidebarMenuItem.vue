<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarMenuItemProps } from './sidebar.types'
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
