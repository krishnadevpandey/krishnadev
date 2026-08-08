"use client";
// @ts-nocheck
import { useState, useEffect, useRef } from "react";
const COLORS = {
  heading: "#ffffff",
  body: "#e2e8f0",
  muted: "#cbd5e1",
  nav: "#f8fafc"
};

const NAV_LINKS = ["About", "Research", "CV", "Courses"];

const TAGS = ["Piezoelectric and Ferroelectric Thin Films", "Micro-Electro-Mechanical Systems", "Semiconductor Devices", "Interface Engineering", "Multiscale Modeling"];
const AFFILIATIONS = [
  {
    name: "IIT Kanpur",
    subtitle: "2026–Present",
    logo: "/logos/iitk.png",
  },
  {
    name: "IISc Bangalore",
    subtitle: "Summer 2025 and Thesis 2026",
    logo: "/logos/iisc.png",
  },
  {
    name: "MANIT Bhopal",
    subtitle: "2022–2026",
    logo: "/logos/manit.png",
  },
  {
    name: "DRDO",
    subtitle: "Winter 2024",
    logo: "/logos/drdo.png",
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "Interface Engineering and Electromechanical Characterization of Piezo-MEMS Devices",
    lab: "Centre for Nano Science and Engineering · IISc Bangalore · 2026",
    desc: "Investigated how bottom-electrode architecture influences the electrical, piezoelectric, and electromechanical performance of PZT thin-film MEMS devices. Assessed the quality of PZT films and Pt bottom electrodes through wafer-scale electrical characterization of over 270 capacitors across two 4-inch (100) and (111) wafers, and extracted the in-plane piezoelectric coefficients (e₃₁,f and d₃₁) of PZT and AlN microcantilevers using LDV measurements and MATLAB-based electromechanical modeling.",
    tags: ["Piezoelectric Micromachined Ultrasonic Transducer", "Interface Engineering","Device Physics", "Wafer Yield"],
    color: "#00d4ff",
    gradient: "linear-gradient(135deg, #001a22 0%, #00141c 100%)",
    image: "/images/PMUT_reso.gif",
    imageAlt: "PMUT response",
    accent: "rgba(0,212,255,0.08)",
  },
  {
    id: "02",
    title: "Quantitative Electromechanical Characterization of Piezoelectric Thin Films",
    lab: "Centre for Nano Science and Engineering · IISc Bangalore · 2025",
    desc: "Developed high-accuracy methodologies for extracting the longitudinal piezoelectric coefficient (d₃₃) in AlN and PZT thin films on Mo/Si substrates. Addressed substrate-bending artifacts, a key limitation in nanoscale electromechanical metrology, through optimized micro-electrode design and validated Laser Doppler Vibrometry (LDV) displacement profiles using coupled multiphysics finite-element simulations in COMSOL.",
    tags: ["Piezoelectric Metrology", "Electrode Design", "Finite-Element Modeling", "Electromechanical Characterization"],
    color: "#7c6fff",
    gradient: "linear-gradient(135deg, #0d001a 0%, #08001a 100%)",
    image: "/images/ldv-setup.jpeg",
    imageAlt: "Laser Doppler Vibrometry setup",
    accent: "rgba(124,111,255,0.08)",
  },
  {
    id: "03",
    title: "Experimental and First-Principles Investigation of PZT Ceramics",
    lab: "MANIT Bhopal · 2025",
    desc: "Developed a mechanochemical route for synthesizing single-phase PZT ceramics and correlated processing-induced microstructural evolution with electronic structure using first-principles DFT. Confirmed perovskite phase formation via XRD, analyzed densification and grain morphology using SEM, and computed the electronic band structure and density of states in Materials Studio.",
    tags: ["Mechanochemical Synthesis", "Structure–Property Correlations", "Materials Studio"],
    color: "#00ff99",
    gradient: "linear-gradient(135deg, #00120a 0%, #000e07 100%)",
    image: "/images/XRD.jpeg",
    imageAlt: "XRD result",
    accent: "rgba(0,255,153,0.08)",
  },
  {
    id: "04",
    title: "Crystal Growth & Poling of Single Crystals",
    lab: "Solid State Physics Laboratory · DRDO Delhi · 2024–25",
    desc: "Investigated crystal-growth and poling strategies for CdZnTe and PMN-PT single crystals. Optimized Bridgman growth through (111) seed orientation to suppress twinning, compared AC and DC poling using d₃₃ measurements, and performed CALPHAD-based modeling of binary and ternary phase equilibria using Thermo-Calc.",
    tags: ["Single-Crystal Growth", "Poling", "Thermo-Calc", "Phase Stability"],
    color: "#ff6b35",
    gradient: "linear-gradient(135deg, #1a0800 0%, #140700 100%)",
    image: "/images/PMN-PT.png",
    imageAlt: "PMN-PT crystal",
    accent: "rgba(255,107,53,0.08)",
  },
];

