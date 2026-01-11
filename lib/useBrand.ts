"use client"
import { useEffect, useState } from "react"

export type Brand = {
  primary: string
  accent: string
  glow: number
  background: string
  text: string
  logo: string
}

const FALLBACK: Brand = {
  primary: "#FFE53B",
  accent: "#FF005B",
  glow: 0.8,
  background: "linear-gradient(120deg,#FFE53B,#FF005B)",
  text: "#ffffff",
  logo: "/logo.png",
}

export function useBrand(): Brand {
  const [brand, setBrand] = useState<Brand>(FALLBACK)

  useEffect(() => {
    fetch("/api/brand")
      .then(r => r.json())
      .then(b => {
        if (b && b.primary) setBrand(b)
      })
      .catch(() => {})
  }, [])

  return brand
}
