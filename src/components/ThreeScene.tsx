'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const ParticleRing = () => {
  const points = Array.from({ length: 100 }, (_, i) => {
    const angle = (i / 100) * Math.PI * 2
    return [
      Math.cos(angle) * 3,
      Math.sin(angle) * 3,
      0
    ] as [number, number, number]
  })

  return (
    <group>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial color="#4299e1" />
        </mesh>
      ))}
    </group>
  )
}

const ThreeScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleRing />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}

export default ThreeScene 