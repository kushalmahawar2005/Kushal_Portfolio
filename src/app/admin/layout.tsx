'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AdminLayoutClient from './AdminLayoutClient'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isLoginPage) {
        router.push('/admin/login')
      } else if (isAuthenticated && isLoginPage) {
        router.push('/admin/dashboard')
      }
    }
  }, [isAuthenticated, isLoginPage, router, isLoading])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

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