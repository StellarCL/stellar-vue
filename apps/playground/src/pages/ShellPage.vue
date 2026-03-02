<script setup lang="ts">
import { AppShell, ShellFooter, ShellHeader, ShellMain, ShellSidebar } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const headerHeight = ref('3rem')
</script>

<template>
  <div>
    <PageHeader
      title="Shell"
      description="Application shell layout primitives for building page structures with header, sidebar, main content, and footer areas."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Shell -->
      <DemoSection
        title="Basic App Shell"
        description="A complete layout with header, sidebar, main content, and footer."
      >
        <div class="h-[400px] rounded-lg border border-border overflow-hidden">
          <AppShell class="!h-full">
            <ShellHeader
              :height="headerHeight"
              class="bg-primary text-primary-foreground flex items-center px-4"
            >
              <span class="font-semibold text-sm">App Header</span>
            </ShellHeader>
            <div class="flex flex-1 overflow-hidden">
              <ShellSidebar class="w-48 bg-muted/50 border-r border-border p-4">
                <p class="text-xs font-medium text-muted-foreground mb-3">Navigation</p>
                <ul class="space-y-1 text-sm">
                  <li class="px-2 py-1.5 rounded bg-accent text-accent-foreground">Dashboard</li>
                  <li class="px-2 py-1.5 rounded hover:bg-accent/50 cursor-pointer">Settings</li>
                  <li class="px-2 py-1.5 rounded hover:bg-accent/50 cursor-pointer">Users</li>
                  <li class="px-2 py-1.5 rounded hover:bg-accent/50 cursor-pointer">Reports</li>
                </ul>
              </ShellSidebar>
              <ShellMain class="p-6">
                <h2 class="text-lg font-semibold mb-2">Main Content Area</h2>
                <p class="text-sm text-muted-foreground">
                  This is the primary content area of the application shell. It fills the remaining
                  space after the header, sidebar, and footer are positioned.
                </p>
              </ShellMain>
            </div>
            <ShellFooter class="bg-muted/30 border-t border-border px-4 py-2">
              <p class="text-xs text-muted-foreground">Footer &mdash; Stellar Vue UI</p>
            </ShellFooter>
          </AppShell>
        </div>
      </DemoSection>

      <!-- Header Height Control -->
      <DemoSection
        title="Custom Header Height"
        description="Adjust the header height using the control below."
      >
        <div class="space-y-4">
          <div class="flex items-center gap-4 text-sm">
            <label class="font-medium text-muted-foreground">Header Height</label>
            <div class="flex gap-1.5">
              <button
                v-for="h in ['2.5rem', '3rem', '4rem', '5rem']"
                :key="h"
                class="px-2 py-1 rounded text-xs border transition-colors"
                :class="
                  headerHeight === h
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-input hover:bg-accent'
                "
                @click="headerHeight = h"
              >
                {{ h }}
              </button>
            </div>
          </div>
          <div class="h-[300px] rounded-lg border border-border overflow-hidden">
            <AppShell class="!h-full">
              <ShellHeader
                :height="headerHeight"
                class="bg-primary text-primary-foreground flex items-center px-4"
              >
                <span class="text-sm font-semibold">Header ({{ headerHeight }})</span>
              </ShellHeader>
              <ShellMain class="p-6">
                <p class="text-sm text-muted-foreground">Main content area.</p>
              </ShellMain>
            </AppShell>
          </div>
        </div>
      </DemoSection>

      <!-- Without Sidebar -->
      <DemoSection
        title="Without Sidebar"
        description="A shell layout using only header, main, and footer."
      >
        <div class="h-[250px] rounded-lg border border-border overflow-hidden">
          <AppShell class="!h-full">
            <ShellHeader class="bg-primary text-primary-foreground flex items-center px-4">
              <span class="font-semibold text-sm">Simple Layout</span>
            </ShellHeader>
            <ShellMain class="p-6">
              <p class="text-sm text-muted-foreground">
                Not every layout needs a sidebar. This shell uses only a header, main area, and
                footer.
              </p>
            </ShellMain>
            <ShellFooter class="bg-muted/30 border-t border-border px-4 py-2">
              <p class="text-xs text-muted-foreground">Footer content</p>
            </ShellFooter>
          </AppShell>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
