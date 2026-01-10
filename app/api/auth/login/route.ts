import { NextResponse } from "next/server"

const ADMIN_EMAIL = "tintoentertainmentindia@gmail.com"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // simple token (demo-safe)
  const token = Buffer.from(email).toString("base64")

  return NextResponse.json({
    link: `/admin/dashboard?token=${token}`
  })
}
