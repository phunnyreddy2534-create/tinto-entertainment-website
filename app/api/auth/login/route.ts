import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized email" }, { status: 401 });
  }

  const loginLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Tinto Admin <onboarding@resend.dev>",
      to: email,
      subject: "Your Tinto Admin Login Link",
      html: `
        <h2>Tinto Entertainment Admin</h2>
        <p>Click the link below to open your admin panel:</p>
        <a href="${loginLink}">${loginLink}</a>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
