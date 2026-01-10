export default function Dashboard() {
  return (
    <main style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><a href="/admin/events">Manage Events</a></li>
        <li><a href="/admin/settings">Brand Settings</a></li>
      </ul>
    </main>
  )
}
