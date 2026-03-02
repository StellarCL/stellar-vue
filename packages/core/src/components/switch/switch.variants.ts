import { cva, type VariantProps } from '../../utils/variants'

export const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-300 dark:data-[state=unchecked]:bg-navy-900',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-5 w-10',
        lg: 'h-7 w-[3.25rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type SwitchVariants = VariantProps<typeof switchVariants>
