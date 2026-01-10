"use client"

import { useState } from "react"

export default function AdminEvents() {
  const [title, setTitle] = useState("")

  async function submit() {
    await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ title, date: new Date() })
    })
    alert("Event added")
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Add Event</h2>
      <input placeholder="Event Title" onChange={e => setTitle(e.target.value)} />
      <br /><br />
      <button onClick={submit}>Save</button>
    </main>
  )
}
