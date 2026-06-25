'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'
import { footerLinks } from '@/content/navigation'

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 hover:shadow-sm"
    >
      {children}
    </a>
  )
}

export function Footer() {
  const basePath = siteConfig.basePath || ''

  return (
    <footer className="border-t border-slate-100 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`${basePath}/`} className="inline-block">
              <Image
                src={`${basePath}/images/brand/replicast-ai.gif`}
                alt="Replicast AI"
                width={200}
                height={50}
                className="h-20 w-auto sm:h-16"
                unoptimized
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Holographic AI Digital Humans that talk, react, and serve — on kiosks, in holograms, across industries.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`${basePath}${link.href}`}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-500 transition-colors hover:text-slate-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={`${basePath}${link.href}`}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
              <li>
                <Link
                  href={`${basePath}/company`}
                  className="text-sm text-slate-500 transition-colors hover:text-slate-700"
                >
                  Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Contact</h3>
            <div className="space-y-3 text-sm text-slate-500">
              <p>{siteConfig.location.address}</p>
              <p>
                {siteConfig.location.city}, {siteConfig.location.state} {siteConfig.location.zip}
              </p>
              <p>{siteConfig.location.country}</p>
              <p className="pt-1">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-slate-700 transition-colors hover:text-slate-900"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>{siteConfig.contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {siteConfig.name} Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <SocialIcon href={siteConfig.social.twitter} label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={siteConfig.social.github} label="GitHub">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </SocialIcon>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href={siteConfig.links.privacy} className="transition-colors hover:text-slate-600">
              Privacy Policy
            </a>
            <a href={siteConfig.links.terms} className="transition-colors hover:text-slate-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
