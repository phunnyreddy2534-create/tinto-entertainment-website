export const dynamic = "force-dynamic";

type Event = {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  shortDesc: string;
  fullDesc: string;
  cover: string;
  gallery: string;
  status: "upcoming" | "past";
};

async function getEvents(): Promise<Event[]> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${base}/api/events`, { cache: "no-store" });
  return res.json();
}

function toDrivePreview(url: string) {
  if (!url) return "";
  if (url.includes("/preview")) return url;
  const id = url.split("/d/")[1]?.split("/")[0];
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const events = await getEvents();
  const event = events.find(e => e.slug === params.slug);

  if (!event) {
    return (
      <div style={{ padding: 80, color: "#fff", background: "#000" }}>
        <h1>Event not found</h1>
      </div>
    );
  }

  return (
    <div style={wrap}>
      {/* HERO */}
      <div style={hero}>
        <img src={event.cover} style={heroImg} />
        <div style={overlay} />
        <div style={heroText}>
          <h1 style={title}>{event.title}</h1>
          <p style={sub}>{event.shortDesc}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div style={content}>
        <div style={infoGrid}>
          <div>📍 {event.location}</div>
          <div>🗓 {event.date} • {event.time}</div>
          <div>🎧 {event.type}</div>
          <div style={{ color: "#facc15" }}>
            {event.status === "upcoming" ? "UPCOMING" : "PAST EVENT"}
          </div>
        </div>

        <p style={desc}>{event.fullDesc}</p>

        {event.gallery && (
          <div style={galleryWrap}>
            <iframe
              src={toDrivePreview(event.gallery)}
              style={iframe}
              allow="autoplay"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrap = {
  background: "radial-gradient(circle at top, #111 0%, #000 60%)",
  minHeight: "100vh",
  color: "#fff",
};

const hero = {
  position: "relative" as const,
  height: "70vh",
  overflow: "hidden",
};

const heroImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  filter: "brightness(0.7)",
};

const overlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.95))",
};

const heroText = {
  position: "absolute" as const,
  bottom: 60,
  left: 40,
  maxWidth: 800,
};

const title = {
  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
  fontWeight: 900,
  textShadow: "0 0 40px rgba(250,204,21,0.6)",
};

const sub = {
  marginTop: 10,
  fontSize: "1.2rem",
  color: "#facc15",
};

const content = {
  padding: "60px 20px",
  maxWidth: 1000,
  margin: "0 auto",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 20,
  fontWeight: 600,
  marginBottom: 40,
  color: "#facc15",
};

const desc = {
  fontSize: "1.05rem",
  lineHeight: 1.8,
  color: "#ddd",
};

const galleryWrap = {
  marginTop: 60,
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 0 60px rgba(250,204,21,0.25)",
};

const iframe = {
  width: "100%",
  height: 520,
  border: "none",
};
