'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ARVR = () => {
  const [isARSupported, setIsARSupported] = useState(false)
  const [isVRActive, setIsVRActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    // Check for AR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported)
      })
    }

    // Initialize 3D scene
    if (containerRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      
      renderer.setSize(window.innerWidth, window.innerHeight)
      containerRef.current.appendChild(renderer.domElement)
      
      sceneRef.current = scene
      cameraRef.current = camera
      rendererRef.current = renderer

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(0, 1, 0)
      scene.add(directionalLight)

      // Load 3D models
      const loader = new GLTFLoader()
      loader.load('/models/project.glb', (gltf) => {
        scene.add(gltf.scene)
      })

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)
        if (sceneRef.current && cameraRef.current && rendererRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
      }
      animate()

      // Handle window resize
      const handleResize = () => {
        if (cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = window.innerWidth / window.innerHeight
          cameraRef.current.updateProjectionMatrix()
          rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        }
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (containerRef.current && rendererRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
      }
    }
  }, [])

  const startAR = async () => {
    if (navigator.xr) {
      try {
        const session = await navigator.xr.requestSession('immersive-ar')
        if (rendererRef.current) {
          rendererRef.current.xr.setReferenceSpaceType('local')
          await rendererRef.current.xr.setSession(session)
        }
      } catch (error) {
        console.error('AR session failed:', error)
      }
    }
  }

  const startVR = async () => {
    if (navigator.xr) {
      try {
        const session = await navigator.xr.requestSession('immersive-vr')
        if (rendererRef.current) {
          rendererRef.current.xr.setReferenceSpaceType('local')
          await rendererRef.current.xr.setSession(session)
          setIsVRActive(true)
        }
      } catch (error) {
        console.error('VR session failed:', error)
      }
    }
  }

  return (
    <div className="relative h-screen w-full">
      <div ref={containerRef} className="absolute inset-0" />
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        {isARSupported && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startAR}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold"
          >
            Start AR Experience
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startVR}
          className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold"
        >
          {isVRActive ? 'Exit VR' : 'Start VR Experience'}
        </motion.button>
      </div>

      {!isVRActive && (
        <div className="absolute top-8 left-8 text-white">
          <h2 className="text-2xl font-bold mb-2">AR/VR Project Viewer</h2>
          <p className="text-gray-300">Explore my projects in 3D space</p>
        </div>
      )}
    </div>
  )
}

export default ARVR 
