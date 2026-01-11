import "../styles/globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BrandProvider from "./brand-provider"

export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BrandProvider>
          <Navbar />
          <div className="page-wrap">{children}</div>
          <Footer />
        </BrandProvider>
      </body>
    </html>
  )
}
