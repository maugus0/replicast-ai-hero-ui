'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { siteConfig } from '@/content/siteConfig'
import { avatarConfig } from '@/content/avatar'

const basePath = siteConfig.basePath || ''
const MODEL_PATH = `${basePath}/models/avatar/scene.gltf`

interface TalkingAvatarProps {
  isSpeaking?: boolean
  onReady?: () => void
}

export function TalkingAvatar({ isSpeaking = false, onReady }: TalkingAvatarProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { mixer } = useAnimations(animations, scene)
  const headRef = useRef<THREE.Bone | undefined>(undefined)
  const neckRef = useRef<THREE.Bone | undefined>(undefined)
  const spineRef = useRef<THREE.Bone | undefined>(undefined)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef(0)

  const eyeTracking = avatarConfig.idleAnimations.eyeTracking

  useEffect(() => {
    // Find bones from skeleton
    // Find bones from skeleton (primary)
    scene.traverse((child) => {
      if ((child as any).isSkinnedMesh) {
        const bones = (child as THREE.SkinnedMesh).skeleton.bones
        for (const bone of bones) {
          const name = bone.name.toLowerCase()
          if (name.includes('head') && !name.includes('top')) headRef.current = bone
          if (name.includes('neck')) neckRef.current = bone
          if (name.includes('spine2') || name.includes('spine_2')) spineRef.current = bone
        }
      }
    })
    // Fallback: search scene hierarchy for bones directly
    if (!headRef.current) {
      scene.traverse((child) => {
        if ((child as any).isBone) {
          const name = child.name.toLowerCase()
          if (name.includes('head') && !name.includes('top')) headRef.current = child as THREE.Bone
          if (name.includes('neck')) neckRef.current = child as THREE.Bone
          if (name.includes('spine2') || name.includes('spine_2')) spineRef.current = child as THREE.Bone
        }
      })
    }

    // Play idle animation with neck tracks removed to prevent conflict with head tracking
    const idleClip = THREE.AnimationClip.findByName(animations, 'idle') || animations[0]
    if (idleClip && mixer) {
      const cleanClip = idleClip.clone()
      cleanClip.tracks = cleanClip.tracks.filter(
        (track) => !track.name.toLowerCase().includes('neck')
      )
      const idleAction = mixer.clipAction(cleanClip)
      idleAction.play()
    }

    onReady?.()

    return () => {
      if (mixer) {
        mixer.stopAllAction()
      }
    }
  }, [scene, mixer, onReady])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePosRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleButtonRotate = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: string }>
      const rotationAmount = customEvent.detail.direction === 'left' ? -0.4 : 0.4
      targetRotationRef.current += rotationAmount
    }
    window.addEventListener('rotateTalkingModel', handleButtonRotate)
    return () => window.removeEventListener('rotateTalkingModel', handleButtonRotate)
  }, [])

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta)

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationRef.current,
        0.1
      )
    }

    if (eyeTracking.enabled) {
      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          mousePosRef.current.x * eyeTracking.maxAngle,
          eyeTracking.smoothing
        )
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          mousePosRef.current.y * eyeTracking.maxAngle * 0.5,
          eyeTracking.smoothing
        )
      }

      if (neckRef.current) {
        neckRef.current.rotation.y = THREE.MathUtils.lerp(
          neckRef.current.rotation.y,
          mousePosRef.current.x * eyeTracking.maxAngle * 0.3,
          eyeTracking.smoothing
        )
        neckRef.current.rotation.x = THREE.MathUtils.lerp(
          neckRef.current.rotation.x,
          mousePosRef.current.y * eyeTracking.maxAngle * 0.15,
          eyeTracking.smoothing
        )
      }
    }

    if (spineRef.current) {
      const breath = Math.sin(state.clock.getElapsedTime() * avatarConfig.idleAnimations.breathing.speed) * avatarConfig.idleAnimations.breathing.intensity
      spineRef.current.rotation.x = breath * 0.05
      if (isSpeaking) {
        spineRef.current.rotation.x += Math.sin(state.clock.getElapsedTime() * 6) * 0.02
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
