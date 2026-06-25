'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'

// Marina model and textures
const MODEL_PATH = '/models/Marina/uploads_files_2460380_Marina_1276.obj'
const TEXTURE_PATH = '/models/Marina/Marina_1276_Textures/'

export function HolographicAvatar() {
  const loadedObj = useLoader(OBJLoader, MODEL_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, rotationY: 0 })
  const targetRotationRef = useRef(0)
  const velocityRef = useRef(0)

  // Clone the object to avoid shared state issues
  const obj = useMemo(() => loadedObj.clone(), [loadedObj])

  // Calculate model dimensions - significantly larger
  const modelConfig = useMemo(() => {
    const box = new THREE.Box3().setFromObject(obj)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // Scale to make model ~2.5 units tall
    const targetHeight = 2.5
    const scale = targetHeight / size.y
    const scaledCenterY = center.y * scale

    return {
      scale,
      offsetY: -scaledCenterY,
    }
  }, [obj])

  // Apply high-quality textures for natural, lifelike appearance
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    const diffuseMap = textureLoader.load(`${TEXTURE_PATH}Marina_1276_DIFF.jpg`)
    const normalMap = textureLoader.load(`${TEXTURE_PATH}Marina_1276_NORM.png`)

    // OBJ models need flipped Y on textures
    diffuseMap.colorSpace = THREE.SRGBColorSpace
    diffuseMap.flipY = true
    normalMap.flipY = true

    // Higher quality texture filtering
    diffuseMap.anisotropy = 16
    normalMap.anisotropy = 16

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        // More matte material - no shine/reflections for natural look
        child.material = new THREE.MeshStandardMaterial({
          map: diffuseMap,
          normalMap: normalMap,
          normalScale: new THREE.Vector2(0.8, 0.8),
          roughness: 0.95, // Very matte, no shine
          metalness: 0, // No metallic reflection
          envMapIntensity: 0,
        })
      }
    })
  }, [obj])

  // Mouse/touch drag for full 360° rotation
  useEffect(() => {
    const handleStart = (clientX: number) => {
      setIsDragging(true)
      dragStartRef.current = {
        x: clientX,
        rotationY: targetRotationRef.current,
      }
      velocityRef.current = 0
    }

    const handleMove = (clientX: number) => {
      if (!isDragging) return
      const deltaX = clientX - dragStartRef.current.x
      targetRotationRef.current = dragStartRef.current.rotationY + deltaX * 0.01
      velocityRef.current = deltaX * 0.0002
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    // Button rotation handler
    const handleButtonRotate = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: string }>
      const rotationAmount = customEvent.detail.direction === 'left' ? -0.5 : 0.5
      targetRotationRef.current += rotationAmount
    }

    // Mouse events
    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX)
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onMouseUp = () => handleEnd()

    // Touch events
    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
    const onTouchEnd = () => handleEnd()

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('rotateModel', handleButtonRotate)

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('rotateModel', handleButtonRotate)
    }
  }, [isDragging])

  useFrame(() => {
    if (groupRef.current) {
      // Apply momentum when not dragging
      if (!isDragging) {
        targetRotationRef.current += velocityRef.current
        velocityRef.current *= 0.98 // Friction decay
      }

      // Smooth rotation interpolation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationRef.current,
        isDragging ? 0.3 : 0.1
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, modelConfig.offsetY, 0]}>
      <primitive object={obj} scale={modelConfig.scale} />
    </group>
  )
}
