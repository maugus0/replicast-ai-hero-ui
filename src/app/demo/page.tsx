'use client'

import { Card } from '@/components/ui'
import { FormspreeForm } from '@/components/common'
import { ScrollReveal } from '@/components/common'
import { industries } from '@/content/industries'

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="bg-mesh-gradient absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal variant="slide-up">
              <h1 className="holo-text mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Request a Demo
              </h1>
              <p className="mb-10 text-lg text-gray-300 sm:text-xl">
                See Replicast AI in action. Get a personalized demonstration tailored to your
                industry and use case.
              </p>
            </ScrollReveal>

            <ScrollReveal
              variant="fade"
              delay={0.2}
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500"
            >
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" /> 30-min consultation
              </span>
              <span className="flex items-center gap-1">
                <span className="bg-holo-cyan h-2 w-2 rounded-full" /> Custom prototype
              </span>
              <span className="flex items-center gap-1">
                <span className="bg-holo-purple h-2 w-2 rounded-full" /> No commitment
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="via-holo-cyan/5 bg-gradient-to-b from-transparent to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-16 text-center">
            <h2 className="section-title holo-text">What to Expect</h2>
            <p className="section-subtitle mx-auto">
              Our demo process is designed to show you real value, not just slides
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: '🎯',
                title: 'Discovery Call',
                desc: '15-min call to understand your use case, industry, and requirements',
              },
              {
                icon: '🛠️',
                title: 'Custom Prototype',
                desc: 'We build a tailored avatar with your branding, voice, and knowledge base',
              },
              {
                icon: '🚀',
                title: 'Live Demo & Next Steps',
                desc: 'Interactive session with your prototype + deployment roadmap',
              },
            ].map((step, index) => (
              <ScrollReveal key={step.title} variant="slide-up" delay={index * 0.15}>
                <Card variant="glass-hover" className="h-full p-8 text-center">
                  <div className="mb-4 text-4xl">{step.icon}</div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28" id="demo-form">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScrollReveal variant="slide-up">
                <Card variant="glass-hover" className="p-8">
                  <FormspreeForm />
                </Card>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-1">
              <ScrollReveal variant="slide-up" delay={0.2}>
                <Card variant="glass-hover" className="sticky top-24 h-full p-8">
                  <h3 className="mb-6 text-xl font-bold">Demo Includes</h3>
                  <ul className="space-y-4">
                    {[
                      'Industry-specific avatar configuration',
                      'Your brand voice & personality',
                      'Sample knowledge base integration',
                      'Real-time voice interaction test',
                      'Deployment architecture review',
                      'Pricing & timeline estimate',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="text-holo-cyan mt-0.5 h-5 w-5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>

              <ScrollReveal variant="slide-up" delay={0.3} className="mt-6">
                <Card variant="glass" className="p-6">
                  <h4 className="mb-3 font-semibold">Popular Industries</h4>
                  <ul className="space-y-2">
                    {industries.slice(0, 4).map((ind) => (
                      <li
                        key={ind.slug}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                      >
                        <span className="text-2xl">{ind.icon}</span>
                        <span className="text-gray-300">{ind.title}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
