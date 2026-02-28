<script setup lang="ts">
import { Badge } from '@stellar-vue-ui/core'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'

const variants = ['default', 'secondary', 'destructive', 'outline'] as const
</script>

<template>
  <div>
    <PageHeader
      title="Badge"
      description="Displays a badge or a component that looks like a badge."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- All Variants -->
      <DemoSection title="Variants">
        <div class="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </DemoSection>

      <!-- Use cases -->
      <DemoSection title="Common Use Cases">
        <div class="space-y-4">
          <!-- Status badges -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-2">Status</p>
            <div class="flex flex-wrap gap-2">
              <Badge class="bg-green-500/15 text-green-700 border-green-500/30">Active</Badge>
              <Badge class="bg-yellow-500/15 text-yellow-700 border-yellow-500/30">Pending</Badge>
              <Badge variant="destructive">Inactive</Badge>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>

          <!-- Count badges -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-2">Counts</p>
            <div class="flex flex-wrap gap-2">
              <Badge>42</Badge>
              <Badge variant="secondary">12</Badge>
              <Badge variant="outline">99+</Badge>
            </div>
          </div>

          <!-- Version/tech tags -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-2">Tags</p>
            <div class="flex flex-wrap gap-2">
              <Badge variant="outline">Vue 3</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Vite</Badge>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Inline with text -->
      <DemoSection title="Inline Usage">
        <div class="space-y-3 max-w-md">
          <p class="text-sm">
            The component is currently
            <Badge class="mx-1">stable</Badge>
            and ready for production use.
          </p>
          <p class="text-sm">
            This feature is
            <Badge variant="secondary" class="mx-1">beta</Badge>
            — expect changes in future versions.
          </p>
          <p class="text-sm flex items-center gap-2">
            Inbox
            <Badge>3</Badge>
          </p>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