// ─── DETAILED PROJECT INFORMATION ────────────────────────────────────────────

const PROJECT_DETAILS = {
  "01": {
    guide: "Prof. Gayathri Pillai",
    guideLink: "https://www.cense.iisc.ac.in/gayathri-pillai/",
    institute: "Centre for Nano Science and Engineering, IISc Bangalore",
    caption: "PZT PMUT device characterized using Laser Doppler Vibrometry to evaluate its electromechanical response.",
    objective:
      "To investigate how electrode architectures and thin-film properties influence the electrical, piezoelectric, and electromechanical performance of PZT-based piezoelectric MEMS devices.",

    sections: [
      {
        title: "Wafer-Level Characterization",
        text:
          "Characterized more than 270 circular PZT capacitor test structures across 4-inch (100)- and (111)-oriented wafers to evaluate device yield, leakage behavior, dielectric response, and spatial uniformity. The measurements enabled wafer-level identification of shorted devices and process-related variations.",
        image: "/images/Wafer.jpeg",
        imageAlt: "Wafer-level characterization of PZT capacitor devices",
      },

      {
        title: "Piezoelectric Coefficient Extraction",
        text:
          "Extracted the in-plane piezoelectric coefficients d31 and e31,f for PZT and AlN microcantilevers using Laser Doppler Vibrometry. The measured electromechanical response was analyzed using a MATLAB-based model to relate cantilever displacement to the thin-film piezoelectric response.",
        image: "/images/AlN.png",
        imageAlt: "PZT and AlN cantilever characterization using LDV",
      },

      {
        title: "PMUT Interface Engineering",
        text:
          "Investigated the effect of bottom-electrode architecture on PMUT performance by comparing single-, bilayer-, and composite-Pt configurations. Resonance behavior, displacement profiles, and electrical output were characterized using Laser Doppler Vibrometry and lock-in amplifier measurements.",
        image: "/images/project1-pmut.jpeg",
        imageAlt: "PMUT electrode architectures and characterization",
      },

      {
        title: "Electrical and Ferroelectric Characterization",
        text:
          "Investigated anomalous transient I–V spikes and separated measurement-acquisition artifacts from intrinsic leakage mechanisms. Time-dependent electrical characterization helped distinguish Poole–Frenkel emission and Schottky barrier injection, while P–E and butterfly C–V measurements were used to study ferroelectric behavior and interface effects.",
        image: "/images/project1-electrical.jpeg",
        imageAlt: "Electrical characterization of PZT devices",
      },
    ],

    results: [
      {
        value: "270+",
        label: "PZT capacitor structures characterized",
      },
      {
        value: "≤5%",
        label: "Wafer-level shorting rate",
      },
      {
        value: "5.80%",
        label: "Increase in peripheral PMUT displacement",
      },
      {
        value: "1.65×",
        label: "Peak output voltage enhancement",
      },
      {
        value: "48.848 mV",
        label: "Peak PMUT output voltage",
      },
      {
        value: "εr ≈ 1118",
        label: "Extracted thin-film permittivity",
      },
    ],

    methods:
      "PZT thin films · AlN thin films · P–E characterization · C–V characterization · I–V characterization · Laser Doppler Vibrometry · Lock-in Amplifier · DC Probe Station · Precision Multiferroic · MATLAB",
  },

  "02": {
    guide: "Prof. Gayathri Pillai",
    guideLink: "https://www.cense.iisc.ac.in/gayathri-pillai/",
    institute: "Centre for Nano Science and Engineering, IISc Bangalore",
    caption: "Laser Doppler Vibrometry-based characterization of piezoelectric thin-film response.",
    objective:
      "To establish reliable methodologies for piezoelectric d33 extraction and investigate the influence of measurement geometry and ferroelectric poling on thin-film piezoelectric response.",

    sections: [
      {
        title: "d33 Measurement Methodology",
        text:
          "Extracted d33 coefficients of AlN and PZT thin films deposited on Si/Mo substrates using Laser Doppler Vibrometry. The experimental measurements were compared with finite-element models in COMSOL to validate the measurement approach.",
        image: "/images/project2-ldv.jpeg",
        imageAlt: "Laser Doppler Vibrometry setup for d33 measurement",
      },

      {
        title: "Substrate-Bending Artifact",
        text:
          "Investigated the influence of substrate bending on thin-film d33 measurements. Electrode geometry was systematically varied to identify a measurement window that reduces bending-induced contributions and better isolates the intrinsic thin-film response.",
        image: "/images/project2-bending.jpeg",
        imageAlt: "Substrate bending during thin-film piezoelectric measurement",
      },

      {
        title: "Experimental and FEM Validation",
        text:
          "The experimentally extracted d33 response of AlN was compared against a corresponding two-dimensional finite-element model. The experimental value was approximately 5–5.5 pm/V, while the FEM model predicted approximately 4.9 pm/V, showing close agreement between experiment and simulation.",
        image: "/images/project2-comsol.jpeg",
        imageAlt: "COMSOL finite-element model for piezoelectric thin-film characterization",
      },

      {
        title: "Ferroelectric Poling",
        text:
          "Compared AC and DC poling protocols for PZT thin films to investigate their influence on piezoelectric response. No significant enhancement in d33 was observed with AC poling, with the response suggesting limitations associated with defect-pinned ferroelectric domain walls.",
        image: "/images/project2-poling.jpeg",
        imageAlt: "AC and DC poling of PZT thin films",
      },
    ],

    results: [
      {
        value: "5–5.5 pm/V",
        label: "Measured AlN d33",
      },
      {
        value: "4.9 pm/V",
        label: "COMSOL-predicted AlN d33",
      },
      {
        value: "250–300 µm",
        label: "Optimized electrode diameter range",
      },
      {
        value: "PZT + AlN",
        label: "Thin films characterized",
      },
    ],

    methods:
      "Laser Doppler Vibrometry · COMSOL Multiphysics · PZT · AlN · Thin-film piezoelectric characterization · AC/DC poling · Electrode geometry optimization",
  },

  "03": {
    guides: [
    {
      name: "Prof. Abhilash Gunti",
      link: "https://cse.manit.ac.in/content/dr-abhilash-gunti",
    },
    {
      name: "Prof. Sanjay Srivastava",
      link: "https://www.manit.ac.in/content/dr-sanjay-srivastava",
    },
  ],

  institute: "MANIT Bhopal",
    caption: "X-ray diffraction analysis of PZT ceramics showing the evolution of the perovskite phase during mechanochemical synthesis.",
    objective:
      "To synthesize single-phase lead zirconate titanate (PZT) ceramics through mechanochemical processing and investigate their phase formation, microstructure, and electronic structure using experimental characterization and first-principles calculations.",

    sections: [
      {
        title: "Mechanochemical Synthesis",
        text:
          "Synthesized PZT ceramics using high-energy planetary ball milling of the constituent oxide powders. Milling duration and subsequent calcination conditions were investigated to develop a route toward phase-pure PZT.",
        image: "/images/project3-milling.jpeg",
        imageAlt: "Planetary ball milling used for PZT synthesis",
      },

      {
        title: "Phase Formation",
        text:
          "X-ray diffraction was used to monitor phase evolution during milling. The PZT perovskite phase was observed to form within approximately two hours of milling, demonstrating the effectiveness of the mechanochemical synthesis route.",
        image: "/images/XRD.jpeg",
        imageAlt: "XRD analysis showing PZT phase formation",
      },

      {
        title: "Microstructural Evolution",
        text:
          "Scanning electron microscopy was used to examine the microstructural evolution of the synthesized ceramics as a function of processing conditions. Changes in morphology, densification, and porosity were correlated with milling duration.",
        image: "/images/project3-sem.jpeg",
        imageAlt: "SEM microstructure of PZT ceramics",
      },

      {
        title: "First-Principles Analysis",
        text:
          "Density functional theory calculations were performed using DMol³ in Materials Studio to investigate the electronic structure of PZT. Band-structure and density-of-states calculations were used to analyze its electronic behavior.",
        image: "/images/project3-dft.jpeg",
        imageAlt: "DFT band structure and density of states of PZT",
      },
    ],

    results: [
      {
        value: "2 h",
        label: "Time for perovskite phase formation",
      },
      {
        value: "0–6 h",
        label: "Milling-duration range studied",
      },
      {
        value: "DFT",
        label: "Band structure and DOS analysis",
      },
    ],

    methods:
      "Planetary Ball Milling · XRD · SEM · Raman Spectroscopy · FTIR · Density Functional Theory · DMol³ · Materials Studio · Band Structure · Density of States",
  },

  "04": {
    guide: "Manish Kumar Sinha, Scientist-E",
    guideLink: "mailto:sinha.manish.sspl@gov.in",
    institute: "Solid State Physics Laboratory, DRDO Delhi",
    caption: "PMN-PT single-crystal characterization following different electrical poling conditions.",
    objective:
      "To investigate crystallographic orientation selection during CdZnTe single-crystal growth and evaluate the effects of DC and pulsed/AC poling on the piezoelectric response of PMN-PT single crystals.",

    sections: [
      {
        title: "CdZnTe Crystal Growth",
        text:
          "Investigated seed-orientation selection during CdZnTe single-crystal growth, with particular emphasis on twinning and single-crystal yield. The (111) orientation was identified as the preferred seed plane for reducing twinning and improving crystal yield.",
        image: "/images/project4-cdznte.jpeg",
        imageAlt: "CdZnTe single-crystal growth and orientation selection",
      },

      {
        title: "PMN-PT Poling",
        text:
          "Examined the effect of different electrical poling strategies on PMN-PT single crystals. DC and pulsed/AC poling approaches were compared to understand their influence on the resulting piezoelectric response.",
        image: "/images/project4-poling.jpeg",
        imageAlt: "Comparison of electrical poling strategies for PMN-PT",
      },

      {
        title: "Piezoelectric Response",
        text:
          "The piezoelectric response of PMN-PT single crystals was evaluated following different poling conditions. AC/pulsed poling produced a higher response than conventional DC poling, with an approximately 36% improvement reported in the project analysis.",
        image: "/images/project4-d33.jpeg",
        imageAlt: "PMN-PT piezoelectric response after different poling conditions",
      },

      {
        title: "Phase-Equilibria Analysis",
        text:
          "Binary and ternary phase diagrams were analyzed to understand phase relationships relevant to the materials investigated during the project. The phase-equilibria analysis was also presented as a technical seminar to the DRDO research group.",
        image: "/images/project4-phase-diagram.jpeg",
        imageAlt: "Phase diagram analysis performed during the project",
      },
    ],

    results: [
      {
        value: "(111)",
        label: "Preferred CdZnTe seed orientation",
      },
      {
        value: "36%",
        label: "Improvement with AC/pulsed poling",
      },
      {
        value: "PMN-PT",
        label: "Single-crystal piezoelectric material studied",
      },
    ],

    methods:
      "CdZnTe Crystal Growth · Crystallographic Orientation · PMN-PT · AC/DC Poling · Piezoelectric Characterization · Phase-Equilibria Analysis",
  },
};

