"use client"

import { useBrand } from "../lib/useBrand"

export default function Footer() {
  const brand = useBrand()

  return (
    <footer
      style={{
        padding: "50px 20px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
        color: brand?.text || "#fff",
        borderTop: `1px solid ${brand?.primary}33`,
        boxShadow: `0 -20px 50px ${brand?.accent}22`,
      }}
    >
      <img
        src={brand?.logo || "/logo.png"}
        style={{
          width: 80,
          marginBottom: 18,
          filter: "drop-shadow(0 0 20px rgba(0,0,0,0.6))",
        }}
      />

      <p style={{ opacity: 0.9, fontSize: 15 }}>
        © 2024 Tinto Entertainment
      </p>

      <p
        style={{
          marginTop: 6,
          fontSize: 13,
          color: brand?.primary,
          letterSpacing: "0.04em",
        }}
      >
        tintoentertainment.india
      </p>
    </footer>
  )
}
