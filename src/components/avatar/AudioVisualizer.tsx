'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AudioVisualizerProps {
  audioContext: AudioContext | null
  isPlaying: boolean
  className?: string
  size?: number
  barCount?: number
}

export function AudioVisualizer({
  audioContext,
  isPlaying,
  className,
  size = 120,
  barCount = 32,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!audioContext || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    if (!analyserRef.current) {
      analyserRef.current = audioContext.createAnalyser()
      analyserRef.current.fftSize = 256
      analyserRef.current.smoothingTimeConstant = 0.8
    }

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.35
    const barWidth = (Math.PI * 2) / barCount

    const animate = () => {
      if (!canvasRef.current) return

      ctx.clearRect(0, 0, size, size)

      if (isPlaying && analyser) {
        analyser.getByteFrequencyData(dataArray)
      } else {
        dataArray.fill(isPlaying ? 20 : 0)
      }

      ctx.save()
      ctx.translate(centerX, centerY)

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i % bufferLength] / 255
        const barHeight = radius * 0.8 * value
        const angle = i * barWidth - Math.PI / 2

        const gradient = ctx.createLinearGradient(0, 0, 0, -radius)
        gradient.addColorStop(0, '#00E5FF')
        gradient.addColorStop(0.5, '#7C3AED')
        gradient.addColorStop(1, '#EC4899')

        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
        ctx.lineTo(Math.cos(angle) * (radius + barHeight), Math.sin(angle) * (radius + barHeight))
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        ctx.shadowColor = '#00E5FF'
        ctx.shadowBlur = 8
        ctx.stroke()
      }

      // Center glow pulse
      const pulse = isPlaying ? 1 + Math.sin(Date.now() * 0.005) * 0.15 : 1
      const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * pulse)
      centerGradient.addColorStop(0, 'rgba(0, 229, 255, 0.4)')
      centerGradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.2)')
      centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.beginPath()
      ctx.arc(0, 0, radius * pulse, 0, Math.PI * 2)
      ctx.fillStyle = centerGradient
      ctx.fill()

      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [audioContext, isPlaying, size, barCount])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className={cn('block', className)}
      aria-hidden="true"
      role="img"
      aria-label="Audio visualization"
    />
  )
}