const QUESTIONS = [
  "When does an interface stop being passive and start dictating device physics?",
  "How do we distinguish intrinsic material properties from measurement artifacts?",
  "How do materials and device architecture collectively govern MEMS performance?",
  "How much of device performance is determined before fabrication even begins?",
  "How do oxygen-vacancy migration and imprint fields evolve under cyclic electrical loading?",
];

const CV_DATA = {
  education: [
    {
      year: "2026–2028",
      degree: "Master of Technology",
      inst: "Indian Institute of Technology Kanpur",
      detail: "Materials Science and Engineering",
    },
    {
      year: "2022–2026",
      degree: "Bachelor of Technology",
      inst: "Maulana Azad National Institute of Technology Bhopal",
      detail: "Materials and Metallurgical Engineering",
      cgpa: "CGPA 8.19/10",
    },
  ],

  experience: [
    {
      year: "2026",
      title: "Undergraduate Thesis Researcher",
      inst: "Indian Institute of Science, Bangalore",
      desc: "Interface engineering and electromechanical characterization of PZT and AlN thin-film MEMS devices.",
    },
    {
      year: "2025",
      title: "Summer Intern",
      inst: "Indian Institute of Science, Bangalore",
      desc: "Quantitative electromechanical characterization of piezoelectric thin films using LDV and COMSOL.",
    },
    {
      year: "2024–25",
      title: "Winter Research Intern",
      inst: "Defence Research and Development Organisation (DRDO)",
      desc: "CdZnTe crystal growth, PMN–PT crystal poling, and Thermo-Calc phase equilibrium analysis.",
    },
  ],

  skills: [
    {
      cat: "Characterization",
      items:
        "DC Probe Station • Precision Multiferroic •  Laser Doppler Vibrometry • Lockin Amplifier • Optical Profilometer • Scanning Electron Microscopy",
    },
    {
      cat: "Computation & Simulation",
      items:
        "COMSOL Multiphysics • Materials Studio (DFT) • Thermo-Calc • VESTA",
    },
    {
      cat: "Programming & Data Analysis",
      items:
        "Python • MATLAB • Origin",
    },
  ],
};

