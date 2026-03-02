<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

const users = [
  { name: 'Alice Martin', initials: 'AM', src: 'https://i.pravatar.cc/150?u=alice' },
  { name: 'Bob Chen', initials: 'BC', src: 'https://i.pravatar.cc/150?u=bob' },
  { name: 'Carol Davis', initials: 'CD', src: 'https://i.pravatar.cc/150?u=carol' },
  { name: 'Dan Wilson', initials: 'DW', src: 'https://i.pravatar.cc/150?u=dan' },
  { name: 'Eve Johnson', initials: 'EJ', src: 'https://i.pravatar.cc/150?u=eve' },
]
</script>

<template>
  <div>
    <PageHeader
      title="Avatar"
      description="An image element with a fallback for representing the user."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- All sizes -->
      <DemoSection
        title="Sizes"
        description="Avatars are available in four sizes: sm, md, lg, and xl."
      >
        <div class="flex items-end gap-4">
          <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-2">
            <Avatar :size="size">
              <AvatarImage src="https://i.pravatar.cc/150?u=stellar" alt="Stellar User" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">{{ size }}</span>
          </div>
        </div>
      </DemoSection>

      <!-- With images -->
      <DemoSection title="With Images" description="Avatars display profile images when available.">
        <div class="flex items-center gap-3">
          <Avatar v-for="user in users" :key="user.name" size="lg">
            <AvatarImage :src="user.src" :alt="user.name" />
            <AvatarFallback>{{ user.initials }}</AvatarFallback>
          </Avatar>
        </div>
      </DemoSection>

      <!-- Fallback initials -->
      <DemoSection
        title="Fallback Initials"
        description="When no image is provided, initials are shown as a fallback."
      >
        <div class="flex items-center gap-3">
          <Avatar v-for="user in users" :key="user.name" size="lg">
            <AvatarFallback>{{ user.initials }}</AvatarFallback>
          </Avatar>
        </div>
      </DemoSection>

      <!-- Broken image fallback -->
      <DemoSection
        title="Broken Image Fallback"
        description="If the image fails to load, the fallback is displayed instead."
      >
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="https://broken-url.invalid/photo.jpg" alt="Broken Image" />
              <AvatarFallback>BR</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">Broken URL</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="" alt="Empty Source" />
              <AvatarFallback>ES</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">Empty src</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarFallback>NI</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">No image</span>
          </div>
        </div>
      </DemoSection>

      <!-- Delayed fallback -->
      <DemoSection
        title="Delayed Fallback"
        description="The fallback can be delayed to avoid flickering for users with fast connections."
      >
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="https://broken-url.invalid/slow.jpg" alt="Delayed" />
              <AvatarFallback :delay-ms="0">0ms</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">0ms delay</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="https://broken-url.invalid/slow.jpg" alt="Delayed" />
              <AvatarFallback :delay-ms="500">DL</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">500ms delay</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="https://broken-url.invalid/slow.jpg" alt="Delayed" />
              <AvatarFallback :delay-ms="2000">SL</AvatarFallback>
            </Avatar>
            <span class="text-xs text-muted-foreground">2000ms delay</span>
          </div>
        </div>
      </DemoSection>

      <!-- Avatar group -->
      <DemoSection
        title="Avatar Group"
        description="Avatars can be stacked together to represent a group of users."
      >
        <div class="flex items-center">
          <Avatar
            v-for="(user, index) in users"
            :key="user.name"
            size="lg"
            :class="index > 0 ? '-ml-3' : ''"
            class="border-2 border-background"
          >
            <AvatarImage :src="user.src" :alt="user.name" />
            <AvatarFallback>{{ user.initials }}</AvatarFallback>
          </Avatar>
          <Avatar size="lg" class="-ml-3 border-2 border-background">
            <AvatarFallback>+3</AvatarFallback>
          </Avatar>
        </div>
      </DemoSection>

      <!-- Sizes matrix -->
      <DemoSection
        title="All Sizes with Fallback"
        description="Complete size matrix showing both image and fallback variants."
      >
        <div class="space-y-4">
          <div v-for="size in sizes" :key="size" class="flex items-center gap-4">
            <span class="w-8 text-xs text-muted-foreground">{{ size }}</span>
            <Avatar :size="size">
              <AvatarImage src="https://i.pravatar.cc/150?u=matrix" alt="User" />
              <AvatarFallback>MX</AvatarFallback>
            </Avatar>
            <Avatar :size="size">
              <AvatarFallback>MX</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
