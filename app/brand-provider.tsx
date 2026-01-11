"use client"

import { useBrand } from "../lib/useBrand"

export default function BrandProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const brand = useBrand()

  return (
    <div
      style={{
        background: brand.background,
        color: brand.text,
        minHeight: "100vh",
        transition: "all .4s ease",
      }}
    >
      {children}
    </div>
  )
}
