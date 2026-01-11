import { Resend } from "resend"
import { NextResponse } from "next/server"
import crypto from "crypto"
import fs from "fs"
import path from "path"

const resend = new Resend(process.env.RESEND_API_KEY)

const tokensFile = path.join(process.cwd(), "data", "tokens.json")

const ADMINS = [
  "tintoentertainmentindia@gmail.com",
  "knikhil2486@gmail.com",
]

function saveToken(email: string, token: string) {
  if (!fs.existsSync(path.dirname(tokensFile))) {
    fs.mkdirSync(path.dirname(tokensFile))
  }

  let tokens: any = {}
  if (fs.existsSync(tokensFile)) {
    tokens = JSON.parse(fs.readFileSync(tokensFile, "utf8"))
  }

  tokens[token] = {
    email,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  }

  fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!ADMINS.includes(email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = crypto.randomBytes(32).toString("hex")
    saveToken(email, token)

    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `https://${process.env.VERCEL_URL}`

    const loginUrl = `${base}/api/auth/verify?token=${token}`

    await resend.emails.send({
      from: "Tinto Admin <onboarding@resend.dev>",
      to: email,
      subject: "Your secure Tinto Admin login",
      html: `
        <h2>Tinto Entertainment Admin</h2>
        <p>This link expires in 15 minutes.</p>
        <a href="${loginUrl}" style="padding:14px 22px;background:#FFE53B;color:black;font-weight:bold;border-radius:10px;text-decoration:none">
          Secure Login
        </a>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Email failed" }, { status: 500 })
  }
}
