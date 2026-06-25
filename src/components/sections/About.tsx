'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { TalkingAvatar } from '@/components/avatar/TalkingAvatar'
import { useTTSWithAudio } from '@/hooks/useTTSWithAudio'

function LoadingSpinner() {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

function AvatarCanvas({ isSpeaking, amplitudeRef }: { isSpeaking: boolean; amplitudeRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 2.6],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={1}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 5, 5]} intensity={1.8} />
      <directionalLight position={[-3, 3, 3]} intensity={1.2} />
      <hemisphereLight intensity={1} groundColor="#888888" />
      <Suspense fallback={<LoadingSpinner />}>
        <TalkingAvatar isSpeaking={isSpeaking} amplitudeRef={amplitudeRef} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} target={[0, 0, 0]} />
    </Canvas>
  )
}

export function About() {
  const { speak, stop, isSpeaking, amplitudeRef } = useTTSWithAudio()
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleInteract = () => {
    if (hasInteracted) return
    setHasInteracted(true)
    const demoText =
      "Hi there! I'm your AI digital human. I can see you, track your movements, and speak naturally. Go ahead, drag to rotate me and see how I respond!"
    speak(demoText)
  }

  useEffect(() => {
    return () => stop()
  }, [stop])
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

                {/* Screen - taller aspect ratio for full body view */}
                <div className="relative mt-4 aspect-[3/4.5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 via-[#6366f1]/10 to-[#3b82f6]/15">
                  {/* 3D Avatar Canvas */}
                  <div className="absolute inset-0">
                    <AvatarCanvas isSpeaking={isSpeaking} amplitudeRef={amplitudeRef} />
                  </div>

                  {/* Tap to interact overlay */}
                  {!hasInteracted && (
                    <button
                      onClick={handleInteract}
                      className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm transition-opacity hover:bg-black/45"
                      aria-label="Tap to interact"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl">
                        <svg className="ml-1 h-7 w-7 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-white">Tap to interact</span>
                    </button>
                  )}

                  {/* Left arrow */}
                  <button
                    className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:scale-110 hover:bg-white sm:left-6"
                    aria-label="Rotate left"
                    onMouseDown={() =>
                      window.dispatchEvent(
                        new CustomEvent('rotateTalkingModel', { detail: { direction: 'left' } })
                      )
                    }
                  >
                    <svg
                      className="h-4 w-4 text-slate-600 sm:h-5 sm:w-5"
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
                    className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:scale-110 hover:bg-white sm:right-6"
                    aria-label="Rotate right"
                    onMouseDown={() =>
                      window.dispatchEvent(
                        new CustomEvent('rotateTalkingModel', { detail: { direction: 'right' } })
                      )
                    }
                  >
                    <svg
                      className="h-4 w-4 text-slate-600 sm:h-5 sm:w-5"
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
            <div className="absolute -bottom-1 left-1/2 max-w-[200px] -translate-x-1/2 rounded-full border border-slate-100 bg-white px-3 py-1 text-center text-[10px] font-medium text-slate-600 shadow-lg sm:-bottom-2 sm:max-w-none sm:px-4 sm:py-1.5 sm:text-xs">
              {hasInteracted ? (
                <>
                  <span className={`mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full sm:mr-2 sm:h-2 sm:w-2 ${isSpeaking ? 'bg-green-500' : 'bg-slate-400'}`} />
                  {isSpeaking ? 'Speaking' : 'Eye tracking active'} &mdash; drag or use arrows to rotate
                </>
              ) : (
                <>
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500 sm:mr-2 sm:h-2 sm:w-2" />
                  Tap to hear me speak
                </>
              )}
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
              interact in real-time using natural voice, expressions, and gestures&mdash;offering
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
