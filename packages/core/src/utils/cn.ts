import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges CSS classes using clsx and tailwind-merge
 *
 * Combines multiple class values, handles conditional classes,
 * and resolves Tailwind CSS conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string with Tailwind conflicts resolved
 *
 * @example
 * ```ts
 * cn('px-4 py-2', 'px-6') // 'px-6 py-2'
 * cn('text-red-500', someCondition && 'text-blue-500')
 * cn('bg-primary', props.class)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
