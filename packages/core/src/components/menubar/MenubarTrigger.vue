<script setup lang="ts">
import { computed } from 'vue'
import { MenubarTrigger as MenubarTriggerPrimitive } from 'radix-vue'
import type { MenubarTriggerProps } from './menubar.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MenubarTriggerProps>(), {
  disabled: false,
})

const classes = computed(() =>
  cn(
    'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    props.class,
  ),
)
</script>

<template>
  <MenubarTriggerPrimitive :disabled="disabled" :class="classes">
    <slot />
  </MenubarTriggerPrimitive>
</template>
