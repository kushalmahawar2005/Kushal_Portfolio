import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLayoutClient from './AdminLayoutClient'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const adminToken = cookieStore.get('admin_token')
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login'

  if (!adminToken && !isLoginPage) {
    redirect('/admin/login')
  }

  // If on login page, don't wrap with AdminLayoutClient
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Toaster position="top-right" />
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  )
} 