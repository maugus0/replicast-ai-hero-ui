'use client'

import { cn } from '@/lib/utils'

const specs = [
  {
    category: 'Voice & Language',
    items: [
      { spec: 'Latency (end-to-end)', value: '< 200ms' },
      { spec: 'Languages Supported', value: '50+' },
      { spec: 'ASR Accuracy (WER)', value: '< 5%' },
      { spec: 'TTS Quality (MOS)', value: '4.2+' },
      { spec: 'Concurrent Streams', value: '100+ per GPU' },
    ],
  },
  {
    category: 'Avatar & Rendering',
    items: [
      { spec: 'Model Format', value: 'GLTF 2.0 (PBR)' },
      { spec: 'Max Polygons', value: '~50k triangles' },
      { spec: 'Texture Resolution', value: '4K (head), 2K (body)' },
      { spec: 'Frame Rate', value: '60 FPS target' },
      { spec: 'Shader Features', value: 'Bloom, SSR, Subsurface' },
    ],
  },
  {
    category: 'Deployment',
    items: [
      { spec: 'Edge Hardware', value: 'NVIDIA Jetson Orin / A100' },
      { spec: 'Model Size', value: '< 500MB total' },
      { spec: 'Offline Operation', value: 'Full functionality' },
      { spec: 'OS Support', value: 'Linux, Windows, Android' },
      { spec: 'Container', value: 'Docker / K3s ready' },
    ],
  },
  {
    category: 'Integration',
    items: [
      { spec: 'API', value: 'REST + WebSocket' },
      { spec: 'SDKs', value: 'React, Unity, Unreal, Python' },
      { spec: 'Auth', value: 'OAuth 2.0, API Keys' },
      { spec: 'Webhooks', value: 'Events, Analytics, Logs' },
      { spec: 'Data Privacy', value: 'GDPR, HIPAA, SOC 2' },
    ],
  },
]

export function SpecsTable() {
  return (
    <div className="space-y-8">
      {specs.map((category) => (
        <div key={category.category} className="glass-card overflow-hidden rounded-2xl">
          <div className="border-b border-white/10 bg-white/5 px-6 py-4">
            <h3 className="holo-text text-lg font-semibold">{category.category}</h3>
          </div>
          <div className="divide-y divide-white/5">
            {category.items.map((item, itemIndex) => (
              <div
                key={item.spec}
                className={cn(
                  'grid grid-cols-1 px-6 py-4 transition-colors md:grid-cols-2',
                  itemIndex % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                )}
              >
                <div className="font-medium text-gray-400">{item.spec}</div>
                <div className="text-holo-cyan font-mono text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
