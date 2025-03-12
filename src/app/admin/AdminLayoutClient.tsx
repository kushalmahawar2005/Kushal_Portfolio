'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, LayoutDashboard, Briefcase, GraduationCap, Code2, Mail, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  title: string
  href: string
  icon: any
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: Briefcase,
  },
  {
    title: 'Experience',
    href: '/admin/experience',
    icon: GraduationCap,
  },
  {
    title: 'Skills',
    href: '/admin/skills',
    icon: Code2,
  },
  {
    title: 'Messages',
    href: '/admin/messages',
    icon: Mail,
  },
]

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout } = useAuth()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-30 w-64 transform bg-white shadow-lg transition-transform dark:bg-gray-800 lg:sticky lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Admin Panel
          </span>
          <button
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
          <button
            onClick={logout}
            className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Admin Panel
            </span>
            <div className="w-6" /> {/* Spacer for centering */}
          </div>
        </header>
        <main className="container mx-auto p-6">{children}</main>
      </div>
    </div>
  )
} 