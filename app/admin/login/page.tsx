"use client"
import { useState } from "react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [link, setLink] = useState("")

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    if (data.link) setLink(data.link)
    else alert("Not authorized")
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <input
        placeholder="Admin Email"
        onChange={e => setEmail(e.target.value)}
      />
      <br /><br />
      <button onClick={login}>Send Magic Link</button>

      {link && (
        <p>
          <a href={link}>Click here to login</a>
        </p>
      )}
    </main>
  )
}
