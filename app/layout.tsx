import "../styles/globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useBrand } from "../lib/useBrand"

export const dynamic = "force-dynamic"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const brand = useBrand()

  return (
    <html lang="en">
      <body
        style={{
          background: brand?.background || "#000",
          color: brand?.text || "#fff",
          transition: "all .4s ease",
        }}
      >
        <Navbar />

        <div className="page-wrap">{children}</div>

        <Footer />
      </body>
    </html>
  )
}
