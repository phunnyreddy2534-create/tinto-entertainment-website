"use client"
import { useState } from "react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [link, setLink] = useState("")

  async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })

  if (!res.ok) {
    alert("Not authorized")
    return
  }

  const data = await res.json()
  setLink(data.link)
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
