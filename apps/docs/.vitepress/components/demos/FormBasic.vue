<script setup lang="ts">
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@stellar-vue-ui/core'
</script>
<template>
  <Form class="w-full max-w-sm space-y-6">
    <FormField v-slot="{ field }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="stellaruser" v-bind="field" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
</template>
