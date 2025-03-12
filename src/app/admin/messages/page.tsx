'use client'

import { useState } from 'react'
import { Trash2, Mail, ExternalLink } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'Hi, I would like to discuss a potential project with you...',
      createdAt: new Date().toISOString(),
      read: false,
    },
    // Add more initial messages as needed
  ])

  const handleDelete = async (id: number) => {
    try {
      // In a real app, make an API call to delete the message
      setMessages(messages.filter(msg => msg.id !== id))
      toast.success('Message deleted successfully')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      // In a real app, make an API call to update the message
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ))
      toast.success('Message marked as read')
    } catch (error) {
      toast.error('Failed to update message')
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          View and manage contact form submissions
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 ${
              message.read
                ? 'border-gray-200 dark:border-gray-700'
                : 'border-blue-500 dark:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {message.subject}
                  </h3>
                  {!message.read && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  From: {message.name} ({message.email})
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(message.createdAt)}
                </p>
              </div>
              <div className="flex space-x-2">
                <a
                  href={`mailto:${message.email}`}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                {message.message}
              </p>
            </div>
            {!message.read && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleMarkAsRead(message.id)}
                  className="text-sm text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Mark as read
                </button>
              </div>
            )}
          </div>
        ))}

        {messages.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No messages
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven't received any messages yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 