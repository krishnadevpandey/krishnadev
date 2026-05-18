"use client";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Research", "Timeline", "Notes", "CV", "Contact"];

const TAGS = ["PZT", "MEMS", "Thin Films", "DFT", "Ferroelectrics", "Device Physics", "AlN", "LDV"];

const PROJECTS = [
  {
    id: "01",
    title: "PZT Interface Engineering",
    lab: "CeNSE · IISc Bangalore · 2026",
    desc: "Investigating interface-driven degradation and piezoelectric response variation in thin-film PZT stacks. Characterizing buffer layers (TiO₂ rutile/anatase, LaNiO₃) using temperature-dependent electrical measurements and wafer-level yield mapping on 4-inch (100) and (111)-oriented PZT wafers.",
    tags: ["Ferroelectrics", "Interface Engineering", "Wafer Yield", "P–E Loops"],
    color: "#00d4ff",
    gradient: "linear-gradient(135deg, #001a22 0%, #00141c 100%)",
    accent: "rgba(0,212,255,0.08)",
  },
  {
    id: "02",
    title: "Piezoelectric d₃₃ Extraction",
    lab: "CeNSE · IISc Bangalore · 2025",
    desc: "Designing novel electrode geometries to minimize substrate bending and improve accuracy of thin-film piezoelectric coefficient extraction. Measuring d₃₃ in AlN, AlScN, and PZT on Si/Mo substrates using Laser Doppler Vibrometry with FEM validation in COMSOL.",
    tags: ["LDV", "COMSOL FEM", "d₃₃", "Electrode Design"],
    color: "#7c6fff",
    gradient: "linear-gradient(135deg, #0d001a 0%, #08001a 100%)",
    accent: "rgba(124,111,255,0.08)",
  },
  {
    id: "03",
    title: "First-Principles Analysis of PZT",
    lab: "MANIT Bhopal · 2025",
    desc: "Combining sol-gel synthesis with density functional theory to investigate phase formation and electronic structure in lead zirconate titanate. Confirming perovskite phase via XRD, analyzing grain morphology via FESEM, and computing band gaps and density of states using Materials Studio.",
    tags: ["DFT", "XRD", "SEM", "Materials Studio"],
    color: "#00ff99",
    gradient: "linear-gradient(135deg, #00120a 0%, #000e07 100%)",
    accent: "rgba(0,255,153,0.08)",
  },
  {
    id: "04",
    title: "Crystal Growth & Poling — DRDO",
    lab: "SSPL · DRDO Delhi · 2024–25",
    desc: "Analyzing orientation selection for CdZnTe single-crystal growth using (111) seeds to suppress twinning. Evaluating pulsed versus DC poling strategies on PMN-PT single crystals, and analyzing binary/ternary phase equilibria using Thermo-Calc.",
    tags: ["PMN-PT", "CdZnTe", "Thermo-Calc", "Phase Diagrams"],
    color: "#ff6b35",
    gradient: "linear-gradient(135deg, #1a0800 0%, #140700 100%)",
    accent: "rgba(255,107,53,0.08)",
  },
];

const QUESTIONS = [
  "Why do interfaces degrade in ultra-thin ferroelectric stacks?",
  "How reliable are LDV-based d₃₃ extraction methods at the nanoscale?",
  "Can AlN and ferroelectrics coexist in hybrid MEMS systems?",
  "What limits scaling in piezoelectric thin-film devices?",
  "How do buffer layer crystallography choices propagate to device-level response?",
];

const TIMELINE = [
  { year: "2024", label: "DRDO Research Exposure", sub: "CdZnTe crystal growth · PMN-PT poling · SSPL Delhi", side: "left" },
  { year: "2025 Q1", label: "PZT Synthesis & DFT", sub: "Phase formation · Band gap calculations · MANIT Bhopal", side: "right" },
  { year: "2025 Q2", label: "IISc Summer Internship", sub: "d₃₃ extraction · AlN/PZT LDV · Class 100 cleanroom", side: "left" },
  { year: "2025 Q4", label: "Samsung Fellowship", sub: "India Semiconductor Workforce Development Program", side: "right" },
  { year: "2026", label: "Thin-Film Device Characterization", sub: "4-inch wafer yield · P–E loops · PMUT cantilevers", side: "left" },
  { year: "2026", label: "IISc B.Tech Thesis", sub: "Full device physics stack · d₃₁ · e₃₁ · interface engineering", side: "right" },
];