// ─── Utility ────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );

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

function Nav({ page, setPage }) {
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
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 650, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase" }}>Krishnadev</span>
      </button>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => { setPage(l.toLowerCase()); window.scrollTo(0,0); }} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12, fontWeight: 550, letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: page === l.toLowerCase() ? "#00d4ff" : COLORS.nav,
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

function TagPill({ text, i }) {
  const colors = ["#00d4ff","#7c6fff","#00ff99","#ff6b35","#ff3e8a","#ffd700","#00d4ff","#7c6fff"];
  const c = colors[i % colors.length];
  return (
    <span style={{
      display: "inline-block",
      padding: "6px 16px",
      border: `1px solid ${c}66`,
      borderRadius: 2,
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 11,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: c,
      background: `${c}14`,
      animation: `tagFloat ${2 + i * 0.3}s ease-in-out infinite alternate`,
    }}>{text}</span>
  );
}

function Hero({ setPage }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "90px 2.5rem 80px",
    position: "relative",
  }}
>
      {/* Decorative vertical line */}
      <div style={{ position: "absolute", left: "2.5rem", top: 80, bottom: 80, width: 1, background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div style={{ maxWidth: 900, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)" }}>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          fontWeight: 300,
          lineHeight: 1.05,
          color: "#fff",
          margin: "0 0 1.5rem",
          letterSpacing: "-0.02em",
        }}>
          Materials &<br />
          <span style={{ color: "#00d4ff", fontStyle: "italic" }}>Device Engineering</span><br />
          for Microsystems &<br />
          Semiconductors
        </h1>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16, fontWeight: 500, lineHeight: 1.8,
          color: COLORS.body,
          maxWidth: 700, marginBottom: 48,
        }}>
          Master's student in Materials Science and Engineering at IIT Kanpur, bridging materials science and device engineering through experiments, characterization, and modeling.
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
    
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "2.5rem", display: "flex", alignItems: "center", gap: 12, opacity: mounted ? 0.4 : 0, transition: "opacity 2s 1s" }}>
        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.4)" }} />
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.nav }}>Scroll</span>
      </div>
    </section>
  );
}

