import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard`;

    await resend.emails.send({
      from: "Tinto Admin <onboarding@resend.dev>",
      to: email,
      subject: "Your Tinto Admin Login Link",
      html: `
        <h2>Tinto Entertainment Admin</h2>
        <p>Click below to access the admin panel:</p>
        <a href="${loginUrl}" style="padding:12px 20px;background:#facc15;color:black;text-decoration:none;font-weight:bold;border-radius:8px">
          Open Admin Panel
        </a>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
