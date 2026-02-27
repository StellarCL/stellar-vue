<script setup lang="ts">
import { NavigationMenuRoot } from 'radix-vue'
import NavigationMenuViewport from './NavigationMenuViewport.vue'
import { cn } from '../../utils'
import type { NavigationMenuProps } from './navigation-menu.types'

const props = withDefaults(defineProps<NavigationMenuProps>(), {})
</script>

<template>
  <NavigationMenuRoot :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', props.class)">
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
