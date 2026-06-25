export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  details: string[]
}

export const features: Feature[] = [
  {
    id: 'real-time-voice',
    title: 'Real-Time Natural Voice',
    description:
      'Sub-200ms latency voice interaction with natural prosody, interruption handling, and multi-turn conversations.',
    icon: '🎙️',
    details: [
      'Streaming ASR + LLM + TTS pipeline',
      'Barge-in and interruption support',
      'Context-aware conversation memory',
      '50+ languages with accent adaptation',
    ],
  },
  {
    id: 'emotional-ai',
    title: 'Emotional Intelligence',
    description:
      'Recognizes user sentiment, tone, and facial cues to adapt responses with empathy and appropriate expressiveness.',
    icon: '🧠',
    details: [
      'Real-time sentiment analysis',
      'Micro-expression recognition (camera)',
      'Adaptive tone and pacing',
      'Empathetic response generation',
    ],
  },
  {
    id: 'brand-customization',
    title: 'Full Brand Customization',
    description:
      'Avatar appearance, voice, personality, and knowledge base tailored to your brand identity.',
    icon: '🎨',
    details: [
      'Custom 3D avatar modeling',
      'Voice cloning and personality tuning',
      'Brand-specific knowledge injection',
      'Persona guardrails and compliance',
    ],
  },
  {
    id: 'edge-deployment',
    title: 'Edge & Offline Deployment',
    description:
      'Runs on-premise or at the edge with GPU acceleration — no cloud dependency for core interaction.',
    icon: '⚡',
    details: [
      'NVIDIA Jetson / edge GPU support',
      'Offline-first architecture',
      '< 500MB model footprint',
      'Air-gapped deployment option',
    ],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics & Insights',
    description:
      'Real-time dashboard tracking engagement, sentiment, conversion, and conversation analytics.',
    icon: '📊',
    details: [
      'Interaction volume and duration',
      'Sentiment trends and topics',
      'Conversion funnel tracking',
      'A/B testing for personas',
    ],
  },
  {
    id: 'api-sdk',
    title: 'Developer API & SDKs',
    description:
      'Integrate digital humans into any application with REST API, WebSocket, and React/Unity SDKs.',
    icon: '🔌',
    details: [
      'REST API for session management',
      'WebSocket for real-time streaming',
      'React Three Fiber component library',
      'Unity/Unreal plugins for spatial',
    ],
  },
]