function Affiliations() {
  return (
    <section
      style={{
        padding: "50px 2.5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.2)",
            }}
          />

          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: COLORS.nav,
            }}
          >
            Affiliations
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 5,
            textAlign: "center",
            alignItems: "start",
          }}
        >
          {AFFILIATIONS.map((a) => (
  <div
    key={a.name}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      style={{
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
      }}
    >
      <img
        src={a.logo}
        alt={a.name}
        style={{
          height:
            a.name === "IIT Kanpur"
              ? 100
              : a.name === "IISc Bangalore"
              ? 110
              : a.name === "MANIT Bhopal"
              ? 103
              : a.name === "DRDO"
              ? 100
              : 85,
          width: "auto",
          objectFit: "contain",
        }}
      />
    </div>
              <div
                style={{
                  color: COLORS.heading,
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginBottom: 12,
                }}
              >
                {a.name}
              </div>

              <div
              style={{
                color: COLORS.muted,
                fontSize: 13,
                lineHeight: 1.5,
                  letterSpacing: "0.03em",
                  }}
                    >
                  {a.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProjectBlock({ p, i, setPage }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
  ref={ref || undefined}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  onClick={() => {
    setPage(`project-${p.id}`);
    window.scrollTo(0, 0);
  }}
  style={{
      cursor: "pointer",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 2.5rem",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
      background: hovered ? `${p.accent}` : "transparent",
      transition: "background 0.6s ease, transform 0.3s ease",
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
        <img
  src={p.image}
  alt={p.imageAlt}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.4s ease",
    transform: hovered ? "scale(1.03)" : "scale(1)",
  }}
/>
      </div>

      {/* Right: text */}
      <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 24, height: 1, background: p.color }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: p.color }}>{p.lab}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 400, color: "#fff", margin: "0 0 1.2rem", lineHeight: 1.2, fontStyle: "italic" }}>{p.title}</h3>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, lineHeight: 1.8, color: COLORS.body, marginBottom: 24 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.body, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "4px 10px" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionsSection() {
  const [ref, visible] = useInView(0.1);
  return (
    <section ref={ref || undefined} style={{ padding: "50px 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 60 }}>
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.body }}>Current Questions</span>
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif",fontSize: 15,
    fontWeight: 450,
    color: COLORS.body,
    margin: 0,
    lineHeight: 1.8,
    fontStyle: "normal",
    letterSpacing: "0.01em",
  }}
>
  {q}
</p>
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
      <Affiliations />
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ padding: "80px 2.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.nav }}>Research Highlights</span>
          </div>
        </div>
        {PROJECTS.map((p, i) => (
  <ProjectBlock
    key={p.id}
    p={p}
    i={i}
    setPage={setPage}
  />
))}
      </section>
      <QuestionsSection />
    </>
  );
}

// ─── RESEARCH PAGE ───────────────────────────────────────────────────────────

function ResearchPage({ setPage }) {
  return (
    <div style={{ paddingTop: 100 }}>
      <div style={{ padding: "50px 2.5rem 20px" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            margin: "0 0 8px",
          }}
        >
          Projects
        </h2>

        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.82)",
            margin: 0,
          }}
        >
          A snapshot of laboratory work.
        </p>
      </div>

      {PROJECTS.map((p, i) => (
  <ProjectBlock
    key={p.id}
    p={p}
    i={i}
    setPage={setPage}
  />
))}

      <QuestionsSection />
    </div>
  );
}

// ─── Project Detail ───────────────────────────────────────────────────────────

function ProjectDetailPage({ project, setPage }) {
  if (!project) return null;

  const detail = PROJECT_DETAILS[project.id];

  if (!detail) return null;

  return (
    <div style={{ paddingTop: 110 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 2.5rem 120px",
        }}
      >

        {/* BACK */}
        <button
          onClick={() => {
            setPage("research");
            window.scrollTo(0, 0);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: project.color,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: 0,
            marginBottom: 50,
          }}
        >
          ← Back to Research
        </button>


        {/* HEADER */}
<section style={{ marginBottom: 50 }}>

  <h1
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(3rem, 6vw, 5.5rem)",
      fontWeight: 400,
      lineHeight: 1.05,
      color: "#fff",
      margin: "0 0 20px",
      fontStyle: "italic",
    }}
  >
    {project.title}
  </h1>

  <div
  style={{
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 16,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.8)",
  }}
