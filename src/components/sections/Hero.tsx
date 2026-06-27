'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Girl2Avatar } from '@/components/avatar/Girl2Avatar'

const ANIMATIONS = [
  {
    id: 'Wave_for_Help_2',
    label: 'Wave',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
        />
      </svg>
    ),
  },
  {
    id: 'Agree_Gesture',
    label: 'Agree',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
  },
  {
    id: 'Walking',
    label: 'Walk',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'Running',
    label: 'Run',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'ymca_dance',
    label: 'Dance',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
  },
  {
    id: 'air_squat',
    label: 'Squat',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
  },
  {
    id: '360_Power_Spin_Jump',
    label: 'Spin',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    id: 'BackRight_Run',
    label: 'Back Run',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
    ),
  },
  {
    id: 'Backflip_and_Hooks',
    label: 'Backflip',
    icon: (
      <svg
        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
]

function LoadingSpinner() {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

export function Hero() {
  const basePath = siteConfig.basePath || ''
  const [currentAnimation, setCurrentAnimation] = useState('360_Power_Spin_Jump')

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <button
                onClick={scrollToContact}
                className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Sign Me Up
              </button>
              <button
                onClick={scrollToContact}
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Request a Demo
              </button>
            </div>
          </motion.div>

          {/* Kiosk + 3D Model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-center justify-center gap-6 pb-8 sm:mt-12 sm:flex-row lg:mt-0 lg:gap-8 lg:pb-0 lg:pt-24"
          >
            <Image
              src={`${basePath}/images/Replicast-Kiosks.avif`}
              alt="Replicast AI Digital Humans displayed on holographic kiosks"
              width={500}
              height={600}
              className="w-full max-w-[220px] object-contain mix-blend-multiply sm:max-w-[280px] md:max-w-[340px] lg:h-[420px] lg:w-auto xl:h-[500px]"
              priority
            />

            {/* Kiosk Frame with Girl2 Avatar */}
            <div className="relative">
              <div className="relative w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px]">
                {/* Outer frame */}
                <div className="relative rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200 p-2.5 shadow-2xl sm:p-3">
                  {/* Speaker grille */}
                  <div className="absolute left-1/2 top-3 flex -translate-x-1/2 gap-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1 w-1 rounded-full bg-slate-400" />
                    ))}
                  </div>

                  {/* Screen */}
                  <div className="relative mt-3 aspect-[3/4.5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#6366f1]/5 via-slate-50 to-[#06b6d4]/5">
                    {/* 3D Avatar Canvas */}
                    <div className="absolute inset-0">
                      <Canvas
                        camera={{ position: [0, 0.2, 2.5], fov: 50, near: 0.1, far: 100 }}
                        gl={{ antialias: true, alpha: true }}
                        dpr={[1, 2]}
                        className="h-full w-full touch-none"
                      >
                        <ambientLight intensity={2.2} />
                        <directionalLight position={[3, 5, 5]} intensity={1.5} />
                        <directionalLight position={[-3, 3, 3]} intensity={0.8} />
                        <hemisphereLight intensity={0.6} groundColor="#888888" />
                        <Suspense fallback={<LoadingSpinner />}>
                          <Girl2Avatar animation={currentAnimation} />
                        </Suspense>
                      </Canvas>
                    </div>

                    {/* Subtle vignette */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)]" />
                  </div>

                  {/* Camera dot */}
                  <div className="absolute bottom-5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-400" />
                </div>

                {/* Stand */}
                <div className="mx-auto h-6 w-12 rounded-b-lg bg-gradient-to-b from-slate-200 to-slate-300 sm:h-8 sm:w-16" />
                <div className="mx-auto h-1.5 w-16 rounded-full bg-slate-300 sm:h-2 sm:w-24" />
              </div>

              {/* Animation Selector */}
              <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-0.5 rounded-full border border-slate-200/80 bg-white/95 px-1.5 py-1 shadow-lg backdrop-blur-sm sm:gap-1 sm:px-2 sm:py-1.5">
                {ANIMATIONS.map((anim) => (
                  <button
                    key={anim.id}
                    onClick={() => setCurrentAnimation(anim.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition-all hover:scale-110 sm:h-7 sm:w-7 ${
                      currentAnimation === anim.id
                        ? 'bg-[#6366f1] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title={anim.label}
                    aria-label={`Play ${anim.label} animation`}
                  >
                    {anim.icon}
                  </button>
                ))}
              </div>

              {/* Floating label */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-[10px] font-medium text-slate-600 shadow-md backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Interactive Avatar
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
