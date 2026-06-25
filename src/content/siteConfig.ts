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
  description: 'Holographic AI Digital Humans - Supercharging Customer Experience',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://replicast.ai',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  formspreeEndpoint: formspreeId ? `https://formspree.io/f/${formspreeId}` : '',
  version: process.env.NEXT_PUBLIC_APP_VERSION || 'dev',
  social: {
    twitter: 'https://twitter.com/replicastai',
    linkedin: 'https://linkedin.com/company/replicastai',
    github: 'https://github.com/maugus0/replicast-ai-hero-ui',
  },
  contact: {
    email: 'hello@replicast.ai',
    phone: '+1 (555) 000-0000',
  },
  location: {
    address: '123 Innovation Drive, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
  },
  links: {
    privacy: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/privacy`,
    terms: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/terms`,
  },
}

export type SiteConfig = typeof siteConfig
