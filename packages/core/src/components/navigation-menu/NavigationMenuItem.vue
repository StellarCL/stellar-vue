<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuItem as NavigationMenuItemPrimitive } from 'radix-vue'
import { cn } from '../../utils'
import type { NavigationMenuItemProps } from './navigation-menu.types'

const props = withDefaults(defineProps<NavigationMenuItemProps>(), {})

const classes = computed(() => cn(props.class))
</script>

<template>
  <NavigationMenuItemPrimitive :class="classes">
    <slot />
  </NavigationMenuItemPrimitive>
</template>
