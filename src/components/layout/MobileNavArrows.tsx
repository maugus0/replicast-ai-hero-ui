'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

const SECTIONS = [
  'about',
  'why-holographic',
  'contact',
  'jaya-grocer',
  'sats',
  'fintech',
  'govware-mbs',
  'singtel-code',
  'nvidia',
  'brezze',
]

export function MobileNavArrows() {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isVisible, setIsVisible] = useState(false)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const findCurrentSection = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Hide when at very top (hero section)
    if (scrollY < 200) {
      setIsVisible(false)
      setCurrentIndex(-1)
      setIsAtEnd(false)
      return
    }

    setIsVisible(true)

    // Check if we're at the bottom of the page
    const atEnd = scrollY + windowHeight >= documentHeight - 150
    setIsAtEnd(atEnd)

    if (atEnd) {
      setCurrentIndex(SECTIONS.length - 1)
      return
    }

    // Find current section based on which one's top is closest to viewport top
    let foundIndex = 0
    for (let i = 0; i < SECTIONS.length; i++) {
      const element = document.getElementById(SECTIONS[i])
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= windowHeight / 3) {
          foundIndex = i
        }
      }
    }
    setCurrentIndex(foundIndex)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', findCurrentSection, { passive: true })
    findCurrentSection()
    return () => window.removeEventListener('scroll', findCurrentSection)
  }, [findCurrentSection])

  const scrollToSection = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      // If at end or last section, go to second-to-last section
      if (isAtEnd || currentIndex >= SECTIONS.length - 1) {
        const element = document.getElementById(SECTIONS[SECTIONS.length - 2])
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }

      // If at first section, scroll to top
      if (currentIndex <= 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      // Otherwise go to previous section
      const prevIndex = Math.max(currentIndex - 1, 0)
      const element = document.getElementById(SECTIONS[prevIndex])
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Down - go to next section
      const nextIndex = Math.min(currentIndex + 1, SECTIONS.length - 1)
      const element = document.getElementById(SECTIONS[nextIndex])
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isAtTop = currentIndex <= 0 && !isAtEnd

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1.5 md:hidden">
      {/* Up Arrow - always show when visible, moves to bottom position when at end */}
      {!isAtEnd && (
        <button
          onClick={() => scrollToSection('up')}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 shadow-md transition-all',
            isAtTop
              ? 'bg-slate-100 text-slate-300'
              : 'bg-white text-slate-600 hover:bg-slate-50 active:scale-95'
          )}
          aria-label="Go to previous section"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Down Arrow - hide at end, Up Arrow takes its place */}
      {isAtEnd ? (
        <button
          onClick={() => scrollToSection('up')}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:bg-slate-50 active:scale-95"
          aria-label="Go to previous section"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => scrollToSection('down')}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:bg-slate-50 active:scale-95"
          aria-label="Go to next section"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  )
}
