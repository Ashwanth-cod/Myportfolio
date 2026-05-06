"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV = ["About", "Certs", "Projects", "Skills", "Contact"];

const SKILLS = [
  { name: "Django", pct: 90, years: "3 yrs" },
  { name: "Python", pct: 85, years: "4 yrs" },
  { name: "JavaScript", pct: 80, years: "5 yrs" },
  { name: "Flutter", pct: 67, years: "2 yrs" },
  { name: "React / Next", pct: 78, years: "1 yrs" },
  { name: "SQL / Django ORM", pct: 75, years: "4 yrs" },
];

const PROJECTS = [
  {
    tag: "04",
    title: "Design Championship Entry",
    tech: "Figma · HTML · CSS",
    desc: "Award-winning UI/UX submission. 1st in South-2 Region, 2nd nationally.",
    href: "/projects/design",
    year: "2024",
  },
];

const CERTS = [
  {
    title: "Design Championship",
    body: "1st Place — South-2 Region",
    sub: "2nd Place Nationally · 2024",
    accent: true,
  },
  {
    title: "Python Certification",
    body: "Subhi Technologies / IACT",
    sub: "Sep – Dec 2023",
    accent: false,
  },
  {
    title: "Web Development",
    body: "Full-Stack Bootcamp",
    sub: "Django · React · PostgreSQL",
    accent: false,
  },
];

const STATS = [
  { n: "8", label: "Age started coding" },
  { n: "6+", label: "Languages mastered" },
  { n: "12+", label: "Projects shipped" },
  { n: "2×", label: "National placements" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SkillBar({
  name,
  pct,
  years,
  i,
}: {
  name: string;
  pct: number;
  years: string;
  i: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ marginBottom: 28 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "1.5px",
            color: "var(--ink)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--dim)",
          }}
        >
          {years} · {pct}%
        </span>
      </div>
      <div style={{ height: 2, background: "#e8e6e0", overflow: "hidden" }}>
        <div
          style={{
            height: 2,
            background: "var(--ink)",
            width: visible ? `${pct}%` : "0%",
            transition: `width 1s cubic-bezier(.4,0,.2,1) ${i * 0.1}s`,
          }}
        />
      </div>
    </div>
  );
}

function Card({
  children,
  href,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  href?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useInView();
  const base: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e8e6e0",
    padding: "36px",
    display: "block",
    color: "var(--ink)",
    textDecoration: "none",
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(24px)",
    transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
    position: "relative",
    overflow: "hidden",
    cursor: href ? "pointer" : "default",
    ...style,
  };
  const inner = (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={base}>
      {children}
    </div>
  );
  return href ? (
    <Link href={href} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  ) : (
    inner
  );
}

