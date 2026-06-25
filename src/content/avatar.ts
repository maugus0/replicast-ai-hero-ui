export const avatarConfig = {
  modelPath: '/models/avatar/scene.gltf',
  idleAnimations: {
    breathing: {
      enabled: true,
      speed: 0.3,
      intensity: 0.01,
    },
    blinking: {
      enabled: false,
      minInterval: 3,
      maxInterval: 8,
      duration: 0.15,
    },
    microDrift: {
      enabled: true,
      speed: 0.1,
      rotationRange: 0.008,
      positionRange: 0.003,
    },
    eyeTracking: {
      enabled: true,
      smoothing: 0.05,
      maxAngle: 0.15,
    },
  },
  defaultVoice: 'lessac',
  voices: {
    lessac: {
      id: 'lessac',
      label: 'Lessac (Male, Clear)',
      speakerId: 0,
    },
    amy: {
      id: 'amy',
      label: 'Amy (Female, Natural)',
      speakerId: 0,
    },
  },
  demoTexts: [
    'Welcome to Replicast AI. I am a holographic digital human powered by artificial intelligence.',
    'I can speak in multiple languages and adapt to any brand personality.',
    'Imagine me as your 24/7 customer service representative, never sleeping, always helpful.',
    'From retail to healthcare, I bring human-like interaction to any industry.',
  ],
}

export type AvatarConfig = typeof avatarConfig
