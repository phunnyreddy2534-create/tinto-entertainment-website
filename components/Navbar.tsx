"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
  { name: "Upcoming", path: "/upcoming/" },
  { name: "Past", path: "/past/" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const cleanPath = pathname.endsWith("/") ? pathname : pathname + "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        ...navStyle,
        background: scrolled
          ? "rgba(0,0,0,0.85)"
          : "rgba(0,0,0,0.55)",
        boxShadow: scrolled
          ? "0 10px 40px rgba(0,0,0,0.6)"
          : "none",
      }}
    >
      <div style={glowBar} />

      {links.map((link) => {
        const active = cleanPath === link.path;

        return (
          <Link key={link.path} href={link.path} style={linkStyle}>
            <span
              style={{
                ...textStyle,
                color: active ? "#facc15" : "#aaa",
                textShadow: active
                  ? "0 0 12px rgba(250,204,21,0.8)"
                  : "none",
              }}
            >
              {link.name}
            </span>

            {/* Active underline */}
            <span
              style={{
                ...underlineStyle,
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
  gap: "32px",
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
  background:
    "radial-gradient(circle at 50% -40%, rgba(250,204,21,0.18), transparent 60%)",
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
  background: "linear-gradient(90deg, #facc15, #fbbf24)",
  borderRadius: 10,
  boxShadow: "0 0 16px rgba(250,204,21,0.9)",
  transition: "all 0.4s ease",
  transformOrigin: "center",
};
