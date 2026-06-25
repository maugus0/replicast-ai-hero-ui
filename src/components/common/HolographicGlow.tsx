'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { glowPulse } from '@/lib/animations'

interface HolographicGlowProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  animated?: boolean
}

export function HolographicGlow({
  children,
  className,
  intensity = 'medium',
  animated = true,
}: HolographicGlowProps) {
  const intensities = {
    low: '0 0 15px rgba(0, 229, 255, 0.2), 0 0 30px rgba(139, 92, 246, 0.1)',
    medium: '0 0 25px rgba(0, 229, 255, 0.3), 0 0 50px rgba(139, 92, 246, 0.2)',
    high: '0 0 40px rgba(0, 229, 255, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)',
  }

  return (
    <motion.div
      className={cn('relative inline-block', className)}
      animate={animated ? 'animate' : 'initial'}
      variants={glowPulse}
      style={{ boxShadow: intensities[intensity] }}
    >
      {children}
    </motion.div>
  )
}
