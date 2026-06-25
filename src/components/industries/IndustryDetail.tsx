'use client'

import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { ScrollReveal } from '@/components/common'
import { Industry } from '@/content/industries'
import { siteConfig } from '@/content/siteConfig'

interface IndustryDetailProps {
  industry: Industry
}

export function IndustryDetail({ industry }: IndustryDetailProps) {
  return (
    <div className="space-y-16">
      <ScrollReveal variant="slide-up">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-5xl">{industry.icon}</span>
          <div>
            <h1 className="holo-text text-3xl font-bold sm:text-4xl lg:text-5xl">
              {industry.title}
            </h1>
            <p className="mt-2 text-lg text-gray-400">{industry.longDescription}</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="slide-up" delay={0.1} stagger>
        <div className="grid gap-6 md:grid-cols-3">
          {industry.metrics.map((metric, index) => (
            <Card variant="glass" key={index} className="p-6 text-center">
              <div className="holo-text text-3xl font-bold">{metric.split(' ')[0]}</div>
              <div className="mt-1 text-sm text-gray-400">{metric.replace(/^[\d+%.]+\s*/, '')}</div>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal variant="slide-up" delay={0.2}>
        <h2 className="mb-6 text-2xl font-bold">Key Benefits</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {industry.benefits.map((benefit, index) => (
            <Card variant="glass-hover" key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="from-holo-cyan/20 to-holo-purple/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br">
                  <svg
                    className="text-holo-cyan h-5 w-5"
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
                </div>
                <p className="pt-1 text-gray-300">{benefit}</p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal
        variant="slide-up"
        delay={0.3}
        className="border-t border-white/10 pt-8 text-center"
      >
        <Button size="lg" asChild>
          <a href={`${siteConfig.basePath}/demo`}>Request {industry.title} Demo</a>
        </Button>
      </ScrollReveal>
    </div>
  )
}
