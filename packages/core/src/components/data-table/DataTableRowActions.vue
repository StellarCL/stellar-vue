<script setup lang="ts">
import { computed } from 'vue'
import type { DataTableRowActionsProps } from './data-table.types'
import { cn } from '../../utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../dropdown-menu'

const props = defineProps<DataTableRowActionsProps>()

const classes = computed(() => cn('flex items-center justify-end', props.class))
</script>

<template>
  <div :class="classes">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <!-- Default trigger: a "more" button -->
        <slot name="trigger">
          <button
            class="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            aria-label="Open row actions"
          >
            <!-- Ellipsis / more icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
            <span class="sr-only">Open menu</span>
          </button>
        </slot>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <slot />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
