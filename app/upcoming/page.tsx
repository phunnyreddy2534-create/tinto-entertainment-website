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

export default function Upcoming() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        const upcoming = data.filter((e: Event) => e.status === "upcoming");
        setEvents(upcoming);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>Upcoming Events</h1>

      {events.length === 0 && <p>No upcoming events yet.</p>}

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
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
                transition: "0.4s",
                boxShadow: "0 0 30px rgba(255, 229, 59, 0.2)"
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
