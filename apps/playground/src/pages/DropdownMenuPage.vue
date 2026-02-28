<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent,
  Button,
} from '@stellar-vue-ui/core'
import { User, Settings, LogOut, Plus, Mail, MessageSquare, CreditCard } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'

const showStatusBar = ref(true)
const showPanel = ref(false)
const selectedPosition = ref('bottom')
</script>

<template>
  <div>
    <PageHeader
      title="Dropdown Menu"
      description="Displays a menu to the user triggered by a button — supports items, checkboxes, radio groups, and submenus."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Dropdown -->
      <DemoSection title="Basic Menu">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard class="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoSection>

      <!-- With Checkboxes -->
      <DemoSection title="With Checkboxes">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">View Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem v-model:checked="showStatusBar">
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem v-model:checked="showPanel" :disabled="true">
              Panel (disabled)
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p class="mt-2 text-xs text-muted-foreground">
          Status Bar: {{ showStatusBar }}, Panel: {{ showPanel }}
        </p>
      </DemoSection>

      <!-- With Radio Group -->
      <DemoSection title="With Radio Group">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">Position: {{ selectedPosition }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup v-model="selectedPosition">
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoSection>

      <!-- With Submenu -->
      <DemoSection title="With Submenu">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">Invite User</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Invite</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Mail class="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail class="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare class="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus class="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoSection>
    </div>
  </div>
</template>
