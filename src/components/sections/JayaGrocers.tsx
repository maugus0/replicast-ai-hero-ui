'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/content/siteConfig'

export function JayaGrocers() {
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
    <div id="jaya-grocer" className="scroll-mt-24">
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
            Festive Activation with <span className="text-[#6366f1]">Jaya Grocer</span>{' '}
            <span className="text-lg sm:text-xl lg:text-2xl">🧨 🧧 ✨</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base lg:text-lg">
            On Chinese New Year this year, we delivered a highly engaging activation with Jaya
            Grocer that brought festive cheer at their partner event.
          </p>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="relative aspect-video w-full overflow-hidden lg:aspect-[21/9]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover object-center brightness-105 contrast-[1.02] saturate-[1.15]"
        >
          <source src={`${basePath}/videos/jaya-grocers.mp4`} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent" />
      </section>
    </div>
  )
}
