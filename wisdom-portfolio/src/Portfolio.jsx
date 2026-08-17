import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Sun, Moon, Github, Linkedin, Mail, ExternalLink,
  Server, Code2, Smartphone, Settings, ArrowRight, ArrowUpRight,
  Download, Layers, MapPin, MessageCircle
} from "lucide-react";

// Lucide's "X" export is used as the nav close icon, so the X/Twitter
// logo is drawn here as a tiny inline SVG instead of a second import.
function XLogo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-6.9L4.7 22H1.5l8-9.2L0.9 2h7.1l4.9 6.3L18.9 2zm-1.2 18h1.9L6.4 4H4.3l13.4 16z" />
    </svg>
  );
}

/* ============================================================
   EDIT ME — your content lives in these three blocks.
   Everything below them is layout/behavior; you shouldn't need
   to touch it just to update your info.
   ============================================================ */

const PROFILE = {
  firstName: "Wisdom",
  lastName: "Imah",
  role: "Fullstack & Mobile Software Engineer",
  pitch:
    "I design and ship products end to end — database, API, interface, and the app in your pocket — for teams who'd rather hand off a problem than manage one.",
  location: "Lagos, Nigeria",
  email: "imahwisdom074@gmail.com",
  github: "https://github.com/ImahWisdom/imahWisdom",
  linkedin: "https://linkedin.com/in/imahwisdom",
  x: "https://x.com/Wizzy0115",
  whatsapp: "2348183547260", // used as wa.me/2348183547260
  resumeUrl: "/resume.pdf", // replace with a real hosted link to your resume
  photoUrl: "/profile.jpg", // put your photo at public/profile.jpg
};

// Category values must be one of: "fullstack", "mobile", "frontend"
const PROJECTS = [
  {
    id: "p1",
    title: "Lekki Tides — Hospitality Booking Platform",
    category: ["fullstack"],
    impact: "Shortlet villa and boat cruise bookings for Lekki, Lagos — payments, owner dashboard, live availability.",
    tech: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "Paystack", "Cloudinary"],
    liveUrl: "https://lekkitides-1.onrender.com",
    githubUrl: "https://github.com/ImahWisdom/lekkiTides",
    status: null,
    screenshot: "/lekki-dashboard.png", // put your Lekki Tides dashboard screenshot at public/lekki-dashboard.jpg
    dashboardNote: "Owner dashboard demo available on request — bookings, revenue, and listings management.",
  },
  {
    id: "p2",
    title: "NaijaStyle Atelier — Fashion Commerce & Admin Suite",
    category: ["fullstack"],
    impact: "Luxury fashion storefront with NGN payments plus a full admin CMS for products, orders, and revenue.",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Paystack", "Cloudinary", "Resend"],
    liveUrl: "https://naijastyle-atelier-frontend.onrender.com",
    githubUrl: "https://github.com/ImahWisdom/NaijaStyle-Atelier-Frontend",
    status: null,
    screenshot: "/naijastyle-dashboard.png", // put your NaijaStyle admin screenshot at public/naijastyle-dashboard.jpg
    dashboardNote: "Admin panel demo available on request — orders, revenue chart, and product management.",
  },
  {
    id: "p3",
    title: "Sealine — Travel Agency Website",
    category: ["frontend"],
    impact: "Marketing site for a travel agency with a tour search widget — destinations, dates, and party size.",
    tech: ["React", "Vite", "Tailwind"],
    liveUrl: "https://tour-aimj.onrender.com",
    githubUrl: "https://github.com/ImahWisdom/Tour",
    status: null,
    screenshot: "/sealine-home.png", // put your Sealine homepage screenshot at public/sealine-home.jpg
  },
  {
    id: "p4",
    title: "Project Four — Mobile App",
    category: ["mobile"],
    impact: "Cross-platform app currently in build — details land here at launch.",
    tech: ["Flutter", "Dart"],
    liveUrl: null,
    githubUrl: "https://github.com/your-username/project-four",
    status: "In progress",
  },
  // Add more projects by copying an object above — the grid and
  // filters pick up new entries automatically.
];

