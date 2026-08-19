import React, { useState } from "react";
import {
  Search,
  UserCircle2,
  FileText,
  Send,
  CalendarClock,
  MessageCircle,
  ShieldCheck,
  ClipboardList,
  Building2,
  Users2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

/**
 * HireNest — Public Landing Page
 * Brand tokens:
 *  Ink     #12302B  deep teal-ink (primary dark)
 *  Paper   #F7F4EC  warm parchment (primary light bg)
 *  Gold    #D2992B  amber accent — "opportunity"
 *  Teal    #2F6F63  brand teal — "growth / candidate track"
 *  Line    #E3DDCE  hairline border on paper
 *  Ink/70  rgba(18,48,43,0.7) muted body text on paper
 */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap');
`;

const display = { fontFamily: "'Fraunces', serif" };
const body = { fontFamily: "'Inter', sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

function Eyebrow({ children, tone = "ink" }) {
  const color = tone === "gold" ? "#D2992B" : tone === "paper" ? "#EDE7D6" : "#2F6F63";
  return (
    <div
      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-4"
      style={{ ...mono, color, letterSpacing: "0.14em" }}
    >
      <span className="w-6 h-px" style={{ backgroundColor: color }} />
      {children}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="p-6 rounded-sm border cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderColor: hover ? "#2F6F63" : "#E3DDCE",
        backgroundColor: "#FFFFFF",
        transform: hover ? "translateY(-6px)" : "translateY(0px)",
        boxShadow: hover ? "0 16px 32px -16px rgba(18,48,43,0.28)" : "0 0px 0px rgba(0,0,0,0)",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
        style={{
          backgroundColor: hover ? "#2F6F63" : "#F0EDE0",
          transition: "background-color 300ms ease",
        }}
      >
        <Icon size={18} strokeWidth={1.75} color={hover ? "#F7F4EC" : "#12302B"} style={{ transition: "color 300ms ease" }} />
      </div>
      <h3 className="text-lg mb-2" style={{ ...display, color: "#12302B", fontWeight: 600 }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ ...body, color: "rgba(18,48,43,0.68)" }}>
        {desc}
      </p>
    </div>
  );
}

function Button({ children, variant = "solid", bg, color, borderColor, className = "", style = {} }) {
  const [hover, setHover] = useState(false);
  const base = {
    backgroundColor: variant === "outline" ? (hover ? borderColor : "transparent") : bg,
    color: variant === "outline" ? (hover ? "#F7F4EC" : color) : color,
    borderColor: borderColor || "transparent",
    transform: hover ? "translateY(-2px)" : "translateY(0px)",
    boxShadow: hover ? "0 10px 20px -10px rgba(18,48,43,0.35)" : "0 0px 0px rgba(0,0,0,0)",
    filter: hover && variant === "solid" ? "brightness(1.08)" : "brightness(1)",
    transition: "transform 220ms ease, box-shadow 220ms ease, filter 220ms ease, background-color 220ms ease, color 220ms ease",
  };
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{ ...base, ...style }}
    >
      {children}
    </button>
  );
}

function HoverBox({ children, className = "", dark = false }) {
  const [hover, setHover] = useState(false);
  const border = dark ? "rgba(247,244,236,0.15)" : "#E3DDCE";
  const borderHover = dark ? "#D2992B" : "#2F6F63";
  const bgColor = dark ? "rgba(247,244,236,0.04)" : "#FFFFFF";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`rounded-sm border flex items-center justify-center cursor-default ${className}`}
      style={{
        borderColor: hover ? borderHover : border,
        backgroundColor: bgColor,
        transform: hover ? "scale(1.015)" : "scale(1)",
        boxShadow: hover
          ? dark
            ? "0 20px 40px -20px rgba(0,0,0,0.5)"
            : "0 20px 40px -20px rgba(18,48,43,0.25)"
          : "0 0px 0px rgba(0,0,0,0)",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      {children}
    </div>
  );
}

function NavLink({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "#12302B" : "rgba(18,48,43,0.75)",
        borderBottom: hover ? "1px solid #D2992B" : "1px solid transparent",
        paddingBottom: 2,
        transition: "color 200ms ease, border-color 200ms ease",
      }}
    >
      {children}
    </a>
  );
}

function TrackStep({ index, label, sub, tone }) {
  const dot = tone === "gold" ? "#D2992B" : "#2F6F63";
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex flex-col items-start min-w-[140px] cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transform: hover ? "translateY(-3px)" : "translateY(0px)", transition: "transform 220ms ease" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="rounded-full"
          style={{
            backgroundColor: dot,
            width: hover ? 10 : 10,
            height: hover ? 10 : 10,
            boxShadow: hover ? `0 0 0 4px ${dot}33` : "0 0 0 0px transparent",
            transition: "box-shadow 220ms ease",
          }}
        />
        <span style={{ ...mono, fontSize: 11, color: hover ? "#12302B" : "rgba(18,48,43,0.5)", transition: "color 220ms ease" }}>
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <p style={{ ...body, fontWeight: 600, color: "#12302B", fontSize: 14.5 }}>{label}</p>
      {sub && (
        <p style={{ ...body, fontSize: 12.5, color: "rgba(18,48,43,0.55)" }} className="mt-0.5">
          {sub}
        </p>
      )}
    </div>
  );
}

function WhyCard({ index, title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transform: hover ? "translateY(-4px)" : "translateY(0px)", transition: "transform 250ms ease" }}
    >
      <span style={{ ...mono, fontSize: 11, color: "#D2992B" }}>
        {String(index).padStart(2, "0")}
      </span>
      <h3
        className="mt-2 mb-2 text-lg"
        style={{ ...display, fontWeight: 600, color: hover ? "#2F6F63" : "#12302B", transition: "color 250ms ease" }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: "rgba(18,48,43,0.65)" }}>
        {desc}
      </p>
    </div>
  );
}

function TrustBadge({ icon: Icon, label }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm cursor-default"
      style={{
        borderColor: hover ? "#2F6F63" : "#E3DDCE",
        color: "#12302B",
        backgroundColor: hover ? "#F0EDE0" : "#FFFFFF",
        transform: hover ? "translateY(-2px)" : "translateY(0px)",
        transition: "all 220ms ease",
      }}
    >
      <Icon size={15} color="#2F6F63" />
      {label}
    </div>
  );
}

function FooterLink({ children }) {
  const [hover, setHover] = useState(false);
  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer"
      style={{
        color: hover ? "#D2992B" : "rgba(247,244,236,0.7)",
        transform: hover ? "translateX(3px)" : "translateX(0px)",
        transition: "all 200ms ease",
      }}
    >
      {children}
    </li>
  );
}

function CtaPanel({ prompt, children }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-8 rounded-sm border cursor-default"
      style={{
        borderColor: hover ? "rgba(247,244,236,0.4)" : "rgba(247,244,236,0.15)",
        backgroundColor: hover ? "rgba(247,244,236,0.05)" : "transparent",
        transform: hover ? "translateY(-3px)" : "translateY(0px)",
        transition: "all 250ms ease",
      }}
    >
      <p className="mb-5 text-sm" style={{ color: "rgba(247,244,236,0.75)" }}>
        {prompt}
      </p>
      {children}
    </div>
  );
}

export default function HireNestLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const candidateSteps = ["Register", "Build Profile", "Discover Jobs", "Apply", "Interview"];
  const employerSteps = ["Register", "Company Profile", "Post Job", "Review Applications", "Interview"];

  const features = [
    { icon: Search, title: "Smart Job Discovery", desc: "Browse and filter opportunities tailored to your skills, location, and preferences." },
    { icon: UserCircle2, title: "Candidate Profiles", desc: "Build a profile that highlights your experience, skills, and career goals." },
    { icon: Building2, title: "Employer Job Posting", desc: "Create and manage listings with full control over requirements and visibility." },
    { icon: ClipboardList, title: "Application Tracking", desc: "Candidates and employers track every application's status in real time." },
    { icon: CalendarClock, title: "Interview Scheduling", desc: "Coordinate interviews directly on the platform — no email back-and-forth." },
    { icon: ShieldCheck, title: "Secure Authentication", desc: "Role-based access with secure login for candidates, employers, and admins." },
  ];

  const candidatePoints = [
    "Create a profile that showcases your skills and experience",
    "Upload and manage your resume",
    "Discover jobs that match your goals",
    "Apply in a few clicks",
    "Track every application's status",
    "Get scheduled for interviews directly on the platform",
  ];

  const employerPoints = [
    "Create a company profile",
    "Post job openings in minutes",
    "Review and filter candidate applications",
    "Shortlist and schedule interviews",
    "Manage your entire hiring pipeline in one dashboard",
  ];

  const whyChoose = [
    { title: "Role-Based Experience", desc: "Tailored dashboards for candidates, employers, and admins." },
    { title: "Centralized Hiring Process", desc: "From application to interview, everything happens in one place." },
    { title: "Real-Time Application Tracking", desc: "No more wondering where you stand." },
    { title: "Secure & Reliable", desc: "Built with modern authentication and data-protection practices." },
    { title: "Simple, Focused Design", desc: "No clutter — just the tools you need to hire or get hired." },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "Secure Authentication" },
    { icon: UserCircle2, label: "Candidate-Focused Design" },
    { icon: Building2, label: "Employer-Friendly Tools" },
    { icon: ClipboardList, label: "Streamlined Hiring" },
    { icon: CheckCircle2, label: "Easy Application Management" },
  ];

  return (
    <div style={{ ...body, backgroundColor: "#F7F4EC" }} className="min-h-screen w-full">
      <style>{FONTS}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: "#F7F4ECEE", borderColor: "#E3DDCE", backdropFilter: "blur(6px)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#12302B" }}>
              <span style={{ ...display, color: "#D2992B", fontSize: 13, fontWeight: 700 }}>H</span>
            </div>
            <span style={{ ...display, fontWeight: 600, fontSize: 19, color: "#12302B" }}>HireNest</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <NavLink href="#what">What is HireNest</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#candidates">For Candidates</NavLink>
            <NavLink href="#employers">For Employers</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              borderColor="#12302B"
              color="#12302B"
              className="text-sm px-4 py-2 rounded-sm border"
            >
              Log In
            </Button>
            <Button bg="#12302B" color="#F7F4EC" className="text-sm px-4 py-2 rounded-sm">
              Get Started
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} color="#12302B" /> : <Menu size={22} color="#12302B" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4 text-sm" style={{ color: "#12302B" }}>
            <a href="#what">What is HireNest</a>
            <a href="#features">Features</a>
            <a href="#candidates">For Candidates</a>
            <a href="#employers">For Employers</a>
            <Button variant="outline" borderColor="#12302B" color="#12302B" className="text-left px-4 py-2 rounded-sm border">
              Log In
            </Button>
            <Button bg="#12302B" color="#F7F4EC" className="text-left px-4 py-2 rounded-sm">
              Get Started
            </Button>
          </div>
        )}
      </header>

      {/* 1. HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>Job Discovery &amp; Recruitment, Reimagined</Eyebrow>
          <h1
            className="text-4xl md:text-5xl leading-[1.1] mb-6"
            style={{ ...display, fontWeight: 600, color: "#12302B" }}
          >
            Where Talent Meets Opportunity — Smarter, Faster Hiring
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-md" style={{ color: "rgba(18,48,43,0.7)" }}>
            HireNest connects candidates with the right opportunities and helps employers find
            the right talent — all in one streamlined platform.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              bg="#12302B"
              color="#F7F4EC"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-medium"
            >
              Find Opportunities <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              borderColor="#12302B"
              color="#12302B"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-medium border"
            >
              Hire Talent <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        {/* Placeholder for the user's own hero illustration */}
        <HoverBox className="h-72 md:h-96">
          <p style={{ ...mono, fontSize: 12, color: "rgba(18,48,43,0.4)" }}>
            [ Your hero illustration goes here ]
          </p>
        </HoverBox>
      </section>

      {/* 2. WHAT IS HIRENEST */}
      <section id="what" className="border-y" style={{ borderColor: "#E3DDCE", backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <HoverBox className="h-64 order-2 md:order-1">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <UserCircle2 size={30} color="#2F6F63" strokeWidth={1.5} />
                <span style={{ ...mono, fontSize: 10, color: "rgba(18,48,43,0.5)" }}>CANDIDATE</span>
              </div>
              <div className="w-10 h-px" style={{ backgroundColor: "#D2992B" }} />
              <div className="flex flex-col items-center gap-2">
                <Building2 size={30} color="#D2992B" strokeWidth={1.5} />
                <span style={{ ...mono, fontSize: 10, color: "rgba(18,48,43,0.5)" }}>EMPLOYER</span>
              </div>
            </div>
          </HoverBox>
          <div className="order-1 md:order-2">
            <Eyebrow>What Is HireNest?</Eyebrow>
            <h2 className="text-3xl mb-4" style={{ ...display, fontWeight: 600, color: "#12302B" }}>
              One Platform. Two Journeys.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(18,48,43,0.7)" }}>
              HireNest is a modern hiring platform built to simplify the job search and
              recruitment process. Candidates can build a profile, discover relevant
              opportunities, and manage applications — while employers can post jobs, evaluate
              candidates, and manage hiring, all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-xl mb-12">
          <Eyebrow>Services</Eyebrow>
          <h2 className="text-3xl mb-3" style={{ ...display, fontWeight: 600, color: "#12302B" }}>
            Everything You Need to Hire or Get Hired
          </h2>
          <p style={{ color: "rgba(18,48,43,0.65)" }}>
            A complete toolkit for both sides of the hiring process.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* 4. FOR CANDIDATES */}
      <section id="candidates" className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>For Candidates</Eyebrow>
          <h2 className="text-3xl mb-3" style={{ ...display, fontWeight: 600, color: "#12302B" }}>
            Built for Job Seekers
          </h2>
          <p className="mb-6" style={{ color: "rgba(18,48,43,0.65)" }}>
            HireNest makes it easy to go from searching to hired.
          </p>
          <ul className="space-y-3">
            {candidatePoints.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm" style={{ color: "#12302B" }}>
                <CheckCircle2 size={17} color="#2F6F63" className="mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <Button
            bg="#2F6F63"
            color="#F7F4EC"
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-medium"
          >
            Create Your Candidate Profile <ArrowRight size={16} />
          </Button>
        </div>
        <HoverBox className="h-72">
          <div className="flex flex-col items-center gap-3">
            <FileText size={34} color="#2F6F63" strokeWidth={1.4} />
            <span style={{ ...mono, fontSize: 11, color: "rgba(18,48,43,0.45)" }}>
              profile → resume → applications
            </span>
          </div>
        </HoverBox>
      </section>

      {/* 5. FOR EMPLOYERS */}
      <section id="employers" style={{ backgroundColor: "#12302B" }}>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <HoverBox dark className="h-72 order-2 md:order-1">
            <div className="flex flex-col items-center gap-3">
              <Users2 size={34} color="#D2992B" strokeWidth={1.4} />
              <span style={{ ...mono, fontSize: 11, color: "rgba(247,244,236,0.5)" }}>
                post → review → shortlist → hire
              </span>
            </div>
          </HoverBox>
          <div className="order-1 md:order-2">
            <Eyebrow tone="gold">For Employers</Eyebrow>
            <h2 className="text-3xl mb-3" style={{ ...display, fontWeight: 600, color: "#F7F4EC" }}>
              Built for Employers &amp; Companies
            </h2>
            <p className="mb-6" style={{ color: "rgba(247,244,236,0.7)" }}>
              Post, review, and hire — without the hiring chaos.
            </p>
            <ul className="space-y-3">
              {employerPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm" style={{ color: "#F7F4EC" }}>
                  <CheckCircle2 size={17} color="#D2992B" className="mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Button
              bg="#D2992B"
              color="#12302B"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-medium"
            >
              Post a Job as an Employer <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS — signature dual-track element */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-xl mb-14">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-3xl mb-3" style={{ ...display, fontWeight: 600, color: "#12302B" }}>
            How HireNest Works
          </h2>
          <p style={{ color: "rgba(18,48,43,0.65)" }}>
            Two journeys, one destination — a great hire.
          </p>
        </div>

        <div className="space-y-10">
          {/* Candidate track */}
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              {candidateSteps.map((s, i) => (
                <TrackStep key={s} index={i + 1} label={s} tone="teal" />
              ))}
            </div>
            <div className="h-px w-full" style={{ backgroundColor: "#2F6F63", opacity: 0.35 }} />
          </div>

          {/* Employer track */}
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              {employerSteps.map((s, i) => (
                <TrackStep key={s} index={i + 1} label={s} tone="gold" />
              ))}
            </div>
            <div className="h-px w-full" style={{ backgroundColor: "#D2992B", opacity: 0.35 }} />
          </div>
        </div>

        <p className="mt-8 text-sm" style={{ ...mono, color: "rgba(18,48,43,0.45)" }}>
          Both tracks converge at Interview — where hiring actually happens.
        </p>
      </section>

      {/* 7. WHY CHOOSE HIRENEST */}
      <section className="border-y" style={{ borderColor: "#E3DDCE", backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl mb-12">
            <Eyebrow>Why HireNest</Eyebrow>
            <h2 className="text-3xl" style={{ ...display, fontWeight: 600, color: "#12302B" }}>
              Why Choose HireNest?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {whyChoose.map((w, i) => (
              <WhyCard key={w.title} index={i + 1} title={w.title} desc={w.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRUST / PLATFORM HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Eyebrow>
            <span className="mx-auto">Designed With Purpose</span>
          </Eyebrow>
          <h2 className="text-2xl" style={{ ...display, fontWeight: 600, color: "#12302B" }}>
            Built the Right Way, Not Just Fast
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {trustBadges.map((b) => (
            <TrustBadge key={b.label} icon={b.icon} label={b.label} />
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section style={{ backgroundColor: "#12302B" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl mb-10" style={{ ...display, fontWeight: 600, color: "#F7F4EC" }}>
            Ready to Get Started?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <CtaPanel prompt="Looking for your next opportunity?">
              <Button bg="#F7F4EC" color="#12302B" className="w-full px-5 py-3 rounded-sm text-sm font-medium">
                Join as a Candidate
              </Button>
            </CtaPanel>
            <CtaPanel prompt="Looking for the right talent?">
              <Button bg="#D2992B" color="#12302B" className="w-full px-5 py-3 rounded-sm text-sm font-medium">
                Join as an Employer
              </Button>
            </CtaPanel>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer style={{ backgroundColor: "#0E2622" }}>
        <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D2992B" }}>
                <span style={{ ...display, color: "#12302B", fontSize: 11, fontWeight: 700 }}>H</span>
              </div>
              <span style={{ ...display, fontWeight: 600, color: "#F7F4EC" }}>HireNest</span>
            </div>
            <p className="text-sm" style={{ color: "rgba(247,244,236,0.55)" }}>
              Connecting Talent with Opportunity
            </p>
          </div>

          <div>
            <p style={{ ...mono, fontSize: 11, color: "rgba(247,244,236,0.4)" }} className="mb-3 uppercase tracking-widest">
              Platform
            </p>
            <ul className="space-y-2 text-sm">
              <FooterLink>About</FooterLink>
              <FooterLink>Features</FooterLink>
              <FooterLink>For Candidates</FooterLink>
              <FooterLink>For Employers</FooterLink>
            </ul>
          </div>

          <div>
            <p style={{ ...mono, fontSize: 11, color: "rgba(247,244,236,0.4)" }} className="mb-3 uppercase tracking-widest">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
            </ul>
          </div>

          <div>
            <p style={{ ...mono, fontSize: 11, color: "rgba(247,244,236,0.4)" }} className="mb-3 uppercase tracking-widest">
              Contact
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(247,244,236,0.7)" }}>
              <li>hello@hirenest.app</li>
            </ul>
          </div>
        </div>
        <div
          className="max-w-6xl mx-auto px-6 py-5 border-t flex flex-col sm:flex-row justify-between gap-2 text-xs"
          style={{ borderColor: "rgba(247,244,236,0.1)", color: "rgba(247,244,236,0.45)" }}
        >
          <span>© 2026 HireNest. All rights reserved.</span>
          <span style={mono}>Built with the MERN stack</span>
        </div>
      </footer>
    </div>
  );
}