export default function HomePage() {
  return (
    <main className="page">
      {/* HERO */}
      <section style={hero}>
        <div style={heroGlow} />

        <h1 style={heroTitle}>Tinto Entertainment</h1>
        <p style={heroSubtitle}>
          Premium Event & Festival Experience
        </p>

        <div style={ctaWrap}>
          <a href="/upcoming/" style={ctaPrimary}>View Upcoming Events</a>
          <a href="/about/" style={ctaSecondary}>About Us</a>
        </div>
      </section>

      {/* UPCOMING */}
      <section style={section}>
        <h2>Upcoming Events</h2>

        <div style={grid}>
          <div className="card">
            <h3>New Year Bash</h3>
            <p>📍 Hyderabad</p>
            <p>🎧 DJ Night & Live Acts</p>
          </div>

          <div className="card">
            <h3>College Fest</h3>
            <p>📍 Telangana</p>
            <p>🎤 Celebrity Performance</p>
          </div>

          <div className="card">
            <h3>Wedding Night</h3>
            <p>📍 Private Venue</p>
            <p>💫 Full Event Production</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ ...section, textAlign: "center" }}>
        <h2>Contact</h2>
        <p>📞 +91 9392267226</p>
        <p>📧 tintoentertainmentindia@gmail.com</p>
        <p>
          📸{" "}
          <a href="https://www.instagram.com/tintoentertainment" target="_blank">
            @tintoentertainment
          </a>
        </p>
      </section>
    </main>
  );
}

/* ================== STYLES ================== */

const hero = {
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center" as const,
  position: "relative" as const,
  overflow: "hidden",
};

const heroGlow = {
  position: "absolute" as const,
  inset: 0,
  background:
    "radial-gradient(circle at 50% 30%, rgba(250,204,21,0.35), transparent 60%)",
  filter: "blur(80px)",
};

const heroTitle = {
  fontSize: "clamp(2.5rem, 6vw, 4rem)",
  fontWeight: 900,
  letterSpacing: "-0.04em",
  zIndex: 1,
};

const heroSubtitle = {
  marginTop: 12,
  fontSize: "1.1rem",
  opacity: 0.8,
  zIndex: 1,
};

const ctaWrap = {
  marginTop: 32,
  display: "flex",
  gap: 20,
  zIndex: 1,
};

const ctaPrimary = {
  background: "linear-gradient(135deg, #facc15, #fbbf24)",
  padding: "14px 26px",
  borderRadius: 14,
  color: "#000",
  fontWeight: 800,
  textDecoration: "none",
};

const ctaSecondary = {
  border: "1px solid rgba(250,204,21,0.5)",
  padding: "14px 26px",
  borderRadius: 14,
  color: "#facc15",
  textDecoration: "none",
};

const section = {
  padding: "80px 24px",
  maxWidth: 1100,
  margin: "0 auto",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
  marginTop: 30,
};
