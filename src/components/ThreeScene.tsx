'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create hologram frame
    const frameGeometry = new THREE.BoxGeometry(3, 4, 0.1)
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x4299e1,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4299e1,
      emissiveIntensity: 0.2
    })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    scene.add(frame)

    // Create hologram display
    const displayGeometry = new THREE.PlaneGeometry(2.8, 3.8)
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        texture: { value: null },
        hologramColor: { value: new THREE.Color(0x4299e1) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D texture;
        uniform vec3 hologramColor;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          // Create scanline effect
          float scanline = sin(vUv.y * 100.0 + time * 2.0) * 0.1 + 0.9;
          
          // Create hologram distortion
          float distortion = sin(vPosition.y * 10.0 + time) * 0.02;
          vec2 distortedUv = vUv + vec2(distortion, 0.0);
          
          // Create hologram color effect
          vec3 color = hologramColor * (0.5 + 0.5 * sin(time + vPosition.y * 2.0));
          
          // Add hologram noise
          float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
          
          // Combine effects
          vec3 finalColor = color * scanline * (0.8 + noise * 0.2);
          
          // Add hologram glow
          float glow = pow(1.0 - abs(vPosition.y), 2.0);
          finalColor += hologramColor * glow * 0.5;
          
          gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    // Create a placeholder texture using a data URL
    const placeholderTexture = new THREE.TextureLoader().load(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    )
    displayMaterial.uniforms.texture.value = placeholderTexture

    const display = new THREE.Mesh(displayGeometry, displayMaterial)
    display.position.z = 0.05 // Slightly in front of the frame
    scene.add(display)

    // Add hologram scan lines
    const scanlineGeometry = new THREE.PlaneGeometry(2.8, 0.02)
    const scanlineMaterial = new THREE.MeshBasicMaterial({
      color: 0x4299e1,
      transparent: true,
      opacity: 0.3
    })

    const scanlines: THREE.Mesh[] = []
    for (let i = 0; i < 20; i++) {
      const scanline = new THREE.Mesh(scanlineGeometry, scanlineMaterial)
      scanline.position.z = 0.06
      scanline.position.y = (i - 10) * 0.2
      scene.add(scanline)
      scanlines.push(scanline)
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0x4299e1, 1, 10)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0x48bb78, 1, 10)
    pointLight2.position.set(-5, -5, -5)
    scene.add(pointLight2)

    camera.position.z = 6

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      setMousePosition({ x, y })
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      timeRef.current += 0.01

      // Update hologram effects
      displayMaterial.uniforms.time.value = timeRef.current

      // Animate scan lines
      scanlines.forEach((scanline, i) => {
        scanline.position.y = (i - 10) * 0.2 + Math.sin(timeRef.current * 2 + i * 0.1) * 0.1
      })

      // Interactive camera movement
      camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.05
      camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Add subtle floating animation
      frame.position.y = Math.sin(timeRef.current) * 0.1
      display.position.y = Math.sin(timeRef.current) * 0.1

      renderer.render(scene, camera)
    }

    // Handle window resize
    const handleResize = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth
      const height = containerRef.current?.clientHeight || window.innerHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeEventListener('mousemove', handleMouseMove)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [mousePosition])

  return <div ref={containerRef} className="w-full h-full" />
}

export default ThreeScene
