'use client'

import { Card, CardBody } from '@/components/ui'
import { ScrollReveal } from '@/components/common'
import { ArchitectureDiagram, SpecsTable } from '@/components/technology'
import { features } from '@/content/features'

export default function TechnologyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="bg-mesh-gradient absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal variant="slide-up">
              <span className="bg-holo-purple/10 border-holo-purple/30 text-holo-purple mb-6 inline-block rounded-full border px-4 py-1.5 text-sm font-medium">
                Technical Deep Dive
              </span>
              <h1 className="holo-text mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                How It Works Under the Hood
              </h1>
              <p className="text-lg text-gray-300 sm:text-xl">
                Real-time voice, emotional intelligence, and edge deployment — built for production
                scale.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-12">
            <h2 className="section-title holo-text text-center">Architecture Overview</h2>
            <p className="section-subtitle mx-auto mb-10 max-w-2xl text-center">
              Five layers working in harmony to deliver sub-200ms conversational AI
            </p>
          </ScrollReveal>

          <ScrollReveal variant="slide-up" delay={0.1}>
            <ArchitectureDiagram />
          </ScrollReveal>
        </div>
      </section>

      <section className="via-holo-purple/5 bg-gradient-to-b from-transparent to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-16 text-center">
            <h2 className="section-title holo-text">Technical Specifications</h2>
            <p className="section-subtitle mx-auto">
              Production-ready specs for enterprise deployment
            </p>
          </ScrollReveal>

          <ScrollReveal variant="slide-up" delay={0.1}>
            <SpecsTable />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-16 text-center">
            <h2 className="section-title holo-text">Core Capabilities</h2>
            <p className="section-subtitle mx-auto">
              The six pillars that differentiate Replicast AI
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.id} variant="slide-up" delay={index * 0.1}>
                <Card variant="glass-hover" className="h-full">
                  <CardBody className="p-8">
                    <div className="mb-4 text-4xl">{feature.icon}</div>
                    <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                    <p className="mb-6 text-gray-400">{feature.description}</p>
                    <ul className="space-y-2 text-sm text-gray-500">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="bg-holo-cyan h-1.5 w-1.5 rounded-full" />
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

      <section className="via-holo-cyan/5 bg-gradient-to-b from-transparent to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title holo-text mb-4">Ready to Build?</h2>
          <p className="section-subtitle mx-auto mb-10 max-w-2xl">
            Access our APIs, SDKs, and documentation to start integrating digital humans today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/docs`}
              className="from-holo-cyan to-holo-purple text-bg-deep rounded-xl bg-gradient-to-r px-8 py-4 font-medium transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
            >
              View Documentation
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api-docs`}
              className="border-holo-purple text-holo-purple hover:bg-holo-purple/10 rounded-xl border-2 px-8 py-4 transition-all"
            >
              API Reference
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
