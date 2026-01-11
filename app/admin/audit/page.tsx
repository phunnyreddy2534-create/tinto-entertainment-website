"use client"

import { useEffect, useState } from "react"
import { useBrand } from "../../../lib/useBrand"

type Log = {
  time: string
  email: string
  action: string
  data: any
}

export default function AuditPage() {
  const brand = useBrand()
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    load()
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
  }, [])

  async function load() {
    const res = await fetch("/api/audit")
    setLogs(await res.json())
  }

  return (
    <main style={{ padding: 40, color: brand?.text }}>
      <h1 style={{ color: brand?.primary }}>Admin Activity</h1>

      <div style={{ marginTop: 30 }}>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              background: "rgba(0,0,0,0.6)",
              border: `1px solid ${brand?.primary}33`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              boxShadow: `0 0 30px ${brand?.primary}22`,
            }}
          >
            <b style={{ color: brand?.primary }}>{log.email}</b>
            <div>{log.action}</div>
            <small style={{ opacity: 0.6 }}>
              {new Date(log.time).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </main>
  )
}
