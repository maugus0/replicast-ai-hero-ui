export interface Industry {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  icon: string
  metrics: string[]
  benefits: string[]
  cta: string
  image?: string
}

export const industries: Industry[] = [
  {
    slug: 'retail',
    title: 'Retail',
    shortDescription:
      'Greet and assist shoppers, drive product discovery, and improve store navigation.',
    longDescription:
      'Deploy holographic digital humans at store entrances, product aisles, and checkout areas. They welcome customers, answer product questions, provide personalized recommendations based on preferences, and guide shoppers to items. Reduce staff workload while increasing engagement and average order value.',
    icon: '🛍️',
    metrics: [
      '+32% customer engagement',
      '24/7 assistance without staffing',
      'Multilingual support for global shoppers',
    ],
    benefits: [
      'Personalized product recommendations using AI',
      'Real-time inventory checks and ordering',
      'Loyalty program enrollment and management',
      'Wayfinding and store navigation assistance',
      'Collect customer feedback and analytics',
    ],
    cta: 'See Retail Demo',
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    shortDescription:
      'Offer intelligent check-ins, concierge services, and multilingual guest assistance.',
    longDescription:
      'Transform hotel lobbies, resort concierge desks, and restaurant host stations with digital humans that speak 50+ languages. Handle check-in/check-out, provide local recommendations, manage reservations, and answer amenity questions — all without queue times.',
    icon: '🏨',
    metrics: ['40% faster check-in times', '50+ languages supported', '95% guest satisfaction'],
    benefits: [
      'Automated check-in/check-out workflows',
      'Local attraction and dining recommendations',
      'Room service ordering and amenity requests',
      'Multilingual support for international guests',
      'Integration with PMS and CRM systems',
    ],
    cta: 'See Hospitality Demo',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    shortDescription: 'Guide patients through intake, appointment booking, and health FAQs.',
    longDescription:
      'Deploy in hospital lobbies, clinic waiting rooms, and pharmacy counters. Digital humans assist with patient check-in, insurance verification, appointment scheduling, wayfinding, and common health questions — reducing administrative burden on clinical staff.',
    icon: '🏥',
    metrics: [
      '60% reduction in front-desk wait',
      'HIPAA-compliant interactions',
      '24/7 patient guidance',
    ],
    benefits: [
      'Automated patient intake and registration',
      'Appointment scheduling and reminders',
      'Insurance eligibility verification',
      'Health education and medication guidance',
      'Wayfinding to departments and labs',
    ],
    cta: 'See Healthcare Demo',
  },
  {
    slug: 'public-services',
    title: 'Public Services',
    shortDescription: 'Make government support more accessible, inclusive, and interactive.',
    longDescription:
      'Serve citizens at DMV offices, city halls, libraries, and transit hubs. Digital humans provide form assistance, service information, appointment booking, and multilingual support — improving access for elderly, disabled, and non-native speakers.',
    icon: '🏛️',
    metrics: ['3x faster form completion', 'WCAG 2.1 AA accessible', '50+ languages'],
    benefits: [
      'Step-by-step form guidance and validation',
      'Service eligibility checking',
      'Appointment scheduling and queue management',
      'Accessibility features (voice, text, sign language)',
      'Integration with government databases',
    ],
    cta: 'See Public Services Demo',
  },
  {
    slug: 'financial',
    title: 'Financial Institutions',
    shortDescription:
      'Enhance branches with virtual advisors for transactions, product info, and shorter queues.',
    longDescription:
      'Bank and credit union branches deploy digital humans for routine transactions, account inquiries, product explanations, and loan pre-qualification. Free up human advisors for complex financial planning while maintaining personal touch.',
    icon: '🏦',
    metrics: ['45% queue reduction', '24/7 basic banking', 'Regulatory compliant'],
    benefits: [
      'Account balance and transaction inquiries',
      'Fund transfers and bill payments',
      'Product comparisons (loans, cards, investments)',
      'KYC document guidance and verification',
      'Secure authentication integration',
    ],
    cta: 'See Financial Demo',
  },
  {
    slug: 'airports',
    title: 'Airports',
    shortDescription:
      'Assist passengers at check-in, security, and gates with real-time, multilingual guidance.',
    longDescription:
      'Place digital humans at check-in counters, security checkpoints, immigration, gates, and baggage claim. They provide flight info, gate directions, security procedure guidance, visa requirements, and ground transportation — reducing missed flights and passenger stress.',
    icon: '✈️',
    metrics: ['28% fewer missed connections', 'Real-time flight data', '100+ languages'],
    benefits: [
      'Flight status and gate change notifications',
      'Security and customs procedure guidance',
      'Visa and entry requirement checking',
      'Baggage tracking and claim assistance',
      'Ground transport and lounge directions',
    ],
    cta: 'See Airport Demo',
  },
]

export const industrySlugs = industries.map((i) => i.slug)
