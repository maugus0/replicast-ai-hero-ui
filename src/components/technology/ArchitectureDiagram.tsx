'use client'

import { cn } from '@/lib/utils'

const layers = [
  {
    name: 'Interaction Layer',
    components: ['Voice Input (ASR)', 'Camera (Face/Expression)', 'Touch/ Gesture', 'Text Chat'],
    color: 'holo-cyan',
  },
  {
    name: 'Cognitive Core',
    components: [
      'LLM Orchestration',
      'Context & Memory',
      'Intent Classification',
      'Personality Engine',
    ],
    color: 'holo-purple',
  },
  {
    name: 'Expression Engine',
    components: [
      'TTS Synthesis (Piper)',
      'Viseme Mapping',
      'Emotion → Expression',
      'Gesture Generation',
    ],
    color: 'holo-pink',
  },
  {
    name: 'Render Pipeline',
    components: [
      'Three.js / WebGL',
      'GLTF Avatar',
      'Real-time Animation',
      'Post-processing (Bloom)',
    ],
    color: 'holo-cyan',
  },
  {
    name: 'Deployment',
    components: [
      'Edge GPU (Jetson)',
      'On-premise Server',
      'Cloud (Optional)',
      'Offline-first Cache',
    ],
    color: 'holo-purple',
  },
]

export function ArchitectureDiagram() {
  return (
    <div className="space-y-4" role="img" aria-label="Replicast AI Architecture Diagram">
      {layers.map((layer, index) => (
        <div
          key={layer.name}
          className={cn(
            'glass-card relative rounded-2xl border-l-4 p-6 transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]',
            `border-${layer.color}`
          )}
        >
          <div className="mb-4 flex items-center gap-4">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl',
                `bg-${layer.color}/20`
              )}
            >
              <span className={cn('text-lg font-bold', `text-${layer.color}`)}>{index + 1}</span>
            </div>
            <h3 className="text-xl font-bold">{layer.name}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {layer.components.map((comp, i) => (
              <span
                key={i}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                  `bg-${layer.color}/10 text-${layer.color} border border-${layer.color}/30`
                )}
              >
                {comp}
              </span>
            ))}
          </div>
          {index < layers.length - 1 && (
            <div
              className="to-holo-cyan/50 absolute -bottom-4 left-6 h-4 w-1 bg-gradient-to-b from-transparent"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  )
}
