"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function sendLink() {
    setStatus("Sending...");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("Login link sent to your email.");
    } else {
      setStatus("Unauthorized email.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div>
        <h1>Tinto Admin Login</h1>
        <input
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 12, width: 260 }}
        />
        <br />
        <button onClick={sendLink} style={{ marginTop: 12 }}>
          Send Login Link
        </button>
        <p>{status}</p>
      </div>
    </div>
  );
}
