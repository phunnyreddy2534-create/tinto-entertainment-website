"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Upcoming", path: "/events/upcoming" },
  { name: "Past", path: "/events/past" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={navStyle}>
      {links.map((link) => {
        const active = pathname === link.path;
        return (
          <Link key={link.path} href={link.path} style={linkStyle}>
            <span
              style={{
                ...textStyle,
                color: active ? "#facc15" : "#aaa",
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
  gap: "28px",
  padding: "20px 0",
  position: "sticky",
  top: 0,
  background: "rgba(0,0,0,0.85)",
  backdropFilter: "blur(12px)",
  zIndex: 100,
};

const linkStyle: React.CSSProperties = {
  position: "relative",
  textDecoration: "none",
  padding: "8px 4px",
};

const textStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  transition: "color 0.3s ease",
};

const underlineStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: -6,
  height: 3,
  background: "linear-gradient(90deg, #facc15, #fbbf24)",
  borderRadius: 10,
  boxShadow: "0 0 12px rgba(250,204,21,0.7)",
  transition: "all 0.3s ease",
  transformOrigin: "center",
};
