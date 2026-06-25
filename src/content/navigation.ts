import { siteConfig } from './siteConfig'

export const socialLinks = siteConfig.social

export const footerLinks = {
  product: [
    { label: 'Industries', href: '/industries' },
    { label: 'Technology', href: '/technology' },
    { label: 'Demo', href: '/demo' },
  ],
  company: [
    { label: 'About', href: '/company' },
    { label: 'Blog', href: '#', external: true },
  ],
}
