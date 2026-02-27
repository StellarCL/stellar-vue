<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuIndicator as NavigationMenuIndicatorPrimitive } from 'radix-vue'
import { cn } from '../../utils'
import type { NavigationMenuIndicatorProps } from './navigation-menu.types'

const props = withDefaults(defineProps<NavigationMenuIndicatorProps>(), {})

const classes = computed(() =>
  cn(
    'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
    props.class,
  ),
)
</script>

<template>
  <NavigationMenuIndicatorPrimitive :class="classes">
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicatorPrimitive>
</template>
