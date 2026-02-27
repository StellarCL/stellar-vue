import { cva, type VariantProps } from '../../utils/variants'

export const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'rounded-lg border bg-card text-card-foreground shadow-sm',
      bordered: 'rounded-lg border-2 bg-card text-card-foreground',
      elevated: 'rounded-lg bg-card text-card-foreground shadow-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type CardVariants = VariantProps<typeof cardVariants>
