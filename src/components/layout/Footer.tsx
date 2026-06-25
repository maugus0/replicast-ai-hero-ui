'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'

export function Footer() {
  const basePath = siteConfig.basePath || ''

  return (
    <footer className="border-t border-slate-100 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href={`${basePath}/`}>
            <Image
              src={`${basePath}/images/brand/replicast-ai.gif`}
              alt="Replicast AI"
              width={200}
              height={50}
              className="h-24 w-auto sm:h-16 lg:h-20"
              unoptimized
            />
          </Link>
          <p className="text-center text-xs text-slate-500 sm:text-right sm:text-sm">
            © {new Date().getFullYear()} Replicast AI Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
