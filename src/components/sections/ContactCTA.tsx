'use client'

import { useState, Suspense, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { siteConfig } from '@/content/siteConfig'
import { TalkingAvatar } from '@/components/avatar/TalkingAvatar'
import { Guy1Avatar } from '@/components/avatar/Guy1Avatar'

const GUY1_ANIMATIONS = [
  {
    id: 'Wave_One_Hand',
    label: 'Wave',
    scale: 1.0,
    posY: -1.0,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
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
    id: 'Wave_for_Help_3',
    label: 'Wave Help',
    scale: 1.0,
    posY: -1.0,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'Walking',
    label: 'Walk',
    scale: 1.0,
    posY: -1.0,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
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
    id: 'walking_2_inplace',
    label: 'Walk 2',
    scale: 1.0,
    posY: -1.0,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    id: 'Running',
    label: 'Run',
    scale: 1.0,
    posY: -1.0,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
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
    id: '360_Power_Spin_Jump',
    label: 'Spin',
    scale: 0.7,
    posY: -0.5,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
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
    id: 'Wall_Push_Jump_and_Flip',
    label: 'Flip',
    scale: 0.55,
    posY: -0.3,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
  {
    id: 'Weapon_Combo',
    label: 'Combo',
    scale: 0.85,
    posY: -0.8,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: 'Weapon_Combo_1',
    label: 'Combo 1',
    scale: 0.85,
    posY: -0.8,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'Weapon_Combo_2',
    label: 'Combo 2',
    scale: 0.85,
    posY: -0.8,
    icon: (
      <svg
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
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

function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    const loadVoice = () => {
      const voices = speechSynthesis.getVoices()
      const stella =
        voices.find((v) => v.name.includes('Stella')) ||
        voices.find((v) => v.name.includes('Samantha')) ||
        voices.find((v) => v.name.includes('Karen')) ||
        voices.find((v) => v.lang.startsWith('en') && v.localService) ||
        voices.find((v) => v.lang.startsWith('en'))
      voiceRef.current = stella || null
    }
    loadVoice()
    speechSynthesis.addEventListener('voiceschanged', loadVoice)
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoice)
  }, [])

  const speak = useCallback((text: string) => {
    if (!voiceRef.current) return
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voiceRef.current
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}

function TalkingAvatarKiosk() {
  const { speak, stop, isSpeaking } = useTTS()

  const speakTitle = () => {
    speak('Ready to Bring Your Brand to Life?')
  }

  const speakDescription = () => {
    speak(
      "With Replicast AI's Digital Humans, your brand can offer intelligent, emotionally engaging service that stands out and scales fast."
    )
  }

  return (
    <div className="relative w-full">
      <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]">
        <div className="relative rounded-[1.5rem] bg-gradient-to-b from-slate-100 to-slate-200 p-2 shadow-2xl sm:rounded-[2rem] sm:p-3">
          <div className="absolute left-1/2 top-2.5 flex -translate-x-1/2 gap-0.5 sm:top-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-slate-400" />
            ))}
          </div>

          <div
            className="relative mt-3 aspect-[3/4] overflow-hidden rounded-xl sm:mt-4 sm:rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, #a78bfa 0%, #c084fc 30%, #f0abfc 60%, #fda4af 100%)',
            }}
          >
            <Canvas
              camera={{ position: [0, 0.1, 2.6], fov: 45, near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              className="cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <ambientLight intensity={2.2} />
              <directionalLight position={[3, 5, 5]} intensity={1.8} castShadow />
              <directionalLight position={[-3, 3, 3]} intensity={1.2} />
              <hemisphereLight intensity={1} groundColor="#888888" />
              <Suspense fallback={<LoadingSpinner />}>
                <TalkingAvatar isSpeaking={isSpeaking} />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI / 2.2}
                maxPolarAngle={Math.PI / 1.7}
                target={[0, 0, 0]}
              />
            </Canvas>

            <button
              className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:h-8 sm:w-8"
              aria-label="Speak title"
              onClick={speakTitle}
              disabled={isSpeaking}
            >
              <svg
                className="h-3.5 w-3.5 text-[#6366f1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </button>

            <button
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:h-8 sm:w-8"
              aria-label="Speak description"
              onClick={speakDescription}
              disabled={isSpeaking}
            >
              <svg
                className="h-3.5 w-3.5 text-[#6366f1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>

            <button
              className="absolute left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:h-7 sm:w-7"
              aria-label="Rotate left"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('rotateTalkingModel', { detail: { direction: 'left' } })
                )
              }
            >
              <svg
                className="h-3 w-3 text-slate-700 sm:h-3.5 sm:w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:h-7 sm:w-7"
              aria-label="Rotate right"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('rotateTalkingModel', { detail: { direction: 'right' } })
                )
              }
            >
              <svg
                className="h-3 w-3 text-slate-700 sm:h-3.5 sm:w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {isSpeaking && (
              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-lg">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 w-0.5 animate-pulse rounded-full bg-[#6366f1]"
                      style={{ animationDelay: `${i * 0.1}s`, animationDuration: '0.5s' }}
                    />
                  ))}
                </div>
                <button
                  onClick={stop}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500"
                >
                  <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="1" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="absolute bottom-5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-400 sm:h-2 sm:w-2" />
        </div>

        <div className="mx-auto h-6 w-12 rounded-b-lg bg-gradient-to-b from-slate-200 to-slate-300 sm:h-7 sm:w-16" />
        <div className="mx-auto h-1.5 w-20 rounded-full bg-slate-300 sm:w-24" />
      </div>
      <p className="mt-3 text-center text-xs font-medium text-slate-500">Voice Assistant</p>
    </div>
  )
}

