<script setup lang="ts">
import { TreeView } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const fileTree = [
  {
    key: 'src',
    label: 'src',
    children: [
      {
        key: 'components',
        label: 'components',
        children: [
          { key: 'button.vue', label: 'Button.vue' },
          { key: 'input.vue', label: 'Input.vue' },
          { key: 'dialog.vue', label: 'Dialog.vue' },
        ],
      },
      {
        key: 'composables',
        label: 'composables',
        children: [
          { key: 'useTheme.ts', label: 'useTheme.ts' },
          { key: 'useToast.ts', label: 'useToast.ts' },
        ],
      },
      { key: 'app.vue', label: 'App.vue' },
      { key: 'main.ts', label: 'main.ts' },
    ],
  },
  {
    key: 'public',
    label: 'public',
    children: [
      { key: 'favicon.ico', label: 'favicon.ico' },
      { key: 'robots.txt', label: 'robots.txt' },
    ],
  },
  { key: 'package.json', label: 'package.json' },
  { key: 'tsconfig.json', label: 'tsconfig.json' },
  { key: 'readme.md', label: 'README.md' },
]

const expandedKeys1 = ref(['src', 'components'])
const selectedKeys1 = ref<string[]>([])

const expandedKeys2 = ref(['src'])
const selectedKeys2 = ref<string[]>(['main.ts'])

const expandedKeys3 = ref(['src', 'components', 'composables'])
const selectedKeys3 = ref<string[]>(['button.vue', 'useTheme.ts'])

const disabledTree = [
  {
    key: 'enabled-folder',
    label: 'Enabled Folder',
    children: [
      { key: 'file-a', label: 'File A' },
      { key: 'file-b', label: 'File B', disabled: true },
      { key: 'file-c', label: 'File C' },
    ],
  },
  {
    key: 'disabled-folder',
    label: 'Disabled Folder',
    disabled: true,
    children: [{ key: 'file-d', label: 'File D' }],
  },
]

const expandedKeys4 = ref(['enabled-folder'])
const selectedKeys4 = ref<string[]>([])
</script>

<template>
  <div>
    <PageHeader
      title="Tree View"
      description="A hierarchical tree component for displaying nested data structures with expand/collapse and selection support."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic File Tree -->
      <DemoSection
        title="File Tree"
        description="A file explorer-like tree with expandable folders."
      >
        <div class="max-w-sm">
          <TreeView
            :data="fileTree"
            v-model:expanded-keys="expandedKeys1"
            v-model:selected-keys="selectedKeys1"
            selection-mode="none"
          />
        </div>
      </DemoSection>

      <!-- Single Selection -->
      <DemoSection title="Single Selection" description="Only one node can be selected at a time.">
        <div class="flex gap-8">
          <div class="max-w-sm flex-1">
            <TreeView
              :data="fileTree"
              v-model:expanded-keys="expandedKeys2"
              v-model:selected-keys="selectedKeys2"
              selection-mode="single"
            />
          </div>
          <div class="flex-1">
            <p class="text-xs font-medium text-muted-foreground mb-2">Selected</p>
            <pre class="rounded-md bg-muted p-3 text-xs">{{
              selectedKeys2.length ? selectedKeys2.join(', ') : 'None'
            }}</pre>
          </div>
        </div>
      </DemoSection>

      <!-- Multiple Selection -->
      <DemoSection
        title="Multiple Selection"
        description="Multiple nodes can be selected simultaneously."
      >
        <div class="flex gap-8">
          <div class="max-w-sm flex-1">
            <TreeView
              :data="fileTree"
              v-model:expanded-keys="expandedKeys3"
              v-model:selected-keys="selectedKeys3"
              selection-mode="multiple"
            />
          </div>
          <div class="flex-1">
            <p class="text-xs font-medium text-muted-foreground mb-2">
              Selected ({{ selectedKeys3.length }})
            </p>
            <pre class="rounded-md bg-muted p-3 text-xs whitespace-pre-wrap">{{
              selectedKeys3.length ? selectedKeys3.join('\n') : 'None'
            }}</pre>
          </div>
        </div>
      </DemoSection>

      <!-- Disabled Nodes -->
      <DemoSection
        title="Disabled Nodes"
        description="Individual nodes or entire branches can be disabled."
      >
        <div class="max-w-sm">
          <TreeView
            :data="disabledTree"
            v-model:expanded-keys="expandedKeys4"
            v-model:selected-keys="selectedKeys4"
            selection-mode="single"
          />
        </div>
      </DemoSection>
    </div>
  </div>
</template>
