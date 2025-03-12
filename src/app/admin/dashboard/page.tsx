'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  Users,
  FolderKanban,
  MessageSquare,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalProjects: number
  totalSkills: number
  totalExperiences: number
  totalMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
    totalMessages: 0,
  })

  useEffect(() => {
    // In a real app, fetch these stats from your API
    setStats({
      totalProjects: 12,
      totalSkills: 15,
      totalExperiences: 5,
      totalMessages: 8,
    })
  }, [])

  const cards = [
    {
      label: 'Skills',
      value: stats.totalSkills,
      icon: BarChart3,
      href: '/admin/skills',
      color: 'bg-blue-500',
    },
    {
      label: 'Projects',
      value: stats.totalProjects,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'bg-green-500',
    },
    {
      label: 'Experiences',
      value: stats.totalExperiences,
      icon: Users,
      href: '/admin/experiences',
      color: 'bg-purple-500',
    },
    {
      label: 'Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-yellow-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to your portfolio admin dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage your portfolio content and view statistics
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-full ${card.color} p-3`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-blue-500" />
          </Link>
        ))}
      </div>
    </div>
  )
} 