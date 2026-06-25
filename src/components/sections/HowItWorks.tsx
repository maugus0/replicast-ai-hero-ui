'use client'

import { ScrollReveal } from '@/components/common'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: '3D Ad Plays In Screen',
    description: 'Eye-catching 4K holographic ads run continuously to attract passing crowds.',
    icon: '📺',
  },
  {
    number: '02',
    title: 'User Approaches',
    description: 'Motion and presence detection activate the system as someone steps closer.',
    icon: '👤',
  },
  {
    number: '03',
    title: 'Avatar Activates',
    description: 'A lifelike digital human appears, greeting the user with voice and gestures.',
    icon: '◈',
  },
  {
    number: '04',
    title: 'Interaction Begins',
    description:
      'Users ask questions and receive visual answers, demos, or QR codes to buy or save.',
    icon: '💬',
  },
  {
    number: '05',
    title: 'Avatar Exits, Ad Resumes',
    description: 'Once the interaction ends, the avatar gracefully exits and ads resume playing.',
    icon: '🔄',
  },
]

export function HowItWorks() {
  return (
    <section
      className="bg-gradient-to-b from-white via-slate-50/50 to-white py-20 sm:py-28"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" className="mb-16 text-center">
          <h2 id="how-it-works-title" className="section-title brand-text">
            How It Works
          </h2>
          <p className="section-subtitle mx-auto">
            Seamless holographic interaction in five simple steps
          </p>
        </ScrollReveal>

        <div className="relative">
          <div
            className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-blue/30 via-brand-purple/30 to-brand-cyan/30 lg:block"
            aria-hidden="true"
          />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                variant="slide-up"
                delay={index * 0.15}
                className={cn(
                  'relative flex items-start gap-8',
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl lg:h-20 lg:w-20 lg:text-3xl',
                    index % 2 === 0 ? 'mr-4' : 'ml-4'
                  )}
                >
                  <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 shadow-soft">
                    {step.icon}
                  </div>
                  <div
                    className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple opacity-20 blur-lg"
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={cn(
                    'flex-1 pt-2',
                    index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8'
                  )}
                >
                  <div className="mb-2 font-mono text-lg font-bold text-brand-blue">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-500">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
