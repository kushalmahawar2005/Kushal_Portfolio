import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'kushalmahawar71@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Kbmbjy11'
const JWT_SECRET = process.env.JWT_SECRET || 'hi'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate credentials
    if (email !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const secret = new TextEncoder().encode(JWT_SECRET)
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    // Set cookie
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 