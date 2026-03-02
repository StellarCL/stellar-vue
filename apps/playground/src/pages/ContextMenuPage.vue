<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const showBookmarks = ref(true)
const showFullUrls = ref(false)
const selectedPerson = ref('pedro')
</script>

<template>
  <div>
    <PageHeader
      title="Context Menu"
      description="A menu that appears on right-click, supporting items, checkboxes, radio groups, submenus, and keyboard shortcuts."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Context Menu -->
      <DemoSection
        title="Basic Context Menu"
        description="Right-click on the area below to open the context menu."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              class="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none"
            >
              Right-click here
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent class="w-64">
            <ContextMenuItem inset>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset :disabled="true">
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset>
              Save As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
              Print...
              <ContextMenuShortcut>⌘P</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DemoSection>

      <!-- With Checkboxes -->
      <DemoSection
        title="With Checkboxes"
        description="Toggle boolean options using checkbox items in the context menu."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              class="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none"
            >
              Right-click for view options
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent class="w-64">
            <ContextMenuLabel inset>Appearance</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem v-model:checked="showBookmarks">
              Show Bookmarks
              <ContextMenuShortcut>⌘B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem v-model:checked="showFullUrls">
              Show Full URLs
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
        <p class="mt-3 text-xs text-muted-foreground">
          Bookmarks: {{ showBookmarks }}, Full URLs: {{ showFullUrls }}
        </p>
      </DemoSection>

      <!-- With Radio Group -->
      <DemoSection
        title="With Radio Group"
        description="Select one option from a group using radio items."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              class="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none"
            >
              Right-click to select a person
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent class="w-64">
            <ContextMenuLabel inset>Assign To</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup v-model="selectedPerson">
              <ContextMenuRadioItem value="pedro"> Pedro Duarte </ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm"> Colm Tuite </ContextMenuRadioItem>
              <ContextMenuRadioItem value="sarah"> Sarah Chen </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
        <p class="mt-3 text-xs text-muted-foreground">Selected: {{ selectedPerson }}</p>
      </DemoSection>

      <!-- With Submenu -->
      <DemoSection
        title="With Submenu"
        description="Nest additional menu items inside a submenu for deeper navigation."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              class="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none"
            >
              Right-click for full menu
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent class="w-64">
            <ContextMenuGroup>
              <ContextMenuItem inset>
                New Tab
                <ContextMenuShortcut>⌘T</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset>
                New Window
                <ContextMenuShortcut>⌘N</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset :disabled="true"> New Incognito Window </ContextMenuItem>
            </ContextMenuGroup>

            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger inset> More Tools </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-48">
                <ContextMenuItem>
                  Save Page As...
                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem> Create Shortcut... </ContextMenuItem>
                <ContextMenuItem> Name Window... </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  Developer Tools
                  <ContextMenuShortcut>⌥⌘I</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSeparator />

            <ContextMenuCheckboxItem v-model:checked="showBookmarks">
              Show Bookmarks Bar
              <ContextMenuShortcut>⇧⌘B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem v-model:checked="showFullUrls">
              Show Full URLs
            </ContextMenuCheckboxItem>

            <ContextMenuSeparator />

            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuRadioGroup v-model="selectedPerson">
              <ContextMenuRadioItem value="pedro"> Pedro Duarte </ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm"> Colm Tuite </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </DemoSection>
    </div>
  </div>
</template>
