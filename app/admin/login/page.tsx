"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function sendLink() {
    setMsg("Sending link...");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);
  }

  return (
    <div style={wrap}>
      <h1>Tinto Admin Login</h1>
      <input
        style={input}
        placeholder="tintoentertainmentindia@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={btn} onClick={sendLink}>Send Login Link</button>
      <p>{msg}</p>
    </div>
  );
}

const wrap = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
};

const input = {
  padding: 14,
  width: 300,
  borderRadius: 10,
};

const btn = {
  padding: "12px 24px",
  background: "#facc15",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
};
