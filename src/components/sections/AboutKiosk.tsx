'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { HolographicAvatar } from '@/components/avatar/HolographicAvatar'

function LoadingSpinner() {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

function AvatarCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 3.5],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, 3, 3]} intensity={0.8} />
      <hemisphereLight intensity={0.6} groundColor="#888888" />
      <Suspense fallback={<LoadingSpinner />}>
        <HolographicAvatar />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} target={[0, 0, 0]} />
    </Canvas>
  )
}

export function AboutKiosk() {
  return (
    <section id="about" className="scroll-mt-24 bg-slate-50 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: 3D Avatar in Kiosk Frame */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            {/* Kiosk Frame */}
            <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[410px]">
              {/* Outer frame */}
              <div className="relative rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200 p-3 shadow-2xl">
                {/* Speaker grille */}
                <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 w-1 rounded-full bg-slate-400" />
                  ))}
                </div>

                {/* Screen */}
                <div className="relative mt-4 aspect-[3/4.5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#6366f1]/5 via-slate-50 to-[#06b6d4]/5">
                  {/* 3D Avatar Canvas */}
                  <div className="absolute inset-0">
                    <AvatarCanvas />
                  </div>

                  {/* Left arrow */}
                  <button
                    className="absolute left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:scale-110 hover:bg-white sm:left-6 sm:h-8 sm:w-8"
                    aria-label="Rotate left"
                    onMouseDown={() =>
                      window.dispatchEvent(
                        new CustomEvent('rotateModel', { detail: { direction: 'left' } })
                      )
                    }
                  >
                    <svg
                      className="h-3.5 w-3.5 text-slate-600 sm:h-4 sm:w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Right arrow */}
                  <button
                    className="absolute right-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:scale-110 hover:bg-white sm:right-6 sm:h-8 sm:w-8"
                    aria-label="Rotate right"
                    onMouseDown={() =>
                      window.dispatchEvent(
                        new CustomEvent('rotateModel', { detail: { direction: 'right' } })
                      )
                    }
                  >
                    <svg
                      className="h-3.5 w-3.5 text-slate-600 sm:h-4 sm:w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Subtle vignette */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)]" />
                </div>

                {/* Camera dot */}
                <div className="absolute bottom-6 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-400" />
              </div>

              {/* Stand */}
              <div className="mx-auto h-8 w-16 rounded-b-lg bg-gradient-to-b from-slate-200 to-slate-300" />
              <div className="mx-auto h-2 w-24 rounded-full bg-slate-300" />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/95 px-4 py-1.5 text-[11px] font-medium text-slate-600 shadow-md backdrop-blur-sm sm:text-xs">
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Interactive 3D Model
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="order-1 px-2 text-center sm:px-0 lg:order-2 lg:text-left"
          >
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-4xl">
              What Are <span className="text-[#6366f1]">AI Digital Humans</span>?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base lg:text-lg">
              Replicast AI&apos;s Holographic Digital Humans are lifelike, AI-powered avatars that
              interact in real-time using natural voice, expressions, and gestures—offering
              scalable, humanlike service across physical and digital spaces.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-4 lg:justify-start">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#6366f1]/10 text-sm text-[#6366f1] sm:h-8 sm:w-8 sm:text-base">
                  👁
                </span>
                Eye tracking
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#6366f1]/10 text-sm text-[#6366f1] sm:h-8 sm:w-8 sm:text-base">
                  🎭
                </span>
                Natural expressions
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#6366f1]/10 text-sm text-[#6366f1] sm:h-8 sm:w-8 sm:text-base">
                  🎙
                </span>
                Voice synthesis
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
