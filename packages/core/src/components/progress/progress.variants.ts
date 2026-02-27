import { cva, type VariantProps } from '../../utils/variants'

export const progressVariants = cva('h-full rounded-full transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type ProgressVariants = VariantProps<typeof progressVariants>
