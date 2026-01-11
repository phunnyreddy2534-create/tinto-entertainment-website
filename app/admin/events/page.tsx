"use client";

import { useEffect, useState } from "react";
import { useBrand } from "../../lib/useBrand";

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
  const brand = useBrand();
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Partial<Event>>({ status: "upcoming" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/events");
    setEvents(await res.json());
  }

  async function save() {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ status: "upcoming" });
    load();
  }

  async function update(id: string, data: Partial<Event>) {
    await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    load();
  }

  async function remove(id: string) {
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <main style={{ padding: 40, maxWidth: 1000, margin: "0 auto", color: brand?.text }}>
      <h1 style={{ color: brand?.primary }}>Live Events Manager</h1>

      {/* ADD */}
      <section style={card(brand)}>
        <h3>Add / Edit Event</h3>

        <Input label="Title" onChange={v => setForm({ ...form, title: v })} />
        <Input label="Date" type="date" onChange={v => setForm({ ...form, date: v })} />
        <Input label="Time" type="time" onChange={v => setForm({ ...form, time: v })} />
        <Input label="Location" onChange={v => setForm({ ...form, location: v })} />
        <Input label="Type" onChange={v => setForm({ ...form, type: v })} />
        <Input label="Short Description" onChange={v => setForm({ ...form, shortDesc: v })} />
        <textarea placeholder="Full Description" onChange={e => setForm({ ...form, fullDesc: e.target.value })} />
        <Input label="Cover Image URL" onChange={v => setForm({ ...form, cover: v })} />
        <Input label="Gallery (Drive link)" onChange={v => setForm({ ...form, gallery: v })} />

        <button style={btn(brand)} onClick={save}>
          Save Event
        </button>

        {form.cover && <img src={form.cover} style={{ width: "100%", borderRadius: 10 }} />}
      </section>

      {/* LIST */}
      <h3 style={{ marginTop: 50 }}>All Events</h3>

      {events.map(e => (
        <div key={e.id} style={card(brand)}>
          <b>{e.title}</b>
          <div>{e.date} • {e.location}</div>
          <div style={{ color: brand?.primary }}>{e.status.toUpperCase()}</div>

          <img src={e.cover} style={{ width: "100%", borderRadius: 10 }} />

          <div style={{ display: "flex", gap: 10 }}>
            <button style={btn(brand)} onClick={() => update(e.id, { status: e.status === "upcoming" ? "past" : "upcoming" })}>
              Move to {e.status === "upcoming" ? "Past" : "Upcoming"}
            </button>

            <button onClick={() => remove(e.id)} style={{ background: brand?.accent, color: "#fff", padding: 10, borderRadius: 8 }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

/* UI helpers */

function Input({ label, onChange, type = "text" }: any) {
  return <input placeholder={label} type={type} onChange={e => onChange(e.target.value)} />
}

const card = (b: any) => ({
  background: "rgba(0,0,0,0.6)",
  border: `1px solid ${b?.primary}33`,
  padding: 20,
  borderRadius: 16,
  marginBottom: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  boxShadow: `0 0 40px ${b?.primary}22`,
});

const btn = (b: any) => ({
  background: `linear-gradient(135deg, ${b?.primary}, ${b?.accent})`,
  padding: "12px 20px",
  borderRadius: 12,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
});
