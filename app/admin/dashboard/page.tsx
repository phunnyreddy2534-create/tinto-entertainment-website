export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel</h1>

      <ul>
        <li><a href="/admin/events">Manage Events</a></li>
        <li><a href="/admin/gallery">Gallery</a></li>
        <li><a href="/admin/about">About Page</a></li>
        <li><a href="/admin/settings">Settings</a></li>
      </ul>
    </div>
  );
}