export default function Home() {
  const [menuOpen, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
        :root { --a:#ff4d1c; --ink:#0a0a0a; --paper:#f5f3ee; --dim:#888; --mono:'Space Mono',monospace; --sans:'Syne',sans-serif; }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{font-family:var(--sans);background:var(--paper);color:var(--ink);overflow-x:hidden}
        a{text-decoration:none;color:inherit}
        @keyframes pulse{50%{opacity:.35}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
        @keyframes heroIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
        @keyframes menuLink{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        .card-hover{transition:transform .25s,box-shadow .25s}
        .card-hover:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,.08)}
        .nav-link-item{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);padding:0 18px;height:60px;display:flex;align-items:center;border-left:1px solid #1a1a1a;transition:color .2s,background .2s;text-decoration:none}
        .nav-link-item:hover{color:#fff;background:#111}
        .project-tag{font-family:var(--mono);font-size:9px;letter-spacing:2px;color:var(--a);text-transform:uppercase;margin-bottom:10px}
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .ham-btn{display:flex!important}
          .hero-h1{font-size:clamp(52px,15vw,80px)!important;letter-spacing:-3px!important}
          .grid-2{grid-template-columns:1fr!important}
          .grid-3{grid-template-columns:1fr 1fr!important}
          .stats-grid{grid-template-columns:1fr 1fr!important}
          .section-pad{padding:80px 20px!important}
          .ticker-text{font-size:28px!important}
        }
        @media(max-width:480px){
          .grid-3{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* OVERLAY */}
      <div
        onClick={() => setMenu(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--ink)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .25s ease",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenu(false);
          }}
          style={{
            position: "absolute",
            top: 20,
            right: 28,
            background: "none",
            border: "none",
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#555",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
        >
          [ ESC ] CLOSE
        </button>
        {NAV.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenu(false)}
            style={{
              fontSize: "clamp(36px,7vw,56px)",
              fontWeight: 800,
              color: "#fff",
              animation: menuOpen
                ? `menuLink .35s ease ${i * 0.07}s both`
                : "none",
              transition: "color .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--a)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            {item}
          </a>
        ))}
        <p
          style={{
            position: "absolute",
            bottom: 28,
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#333",
            letterSpacing: "2px",
          }}
        >
          ASHWANTH.DEV · 2024
        </p>
      </div>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          zIndex: 100,
          background: scrolled ? "rgba(10,10,10,.97)" : "var(--ink)",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          backdropFilter: "blur(8px)",
          transition: "background .3s",
          animation: "fadeDown .4s ease both",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "#fff",
            letterSpacing: "2px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              background: "var(--a)",
              borderRadius: "50%",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          ASHWANTH.DEV
        </div>
        <div className="desktop-nav" style={{ display: "flex" }}>
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link-item"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="mailto:ashwanth.ars@gmail.com"
          className="desktop-nav"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "1px",
            background: "var(--a)",
            color: "#fff",
            padding: "9px 18px",
            transition: "background .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e04016")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--a)")}
        >
          Contact ↗
        </a>
        <button
          className="ham-btn"
          onClick={() => setMenu(true)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <span
            style={{
              display: "block",
              width: 20,
              height: 1.5,
              background: "#fff",
            }}
          />
          <span
            style={{
              display: "block",
              width: 20,
              height: 1.5,
              background: "#fff",
            }}
          />
          <span
            style={{
              display: "block",
              width: 20,
              height: 1.5,
              background: "#fff",
            }}
          />
        </button>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 40px 80px",
          paddingTop: 60,
          background: "var(--ink)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${i * 20}%`,
              width: 1,
              background: "rgba(255,255,255,.03)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 40,
            right: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "#333",
              letterSpacing: "2px",
            }}
          >
            PORTFOLIO · 2024
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "#333",
              letterSpacing: "2px",
            }}
          >
            Tirupur, INDIA
          </span>
        </div>
        <div style={{ maxWidth: 1200 }}>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--a)",
              letterSpacing: "3px",
              marginBottom: 24,
              animation: "heroIn .6s ease .1s both",
            }}
          >
            DEVELOPER · INNOVATOR · CREATOR
          </p>
          <h1
            className="hero-h1"
            style={{
              fontSize: "clamp(72px,11vw,140px)",
              fontWeight: 800,
              letterSpacing: "-5px",
              lineHeight: 0.95,
              marginBottom: 40,
              animation: "heroIn .6s ease .2s both",
            }}
          >
            Build<span style={{ color: "var(--a)" }}>.</span>
            <br />
            Ship<span style={{ color: "#333" }}>.</span>
            <br />
            Repeat<span style={{ color: "var(--a)" }}>.</span>
          </h1>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              animation: "heroIn .6s ease .35s both",
            }}
          >
            <a
              href="mailto:ashwanth.ars@gmail.com"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "1.5px",
                background: "var(--a)",
                color: "#fff",
                padding: "14px 28px",
                transition: "background .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e04016")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--a)")
              }
            >
              CONTACT ME
            </a>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 80,
            textAlign: "right",
            animation: "heroIn .6s ease .5s both",
          }}
        >
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "#444",
              letterSpacing: "1.5px",
              lineHeight: 2.2,
            }}
          >
            PROGRAMMER
            <br />
            FULL STACK DEVELOPER
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "heroIn .6s ease .7s both",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              color: "#333",
              letterSpacing: "2px",
            }}
          >
            SCROLL
          </span>
          <div style={{ width: 1, height: 32, background: "#333" }} />
        </div>
      </section>

      {/* TICKER */}
      <div
        style={{
          background: "var(--a)",
          overflow: "hidden",
          borderTop: "1px solid #e03d10",
          borderBottom: "1px solid #e03d10",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "ticker 20s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(2)].map((_, r) => (
            <span
              key={r}
              className="ticker-text"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 32,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-1px",
                paddingRight: 48,
              }}
            >
              {
                "PYTHON · DJANGO · FLUTTER · JAVASCRIPT · REACT · NEXT.JS · AI · ROBOTICS · FULL STACK · GAMER · CEO · "
              }
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ background: "var(--ink)", padding: "80px 40px" }}>
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
          }}
        >
          {STATS.map(({ n, label }) => (
            <div
              key={label}
              style={{
                padding: "48px 32px",
                borderRight: "1px solid #1a1a1a",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: "var(--a)",
                  letterSpacing: "-3px",
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "#555",
                  letterSpacing: "1.5px",
                  marginTop: 12,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-pad"
        style={{ padding: "120px 40px", background: "var(--paper)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--a)",
                  letterSpacing: "3px",
                  marginBottom: 20,
                }}
              >
                01 — ABOUT ME
              </p>
              <h2
                style={{
                  fontSize: "clamp(36px,5vw,64px)",
                  fontWeight: 800,
                  letterSpacing: "-2px",
                  lineHeight: 1.05,
                  marginBottom: 32,
                }}
              >
                Coding since
                <br />
                <em style={{ fontStyle: "normal", color: "var(--a)" }}>
                  age eight.
                </em>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--dim)",
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                I am Ashwanth — a full-stack developer from Tirupur with an
                obsession for building things that are both fast and beautiful.
                Started with hardware at 8, moved into web at 12, and now I ship
                production apps across Django, Flutter, and React. And now, at
                14, decided to go all-in in space tech and aim for the stars and
                the red planet.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--dim)",
                  lineHeight: 1.9,
                  marginBottom: 36,
                }}
              >
                I specialize in and practical software — from robotics
                controllers to real-time dashboards. I do not just write code; I
                solve problems with it while having fun too.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { label: "Based in", value: "Tirupur, India" },
                { label: "Focus", value: "Full Stack + AI" },
                { label: "Experience", value: "7+ years coding" },
                { label: "Status", value: "🟢 Available" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "#fff",
                    border: "1px solid #e8e6e0",
                    padding: "24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      color: "var(--dim)",
                      letterSpacing: "1.5px",
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: "-.3px",
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{
          padding: "120px 40px",
          background: "var(--ink)",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 64,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--a)",
                  letterSpacing: "3px",
                  marginBottom: 16,
                }}
              >
                02 — PROJECTS
              </p>
              <h2
                style={{
                  fontSize: "clamp(36px,5vw,64px)",
                  fontWeight: 800,
                  letterSpacing: "-2px",
                  lineHeight: 1.05,
                }}
              >
                Things I have
                <br />
                shipped.
              </h2>
            </div>
            <Link
              href="/projects"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "#555",
                letterSpacing: "1.5px",
                borderBottom: "1px solid #333",
                paddingBottom: 4,
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              VIEW ALL →
            </Link>
          </div>
          <div
            className="grid-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {PROJECTS.map((p, i) => (
              <Link
                key={p.tag}
                href={p.href}
                className="card-hover"
                style={{
                  display: "block",
                  border: "1px solid #1a1a1a",
                  padding: "36px",
                  opacity: 1,
                  position: "relative",
                  overflow: "hidden",
                  background: i === 0 ? "var(--a)" : "#0f0f0f",
                  transition:
                    "border-color .2s, transform .25s, box-shadow .25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#444")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#1a1a1a")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 32,
                  }}
                >
                  <span
                    className="project-tag"
                    style={{
                      color: i === 0 ? "rgba(255,255,255,.7)" : "var(--a)",
                    }}
                  >
                    {p.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: i === 0 ? "rgba(255,255,255,.5)" : "#333",
                      letterSpacing: "1px",
                    }}
                  >
                    {p.year}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "clamp(20px,2.5vw,28px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    marginBottom: 12,
                    color: "#fff",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: i === 0 ? "rgba(255,255,255,.6)" : "#555",
                    letterSpacing: "1px",
                    marginBottom: 16,
                  }}
                >
                  {p.tech}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: i === 0 ? "rgba(255,255,255,.85)" : "#666",
                    lineHeight: 1.8,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    position: "absolute",
                    bottom: 28,
                    right: 28,
                    fontSize: 24,
                    opacity: 0.2,
                    transition: "opacity .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translate(3px,-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = ".2";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  ↗
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="section-pad"
        style={{ padding: "120px 40px", background: "var(--paper)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="grid-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--a)",
                  letterSpacing: "3px",
                  marginBottom: 20,
                }}
              >
                03 — SKILLS
              </p>
              <h2
                style={{
                  fontSize: "clamp(36px,5vw,64px)",
                  fontWeight: 800,
                  letterSpacing: "-2px",
                  lineHeight: 1.05,
                  marginBottom: 48,
                }}
              >
                My
                <br />
                stack.
              </h2>
              {SKILLS.map((s, i) => (
                <SkillBar key={s.name} {...s} i={i} />
              ))}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--a)",
                  letterSpacing: "3px",
                  marginBottom: 20,
                }}
              >
                ALSO KNOW
              </p>
              <div
                className="grid-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                  marginBottom: 48,
                }}
              >
                {[
                  "Git",
                  "Docker",
                  "Firebase",
                  "Figma",
                  "MQTT",
                  "Linux",
                  "Dart",
                  "Networking",
                ].map((tech) => (
                  <div
                    key={tech}
                    style={{
                      background: "#fff",
                      border: "1px solid #e8e6e0",
                      padding: "12px 16px",
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "1px",
                      color: "var(--dim)",
                      textAlign: "center",
                      transition: "all .2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.color = "var(--dim)";
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "var(--ink)",
                  padding: "36px",
                  color: "#fff",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "#555",
                    letterSpacing: "1.5px",
                    marginBottom: 16,
                  }}
                >
                  CURRENT FOCUS
                </p>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "-.5px",
                    lineHeight: 1.5,
                  }}
                >
                  Study to reach ISRO and make space tech more accessible. And
                  Mother Bharat proud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" style={{ padding: "120px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--a)",
              letterSpacing: "3px",
              marginBottom: 20,
            }}
          >
            04 — CERTIFICATIONS
          </p>
          <h2
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              marginBottom: 64,
            }}
          >
            Proof of
            <br />
            work.
          </h2>
          <div
            className="grid-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {CERTS.map((c, i) => (
              <Card
                key={c.title}
                delay={i * 0.1}
                style={{
                  background: c.accent ? "var(--ink)" : "#fff",
                  border: `1px solid ${c.accent ? "var(--ink)" : "#e8e6e0"}`,
                }}
              >
                <div className="card-hover">
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      color: "var(--a)",
                      letterSpacing: "2px",
                      marginBottom: 20,
                    }}
                  >
                    CERT {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "-.5px",
                      marginBottom: 10,
                      color: c.accent ? "#fff" : "var(--ink)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      color: c.accent ? "rgba(255,255,255,.7)" : "var(--dim)",
                      marginBottom: 8,
                    }}
                  >
                    {c.body}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: c.accent ? "#555" : "#bbb",
                      letterSpacing: "1px",
                    }}
                  >
                    {c.sub}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — no form, just info + CTA */}
      <section
        id="contact"
        style={{
          padding: "120px 40px",
          background: "var(--ink)",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--a)",
              letterSpacing: "3px",
              marginBottom: 20,
            }}
          >
            05 — CONTACT
          </p>
          <div
            className="grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(40px,6vw,80px)",
                  fontWeight: 800,
                  letterSpacing: "-3px",
                  lineHeight: 1.05,
                  marginBottom: 32,
                }}
              >
                Say
                <br />
                <em style={{ fontStyle: "normal", color: "var(--a)" }}>
                  Hello.
                </em>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#555",
                  lineHeight: 1.9,
                  marginBottom: 40,
                }}
              >
                Have a project in mind? Want to collaborate? Or just want to say
                hi? My inbox is always open.
              </p>
              <a
                href="mailto:ashwanth.ars@gmail.com"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  background: "var(--a)",
                  color: "#fff",
                  padding: "15px 32px",
                  display: "inline-block",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#e04016")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--a)")
                }
              >
                SEND AN EMAIL →
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                {
                  label: "EMAIL",
                  value: "ashwanth.ars@gmail.com",
                  href: "mailto:ashwanth.ars@gmail.com",
                },
                {
                  label: "AVAILABILITY",
                  value: "Open to freelance & full-time",
                  href: null,
                },
              ].map(({ label, value, href }) => (
                <div
                  key={label}
                  style={{ borderTop: "1px solid #1a1a1a", padding: "24px 0" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      color: "#444",
                      letterSpacing: "1.5px",
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        transition: "color .2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--a)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontSize: 16, color: "#555" }}>{value}</p>
                  )}
                </div>
              ))}
              <div style={{ borderTop: "1px solid #1a1a1a" }} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "var(--ink)",
          borderTop: "1px solid #1a1a1a",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#333",
            letterSpacing: "1px",
          }}
        >
          © 2024 ASHWANTH S · ALL RIGHTS RESERVED
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#333",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              background: "#22c55e",
              borderRadius: "50%",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          AVAILABLE FOR WORK
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["GitHub", "LinkedIn", "Email"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "#333",
                letterSpacing: "1px",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--a)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
