<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'

const page = ref(1)
</script>
<template>
  <Pagination v-model:page="page" :total="100" :page-size="10">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink :page="1" :is-active="page === 1" @click="page = 1" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink :page="2" :is-active="page === 2" @click="page = 2" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink :page="3" :is-active="page === 3" @click="page = 3" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
