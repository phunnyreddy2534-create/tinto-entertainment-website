import { NextResponse } from "next/server"
import { getEvents, addEvent } from "../../../lib/storage"

export async function GET() {
  return NextResponse.json(getEvents())
}

export async function POST(req: Request) {
  const data = await req.json()
  addEvent(data)
  return NextResponse.json({ success: true })
}
