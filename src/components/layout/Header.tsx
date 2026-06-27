'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'
import { cn } from '@/lib/utils'

const NAV_SECTIONS = [
  { id: 'about', label: 'What are AI Digital Humans?' },
  { id: 'why-holographic', label: 'Why Holographic AI?' },
  { id: 'contact', label: 'Ready to Bring Your Brand to Life?' },
  { id: 'jaya-grocer', label: 'Festive Activation with Jaya Grocer' },
  { id: 'sats', label: 'SATS Global Connect 2025' },
  { id: 'fintech', label: 'Singapore FinTech Festival 2025' },
  { id: 'govware-mbs', label: 'GovWare 2025 at Marina Bay Sands' },
  { id: 'singtel-code', label: 'Singtel Centre of Digital Excellence' },
  { id: 'nvidia', label: 'NVIDIA Inception Program' },
  { id: 'brezze', label: 'Strategic Partnership with Brezze SG' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState<(typeof NAV_SECTIONS)[0] | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Show "Explore" when at top (hero section)
      if (window.scrollY < 300) {
        setCurrentSection(null)
        return
      }

      // Find current section based on scroll position
      const windowHeight = window.innerHeight
      let foundSection = NAV_SECTIONS[0]

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(NAV_SECTIONS[i].id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight / 3) {
            foundSection = NAV_SECTIONS[i]
            break
          }
        }
      }
      setCurrentSection(foundSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const basePath = siteConfig.basePath || ''

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
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
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} - Home`}>
              <Image
                src={`${basePath}/images/brand/replicast-ai.gif`}
                alt="Replicast AI"
                width={400}
                height={100}
                className="h-14 w-auto"
                unoptimized
                priority
              />
            </Link>

            <button
              className="-mr-1 rounded-xl border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50"
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
              mobileMenuOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
            )}
          >
            <div className="flex flex-col gap-0.5 border-t border-slate-100 pt-2">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50',
                    currentSection?.id === section.id
                      ? 'bg-slate-100 font-medium text-[#6366f1]'
                      : 'text-slate-700'
                  )}
                >
                  {section.label}
                </button>
              ))}
              <div className="mt-2 border-t border-slate-100 pt-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full rounded-lg bg-slate-900 py-2.5 text-center text-sm font-medium text-white"
                >
                  Request a Demo
                </button>
              </div>
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
          <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} - Home`}>
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
            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-sm text-slate-700 transition-colors hover:text-slate-900 lg:text-[15px]"
              >
                <span className="max-w-[280px] truncate">{currentSection?.label || 'Explore'}</span>
                <svg
                  className={cn(
                    'h-4 w-4 flex-shrink-0 transition-transform',
                    dropdownOpen && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={cn(
                  'absolute right-0 top-full mt-2 max-h-[70vh] w-80 origin-top-right overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-lg transition-all',
                  dropdownOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
                )}
              >
                {NAV_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      'block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50',
                      currentSection?.id === section.id
                        ? 'bg-slate-100 font-medium text-[#6366f1]'
                        : 'text-slate-700 hover:text-[#6366f1]'
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

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
