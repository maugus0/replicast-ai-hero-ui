'use client'

import Link from 'next/link'
import { Card, CardBody } from '@/components/ui'
import { ScrollReveal } from '@/components/common'
import { industries } from '@/content/industries'
import { siteConfig } from '@/content/siteConfig'

export function UseCases() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="use-cases-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" className="mb-16 text-center">
          <h2 id="use-cases-title" className="section-title brand-text">
            Industries We Serve
          </h2>
          <p className="section-subtitle mx-auto">
            From retail to healthcare, our digital humans adapt to any industry
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <ScrollReveal key={industry.slug} variant="slide-up" delay={index * 0.1}>
              <Card variant="glass-hover" className="group h-full">
                <CardBody className="p-8">
                  <div className="mb-4 text-4xl">{industry.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-blue">
                    {industry.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-slate-500">{industry.shortDescription}</p>
                  <ul className="mb-6 space-y-2">
                    {industry.metrics.slice(0, 2).map((metric, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue/50" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${siteConfig.basePath}/industries/${industry.slug}`}
                    className="inline-flex items-center gap-2 font-medium text-brand-blue transition-all hover:gap-3"
                  >
                    {industry.cta}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </CardBody>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ScrollReveal variant="fade" delay={0.5}>
            <a
              href={`${siteConfig.basePath}/industries`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-purple px-6 py-3 text-brand-purple transition-all hover:bg-brand-purple/5"
            >
              View All Industries
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
