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
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const events = await getEvents();
  const event = events.find(e => e.slug === params.slug);

  if (!event) {
    return <h1 style={{ padding: 40 }}>Event not found</h1>;
  }

  return (
    <div style={wrap}>
      <div style={hero}>
        <img src={event.cover} style={heroImg} />
        <div style={overlay} />
        <h1 style={title}>{event.title}</h1>
      </div>

      <div style={content}>
        <p style={meta}>📍 {event.location}</p>
        <p style={meta}>🗓 {event.date} • {event.time}</p>
        <p style={meta}>🎧 {event.type}</p>

        <p style={desc}>{event.fullDesc}</p>

        {event.gallery && (
          <iframe
            src={event.gallery}
            style={{ width: "100%", height: 500, border: "none", borderRadius: 20 }}
          />
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrap = {
  background: "#000",
  color: "#fff",
};

const hero = {
  position: "relative" as const,
  height: "60vh",
  overflow: "hidden",
};

const heroImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const overlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9))",
};

const title = {
  position: "absolute" as const,
  bottom: 40,
  left: 40,
  fontSize: "clamp(2rem, 6vw, 4rem)",
  fontWeight: 900,
};

const content = {
  padding: 40,
  maxWidth: 900,
  margin: "0 auto",
};

const meta = {
  color: "#facc15",
  fontWeight: 600,
  marginBottom: 8,
};

const desc = {
  marginTop: 20,
  lineHeight: 1.7,
  color: "#ccc",
};
