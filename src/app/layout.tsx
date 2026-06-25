import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

// Get site URL from environment or fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://replicast.ai'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Replicast AI | Holographic AI Digital Humans',
    template: '%s | Replicast AI',
  },
  description:
    'AI-powered digital humans that talk, react, and serve — on kiosks, in holograms, across industries. Supercharging customer experience with holographic AI.',
  keywords: [
    'AI digital humans',
    'holographic avatars',
    'conversational AI',
    'customer experience',
    'virtual assistants',
    'AI kiosk',
    'digital human technology',
    'interactive AI',
    'holographic display',
    'AI customer service',
  ],
  authors: [{ name: 'Replicast AI', url: siteUrl }],
  creator: 'Replicast AI',
  publisher: 'Replicast AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Replicast AI',
    title: 'Replicast AI | Holographic AI Digital Humans',
    description:
      'AI-powered digital humans that talk, react, and serve — on kiosks, in holograms, across industries.',
    images: [
      {
        url: `${basePath}/images/kiosk-hero.png`,
        width: 600,
        height: 800,
        alt: 'Replicast AI - Holographic AI Digital Humans on Kiosks',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@replicastai',
    creator: '@replicastai',
    title: 'Replicast AI | Holographic AI Digital Humans',
    description: 'AI-powered digital humans that talk, react, and serve.',
    images: [`${basePath}/images/kiosk-hero.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: `${basePath}/images/brand/webclip-source.png`,
        color: '#3B82F6',
      },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || 'dev'

  return (
    <html lang="en" className="scroll-smooth light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="app-version" content={appVersion} />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content={`${basePath}/browserconfig.xml`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Replicast AI',
              url: siteUrl,
              logo: `${siteUrl}${basePath}/images/brand/webclip-source.png`,
              description:
                'AI-powered digital humans that talk, react, and serve — on kiosks, in holograms, across industries.',
              sameAs: [
                'https://twitter.com/replicastai',
                'https://linkedin.com/company/replicastai',
                'https://github.com/maugus0/replicast-ai-hero-ui',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-brand-blue"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
