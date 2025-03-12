'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin/dashboard')
    } else {
      router.replace('/admin/login')
    }
  }, [isAuthenticated, router])

  return null
} 