>
  Guide:{" "}

  {detail.guides ? (
    detail.guides.map((guide, index) => (
      <span key={guide.name}>
        <a
          href={guide.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: project.color,
            textDecoration: "none",
          }}
        >
          {guide.name}
        </a>

        {index < detail.guides.length - 1 && " & "}
      </span>
    ))
  ) : (
    <a
      href={detail.guideLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: project.color,
        textDecoration: "none",
      }}
    >
      {detail.guide}
    </a>
  )}

  {" , "}

  <span>{detail.institute}</span>
</div>

</section>

        {/* HERO IMAGE */}
        <div style={{ marginBottom: 55 }}>
  <div
    style={{
      width: "100%",
      aspectRatio: "16/9",
      background: project.gradient,
      borderRadius: 4,
      border: `1px solid ${project.color}33`,
      overflow: "hidden",
    }}
  >
    <img
      src={project.image}
      alt={project.imageAlt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </div>

  {detail.caption && (
    <p
      style={{
        marginTop: 12,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.85)",
        fontStyle: "italic",
      }}
    >
      {detail.caption}
    </p>
  )}
</div>


        {/* OBJECTIVE */}
<section
  style={{
    maxWidth: 900,
    marginBottom: 80,
  }}
>
  <div
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: project.color,
      marginBottom: 18,
    }}
  >
    Objective
  </div>

  <p
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 18,
      lineHeight: 1.9,
      color: COLORS.body,
    }}
  >
    {detail.objective}
  </p>
</section>

        {/* PROJECT SECTIONS */}
        <section>

          {detail.sections.map((section, index) => {

            const imageLeft = index % 2 === 0;

            return (
              <div
                key={section.title}
                className="project-detail-section"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 60,
                  alignItems: "center",
                  marginBottom: 95,
                }}
              >

                {/* IMAGE */}
                <div
                  style={{
                    order: imageLeft ? 0 : 1,
                    background: project.gradient,
                    border: `1px solid ${project.color}22`,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    style={{
                      width: "100%",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </div>


                {/* TEXT */}
                <div
                  style={{
                    order: imageLeft ? 1 : 0,
                  }}
                >

                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: project.color,
                      marginBottom: 12,
                    }}
                  >
                    0{index + 1}
                  </div>


                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 3vw, 3rem)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      lineHeight: 1.15,
                      color: "#fff",
                      marginBottom: 18,
                    }}
                  >
                    {section.title}
                  </h2>


                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 15,
                      lineHeight: 1.9,
                      color: COLORS.body,
                    }}
                  >
                    {section.text}
                  </p>

                </div>

              </div>
            );
          })}

        </section>


        {/* KEY RESULTS */}
        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 45,
            marginBottom: 70,
          }}
        >

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: project.color,
              marginBottom: 28,
            }}
          >
            Key Results
          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
          >

            {detail.results.map((result, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "25px 22px",
                }}
              >

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 32,
                    color: project.color,
                    marginBottom: 8,
                  }}
                >
                  {result.value}
                </div>

                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {result.label}
                </div>

              </div>
            ))}

          </div>

        </section>


        {/* METHODS */}
        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 45,
            maxWidth: 900,
            marginBottom: 80,
          }}
        >

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: project.color,
              marginBottom: 18,
            }}
          >
            Methods & Tools
          </div>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15,
              lineHeight: 1.9,
              color: COLORS.body,
            }}
          >
            {detail.methods}
          </p>

        </section>


        {/* BACK */}
        <button
          onClick={() => {
            setPage("research");
            window.scrollTo(0, 0);
          }}
          style={{
            background: "none",
            border: `1px solid ${project.color}55`,
            color: project.color,
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "12px 20px",
            borderRadius: 2,
          }}
        >
          ← Back to Research
        </button>

      </div>
    </div>
  );
}
// ─── NOTES PAGE ──────────────────────────────────────────────────────────────

