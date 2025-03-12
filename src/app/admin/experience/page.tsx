'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string[]
  technologies: string[]
}

// Sample data (replace with your actual data source)
const initialExperiences: Experience[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'Tech Company',
    location: 'New York, NY',
    startDate: '2022-01',
    endDate: '2023-12',
    description: [
      'Developed and maintained web applications using React and Node.js',
      'Implemented responsive designs using Tailwind CSS',
      'Collaborated with cross-functional teams to deliver high-quality solutions',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
  },
]

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)

  const handleAddExperience = () => {
    // Implement experience creation logic
    console.log('Add experience')
  }

  const handleEditExperience = (id: string) => {
    // Implement experience editing logic
    console.log('Edit experience', id)
  }

  const handleDeleteExperience = (id: string) => {
    // Implement experience deletion logic
    console.log('Delete experience', id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your work experience
          </p>
        </div>
        <button
          onClick={handleAddExperience}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="group relative rounded-lg bg-white p-6 shadow dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {experience.title}
                </h3>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {experience.company} • {experience.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {experience.startDate} - {experience.endDate || 'Present'}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleEditExperience(experience.id)}
                  className="rounded-lg bg-white p-2 text-gray-600 shadow-md hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience.id)}
                  className="rounded-lg bg-white p-2 text-gray-600 shadow-md hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {experience.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 