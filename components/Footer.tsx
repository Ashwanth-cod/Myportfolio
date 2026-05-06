export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        color: "#f5f3ee",
        padding: "48px 40px 32px",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 40,
          paddingBottom: 40,
          borderBottom: "1px solid #1a1a1a",
          marginBottom: 32,
        }}
      >
        <div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5 }}>
            Ashwanth<span style={{ color: "#ff4d1c" }}>.</span>
          </div>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "#555",
              letterSpacing: 1,
              marginTop: 12,
              lineHeight: 2,
            }}
          >
            PROGRAMMER · FULL STACK DEVELOPER · INNOVATOR
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "flex-end",
          }}
        >
          {["About", "Certifications", "Projects", "Skills"].map((l) => (
            <a key={l} href={`/#${l.toLowerCase()}`} className="footer-link">
              {l}
            </a>
          ))}
          <a href="mailto:ashwanth.ars@gmail.com" className="footer-link">
            Email ↗
          </a>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#333",
            letterSpacing: 1.5,
          }}
        >
          © 2024 ASHWANTH S — ALL RIGHTS RESERVED
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#333",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: "#22c55e",
              borderRadius: "50%",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          AVAILABLE FOR WORK
        </span>
      </div>
    </footer>
  );
}
