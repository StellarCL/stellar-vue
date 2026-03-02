import { cva, type VariantProps } from '../../utils/variants'

export const separatorVariants = cva('shrink-0 bg-slate-150 dark:bg-navy-600', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type SeparatorVariants = VariantProps<typeof separatorVariants>
