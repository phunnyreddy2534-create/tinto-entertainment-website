import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const baseDir = process.env.VERCEL ? "/tmp/tinto-data" : path.join(process.cwd(), "data")
const tokensFile = path.join(baseDir, "tokens.json")

function loadTokens() {
  if (!fs.existsSync(tokensFile)) fs.writeFileSync(tokensFile, "{}")
  return JSON.parse(fs.readFileSync(tokensFile, "utf8"))
}

function saveTokens(tokens: any) {
  fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = crypto.randomBytes(32).toString("hex")
    const tokens = loadTokens()

    tokens[token] = {
      email,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    }

    saveTokens(tokens)

    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify?token=${token}`

    await resend.emails.send({
      from: "Tinto Admin <onboarding@resend.dev>",
      to: email,
      subject: "Your Tinto Admin Login Link",
      html: `<a href="${url}">Click here to login</a>`,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
