'use client'

import { LayoutDashboard, Briefcase, GraduationCap, Code2, Mail } from 'lucide-react'
import Link from 'next/link'

interface DashboardCard {
  title: string
  description: string
  href: string
  icon: any
  color: string
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Projects',
    description: 'Manage your portfolio projects',
    href: '/admin/projects',
    icon: Briefcase,
    color: 'bg-blue-500',
  },
  {
    title: 'Experience',
    description: 'Update your work experience',
    href: '/admin/experience',
    icon: GraduationCap,
    color: 'bg-green-500',
  },
  {
    title: 'Skills',
    description: 'Edit your technical skills',
    href: '/admin/skills',
    icon: Code2,
    color: 'bg-purple-500',
  },
  {
    title: 'Messages',
    description: 'View contact form messages',
    href: '/admin/messages',
    icon: Mail,
    color: 'bg-yellow-500',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Welcome to your admin dashboard. Manage your portfolio content from here.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block space-y-1.5 rounded-lg bg-white p-6 shadow transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`rounded-lg p-2 ${card.color} bg-opacity-10 group-hover:bg-opacity-20`}
              >
                <card.icon className={`h-6 w-6 ${card.color} text-opacity-90`} />
              </div>
              <h2 className="font-semibold text-gray-900 dark:text-white">{card.title}</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
} 