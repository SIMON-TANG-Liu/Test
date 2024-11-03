import type { MiddlewareConfig, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 重定向 /homepage/:username -> /@:username，只有在 /homepage/:username 路由上匹配，子路由不匹配
  if (request.nextUrl.pathname.startsWith('/homepage/')) {
    const ps = request.nextUrl.pathname.split('/')
    if (ps.length === 3) {
      return NextResponse.redirect(new URL(`/@${ps[2]}`, request.url))
    }
  }
  // 重写 /@:username -> /homepage/:username，只匹配 /@:username 路由，子路由不匹配
  if (request.nextUrl.pathname.startsWith('/@')) {
    const [, username, path] = request.nextUrl.pathname.match(/^\/@([^\/]+)(.*)$/) || []
    // 注意需要携带 search 参数
    if (!path) {
      return NextResponse.rewrite(new URL(`/homepage/${username}${path}${request.nextUrl.search}`, request.url))
    }
  }
  // 重定向 /login -> /login/phone
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/login/phone', request.url))
  }
}

export const config: MiddlewareConfig = {
  matcher: ['/homepage/:path*', '/@:username/:path*', '/login/:path*']
}
