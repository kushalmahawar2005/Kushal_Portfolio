'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

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
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-white transition-transform duration-300 dark:bg-gray-800 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/admin/dashboard"
            className="text-xl font-semibold text-gray-800 dark:text-white"
          >
            Admin Panel
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="space-y-1">
            <button className="flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-auto flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
} 