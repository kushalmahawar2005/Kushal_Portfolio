'use client'
import { motion } from 'framer-motion'

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 p-6 rounded-xl"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </motion.div>
)

const RecentActivity = () => (
  <div className="bg-gray-800 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {[
        { action: 'New message received', time: '2 minutes ago', icon: '📨' },
        { action: 'Project updated', time: '1 hour ago', icon: '💼' },
        { action: 'Skill added', time: '3 hours ago', icon: '🎯' },
      ].map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span className="text-2xl">{activity.icon}</span>
          <div>
            <p className="font-medium">{activity.action}</p>
            <p className="text-sm text-gray-400">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Data
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={12} icon="💼" />
        <StatCard title="Total Skills" value={24} icon="🎯" />
        <StatCard title="Unread Messages" value={5} icon="📨" />
        <StatCard title="Page Views" value="1.2K" icon="👁️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Project', icon: '➕' },
              { label: 'Add Skill', icon: '🎯' },
              { label: 'View Messages', icon: '📨' },
              { label: 'Update Profile', icon: '👤' },
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <span className="text-xl">{action.icon}</span>
                <span>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 