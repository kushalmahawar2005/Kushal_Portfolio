import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'hi'

export async function GET() {
  try {
    const cookieStore = cookies()
    const adminToken = cookieStore.get('admin_token')

    if (!adminToken) {
      return NextResponse.json({ isAuthenticated: false })
    }

    const secret = new TextEncoder().encode(JWT_SECRET)
    await jwtVerify(adminToken.value, secret)
    return NextResponse.json({ isAuthenticated: true })
  } catch {
    return NextResponse.json({ isAuthenticated: false })
  }
}
