<script setup lang="ts">
import type { NavigationMenuLinkProps } from './navigation-menu.types'
import { NavigationMenuLink as NavigationMenuLinkPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<NavigationMenuLinkProps>(), {
  active: false,
})

const classes = computed(() =>
  cn(
    'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
    props.class,
  ),
)
</script>

<template>
  <NavigationMenuLinkPrimitive :active="props.active" :href="props.href" :class="classes">
    <slot />
  </NavigationMenuLinkPrimitive>
</template>
