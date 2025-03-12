'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Skill {
  id: number
  name: string
  level: number
  category: string
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'React', level: 90, category: 'Frontend' },
    { id: 2, name: 'Node.js', level: 85, category: 'Backend' },
    // Add more initial skills as needed
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const handleDelete = async (id: number) => {
    try {
      // In a real app, make an API call to delete the skill
      setSkills(skills.filter(skill => skill.id !== id))
      toast.success('Skill deleted successfully')
    } catch (error) {
      toast.error('Failed to delete skill')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your skills and expertise
          </p>
        </div>
        <button
          onClick={() => {
            setEditingSkill(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Level
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.category}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="w-full max-w-xs">
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingSkill(skill)
                      setIsModalOpen(true)
                    }}
                    className="mr-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 