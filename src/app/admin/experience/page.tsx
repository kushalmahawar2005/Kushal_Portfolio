'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  ArrowUpDown,
  X
} from 'lucide-react'

// Sample data - replace with your actual data
const experiences = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    startDate: '2022-01',
    endDate: 'Present',
    description: 'Leading frontend development team...',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    location: 'San Francisco, CA',
    startDate: '2020-06',
    endDate: '2021-12',
    description: 'Developed full stack applications...',
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'Web Developer',
    company: 'Digital Agency',
    location: 'Remote',
    startDate: '2019-01',
    endDate: '2020-05',
    description: 'Built responsive websites...',
    type: 'Contract',
  },
]

const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance']

export default function ExperiencePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortField, setSortField] = useState('startDate')
  const [sortDirection, setSortDirection] = useState('desc')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const [localExperiences, setLocalExperiences] = useState(experiences)

  // Filter and sort experiences
  const filteredExperiences = localExperiences
    .filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.company.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'All' || exp.type === selectedType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      if (sortField === 'startDate') {
        const dateA = a.startDate === 'Present' ? new Date() : new Date(a.startDate)
        const dateB = b.startDate === 'Present' ? new Date() : new Date(b.startDate)
        return direction * (dateA.getTime() - dateB.getTime())
      }
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

  const handleAddExperience = (newExperience: any) => {
    const experience = {
      id: localExperiences.length + 1,
      ...newExperience,
    }
    setLocalExperiences([experience, ...localExperiences])
  }

  const handleEditExperience = (experience: any) => {
    setSelectedExperience(experience)
    setIsEditModalOpen(true)
  }

  const handleUpdateExperience = (updatedExperience: any) => {
    setLocalExperiences(localExperiences.map(e => 
      e.id === updatedExperience.id ? updatedExperience : e
    ))
    setIsEditModalOpen(false)
    setSelectedExperience(null)
  }

  const handleDeleteExperience = (experienceId: number) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setLocalExperiences(localExperiences.filter(e => e.id !== experienceId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your work experience
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
              </div>

      {/* Experience Table */}
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
                Company
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('startDate')}
                >
                  Duration
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredExperiences.map((experience) => (
              <tr
                key={experience.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {experience.title}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {experience.company}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {experience.location}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {experience.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {experience.startDate} - {experience.endDate}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEditExperience(experience)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteExperience(experience.id)}
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

      {/* Add/Edit Experience Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <button
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
                setSelectedExperience(null)
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEditModalOpen ? 'Edit Experience' : 'Add New Experience'}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {isEditModalOpen 
                  ? 'Update your work experience details.'
                  : 'Add a new work experience to your portfolio.'}
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  defaultValue={selectedExperience?.title}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  defaultValue={selectedExperience?.company}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="e.g., Tech Corp"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  defaultValue={selectedExperience?.location}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="e.g., New York, NY"
                />
            </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Employment Type
                </label>
                <select
                  id="type"
                  defaultValue={selectedExperience?.type}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  {types.filter(t => t !== 'All').map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="month"
                    id="startDate"
                    defaultValue={selectedExperience?.startDate}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Date
                  </label>
                  <input
                    type="month"
                    id="endDate"
                    defaultValue={selectedExperience?.endDate === 'Present' ? '' : selectedExperience?.endDate}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Present"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  defaultValue={selectedExperience?.description}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Describe your responsibilities and achievements..."
                />
            </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setIsEditModalOpen(false)
                    setSelectedExperience(null)
                  }}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {isEditModalOpen ? 'Update Experience' : 'Add Experience'}
                </button>
            </div>
            </form>
          </div>
      </div>
      )}
    </div>
  )
} 