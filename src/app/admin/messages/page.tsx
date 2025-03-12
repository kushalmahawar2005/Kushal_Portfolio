'use client'

import { useState } from 'react'
import { Mail, Trash2, Check, X } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  read: boolean
}

// Sample data (replace with your actual data source)
const initialMessages: Message[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hi, I would like to discuss a potential project with you.',
    createdAt: '2024-03-15T10:30:00Z',
    read: false,
  },
]

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleMarkAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, read: true } : message
      )
    )
  }

  const handleDelete = (id: string) => {
    // Implement message deletion logic
    console.log('Delete message', id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          View and manage contact form messages
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center dark:bg-gray-800">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No messages
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven't received any messages yet
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`group relative rounded-lg bg-white p-6 shadow transition-colors dark:bg-gray-800 ${
                message.read ? 'bg-gray-50 dark:bg-gray-800/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{message.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {!message.read && (
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="rounded-lg bg-white p-2 text-gray-600 shadow-md hover:text-green-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-green-500"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="rounded-lg bg-white p-2 text-gray-600 shadow-md hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-red-500"
                    title="Delete message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {message.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 