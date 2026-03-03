import { cva, type VariantProps } from '../../utils/variants'

export const cardVariants = cva('', {
  variants: {
    variant: {
      default:
        'rounded-lg border border-border bg-white text-card-foreground shadow-soft dark:bg-navy-700 dark:shadow-none',
      bordered: 'rounded-lg border-2 bg-card text-card-foreground',
      elevated: 'rounded-lg bg-card text-card-foreground shadow-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type CardVariants = VariantProps<typeof cardVariants>
