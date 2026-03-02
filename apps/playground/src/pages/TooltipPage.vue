<script setup lang="ts">
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div>
    <PageHeader
      title="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic tooltip -->
      <DemoSection title="Basic Tooltip" description="Hover over the button to see the tooltip.">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DemoSection>

      <!-- All four sides -->
      <DemoSection
        title="Placement"
        description="Tooltips can appear on any side of the trigger element."
      >
        <TooltipProvider>
          <div class="flex flex-wrap items-center justify-center gap-4 min-h-24">
            <Tooltip v-for="side in sides" :key="side">
              <TooltipTrigger as-child>
                <Button variant="outline">{{ side }}</Button>
              </TooltipTrigger>
              <TooltipContent :side="side">
                <p>Tooltip on {{ side }}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </DemoSection>

      <!-- With offset -->
      <DemoSection
        title="Side Offset"
        description="The distance between the tooltip and the trigger can be customized."
      >
        <TooltipProvider>
          <div class="flex flex-wrap items-center gap-4">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Default (4px)</Button>
              </TooltipTrigger>
              <TooltipContent :side-offset="4">
                <p>4px offset (default)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">8px offset</Button>
              </TooltipTrigger>
              <TooltipContent :side-offset="8">
                <p>8px offset</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">16px offset</Button>
              </TooltipTrigger>
              <TooltipContent :side-offset="16">
                <p>16px offset</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </DemoSection>

      <!-- Custom delay -->
      <DemoSection title="Custom Delay" description="Adjust the delay before the tooltip appears.">
        <div class="flex flex-wrap items-center gap-4">
          <TooltipProvider :delay-duration="0">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Instant (0ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears instantly</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider :delay-duration="200">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Default (200ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>200ms delay (default)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider :delay-duration="700">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Slow (700ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>700ms delay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DemoSection>

      <!-- With different trigger types -->
      <DemoSection
        title="Different Triggers"
        description="Tooltips work with various trigger elements."
      >
        <TooltipProvider>
          <div class="flex flex-wrap items-center gap-4">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button>Primary Button</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to perform the primary action</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="destructive">Delete</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Permanently delete this item</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon">?</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get help with this feature</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline" size="icon">+</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Add new item</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </DemoSection>

      <!-- Rich content tooltip -->
      <DemoSection title="Rich Content" description="Tooltips can contain more than plain text.">
        <TooltipProvider>
          <div class="flex flex-wrap items-center gap-4">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Keyboard Shortcut</Button>
              </TooltipTrigger>
              <TooltipContent>
                <div class="flex items-center gap-2">
                  <span>Save file</span>
                  <kbd
                    class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
                  >
                    <span class="text-xs">Cmd</span>+S
                  </kbd>
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Multi-line</Button>
              </TooltipTrigger>
              <TooltipContent class="max-w-xs">
                <p>
                  This is a longer tooltip that wraps across multiple lines to show more detailed
                  information about the element.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </DemoSection>

      <!-- Toolbar example -->
      <DemoSection
        title="Toolbar Example"
        description="A practical toolbar where each icon button has a tooltip."
      >
        <TooltipProvider :delay-duration="100">
          <div class="inline-flex items-center gap-1 rounded-md border border-border p-1">
            <Tooltip
              v-for="action in [
                { icon: 'B', label: 'Bold (Ctrl+B)' },
                { icon: 'I', label: 'Italic (Ctrl+I)' },
                { icon: 'U', label: 'Underline (Ctrl+U)' },
                { icon: 'S', label: 'Strikethrough' },
                { icon: 'A', label: 'Text color' },
              ]"
              :key="action.label"
            >
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon" class="h-8 w-8">
                  <span
                    :class="{
                      'font-bold': action.icon === 'B',
                      italic: action.icon === 'I',
                      underline: action.icon === 'U',
                      'line-through': action.icon === 'S',
                    }"
                  >
                    {{ action.icon }}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ action.label }}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </DemoSection>
    </div>
  </div>
</template>
