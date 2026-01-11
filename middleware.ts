import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get("tinto_admin")
  const path = req.nextUrl.pathname

  // Protect all admin routes except login
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    if (!isAdmin) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
