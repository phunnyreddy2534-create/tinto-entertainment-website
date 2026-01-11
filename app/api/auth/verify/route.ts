import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const tokensFile = path.join(process.cwd(), "data", "tokens.json")

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 400 })
  }

  if (!fs.existsSync(tokensFile)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const tokens = JSON.parse(fs.readFileSync(tokensFile, "utf8"))
  const record = tokens[token]

  if (!record) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 })
  }

  if (Date.now() > record.expires) {
    delete tokens[token]
    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))
    return NextResponse.json({ error: "Token expired" }, { status: 401 })
  }

  // Token is valid → destroy it
  delete tokens[token]
  fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))

  const res = NextResponse.redirect(
    new URL("/admin/dashboard", req.url)
  )

  // Secure login cookie
  res.cookies.set("tinto_admin", record.email, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  })

  return res
}
