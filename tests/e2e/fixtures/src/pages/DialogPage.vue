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
} from '@stellar-vue-ui/core'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div style="padding: 2rem;">
    <Dialog v-model:open="open">
      <DialogTrigger as-child>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description text</DialogDescription>
        </DialogHeader>
        <div style="padding: 1rem 0;">
          <Input placeholder="Type something..." />
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
