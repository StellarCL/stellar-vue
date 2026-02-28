<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@stellar-vue-ui/core'
import type { BadgeVariants } from '@stellar-vue-ui/core'
import type { RoleBadgeProps } from '@/types'

const props = defineProps<RoleBadgeProps>()

type BadgeVariant = BadgeVariants['variant']

const variantMap: Record<RoleBadgeProps['role'], BadgeVariant> = {
  admin: 'default',
  editor: 'secondary',
  viewer: 'outline',
}

const labelMap: Record<RoleBadgeProps['role'], string> = {
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
}

const variant = computed<BadgeVariant>(() => variantMap[props.role])
const label = computed<string>(() => labelMap[props.role])
</script>

<template>
  <Badge :variant="variant">{{ label }}</Badge>
</template>
