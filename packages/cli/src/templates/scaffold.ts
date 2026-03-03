// Scaffold template for `stellar-ui init --scaffold`
// Generates an App.vue with AppShell + Sidebar layout

/**
 * Components required by the scaffold template.
 * These will be automatically added during `init --scaffold`.
 */
export const SCAFFOLD_COMPONENTS = ['shell', 'sidebar', 'button', 'separator', 'avatar'] as const

/**
 * Generate the App.vue scaffold template.
 * Uses placeholder import paths that get rewritten by the CLI.
 */
export function getScaffoldTemplate(componentsDir: string): string {
  // Normalize path — strip leading ./ for cleaner imports
  const dir = componentsDir.replace(/^\.\//, '')

  return `<script setup lang="ts">
import { ref } from 'vue'
import { AppShell, ShellHeader, ShellSidebar, ShellMain } from '@/${dir}/shell'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/${dir}/sidebar'
import { Button } from '@/${dir}/button'
import { Separator } from '@/${dir}/separator'
import { Avatar, AvatarFallback } from '@/${dir}/avatar'

const collapsed = ref(false)
</script>

<template>
  <AppShell>
    <ShellSidebar>
      <Sidebar :collapsed="collapsed" collapsible>
        <SidebarHeader>
          <h2 class="text-lg font-semibold">My App</h2>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton active>
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </SidebarFooter>
      </Sidebar>
    </ShellSidebar>
    <ShellMain>
      <ShellHeader>
        <Button variant="ghost" size="icon" @click="collapsed = !collapsed">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        </Button>
        <h1 class="text-xl font-semibold">Dashboard</h1>
      </ShellHeader>
      <div class="p-6">
        <p class="text-muted-foreground">Welcome to your app. Start building!</p>
      </div>
    </ShellMain>
  </AppShell>
</template>
`
}
