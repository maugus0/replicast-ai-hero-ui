'use client'

import { addToast } from '@heroui/toast'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info'
  timeout?: number
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    const variants: Record<string, string> = {
      success: 'border-success-500 bg-success-500/10',
      error: 'border-danger-500 bg-danger-500/10',
      warning: 'border-warning-500 bg-warning-500/10',
      info: 'border-holo-cyan bg-holo-cyan/10',
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-xl border px-4 py-3', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Toast.displayName = 'Toast'

export function useToast() {
  const success = (title: string, description?: string) => {
    addToast({ title, description, color: 'success', timeout: 5000 })
  }

  const error = (title: string, description?: string) => {
    addToast({ title, description, color: 'danger', timeout: 7000 })
  }

  const warning = (title: string, description?: string) => {
    addToast({ title, description, color: 'warning', timeout: 6000 })
  }

  const info = (title: string, description?: string) => {
    addToast({ title, description, color: 'primary', timeout: 5000 })
  }

  return { success, error, warning, info }
}
