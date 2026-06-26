const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || ''

// Suppress warning in production; only show once in development
if (typeof window !== 'undefined' && !formspreeId && process.env.NODE_ENV === 'development') {
  const warned = sessionStorage.getItem('formspree-warned')
  if (!warned) {
    console.info('[siteConfig] Form submissions disabled - NEXT_PUBLIC_FORMSPREE_ID not set')
    sessionStorage.setItem('formspree-warned', 'true')
  }
}

export const siteConfig = {
  name: 'Replicast AI',
  legalName: 'Replicast AI Pte Ltd',
  description: 'Holographic AI Digital Humans - Supercharging Customer Experience',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://replicast.ai',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  formspreeEndpoint: formspreeId ? `https://formspree.io/f/${formspreeId}` : '',
  version: process.env.NEXT_PUBLIC_APP_VERSION || 'dev',
  contact: {
    email: 'hello@replicast.ai',
  },
  company: {
    uen: '202520403N',
    registeredName: 'REPLICAST AI PTE. LTD.',
    entityType: 'Local Company',
    registeredDate: '2025-05-11',
    status: 'Live Company',
  },
  address: {
    street: '22 Sin Ming Lane',
    suite: '#06-76, Midview City',
    city: 'Singapore',
    postalCode: '573969',
    country: 'Singapore',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/replicast-ai/',
    github: 'https://github.com/maugus0/replicast-ai-hero-ui/',
  },
}

export type SiteConfig = typeof siteConfig
