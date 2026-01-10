"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
  { name: "Upcoming", path: "/upcoming/" },
  { name: "Past", path: "/past/" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-link ${isActive ? "active" : ""}`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
