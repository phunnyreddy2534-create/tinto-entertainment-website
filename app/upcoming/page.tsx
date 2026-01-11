"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useBrand } from "../../lib/useBrand";

type Event = {
  title: string;
  place: string;
  type: string;
  description: string;
  status: "upcoming" | "past";
};

export default function Upcoming() {
  const [events, setEvents] = useState<Event[]>([]);
  const brand = useBrand();

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
      <h1 style={{ fontSize: 36, color: brand?.primary }}>
        Upcoming Events
      </h1>

      {events.length === 0 && <p>No upcoming events yet.</p>}

      {events.map((e, i) => {
        const slug = e.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <Link key={i} href={`/events/${slug}`}>
            <div
              className="card"
              style={{
                marginTop: 24,
                padding: 28,
                borderRadius: 18,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(14px)",
                cursor: "pointer",
                transition: "0.4s",
                border: `1px solid ${brand?.primary}33`,
                boxShadow: `0 0 40px ${brand?.primary}22`,
              }}
            >
              <h2 style={{ color: brand?.text }}>{e.title}</h2>
              <p style={{ color: brand?.primary }}>📍 {e.place}</p>
              <p style={{ color: brand?.accent }}>🎵 {e.type}</p>
              <p style={{ opacity: 0.8, color: brand?.text }}>
                {e.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
