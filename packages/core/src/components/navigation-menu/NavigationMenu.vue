<script setup lang="ts">
import type { NavigationMenuProps } from './navigation-menu.types'
import { NavigationMenuRoot } from 'radix-vue'
import { cn } from '../../utils'
import NavigationMenuViewport from './NavigationMenuViewport.vue'

const props = withDefaults(defineProps<NavigationMenuProps>(), {})
</script>

<template>
  <NavigationMenuRoot :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', props.class)">
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
