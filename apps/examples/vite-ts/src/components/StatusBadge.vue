<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@stellar-vue-ui/core'
import type { BadgeVariants } from '@stellar-vue-ui/core'
import type { StatusBadgeProps } from '@/types'

// Typed props via defineProps with an imported interface
const props = defineProps<StatusBadgeProps>()

type BadgeVariant = BadgeVariants['variant']

// Map status → Badge variant using a typed Record
const variantMap: Record<StatusBadgeProps['status'], BadgeVariant> = {
  active: 'default',
  inactive: 'secondary',
  pending: 'outline',
}

// Map status → display label
const labelMap: Record<StatusBadgeProps['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
}

const variant = computed<BadgeVariant>(() => variantMap[props.status])
const label = computed<string>(() => labelMap[props.status])
</script>

<template>
  <Badge :variant="variant">{{ label }}</Badge>
</template>
