/* global React, Icon */
const APP_URL_2 = "https://app.triplanio.com";

/* =========================================================
   Section 2 — Problem
========================================================= */
function Problem() {
  return (
    <section className="section section--wash">
      <div className="container">
        <div className="problem reveal">
          <div>
            <span className="eyebrow">Before Triplanio</span>
            <h2 style={{ marginTop: 16 }}>
              Your trip lives in 12 tabs<br />and a Notes app.
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Hotel confirmations in your inbox. Flights in screenshots. The itinerary
              in a Google Doc nobody else opened. Budgets on a napkin.
            </p>
          </div>

          <div className="collage" aria-hidden="true">
            <div className="collage__card collage__card--mail">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#ea4335" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Inbox · 3 of 12
                </span>
              </div>
              <div className="mailrow">
                <span className="avatar">B</span>
                <div className="lines">
                  <div className="from">Booking.com</div>
                  <div className="subj">Memmo Alfama — Your reservation is confirmed (LIS)</div>
                </div>
              </div>
              <div className="mailrow">
                <span className="avatar">BA</span>
                <div className="lines">
                  <div className="from">British Airways</div>
                  <div className="subj">E-ticket BA503 LHR → LIS · Sat 12 Jul · Seat 14A</div>
                </div>
              </div>
              <div className="mailrow">
                <span className="avatar">CP</span>
                <div className="lines">
                  <div className="from">Comboios de Portugal</div>
                  <div className="subj">Alfa Pendular · Lisboa-Sta. Apolónia → Porto-Campanhã</div>
                </div>
              </div>
            </div>

            <div className="collage__card collage__card--notes">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>iberia plan v3 (real)</div>
              <div style={{ color: "#7c6b3a", lineHeight: 1.6 }}>
                · lisbon: book tram 28 ??<br />
                · ask mike if he wants porto wine cellars<br />
                · barcelona airbnb — pin link???<br />
                · €€€ check w/ sam
              </div>
            </div>

            <div className="collage__card collage__card--tabs">
              <div className="tabstrip">
                <span className="t">Tripadvisor — Lisbon</span>
                <span className="t">Google Doc · Itinerary</span>
                <span className="t">Booking · Porto</span>
                <span className="t">Maps</span>
              </div>
              <div className="tabsbody">12 tabs open · 4 windows · which one had the rental?</div>
            </div>
          </div>
        </div>

        <p className="problem__handoff reveal">
          Triplanio brings it together.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   Section 3 — Features grid
========================================================= */
const FEATURES = [
  {
    icon: "timeline",
    title: "All-in-one timeline",
    body: "Cities, transfers, hotels, activities — sorted by date and timezone, automatically.",
  },
  {
    icon: "users",
    title: "Plan together",
    body: "Invite friends and family — even people without an account — and edit the trip as a team with clear roles.",
  },
  {
    icon: "sparkles",
    title: "AI trip planner",
    body: "Describe the trip you want and get a complete draft itinerary in seconds, ready to refine.",
    warm: true,
  },
  {
    icon: "chat",
    title: "AI travel concierge in Telegram & WhatsApp",
    body: "Smart reminders for check-ins, cancellation deadlines and departures — plus an AI assistant that answers questions about your plan, right in chat.",
  },
  {
    icon: "wallet",
    title: "Multi-currency budget",
    body: "Spend in any currency. Triplanio auto-aggregates every booking with real FX rates and clean categories.",
    wide: true,
  },
];

function FeatureCard({ f }) {
  return (
    <article className={`card reveal ${f.wide ? "card--wide" : ""}`}>
      <div>
        <span className={`card__icon ${f.warm ? "card__icon--warm" : ""}`}>
          <Icon name={f.icon} size={22} />
        </span>
        <h3>{f.title}</h3>
        <p>{f.body}</p>
      </div>
      {f.wide ? (
        <div className="preview" aria-hidden="true">
          <BudgetMini />
        </div>
      ) : null}
    </article>
  );
}

function BudgetMini() {
  const rows = [
    { c: "Hotels",     pct: 42, amt: "€2,025", ccy: "$2,190", color: "#2167e2" },
    { c: "Flights",    pct: 28, amt: "€1,350", ccy: "$1,460", color: "#5b8fff" },
    { c: "Activities", pct: 18, amt: "€868",   ccy: "$938",   color: "#c9603a" },
    { c: "Food",       pct: 12, amt: "€577",   ccy: "$624",   color: "#1f8a5b" },
  ];
  return (
    <div className="budget" style={{ padding: 0 }}>
      <div className="budget__total" style={{ marginBottom: 12 }}>
        <span className="big" style={{ fontSize: 26 }}>€4,820</span>
        <span className="delta">€180 under</span>
      </div>
      <div className="budget__bar" style={{ marginBottom: 12 }}>
        {rows.map((r) => <i key={r.c} style={{ width: `${r.pct}%`, background: r.color }} />)}
      </div>
      <div className="budget__rows">
        {rows.map((r) => (
          <div className="budget__row" key={r.c}>
            <span className="sw" style={{ background: r.color }} />
            <span>{r.c}</span>
            <span className="amt">{r.amt}</span>
            <span className="ccy">{r.ccy}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Features</span>
          <h2>Everything your trip needs, in one place.</h2>
          <p className="lede" style={{ margin: "14px auto 0" }}>
            Five things Triplanio does that change how you plan.
          </p>
        </div>

        <div className="features">
          {FEATURES.map((f) => <FeatureCard f={f} key={f.title} />)}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Section 4 — How it works
========================================================= */
function StepThumb({ kind }) {
  if (kind === "create") {
    return (
      <div className="step__thumb" aria-hidden="true">
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
          New trip
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12, color: "var(--ink)" }}>
            <span style={{ color: "var(--muted)", marginRight: 8 }}>Where</span>
            Lisbon · Porto · Barcelona
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12 }}>
              <span style={{ color: "var(--muted)", marginRight: 6 }}>From</span> Jul 12
            </div>
            <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12 }}>
              <span style={{ color: "var(--muted)", marginRight: 6 }}>To</span> Jul 23
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, fontSize: 11.5 }}>
            <span style={{ background: "rgba(33,103,226,.08)", color: "var(--brand)", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>You · organizer</span>
            <span style={{ background: "var(--wash)", color: "var(--muted)", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>+ 3 travelers</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "ai") {
    return (
      <div className="step__thumb" aria-hidden="true">
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
          AI planner
        </div>
        <div style={{ background: "var(--wash)", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
          “11 days, 4 people, slow pace, ocean swims, no museums.”
        </div>
        <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
          {["Lisbon · 4 nights · Alfama base", "Porto · 2 nights · river views", "Barcelona · 5 nights · beach side"].map((t, i) => (
            <div key={i} style={{
              fontSize: 12, padding: "8px 10px",
              background: "#fff", border: "1px solid var(--line)", borderRadius: 8,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }} />
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  }
  // travel
  return (
    <div className="step__thumb" aria-hidden="true">
      <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
        Day of travel
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand), #5b8fff)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>AI</span>
          <div style={{ background: "#eef2f9", padding: "8px 10px", borderRadius: 10, borderBottomLeftRadius: 4 }}>
            Free-cancellation for Memmo Alfama ends in 2 days.
          </div>
        </div>
        <div style={{ alignSelf: "flex-end", background: "var(--brand)", color: "#fff", padding: "8px 10px", borderRadius: 10, borderBottomRightRadius: 4, fontSize: 12, maxWidth: "80%" }}>
          Confirm it
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--muted)" }}>
          <span style={{ width: 6, height: 6, borderRadius: 50, background: "var(--success)" }} />
          Confirmed · synced to your timeline
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: "1", kind: "create", title: "Create your trip", body: "Add destinations, dates and who's coming. Triplanio generates a skeleton you can fill in at your own pace." },
    { num: "2", kind: "ai",     title: "Add the details — or let AI do it", body: "Hotels, flights, transfers, activities. Use the AI trip planner to draft a full itinerary from a single prompt." },
    { num: "3", kind: "travel", title: "Travel together, stress less", body: "Share with co-travelers, get smart reminders, track budgets, and keep every booking in one place." },
  ];
  return (
    <section className="section" id="how">
      <div className="container">
        <div className="section__head reveal" style={{ marginBottom: 64 }}>
          <span className="eyebrow">How it works</span>
          <h2>From idea to itinerary in three steps.</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" key={s.num} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="step__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <StepThumb kind={s.kind} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Problem = Problem;
window.Features = Features;
window.HowItWorks = HowItWorks;
