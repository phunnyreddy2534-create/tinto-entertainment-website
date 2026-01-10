import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{
      padding: "16px",
      textAlign: "center",
      fontWeight: 600
    }}>
      <Link href="/">Home</Link>{" | "}
      <Link href="/about">About</Link>{" | "}
      <Link href="/upcoming">Upcoming</Link>{" | "}
      <Link href="/past">Past</Link>
    </nav>
  )
}