const NOTES = [
  { title: "Understanding P–E Loops", tag: "Ferroelectrics", desc: "A deep dive into polarization–electric field hysteresis and what loop shape reveals about domain dynamics, leakage, and fatigue mechanisms.", date: "Coming soon" },
  { title: "Why Substrate Bending Affects d₃₃", tag: "Metrology", desc: "Mechanical analysis of how substrate compliance convolves with the true thin-film piezoelectric response in LDV measurements.", date: "Coming soon" },
  { title: "AlN vs PZT — A System Comparison", tag: "Materials", desc: "Contrasting CMOS-compatibility, growth requirements, d₃₃ magnitudes, and integration trade-offs for MEMS transducer applications.", date: "Coming soon" },
  { title: "Interface Engineering in Ferroelectrics", tag: "Interfaces", desc: "How buffer layer choice, crystallographic orientation, and electrode chemistry shape the functional response of PZT thin films.", date: "Coming soon" },
  { title: "d₃₁ vs e₃₁ — Coefficient Conventions", tag: "Device Physics", desc: "Clarifying the piezoelectric tensor conventions, their physical meaning, and measurement approaches relevant to PMUT design.", date: "Coming soon" },
];

const CV_DATA = {
  education: [
    { inst: "Maulana Azad National Institute of Technology, Bhopal", degree: "B.Tech — Materials and Metallurgical Engineering", year: "2022–2026", detail: "GPA 8.16/10 · Rank 3 / 61" },
  ],
  honors: [
    "Rank 3 of 61 — top 5% of graduating class",
    "Selected for Research Experience Program, CeNSE IISc Bangalore (B.Tech Thesis, 2026)",
    "CeNSE Summer Internship + Certificate of Distinction, IISc Semiconductor Winter School (2025)",
    "Samsung Fellowship — India Semiconductor Workforce Development Program (2025)",
    "IIT Madras certification in Programming and Data Science (2024)",
  ],
  skills: [
    { cat: "Characterization", items: "Laser Doppler Vibrometry · Precision Multiferroic · DC Probe Station · XRD · FESEM · Optical Profilometer" },
    { cat: "Computation", items: "DFT (Materials Studio) · COMSOL Multiphysics · Thermo-Calc · VESTA" },
    { cat: "Software & Languages", items: "Python · MATLAB · Origin · LaTeX" },
  ],
};

// ─── Utility ────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Tiny animated grid background ─────────────────────────────────────────

function GridBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div style={{ position: "absolute", top: "20%", left: "60%", width: 600, height: 600, background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: "70%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(124,111,255,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────

function Nav({ page, setPage }: { page: string; setPage: (page: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", fn);

    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(6,6,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
    }}>
      <button onClick={() => setPage("home")} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 2,
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase" }}>Krishnadev</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Materials · MEMS · Devices</span>
      </button>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => { setPage(l.toLowerCase()); window.scrollTo(0,0); }} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: page === l.toLowerCase() ? "#00d4ff" : "rgba(255,255,255,0.5)",
            transition: "color 0.3s",
            padding: "4px 0",
            borderBottom: page === l.toLowerCase() ? "1px solid #00d4ff" : "1px solid transparent",
          }}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

function TagPill({ text, i }: { text: string; i: number }) {
  const colors = ["#00d4ff","#7c6fff","#00ff99","#ff6b35","#ff3e8a","#ffd700","#00d4ff","#7c6fff"];
  const c = colors[i % colors.length];
  return (
    <span style={{
      display: "inline-block",
      padding: "6px 16px",
      border: `1px solid ${c}33`,
      borderRadius: 2,
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 11,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: c,
      background: `${c}0a`,
      animation: `tagFloat ${2 + i * 0.3}s ease-in-out infinite alternate`,
    }}>{text}</span>
  );
}

function Hero({ setPage }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 2.5rem 80px", position: "relative" }}>
      {/* Decorative vertical line */}
      <div style={{ position: "absolute", left: "2.5rem", top: 140, bottom: 80, width: 1, background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div style={{ maxWidth: 900, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 1, background: "#00d4ff" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00d4ff" }}>Senior Undergraduate · MANIT Bhopal · IISc Bangalore</span>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          fontWeight: 300,
          lineHeight: 1.05,
          color: "#fff",
          margin: "0 0 1.5rem",
          letterSpacing: "-0.02em",
        }}>
          Engineering Functional<br />
          <span style={{ color: "#00d4ff", fontStyle: "italic" }}>Materials</span> for<br />
          Next-Generation<br />
          Intelligent Devices
        </h1>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16, fontWeight: 400, lineHeight: 1.8,
          color: "rgba(255,255,255,0.5)",
          maxWidth: 560, marginBottom: 48,
        }}>
          Undergraduate researcher working at the intersection of piezoelectric thin films, ferroelectric device physics, MEMS integration, and first-principles computation.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}>
          {TAGS.map((t, i) => <TagPill key={t} text={t} i={i} />)}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => { setPage("research"); window.scrollTo(0,0); }} style={{
            background: "#00d4ff", color: "#000", border: "none", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "14px 32px", borderRadius: 2,
            transition: "all 0.3s",
          }}>View Research</button>
          <a href="#" onClick={e => e.preventDefault()} style={{
            background: "none", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "14px 32px", borderRadius: 2, textDecoration: "none",
            transition: "all 0.3s", display: "inline-block",
          }}>Download CV</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "2.5rem", display: "flex", alignItems: "center", gap: 12, opacity: mounted ? 0.4 : 0, transition: "opacity 2s 1s" }}>
        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.4)" }} />
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Scroll</span>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const [ref, visible] = useInView(0.2);
  const chain = ["Materials", "→", "Interfaces", "→", "Thin Films", "→", "Devices", "→", "Intelligent Systems"];
  return (
    <section ref={ref} style={{ padding: "120px 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 60 }}>
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Research Philosophy</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 4px", alignItems: "baseline" }}>
          {chain.map((w, i) => (
            <span key={i} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: w === "→" ? "clamp(2rem,4vw,4rem)" : "clamp(2.5rem,5vw,5rem)",
              fontWeight: 300,
              color: w === "→" ? "rgba(255,255,255,0.15)" : (i === 0 || i === chain.length - 1) ? "#00d4ff" : "#fff",
              fontStyle: w === "→" ? "normal" : "italic",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              display: "inline-block",
            }}>{w}</span>
          ))}
        </div>
        <p style={{
          marginTop: 48,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.4)",
          maxWidth: 600,
          opacity: visible ? 1 : 0, transition: "opacity 1s 0.7s",
        }}>
          Every device capability traces back to how atoms arrange at an interface. Understanding that hierarchy — from crystal lattice to system performance — is the core of this research agenda.
        </p>
      </div>
    </section>
  );
}

