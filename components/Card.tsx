"use client";

import { useRef } from "react";

type Props = {
  title: string;
  location: string;
  description: string;
};

export default function Card({ title, location, description }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;
  }

  function reset() {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={cardStyle}
    >
      <div style={glow} />

      <h3 style={titleStyle}>{title}</h3>
      <p style={locationStyle}>📍 {location}</p>
      <p style={descStyle}>{description}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle: React.CSSProperties = {
  position: "relative",
  background: "linear-gradient(145deg, #0b0b0b, #111)",
  borderRadius: 18,
  padding: "24px",
  minHeight: 160,
  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
  transition: "transform 0.15s ease, box-shadow 0.3s ease",
  overflow: "hidden",
};

const glow: React.CSSProperties = {
  position: "absolute",
  inset: -1,
  background:
    "radial-gradient(circle at top left, rgba(250,204,21,0.15), transparent 60%)",
  pointerEvents: "none",
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#fff",
  marginBottom: 10,
};

const locationStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#facc15",
  marginBottom: 8,
};

const descStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#ccc",
  lineHeight: 1.6,
};
