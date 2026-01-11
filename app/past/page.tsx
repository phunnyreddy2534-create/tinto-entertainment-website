"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Event = {
  title: string;
  place: string;
  type: string;
  description: string;
  status: "upcoming" | "past";
};

export default function Past() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        const past = data.filter((e: Event) => e.status === "past");
        setEvents(past);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>Past Events</h1>

      {events.length === 0 && <p>No past events yet.</p>}

      {events.map((e, i) => {
        const slug = e.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <Link key={i} href={`/events/${slug}`}>
            <div
              className="card"
              style={{
                padding: 20,
                marginBottom: 20,
                borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
                transition: "0.4s",
                boxShadow: "0 0 30px rgba(255, 0, 91, 0.2)"
              }}
            >
              <h2>{e.title}</h2>
              <p>📍 {e.place}</p>
              <p>🎵 {e.type}</p>
              <p style={{ opacity: 0.8 }}>{e.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
