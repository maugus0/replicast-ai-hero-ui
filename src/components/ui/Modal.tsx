'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  backdropClassName?: string
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, size = 'md', backdropClassName, children, ...props }, ref) => {
    const sizes: Record<string, string> = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-4xl',
    }

    return (
      <div
        ref={ref}
        className={cn('fixed inset-0 z-50 flex items-center justify-center', backdropClassName)}
        {...props}
      >
        <div
          className={cn(
            'rounded-2xl border border-white/10 bg-bg-card p-6',
            sizes[size as string],
            'w-full',
            className
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'
