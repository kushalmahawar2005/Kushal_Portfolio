import { useState, useEffect } from 'react'

interface PortfolioData {
  projects: any[]
  skills: any[]
  experience: any[]
  certificates: any[]
  messages: any[]
}

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>({
    projects: [],
    skills: [],
    experience: [],
    certificates: [],
    messages: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/portfolio')
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      setData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Add new item
  const addItem = async (type: keyof PortfolioData, itemData: any) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: itemData })
      })
      if (!response.ok) throw new Error('Failed to add item')
      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    }
  }

  // Update item
  const updateItem = async (type: keyof PortfolioData, id: number, itemData: any) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, data: itemData })
      })
      if (!response.ok) throw new Error('Failed to update item')
      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    }
  }

  // Delete item
  const deleteItem = async (type: keyof PortfolioData, id: number) => {
    try {
      const response = await fetch(`/api/portfolio?type=${type}&id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    fetchData,
    addItem,
    updateItem,
    deleteItem
  }
} 