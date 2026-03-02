<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@stellar-vue-ui/core'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-vue-next'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const searchQuery = ref('')
const selectedItem = ref('')

function handleSelect(value: string) {
  selectedItem.value = value
}
</script>

<template>
  <div>
    <PageHeader
      title="Command"
      description="A command palette for searching, filtering, and selecting from a list of actions and options."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Command -->
      <DemoSection
        title="Basic Command"
        description="A searchable command palette with grouped items and keyboard shortcuts."
      >
        <div class="mx-auto max-w-md">
          <Command class="rounded-lg border border-border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Suggestions">
                <CommandItem value="calendar" @select="handleSelect('calendar')">
                  <Calendar class="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem value="search-emoji" @select="handleSelect('search-emoji')">
                  <Smile class="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem value="calculator" @select="handleSelect('calculator')">
                  <Calculator class="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Settings">
                <CommandItem value="profile" @select="handleSelect('profile')">
                  <User class="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem value="billing" @select="handleSelect('billing')">
                  <CreditCard class="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem value="settings" @select="handleSelect('settings')">
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <p v-if="selectedItem" class="mt-3 text-sm text-muted-foreground">
            Last selected: <span class="font-medium text-foreground">{{ selectedItem }}</span>
          </p>
        </div>
      </DemoSection>

      <!-- With Disabled Items -->
      <DemoSection
        title="With Disabled Items"
        description="Some items can be disabled to prevent selection."
      >
        <div class="mx-auto max-w-md">
          <Command class="rounded-lg border border-border shadow-md">
            <CommandInput placeholder="Search actions..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Actions">
                <CommandItem value="new-file">
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem value="new-window">
                  <span>New Window</span>
                  <CommandShortcut>⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem value="share" :disabled="true">
                  <span>Share (unavailable)</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Help">
                <CommandItem value="docs">
                  <span>Documentation</span>
                </CommandItem>
                <CommandItem value="support" :disabled="true">
                  <span>Contact Support (offline)</span>
                </CommandItem>
                <CommandItem value="feedback">
                  <span>Send Feedback</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DemoSection>

      <!-- Controlled Search -->
      <DemoSection
        title="Controlled Search"
        description="Bind the search input to a ref for external control and display."
      >
        <div class="mx-auto max-w-md">
          <div class="mb-3 text-sm text-muted-foreground">
            Current query:
            <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{{
              searchQuery || '(empty)'
            }}</code>
          </div>
          <Command class="rounded-lg border border-border shadow-md">
            <CommandInput v-model="searchQuery" placeholder="Filter items..." />
            <CommandList>
              <CommandEmpty>No matching items for "{{ searchQuery }}".</CommandEmpty>

              <CommandGroup heading="Fruits">
                <CommandItem value="apple">Apple</CommandItem>
                <CommandItem value="banana">Banana</CommandItem>
                <CommandItem value="cherry">Cherry</CommandItem>
                <CommandItem value="dragonfruit">Dragonfruit</CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Vegetables">
                <CommandItem value="asparagus">Asparagus</CommandItem>
                <CommandItem value="broccoli">Broccoli</CommandItem>
                <CommandItem value="carrot">Carrot</CommandItem>
                <CommandItem value="daikon">Daikon</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
