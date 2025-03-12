'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
}

// Sample data (replace with your actual data source)
const initialSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    category: 'Frontend',
    proficiency: 90,
  },
  {
    id: '2',
    name: 'Node.js',
    category: 'Backend',
    proficiency: 85,
  },
  {
    id: '3',
    name: 'TypeScript',
    category: 'Languages',
    proficiency: 88,
  },
]

const categories = ['Frontend', 'Backend', 'Languages', 'Tools', 'Other']

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)

  const handleAddSkill = () => {
    // Implement skill creation logic
    console.log('Add skill')
  }

  const handleEditSkill = (id: string) => {
    // Implement skill editing logic
    console.log('Edit skill', id)
  }

  const handleDeleteSkill = (id: string) => {
    // Implement skill deletion logic
    console.log('Delete skill', id)
  }

  const skillsByCategory = categories.reduce((acc, category) => {
    const categorySkills = skills.filter((skill) => skill.category === category)
    if (categorySkills.length > 0) {
      acc[category] = categorySkills
    }
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your technical skills
          </p>
        </div>
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category}>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="group relative rounded-lg bg-white p-4 shadow dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => handleEditSkill(skill.id)}
                        className="rounded-lg bg-white p-1.5 text-gray-600 shadow-md hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-blue-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="rounded-lg bg-white p-1.5 text-gray-600 shadow-md hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Proficiency: {skill.proficiency}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 