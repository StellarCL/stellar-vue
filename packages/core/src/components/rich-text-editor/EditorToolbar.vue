<script setup lang="ts">
import { computed } from 'vue'
import type { EditorToolbarProps } from './rich-text-editor.types'
import { DEFAULT_TOOLBAR } from './rich-text-editor.types'
import ToolbarButton from './ToolbarButton.vue'
import ToolbarSeparator from './ToolbarSeparator.vue'
import ToolbarGroup from './ToolbarGroup.vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<EditorToolbarProps>(), {
  items: () => DEFAULT_TOOLBAR,
  disabled: false,
})

const classes = computed(() =>
  cn(
    'flex flex-wrap items-center gap-1 border-b bg-muted/50 px-3 py-2',
    props.class,
  ),
)
</script>

<template>
  <div
    role="toolbar"
    aria-label="Text formatting"
    :class="classes"
  >
    <template v-for="(item, index) in items" :key="index">
      <ToolbarSeparator v-if="item === 'separator'" />
      <ToolbarGroup v-else-if="Array.isArray(item)">
        <ToolbarButton
          v-for="command in item"
          :key="command"
          :editor="editor"
          :command="command"
          :disabled="disabled"
        />
      </ToolbarGroup>
      <ToolbarButton
        v-else
        :editor="editor"
        :command="item"
        :disabled="disabled"
      />
    </template>
  </div>
</template>
