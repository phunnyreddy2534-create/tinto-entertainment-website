import { NextResponse } from "next/server"
import { getEvents, saveEvents } from "../../../lib/storage"

export async function GET() {
  try {
    return NextResponse.json(getEvents())
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const events = getEvents()

    const newEvent = {
      id: crypto.randomUUID(),
      title: data.title || "",
      date: data.date || "",
      time: data.time || "",
      location: data.location || "",
      type: data.type || "",
      shortDesc: data.shortDesc || "",
      fullDesc: data.fullDesc || "",
      cover: data.cover || "",
      gallery: data.gallery || "",
      status: data.status || "upcoming",
    }

    events.unshift(newEvent)
    saveEvents(events)

    return NextResponse.json({ success: true, event: newEvent })
  } catch {
    return NextResponse.json({ success: false })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const events = getEvents()

    const updated = events.map((e: any) =>
      e.id === data.id ? { ...e, ...data } : e
    )

    saveEvents(updated)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const events = getEvents().filter((e: any) => e.id !== id)
    saveEvents(events)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false })
  }
}
