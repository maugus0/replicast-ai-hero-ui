'use client'

import { Card, CardBody } from '@/components/ui'
import { ScrollReveal } from '@/components/common'
import { companyMission, companyStats, companyTeam, companyValues } from '@/content/company'
import { siteConfig } from '@/content/siteConfig'
import { testimonials } from '@/content/testimonials'

export function CompanyContent() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="bg-mesh-gradient absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal variant="slide-up">
              <span className="bg-holo-purple/10 border-holo-purple/30 text-holo-purple mb-6 inline-block rounded-full border px-4 py-1.5 text-sm font-medium">
                About Replicast AI
              </span>
              <h1 className="holo-text mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {companyMission.headline}
              </h1>
              <p className="text-lg text-gray-300 sm:text-xl">{companyMission.story}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {companyStats.map((stat, index) => (
              <ScrollReveal key={stat.label} variant="slide-up" delay={index * 0.1}>
                <div className="text-center">
                  <div className="holo-text mb-2 text-3xl font-bold sm:text-4xl">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-16 text-center">
            <h2 className="section-title holo-text">Our Vision</h2>
            <p className="section-subtitle mx-auto max-w-3xl">{companyMission.vision}</p>
          </ScrollReveal>

          <ScrollReveal variant="slide-up" delay={0.1} className="mb-16 text-center">
            <h2 className="section-title holo-text">Our Values</h2>
            <p className="section-subtitle mx-auto">
              The principles that guide everything we build
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {companyValues.map((value, index) => (
              <ScrollReveal key={value.title} variant="slide-up" delay={index * 0.1}>
                <Card variant="glass-hover" className="h-full">
                  <CardBody className="p-8">
                    <div className="mb-4 text-4xl">{value.icon}</div>
                    <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </CardBody>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="via-holo-purple/5 bg-gradient-to-b from-transparent to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-16 text-center">
            <h2 className="section-title holo-text">Our Team</h2>
            <p className="section-subtitle mx-auto">
              Experts across AI, engineering, and industry solutions
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {companyTeam.map((member, index) => (
              <ScrollReveal key={member.name} variant="slide-up" delay={index * 0.1}>
                <Card variant="glass-hover" className="h-full text-center">
                  <CardBody className="p-8">
                    <div className="from-holo-cyan/30 to-holo-purple/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl">
                      ◈
                    </div>
                    <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                    <p className="text-holo-cyan mb-4 text-sm">{member.role}</p>
                    <p className="text-sm text-gray-400">{member.bio}</p>
                  </CardBody>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" className="mb-16 text-center">
            <h2 className="section-title holo-text">What Our Customers Say</h2>
            <p className="section-subtitle mx-auto">
              Trusted by leaders across industries worldwide
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} variant="slide-up" delay={index * 0.1}>
                <Card variant="glass-hover" className="h-full">
                  <CardBody className="p-8">
                    <p className="mb-6 italic text-gray-300">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{testimonial.company}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                      <span className="text-holo-cyan text-sm font-medium">
                        {testimonial.metric}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="via-holo-cyan/5 bg-gradient-to-b from-transparent to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up">
            <h2 className="section-title holo-text mb-4">Join Us on the Journey</h2>
            <p className="section-subtitle mx-auto mb-10 max-w-2xl">
              See how Replicast AI can transform your customer experience with holographic digital
              humans.
            </p>
            <a
              href={`${siteConfig.basePath}/demo`}
              className="from-holo-cyan to-holo-purple text-bg-deep inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-8 py-4 font-medium transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
            >
              Request a Demo
              <svg
                className="h-5 w-5"
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
      </section>
    </div>
  )
}
