'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Server-verified auth check
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/status', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setIsAuthenticated(!!data.isAuthenticated)
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }
  }

  const logout = async () => {
    try {
  // Call API to clear httpOnly cookie
  await fetch('/api/admin/logout', { method: 'POST' })
      setIsAuthenticated(false)
      router.push('/admin/login')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 