'use client'

import { Button } from '@/components/ui'
import { ScrollReveal } from '@/components/common'
import { siteConfig } from '@/content/siteConfig'

export function DemoCTA() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28"
      aria-labelledby="demo-cta-title"
    >
      <div className="absolute inset-0 bg-mesh-light opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-purple/5" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" className="mb-8">
          <h2 id="demo-cta-title" className="section-title brand-text">
            Ready to Bring Your Brand to Life?
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="slide-up" delay={0.1} className="mb-10">
          <p className="section-subtitle mx-auto">
            With Replicast AI&apos;s Digital Humans, your brand can offer intelligent, emotionally
            engaging service that stands out and scales fast.
          </p>
        </ScrollReveal>

        <ScrollReveal
          variant="slide-up"
          delay={0.2}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <a href={`${siteConfig.basePath}/demo`}>Request a Demo</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`${siteConfig.basePath}/industries`}>Explore Industries</a>
          </Button>
        </ScrollReveal>

        <ScrollReveal
          variant="fade"
          delay={0.4}
          className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>Free 30-min consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-blue" />
            <span>Custom prototype included</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-purple" />
            <span>No commitment required</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
