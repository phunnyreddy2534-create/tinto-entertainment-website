"use client";

import { useEffect, useState } from "react";

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

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Partial<Event>>({ status: "upcoming" });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  }

  async function save() {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ status: "upcoming" });
    loadEvents();
  }

  async function update(id: string, data: Partial<Event>) {
    await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    loadEvents();
  }

  async function remove(id: string) {
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadEvents();
  }

  return (
    <main style={{ padding: 30, maxWidth: 800, margin: "0 auto" }}>
      <h1>Events Manager</h1>

      {/* ADD EVENT */}
      <section style={card}>
        <h3>Add Event</h3>

        <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Date" type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Time" type="time" onChange={e => setForm({ ...form, time: e.target.value })} />
        <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Type (Concert, DJ, etc)" onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder="Short Description" onChange={e => setForm({ ...form, shortDesc: e.target.value })} />
        <textarea placeholder="Full Description" onChange={e => setForm({ ...form, fullDesc: e.target.value })} />
        <input placeholder="Cover Image URL" onChange={e => setForm({ ...form, cover: e.target.value })} />
        <input placeholder="Gallery (Google Drive Link)" onChange={e => setForm({ ...form, gallery: e.target.value })} />

        <button onClick={save}>Save Event</button>
      </section>

      {/* EVENT LIST */}
      <h3 style={{ marginTop: 40 }}>All Events</h3>

      {events.map(e => (
        <div key={e.id} style={card}>
          <b>{e.title}</b>
          <div>{e.date} — {e.location}</div>
          <small>{e.status}</small>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => update(e.id, { status: e.status === "upcoming" ? "past" : "upcoming" })}>
              Move to {e.status === "upcoming" ? "Past" : "Upcoming"}
            </button>

            <button onClick={() => remove(e.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

const card = {
  background: "#111",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
};
