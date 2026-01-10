import { NextResponse } from "next/server"
import { getAbout, updateAbout } from "../../../lib/storage"

export async function GET() {
  return NextResponse.json(getAbout())
}

export async function POST(req: Request) {
  const data = await req.json()
  updateAbout(data)
  return NextResponse.json({ success: true })
}
