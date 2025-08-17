'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Trash, 
  Eye,
  ArrowUpDown,
  X,
  Mail
} from 'lucide-react'

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [localMessages, setLocalMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/contact')
        if (!res.ok) throw new Error('Failed to fetch messages')
        const data = await res.json()
        setLocalMessages(data)
      } catch (err: any) {
        setError(err.message || 'Error fetching messages')
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  // Filter and sort messages
  const filteredMessages = localMessages
    .filter(msg => {
      const matchesSearch = 
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      if (sortField === 'date') {
        return direction * (new Date(a.date).getTime() - new Date(b.date).getTime())
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

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message)
    setIsViewModalOpen(true)
    // Mark as read
    setLocalMessages(localMessages.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    ))
    // Persist read state
    fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: message.id, read: true })
    }).catch(() => {})
  }

  const handleDeleteMessage = async (messageId: number) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    const prev = localMessages
    setLocalMessages(localMessages.filter(m => m.id !== messageId))
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageId })
      })
      if (!res.ok) throw new Error('Failed')
    } catch {
      // revert on failure
      setLocalMessages(prev)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your contact form messages
        </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {localMessages.filter(m => !m.read).length} unread
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
          </div>

      {/* Messages Table */}
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
                  onClick={() => handleSort('name')}
                >
                  From
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('date')}
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
            {filteredMessages.map((message) => (
              <tr
              key={message.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  !message.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {message.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {message.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {message.subject}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(message.date).toLocaleDateString()}
                </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleViewMessage(message)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  <button
                      onClick={() => handleDeleteMessage(message.id)}
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

      {/* View Message Modal */}
      {isViewModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <button
              onClick={() => {
                setIsViewModalOpen(false)
                setSelectedMessage(null)
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedMessage.subject}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{selectedMessage.name}</span>
                <span>•</span>
                <span>{selectedMessage.email}</span>
                <span>•</span>
                <span>{new Date(selectedMessage.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                {selectedMessage.message}
                </p>
              </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setIsViewModalOpen(false)
                  setSelectedMessage(null)
                }}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  )
} 