const SKILLS = [
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL", "REST APIs"],
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: Code2,
    items: ["React", "Vue.js", "Redux", "Zustand", "Tailwind CSS", "Vite"],
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: Smartphone,
    items: ["Flutter", "React Native", "Dart", "Mobile UI"],
  },
  {
    key: "tools",
    label: "DevOps / Tools",
    icon: Settings,
    items: ["Git & GitHub", "Render", "Docker", "CI/CD", "Postman"],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Scope the problem, users, and constraints before any code exists." },
  { step: "02", title: "DB Design", desc: "Model the data so the hard edge cases are cheap, not painful." },
  { step: "03", title: "API", desc: "Build a typed, documented backend the frontend can trust." },
  { step: "04", title: "Frontend", desc: "Ship interfaces that are fast, accessible, and easy to extend." },
  { step: "05", title: "Mobile", desc: "Bring the same product to iOS and Android without a second brain." },
  { step: "06", title: "Deploy", desc: "Ship, monitor, and hand over something the client can run." },
];

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

/* ============================================================
   Hooks & small utilities
   ============================================================ */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

/* ============================================================
   Nav
   ============================================================ */

function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  const handleLink = () => setOpen(false);

  return (
    <header className="nav-wrap">
      <div className="nav-inner">
        <a href="#home" className="nav-logo" onClick={handleLink}>
          <span className="nav-logo-mark" aria-hidden="true">
            <Layers size={16} strokeWidth={2.4} />
          </span>
          <span>{PROFILE.firstName}</span>
          <span className="nav-logo-dot">.</span>
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            aria-label="Toggle color theme"
            className="icon-btn"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a href="#contact" className="btn btn-accent nav-cta">
            Hire Me
          </a>
          <button
            aria-label="Toggle menu"
            className="icon-btn nav-burger"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-mobile-link" onClick={handleLink}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-accent" onClick={handleLink}>
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   Hero — signature stacked-layers visual
   ============================================================ */

const STACK_LAYERS = [
  { label: "MOBILE", width: "58%" },
  { label: "FRONTEND", width: "78%" },
  { label: "BACKEND", width: "92%" },
  { label: "DATABASE", width: "68%" },
];

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <MapPin size={13} />
            <span>{PROFILE.location} · Available for work</span>
          </div>

          <h1 className="hero-title">
            {PROFILE.firstName} <span className="hero-title-accent">{PROFILE.lastName}</span>
            <br />
            builds the whole product.
          </h1>

          <p className="hero-role">{PROFILE.role}</p>
          <p className="hero-pitch">{PROFILE.pitch}</p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-accent">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Hire Me
            </a>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <Download size={15} /> Resume
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="hero-portrait">
            {PROFILE.photoUrl ? (
              <img src={PROFILE.photoUrl} alt={`${PROFILE.firstName} ${PROFILE.lastName}`} />
            ) : (
              <div className="hero-portrait-fallback">
                <span>{`${PROFILE.firstName?.[0] || ""}${PROFILE.lastName?.[0] || ""}`.toUpperCase() || "W"}</span>
              </div>
            )}
          </div>

          <div className="stack-badge" aria-hidden="true">
            <span className="mono-chip stack-badge-label">// the stack</span>
            {STACK_LAYERS.map((layer, i) => (
              <div
                key={layer.label}
                className={`stack-bar stack-bar-${i}`}
                style={{ width: layer.width, animationDelay: `${i * 140 + 300}ms` }}
              >
                <span className="stack-bar-label">{layer.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Skills
   ============================================================ */

function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <SectionLabel>skills_</SectionLabel>
        <h2 className="section-title">What I bring to a build</h2>
      </Reveal>

      <div className="skills-grid">
        {SKILLS.map((col, i) => {
          const Icon = col.icon;
          return (
            <Reveal key={col.key} delay={i * 90}>
              <div className="skill-col">
                <div className="skill-icon">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="skill-col-title">{col.label}</h3>
                <ul className="skill-list">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Projects
   ============================================================ */

const FILTERS = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Fullstack" },
  { key: "mobile", label: "Mobile" },
  { key: "frontend", label: "Frontend" },
];

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={(index % 3) * 90}>
      <article className="project-card">
        <div className="project-thumb">
          {project.screenshot ? (
            <img src={project.screenshot} alt={`${project.title} dashboard`} className="project-thumb-img" />
          ) : (
            <>
              <span className="project-thumb-tag mono-chip">
                {project.status ? project.status : project.category[0]}
              </span>
              <span className="project-thumb-hint">add screenshot</span>
            </>
          )}
        </div>

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-impact">{project.impact}</p>

          {project.dashboardNote && (
            <p className="project-dashboard-note">{project.dashboardNote}</p>
          )}

          <div className="project-tags">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>

          <div className="project-links">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                Live <ExternalLink size={13} />
              </a>
            ) : (
              <span className="project-link project-link-disabled">Live soon</span>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                GitHub <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="section section-alt">
      <Reveal>
        <SectionLabel>projects_</SectionLabel>
        <div className="projects-head">
          <h2 className="section-title">Selected work</h2>
          <div className="filter-tabs" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`filter-tab ${filter === f.key ? "filter-tab-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="projects-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Process
   ============================================================ */

function Process() {
  return (
    <section id="process" className="section">
      <Reveal>
        <SectionLabel>process_</SectionLabel>
        <h2 className="section-title">How a project moves</h2>
      </Reveal>

      <div className="process-line">
        {PROCESS.map((step, i) => (
          <Reveal key={step.step} delay={i * 70} className="process-item-wrap">
            <div className="process-item">
              <div className="process-step-num mono-chip">{step.step}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Contact
   ============================================================ */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section section-alt">
      <Reveal>
        <SectionLabel>contact_</SectionLabel>
        <h2 className="section-title">Let's build something</h2>
        <p className="contact-sub">
          Frontend, backend, fullstack, or mobile — tell me what you're trying to ship.
        </p>
      </Reveal>

      <div className="contact-grid">
        <Reveal className="contact-links">
          <a href={`mailto:${PROFILE.email}`} className="contact-link">
            <Mail size={16} /> {PROFILE.email}
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="contact-link">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="contact-link">
            <Github size={16} /> GitHub
          </a>
          <a href={PROFILE.x} target="_blank" rel="noreferrer" className="contact-link">
            <XLogo size={15} /> X / Twitter
          </a>
        </Reveal>

        <Reveal delay={90}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Your name"
            />

            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="you@company.com"
            />

            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="form-input form-textarea"
              placeholder="What are you building?"
            />

            <button type="submit" className="btn btn-accent form-submit">
              Send message <ArrowRight size={15} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  const message = encodeURIComponent("Hi Wisdom, I found your portfolio and want to talk about a project.");
  return (
    <a
      href={`https://wa.me/${PROFILE.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-btn"
      aria-label="Message on WhatsApp"
    >
      <MessageCircle size={22} strokeWidth={2} />
    </a>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="nav-logo-mark" aria-hidden="true">
        <Layers size={14} strokeWidth={2.4} />
      </span>
      <span>
        {PROFILE.firstName} {PROFILE.lastName} — built end to end.
      </span>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={`app-root ${theme === "light" ? "theme-light" : "theme-dark"} scroll-smooth`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        .app-root {
          --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
          --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', ui-monospace, monospace;
          font-family: var(--font-body);
          min-height: 100vh;
          transition: background-color .35s ease, color .35s ease;
        }

        .theme-dark {
          --bg: #0a0e14;
          --surface: #111820;
          --surface-2: #161f2a;
          --border: #232e3b;
          --text: #e8edf3;
          --text-muted: #8a97a8;
          --accent: #4fd1c5;
          --accent-strong: #7de9dd;
          --accent-2: #f5a623;
          --accent-soft: rgba(79, 209, 197, 0.12);
          background: var(--bg);
          color: var(--text);
        }

        .theme-light {
          --bg: #f4f6f8;
          --surface: #ffffff;
          --surface-2: #eef1f4;
          --border: #dde2e8;
          --text: #10161d;
          --text-muted: #5b6774;
          --accent: #0f8f82;
          --accent-strong: #0b6b61;
          --accent-2: #c97a1a;
          --accent-soft: rgba(15, 143, 130, 0.10);
          background: var(--bg);
          color: var(--text);
        }

        .app-root * { border-color: var(--border); }

        .section-label {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--accent);
          margin-bottom: 10px;
        }
        .section-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.25rem);
          letter-spacing: -0.01em;
          margin: 0;
          color: var(--text);
        }
        .mono-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        /* Nav */
        .nav-wrap {
          position: sticky; top: 0; z-index: 50;
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1120px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-display); font-weight: 600; font-size: 17px;
          color: var(--text); text-decoration: none;
        }
        .nav-logo-mark {
          display: inline-flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 7px;
          background: var(--accent-soft); color: var(--accent);
        }
        .nav-logo-dot { color: var(--accent); }
        .nav-links { display: none; gap: 28px; }
        .nav-link {
          font-size: 14px; color: var(--text-muted); text-decoration: none;
          transition: color .2s ease;
        }
        .nav-link:hover { color: var(--text); }
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text); cursor: pointer; transition: border-color .2s ease;
        }
        .icon-btn:hover { border-color: var(--accent); }
        .nav-cta { display: none; }
        .nav-burger { display: inline-flex; }
        .nav-mobile {
          display: flex; flex-direction: column; gap: 14px;
          padding: 16px 20px 22px; border-top: 1px solid var(--border);
        }
        .nav-mobile-link { color: var(--text); text-decoration: none; font-size: 15px; }

        @media (min-width: 768px) {
          .nav-links { display: flex; }
          .nav-cta { display: inline-flex; }
          .nav-burger { display: none; }
        }

        /* Buttons */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-weight: 500; font-size: 14px;
          padding: 10px 18px; border-radius: 9px; text-decoration: none;
          cursor: pointer; border: 1px solid transparent; transition: all .2s ease;
        }
        .btn-accent { background: var(--accent); color: #06120f; }
        .btn-accent:hover { background: var(--accent-strong); }
        .btn-ghost { background: transparent; color: var(--text); border-color: var(--border); }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

        /* Reveal animation */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { transition: none; opacity: 1; transform: none; }
          .stack-bar { animation: none !important; opacity: 1 !important; }
        }

        /* Hero */
        .hero-section { max-width: 1120px; margin: 0 auto; padding: 64px 20px 40px; }
        .hero-grid { display: grid; gap: 40px; align-items: center; }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 12px; color: var(--text-muted);
          border: 1px solid var(--border); border-radius: 999px; padding: 5px 12px;
          margin-bottom: 20px; width: fit-content;
        }
        .hero-title {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(2.1rem, 5.5vw, 3.4rem); line-height: 1.08; letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .hero-title-accent { color: var(--accent); }
        .hero-role { font-size: 16px; color: var(--text-muted); margin: 0 0 14px; font-weight: 500; }
        .hero-pitch { font-size: 15.5px; line-height: 1.6; color: var(--text-muted); max-width: 46ch; margin: 0 0 28px; }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; }

        .hero-portrait-wrap { position: relative; display: flex; justify-content: center; padding-bottom: 46px; }
        .hero-portrait {
          width: 100%; max-width: 340px; aspect-ratio: 4 / 5; border-radius: 20px;
          overflow: hidden; border: 1px solid var(--border);
          box-shadow: 0 0 0 6px var(--accent-soft);
        }
        .hero-portrait img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-portrait-fallback {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          background: var(--accent-soft); color: var(--accent);
          font-family: var(--font-display); font-weight: 700; font-size: 48px;
        }
        .stack-badge {
          position: absolute; left: 50%; bottom: 0; transform: translateX(-50%);
          width: 88%; max-width: 300px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; padding: 14px 16px 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }
        .stack-badge-label { display: block; margin-bottom: 10px; }
        .stack-bar {
          height: 30px; border-radius: 7px; margin-bottom: 7px;
          display: flex; align-items: center; padding: 0 11px;
          background: var(--accent-soft); border: 1px solid var(--border);
          opacity: 0; animation: stackRise .6s ease forwards;
        }
        .stack-bar:last-child { margin-bottom: 0; }
        .stack-bar-0 { background: color-mix(in srgb, var(--accent) 10%, var(--surface-2)); }
        .stack-bar-1 { background: color-mix(in srgb, var(--accent) 18%, var(--surface-2)); }
        .stack-bar-2 { background: color-mix(in srgb, var(--accent) 26%, var(--surface-2)); }
        .stack-bar-3 { background: color-mix(in srgb, var(--accent) 14%, var(--surface-2)); }
        .stack-bar-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.05em; color: var(--text); }
        @keyframes stackRise { from { opacity: 0; transform: translateY(14px) scaleX(.92); } to { opacity: 1; transform: translateY(0) scaleX(1); } }

        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.15fr 0.85fr; }
          .hero-portrait-wrap { justify-content: flex-end; padding-bottom: 54px; }
        }

        /* Sections */
        .section { max-width: 1120px; margin: 0 auto; padding: 64px 20px; }
        .section-alt { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

        /* Skills */
        .skills-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }
        .skill-col { border: 1px solid var(--border); border-radius: 14px; padding: 22px; background: var(--surface); height: 100%; }
        .theme-dark .skill-col { background: var(--surface-2); }
        .skill-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--accent-soft); color: var(--accent); margin-bottom: 14px;
        }
        .skill-col-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin: 0 0 12px; }
        .skill-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .skill-list li { font-size: 13.5px; color: var(--text-muted); }
        @media (min-width: 700px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1000px) { .skills-grid { grid-template-columns: repeat(4, 1fr); } }

        /* Projects */
        .projects-head { display: flex; flex-direction: column; gap: 18px; margin-bottom: 8px; }
        .filter-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
        .filter-tab {
          font-family: var(--font-mono); font-size: 12.5px; padding: 7px 14px; border-radius: 999px;
          border: 1px solid var(--border); background: transparent; color: var(--text-muted); cursor: pointer;
          transition: all .2s ease;
        }
        .filter-tab-active { background: var(--accent); color: #06120f; border-color: var(--accent); }
        @media (min-width: 700px) { .projects-head { flex-direction: row; align-items: flex-end; justify-content: space-between; } }

        .projects-grid { display: grid; grid-template-columns: 1fr; gap: 22px; margin-top: 32px; }
        @media (min-width: 700px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }

        .project-card {
          border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
          background: var(--bg); display: flex; flex-direction: column; height: 100%;
          transition: border-color .2s ease, transform .2s ease;
        }
        .project-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .project-thumb {
          height: 150px; background: var(--surface-2);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
          border-bottom: 1px solid var(--border);
        }
        .project-thumb-tag { text-transform: uppercase; }
        .project-thumb-hint { font-size: 11px; color: var(--text-muted); opacity: 0.6; }
        .project-thumb-img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
        .project-body { padding: 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .project-title { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin: 0; }
        .project-impact { font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin: 0; }
        .project-dashboard-note {
          font-family: var(--font-mono); font-size: 11.5px; color: var(--accent);
          background: var(--accent-soft); border-radius: 7px; padding: 8px 10px; margin: 0; line-height: 1.4;
        }
        .project-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tech-tag {
          font-family: var(--font-mono); font-size: 11px; padding: 4px 9px; border-radius: 6px;
          background: var(--accent-soft); color: var(--accent);
        }
        .project-links { display: flex; gap: 16px; margin-top: auto; padding-top: 6px; }
        .project-link {
          display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 500;
          color: var(--text); text-decoration: none;
        }
        .project-link:hover { color: var(--accent); }
        .project-link-disabled { color: var(--text-muted); }

        /* Process */
        .process-line { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 36px; }
        .process-item-wrap { height: 100%; }
        .process-item {
          border: 1px solid var(--border); border-radius: 14px; padding: 20px; height: 100%;
          background: var(--surface);
        }
        .process-step-num { color: var(--accent); font-size: 12px; margin-bottom: 10px; }
        .process-step-title { font-family: var(--font-display); font-size: 15.5px; font-weight: 600; margin: 0 0 6px; }
        .process-step-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0; }
        @media (min-width: 700px) { .process-line { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1000px) { .process-line { grid-template-columns: repeat(6, 1fr); } }

        /* Contact */
        .contact-sub { color: var(--text-muted); font-size: 14.5px; margin: 10px 0 0; max-width: 48ch; }
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-top: 36px; align-items: start; }
        .contact-links { display: flex; flex-direction: column; gap: 14px; align-self: start; }
        .contact-link {
          display: inline-flex; align-items: center; gap: 10px; font-size: 14.5px; font-weight: 500;
          color: var(--text); text-decoration: none; padding: 12px 14px;
          border: 1px solid var(--border); border-radius: 10px; background: var(--bg);
          transition: border-color .2s ease;
        }
        .contact-link:hover { border-color: var(--accent); color: var(--accent); }
        .contact-form { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-family: var(--font-mono); font-size: 11.5px; color: var(--text-muted); margin-top: 10px; }
        .form-input {
          font-family: var(--font-body); font-size: 14px; padding: 11px 13px; border-radius: 9px;
          border: 1px solid var(--border); background: var(--bg); color: var(--text); outline: none;
        }
        .form-input:focus { border-color: var(--accent); }
        .form-textarea { resize: vertical; }
        .form-submit { margin-top: 16px; justify-content: center; }
        @media (min-width: 800px) { .contact-grid { grid-template-columns: 0.8fr 1.2fr; } }

        /* WhatsApp floating button */
        .whatsapp-btn {
          position: fixed; right: 18px; bottom: 18px; z-index: 60;
          width: 52px; height: 52px; border-radius: 50%;
          background: #25d366; color: #06120f;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          transition: transform .2s ease;
        }
        .whatsapp-btn:hover { transform: scale(1.06); }

        /* Footer */
        .footer {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 26px 20px; font-size: 13px; color: var(--text-muted);
          border-top: 1px solid var(--border);
        }
      `}</style>

      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Skills />
      <Projects />
      <Process />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
