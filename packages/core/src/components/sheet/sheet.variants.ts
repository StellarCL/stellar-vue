import { cva } from '../../utils/variants'

export const sheetContentVariants = cva(
  'fixed z-50 flex flex-col bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      // Top / bottom sheets use height for size
      { side: 'top', size: 'sm', class: 'h-[320px]' },
      { side: 'top', size: 'md', class: 'h-[400px]' },
      { side: 'top', size: 'lg', class: 'h-[540px]' },
      { side: 'top', size: 'xl', class: 'h-[720px]' },
      { side: 'top', size: 'full', class: 'h-screen' },
      { side: 'bottom', size: 'sm', class: 'h-[320px]' },
      { side: 'bottom', size: 'md', class: 'h-[400px]' },
      { side: 'bottom', size: 'lg', class: 'h-[540px]' },
      { side: 'bottom', size: 'xl', class: 'h-[720px]' },
      { side: 'bottom', size: 'full', class: 'h-screen' },
      // Left / right sheets use width for size
      { side: 'left', size: 'sm', class: 'w-[320px]' },
      { side: 'left', size: 'md', class: 'w-[400px]' },
      { side: 'left', size: 'lg', class: 'w-[540px]' },
      { side: 'left', size: 'xl', class: 'w-[720px]' },
      { side: 'left', size: 'full', class: 'w-screen' },
      { side: 'right', size: 'sm', class: 'w-[320px]' },
      { side: 'right', size: 'md', class: 'w-[400px]' },
      { side: 'right', size: 'lg', class: 'w-[540px]' },
      { side: 'right', size: 'xl', class: 'w-[720px]' },
      { side: 'right', size: 'full', class: 'w-screen' },
    ],
    defaultVariants: {
      side: 'bottom',
      size: 'md',
    },
  },
)
