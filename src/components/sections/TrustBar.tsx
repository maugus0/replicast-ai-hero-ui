'use client'

import { ScrollReveal } from '@/components/common'

export function TrustBar() {
  const trustItems = [
    { label: '3,000+', description: 'Active Deployments' },
    { label: '50+', description: 'Languages Supported' },
    { label: '<200ms', description: 'Voice Latency' },
    { label: '99.9%', description: 'Uptime SLA' },
    { label: '24/7', description: 'Autonomous Operation' },
  ]

  return (
    <section className="border-y border-slate-100 bg-white py-16" aria-label="Trust indicators">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item, index) => (
            <ScrollReveal
              key={item.label}
              variant="fade"
              delay={index * 0.1}
              stagger
              className="text-center"
            >
              <div className="brand-text mb-2 text-3xl font-bold sm:text-4xl">{item.label}</div>
              <div className="text-sm text-slate-500">{item.description}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
