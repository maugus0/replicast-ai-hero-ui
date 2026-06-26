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
  blog: 'https://replicast.ai/blog',
  contact: {
    email: 'hello@replicast.ai',
    phone: '+1 (415) 555-0198',
  },
  address: {
    street: '388 Market Street',
    suite: 'Suite 1200',
    city: 'San Francisco',
    state: 'CA',
    zip: '94111',
    country: 'USA',
  },
  companyLinks: [
    { label: 'About Us', href: '#about' },
    { label: 'Blog', href: 'https://replicast.ai/blog', external: true },
    { label: 'Careers', href: 'https://replicast.ai/careers', external: true },
    { label: 'Privacy Policy', href: 'https://replicast.ai/privacy', external: true },
    { label: 'Terms of Service', href: 'https://replicast.ai/terms', external: true },
  ],
  industryLinks: [
    { label: 'Retail', href: 'https://replicast.ai/industries/retail', external: true },
    { label: 'Healthcare', href: 'https://replicast.ai/industries/healthcare', external: true },
    { label: 'Finance', href: 'https://replicast.ai/industries/finance', external: true },
    { label: 'Education', href: 'https://replicast.ai/industries/education', external: true },
    { label: 'Hospitality', href: 'https://replicast.ai/industries/hospitality', external: true },
  ],
  social: {
    twitter: 'https://twitter.com/replicastai',
    linkedin: 'https://linkedin.com/company/replicastai',
    github: 'https://github.com/maugus0/replicast-ai-hero-ui',
    youtube: 'https://youtube.com/@replicastai',
  },
}

export type SiteConfig = typeof siteConfig
