'use client'

import { useTheme } from '@/components/ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'light'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Sun className="h-5 w-5" />
            Light
          </button>
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Moon className="h-5 w-5" />
            Dark
          </button>
        </div>
      </div>
    </div>
  )
} 