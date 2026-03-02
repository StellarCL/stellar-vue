<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const controlledTab = ref('account')
</script>

<template>
  <div>
    <PageHeader
      title="Tabs"
      description="A set of layered sections of content, known as tab panels, that are displayed one at a time."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic horizontal tabs -->
      <DemoSection
        title="Horizontal Tabs"
        description="The default tab orientation with content panels."
      >
        <Tabs default-value="overview" class="max-w-lg">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div class="p-4 text-sm text-muted-foreground">
              <p>
                Stellar Vue UI is a modern component library built for Vue 3. It provides a
                collection of accessible, customizable components that follow the copy-paste model
                for maximum flexibility.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="features">
            <div class="p-4 text-sm text-muted-foreground">
              <ul class="list-disc pl-4 space-y-1">
                <li>56+ beautifully designed components</li>
                <li>Built on Radix Vue for accessibility</li>
                <li>6 star-themed presets</li>
                <li>Full TypeScript support</li>
                <li>CLI for easy installation</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="pricing">
            <div class="p-4 text-sm text-muted-foreground">
              <p>
                Stellar Vue UI is completely free and open-source. Use it in personal and commercial
                projects without restrictions.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <!-- Vertical tabs -->
      <DemoSection
        title="Vertical Tabs"
        description="Tabs can be oriented vertically for sidebar-style navigation."
      >
        <Tabs default-value="general" orientation="vertical" class="flex gap-4 max-w-lg">
          <TabsList class="flex-col h-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <div class="flex-1">
            <TabsContent value="general">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">General Settings</h4>
                <p>Manage your account name, email, and profile information.</p>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">Security Settings</h4>
                <p>
                  Configure two-factor authentication, password policies, and session management.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">Notification Preferences</h4>
                <p>Choose how and when you want to receive notifications from the platform.</p>
              </div>
            </TabsContent>
            <TabsContent value="integrations">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">Integrations</h4>
                <p>Connect with third-party services like Slack, GitHub, and Jira.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DemoSection>

      <!-- Disabled tab -->
      <DemoSection
        title="Disabled Tab"
        description="Individual tabs can be disabled to prevent interaction."
      >
        <Tabs default-value="active" class="max-w-lg">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="another">Another</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div class="p-4 text-sm text-muted-foreground">This tab is active and interactive.</div>
          </TabsContent>
          <TabsContent value="disabled">
            <div class="p-4 text-sm text-muted-foreground">
              You should not be able to reach this content.
            </div>
          </TabsContent>
          <TabsContent value="another">
            <div class="p-4 text-sm text-muted-foreground">
              This is another active tab. Notice the middle tab cannot be selected.
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <!-- Controlled tabs -->
      <DemoSection
        title="Controlled Tabs"
        description="Use v-model to control the active tab programmatically."
      >
        <div class="max-w-lg space-y-4">
          <Tabs v-model="controlledTab">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">Account</h4>
                <p>Make changes to your account here. Click save when you're done.</p>
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">Password</h4>
                <p>Change your password here. After saving, you'll be logged out.</p>
              </div>
            </TabsContent>
            <TabsContent value="team">
              <div class="p-4 text-sm text-muted-foreground rounded-md border border-border">
                <h4 class="font-medium text-foreground mb-2">Team</h4>
                <p>Invite team members and manage roles and permissions.</p>
              </div>
            </TabsContent>
          </Tabs>
          <div class="flex items-center gap-2 border-t border-border pt-4">
            <p class="text-xs text-muted-foreground">
              Active tab:
              <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">{{
                controlledTab
              }}</code>
            </p>
            <div class="flex gap-1.5 ml-auto">
              <button
                v-for="tab in ['account', 'password', 'team']"
                :key="tab"
                class="px-2 py-1 rounded text-xs border transition-colors"
                :class="
                  controlledTab === tab
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-input hover:bg-accent'
                "
                @click="controlledTab = tab"
              >
                {{ tab }}
              </button>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Rich content tabs -->
      <DemoSection
        title="Rich Content"
        description="Tab panels can contain any content, including forms and lists."
      >
        <Tabs default-value="music" class="max-w-lg">
          <TabsList>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="audiobooks">Audiobooks</TabsTrigger>
          </TabsList>
          <TabsContent value="music">
            <div class="p-4 space-y-3">
              <div
                v-for="song in ['Stellar Overture', 'Nebula Dreams', 'Cosmic Drift', 'Supernova']"
                :key="song"
                class="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p class="text-sm font-medium text-foreground">{{ song }}</p>
                  <p class="text-xs text-muted-foreground">Stellar Orchestra</p>
                </div>
                <span class="text-xs text-muted-foreground">3:42</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="podcasts">
            <div class="p-4 space-y-3">
              <div
                v-for="podcast in ['The Vue Show', 'Frontend Friday', 'TypeScript Tales']"
                :key="podcast"
                class="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p class="text-sm font-medium text-foreground">{{ podcast }}</p>
                  <p class="text-xs text-muted-foreground">Weekly episodes</p>
                </div>
                <span class="text-xs text-muted-foreground">45 min</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="audiobooks">
            <div class="p-4 text-sm text-muted-foreground text-center py-8">
              No audiobooks in your library yet.
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>
    </div>
  </div>
</template>
