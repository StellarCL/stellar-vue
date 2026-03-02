<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const showBookmarks = ref(true)
const showUrls = ref(false)
const showStatusBar = ref(true)
const showActivityBar = ref(false)
const showPanel = ref(false)
const person = ref('pedro')
</script>

<template>
  <div>
    <PageHeader
      title="Menubar"
      description="A visually persistent menu common in desktop applications, providing quick access to a consistent set of commands."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Full Application Menubar -->
      <DemoSection
        title="Application Menu"
        description="A full application-style menubar with File, Edit, and View menus."
      >
        <Menubar>
          <!-- File Menu -->
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab
                <MenubarShortcut>Ctrl+T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window
                <MenubarShortcut>Ctrl+N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled> New Incognito Window </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email Link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print...
                <MenubarShortcut>Ctrl+P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <!-- Edit Menu -->
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo
                <MenubarShortcut>Ctrl+Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo
                <MenubarShortcut>Ctrl+Y</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the Web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Cut
                <MenubarShortcut>Ctrl+X</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Copy
                <MenubarShortcut>Ctrl+C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Paste
                <MenubarShortcut>Ctrl+V</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <!-- View Menu -->
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem v-model:checked="showBookmarks">
                Always Show Bookmarks Bar
                <MenubarShortcut>Ctrl+Shift+B</MenubarShortcut>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem v-model:checked="showUrls">
                Always Show Full URLs
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload
                <MenubarShortcut>Ctrl+R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem inset disabled>
                Force Reload
                <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </DemoSection>

      <!-- Checkbox Items State -->
      <DemoSection title="Checkbox Items" description="Menu items with a togglable checked state.">
        <div class="space-y-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Preferences</MenubarTrigger>
              <MenubarContent>
                <MenubarLabel>Appearance</MenubarLabel>
                <MenubarSeparator />
                <MenubarCheckboxItem v-model:checked="showStatusBar">
                  Status Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem v-model:checked="showActivityBar">
                  Activity Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem v-model:checked="showPanel"> Panel </MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div class="text-sm text-muted-foreground">
            Status Bar: {{ showStatusBar ? 'Visible' : 'Hidden' }} | Activity Bar:
            {{ showActivityBar ? 'Visible' : 'Hidden' }} | Panel:
            {{ showPanel ? 'Visible' : 'Hidden' }}
          </div>
        </div>
      </DemoSection>

      <!-- Radio Group -->
      <DemoSection title="Radio Group" description="Mutually exclusive radio items within a menu.">
        <div class="space-y-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarLabel inset>People</MenubarLabel>
                <MenubarSeparator />
                <MenubarRadioGroup v-model="person">
                  <MenubarRadioItem value="pedro">Pedro Duarte</MenubarRadioItem>
                  <MenubarRadioItem value="colm">Colm Tuite</MenubarRadioItem>
                  <MenubarRadioItem value="andy">Andy Chen</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <p class="text-sm text-muted-foreground">Selected person: {{ person }}</p>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
