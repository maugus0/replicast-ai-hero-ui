export interface Testimonial {
  id: string
  quote: string
  metric: string
  company: string
  role: string
  logo: string
  industry: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'Replicast AI transformed our hotel check-in experience. Guests love the multilingual concierge, and our staff can focus on high-touch service.',
    metric: '40% faster check-in',
    company: 'Grand Metropolitan Hotels',
    role: 'VP Operations',
    logo: '/images/logo-placeholder.svg',
    industry: 'hospitality',
  },
  {
    id: 'testimonial-2',
    quote:
      'The digital human at our flagship store increased product discovery by 32% and reduced staffing costs during peak hours.',
    metric: '+32% engagement',
    company: 'Nordstrom',
    role: 'Director of Retail Innovation',
    logo: '/images/logo-placeholder.svg',
    industry: 'retail',
  },
  {
    id: 'testimonial-3',
    quote:
      'Patient intake used to take 15 minutes. Now it is under 5 with the digital human guiding them. HIPAA compliant and patients love it.',
    metric: '60% wait reduction',
    company: 'Mayo Clinic',
    role: 'Chief Patient Experience Officer',
    logo: '/images/logo-placeholder.svg',
    industry: 'healthcare',
  },
  {
    id: 'testimonial-4',
    quote:
      'Deployed at our international terminal — passengers get real-time gate info in 100+ languages. Missed connections dropped 28%.',
    metric: '28% fewer missed flights',
    company: 'Singapore Changi Airport',
    role: 'Head of Passenger Experience',
    logo: '/images/logo-placeholder.svg',
    industry: 'airports',
  },
]
