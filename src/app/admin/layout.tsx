'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/skills', label: 'Skills', icon: '🎯' },
  { href: '/admin/messages', label: 'Messages', icon: '📨' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <motion.nav
        initial={false}
        animate={{ width: isCollapsed ? 80 : 250 }}
        className="fixed top-0 left-0 h-full bg-gray-800 text-white p-4 flex flex-col"
      >
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <span className="ml-3">{item.label}</span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href="/"
            className="flex items-center p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
          >
            <span className="text-xl">🏠</span>
            {!isCollapsed && <span className="ml-3">Back to Site</span>}
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all ${
          isCollapsed ? 'ml-20' : 'ml-64'
        } p-8`}
      >
        {children}
      </main>
    </div>
  )
} 