function Guy1AvatarKiosk() {
  const [currentAnim, setCurrentAnim] = useState('Wave_One_Hand')
  const currentAnimData = GUY1_ANIMATIONS.find((a) => a.id === currentAnim) || GUY1_ANIMATIONS[0]

  return (
    <div className="relative flex w-full items-start justify-center gap-2 sm:gap-3">
      {/* iPad/Tablet Style Kiosk */}
      <div className="relative">
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
          {/* Tablet Frame */}
          <div className="relative rounded-[1.5rem] bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-2xl sm:rounded-[2rem] sm:p-3">
            {/* Front Camera */}
            <div className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-600 sm:top-3 sm:h-2 sm:w-2" />

            {/* Screen - Portrait tablet aspect ratio */}
            <div className="relative mt-3 aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-[#6366f1]/10 via-slate-50 to-[#06b6d4]/10 sm:mt-4 sm:rounded-2xl">
              <Canvas
                camera={{ position: [0, 0.2, 2.5], fov: 50, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                className="cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <ambientLight intensity={2.2} />
                <directionalLight position={[3, 5, 5]} intensity={1.5} />
                <directionalLight position={[-3, 3, 3]} intensity={0.8} />
                <hemisphereLight intensity={0.6} groundColor="#888888" />
                <Suspense fallback={<LoadingSpinner />}>
                  <Guy1Avatar
                    animation={currentAnim}
                    scale={currentAnimData.scale}
                    posY={currentAnimData.posY}
                  />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={true}
                  rotateSpeed={0.5}
                  minPolarAngle={Math.PI / 2.2}
                  maxPolarAngle={Math.PI / 1.7}
                  target={[0, 0, 0]}
                />
              </Canvas>
            </div>

            {/* Home Button/Indicator */}
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-slate-600 sm:mt-3 sm:w-20" />
          </div>

          {/* Stand */}
          <div className="mx-auto h-6 w-16 rounded-b-lg bg-gradient-to-b from-slate-700 to-slate-800 sm:h-7 sm:w-20" />
          <div className="mx-auto h-1.5 w-24 rounded-full bg-slate-600 sm:w-28" />
        </div>
        <p className="mt-3 text-center text-xs font-medium text-slate-500">Interactive Avatar</p>
      </div>

      {/* Animation Selector */}
      <div className="flex flex-col gap-1.5 pt-6 sm:pt-8">
        {GUY1_ANIMATIONS.map((a) => (
          <button
            key={a.id}
            onClick={() => setCurrentAnim(a.id)}
            className={`flex h-6 w-6 items-center justify-center rounded-full transition-all hover:scale-110 sm:h-7 sm:w-7 ${
              currentAnim === a.id
                ? 'bg-[#6366f1] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={a.label}
            aria-label={`Play ${a.label} animation`}
          >
            {a.icon}
          </button>
        ))}
      </div>
    </div>
  )
}

const FIELD_LIMITS = { name: 20, email: 50, company: 20, phone: 20, message: 100 }

export function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validateField = (name: string, value: string): string => {
    const limit = FIELD_LIMITS[name as keyof typeof FIELD_LIMITS]
    if (name === 'name' && /\d/.test(value)) return 'No numbers allowed'
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Invalid email'
    if (name === 'phone' && /[a-zA-Z]/.test(value)) return 'No letters allowed'
    if (value.length > limit) return `Max ${limit} chars`
    return ''
  }

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) newErrors[key] = error
    })
    if (!formData.name.trim()) newErrors.name = 'Required'
    if (!formData.email.trim()) newErrors.email = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return
    setStatus('submitting')
    const subject = encodeURIComponent(`Demo Request from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message || 'No message'}`
    )
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`
    setStatus('success')
    setFormData({ name: '', email: '', company: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const limit = FIELD_LIMITS[name as keyof typeof FIELD_LIMITS]
    if (value.length <= limit) setFormData((prev) => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
  }

  const inputCls =
    'w-full px-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-all'

  return (
    <section id="contact" className="scroll-mt-24 bg-slate-50 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Desktop only */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 hidden text-center sm:mb-10 lg:block"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Ready to Bring <span className="text-[#6366f1]">Your Brand to Life</span>?
          </h2>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-center gap-8 xl:gap-12">
            {/* Left Kiosk */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <TalkingAvatarKiosk />
            </motion.div>

            {/* Center: Description + Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex w-full max-w-xs flex-col items-center"
            >
              <p className="mb-6 text-center text-sm text-slate-600 lg:text-base">
                With Replicast AI&apos;s Digital Humans, your brand can offer intelligent,
                emotionally engaging service that stands out and scales fast.
              </p>

              {status === 'success' ? (
                <div className="w-full rounded-xl border border-green-200 bg-white p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">Thank you!</p>
                  <p className="mt-1 text-slate-600">Your email client should open shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={FIELD_LIMITS.name}
                      className={`${inputCls} ${errors.name ? 'border-red-400' : ''}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                      {formData.name.length}/{FIELD_LIMITS.name}
                    </span>
                  </div>
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={FIELD_LIMITS.email}
                    className={`${inputCls} ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      maxLength={FIELD_LIMITS.company}
                      className={inputCls}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                      {formData.company.length}/{FIELD_LIMITS.company}
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={FIELD_LIMITS.phone}
                      className={`${inputCls} ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                      {formData.phone.length}/{FIELD_LIMITS.phone}
                    </span>
                  </div>
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      maxLength={FIELD_LIMITS.message}
                      className={`${inputCls} resize-none`}
                    />
                    <span className="absolute bottom-2 right-3 text-[10px] text-slate-400">
                      {formData.message.length}/{FIELD_LIMITS.message}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-400"
                  >
                    {status === 'submitting' ? 'Opening Email...' : 'Request a Demo'}
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    Or email us at{' '}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[#6366f1] hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                </form>
              )}
            </motion.div>

            {/* Right Kiosk */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-shrink-0"
            >
              <Guy1AvatarKiosk />
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* First Kiosk - Above Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-center"
          >
            <div className="w-full max-w-[280px]">
              <TalkingAvatarKiosk />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center"
          >
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Ready to Bring <span className="text-[#6366f1]">Your Brand to Life</span>?
            </h2>
          </motion.div>

          {/* Description */}
          <p className="mx-auto mb-6 max-w-md text-center text-sm text-slate-600">
            With Replicast AI&apos;s Digital Humans, your brand can offer intelligent, emotionally
            engaging service that stands out and scales fast.
          </p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-sm"
          >
            {status === 'success' ? (
              <div className="rounded-xl border border-green-200 bg-white p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-slate-900">Thank you!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={FIELD_LIMITS.name}
                    className={`${inputCls} ${errors.name ? 'border-red-400' : ''}`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                    {formData.name.length}/{FIELD_LIMITS.name}
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`${inputCls} ${errors.email ? 'border-red-400' : ''}`}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.company}
                  className={inputCls}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.phone}
                  className={`${inputCls} ${errors.phone ? 'border-red-400' : ''}`}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  maxLength={FIELD_LIMITS.message}
                  className={`${inputCls} resize-none`}
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white"
                >
                  Request a Demo
                </button>
                <p className="text-center text-xs text-slate-500">
                  Or email{' '}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[#6366f1] hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              </form>
            )}
          </motion.div>

          {/* Second Kiosk - After Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <div className="w-full max-w-[380px]">
              <Guy1AvatarKiosk />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
