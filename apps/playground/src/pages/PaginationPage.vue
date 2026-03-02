<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@stellar-vue-ui/core'
import { computed, ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const page1 = ref(1)
const page2 = ref(1)
const pageSize2 = ref(20)
const page3 = ref(5)
</script>

<template>
  <div>
    <PageHeader
      title="Pagination"
      description="Navigation component for moving between pages of content."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Pagination -->
      <DemoSection
        title="Basic Pagination"
        description="100 items with 10 per page. Includes first/last, previous/next, and page links."
      >
        <div class="space-y-4">
          <Pagination v-model:page="page1" :total="100" :page-size="10" :sibling-count="1">
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst @click="page1 = 1" :disabled="page1 === 1" />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  @click="page1 = Math.max(1, page1 - 1)"
                  :disabled="page1 === 1"
                />
              </PaginationItem>

              <template v-for="p in 10" :key="p">
                <PaginationItem
                  v-if="p === page1 || Math.abs(p - page1) <= 1 || p === 1 || p === 10"
                >
                  <PaginationLink :page="p" :is-active="p === page1" @click="page1 = p" />
                </PaginationItem>
                <PaginationItem v-else-if="p === 2 && page1 > 3">
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem v-else-if="p === 9 && page1 < 8">
                  <PaginationEllipsis />
                </PaginationItem>
              </template>

              <PaginationItem>
                <PaginationNext @click="page1 = Math.min(10, page1 + 1)" :disabled="page1 === 10" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast @click="page1 = 10" :disabled="page1 === 10" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p class="text-sm text-muted-foreground text-center">
            Page {{ page1 }} of 10 (showing items {{ (page1 - 1) * 10 + 1 }}&#8211;{{
              Math.min(page1 * 10, 100)
            }}
            of 100)
          </p>
        </div>
      </DemoSection>

      <!-- Custom Page Size -->
      <DemoSection title="Custom Page Size" description="Change the number of items per page.">
        <div class="space-y-4">
          <div class="flex items-center justify-center gap-4">
            <label class="text-sm text-muted-foreground">Items per page:</label>
            <select
              v-model.number="pageSize2"
              class="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
              @change="page2 = 1"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
          <Pagination v-model:page="page2" :total="200" :page-size="pageSize2" :sibling-count="1">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  @click="page2 = Math.max(1, page2 - 1)"
                  :disabled="page2 === 1"
                />
              </PaginationItem>

              <template v-for="p in Math.ceil(200 / pageSize2)" :key="p">
                <PaginationItem
                  v-if="
                    p === page2 ||
                    Math.abs(p - page2) <= 1 ||
                    p === 1 ||
                    p === Math.ceil(200 / pageSize2)
                  "
                >
                  <PaginationLink :page="p" :is-active="p === page2" @click="page2 = p" />
                </PaginationItem>
                <PaginationItem v-else-if="p === 2 && page2 > 3">
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem
                  v-else-if="
                    p === Math.ceil(200 / pageSize2) - 1 && page2 < Math.ceil(200 / pageSize2) - 2
                  "
                >
                  <PaginationEllipsis />
                </PaginationItem>
              </template>

              <PaginationItem>
                <PaginationNext
                  @click="page2 = Math.min(Math.ceil(200 / pageSize2), page2 + 1)"
                  :disabled="page2 === Math.ceil(200 / pageSize2)"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p class="text-sm text-muted-foreground text-center">
            Page {{ page2 }} of {{ Math.ceil(200 / pageSize2) }} ({{ 200 }} total items,
            {{ pageSize2 }} per page)
          </p>
        </div>
      </DemoSection>

      <!-- Simple Previous / Next -->
      <DemoSection
        title="Simple Previous / Next"
        description="Minimal pagination with just previous and next controls."
      >
        <div class="space-y-4">
          <Pagination v-model:page="page3" :total="50" :page-size="5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  @click="page3 = Math.max(1, page3 - 1)"
                  :disabled="page3 === 1"
                />
              </PaginationItem>
              <PaginationItem>
                <span class="flex h-10 items-center px-4 text-sm text-foreground font-medium">
                  Page {{ page3 }} of 10
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext @click="page3 = Math.min(10, page3 + 1)" :disabled="page3 === 10" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
