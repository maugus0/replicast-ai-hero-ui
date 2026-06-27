'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { siteConfig } from '@/content/siteConfig'

const basePath = siteConfig.basePath || ''
const MODEL_PATH = `${basePath}/models/Girl2/Meshy_AI_Open_Arms_biped_Meshy_AI_Meshy_Merged_Animations.glb`

interface Girl2AvatarProps {
  animation?: string
}

export function Girl2Avatar({ animation = 'Wave_for_Help_2' }: Girl2AvatarProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { mixer, actions } = useAnimations(animations, scene)
  const headRef = useRef<THREE.Bone | undefined>(undefined)
  const neckRef = useRef<THREE.Bone | undefined>(undefined)
  const spineRef = useRef<THREE.Bone | undefined>(undefined)
  const mousePosRef = useRef({ x: 0, y: 0 })

  // Find bones on mount
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = child as THREE.SkinnedMesh

        // Find bones from skeleton
        const bones = mesh.skeleton.bones
        for (const bone of bones) {
          const name = bone.name.toLowerCase()
          if (name === 'head') headRef.current = bone
          if (name === 'neck') neckRef.current = bone
          if (name === 'spine' || name === 'spine02') spineRef.current = bone
        }

        // Enable shadows but preserve original material colors
        mesh.castShadow = true
        mesh.receiveShadow = true

        // Ensure textures have correct color space for vibrant colors
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace
              mat.needsUpdate = true
            }
          })
        }
      }
    })

    // Fallback: search scene hierarchy for bones directly
    if (!headRef.current) {
      scene.traverse((child) => {
        if ((child as THREE.Bone).isBone) {
          const name = child.name.toLowerCase()
          if (name === 'head') headRef.current = child as THREE.Bone
          if (name === 'neck') neckRef.current = child as THREE.Bone
          if (name === 'spine' || name === 'spine02') spineRef.current = child as THREE.Bone
        }
      })
    }
  }, [scene])

  // Handle animation changes
  useEffect(() => {
    if (!actions) return

    // Stop all current actions with fade out
    Object.values(actions).forEach((action) => {
      if (action && action.isRunning()) {
        action.fadeOut(0.3)
      }
    })

    // Play the selected animation
    if (animation && actions[animation]) {
      actions[animation].reset().fadeIn(0.3).play()
    } else {
      // Fallback to first available animation
      const firstAction = Object.values(actions)[0]
      if (firstAction) {
        firstAction.reset().fadeIn(0.3).play()
      }
    }

    return () => {
      if (mixer) {
        mixer.stopAllAction()
      }
    }
  }, [actions, animation, mixer])

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      mousePosRef.current.x = (clientX / window.innerWidth) * 2 - 1
      mousePosRef.current.y = -(clientY / window.innerHeight) * 2 + 1
    }
    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY)
    }
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta)

    const time = state.clock.getElapsedTime()

    // Floating hover animation on the group
    if (group.current) {
      group.current.position.y = -1.0 + Math.sin(time * 0.8) * 0.03
    }

    // Head/neck tracking toward mouse
    const maxAngle = 0.4
    const smoothing = 0.08
    const targetX = mousePosRef.current.x * maxAngle
    const targetY = -mousePosRef.current.y * maxAngle * 0.5

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetX,
        smoothing
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetY,
        smoothing
      )
    }

    if (neckRef.current) {
      neckRef.current.rotation.y = THREE.MathUtils.lerp(
        neckRef.current.rotation.y,
        targetX * 0.3,
        smoothing
      )
      neckRef.current.rotation.x = THREE.MathUtils.lerp(
        neckRef.current.rotation.x,
        targetY * 0.3,
        smoothing
      )
    }

    // Subtle breathing on spine
    if (spineRef.current) {
      const breath = Math.sin(time * 0.5) * 0.01
      spineRef.current.rotation.x += breath * 0.02
    }
  })

  return (
    <group ref={group} position={[0, -1.0, 0]} scale={1.0}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
