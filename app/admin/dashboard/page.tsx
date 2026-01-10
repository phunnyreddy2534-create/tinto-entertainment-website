"use client"

import { Suspense } from "react"
import DashboardInner from "./dashboard-inner"

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <DashboardInner />
    </Suspense>
  )
}
