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

export function useBrand() {
  const [brand, setBrand] = useState<Brand | null>(null)

  useEffect(() => {
    fetch("/api/brand")
      .then(r => r.json())
      .then(setBrand)
      .catch(() => {})
  }, [])

  return brand
}
