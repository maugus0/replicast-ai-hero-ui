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
}

export type SiteConfig = typeof siteConfig
