'use client'

import { useState, Suspense, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { siteConfig } from '@/content/siteConfig'
import { TalkingAvatar } from '@/components/avatar/TalkingAvatar'

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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    const loadVoice = () => {
      const voices = speechSynthesis.getVoices()
      // Find Stella or similar natural voice
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
    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}

function AvatarSection() {
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
    <div className="relative">
      {/* Kiosk Frame */}
      <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[380px]">
        <div className="relative rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200 p-3 shadow-2xl">
          {/* Speaker grille */}
          <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-0.5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-slate-400" />
            ))}
          </div>

          {/* Screen with gradient background */}
          <div
            className="relative mt-4 aspect-[3/4.5] overflow-hidden rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, #a78bfa 0%, #c084fc 30%, #f0abfc 60%, #fda4af 100%)',
            }}
          >
            <Canvas
              camera={{ position: [0, 0.1, 2.6], fov: 45, near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              className="touch-none"
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
                enableRotate={false}
                target={[0, 0, 0]}
              />
            </Canvas>

            {/* Top action buttons */}
            <button
              className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:left-5"
              aria-label="Speak title"
              onClick={speakTitle}
              disabled={isSpeaking}
            >
              <svg
                className="h-4 w-4 text-[#6366f1]"
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
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:right-5"
              aria-label="Speak description"
              onClick={speakDescription}
              disabled={isSpeaking}
            >
              <svg
                className="h-4 w-4 text-[#6366f1]"
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

            {/* Left arrow - middle */}
            <button
              className="absolute left-5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:left-8 sm:h-8 sm:w-8"
              aria-label="Rotate left"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('rotateTalkingModel', { detail: { direction: 'left' } })
                )
              }
            >
              <svg
                className="h-3.5 w-3.5 text-slate-700 sm:h-4 sm:w-4"
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

            {/* Right arrow - middle */}
            <button
              className="absolute right-5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:right-8 sm:h-8 sm:w-8"
              aria-label="Rotate right"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('rotateTalkingModel', { detail: { direction: 'right' } })
                )
              }
            >
              <svg
                className="h-3.5 w-3.5 text-slate-700 sm:h-4 sm:w-4"
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

            {/* Speaking indicator */}
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

          {/* Camera dot */}
          <div className="absolute bottom-6 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-400" />
        </div>

        {/* Stand */}
        <div className="mx-auto h-8 w-16 rounded-b-lg bg-gradient-to-b from-slate-200 to-slate-300" />
        <div className="mx-auto h-2 w-24 rounded-full bg-slate-300" />
      </div>
    </div>
  )
}

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

  const validate = () => {
    const next: Record<string, string> = {}
    if (/\d/.test(formData.name)) next.name = 'Name cannot contain numbers'
    if (/[a-zA-Z]/.test(formData.phone)) next.phone = 'Phone cannot contain letters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (!siteConfig.formspreeEndpoint) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', phone: '', message: '' })
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const inputClasses =
    'w-full px-4 py-3 text-[15px] rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/20 transition-all'

  return (
    <section id="contact" className="scroll-mt-24 bg-slate-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text + Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6 text-center sm:mb-8 lg:text-left">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-4xl">
                Ready to Bring <span className="text-[#6366f1]">Your Brand to Life</span>?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base lg:mx-0 lg:text-lg">
                With Replicast AI&apos;s Digital Humans, your brand can offer intelligent,
                emotionally engaging service that stands out and scales fast.
              </p>
            </div>

            {/* Form */}
            {status === 'success' ? (
              <div className="rounded-xl border border-green-200 bg-white p-6 text-center sm:rounded-2xl sm:p-8">
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
                <h3 className="text-lg font-semibold text-slate-900">Thank you!</h3>
                <p className="mt-1 text-slate-600">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />

                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full rounded-lg bg-slate-900 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-slate-800 disabled:bg-slate-400"
                >
                  {status === 'submitting' ? 'Sending...' : 'Request a Demo'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Interactive Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <AvatarSection />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
