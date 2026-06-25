'use client'

import Link from 'next/link'
import { Card, CardBody } from '@/components/ui'
import { Industry } from '@/content/industries'
import { siteConfig } from '@/content/siteConfig'

interface IndustryCardProps {
  industry: Industry
}

export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <Card variant="glass-hover" className="group h-full">
      <CardBody className="p-8">
        <div className="mb-4 text-4xl">{industry.icon}</div>
        <h3 className="group-hover:text-holo-cyan mb-2 text-xl font-bold transition-colors">
          {industry.title}
        </h3>
        <p className="mb-6 line-clamp-2 text-gray-400">{industry.shortDescription}</p>
        <ul className="mb-6 space-y-2">
          {industry.metrics.slice(0, 2).map((metric, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-holo-cyan/50 h-1.5 w-1.5 rounded-full" />
              {metric}
            </li>
          ))}
        </ul>
        <Link
          href={`${siteConfig.basePath}/industries/${industry.slug}`}
          className="text-holo-cyan inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
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
  )
}
