<script setup lang="ts">
import { computed, inject } from 'vue'
import type { SidebarGroupLabelProps } from './sidebar.types'
import { SIDEBAR_INJECTION_KEY } from './sidebar-context'
import { cn } from '../../utils'

const props = defineProps<SidebarGroupLabelProps>()

const context = inject(SIDEBAR_INJECTION_KEY)

const classes = computed(() =>
  cn(
    'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground/70 outline-none transition-all duration-300',
    context?.collapsed.value && 'opacity-0 overflow-hidden h-0 py-0',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
