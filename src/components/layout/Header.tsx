'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const basePath = siteConfig.basePath || ''

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white" role="banner">
      {/* Mobile: Bordered container */}
      <div className="px-4 pt-4 md:hidden">
        <nav
          className={cn(
            'rounded-2xl border border-slate-200 bg-white px-4 transition-shadow duration-300',
            scrolled && 'shadow-lg shadow-slate-200/50'
          )}
          aria-label="Main navigation"
        >
          <div className="flex h-20 items-center justify-between">
            <Link
              href={`${basePath}/`}
              className="flex items-center"
              aria-label={`${siteConfig.name} - Home`}
            >
              <Image
                src={`${basePath}/images/brand/replicast-ai.gif`}
                alt="Replicast AI"
                width={400}
                height={100}
                className="h-[72px] w-auto"
                unoptimized
                priority
              />
            </Link>

            <button
              className="-mr-1 rounded-xl border border-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              mobileMenuOpen ? 'max-h-40 pb-4' : 'max-h-0'
            )}
          >
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-2">
              <button
                onClick={() => scrollToSection('about')}
                className="rounded-xl px-4 py-3 text-left text-[15px] text-slate-700 transition-colors hover:bg-slate-50"
              >
                What are Digital Humans?
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-xl bg-slate-900 py-3 text-center text-[15px] font-medium text-white"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Desktop: Standard nav */}
      <nav
        className={cn(
          'mx-auto hidden max-w-7xl px-6 transition-all duration-300 md:block lg:px-8',
          scrolled && 'border-b border-slate-100'
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-20 items-center justify-between lg:h-24">
          <Link
            href={`${basePath}/`}
            className="flex items-center"
            aria-label={`${siteConfig.name} - Home`}
          >
            <Image
              src={`${basePath}/images/brand/replicast-ai.gif`}
              alt="Replicast AI"
              width={400}
              height={100}
              className="h-16 w-auto lg:h-[72px]"
              unoptimized
              priority
            />
          </Link>

          <div className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm text-slate-700 transition-colors hover:text-slate-900 lg:text-[15px]"
            >
              What are Digital Humans?
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 lg:px-6 lg:py-2.5 lg:text-[15px]"
            >
              Request a Demo
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
