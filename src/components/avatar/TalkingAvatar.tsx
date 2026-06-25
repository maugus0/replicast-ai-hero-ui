'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { siteConfig } from '@/content/siteConfig'

const basePath = siteConfig.basePath || ''
const MODEL_PATH = `${basePath}/models/avatar/scene.gltf`

interface TalkingAvatarProps {
  isSpeaking?: boolean
  onReady?: () => void
}

export function TalkingAvatar({ isSpeaking = false, onReady }: TalkingAvatarProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions } = useAnimations(animations, scene)
  const mixerRef = useRef<THREE.AnimationMixer | undefined>(undefined)
  const headRef = useRef<THREE.Bone | undefined>(undefined)
  const neckRef = useRef<THREE.Bone | undefined>(undefined)
  const spineRef = useRef<THREE.Bone | undefined>(undefined)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef(0)

  // Find bones and setup animations
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Bone) {
        const name = child.name.toLowerCase()
        if (name.includes('head') && !name.includes('top')) headRef.current = child
        if (name.includes('neck')) neckRef.current = child
        if (name.includes('spine2') || name.includes('spine_2')) spineRef.current = child
      }
    })

    const mixer = new THREE.AnimationMixer(scene)
    mixerRef.current = mixer

    // Play idle animation
    if (actions.idle) {
      actions.idle.play()
    } else if (Object.keys(actions).length > 0) {
      Object.values(actions)[0]?.play()
    }

    onReady?.()

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
        mixerRef.current.uncacheRoot(scene)
      }
    }
  }, [scene, actions, onReady])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePosRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Button rotation handler
  useEffect(() => {
    const handleButtonRotate = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: string }>
      const rotationAmount = customEvent.detail.direction === 'left' ? -0.4 : 0.4
      targetRotationRef.current += rotationAmount
    }
    window.addEventListener('rotateTalkingModel', handleButtonRotate)
    return () => window.removeEventListener('rotateTalkingModel', handleButtonRotate)
  }, [])

  // Animation config
  const config = {
    breathing: { enabled: true, speed: 1.2, intensity: 0.008 },
    eyeTracking: { enabled: true, maxAngle: 0.25, smoothing: 0.08 },
  }

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    if (mixerRef.current) mixerRef.current.update(delta)

    // Manual rotation from arrows
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationRef.current,
        0.1
      )
    }

    // Breathing animation
    if (config.breathing.enabled) {
      const breath = Math.sin(time * config.breathing.speed) * config.breathing.intensity
      scene.scale.setScalar(1 + breath * 0.5)
      if (spineRef.current) {
        spineRef.current.rotation.x = breath * 0.05
      }
    }

    // Speaking animation
    if (isSpeaking && spineRef.current) {
      const speakMove = Math.sin(time * 6) * 0.02
      spineRef.current.rotation.x += speakMove
    }

    // Eye/head tracking
    if (config.eyeTracking.enabled) {
      const mx = mousePosRef.current.x * config.eyeTracking.maxAngle
      const my = mousePosRef.current.y * config.eyeTracking.maxAngle * 0.5

      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          mx,
          config.eyeTracking.smoothing
        )
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          -my,
          config.eyeTracking.smoothing
        )
      }
      if (neckRef.current) {
        neckRef.current.rotation.y = THREE.MathUtils.lerp(
          neckRef.current.rotation.y,
          mx * 0.5,
          config.eyeTracking.smoothing
        )
        neckRef.current.rotation.x = THREE.MathUtils.lerp(
          neckRef.current.rotation.x,
          -my * 0.5,
          config.eyeTracking.smoothing
        )
      }
    }
  })

  return (
    <group ref={group} position={[0, -0.85, 0]} scale={1.0}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
