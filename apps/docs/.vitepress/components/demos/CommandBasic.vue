<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@stellar-vue-ui/core'
</script>
<template>
  <Command class="rounded-lg border shadow-md w-full max-w-sm">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">Calendar</CommandItem>
        <CommandItem value="search">Search</CommandItem>
        <CommandItem value="calculator">Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem value="profile">Profile</CommandItem>
        <CommandItem value="settings">Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
