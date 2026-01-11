export const dynamic = "force-dynamic";

type Event = {
  id: string;
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

export default async function Past() {
  const events = await getEvents();
  const past = events.filter(e => e.status === "past");

  return (
    <div style={{ padding: 30, maxWidth: 1000, margin: "0 auto" }}>
      <h1>Past Events</h1>

      {past.length === 0 && <p>No past events yet.</p>}

      <div style={grid}>
        {past.map(e => (
          <div key={e.id} className="card">
            {e.cover && (
              <img
                src={e.cover}
                style={{ width: "100%", borderRadius: 10, marginBottom: 10 }}
              />
            )}
            <h3>{e.title}</h3>
            <p>📍 {e.location}</p>
            <p>🗓 {e.date} {e.time}</p>
            <p>{e.shortDesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  marginTop: 30,
};
