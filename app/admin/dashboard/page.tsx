export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Tinto Admin Panel</h1>

      <ul style={{ marginTop: 20, lineHeight: "2em" }}>
        <li><a href="/admin/events">Manage Events</a></li>
        <li><a href="/admin/gallery">Manage Gallery</a></li>
        <li><a href="/admin/about">Edit About Page</a></li>
        <li><a href="/admin/settings">Contact & Settings</a></li>
      </ul>
    </div>
  );
}
