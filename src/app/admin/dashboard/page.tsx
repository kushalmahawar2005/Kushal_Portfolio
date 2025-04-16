'use client'

import { 
  FolderKanban, 
  MessageSquare, 
  Code2, 
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Eye
} from 'lucide-react'

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: FolderKanban,
  },
  {
    name: 'Active Skills',
    value: '24',
    change: '+4',
    changeType: 'increase',
    icon: Code2,
  },
  {
    name: 'Experience Years',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: Briefcase,
  },
  {
    name: 'Messages',
    value: '48',
    change: '-12',
    changeType: 'decrease',
    icon: MessageSquare,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'project',
    title: 'New Project Added',
    description: 'E-commerce Website with React and Node.js',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    description: 'From: John Doe - Project Inquiry',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'skill',
    title: 'Skill Updated',
    description: 'Added: Next.js 14 and TypeScript',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'experience',
    title: 'Experience Updated',
    description: 'Added: Senior Developer Role',
    time: '2 days ago',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/50">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="rounded-full bg-blue-50 p-2 dark:bg-blue-900/50">
                {activity.type === 'project' && (
                  <FolderKanban className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
                {activity.type === 'message' && (
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
                {activity.type === 'skill' && (
                  <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
                {activity.type === 'experience' && (
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Views
            </h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900 dark:text-white">
                1,234
              </span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                views this month
              </span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                style={{ width: '75%' }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contact Requests
            </h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900 dark:text-white">
                48
              </span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                requests this month
              </span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded-full bg-green-600 dark:bg-green-500"
                style={{ width: '60%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 