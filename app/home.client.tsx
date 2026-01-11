"use client"

import { useBrand } from "../lib/useBrand"

export default function HomeClient() {
  const brand = useBrand()

  if (!brand) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
        }}
      />
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: brand.background || "#000",
        color: brand.text || "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <img
        src={brand.logo || "/logo.png"}
        style={{ width: 120, marginBottom: 20 }}
      />

      <h1 style={{ fontSize: 42, marginBottom: 12 }}>
        Tinto Entertainment
      </h1>

      <p style={{ opacity: 0.8, marginBottom: 30 }}>
        Premium Event & Festival Experience
      </p>

      <div style={{ display: "flex", gap: 16 }}>
        <a
          href="/upcoming"
          style={{
            padding: "12px 22px",
            background: brand.primary,
            color: "#000",
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: 700,
          }}
        >
          Upcoming Events
        </a>

        <a
          href="/about"
          style={{
            padding: "12px 22px",
            border: `2px solid ${brand.primary}`,
            color: brand.primary,
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: 700,
          }}
        >
          About
        </a>
      </div>

      <div style={{ marginTop: 50, opacity: 0.8 }}>
        <p>📞 +91 9392267226</p>
        <p>📧 tintoentertainmentindia@gmail.com</p>
        <p>
          📸{" "}
          <a
            href="https://www.instagram.com/tintoentertainment"
            target="_blank"
            style={{ color: brand.accent }}
          >
            @tintoentertainment
          </a>
        </p>
      </div>
    </main>
  )
}
