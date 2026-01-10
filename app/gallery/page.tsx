"use client";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [link, setLink] = useState("");

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setLink(d.link));
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Event Gallery</h1>

      {link ? (
        <a
          href={link}
          target="_blank"
          style={{
            display: "inline-block",
            marginTop: 30,
            padding: "18px 30px",
            background: "#facc15",
            color: "#000",
            borderRadius: 12,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Open Gallery
        </a>
      ) : (
        <p>No gallery added yet.</p>
      )}
    </div>
  );
}
