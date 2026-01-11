"use client"

export const dynamic = "force-dynamic"

export default function Dashboard() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div style={wrap}>
      <button onClick={logout} style={logoutBtn}>Logout</button>

      <h1 style={title}>Tinto Admin Panel</h1>

      <div style={grid}>
        <a href="/admin/events" style={card}>📅 Manage Events</a>
        <a href="/admin/gallery" style={card}>🖼 Manage Gallery</a>
        <a href="/admin/about" style={card}>✍ Edit About</a>
        <a href="/admin/settings" style={card}>⚙ Brand & Settings</a>
      </div>
    </div>
  )
}

/* ================= STYLES ================= */

const wrap = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #111, #000)",
  color: "#fff",
  padding: 50,
}

const title = {
  fontSize: "2.5rem",
  fontWeight: 900,
  marginBottom: 40,
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
  gap: 30,
}

const card = {
  background: "linear-gradient(160deg,#111,#000)",
  border: "1px solid rgba(250,204,21,0.25)",
  borderRadius: 16,
  padding: 30,
  textDecoration: "none",
  color: "#facc15",
  fontWeight: 800,
  textAlign: "center" as const,
  boxShadow: "0 0 40px rgba(250,204,21,0.25)",
}

const logoutBtn = {
  position: "absolute" as const,
  top: 20,
  right: 20,
  background: "#facc15",
  color: "#000",
  padding: "10px 18px",
  borderRadius: 10,
  fontWeight: 800,
  cursor: "pointer",
}
