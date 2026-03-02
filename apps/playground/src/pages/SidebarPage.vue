<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const collapsed = ref(false)
const activeItem = ref('dashboard')

const menuItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'projects', label: 'Projects' },
  { key: 'tasks', label: 'Tasks' },
]

const settingsItems = [
  { key: 'profile', label: 'Profile' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'security', label: 'Security' },
]

const collapsed2 = ref(true)
</script>

<template>
  <div>
    <PageHeader
      title="Sidebar"
      description="A collapsible sidebar navigation component with menu groups, items, and header/footer sections."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Collapsible Sidebar -->
      <DemoSection
        title="Collapsible Sidebar"
        description="Toggle between expanded and collapsed states."
      >
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <button
              class="px-3 py-1.5 rounded text-xs border transition-colors bg-primary text-primary-foreground border-primary"
              @click="collapsed = !collapsed"
            >
              {{ collapsed ? 'Expand' : 'Collapse' }}
            </button>
            <span class="text-sm text-muted-foreground">
              State: <strong>{{ collapsed ? 'Collapsed' : 'Expanded' }}</strong>
            </span>
          </div>
          <div class="h-[400px] flex rounded-lg border border-border overflow-hidden">
            <Sidebar
              v-model:collapsed="collapsed"
              collapsible
              class="border-r border-border bg-muted/30"
            >
              <SidebarHeader class="p-4">
                <p class="text-sm font-semibold truncate">Stellar App</p>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem v-for="item in menuItems" :key="item.key">
                        <SidebarMenuButton
                          :active="activeItem === item.key"
                          @click="activeItem = item.key"
                        >
                          {{ item.label }}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Settings</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem v-for="item in settingsItems" :key="item.key">
                        <SidebarMenuButton
                          :active="activeItem === item.key"
                          @click="activeItem = item.key"
                        >
                          {{ item.label }}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter class="p-4">
                <p class="text-xs text-muted-foreground truncate">v0.1.0</p>
              </SidebarFooter>
            </Sidebar>
            <div class="flex-1 p-6">
              <h3 class="text-lg font-semibold mb-2">
                {{ activeItem.charAt(0).toUpperCase() + activeItem.slice(1) }}
              </h3>
              <p class="text-sm text-muted-foreground">
                Content area for the <strong>{{ activeItem }}</strong> section. Click sidebar items
                to navigate.
              </p>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Initially Collapsed -->
      <DemoSection
        title="Initially Collapsed"
        description="Sidebar starting in the collapsed state."
      >
        <div class="space-y-4">
          <button
            class="px-3 py-1.5 rounded text-xs border transition-colors bg-primary text-primary-foreground border-primary"
            @click="collapsed2 = !collapsed2"
          >
            {{ collapsed2 ? 'Expand' : 'Collapse' }}
          </button>
          <div class="h-[300px] flex rounded-lg border border-border overflow-hidden">
            <Sidebar
              v-model:collapsed="collapsed2"
              collapsible
              class="border-r border-border bg-muted/30"
            >
              <SidebarHeader class="p-4">
                <p class="text-sm font-semibold truncate">App</p>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Menu</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton active>Home</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>About</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Contact</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">Main content area.</p>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Non-Collapsible -->
      <DemoSection
        title="Non-Collapsible"
        description="A sidebar that is always expanded (collapsible set to false)."
      >
        <div class="h-[250px] flex rounded-lg border border-border overflow-hidden">
          <Sidebar :collapsible="false" class="border-r border-border bg-muted/30">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton active>Overview</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Reports</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Settings</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div class="flex-1 p-6">
            <p class="text-sm text-muted-foreground">This sidebar cannot be collapsed.</p>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
