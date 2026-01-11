import { NextResponse } from "next/server";
import { getEvents, saveEvents } from "../../../lib/storage";

/*
Event schema:
{
  id: string,
  title: string,
  date: string,
  time: string,
  location: string,
  type: string,
  shortDesc: string,
  fullDesc: string,
  cover: string,
  gallery: string,
  status: "upcoming" | "past"
}
*/

export async function GET() {
  const events = getEvents();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const data = await req.json();
  const events = getEvents();

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
  };

  events.push(newEvent);
  saveEvents(events);

  return NextResponse.json({ success: true, event: newEvent });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const events = getEvents();

  const index = events.findIndex((e: any) => e.id === data.id);
  if (index === -1) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  events[index] = { ...events[index], ...data };
  saveEvents(events);

  return NextResponse.json({ success: true, event: events[index] });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const events = getEvents().filter((e: any) => e.id !== id);
  saveEvents(events);

  return NextResponse.json({ success: true });
}
