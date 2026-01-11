import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")
const tokensFile = path.join(dataDir, "tokens.json")

function ensureTokensFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  if (!fs.existsSync(tokensFile)) fs.writeFileSync(tokensFile, "{}")
}

export async function GET(req: Request) {
  ensureTokensFile()

  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  const tokens = JSON.parse(fs.readFileSync(tokensFile, "utf8"))
  const record = tokens[token]

  if (!record) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", req.url))
  }

  if (Date.now() > record.expires) {
    delete tokens[token]
    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))
    return NextResponse.redirect(new URL("/admin/login?error=expired", req.url))
  }

  // Token is valid → destroy it
  delete tokens[token]
  fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))

  const res = NextResponse.redirect(new URL("/admin/dashboard", req.url))

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
