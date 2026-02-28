<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Dialog"
      description="A window overlaid on either the primary window or another dialog window. Interrupts the user with important content and expects a response."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Dialog -->
      <DemoSection title="Basic Dialog">
        <Dialog>
          <DialogTrigger as-child>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose as-child>
                <Button variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="destructive">
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>

      <!-- Dialog with Form -->
      <DemoSection title="Dialog with Form">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="dialog-name" class="text-right">Name</Label>
                <Input id="dialog-name" model-value="John Doe" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="dialog-username" class="text-right">Username</Label>
                <Input id="dialog-username" model-value="@johndoe" class="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose as-child>
                <Button variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>

      <!-- Controlled Dialog -->
      <DemoSection title="Controlled (v-model:open)">
        <div>
          <Dialog :open="ref(false).value">
            <DialogTrigger as-child>
              <Button variant="secondary">
                Controlled Dialog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Controlled Dialog</DialogTitle>
                <DialogDescription>
                  This dialog is controlled via open/close state.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose as-child>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
