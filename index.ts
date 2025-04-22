import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

interface User {
  id: string
  name: string
  isSharing: boolean
}

const users: Map<string, User> = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Add new user
  users.set(socket.id, {
    id: socket.id,
    name: `User ${socket.id.slice(0, 4)}`,
    isSharing: false
  })

  // Send current user list to all clients
  io.emit('userList', Array.from(users.values()))

  // Handle messages
  socket.on('message', (message) => {
    io.emit('message', message)
  })

  // Handle screen sharing
  socket.on('startSharing', () => {
    const user = users.get(socket.id)
    if (user) {
      user.isSharing = true
      users.set(socket.id, user)
      io.emit('userList', Array.from(users.values()))
    }
  })

  socket.on('stopSharing', () => {
    const user = users.get(socket.id)
    if (user) {
      user.isSharing = false
      users.set(socket.id, user)
      io.emit('userList', Array.from(users.values()))
    }
  })

  // Handle whiteboard drawing
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    users.delete(socket.id)
    io.emit('userList', Array.from(users.values()))
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
