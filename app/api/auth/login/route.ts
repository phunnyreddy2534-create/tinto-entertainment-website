import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN = process.env.ADMIN_EMAIL!;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (email !== ADMIN) {
    return NextResponse.json(
      { error: "Unauthorized email" },
      { status: 403 }
    );
  }

  const token = Buffer.from(
    email + "|" + Date.now()
  ).toString("base64");

  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard?token=${token}`;

  try {
    await resend.emails.send({
      from: "Tinto Admin <onboarding@resend.dev>",
      to: ADMIN,
      subject: "Your Tinto Admin Login Link",
      html: `
        <h2>Tinto Entertainment Admin Login</h2>
        <p>Click below to access the admin panel:</p>
        <a href="${loginUrl}" style="display:inline-block;padding:14px 22px;background:#facc15;color:#000;border-radius:8px;font-weight:700;text-decoration:none">
          Login to Admin Panel
        </a>
        <p>This link expires automatically.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
