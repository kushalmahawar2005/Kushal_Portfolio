'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { io, Socket } from 'socket.io-client'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
}

interface User {
  id: string
  name: string
  isSharing: boolean
}

const Collaboration = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSharing, setIsSharing] = useState(false)
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:3001')

    socketRef.current.on('connect', () => {
      console.log('Connected to collaboration server')
    })

    socketRef.current.on('message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    socketRef.current.on('userList', (userList: User[]) => {
      setUsers(userList)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsSharing(true)
        socketRef.current?.emit('startSharing')
      }
    } catch (error) {
      console.error('Error sharing screen:', error)
    }
  }

  const stopScreenShare = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsSharing(false)
      socketRef.current?.emit('stopSharing')
    }
  }

  const sendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date()
      }
      socketRef.current.emit('message', message)
      setNewMessage('')
    }
  }

  const startWhiteboard = () => {
    setIsWhiteboardActive(true)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isWhiteboardActive || !canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (drawing) {
      ctx.beginPath()
      ctx.moveTo(lastPoint.x, lastPoint.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    setLastPoint({ x, y })
  }

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* Chat Section */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Live Chat</h2>
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map(message => (
              <div key={message.id} className="mb-2">
                <span className="text-blue-400">{message.sender}: </span>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-gray-700 rounded px-3 py-2"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>

        {/* Screen Share Section */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Screen Share</h2>
          <div className="flex-1 bg-gray-700 rounded mb-4 overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              autoPlay
              muted
            />
          </div>
          <button
            onClick={isSharing ? stopScreenShare : startScreenShare}
            className={`px-4 py-2 rounded ${
              isSharing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isSharing ? 'Stop Sharing' : 'Start Sharing'}
          </button>
        </div>

        {/* Whiteboard Section */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Collaborative Whiteboard</h2>
          <div className="flex-1 bg-gray-700 rounded mb-4 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              onMouseDown={() => setDrawing(true)}
              onMouseUp={() => setDrawing(false)}
              onMouseMove={draw}
              onMouseLeave={() => setDrawing(false)}
            />
          </div>
          <button
            onClick={() => setIsWhiteboardActive(!isWhiteboardActive)}
            className={`px-4 py-2 rounded ${
              isWhiteboardActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isWhiteboardActive ? 'Disable Whiteboard' : 'Enable Whiteboard'}
          </button>
        </div>
      </div>

      {/* Online Users */}
      <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-4">
        <h3 className="font-bold mb-2">Online Users ({users.length})</h3>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{user.name}</span>
              {user.isSharing && <span className="text-blue-400">(Sharing)</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collaboration 
