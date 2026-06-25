'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BrowserVoice {
  id: string
  label: string
  voice: SpeechSynthesisVoice | null
}

export function TTSDemo() {
  const [voices, setVoices] = useState<BrowserVoice[]>([])
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('')
  const [text, setText] = useState(
    'Hello! I am a holographic digital human powered by artificial intelligence.'
  )
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false)
      return
    }

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices()

      if (availableVoices.length === 0) return

      const englishVoices = availableVoices.filter((v) => v.lang.startsWith('en')).slice(0, 6)

      const formattedVoices: BrowserVoice[] = englishVoices.map((v, i) => ({
        id: `voice-${i}`,
        label: v.name.split(' ')[0] || `Voice ${i + 1}`,
        voice: v,
      }))

      if (formattedVoices.length > 0) {
        setVoices(formattedVoices)
        setSelectedVoiceId(formattedVoices[0].id)
      }
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      speechSynthesis.onvoiceschanged = null
      speechSynthesis.cancel()
    }
  }, [])

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthesis.cancel()
    }
    setSpeaking(false)
    utteranceRef.current = null
  }, [])

  const handleSpeak = useCallback(() => {
    if (!supported || typeof window === 'undefined') return

    if (speaking) {
      stopSpeaking()
      return
    }

    if (!text.trim()) return

    const selectedVoice = voices.find((v) => v.id === selectedVoiceId)?.voice

    const utterance = new SpeechSynthesisUtterance(text.trim())
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => {
      setSpeaking(false)
      utteranceRef.current = null
    }
    utterance.onerror = () => {
      setSpeaking(false)
      utteranceRef.current = null
    }

    utteranceRef.current = utterance
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }, [text, selectedVoiceId, voices, speaking, stopSpeaking, supported])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSpeak()
      }
    },
    [handleSpeak]
  )

  if (!supported) {
    return (
      <div className="text-center text-sm text-slate-400">
        <p>Text-to-speech is not supported in your browser.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type something for the avatar to say..."
        rows={2}
        className={cn(
          'w-full resize-none rounded-xl px-4 py-3 text-sm',
          'border border-slate-200 bg-white text-slate-900 placeholder-slate-400',
          'focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20',
          'shadow-soft transition-all'
        )}
      />

      <div className="flex flex-wrap items-center justify-center gap-3">
        {voices.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {voices.slice(0, 4).map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  stopSpeaking()
                  setSelectedVoiceId(v.id)
                }}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                  selectedVoiceId === v.id
                    ? 'border border-brand-blue/30 bg-brand-blue/10 text-brand-blue'
                    : 'border border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleSpeak}
          disabled={!text.trim()}
          className={cn(
            'flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium transition-all',
            'bg-gradient-to-r from-brand-blue to-brand-purple text-white',
            'hover:scale-[1.02] hover:shadow-brand active:scale-[0.98]',
            'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none'
          )}
        >
          {speaking ? (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              Speak
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        Powered by your browser's speech synthesis
      </p>
    </div>
  )
}
