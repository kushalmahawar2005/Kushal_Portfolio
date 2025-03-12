import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname === '/admin/login'

  // If trying to access admin paths without token, redirect to login
  if (isAdminPath && !adminToken && !isLoginPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (isLoginPath && adminToken) {
    try {
      // Verify JWT token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')
      await jwtVerify(adminToken.value, secret)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } catch {
      // If token is invalid, clear it and continue to login page
      const response = NextResponse.next()
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/admin/:path*',
} 