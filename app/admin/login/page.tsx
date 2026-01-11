"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function sendLink() {
    setStatus("Sending...");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("Login link sent to your email.");
    } else {
      setStatus(data.error || "Failed to send email");
    }
  }

  return (
    <div style={wrap}>
      <h1>Tinto Admin Login</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter admin email"
        style={input}
      />

      <button onClick={sendLink} style={btn}>
        Send Login Link
      </button>

      <p>{status}</p>
    </div>
  );
}

const wrap = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  background: "#000",
  color: "#fff",
};

const input = {
  padding: "12px 16px",
  width: 280,
  borderRadius: 10,
  border: "none",
};

const btn = {
  background: "#facc15",
  padding: "12px 20px",
  borderRadius: 10,
  border: "none",
  fontWeight: 700,
};
