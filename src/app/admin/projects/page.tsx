'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye,
  ArrowUpDown,
  X
} from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import AddProjectModal from './AddProjectModal'

export default function ProjectsPage() {
  const { data, loading, error, addItem, updateItem, deleteItem } = usePortfolio()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortField, setSortField] = useState('title')
  const [sortDirection, setSortDirection] = useState('asc')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Filter and sort projects
  const filteredProjects = data.projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      return direction * (a[sortField as keyof typeof a] > b[sortField as keyof typeof b] ? 1 : -1)
    })

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleAddProject = async (projectData: any) => {
    const success = await addItem('projects', projectData)
    if (success) {
      setIsAddModalOpen(false)
    }
  }

  const handleEditProject = (project: any) => {
    setSelectedProject(project)
    setIsEditModalOpen(true)
  }

  const handleUpdateProject = async (projectData: any) => {
    const success = await updateItem('projects', selectedProject.id, projectData)
    if (success) {
      setIsEditModalOpen(false)
      setSelectedProject(null)
    }
  }

  const handleDeleteProject = async (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteItem('projects', projectId)
    }
  }

  const handleViewProject = (project: any) => {
    window.open(project.demoUrl, '_blank')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Categories</option>
            <option value="Major">Major Projects</option>
            <option value="Minor">Minor Projects</option>
          </select>
        </div>
            </div>

      {/* Projects Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('title')}
                >
                  Title
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('createdAt')}
                >
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                {project.title}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {project.category}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    project.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
              </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleViewProject(project)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
              <button
                      onClick={() => handleEditProject(project)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                      <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                      <Trash className="h-4 w-4" />
              </button>
            </div>
                </td>
              </tr>
        ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedProject(null)
        }}
        onSubmit={isEditModalOpen ? handleUpdateProject : handleAddProject}
        initialData={selectedProject}
      />
    </div>
  )
} 