import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, allow all requests to pass through
  // In production, you would check for valid session here
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
