'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AdminLayoutClient from './AdminLayoutClient'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoginPage, router])

  // Show nothing while checking authentication
  if (!isAuthenticated && !isLoginPage) {
    return null
  }

  // Show only children for login page
  if (isLoginPage) {
    return <>{children}</>
  }

  // Show admin layout with navigation for authenticated users
  return <AdminLayoutClient>{children}</AdminLayoutClient>
} 