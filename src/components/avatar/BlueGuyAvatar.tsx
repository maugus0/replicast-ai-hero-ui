'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { siteConfig } from '@/content/siteConfig'

const basePath = siteConfig.basePath || ''
const MODEL_PATH = `${basePath}/models/blueguy/Meshy_AI_Blue_Shirt_Portrait_0626111650_texture.glb`

export function BlueGuyAvatar() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)
  const mousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePosRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.getElapsedTime()

    group.current.position.y = Math.sin(time * 0.8) * 0.03

    const targetY = -Math.PI / 6 + mousePosRef.current.x * 0.15
    const targetX = mousePosRef.current.y * 0.1

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.05
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.05
    )
  })

  return (
    <group ref={group} rotation={[0, -Math.PI / 6, 0]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
