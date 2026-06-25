import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { industries } from '@/content/industries'
import { IndustryDetail } from '@/components/industries/IndustryDetail'
import { siteConfig } from '@/content/siteConfig'

interface IndustryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)

  if (!industry) return { title: 'Industry Not Found' }

  return {
    title: `${industry.title} | Replicast AI`,
    description: industry.shortDescription,
    openGraph: {
      title: `${industry.title} | Replicast AI`,
      description: industry.shortDescription,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)

  if (!industry) notFound()

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="bg-mesh-gradient absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="bg-holo-cyan/10 border-holo-cyan/30 text-holo-cyan mb-6 inline-block rounded-full border px-4 py-1.5 text-sm font-medium">
              Industry Solution
            </span>
            <h1 className="holo-text mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {industry.title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
              {industry.longDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IndustryDetail industry={industry} />
        </div>
      </section>

      <section className="via-holo-cyan/5 bg-gradient-to-b from-transparent to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title holo-text mb-4">
            Ready to Transform Your {industry.title} Experience?
          </h2>
          <p className="section-subtitle mx-auto mb-10 max-w-2xl">
            Get a custom prototype built for your specific use case.
          </p>
          <a
            href={`${siteConfig.basePath}/demo`}
            className="from-holo-cyan to-holo-purple text-bg-deep inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-8 py-4 font-medium transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
          >
            Request {industry.title} Demo
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
        </div>
      </section>
    </div>
  )
}
