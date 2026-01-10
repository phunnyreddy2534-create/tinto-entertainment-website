"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const linkStyle = (p: string) => ({
    color: path === p ? "#facc15" : "#888",
    borderBottom: path === p ? "2px solid #facc15" : "none",
    paddingBottom: "4px",
  });

  return (
    <nav style={{ padding: 16, textAlign: "center" }}>
      <Link href="/" style={linkStyle("/")}>Home</Link>{" | "}
      <Link href="/about" style={linkStyle("/about")}>About</Link>{" | "}
      <Link href="/upcoming" style={linkStyle("/upcoming")}>Upcoming</Link>{" | "}
      <Link href="/past" style={linkStyle("/past")}>Past</Link>
    </nav>
  );
}
