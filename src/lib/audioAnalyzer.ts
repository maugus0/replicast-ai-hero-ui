class AudioAnalyzer {
  private static instance: AudioAnalyzer | null = null

  private ctx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private oscillator: OscillatorNode | null = null
  private gainNode: GainNode | null = null
  private lfo: OscillatorNode | null = null
  private lfoGain: GainNode | null = null

  private constructor() {}

  static getInstance(): AudioAnalyzer {
    if (!AudioAnalyzer.instance) {
      AudioAnalyzer.instance = new AudioAnalyzer()
    }
    return AudioAnalyzer.instance
  }

  private ensureContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.analyser = this.ctx.createAnalyser()
      this.analyser.fftSize = 128
      this.analyser.smoothingTimeConstant = 0.85
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  start() {
    if (!this.ctx) this.ensureContext()
    if (!this.ctx || !this.analyser) return

    this.oscillator = this.ctx.createOscillator()
    this.oscillator.type = 'sawtooth'
    this.oscillator.frequency.value = 200

    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.value = 0.3

    this.lfo = this.ctx.createOscillator()
    this.lfo.type = 'sine'
    this.lfo.frequency.value = 5

    this.lfoGain = this.ctx.createGain()
    this.lfoGain.gain.value = 0.25

    this.lfo.connect(this.lfoGain)
    this.lfoGain.connect(this.gainNode.gain)
    this.lfo.start()

    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.analyser)
    this.oscillator.start()
  }

  stop() {
    this.lfo?.stop()
    this.lfo?.disconnect()
    this.oscillator?.stop()
    this.oscillator?.disconnect()
    this.gainNode?.disconnect()
    this.lfoGain?.disconnect()
    this.lfo = null
    this.lfoGain = null
    this.oscillator = null
    this.gainNode = null
  }

  getAmplitude(): number {
    if (!this.analyser) return 0
    const data = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(data)
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += Math.abs(data[i] - 128)
    }
    const avg = sum / (data.length * 128)
    return Math.min(avg * 2.5, 1)
  }

  destroy() {
    this.stop()
    this.ctx?.close()
    this.ctx = null
    this.analyser = null
    AudioAnalyzer.instance = null
  }
}

export function getAudioAnalyzer(): AudioAnalyzer {
  return AudioAnalyzer.getInstance()
}
