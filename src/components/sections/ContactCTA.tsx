'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { siteConfig } from '@/content/siteConfig'
import { HolographicAvatar } from '@/components/avatar/HolographicAvatar'

function LoadingSpinner() {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
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
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (value && /[0-9]/.test(value)) return 'Name should not contain numbers'
        break
      case 'phone':
        if (value && /[a-zA-Z]/.test(value)) return 'Phone should only contain numbers'
        break
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    const error = validate(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validate(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields on submit
    const newErrors: Record<string, string> = {}
    for (const [key, value] of Object.entries(formData)) {
      const err = validate(key, value)
      if (err) newErrors[key] = err
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

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
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
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
                    onBlur={handleBlur}
                    required
                    className={`${inputClasses} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                />
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

          {/* Right: Kiosk with HolographicAvatar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[410px]">
                <div className="relative rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200 p-3 shadow-2xl">
                  {/* Speaker grille */}
                  <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-0.5">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-1 w-1 rounded-full bg-slate-400" />
                    ))}
                  </div>

                  {/* Screen */}
                    <div className="relative mt-4 aspect-[3/4.5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 via-[#6366f1]/10 to-[#3b82f6]/15">
                    <Canvas
                      camera={{ position: [0, 0, 3.5], fov: 50, near: 0.1, far: 100 }}
                      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                      dpr={1}
                      className="touch-none"
                    >
                      <ambientLight intensity={2.2} />
                      <directionalLight position={[3, 5, 5]} intensity={1.5} />
                      <directionalLight position={[-3, 3, 3]} intensity={0.8} />
                      <hemisphereLight intensity={0.6} groundColor="#888888" />
                      <Suspense fallback={<LoadingSpinner />}>
                        <HolographicAvatar />
                      </Suspense>
                      <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        target={[0, 0, 0]}
                      />
                    </Canvas>

                    {/* Left arrow */}
                    <button
                      className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:scale-110 hover:bg-white sm:left-6"
                      aria-label="Rotate left"
                      onMouseDown={() =>
                        window.dispatchEvent(
                          new CustomEvent('rotateModel', { detail: { direction: 'left' } })
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
                          new CustomEvent('rotateModel', { detail: { direction: 'right' } })
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
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 sm:mr-2 sm:h-2 sm:w-2" />
                Arrows or drag to rotate
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
