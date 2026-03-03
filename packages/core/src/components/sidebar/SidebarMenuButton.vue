<script setup lang="ts">
import type { SidebarMenuButtonProps } from './sidebar.types'
import { Primitive } from 'radix-vue'
import { computed, inject } from 'vue'
import { cn } from '../../utils'
import { SIDEBAR_INJECTION_KEY } from './sidebar-context'

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  active: false,
  asChild: false,
})

const context = inject(SIDEBAR_INJECTION_KEY)

const isCollapsed = computed(() => context?.collapsed.value ?? false)

const classes = computed(() =>
  cn(
    'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-all duration-300',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-ring',
    props.active && 'bg-accent text-accent-foreground font-medium',
    isCollapsed.value && 'justify-center',
    props.class,
  ),
)
</script>

<template>
  <Primitive
    :as="asChild ? undefined : 'button'"
    :as-child="asChild"
    :class="classes"
    :data-active="active"
  >
    <slot name="icon" />
    <span v-if="!isCollapsed" class="truncate">
      <slot />
    </span>
  </Primitive>
</template>
