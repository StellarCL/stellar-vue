<script setup lang="ts">
import { computed, inject } from 'vue'
import type { TreeViewItemProps, TreeViewContext } from './tree-view.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<TreeViewItemProps>(), {
  level: 0,
})

const context = inject<TreeViewContext>('tree-view-context')!

const hasChildren = computed(() =>
  props.node.children && props.node.children.length > 0,
)

const isExpanded = computed(() =>
  props.expandedKeys.includes(props.node.key),
)

const isSelected = computed(() =>
  props.selectedKeys.includes(props.node.key),
)

const indentStyle = computed(() => ({
  paddingLeft: `${props.level * 1.25}rem`,
}))

function handleToggleExpand() {
  if (hasChildren.value) {
    context.toggleExpand(props.node.key)
  }
}

function handleSelect() {
  if (props.node.disabled) return
  context.toggleSelect(props.node.key)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (hasChildren.value && (event.key === 'Enter' || props.selectionMode === 'none')) {
      handleToggleExpand()
    }
    if (props.selectionMode !== 'none') {
      handleSelect()
    }
  }
  if (event.key === 'ArrowRight' && hasChildren.value && !isExpanded.value) {
    event.preventDefault()
    context.toggleExpand(props.node.key)
  }
  if (event.key === 'ArrowLeft' && hasChildren.value && isExpanded.value) {
    event.preventDefault()
    context.toggleExpand(props.node.key)
  }
}

const itemClasses = computed(() =>
  cn(
    'flex cursor-pointer select-none items-center gap-1 rounded-sm px-2 py-1 outline-none transition-colors hover:bg-accent focus-visible:bg-accent',
    isSelected.value ? 'bg-accent text-accent-foreground' : '',
    props.node.disabled ? 'pointer-events-none opacity-50' : '',
    props.class,
  ),
)
</script>

<template>
  <div role="treeitem" :aria-expanded="hasChildren ? isExpanded : undefined" :aria-selected="isSelected">
    <div
      :class="itemClasses"
      :style="indentStyle"
      :tabindex="node.disabled ? -1 : 0"
      @click="hasChildren ? handleToggleExpand() : handleSelect()"
      @keydown="handleKeyDown"
    >
      <!-- Chevron -->
      <span v-if="hasChildren" class="inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="cn('transition-transform', isExpanded ? 'rotate-90' : '')"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
      <span v-else class="inline-flex h-4 w-4 shrink-0" />

      <!-- Icon -->
      <component :is="node.icon" v-if="node.icon" class="h-4 w-4 shrink-0" />

      <!-- Label -->
      <span class="truncate">{{ node.label }}</span>
    </div>

    <!-- Children -->
    <div v-if="hasChildren && isExpanded" role="group">
      <TreeViewItem
        v-for="child in node.children"
        :key="child.key"
        :node="child"
        :level="level + 1"
        :expanded-keys="expandedKeys"
        :selected-keys="selectedKeys"
        :selection-mode="selectionMode"
      />
    </div>
  </div>
</template>
