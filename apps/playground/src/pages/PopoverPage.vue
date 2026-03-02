<script setup lang="ts">
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const width = ref('100%')
const maxWidth = ref('300px')
const height = ref('25px')
const maxHeight = ref('none')
</script>

<template>
  <div>
    <PageHeader
      title="Popover"
      description="Displays rich content in a portal, triggered by a button."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic popover -->
      <DemoSection title="Basic Popover" description="Click the button to toggle the popover.">
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="font-medium leading-none text-foreground">Dimensions</h4>
                <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div class="grid gap-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="pop-width">Width</Label>
                  <Input id="pop-width" v-model="width" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="pop-max-width">Max. width</Label>
                  <Input id="pop-max-width" v-model="maxWidth" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="pop-height">Height</Label>
                  <Input id="pop-height" v-model="height" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="pop-max-height">Max. height</Label>
                  <Input id="pop-max-height" v-model="maxHeight" class="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </DemoSection>

      <!-- Placement options -->
      <DemoSection
        title="Placement"
        description="Popovers can be positioned on different sides of the trigger."
      >
        <div class="flex flex-wrap items-center justify-center gap-4 min-h-32">
          <Popover v-for="side in ['top', 'right', 'bottom', 'left'] as const" :key="side">
            <PopoverTrigger as-child>
              <Button variant="outline">{{ side }}</Button>
            </PopoverTrigger>
            <PopoverContent :side="side" class="w-60">
              <p class="text-sm text-muted-foreground">
                This popover is positioned on the
                <strong class="text-foreground">{{ side }}</strong> side of the trigger.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </DemoSection>

      <!-- Alignment options -->
      <DemoSection
        title="Alignment"
        description="Within a side, the popover can be aligned to start, center, or end."
      >
        <div class="flex flex-wrap items-center gap-4">
          <Popover v-for="align in ['start', 'center', 'end'] as const" :key="align">
            <PopoverTrigger as-child>
              <Button variant="outline">align: {{ align }}</Button>
            </PopoverTrigger>
            <PopoverContent :align="align" class="w-60">
              <p class="text-sm text-muted-foreground">
                Aligned to <strong class="text-foreground">{{ align }}</strong
                >.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </DemoSection>

      <!-- With form content -->
      <DemoSection
        title="Form Inside Popover"
        description="Popovers can contain interactive form elements."
      >
        <Popover>
          <PopoverTrigger as-child>
            <Button>Update Settings</Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="font-medium leading-none text-foreground">Quick Settings</h4>
                <p class="text-sm text-muted-foreground">
                  Adjust your preferences without leaving the page.
                </p>
              </div>
              <div class="grid gap-3">
                <div class="space-y-1.5">
                  <Label for="pop-name">Display Name</Label>
                  <Input id="pop-name" placeholder="Enter your name..." class="h-8" />
                </div>
                <div class="space-y-1.5">
                  <Label for="pop-email">Email</Label>
                  <Input id="pop-email" type="email" placeholder="you@example.com" class="h-8" />
                </div>
                <Button size="sm" class="mt-1">Save Changes</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </DemoSection>

      <!-- Custom offset -->
      <DemoSection
        title="Side Offset"
        description="Adjust the distance between the popover and the trigger."
      >
        <div class="flex flex-wrap items-center gap-4">
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">Default (4px)</Button>
            </PopoverTrigger>
            <PopoverContent :side-offset="4" class="w-60">
              <p class="text-sm text-muted-foreground">Default offset of 4px.</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">12px offset</Button>
            </PopoverTrigger>
            <PopoverContent :side-offset="12" class="w-60">
              <p class="text-sm text-muted-foreground">12px offset from the trigger.</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">24px offset</Button>
            </PopoverTrigger>
            <PopoverContent :side-offset="24" class="w-60">
              <p class="text-sm text-muted-foreground">24px offset from the trigger.</p>
            </PopoverContent>
          </Popover>
        </div>
      </DemoSection>

      <!-- Notification popover -->
      <DemoSection
        title="Notification Popover"
        description="A practical example showing a notification panel."
      >
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="relative">
              Notifications
              <span
                class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground"
              >
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80" align="end">
            <div class="space-y-3">
              <h4 class="font-medium text-foreground">Notifications</h4>
              <div class="space-y-2">
                <div
                  v-for="notification in [
                    {
                      title: 'New comment',
                      desc: 'Alice commented on your pull request',
                      time: '2m ago',
                    },
                    {
                      title: 'Deploy complete',
                      desc: 'Production deployment finished successfully',
                      time: '15m ago',
                    },
                    {
                      title: 'Review requested',
                      desc: 'Bob requested your review on PR #42',
                      time: '1h ago',
                    },
                  ]"
                  :key="notification.title"
                  class="flex gap-3 rounded-md p-2 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div class="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div class="space-y-0.5">
                    <p class="text-sm font-medium text-foreground">{{ notification.title }}</p>
                    <p class="text-xs text-muted-foreground">{{ notification.desc }}</p>
                    <p class="text-xs text-muted-foreground">{{ notification.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </DemoSection>
    </div>
  </div>
</template>
