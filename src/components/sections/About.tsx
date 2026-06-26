'use client'

import { useRef, useEffect } from 'react'
import { siteConfig } from '@/content/siteConfig'

export function About() {
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
    <section className="relative aspect-video w-full overflow-hidden md:aspect-auto md:h-dvh">
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
        <source src={`${basePath}/videos/about-background.mp4`} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/40 to-transparent" />
    </section>
  )
}
