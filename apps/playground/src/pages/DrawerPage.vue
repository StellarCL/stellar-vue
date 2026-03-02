<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const profileName = ref('Jane Doe')
const profileEmail = ref('jane@example.com')
const profileBio = ref('Software engineer with a passion for building beautiful interfaces.')
</script>

<template>
  <div>
    <PageHeader
      title="Drawer"
      description="A panel that slides in from the side of the screen, useful for secondary content, forms, and detail views."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Right Drawer (Default) -->
      <DemoSection
        title="Right Drawer"
        description="The default drawer slides in from the right side of the viewport."
      >
        <Drawer>
          <DrawerTrigger as-child>
            <Button>Open Right Drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile information. Click save when you are done.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <Label for="drawer-name">Name</Label>
                <Input id="drawer-name" v-model="profileName" />
              </div>
              <div class="space-y-2">
                <Label for="drawer-email">Email</Label>
                <Input id="drawer-email" v-model="profileEmail" type="email" />
              </div>
              <div class="space-y-2">
                <Label for="drawer-bio">Bio</Label>
                <textarea
                  id="drawer-bio"
                  v-model="profileBio"
                  rows="3"
                  class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button>Save Changes</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DemoSection>

      <!-- Left Drawer -->
      <DemoSection title="Left Drawer" description="A drawer that slides in from the left side.">
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline">Open Left Drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription> Browse the available sections. </DrawerDescription>
            </DrawerHeader>
            <div class="p-6">
              <nav class="space-y-1">
                <a
                  v-for="item in ['Dashboard', 'Projects', 'Team', 'Settings', 'Help']"
                  :key="item"
                  href="#"
                  class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
                >
                  {{ item }}
                </a>
              </nav>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline" class="w-full">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DemoSection>

      <!-- Size Variants -->
      <DemoSection
        title="Drawer Sizes"
        description="Control the drawer width with sm, md, lg, xl, and full size options."
      >
        <div class="flex flex-wrap gap-3">
          <Drawer v-for="size in ['sm', 'md', 'lg', 'xl'] as const" :key="size">
            <DrawerTrigger as-child>
              <Button variant="secondary"> Size: {{ size }} </Button>
            </DrawerTrigger>
            <DrawerContent side="right" :size="size">
              <DrawerHeader>
                <DrawerTitle>{{ size.toUpperCase() }} Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer uses the "{{ size }}" size variant.
                </DrawerDescription>
              </DrawerHeader>
              <div class="p-6">
                <p class="text-sm text-muted-foreground">
                  The drawer panel width adjusts based on the size prop. This can be useful for
                  different content types — a small drawer for quick actions, a large one for
                  detailed forms or previews.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose as-child>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </DemoSection>

      <!-- Full-Screen Drawer -->
      <DemoSection
        title="Full-Screen Drawer"
        description="A drawer that takes up the entire viewport width."
      >
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="destructive">Open Full Drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="right" size="full">
            <DrawerHeader>
              <DrawerTitle>Full-Screen Panel</DrawerTitle>
              <DrawerDescription>
                This drawer takes up the entire width of the viewport for immersive content.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="i in 6" :key="i" class="rounded-lg border border-border p-4">
                  <h4 class="font-medium text-foreground">Section {{ i }}</h4>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Full-screen drawers are useful for complex workflows that need a lot of space.
                  </p>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button>Confirm</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DemoSection>

      <!-- Drawer with Form -->
      <DemoSection
        title="Drawer with Form"
        description="A common pattern: use a drawer to host a form for creating or editing items."
      >
        <Drawer>
          <DrawerTrigger as-child>
            <Button>New Task</Button>
          </DrawerTrigger>
          <DrawerContent side="right" size="md">
            <DrawerHeader>
              <DrawerTitle>Create Task</DrawerTitle>
              <DrawerDescription>
                Fill in the details below to create a new task.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <Label for="task-title">Title</Label>
                <Input id="task-title" placeholder="Enter task title" />
              </div>
              <div class="space-y-2">
                <Label for="task-desc">Description</Label>
                <textarea
                  id="task-desc"
                  rows="4"
                  placeholder="Describe the task..."
                  class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="task-priority">Priority</Label>
                  <select
                    id="task-priority"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option selected>High</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <Label for="task-assignee">Assignee</Label>
                  <Input id="task-assignee" placeholder="Name" />
                </div>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button>Create Task</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DemoSection>
    </div>
  </div>
</template>
