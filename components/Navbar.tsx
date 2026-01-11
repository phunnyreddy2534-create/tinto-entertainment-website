"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBrand } from "../lib/useBrand";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
  { name: "Upcoming", path: "/upcoming/" },
  { name: "Past", path: "/past/" },
  { name: "Gallery", path: "/gallery/" },
];

export default function Navbar() {
  const pathname = usePathname();
  const brand = useBrand();
  const [scrolled, setScrolled] = useState(false);

  const cleanPath = pathname.endsWith("/") ? pathname : pathname + "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        ...navStyle,
        background: scrolled
          ? "rgba(0,0,0,0.88)"
          : "rgba(0,0,0,0.55)",
        boxShadow: scrolled
          ? `0 10px 40px rgba(0,0,0,0.6)`
          : "none",
      }}
    >
      <div
        style={{
          ...glowBar,
          background: `radial-gradient(circle at 50% -40%, ${brand?.primary}55, transparent 60%)`,
        }}
      />

      {links.map((link) => {
        const active = cleanPath === link.path;

        return (
          <Link key={link.path} href={link.path} style={linkStyle}>
            <span
              style={{
                ...textStyle,
                color: active ? brand?.primary || "#FFE53B" : "#aaa",
                textShadow: active
                  ? `0 0 16px ${brand?.primary}`
                  : "none",
              }}
            >
              {link.name}
            </span>

            <span
              style={{
                ...underlineStyle,
                background: `linear-gradient(90deg, ${brand?.primary}, ${brand?.accent})`,
                boxShadow: `0 0 20px ${brand?.accent}`,
                opacity: active ? 1 : 0,
                transform: active ? "scaleX(1)" : "scaleX(0)",
              }}
            />
          </Link>
        );
      })}
    </nav>
  );
}

/* ================= STYLES ================= */

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "28px",
  padding: "18px 0",
  position: "sticky",
  top: 0,
  zIndex: 100,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  transition: "all 0.4s ease",
};

const glowBar: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

const linkStyle: React.CSSProperties = {
  position: "relative",
  textDecoration: "none",
  padding: "8px 6px",
};

const textStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "0.6px",
  transition: "all 0.35s ease",
};

const underlineStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: -8,
  height: 3,
  borderRadius: 10,
  transition: "all 0.4s ease",
  transformOrigin: "center",
};
