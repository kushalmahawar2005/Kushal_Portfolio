'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
}

// Sample data (replace with your actual data source)
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js and Tailwind CSS',
    image: '/projects/portfolio.png',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    demoUrl: 'https://portfolio.example.com',
    githubUrl: 'https://github.com/example/portfolio',
  },
]

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const handleAddProject = () => {
    // Implement project creation logic
    console.log('Add project')
  }

  const handleEditProject = (id: string) => {
    // Implement project editing logic
    console.log('Edit project', id)
  }

  const handleDeleteProject = (id: string) => {
    // Implement project deletion logic
    console.log('Delete project', id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => handleEditProject(project.id)}
                className="rounded-lg bg-white p-2 text-gray-600 shadow-md hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="rounded-lg bg-white p-2 text-gray-600 shadow-md hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 