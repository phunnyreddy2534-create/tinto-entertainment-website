"use client";

import { useEffect, useState } from "react";
import { useBrand } from "../../../lib/useBrand";

export const dynamic = "force-dynamic";

export default function EventPage({ params }: { params: { slug: string } }) {
  const [event, setEvent] = useState<any>(null);
  const brand = useBrand();

  useEffect(() => {
    fetch("/api/events")
      .then(r => r.json())
      .then(data => {
        const e = data.find((x: any) => x.slug === params.slug);
        setEvent(e);
      });
  }, [params.slug]);

  if (!event || !brand) return null;

  return (
    <div style={{ background: brand.background, minHeight: "100vh" }}>
      <div style={{ position: "relative", height: "70vh" }}>
        <img
          src={event.cover}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.95))",
          }}
        />
        <div style={{ position: "absolute", bottom: 50, left: 40 }}>
          <h1
            style={{
              fontSize: "4rem",
              color: brand.primary,
              textShadow: `0 0 50px ${brand.primary}`,
            }}
          >
            {event.title}
          </h1>
          <p style={{ color: brand.text }}>{event.shortDesc}</p>
        </div>
      </div>

      <div style={{ padding: 50, color: brand.text }}>
        <p>📍 {event.location}</p>
        <p>🗓 {event.date} • {event.time}</p>
        <p style={{ color: brand.accent }}>🎧 {event.type}</p>

        <p style={{ marginTop: 30, lineHeight: 1.8 }}>
          {event.fullDesc}
        </p>

        {event.gallery && (
          <iframe
            src={event.gallery}
            style={{
              width: "100%",
              height: 500,
              marginTop: 40,
              borderRadius: 20,
              border: `2px solid ${brand.primary}`,
            }}
          />
        )}
      </div>
    </div>
  );
}
