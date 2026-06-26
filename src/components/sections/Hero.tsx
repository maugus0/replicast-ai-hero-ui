'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/content/siteConfig'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { BlueGuyAvatar } from '@/components/avatar/BlueGuyAvatar'

export function Hero() {
  const basePath = siteConfig.basePath || ''

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

            <div className="mt-8 hidden flex-row justify-center gap-4 sm:flex lg:justify-start">
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

            <div className="h-[280px] w-[160px] shrink-0 sm:h-[340px] sm:w-[200px] md:h-[400px] md:w-[230px] lg:h-[420px] lg:w-[240px] xl:h-[500px] xl:w-[280px]">
              <Canvas
                camera={{ position: [0, 0.3, 2.8], fov: 45, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                className="h-full w-full touch-none"
              >
                <ambientLight intensity={2.0} />
                <directionalLight position={[3, 5, 5]} intensity={1.5} />
                <directionalLight position={[-3, 3, 3]} intensity={1.0} />
                <hemisphereLight intensity={0.8} groundColor="#888888" />
                <Suspense fallback={null}>
                  <BlueGuyAvatar />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
