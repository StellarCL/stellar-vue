<script setup lang="ts">
import type { SidebarProps } from './sidebar.types'
import { computed, provide, ref, watch } from 'vue'
import { cn } from '../../utils'
import { SIDEBAR_INJECTION_KEY } from './sidebar-context'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsed: false,
  collapsedWidth: '4rem',
  width: '16rem',
  collapsible: true,
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const internalCollapsed = ref(props.collapsed)

watch(
  () => props.collapsed,
  (val) => {
    internalCollapsed.value = val
  },
)

function toggle() {
  if (!props.collapsible)
    return
  internalCollapsed.value = !internalCollapsed.value
  emit('update:collapsed', internalCollapsed.value)
}

provide(SIDEBAR_INJECTION_KEY, {
  collapsed: internalCollapsed,
  collapsible: props.collapsible,
  width: props.width,
  collapsedWidth: props.collapsedWidth,
  toggle,
})

const currentWidth = computed(() =>
  internalCollapsed.value ? props.collapsedWidth : props.width,
)

const classes = computed(() =>
  cn(
    'relative flex flex-col overflow-hidden transition-all duration-300 ease-in-out',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" :style="{ width: currentWidth }" data-collapsed="internalCollapsed">
    <slot />
  </div>
</template>
