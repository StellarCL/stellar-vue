<script setup lang="ts">
import type { NavigationMenuItemProps } from './navigation-menu.types'
import { NavigationMenuItem as NavigationMenuItemPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<NavigationMenuItemProps>(), {})

const classes = computed(() => cn(props.class))
</script>

<template>
  <NavigationMenuItemPrimitive :class="classes">
    <slot />
  </NavigationMenuItemPrimitive>
</template>
