import { NextResponse } from "next/server"
import { getAudit } from "@/lib/storage"

export async function GET() {
  try {
    return NextResponse.json(getAudit())
  } catch {
    return NextResponse.json([])
  }
}
