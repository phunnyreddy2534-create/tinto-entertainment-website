import { NextResponse } from "next/server"
import { getBrand, setBrand } from "@/lib/storage"

export async function GET() {
  try {
    const brand = getBrand()
    return NextResponse.json(brand)
  } catch {
    return NextResponse.json(
      {
        primary: "#FFE53B",
        accent: "#FF005B",
        glow: 0.8,
        background: "linear-gradient(120deg,#FFE53B,#FF005B)",
        text: "#ffffff",
        logo: "/logo.png",
      },
      { status: 200 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    setBrand(data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false })
  }
}
