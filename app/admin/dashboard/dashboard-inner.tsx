"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardInner() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get("token")

  useEffect(() => {
    if (!token) router.push("/admin/login")
  }, [token, router])

  return (
    <main style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><a href="/admin/events">Manage Events</a></li>
        <li><a href="/admin/settings">Brand Settings</a></li>
        <li><a href="/admin/about">Edit About Page</a></li>
      </ul>
    </main>
  )
}
