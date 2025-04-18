'use client'
import { ThemeProvider } from '@/components/ThemeProvider'
import ParallaxBackground from '@/components/ParallaxBackground'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Reset scroll position on route change
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ThemeProvider>
      <ParallaxBackground />
      <main className="relative min-h-screen">
        {children}
      </main>
    </ThemeProvider>
  )
} 