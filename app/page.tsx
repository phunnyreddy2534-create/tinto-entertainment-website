"use client"

import { useBrand } from "../lib/useBrand"

export const dynamic = "force-dynamic"

export default function HomePage() {
  const brand = useBrand()

  // ⛑️ Prevent server crash while brand loads
  if (!brand) {
    return (
      <div style={{ minHeight: "100vh", background: "#000" }} />
    )
  }

  return (
    <main className="page">
      <style>{`
      @keyframes heroPulse {
        0% { text-shadow: 0 0 0 ${brand.primary}00; }
        50% { text-shadow: 0 0 50px ${brand.primary}; }
        100% { text-shadow: 0 0 0 ${brand.primary}00; }
      }
      `}</style>

      <section style={{ ...hero, background: brand.background }}>
        <div
          style={{
            ...heroGlow,
            background: `radial-gradient(circle at 50% 30%, ${brand.primary}55, transparent 60%)`,
          }}
        />

        <img src={brand.logo || "/logo.png"} style={{ width: 140, marginBottom: 20 }} />

        <h1
          style={{
            ...heroTitle,
            color: brand.text,
            animation: "heroPulse 4s ease-in-out infinite",
          }}
        >
          Tinto Entertainment
        </h1>

        <p style={{ ...heroSubtitle, color: brand.text }}>
          Premium Event & Festival Experience
        </p>

        <div style={ctaWrap}>
          <a
            href="/upcoming/"
            style={{
              ...ctaPrimary,
              background: `linear-gradient(135deg, ${brand.primary}, ${brand.accent})`,
            }}
          >
            View Upcoming Events
          </a>

          <a
            href="/about/"
            style={{
              ...ctaSecondary,
              border: `1px solid ${brand.primary}`,
              color: brand.primary,
            }}
          >
            About Us
          </a>
        </div>
      </section>

      <section style={{ ...section, textAlign: "center" }}>
        <h2 style={{ color: brand.primary }}>Contact</h2>
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
      </section>
    </main>
  )
}

/* ================== STYLES ================== */

const hero = {
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center" as const,
  position: "relative" as const,
  overflow: "hidden",
}

const heroGlow = {
  position: "absolute" as const,
  inset: 0,
  filter: "blur(100px)",
}

const heroTitle = {
  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
  fontWeight: 900,
  letterSpacing: "-0.04em",
  zIndex: 1,
}

const heroSubtitle = {
  marginTop: 12,
  fontSize: "1.1rem",
  opacity: 0.85,
  zIndex: 1,
}

const ctaWrap = {
  marginTop: 32,
  display: "flex",
  gap: 20,
  zIndex: 1,
}

const ctaPrimary = {
  padding: "14px 28px",
  borderRadius: 14,
  color: "#000",
  fontWeight: 800,
  textDecoration: "none",
  boxShadow: "0 0 40px rgba(0,0,0,0.4)",
}

const ctaSecondary = {
  padding: "14px 28px",
  borderRadius: 14,
  textDecoration: "none",
}

const section = {
  padding: "80px 24px",
  maxWidth: 1100,
  margin: "0 auto",
}
