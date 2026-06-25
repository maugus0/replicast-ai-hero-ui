'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glass-hover' | 'solid' | 'gradient'
  hover?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass-hover', hover = true, children, ...props }, ref) => {
    const variants: Record<string, string> = {
      glass: 'glass-card',
      'glass-hover': 'glass-card-hover',
      solid: 'bg-white border border-slate-200 rounded-2xl shadow-card',
      gradient:
        'bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl shadow-soft',
    }

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant as string],
          hover && variant === 'glass-hover' && 'glass-card-hover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 pb-4 pt-6', className)} {...props}>
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

export const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
)

CardBody.displayName = 'CardBody'

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 pb-6 pt-4', className)} {...props}>
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'
