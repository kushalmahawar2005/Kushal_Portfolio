import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  if (path === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value || ''
  
  if (!token && path.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  return NextResponse.next()
}

// Configure matcher
export const config = {
  matcher: ['/admin/:path*']
} 