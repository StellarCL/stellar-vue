<script setup lang="ts">
import { Toaster, useToast } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const { toast } = useToast()

const position = ref<
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
>('top-right')

function showDefault() {
  toast({
    title: 'Default Toast',
    description: 'This is a default notification message.',
  })
}

function showSuccess() {
  toast({
    title: 'Success',
    description: 'Your changes have been saved successfully.',
    variant: 'success',
  })
}

function showDestructive() {
  toast({
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    variant: 'destructive',
  })
}

function showWarning() {
  toast({
    title: 'Warning',
    description: 'Your session will expire in 5 minutes.',
    variant: 'warning',
  })
}

function showInfo() {
  toast({
    title: 'Info',
    description: 'A new version is available. Refresh to update.',
    variant: 'info',
  })
}

function showWithAction() {
  toast({
    title: 'File Deleted',
    description: 'The file has been moved to trash.',
    variant: 'default',
    action: {
      label: 'Undo',
      onClick: () => {
        toast({
          title: 'Restored',
          description: 'The file has been restored.',
          variant: 'success',
        })
      },
    },
  })
}

function showLongDuration() {
  toast({
    title: 'Persistent Toast',
    description: 'This toast stays visible for 10 seconds.',
    duration: 10000,
  })
}
</script>

<template>
  <div>
    <PageHeader
      title="Toast"
      description="A notification popup that temporarily displays information, using the useToast composable."
    />

    <Toaster :position="position" />

    <div class="px-8 py-8 space-y-10">
      <!-- Toast Variants -->
      <DemoSection
        title="Toast Variants"
        description="Trigger different toast variants using the useToast composable."
      >
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <button
              class="px-4 py-2 rounded text-sm border transition-colors bg-background border-input hover:bg-accent"
              @click="showDefault"
            >
              Default
            </button>
            <button
              class="px-4 py-2 rounded text-sm border transition-colors bg-green-600 text-white border-green-600 hover:bg-green-700"
              @click="showSuccess"
            >
              Success
            </button>
            <button
              class="px-4 py-2 rounded text-sm border transition-colors bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90"
              @click="showDestructive"
            >
              Destructive
            </button>
            <button
              class="px-4 py-2 rounded text-sm border transition-colors bg-amber-500 text-white border-amber-500 hover:bg-amber-600"
              @click="showWarning"
            >
              Warning
            </button>
            <button
              class="px-4 py-2 rounded text-sm border transition-colors bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
              @click="showInfo"
            >
              Info
            </button>
          </div>
          <div class="rounded-md bg-muted p-4">
            <p class="text-xs font-mono text-muted-foreground">
              const { toast } = useToast()<br />
              toast({ title: '...', description: '...', variant: 'success' })
            </p>
          </div>
        </div>
      </DemoSection>

      <!-- With Action -->
      <DemoSection
        title="With Action"
        description="Toasts can include an action button for undo or other operations."
      >
        <div class="space-y-4">
          <button
            class="px-4 py-2 rounded text-sm border transition-colors bg-primary text-primary-foreground border-primary"
            @click="showWithAction"
          >
            Show Toast with Action
          </button>
          <div class="rounded-md bg-muted p-4">
            <p class="text-xs font-mono text-muted-foreground">
              toast({<br />
              &nbsp;&nbsp;title: 'File Deleted',<br />
              &nbsp;&nbsp;action: { label: 'Undo', onClick: () =&gt; { ... } }<br />
              })
            </p>
          </div>
        </div>
      </DemoSection>

      <!-- Custom Duration -->
      <DemoSection title="Custom Duration" description="Adjust how long a toast remains visible.">
        <button
          class="px-4 py-2 rounded text-sm border transition-colors bg-background border-input hover:bg-accent"
          @click="showLongDuration"
        >
          10-Second Toast
        </button>
      </DemoSection>

      <!-- Position -->
      <DemoSection title="Toaster Position" description="Change where toasts appear on the screen.">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="pos in [
                'top-right',
                'top-left',
                'top-center',
                'bottom-right',
                'bottom-left',
                'bottom-center',
              ] as const"
              :key="pos"
              class="px-2 py-1.5 rounded text-xs border transition-colors"
              :class="
                position === pos
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-input hover:bg-accent'
              "
              @click="position = pos"
            >
              {{ pos }}
            </button>
          </div>
          <button
            class="px-4 py-2 rounded text-sm border transition-colors bg-primary text-primary-foreground border-primary"
            @click="showDefault"
          >
            Test Position
          </button>
          <p class="text-sm text-muted-foreground">
            Current position: <strong>{{ position }}</strong>
          </p>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
