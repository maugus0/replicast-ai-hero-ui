'use client'

import { Card, CardBody } from '@/components/ui'
import { ScrollReveal } from '@/components/common'
import { features } from '@/content/features'

export function ValueProps() {
  const valueProps = features.slice(0, 3)

  return (
    <section
      className="bg-gradient-to-b from-white via-slate-50/50 to-white py-20 sm:py-28"
      aria-labelledby="value-props-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" className="mb-16 text-center">
          <h2 id="value-props-title" className="section-title brand-text">
            Why Replicast AI?
          </h2>
          <p className="section-subtitle mx-auto">
            Three pillars that make our digital humans the most advanced in the market
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((feature, index) => (
            <ScrollReveal key={feature.id} variant="slide-up" delay={index * 0.15}>
              <Card variant="glass-hover" className="h-full">
                <CardBody className="p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mb-6 text-slate-500">{feature.description}</p>
                  <ul className="space-y-2 text-left text-sm text-slate-500">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