function NotesPage() {
  const courseGroups = [
  {
    title: "Graduate Coursework*",
    courses: [
      "Structure and Characterization of Materials",
      "Microscopy and Microanalysis of Materials",
      "Transport Phenomena",
      "Nanostructures and Nanomaterials",
    ],
  },
  {
    title: "Characterization & Microscopy",
    courses: [
      "Materials Characterization",
      "Optical, Electronics and Magnetic Materials",
    ],
  },
  {
    title: "Functional Materials",
    courses: [
      "Ceramic Science and Technology",
      "Fundamentals of Nanotechnology and Nanoscience",
    ],
  },
  {
    title: "Materials Mechanics & Processing",
    courses: [
      "Mechanical Behavior of Materials",
      "Phase Transformation and Heat Treatment",
    ],
  },
];

  return (
    <div style={{ paddingTop: 110, minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "40px 2.5rem 80px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            marginBottom: 45,
          }}
        >
          Courses
        </h1>

        {courseGroups.map((group) => (
          <CourseRow
            key={group.title}
            title={group.title}
            courses={group.courses}
          />
        ))}

        <p
          style={{
            marginTop: 35,
            color: COLORS.body,
            fontSize: 14,
            fontStyle: "italic",
          }}
        >
          * Ongoing at IIT Kanpur.
        </p>
      </div>
    </div>
  );
}
function CourseRow({ title, courses }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: "36px",
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          fontWeight: 500,
          color: "#fff",
          lineHeight: 1.5,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 15,
          color: COLORS.body,
          lineHeight: 2,
        }}
      >
        {courses.map((course, index) => (
          <span key={course}>
            {course}
            {index !== courses.length - 1 && (
              <span
  style={{
    color: "rgba(255,255,255,0.45)",
    padding: "0 14px",
    fontWeight: 500,
  }}
>
  |
</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CV PAGE ─────────────────────────────────────────────────────────────────

function CVCard({ title, children }) {
  return (
    <div
      style={{
        background: "#0d0f14",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "36px",
        marginBottom: 32,
      }}
    >
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 32,
          fontWeight: 500,
          color: "#fff",
          marginBottom: 28,
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

function CVPage() {
  return (
    <div style={{ paddingTop: 110 }}>
      <div
        style={{
          maxWidth: 950,
          margin: "0 auto",
          padding: "40px 2.5rem 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 45,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#fff",
                marginBottom: 10,
              }}
            >
              CV
            </h1>

            <p
              style={{
                color: COLORS.body,
                fontSize: 15,
              }}
            >
              Education, research experience and technical skills.
            </p>
          </div>
        </div>

        {/* Education */}

        <CVCard title="Education">

          {CV_DATA.education.map((e) => (

            <div
              key={e.degree}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: 28,
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  color: "#00d4ff",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {e.year}
              </div>

              <div>

                <div
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  {e.degree}
                </div>

                <div
style={{
color: COLORS.body,
marginTop: 6,
fontSize: 16,
}}
>
{e.inst}
</div>

<div
style={{
color: "rgba(255,255,255,0.75)",
marginTop: 4,
fontSize: 15,
}}
>
{e.detail}
</div>

<div
style={{
color: "rgba(255,255,255,0.7)",
marginTop: 4,
fontSize: 14,
}}
>
{e.cgpa}
</div>

              </div>

            </div>

          ))}

        </CVCard>

        {/* Experience */}

        <CVCard title="Research Experience">

          {CV_DATA.experience.map((e) => (

            <div
              key={e.title}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: 28,
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  color: "#00d4ff",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {e.year}
              </div>

              <div>

                <div
                  style={{
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: 500,
                  }}
                >
                  {e.title}
                </div>

                <div
                  style={{
                    color: COLORS.body,
                    marginTop: 6,
                  }}
                >
                  {e.inst}
                </div>

                <div
                  style={{
                    color: "rgba(255,255,255,.72)",
                    marginTop: 10,
                    lineHeight: 1.8,
                  }}
                >
                  {e.desc}
                </div>

              </div>

            </div>

          ))}

        </CVCard>

        {/* Skills */}

        <CVCard title="Technical Skills">

          {CV_DATA.skills.map((s) => (

            <div
              key={s.cat}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: 24,
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                {s.cat}
              </div>

              <div
                style={{
                  color: COLORS.body,
                  lineHeight: 1.8,
                }}
              >
                {s.items}
              </div>

            </div>

          ))}

        </CVCard>

      </div>
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div style={{ paddingTop: 110 }}>
      <div
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          padding: "40px 2.5rem 100px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            marginBottom: 40,
          }}
        >
          About
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 0.9fr",
            gap: 70,
            alignItems: "start",
          }}
        >
          {/* LEFT */}

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              lineHeight: 1.8,
              color: COLORS.body,
            }}
          >
            <p style={{ marginBottom: 24 }}>
Hello! I am a first-year Master's (M.Tech) student in{" "}
<a
  href="https://www.iitk.ac.in/mse/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ color: "#00d4ff", textDecoration: "none" }}
>
  Materials Science and Engineering
</a>{" "}
at{" "}
<a
  href="https://www.iitk.ac.in/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ color: "#ff6bd6", textDecoration: "none" }}
>
  Indian Institute of Technology Kanpur
</a>.

Previously, I completed my Bachelor's (B.Tech) in Materials and Metallurgical
Engineering from{" "}
<a
  href="https://www.manit.ac.in/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ color: "#ff6bd6", textDecoration: "none" }}
>
  Maulana Azad National Institute of Technology Bhopal
</a>.
</p>

           <p style={{ marginBottom: 24 }}>
My research lies at the intersection of pizoelectric and ferroelectric thin films, Micro-Electro-Mechanical Systems (MEMS), and semiconductor devices. I am particularly
interested in understanding how material processing, microstructure, and
interfaces influence the electrical and electromechanical performance of
thin-film devices.
</p>

            <p style={{ marginBottom: 24 }}>
  I conducted the majority of my bachelor's research at{" "}
  <a
    href="https://cense.iisc.ac.in/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#ff6bd6", textDecoration: "none" }}
  >
    Centre for Nano Science and Engineering (CeNSE)
  </a>
  ,{" "}
  <a
    href="https://iisc.ac.in/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#ff6bd6", textDecoration: "none" }}
  >
    Indian Institute of Science, Bangalore
  </a>
  , including my bachelor's thesis. There, I worked on wafer-scale electrical
  characterization of PZT devices to evaluate yield and defect distribution,
  investigated interface engineering in Piezoelectric Micromachined Ultrasonic
  Transducers (PMUTs) through different bottom-electrode architectures, and
  extracted the in-plane piezoelectric coefficients of PZT and AlN
  microcantilevers using Laser Doppler Vibrometry and MATLAB-based modeling.
  Earlier, at{" "}
  <a
    href="https://drdo.gov.in/drdo/en"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#ff6bd6", textDecoration: "none" }}
  >
    Solid State Physics Laboratory, DRDO
  </a>
  , I worked on CdZnTe single-crystal growth, poling of PMN-PT
  single crystals, and binary and ternary phase-equilibria analysis.
