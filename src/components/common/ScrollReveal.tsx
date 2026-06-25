'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale'
  delay?: number
  stagger?: boolean
  staggerDelay?: number
  threshold?: number
  rootMargin?: string
}

const variants = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } },
  'slide-up': fadeInUp,
  'slide-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
}

export function ScrollReveal({
  children,
  variant = 'slide-up',
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  className,
  ...props
}: ScrollRevealProps) {
  const childArray = Array.isArray(children) ? children : [children]

  if (stagger) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        viewport={{ once: true, margin: rootMargin, amount: threshold }}
        {...props}
      >
        {childArray.map((child, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay + index * staggerDelay }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={variants[variant]}
      viewport={{ once: true, margin: rootMargin, amount: threshold }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
