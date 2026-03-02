import { cva, type VariantProps } from '../../utils/variants'

export const progressVariants = cva('h-full rounded-full transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      destructive: 'bg-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type ProgressVariants = VariantProps<typeof progressVariants>
