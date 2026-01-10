let galleryLink = "";

export async function GET() {
  return Response.json({ link: galleryLink });
}

export async function POST(req: Request) {
  const body = await req.json();
  galleryLink = body.link || "";
  return Response.json({ success: true });
}
