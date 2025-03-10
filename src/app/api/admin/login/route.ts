import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // Use environment variable in production

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body

    // In a real application, you would verify against a database
    // This is just a simple example
    if (username === 'admin' && password === 'admin123') {
      // Create a JWT token
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      // Set the token in an HTTP-only cookie
      cookies().set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 // 1 hour
      })

      return NextResponse.json(
        { message: 'Login successful' },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 