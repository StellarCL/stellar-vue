<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stellar-vue-ui/core'
</script>
<template>
  <Tabs default-value="account" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p class="text-sm text-muted-foreground">Make changes to your account here.</p>
    </TabsContent>
    <TabsContent value="password">
      <p class="text-sm text-muted-foreground">Change your password here.</p>
    </TabsContent>
  </Tabs>
</template>
