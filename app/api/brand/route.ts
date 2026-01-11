import { NextResponse } from "next/server"
import { getBrand, setBrand } from "../../../lib/storage"

export async function GET() {
  return NextResponse.json(getBrand())
}

export async function POST(req: Request) {
  const data = await req.json()
  setBrand(data)
  return NextResponse.json({ success: true })
}
