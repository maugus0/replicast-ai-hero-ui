'use client'

import { motion } from 'framer-motion'
import { Chip } from '@heroui/react'

const features = [
  {
    badge: 'Visual',
    badgeColor: 'primary' as const,
    title: 'Visually Human, Digitally Smart',
    description:
      'Lifelike avatars that look, move, and speak like real people to engage and impress instantly.',
  },
  {
    badge: 'Interactive',
    badgeColor: 'secondary' as const,
    title: 'Real-Time, Natural Interaction',
    description:
      'AI-powered avatars talk, gesture, and respond in real-time—no scripts, just smart service.',
  },
  {
    badge: 'Scalable',
    badgeColor: 'success' as const,
    title: 'Scalable Humanlike Service',
    description: 'Deliver 24/7, humanlike service at kiosks and events—no on-site staff needed.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-28 bg-slate-50/50 py-12 sm:scroll-mt-28 sm:py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#6366f1]/30 hover:shadow-md sm:p-6">
                <Chip
                  color={feature.badgeColor}
                  variant="flat"
                  size="sm"
                  classNames={{
                    base: 'mb-3 sm:mb-4',
                    content: 'text-xs font-medium',
                  }}
                >
                  {feature.badge}
                </Chip>
                <h3 className="mb-2 text-base font-semibold text-slate-900 transition-colors group-hover:text-[#6366f1] sm:text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
