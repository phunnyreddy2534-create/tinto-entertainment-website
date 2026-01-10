import { NextResponse } from "next/server";

const ADMIN_EMAIL = "tintoentertainmentindia@gmail.com";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ message: "Not authorized" });
  }

  const token = Buffer.from(email + Date.now()).toString("base64");

  const link = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard?token=${token}`;

  console.log("LOGIN LINK:", link); // (Email integration next)

  return NextResponse.json({
    message: "Login link sent. Check email.",
  });
}
