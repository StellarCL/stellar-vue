<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import type { TreeViewProps, TreeViewContext } from './tree-view.types'
import TreeViewItem from './TreeViewItem.vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<TreeViewProps>(), {
  expandedKeys: () => [],
  selectedKeys: () => [],
  selectionMode: 'none',
})

const emit = defineEmits<{
  'update:expandedKeys': [keys: string[]]
  'update:selectedKeys': [keys: string[]]
}>()

const internalExpanded = ref<string[]>([...props.expandedKeys])
const internalSelected = ref<string[]>([...props.selectedKeys])

watch(() => props.expandedKeys, (val) => {
  internalExpanded.value = [...val]
})

watch(() => props.selectedKeys, (val) => {
  internalSelected.value = [...val]
})

function toggleExpand(key: string) {
  const index = internalExpanded.value.indexOf(key)
  if (index >= 0) {
    internalExpanded.value.splice(index, 1)
  } else {
    internalExpanded.value.push(key)
  }
  emit('update:expandedKeys', [...internalExpanded.value])
}

function toggleSelect(key: string) {
  if (props.selectionMode === 'none') return

  if (props.selectionMode === 'single') {
    if (internalSelected.value.includes(key)) {
      internalSelected.value = []
    } else {
      internalSelected.value = [key]
    }
  } else {
    const index = internalSelected.value.indexOf(key)
    if (index >= 0) {
      internalSelected.value.splice(index, 1)
    } else {
      internalSelected.value.push(key)
    }
  }
  emit('update:selectedKeys', [...internalSelected.value])
}

const context: TreeViewContext = {
  expandedKeys: internalExpanded.value,
  selectedKeys: internalSelected.value,
  selectionMode: props.selectionMode,
  toggleExpand,
  toggleSelect,
}

provide('tree-view-context', context)

const classes = computed(() =>
  cn('text-sm', props.class),
)
</script>

<template>
  <div :class="classes" role="tree">
    <TreeViewItem
      v-for="node in data"
      :key="node.key"
      :node="node"
      :level="0"
      :expanded-keys="internalExpanded"
      :selected-keys="internalSelected"
      :selection-mode="selectionMode"
    />
  </div>
</template>