function ProjectBlock({ p, i }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 2.5rem",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
      background: hovered ? `${p.accent}` : "transparent",
      transition: "background 0.6s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(30px)",
      transition2: "opacity 0.8s, transform 0.8s",
    }}>
      {/* Left: visual panel */}
      <div style={{
        order: i % 2 === 0 ? 0 : 1,
        aspectRatio: "16/9",
        background: p.gradient,
        borderRadius: 4,
        border: `1px solid ${p.color}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        transition: "border-color 0.4s",
        borderColor: hovered ? `${p.color}55` : `${p.color}22`,
      }}>
        {/* Abstract scientific visual */}
        <svg width="100%" height="100%" viewBox="0 0 400 225" style={{ position: "absolute", opacity: 0.3 }}>
          {[0,1,2,3,4,5,6,7].map(row =>
            [0,1,2,3,4,5,6,7,8,9].map(col => (
              <circle
  key={`${row}-${col}`}
  cx={col * 45 + 22}
  cy={row * 30 + 15}
  r={1.5}
  fill={p.color}
  opacity={(row + col) % 2 === 0 ? 1 : 0.2}
/>
            ))
          )}
          {[0,1,2,3].map(i => <line key={i} x1={i*120} y1={0} x2={i*120} y2={225} stroke={p.color} strokeWidth={0.5} opacity={0.15} />)}
          {[0,1,2,3,4].map(i => <line key={i} x1={0} y1={i*55} x2={400} y2={i*55} stroke={p.color} strokeWidth={0.5} opacity={0.15} />)}
          <circle cx={200} cy={112} r={50} fill="none" stroke={p.color} strokeWidth={1} opacity={0.4} />
          <circle cx={200} cy={112} r={30} fill="none" stroke={p.color} strokeWidth={0.5} opacity={0.3} strokeDasharray="4 4" />
          <circle cx={200} cy={112} r={8} fill={p.color} opacity={0.6} />
        </svg>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontWeight: 300, color: p.color, opacity: 0.15, lineHeight: 1 }}>{p.id}</div>
        </div>
      </div>

      {/* Right: text */}
      <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 24, height: 1, background: p.color }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: p.color }}>{p.lab}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 300, color: "#fff", margin: "0 0 1.2rem", lineHeight: 1.2, fontStyle: "italic" }}>{p.title}</h3>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "4px 10px" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionsSection() {
  const [ref, visible] = useInView(0.1);
  return (
    <section ref={ref} style={{ padding: "120px 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 60 }}>
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Current Questions</span>
        </div>
        {QUESTIONS.map((q, i) => (
          <div key={i} style={{
            padding: "28px 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "flex-start", gap: 24,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-20px)",
            transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
          }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#00d4ff", minWidth: 24, paddingTop: 4 }}>0{i + 1}</span>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem,2vw,1.5rem)", fontWeight: 300, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{q}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <PhilosophySection />
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ padding: "80px 2.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Featured Research</span>
          </div>
        </div>
        {PROJECTS.map((p, i) => <ProjectBlock key={p.id} p={p} i={i} />)}
      </section>
      <QuestionsSection />
      <TimelinePage inline />
    </>
  );
}

// ─── RESEARCH PAGE ───────────────────────────────────────────────────────────

function ResearchPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <div style={{ padding: "60px 2.5rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 1, background: "#00d4ff" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00d4ff" }}>Research</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, color: "#fff", margin: "0 0 1rem", fontStyle: "italic" }}>Project Archive</h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
          A living record of experimental and computational research across piezoelectric thin films, ferroelectric devices, crystal growth, and failure analysis.
        </p>
      </div>
      {PROJECTS.map((p, i) => <ProjectBlock key={p.id} p={p} i={i} />)}
      <QuestionsSection />
    </div>
  );
}

// ─── TIMELINE PAGE ───────────────────────────────────────────────────────────

function TimelinePage({ inline }) {
  const [ref, visible] = useInView(0.05);
  return (
    <section ref={ref} style={{ padding: inline ? "120px 2.5rem" : "120px 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: inline ? 120 : 120 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Timeline</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: "#fff", margin: "0 0 64px", fontStyle: "italic" }}>Research Milestones</h2>

        {/* Central line */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.08)", transform: "translateX(-50%)" }} />
          {TIMELINE.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: item.side === "left" ? "flex-end" : "flex-start",
              marginBottom: 48,
              paddingRight: item.side === "left" ? "calc(50% + 40px)" : 0,
              paddingLeft: item.side === "right" ? "calc(50% + 40px)" : 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : `translateX(${item.side === "left" ? 20 : -20}px)`,
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              position: "relative",
            }}>
              {/* Dot */}
              <div style={{
                position: "absolute",
                left: "50%", top: 16,
                width: 8, height: 8,
                borderRadius: "50%",
                background: "#00d4ff",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 12px rgba(0,212,255,0.5)",
              }} />
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#00d4ff", marginBottom: 6 }}>{item.year}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 300, color: "#fff", marginBottom: 4, fontStyle: "italic" }}>{item.label}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NOTES PAGE ──────────────────────────────────────────────────────────────

function NotesPage() {
  const tagColors = { "Ferroelectrics": "#00d4ff", "Metrology": "#7c6fff", "Materials": "#00ff99", "Interfaces": "#ff6b35", "Device Physics": "#ffd700" };
  return (
    <div style={{ paddingTop: 120, minHeight: "80vh" }}>
      <div style={{ padding: "40px 2.5rem 80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 1, background: "#00d4ff" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00d4ff" }}>Technical Notes</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, color: "#fff", margin: "0 0 1rem", fontStyle: "italic" }}>Field Notes</h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 560, lineHeight: 1.8, marginBottom: 64 }}>
          Writing as a tool for thinking. Short technical articles on ferroelectrics, measurement methods, and materials physics — aimed at researchers and curious engineers.
        </p>
        {NOTES.map((note, i) => (
          <div key={i} style={{
            padding: "36px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 24, alignItems: "start",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: tagColors[note.tag] || "#00d4ff",
                  border: `1px solid ${tagColors[note.tag]}33`,
                  padding: "3px 10px", borderRadius: 2,
                }}>{note.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#fff", margin: "0 0 10px", fontStyle: "italic" }}>{note.title}</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.7, maxWidth: 560 }}>{note.desc}</p>
            </div>
            <div style={{ textAlign: "right", paddingTop: 4 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>{note.date}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 48, padding: 32, border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 4, textAlign: "center" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0, letterSpacing: "0.1em" }}>Articles will be published as the research matures — check back.</p>
        </div>
      </div>
    </div>
  );
}

// ─── CV PAGE ─────────────────────────────────────────────────────────────────

function CVPage() {
  return (
    <div style={{ paddingTop: 120, minHeight: "80vh" }}>
      <div style={{ padding: "40px 2.5rem 100px", maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: "#00d4ff" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00d4ff" }}>Curriculum Vitae</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: "#fff", margin: "0 0 0.5rem", fontStyle: "italic" }}>Krishnadev Pandey</h1>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Materials and Metallurgical Engineering · MANIT Bhopal · IISc Bangalore</p>
          </div>
          <a href="#" onClick={e => e.preventDefault()} style={{
            background: "none", border: "1px solid rgba(0,212,255,0.4)", color: "#00d4ff",
            padding: "12px 28px", borderRadius: 2, cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none", display: "inline-block",
            transition: "all 0.3s",
          }}>Download PDF</a>
        </div>

        {/* Sections */}
        {[
          { title: "Education", content: (
            <>
              {CV_DATA.education.map((e, i) => (
                <div key={i} style={{ paddingBottom: 20 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 300, color: "#fff", fontStyle: "italic", marginBottom: 4 }}>{e.inst}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{e.degree}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{e.year} · {e.detail}</div>
                </div>
              ))}
            </>
          )},
          { title: "Research Experience", content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {PROJECTS.slice(0,3).map((p, i) => (
                <div key={i} style={{ paddingLeft: 16, borderLeft: `2px solid ${p.color}40` }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: p.color, textTransform: "uppercase", marginBottom: 6 }}>{p.lab}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#fff", fontStyle: "italic", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          )},
          { title: "Honors & Awards", content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CV_DATA.honors.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00d4ff", marginTop: 8, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{h}</span>
                </div>
              ))}
            </div>
          )},
          { title: "Technical Skills", content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CV_DATA.skills.map((s, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 20, alignItems: "start" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", paddingTop: 2 }}>{s.cat}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{s.items}</span>
                </div>
              ))}
            </div>
          )},
        ].map((sec, i) => (
          <div key={i} style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{sec.title}</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </div>
            {sec.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

function ContactPage() {
  const links = [
    { label: "Email", value: "krishnadevpandey417@gmail.com", href: "mailto:krishnadevpandey417@gmail.com", color: "#00d4ff" },
    { label: "LinkedIn", value: "linkedin.com/in/krishnadev-pandey", href: "#", color: "#7c6fff" },
    { label: "Google Scholar", value: "Profile — coming soon", href: "#", color: "#00ff99" },
    { label: "Location", value: "IISc Bangalore / MANIT Bhopal, India", href: null, color: "#ff6b35" },
  ];

  return (
    <div style={{ paddingTop: 120, minHeight: "80vh" }}>
      <div style={{ padding: "40px 2.5rem 100px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 1, background: "#00d4ff" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00d4ff" }}>Contact</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, color: "#fff", margin: "0 0 1rem", fontStyle: "italic" }}>Get in Touch</h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 480, lineHeight: 1.8, marginBottom: 64 }}>
          Open to research collaborations, internship discussions, and conversations on piezoelectric devices, MEMS, and functional materials.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {links.map((l, i) => (
            <div key={i} style={{
              padding: "28px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
            }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", minWidth: 120 }}>{l.label}</span>
              {l.href ? (
                <a href={l.href} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: l.color, textDecoration: "none", letterSpacing: "0.02em" }}>{l.value}</a>
              ) : (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{l.value}</span>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
        </div>

        <div style={{ marginTop: 64, padding: 32, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            "The best collaborations happen when curiosity overlaps — not just expertise."
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
      <div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 4 }}>Krishnadev Pandey</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>Materials · MEMS · Functional Devices · 2026</div>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => { setPage(l.toLowerCase()); window.scrollTo(0,0); }} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
            transition: "color 0.3s", padding: 0,
          }}>{l}</button>
        ))}
      </div>
    </footer>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    research: <ResearchPage />,
    timeline: (
      <div style={{ paddingTop: 64 }}>
        <TimelinePage />
      </div>
    ),
    notes: <NotesPage />,
    cv: <CVPage />,
    contact: <ContactPage />,
  };

  return (
    <div style={{ background: "#060608", minHeight: "100vh", color: "#fff", position: "relative" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
        @keyframes tagFloat {
          from { transform: translateY(0px); }
          to { transform: translateY(-4px); }
        }
        button:hover { opacity: 0.85; }
        a:hover { opacity: 0.8; }
      `}</style>

      <GridBg />
      <Nav page={page} setPage={setPage} />

      <main style={{ position: "relative", zIndex: 1 }}>
        {pages[page] || pages.home}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}