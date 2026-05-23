/* global React, Icon, TriplanioMark */
const { useState, useEffect, useRef, useCallback } = React;

/* =========================================================
   Config
========================================================= */
const APP_URL = "https://app.triplanio.com";
const NAV = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

/* =========================================================
   Header
========================================================= */
const LANGS = [
  { code: "EN", label: "English",  flag: "en" },
  { code: "RU", label: "Русский",  flag: "ru" },
  { code: "ES", label: "Español",  flag: "es" },
];

function Flag({ kind, width = 18, height = 12 }) {
  const common = { width, height, viewBox: "0 0 60 40", style: { display: "block", borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,.08)", flex: "0 0 auto" }, "aria-hidden": true };
  if (kind === "en") {
    return (
      <svg {...common} viewBox="0 0 60 30">
        <defs>
          <clipPath id="f-en-c"><rect width="60" height="30" /></clipPath>
          <clipPath id="f-en-t"><path d="M30,15 h30 v15 z v-30 h-30 z h-30 v-15 z v30 h30 z" /></clipPath>
        </defs>
        <g clipPath="url(#f-en-c)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#f-en-t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }
  if (kind === "ru") {
    return (
      <svg {...common} viewBox="0 0 9 6">
        <rect width="9" height="6" fill="#fff" />
        <rect width="9" height="4" y="2" fill="#0033A0" />
        <rect width="9" height="2" y="4" fill="#DA291C" />
      </svg>
    );
  }
  if (kind === "es") {
    return (
      <svg {...common} viewBox="0 0 12 8">
        <rect width="12" height="8" fill="#AA151B" />
        <rect width="12" height="4" y="2" fill="#F1BF00" />
      </svg>
    );
  }
  return null;
}

function LangDropdown({ value, onChange, direction = "down" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGS.find((l) => l.code === value) || LANGS[0];
  return (
    <div className={`langdd ${open ? "is-open" : ""} ${direction === "up" ? "langdd--up" : ""}`} ref={ref}>
      <button
        type="button"
        className="langdd__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
      >
        <Flag kind={current.flag} width={18} height={12} />
        <span>{current.code}</span>
        <Icon name="chevron" size={12} className="chev" style={{ transform: "rotate(90deg)" }} />
      </button>
      <div className="langdd__menu" role="listbox" aria-label="Language">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            role="option"
            aria-checked={l.code === value}
            className="langdd__item"
            onClick={() => { onChange(l.code); setOpen(false); }}
          >
            <Flag kind={l.flag} width={22} height={16} />
            <span className="label">{l.label}</span>
            <span className="code">{l.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Header({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header__inner">
          <a href="#top" className="brand" aria-label="Triplanio — home">
            <span className="brand__mark"><TriplanioMark /></span>
            <span>Triplanio</span>
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>

          <div className="header__right">
            <LangDropdown value={lang} onChange={setLang} />
            <a className="btn btn--primary" href={APP_URL}>Start Planning</a>
            <button
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <Icon name={drawerOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${drawerOpen ? "is-open" : ""}`} aria-hidden={!drawerOpen}>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setDrawerOpen(false)}>{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="drawer__lang">
          <LangDropdown value={lang} onChange={setLang} />
        </div>
      </div>
    </>
  );
}

/* =========================================================
   Hero — copy + mocked Timeline app frame
========================================================= */
function HeroMockup() {
  return (
    <div className="app-frame" role="img" aria-label="Triplanio app — Timeline view showing a Lisbon to Porto to Barcelona trip">
      <div className="app-frame__bar">
        <span className="dot dot--r" />
        <span className="dot dot--y" />
        <span className="dot dot--g" />
        <span className="url">app.triplanio.com / iberia-summer-26</span>
      </div>
      <div className="app-frame__body">
        <aside className="app-sidebar" aria-hidden="true">
          <div className="app-sidebar__group">Trips</div>
          <div className="app-sidebar__item is-active">
            <span className="swatch swatch--lisbon" />
            Iberia — Summer ’26
          </div>
          <div className="app-sidebar__item">
            <span className="swatch" style={{ background: "#8693a8" }} />
            Japan in cherry season
          </div>
          <div className="app-sidebar__item">
            <span className="swatch" style={{ background: "#8693a8" }} />
            Patagonia trek
          </div>
          <div className="app-sidebar__group">This trip</div>
          <div className="app-sidebar__item">
            <span className="swatch swatch--lisbon" />
            Lisbon · 4 nights
          </div>
          <div className="app-sidebar__item">
            <span className="swatch swatch--porto" />
            Porto · 2 nights
          </div>
          <div className="app-sidebar__item">
            <span className="swatch swatch--bcn" />
            Barcelona · 5 nights
          </div>
        </aside>

        <div className="app-main">
          <div className="app-main__head">
            <div>
              <div className="app-main__title">Iberia — Summer ’26</div>
              <div className="app-main__subtitle">Jul 12 → Jul 23 · 3 cities · 4 travelers</div>
            </div>
            <div className="app-tabs" aria-hidden="true">
              <span className="app-tab is-active">Timeline</span>
              <span className="app-tab">Calendar</span>
              <span className="app-tab">Map</span>
            </div>
          </div>

          <div className="tl">
            <div className="tl__day" data-day="Sat · Jul 12">
              <div className="tl-card">
                <span className="icon"><Icon name="plane" /></span>
                <span><strong>LHR → LIS</strong> · British Airways 503</span>
                <span className="tag">Flight</span>
                <span className="meta">10:25</span>
              </div>
              <div className="tl-card">
                <span className="icon"><Icon name="bed" /></span>
                <span><strong>Memmo Alfama</strong> · check-in</span>
                <span className="tag tag--green">Hotel</span>
                <span className="meta">15:00</span>
              </div>
            </div>

            <div className="tl__day tl__day--accent" data-day="Sun · Jul 13">
              <div className="tl-card">
                <span className="icon"><Icon name="cam" /></span>
                <span><strong>Tram 28 ride</strong> · Alfama loop</span>
                <span className="tag tag--warm">Activity</span>
                <span className="meta">10:00</span>
              </div>
              <div className="tl-card">
                <span className="icon"><Icon name="cam" /></span>
                <span><strong>Pastéis de Belém</strong> · pastry crawl</span>
                <span className="tag tag--warm">Activity</span>
                <span className="meta">15:30</span>
              </div>
            </div>

            <div className="tl__day tl__day--green" data-day="Wed · Jul 16">
              <div className="tl-card">
                <span className="icon"><Icon name="train" /></span>
                <span><strong>Lisbon → Porto</strong> · Alfa Pendular</span>
                <span className="tag">Transfer</span>
                <span className="meta">08:39</span>
              </div>
              <div className="tl-card">
                <span className="icon"><Icon name="bed" /></span>
                <span><strong>Torel Avantgarde</strong> · check-in</span>
                <span className="tag tag--green">Hotel</span>
                <span className="meta">14:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__copy reveal">
            <h1>
              Your whole trip.
              <span className="break"><span className="accent">One</span> beautiful plan.</span>
            </h1>
            <p className="hero__lede">
              Build multi-city itineraries, plan together, track budgets in every currency,
              and let Triplanio handle the boring parts.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary btn--lg" href={APP_URL}>
                Start Planning <Icon name="arrowRight" size={16} className="chev" />
              </a>
              <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
            </div>
            <div className="hero__trust">
              <span>Free to start</span>
              <span className="dot" />
              <span>No credit card</span>
              <span className="dot" />
              <span>Available in EN · RU · ES</span>
            </div>
          </div>

          <div className="hero__visual reveal" style={{ transitionDelay: "120ms" }}>
            <HeroMockup />

            <div className="float float--budget" aria-hidden="true">
              <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
                Trip budget
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                  €4,820
                </strong>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>· $5,210 · ₽491k</span>
              </div>
            </div>

            <div className="float float--chat" aria-hidden="true">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--brand), #5b8fff)",
                  color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                }}>AI</span>
                <div style={{ fontSize: 12.5, lineHeight: 1.3 }}>
                  <div style={{ fontWeight: 600 }}>Leave at 14:10</div>
                  <div style={{ color: "var(--muted)", fontSize: 11.5 }}>Train to Porto, 30 min from hotel</div>
                </div>
              </div>
            </div>

            <div className="float float--pins" aria-hidden="true">
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }} />
                Lisbon
                <span style={{ width: 14, height: 1, background: "var(--line)" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--warm)" }} />
                Porto
                <span style={{ width: 14, height: 1, background: "var(--line)" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />
                Barcelona
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Header = Header;
window.Hero = Hero;
window.LangDropdown = LangDropdown;
