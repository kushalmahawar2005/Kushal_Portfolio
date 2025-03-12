'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Experience {
  id: number
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      current: true,
      description: [
        'Led a team of 5 developers in building a modern web application',
        'Improved application performance by 40% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
    },
    // Add more initial experiences as needed
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const handleDelete = async (id: number) => {
    try {
      // In a real app, make an API call to delete the experience
      setExperiences(experiences.filter(exp => exp.id !== id))
      toast.success('Experience deleted successfully')
    } catch (error) {
      toast.error('Failed to delete experience')
    }
  }

  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experiences</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your work experiences
          </p>
        </div>
        <button
          onClick={() => {
            setEditingExperience(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {experience.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {experience.company} • {experience.location}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(experience.startDate)} -{' '}
                  {experience.current ? 'Present' : formatDate(experience.endDate!)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingExperience(experience)
                    setIsModalOpen(true)
                  }}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {experience.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
} 