"use client"

import { useEffect, useState } from "react"

export default function BrandAdmin() {
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/brand")
      .then(res => res.json())
      .then(data => {
        setBrand(data)
        setLoading(false)
      })
  }, [])

  async function save() {
    await fetch("/api/brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    })

    alert("Brand updated")
  }

  if (loading) return <p style={{ padding: 40 }}>Loading brand...</p>

  return (
    <main style={wrap}>
      <h1 style={title}>Live Brand Engine</h1>

      <div style={grid}>
        <Control label="Primary Color">
          <input
            type="color"
            value={brand.primary}
            onChange={e => setBrand({ ...brand, primary: e.target.value })}
          />
        </Control>

        <Control label="Accent Color">
          <input
            type="color"
            value={brand.accent}
            onChange={e => setBrand({ ...brand, accent: e.target.value })}
          />
        </Control>

        <Control label="Glow Intensity">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={brand.glow}
            onChange={e => setBrand({ ...brand, glow: Number(e.target.value) })}
          />
        </Control>

        <Control label="Text Color">
          <input
            type="color"
            value={brand.text}
            onChange={e => setBrand({ ...brand, text: e.target.value })}
          />
        </Control>

        <Control label="Background Gradient">
          <input
            style={input}
            value={brand.background}
            onChange={e => setBrand({ ...brand, background: e.target.value })}
          />
        </Control>

        <Control label="Logo URL">
          <input
            style={input}
            value={brand.logo}
            onChange={e => setBrand({ ...brand, logo: e.target.value })}
          />
        </Control>
      </div>

      <div style={preview(brand)}>
        <img src={brand.logo} style={logo} />
        <h2 style={{ color: brand.text }}>Tinto Entertainment</h2>
        <p style={{ color: brand.text }}>
          Live brand preview powered by ForgeAI
        </p>
      </div>

      <button style={saveBtn(brand)} onClick={save}>
        Save Live Brand
      </button>
    </main>
  )
}

/* ===== UI ===== */

function Control({ label, children }: any) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: "#aaa", marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const wrap = {
  padding: 40,
  maxWidth: 800,
  margin: "0 auto",
  color: "#fff",
}

const title = {
  fontSize: 36,
  marginBottom: 30,
  color: "#FFE53B",
}

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
}

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "none",
}

const preview = (b: any) => ({
  marginTop: 40,
  padding: 40,
  borderRadius: 20,
  background: b.background,
  boxShadow: `0 0 40px rgba(255,0,91,${b.glow})`,
  textAlign: "center" as const,
})

const logo = {
  width: 120,
  marginBottom: 20,
}

const saveBtn = (b: any) => ({
  marginTop: 40,
  width: "100%",
  padding: 16,
  fontSize: 18,
  borderRadius: 12,
  border: "none",
  background: b.primary,
  color: "#000",
  cursor: "pointer",
})
