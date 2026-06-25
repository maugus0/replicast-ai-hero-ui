'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { getAudioAnalyzer } from '@/lib/audioAnalyzer'

export function useTTSWithAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const amplitudeRef = useRef(0)
  const animRef = useRef<number>(undefined)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  const findVoice = () => {
    const voices = speechSynthesis.getVoices()
    return (
      voices.find((v) => v.name.includes('Stella')) ||
      voices.find((v) => v.name.includes('Samantha')) ||
      voices.find((v) => v.name.includes('Karen')) ||
      voices.find((v) => v.lang.startsWith('en') && v.localService) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      null
    )
  }

  useEffect(() => {
    const loadVoices = () => { voiceRef.current = findVoice() }
    loadVoices()
    speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  useEffect(() => {
    if (!isSpeaking) {
      amplitudeRef.current = 0
      return
    }
    const poll = () => {
      amplitudeRef.current = getAudioAnalyzer().getAmplitude()
      animRef.current = requestAnimationFrame(poll)
    }
    poll()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isSpeaking])

  const speak = useCallback((text: string) => {
    const voice = voiceRef.current ?? findVoice()
    speechSynthesis.cancel()
    getAudioAnalyzer().start()
    const utterance = new SpeechSynthesisUtterance(text)
    if (voice) utterance.voice = voice
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      getAudioAnalyzer().stop()
      setIsSpeaking(false)
    }
    utterance.onerror = () => {
      getAudioAnalyzer().stop()
      setIsSpeaking(false)
    }
    speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    getAudioAnalyzer().stop()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking, amplitudeRef }
}
