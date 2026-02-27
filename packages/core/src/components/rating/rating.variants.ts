import { cva, type VariantProps } from '../../utils/variants'

export const ratingVariants = cva('inline-flex items-center gap-0.5', {
  variants: {
    size: {
      sm: '[&_svg]:h-4 [&_svg]:w-4',
      md: '[&_svg]:h-5 [&_svg]:w-5',
      lg: '[&_svg]:h-7 [&_svg]:w-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type RatingVariants = VariantProps<typeof ratingVariants>
