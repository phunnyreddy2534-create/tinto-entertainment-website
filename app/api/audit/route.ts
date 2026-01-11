import { NextResponse } from "next/server"
import { getAudit } from "../../../lib/storage"

export async function GET() {
  return NextResponse.json(getAudit())
}
