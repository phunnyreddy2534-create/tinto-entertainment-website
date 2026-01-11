"use client"
import { useBrand } from "../lib/useBrand"

export default function Footer() {
  const brand = useBrand()

  return (
    <footer
      style={{
        padding: 40,
        textAlign: "center",
        background: "rgba(0,0,0,0.7)",
        color: brand?.text || "#fff",
        borderTop: `1px solid ${brand?.primary}44`,
        boxShadow: `0 -10px 40px ${brand?.accent}22`,
      }}
    >
      <img
        src={brand?.logo || "/logo.png"}
        style={{ width: 80, marginBottom: 16 }}
      />

      <p style={{ opacity: 0.8 }}>
        © {new Date().getFullYear()} Tinto Entertainment
      </p>

      <p style={{ fontSize: 13, color: brand?.primary }}>
        Powered by ForgeAI Live Brand Engine
      </p>
    </footer>
  )
}
