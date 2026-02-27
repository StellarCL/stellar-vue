import { cva } from '../../utils/variants'

export const drawerContentVariants = cva(
  'fixed z-50 flex flex-col bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        left: 'inset-y-0 left-0 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'inset-y-0 right-0 h-full data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
      size: {
        sm: 'w-[320px]',
        md: 'w-[400px]',
        lg: 'w-[540px]',
        xl: 'w-[720px]',
        full: 'w-screen',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  },
)
