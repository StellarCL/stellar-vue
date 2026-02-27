<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuList as NavigationMenuListPrimitive } from 'radix-vue'
import { cn } from '../../utils'
import type { NavigationMenuListProps } from './navigation-menu.types'

const props = withDefaults(defineProps<NavigationMenuListProps>(), {})

const classes = computed(() =>
  cn(
    'flex flex-1 list-none items-center justify-center space-x-1',
    props.class,
  ),
)
</script>

<template>
  <NavigationMenuListPrimitive :class="classes">
    <slot />
  </NavigationMenuListPrimitive>
</template>
