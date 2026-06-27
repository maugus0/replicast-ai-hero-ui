'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/content/siteConfig'

export function BrezzeCollab() {
  const basePath = siteConfig.basePath || ''
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (el.readyState >= 2) {
      el.play().catch(() => {})
    } else {
      const onReady = () => el.play().catch(() => {})
      el.addEventListener('canplay', onReady)
      return () => el.removeEventListener('canplay', onReady)
    }
  }, [])

  return (
    <div id="brezze" className="scroll-mt-24">
      {/* Content Section */}
      <section className="bg-slate-50 py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            Strategic Partnership with <span className="text-[#6366f1]">Brezze SG</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base lg:text-lg">
            Kicking off the new year with a strategic partnership with Brezze SG and Simplified
            Technology Pte Ltd for the{' '}
            <span className="font-semibold text-slate-900">
              World&apos;s 1st Interactive AI Power Bank Rental Kiosk!
            </span>{' '}
            With 200+ touchpoints nationwide, we&apos;re bringing holographic AI experiences to
            corporate spaces and events.
          </p>
          <p className="mt-3 text-xs italic text-slate-500 sm:text-sm">
            PS: Catch our ad on the big screen at CIMB Plaza!
          </p>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="relative aspect-video w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full bg-black object-contain"
        >
          <source src={`${basePath}/videos/brezze-collab.mp4`} type="video/mp4" />
        </video>
      </section>
    </div>
  )
}
