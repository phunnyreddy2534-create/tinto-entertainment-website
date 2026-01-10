import { NextResponse } from "next/server"
import { getSettings, setColor } from "../../../lib/storage"

export async function GET() {
  return NextResponse.json(getSettings())
}

export async function POST(req: Request) {
  const { color } = await req.json()
  setColor(color)
  return NextResponse.json({ success: true })
}
