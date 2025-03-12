'use client' // Ensure it's a client component

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'

const ParticleRing = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const points = Array.from({ length: 100 }, (_, i) => {
    const angle = (i / 100) * Math.PI * 2
    return [Math.cos(angle) * 3, Math.sin(angle) * 3, 0] as [number, number, number]
  })

  return (
    <group>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#4299e1" />
        </mesh>
      ))}
    </group>
  )
}

const ThreeScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <ParticleRing />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeScene;
