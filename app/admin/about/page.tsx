"use client"
import { useState } from "react"

export default function EditAbout() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function save() {
    await fetch("/api/about", {
      method: "POST",
      body: JSON.stringify({ title, description })
    })
    alert("About page updated")
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Edit About Page</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <br /><br />
      <textarea
        placeholder="Description"
        rows={6}
        onChange={e => setDescription(e.target.value)}
      />
      <br /><br />
      <button onClick={save}>Save</button>
    </main>
  )
}
