import type { Metadata } from 'next'
import { CompanyContent } from './CompanyContent'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'Learn about Replicast AI — our mission, values, and team building holographic digital humans for customer experience.',
  openGraph: {
    title: 'Company | Replicast AI',
    description:
      'Learn about Replicast AI — our mission, values, and team building holographic digital humans for customer experience.',
    type: 'website',
  },
}

export default function CompanyPage() {
  return <CompanyContent />
}
