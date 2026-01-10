import "../styles/globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {/* Page transition wrapper */}
        <div className="page-wrap">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  )
}
