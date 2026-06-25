'use client'

import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'
import { motion } from 'framer-motion'

export function Hero() {
  const basePath = siteConfig.basePath || ''

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile & Tablet: Stacked layout */}
        {/* Desktop: Side by side */}
        <div className="flex flex-col lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pt-28 text-center sm:pt-28 lg:pt-0 lg:text-left"
          >
            <h1
              id="hero-title"
              className="text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              Supercharging Customer Experience with{' '}
              <span className="text-[#6366f1]">Holographic AI Digital Humans</span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg lg:mx-0">
              AI-powered digital humans that talk, react, and serve—on kiosks, in holograms, across
              industries.
            </p>

            <div className="mt-8 flex flex-row justify-center gap-4 lg:justify-start">
              <button
                onClick={scrollToContact}
                className="rounded-lg bg-slate-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-slate-800"
              >
                Sign Me Up
              </button>
              <button
                onClick={scrollToContact}
                className="rounded-lg border border-slate-300 px-8 py-3.5 text-base font-medium text-slate-700 transition-colors hover:border-slate-400"
              >
                Request a Demo
              </button>
            </div>
          </motion.div>

          {/* Kiosk Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="mt-10 flex items-center justify-center pb-8 sm:mt-12 lg:mt-0 lg:pb-0 lg:pt-24"
          >
            <Image
              src={`${basePath}/images/Replicast-Kiosks.avif`}
              alt="Replicast AI Digital Humans displayed on holographic kiosks"
              width={700}
              height={800}
              className="w-full max-w-[340px] object-contain mix-blend-multiply sm:max-w-[420px] md:max-w-[480px] lg:h-[600px] lg:w-auto lg:max-w-none xl:h-[700px]"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
