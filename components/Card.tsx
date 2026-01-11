"use client";

import { useRef, useState } from "react";
import { useBrand } from "../lib/useBrand";

type Props = {
  title: string;
  location: string;
  description: string;
};

export default function Card({ title, location, description }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const brand = useBrand();
  const [style, setStyle] = useState({});

  function handleMove(e: React.MouseEvent) {
    if (!cardRef.current || !brand) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 8;
    const rotateY = ((midX - x) / midX) * 8;

    setStyle({
      transform: `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
      `,
      boxShadow: `0 40px 120px ${brand.primary}55`,
    });
  }

  function reset() {
    setStyle({
      transform: `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `,
      boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        ...cardStyle,
        border: `1px solid ${brand?.primary}33`,
        ...style,
      }}
    >
      <div
        style={{
          ...beam,
          background: `radial-gradient(circle at 20% 0%, ${brand?.accent}33, transparent 55%)`,
        }}
      />

      <h3 style={{ ...titleStyle, color: brand?.text || "#fff" }}>{title}</h3>
      <p style={{ ...locationStyle, color: brand?.primary }}>
        📍 {location}
      </p>
      <p style={{ ...descStyle, color: brand?.text }}>
        {description}
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle: React.CSSProperties = {
  position: "relative",
  background:
    "linear-gradient(160deg, rgba(20,20,20,0.95), rgba(5,5,5,0.95))",
  borderRadius: 22,
  padding: "28px",
  minHeight: 180,
  boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
  transition: "transform 0.15s ease, box-shadow 0.3s ease",
  overflow: "hidden",
};

const beam: React.CSSProperties = {
  position: "absolute",
  inset: -50,
  pointerEvents: "none",
  animation: "beamMove 6s ease-in-out infinite",
};

const titleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 800,
  marginBottom: 12,
  letterSpacing: "-0.02em",
};

const locationStyle: React.CSSProperties = {
  fontSize: 14,
  marginBottom: 10,
  fontWeight: 600,
};

const descStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
};
