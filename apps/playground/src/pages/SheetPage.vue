<script setup lang="ts">
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Sheet"
      description="A panel that slides in from the edge of the screen, typically used for forms, navigation, or detail views."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- All Four Sides -->
      <DemoSection
        title="Sides"
        description="Sheets can slide in from any edge of the screen: top, bottom, left, or right."
      >
        <div class="flex flex-wrap gap-3">
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Open Top</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>
                  This sheet slides in from the top of the screen.
                </SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  Top sheets are useful for alerts, notifications, or quick actions.
                </p>
              </div>
              <SheetFooter>
                <SheetClose as-child>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Open Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>
                  This sheet slides in from the bottom of the screen.
                </SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  Bottom sheets are common on mobile for contextual actions.
                </p>
              </div>
              <SheetFooter>
                <SheetClose as-child>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Open Left</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription> This sheet slides in from the left side. </SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  Left sheets work well for navigation menus or sidebars.
                </p>
              </div>
              <SheetFooter>
                <SheetClose as-child>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Open Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Sheet</SheetTitle>
                <SheetDescription> This sheet slides in from the right side. </SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  Right sheets are great for detail panels and settings.
                </p>
              </div>
              <SheetFooter>
                <SheetClose as-child>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </DemoSection>

      <!-- Different Sizes -->
      <DemoSection
        title="Sizes"
        description="Control the width (or height) of the sheet with the size prop."
      >
        <div class="flex flex-wrap gap-3">
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Small</Button>
            </SheetTrigger>
            <SheetContent side="right" size="sm">
              <SheetHeader>
                <SheetTitle>Small Sheet</SheetTitle>
                <SheetDescription>A compact side panel.</SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  This sheet uses the "sm" size, suitable for brief content.
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Medium (default)</Button>
            </SheetTrigger>
            <SheetContent side="right" size="md">
              <SheetHeader>
                <SheetTitle>Medium Sheet</SheetTitle>
                <SheetDescription>The default sheet size.</SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  This is the default "md" size, suitable for most content.
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Large</Button>
            </SheetTrigger>
            <SheetContent side="right" size="lg">
              <SheetHeader>
                <SheetTitle>Large Sheet</SheetTitle>
                <SheetDescription>A wider side panel for complex content.</SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  The "lg" size gives more room for forms and detailed views.
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Extra Large</Button>
            </SheetTrigger>
            <SheetContent side="right" size="xl">
              <SheetHeader>
                <SheetTitle>Extra Large Sheet</SheetTitle>
                <SheetDescription>Takes up a significant portion of the screen.</SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  The "xl" size is useful for split-view layouts or large forms.
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline">Full</Button>
            </SheetTrigger>
            <SheetContent side="right" size="full">
              <SheetHeader>
                <SheetTitle>Full-Width Sheet</SheetTitle>
                <SheetDescription>Covers the entire viewport width.</SheetDescription>
              </SheetHeader>
              <div class="py-4">
                <p class="text-sm text-muted-foreground">
                  The "full" size creates a full-screen overlay panel.
                </p>
              </div>
              <SheetFooter>
                <SheetClose as-child>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </DemoSection>

      <!-- Sheet with Form -->
      <DemoSection
        title="Sheet with Form"
        description="A practical example with a form inside the sheet."
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button>Edit Profile</Button>
          </SheetTrigger>
          <SheetContent side="right" size="md">
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div class="grid gap-4 py-6">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="sheet-name" class="text-right">Name</Label>
                <Input id="sheet-name" model-value="Jane Doe" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="sheet-username" class="text-right">Username</Label>
                <Input id="sheet-username" model-value="@janedoe" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="sheet-email" class="text-right">Email</Label>
                <Input id="sheet-email" model-value="jane@example.com" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="sheet-bio" class="text-right">Bio</Label>
                <Input id="sheet-bio" model-value="Software Developer" class="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose as-child>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </DemoSection>

      <!-- Navigation Sidebar Sheet -->
      <DemoSection
        title="Navigation Sheet"
        description="A left-side sheet used as a mobile navigation menu."
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline">Open Navigation</Button>
          </SheetTrigger>
          <SheetContent side="left" size="sm">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Browse application sections.</SheetDescription>
            </SheetHeader>
            <nav class="py-4">
              <ul class="space-y-1">
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Reports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </DemoSection>
    </div>
  </div>
</template>
