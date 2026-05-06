"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0a0a",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity .3s ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 32,
            left: 40,
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "#444",
            letterSpacing: 2,
          }}
        >
          ASHWANTHS.IN / NAV
        </span>
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 32,
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: 1,
          }}
        >
          [ ESC ] CLOSE
        </button>
        {["About", "Certs", "Projects", "Skills"].map((l, i) => (
          <Link
            key={l}
            href={`/#${l.toLowerCase()}`}
            onClick={() => setOpen(false)}
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#f5f3ee",
              textDecoration: "none",
              letterSpacing: -1,
              animation: open
                ? `revealLink .4s ease ${0.05 + i * 0.05}s both`
                : "none",
            }}
          >
            {l}
          </Link>
        ))}
      </div>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 64,
          background: "#0a0a0a",
          borderBottom: "1px solid #222",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "#f5f3ee",
            letterSpacing: 2,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              background: "#ff4d1c",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          ASHWANTH.DEV
        </div>
        <div className="nav-links" style={{ display: "flex" }}>
          {["About", "Certs", "Projects", "Skills"].map((l) => (
            <Link key={l} href={`/#${l.toLowerCase()}`} className="nav-link">
              {l}
            </Link>
          ))}
        </div>
        <a href="mailto:ashwanth.ars@gmail.com" className="nav-cta">
          Contact ↗
        </a>
        <button className="hamburger" onClick={() => setOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}
