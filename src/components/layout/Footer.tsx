'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'

const socialIcons = {
  linkedin: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
} as const

export function Footer() {
  const basePath = siteConfig.basePath || ''
  const { address, company, social } = siteConfig

  return (
    <footer className="border-t border-slate-100 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-10">
          {/* Logo + social */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <Link href="/">
              <Image
                src={`${basePath}/images/brand/replicast-ai.gif`}
                alt="Replicast AI"
                width={200}
                height={50}
                className="h-16 w-auto sm:h-[4.5rem]"
                unoptimized
              />
            </Link>
            <div className="flex gap-2">
              {(Object.entries(social) as [keyof typeof socialIcons, string][]).map(
                ([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-[#6366f1] hover:text-[#6366f1]"
                  >
                    {socialIcons[platform]}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Company details */}
          <div className="text-center text-sm leading-relaxed lg:text-left">
            <p className="font-medium text-slate-900">{siteConfig.legalName}</p>
            <p className="mt-1 text-slate-600">UEN {company.uen}</p>
            <p className="mt-3 text-slate-600">
              {address.street}, {address.suite}
              <br />
              {address.city} {address.postalCode}
            </p>
          </div>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
