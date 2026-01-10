export const dynamic = "force-static";
const events = [
  { title: "New Year Bash", place: "Hyderabad", type: "Live DJ Night" },
  { title: "College Fest", place: "Telangana", type: "Celebrity Performance" },
  { title: "Wedding Event", place: "Private Venue", type: "Full Production" }
];

export default function Upcoming() {
  return (
    <div style={{ padding: 30 }}>
      <h1>Upcoming Events</h1>

      {events.map((e, i) => (
        <div key={i} className="card" style={{ marginBottom: 20 }}>
          <h3>{e.title}</h3>
          <p>📍 {e.place}</p>
          <p>🎵 {e.type}</p>
        </div>
      ))}
    </div>
  );
}
