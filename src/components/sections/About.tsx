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
    <section id="about" className="relative h-dvh w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="h-full w-full object-cover"
      >
        <source src={`${basePath}/videos/about-background.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/5" />
    </section>
  )
}
