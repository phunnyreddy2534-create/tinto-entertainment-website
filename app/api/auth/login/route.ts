import { Resend } from "resend"
import { NextResponse } from "next/server"
import crypto from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

const tokens = new Map<string, string>() // email -> token

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = crypto.randomBytes(32).toString("hex")
    tokens.set(token, email)

    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify?token=${token}`

    await resend.emails.send({
      from: "Tinto Admin <onboarding@resend.dev>",
      to: email,
      subject: "Your Tinto Admin Login",
      html: `
        <h2>Tinto Admin Login</h2>
        <p>Click to login securely:</p>
        <a href="${loginUrl}" style="padding:14px 24px;background:#facc15;color:black;font-weight:bold;border-radius:10px;text-decoration:none">
          Login to Admin Panel
        </a>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

export { tokens }
