<script setup lang="ts">
import { Separator } from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Separator"
      description="Visually or semantically separates content."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Horizontal -->
      <DemoSection title="Horizontal (Default)">
        <div class="max-w-md space-y-4">
          <div>
            <h4 class="text-sm font-medium">
              Radix Primitives
            </h4>
            <p class="text-sm text-muted-foreground">
              An open-source UI component library.
            </p>
          </div>
          <Separator />
          <div class="flex h-5 items-center gap-4 text-sm">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </div>
      </DemoSection>

      <!-- Vertical -->
      <DemoSection title="Vertical">
        <div class="flex h-10 items-center gap-4 text-sm">
          <span>Home</span>
          <Separator orientation="vertical" />
          <span>About</span>
          <Separator orientation="vertical" />
          <span>Contact</span>
          <Separator orientation="vertical" />
          <span>Blog</span>
        </div>
      </DemoSection>

      <!-- Section divider -->
      <DemoSection title="Section Divider">
        <div class="max-w-md space-y-4">
          <div>
            <h4 class="text-sm font-semibold">
              Account Settings
            </h4>
            <p class="text-sm text-muted-foreground">
              Manage your account preferences.
            </p>
          </div>
          <Separator />
          <div class="grid gap-2">
            <div class="flex justify-between text-sm">
              <span>Display Name</span>
              <span class="text-muted-foreground">John Doe</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Email</span>
              <span class="text-muted-foreground">john@example.com</span>
            </div>
          </div>
          <Separator />
          <div>
            <h4 class="text-sm font-semibold">
              Privacy
            </h4>
            <p class="text-sm text-muted-foreground mt-1">
              Control your privacy settings.
            </p>
          </div>
        </div>
      </DemoSection>

      <!-- Decorative -->
      <DemoSection title="Decorative vs. Semantic">
        <div class="max-w-md space-y-3">
          <p class="text-xs text-muted-foreground">
            By default, Separator renders a decorative element with <code class="rounded bg-muted px-1 py-0.5 text-xs">role="none"</code>.
          </p>
          <Separator />
          <p class="text-xs text-muted-foreground">
            Set <code class="rounded bg-muted px-1 py-0.5 text-xs">decorative=false</code> for semantic separators with <code class="rounded bg-muted px-1 py-0.5 text-xs">role="separator"</code>.
          </p>
          <Separator :decorative="false" />
        </div>
      </DemoSection>
    </div>
  </div>
</template>
