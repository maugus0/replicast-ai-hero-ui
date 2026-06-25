'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/avatar/scene.gltf'

interface TalkingAvatarProps {
  isSpeaking?: boolean
  amplitude?: number
  amplitudeRef?: React.MutableRefObject<number>
  onReady?: () => void
}

export function TalkingAvatar({ isSpeaking = false, amplitude = 0, amplitudeRef, onReady }: TalkingAvatarProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions, mixer } = useAnimations(animations, scene)
  const headRef = useRef<THREE.Bone>(null)
  const neckRef = useRef<THREE.Bone>(null)
  const spineRef = useRef<THREE.Bone>(null)
  const jawRef = useRef<THREE.Bone>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const clockRef = useRef(new THREE.Clock())
  const targetRotationRef = useRef(0)
  const jawAngleRef = useRef(0)
  const nodAngleRef = useRef(0)
  const eyeTargetRef = useRef({ x: 0, y: 0 })

  // Find bones and play idle animation
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Bone) {
        const name = child.name.toLowerCase()
        if (name.includes('head') && !name.includes('top')) headRef.current = child
        if (name.includes('neck')) neckRef.current = child
        if (name.includes('spine2') || name.includes('spine_2')) spineRef.current = child
        if (name.includes('jaw') || name.includes('mouth') || name.includes('chin')) {
          jawRef.current = child
        }
      }
    })

    // Also check through SkinnedMesh skeleton bones (more reliable)
    scene.traverse((child) => {
      if (child instanceof THREE.SkinnedMesh && child.skeleton) {
        for (const bone of child.skeleton.bones) {
          const name = bone.name.toLowerCase()
          if (name.includes('head') && !name.includes('top') && !headRef.current) headRef.current = bone
          if (name.includes('neck') && !neckRef.current) neckRef.current = bone
          if ((name.includes('spine2') || name.includes('spine_2')) && !spineRef.current) spineRef.current = bone
        }
      }
    })

    if (actions.idle) {
      actions.idle.play()
    } else if (Object.keys(actions).length > 0) {
      Object.values(actions)[0]?.play()
    }

    onReady?.()

    return () => {
      mixer?.stopAllAction()
    }
  }, [scene, actions, mixer, onReady])

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

  const config = {
    breathing: { enabled: true, speed: 1.2, intensity: 0.008 },
    eyeTracking: { enabled: true, maxAngle: 0.25 },
    jaw: { maxOpen: 0.5, smoothing: 0.15 },
  }

  useFrame((_, delta) => {
    const time = clockRef.current.getElapsedTime()

    // Update idle animation first
    mixer?.update(delta)

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

    // Lip sync: amplitude-driven jaw animation
    if (isSpeaking) {
      const effectiveAmplitude = amplitudeRef?.current ?? amplitude
      const targetOpen = effectiveAmplitude * config.jaw.maxOpen
      jawAngleRef.current = THREE.MathUtils.lerp(
        jawAngleRef.current,
        targetOpen,
        config.jaw.smoothing
      )

      if (jawRef.current) {
        jawRef.current.rotation.x = jawAngleRef.current
      } else {
        const scaleY = 1 - jawAngleRef.current * 0.06
        headRef.current?.scale.set(1, scaleY, 1)
      }

      // Subtle head nod synced with speech
      const nodTarget = effectiveAmplitude * 0.02
      nodAngleRef.current = THREE.MathUtils.lerp(
        nodAngleRef.current,
        Math.sin(time * 5) * nodTarget,
        0.1
      )
      if (headRef.current) {
        headRef.current.rotation.z = nodAngleRef.current
      }
    } else {
      // Smoothly close jaw when silent
      jawAngleRef.current = THREE.MathUtils.lerp(jawAngleRef.current, 0, 0.08)
      nodAngleRef.current = THREE.MathUtils.lerp(nodAngleRef.current, 0, 0.08)
      if (headRef.current) headRef.current.rotation.z = nodAngleRef.current
      if (jawRef.current) {
        jawRef.current.rotation.x = jawAngleRef.current
      } else {
        const scaleY = 1 - jawAngleRef.current * 0.06
        headRef.current?.scale.set(1, scaleY, 1)
      }
    }

    // Eye/head tracking — smooth mouse input separately from bone rotation
    if (config.eyeTracking.enabled) {
      const smooth = 0.08
      eyeTargetRef.current.x += (mousePosRef.current.x - eyeTargetRef.current.x) * smooth
      eyeTargetRef.current.y += (mousePosRef.current.y - eyeTargetRef.current.y) * smooth
      const mx = eyeTargetRef.current.x * config.eyeTracking.maxAngle
      const my = eyeTargetRef.current.y * config.eyeTracking.maxAngle * 0.5

      if (headRef.current) {
        headRef.current.rotation.y = mx
        headRef.current.rotation.x = -my
      }
      if (neckRef.current) {
        neckRef.current.rotation.y = mx * 0.5
        neckRef.current.rotation.x = -my * 0.5
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
