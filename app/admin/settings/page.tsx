"use client"
import { useState } from "react"

export default function Settings() {
  const [color, setColor] = useState("#facc15")

  async function save() {
    await fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify({ color })
    })
    alert("Color updated")
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Brand Color</h2>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      <br /><br />
      <button onClick={save}>Save</button>
    </main>
  )
}
