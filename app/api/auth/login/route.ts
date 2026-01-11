import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const ADMIN = process.env.ADMIN_EMAIL!;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (email !== ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = Buffer.from(
    `${email}|${Date.now()}`
  ).toString("base64");

  const loginLink =
    `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard?token=${token}`;

  await resend.emails.send({
    from: "Tinto Admin <onboarding@resend.dev>",
    to: ADMIN,
    subject: "Your Admin Login Link",
    html: `
      <h2>Tinto Entertainment</h2>
      <p>Click below to access admin:</p>
      <a href="${loginLink}" style="
        padding:12px 20px;
        background:#facc15;
        color:#000;
        font-weight:700;
        border-radius:8px;
        text-decoration:none;
        display:inline-block">
        Login to Admin Panel
      </a>
      <p>This link is private and secure.</p>
    `,
  });

  return NextResponse.json({ success: true });
}
