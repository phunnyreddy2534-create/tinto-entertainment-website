export default function HomePage() {
  return (
    <main style={{ padding: "60px", maxWidth: 1100, margin: "auto" }}>
      
      {/* HERO */}
      <section style={{ textAlign: "center", marginBottom: 80 }}>
        <h1 style={{ fontSize: "3rem" }}>Tinto Entertainment</h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
          Premium Event & Entertainment Company
        </p>
      </section>

      {/* UPCOMING EVENTS */}
      <section style={{ marginBottom: 80 }}>
        <h2>Upcoming Events</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20
        }}>
          <div className="card">
            <h3>New Year Bash</h3>
            <p>📍 Hyderabad</p>
            <p>🎉 Live DJ Night</p>
          </div>

          <div className="card">
            <h3>College Fest</h3>
            <p>📍 Telangana</p>
            <p>🎶 Celebrity Performance</p>
          </div>

          <div className="card">
            <h3>Wedding Event</h3>
            <p>📍 Private Venue</p>
            <p>💍 Complete Event Production</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ textAlign: "center" }}>
        <h2>Contact Us</h2>

        <p>📞 +91 9392267226</p>
        <p>💬 WhatsApp: +91 9392267226</p>
        <p>
          📧{" "}
          <a href="mailto:tintoentertainmentindia@gmail.com">
            tintoentertainmentindia@gmail.com
          </a>
        </p>
        <p>
          📸{" "}
          <a
            href="https://www.instagram.com/tintoentertainment"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tintoentertainment
          </a>
        </p>
      </section>

    </main>
  )
}
