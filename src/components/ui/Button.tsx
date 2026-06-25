'use client'

import { Button as HeroUIButton } from '@heroui/button'
import { cn } from '@/lib/utils'
import { forwardRef, isValidElement, cloneElement, ReactElement } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'solid' | 'holo' | 'holo-outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', loading, children, disabled, asChild, ...props },
    ref
  ) => {
    const baseClasses =
      'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-white'

    const variants: Record<string, string> = {
      primary: 'btn-primary',
      outline: 'btn-outline',
      holo: 'btn-primary',
      'holo-outline': 'btn-outline',
      ghost: 'px-4 py-2 text-slate-600 hover:text-brand-blue hover:bg-slate-100 rounded-xl',
      solid: 'px-6 py-3 bg-brand-purple text-white rounded-xl hover:bg-brand-purple/90',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    const classes = cn(baseClasses, variants[variant as string], sizes[size], className)

    const content = (
      <>
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    )

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<Record<string, unknown>>, {
        className: cn(classes, (children.props as { className?: string }).className),
        ref,
        disabled: disabled || loading,
        ...props,
      })
    }

    return (
      <HeroUIButton ref={ref} className={classes} disabled={disabled || loading}>
        {content}
      </HeroUIButton>
    )
  }
)

Button.displayName = 'Button'
