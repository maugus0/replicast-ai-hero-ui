export interface IndustryMetric {
  label: string
  value: string
  description?: string
}

export interface Industry {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  heroImage?: string
  metrics: IndustryMetric[]
  useCases: string[]
  benefits: string[]
}