</p>

            <p style={{ marginBottom: 24 }}>
I enjoy combining experiments with computational tools to understand the
structure-property relationships that govern material behavior. My work
often involves thin-film characterization, microscopy, electrical
measurements and finite-element modeling to
bridge materials science with device engineering.
</p>

           <p style={{ marginBottom: 24 }}>
Outside materials, you can find me playing chess and
cricket, with a keen personal interest in
international diplomacy.
</p>

<p style={{ marginBottom: 24 }}>
I am always happy to connect with researchers, industry
professionals and students interested in materials science, semiconductor devices,
functional thin films, and MEMS technologies.
</p>
          </div>

          {/* RIGHT */}

          <div>
            <img
              src="/images/profile.jpg"
              alt="Krishnadev Pandey"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.08)",
                marginBottom: 18,
              }}
            />

            <div
              style={{
                color: COLORS.body,
                marginBottom: 30,
              }}
            >
              Bangalore, India
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                fontSize: 18,
              }}
            >
              <a
                href="mailto:krishnadevpandey417@gmail.com"
                style={{ color: "#00d4ff", textDecoration: "none" }}
              >
                Email
              </a>

              <a
                href="https://www.linkedin.com/in/krishnadev-pandey"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#7c6fff", textDecoration: "none" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 2.5rem",
        marginTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        {/* LEFT */}

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }}
>
  <a
    href="https://info.flagcounter.com/KkmZ"
    target="_blank"
    rel="noopener noreferrer"
    style={{ marginBottom: 14 }}
  >
    <img
      src="https://s01.flagcounter.com/count2/KkmZ/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
      alt="Visitor Counter"
      style={{ borderRadius: 4 }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </a>

  <div
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#fff",
    }}
  >
    Krishnadev Pandey
  </div>
</div>

        {/* RIGHT */}

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 20,
              marginBottom: 16,
            }}
          >
            <a
              href="mailto:krishnadevpandey417@gmail.com"
              title="Email"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: 34,
              }}
            >
              ✉️
            </a>

            <a
              href="https://www.linkedin.com/in/krishnadev-pandey"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{
                color: "#0A66C2",
                textDecoration: "none",
                fontSize: 34,
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              in
            </a>
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              color: COLORS.body,
              lineHeight: 1.7,
            }}
          >
            Feel free to contact me via email or LinkedIn.
          </div>
        </div>
      </div>
    </footer>
  );
}
// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
  home: <HomePage setPage={setPage} />,
  research: <ResearchPage setPage={setPage} />,
  courses: <NotesPage />,
  cv: <CVPage />,
  about: <ContactPage />,

  "project-01": (
    <ProjectDetailPage
      project={PROJECTS.find((p) => p.id === "01")}
      setPage={setPage}
    />
  ),

  "project-02": (
    <ProjectDetailPage
      project={PROJECTS.find((p) => p.id === "02")}
      setPage={setPage}
    />
  ),

  "project-03": (
    <ProjectDetailPage
      project={PROJECTS.find((p) => p.id === "03")}
      setPage={setPage}
    />
  ),

  "project-04": (
    <ProjectDetailPage
      project={PROJECTS.find((p) => p.id === "04")}
      setPage={setPage}
    />
  ),
};

  return (
    <div style={{ background: "#060608", minHeight: "100vh", color: "#fff", position: "relative" }}>
      <style>{`
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
        @media (max-width: 750px) {
  .project-detail-section {
    grid-template-columns: 1fr !important;
    gap: 30px !important;
  }
}
      `}</style>

      <GridBg />
      <Nav page={page} setPage={setPage} />

      <main style={{ position: "relative", zIndex: 1 }}>
        {pages[page] || pages.home}
      </main>

      {page === "home" && <Footer />}
    </div>
  );
}