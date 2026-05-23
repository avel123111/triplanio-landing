/* global React, Icon */
const { useState: useState2 } = React;

/* =========================================================
   Section 5 — Deep dives (alternating)
========================================================= */

/* 5a — Three views (Timeline / Calendar / Map) */
function ThreeViewsVisual() {
  const [view, setView] = useState2("Map");
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>
          Iberia ’26
        </div>
        <div className="app-tabs">
          {["Timeline", "Calendar", "Map"].map((v) => (
            <button
              key={v}
              type="button"
              className={`app-tab ${view === v ? "is-active" : ""}`}
              onClick={() => setView(v)}
              style={{ cursor: "pointer", border: 0 }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "Map" && (
        <div className="mapviz">
          <svg viewBox="0 0 600 320" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#dde3ee" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="600" height="320" fill="url(#grid)" />
            {/* coast outline */}
            <path d="M40,240 Q90,200 130,210 T220,190 Q260,170 320,180 T440,160 Q500,150 560,170"
                  fill="none" stroke="#cfd6e3" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* route */}
            <path d="M120,210 C200,180 240,200 290,170 C360,130 420,150 470,130"
                  fill="none" stroke="#2167e2" strokeWidth="2.4" strokeLinecap="round"
                  strokeDasharray="6 6">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.2s" repeatCount="indefinite" />
            </path>
          </svg>
          <div className="pin" style={{ left: "20%", top: "70%" }}>
            <span className="pin__dot" />
            <span className="pin__lbl">Lisbon</span>
          </div>
          <div className="pin" style={{ left: "48%", top: "55%" }}>
            <span className="pin__dot" style={{ background: "var(--warm)" }} />
            <span className="pin__lbl">Porto</span>
          </div>
          <div className="pin" style={{ left: "78%", top: "44%" }}>
            <span className="pin__dot" style={{ background: "var(--success)" }} />
            <span className="pin__lbl">Barcelona</span>
          </div>
        </div>
      )}

      {view === "Calendar" && (
        <div style={{ padding: 22 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, fontSize: 11.5 }}>
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <div key={i} style={{ textAlign: "center", color: "var(--muted)", fontWeight: 600, padding: "4px 0" }}>{d}</div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const inTrip = day >= 12 && day <= 23;
              const city = day < 16 ? "lis" : day < 18 ? "transfer" : day < 19 ? "por" : "bcn";
              const bg =
                !inTrip ? "transparent"
                  : city === "lis" ? "rgba(33,103,226,.18)"
                  : city === "por" ? "rgba(201,96,58,.18)"
                  : city === "transfer" ? "repeating-linear-gradient(45deg, rgba(33,103,226,.15) 0 4px, rgba(201,96,58,.15) 4px 8px)"
                  : "rgba(31,138,91,.18)";
              const fg = inTrip ? "var(--ink)" : "var(--muted-2)";
              return (
                <div key={i} style={{
                  height: 38,
                  background: bg,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  color: fg,
                  border: inTrip ? 0 : "1px solid var(--line-2)",
                }}>{day}</div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 11.5, color: "var(--muted)" }}>
            <span><i style={{ display: "inline-block", width: 10, height: 10, background: "rgba(33,103,226,.5)", borderRadius: 3, marginRight: 6 }} />Lisbon</span>
            <span><i style={{ display: "inline-block", width: 10, height: 10, background: "rgba(201,96,58,.5)", borderRadius: 3, marginRight: 6 }} />Porto</span>
            <span><i style={{ display: "inline-block", width: 10, height: 10, background: "rgba(31,138,91,.5)", borderRadius: 3, marginRight: 6 }} />Barcelona</span>
          </div>
        </div>
      )}

      {view === "Timeline" && (
        <div style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { d: "Jul 12", t: "Flight LHR → LIS", tag: "Flight", color: "var(--brand)" },
              { d: "Jul 13", t: "Tram 28 ride", tag: "Activity", color: "var(--warm)" },
              { d: "Jul 16", t: "Train Lisbon → Porto", tag: "Transfer", color: "var(--brand)" },
              { d: "Jul 18", t: "Flight Porto → BCN", tag: "Flight", color: "var(--brand)" },
              { d: "Jul 21", t: "Sagrada Família entry", tag: "Activity", color: "var(--warm)" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "70px 1fr auto",
                alignItems: "center", gap: 10,
                background: "#fff", border: "1px solid var(--line)", borderRadius: 10,
                padding: "10px 12px", fontSize: 13,
              }}>
                <span style={{ color: "var(--muted)", fontWeight: 600, fontSize: 11.5 }}>{r.d}</span>
                <span>{r.t}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "rgba(33,103,226,.08)", color: r.color, fontWeight: 600 }}>{r.tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* 5b — AI planner chat */
function PlannerVisual() {
  return (
    <div className="chat" aria-hidden="true">
      <div className="bubble bubble--user">
        11 days · 4 people · Iberia · slow pace · ocean swims · no museums.
      </div>
      <div className="bubble bubble--ai">
        Drafting a route from Lisbon north along the coast to Barcelona…
        <div style={{ marginTop: 6 }}>
          <span className="typing"><span /><span /><span /></span>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8, marginTop: 4 }}>
        <div className="planresult">
          <Icon name="bed" />
          <div>
            <strong>Lisbon · 4 nights</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>Alfama, ocean light, slow mornings</div>
          </div>
          <span className="badge">Stay</span>
        </div>
        <div className="planresult">
          <Icon name="train" />
          <div>
            <strong>Lisbon → Porto</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>Alfa Pendular · 2h 50m · 08:39</div>
          </div>
          <span className="badge">Transfer</span>
        </div>
        <div className="planresult">
          <Icon name="bed" />
          <div>
            <strong>Porto · 2 nights</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>Douro views, no museum agenda</div>
          </div>
          <span className="badge">Stay</span>
        </div>
        <div className="planresult">
          <Icon name="plane" />
          <div>
            <strong>Porto → Barcelona</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>Vueling 6602 · 2h 20m</div>
          </div>
          <span className="badge">Flight</span>
        </div>
      </div>
    </div>
  );
}

/* 5c — Concierge phone */
function ConciergeVisual() {
  return (
    <div style={{ background: "linear-gradient(180deg, #eef2f9, #f6f8fc)", padding: 24 }}>
      <div className="phone">
        <div className="phone__head">
          <span className="av">T</span>
          <div>
            <div className="name">Triplanio</div>
            <div className="sub">via Telegram · online</div>
          </div>
          <Icon name="telegram" size={16} stroke="none" fill="#2167e2" style={{ marginLeft: "auto" }} />
        </div>
        <div className="phone__body">
          <div className="phone__time">Today · 09:14</div>
          <div className="bubble bubble--ai">
            Heads up — the train to Porto leaves in 4h 25m. Leave the hotel by 14:10 to be safe.
          </div>
          <div className="bubble bubble--user" style={{ alignSelf: "flex-end" }}>
            What's the platform?
          </div>
          <div className="bubble bubble--ai">
            Sta. Apolónia · Platform 3. Your seats are coach 22, 41A–D.
          </div>
          <div className="bubble bubble--user" style={{ alignSelf: "flex-end" }}>
            Hotel address in Porto?
          </div>
          <div className="bubble bubble--ai">
            Torel Avantgarde — R. da Restauração 336, 4050-501 Porto. Check-in from 14:00.
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5d — Budget chart */
function BudgetVisual() {
  const rows = [
    { c: "Hotels",     pct: 42, amt: "€2,025", ccy: "$2,190", color: "#2167e2" },
    { c: "Flights",    pct: 28, amt: "€1,350", ccy: "$1,460", color: "#5b8fff" },
    { c: "Transfers",  pct: 9,  amt: "€434",   ccy: "$469",   color: "#9bb6ff" },
    { c: "Activities", pct: 13, amt: "€627",   ccy: "$678",   color: "#c9603a" },
    { c: "Food & misc",pct: 8,  amt: "€384",   ccy: "$415",   color: "#1f8a5b" },
  ];
  return (
    <div className="budget">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>
          Trip total
        </span>
        <span style={{ fontSize: 11.5, color: "var(--muted)" }}>Home currency · EUR · live FX</span>
      </div>
      <div className="budget__total">
        <span className="big">€4,820</span>
        <span className="delta">€180 under plan</span>
      </div>
      <div className="budget__bar">
        {rows.map((r) => <i key={r.c} style={{ width: `${r.pct}%`, background: r.color }} />)}
      </div>
      <div className="budget__rows" style={{ marginTop: 8 }}>
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

function DeepDive({ reverse, eyebrow, title, body, highlights, children }) {
  return (
    <div className={`deep ${reverse ? "deep--reverse" : ""} reveal`}>
      <div className="deep__copy">
        <span className="tag-eyebrow"><span className="dot" />{eyebrow}</span>
        <h3>{title}</h3>
        <p>{body}</p>
        <ul className="deep__highlights">
          {highlights.map((h) => (
            <li key={h}>
              <span className="check"><Icon name="check" size={12} strokeWidth={2.4} /></span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="deep__visual">{children}</div>
    </div>
  );
}

function DeepDives() {
  return (
    <section className="section section--wash">
      <div className="container">
        <div className="section__head section__head--left reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">A closer look</span>
          <h2 style={{ maxWidth: 18 + "ch" }}>The product, in detail.</h2>
        </div>

        <DeepDive
          eyebrow="Timeline · Calendar · Map"
          title="One trip, three views."
          body="See your trip the way you think about it. Switch between a chronological timeline, a calendar view that shows free days at a glance, and a map that draws every leg of your route across the world."
          highlights={[
            "Click any city to expand its stay",
            "Drag-and-drop to reorder activities",
            "Map auto-fits as your trip grows",
          ]}
        >
          <ThreeViewsVisual />
        </DeepDive>

        <DeepDive
          reverse
          eyebrow="AI trip planner"
          title="An AI that actually plans the trip."
          body="Tell Triplanio where you want to go, how long you have and what you love doing. It returns a draft itinerary — cities, transfers, suggested stays, must-see spots — in seconds. Tweak anything, keep what works."
          highlights={[
            "Multi-city routes",
            "Realistic pacing",
            "Editable like any handmade plan",
          ]}
        >
          <PlannerVisual />
        </DeepDive>

        <DeepDive
          eyebrow="Telegram & WhatsApp"
          title="A travel concierge in your pocket."
          body="Connect your trip to Telegram or WhatsApp and get smart, timezone-aware nudges — when to leave for the airport, when free-cancellation expires, what's next on the day's plan. Ask the AI assistant anything about your trip and get a clear answer in chat."
          highlights={[
            "Smart timezone-aware reminders",
            "“What's my hotel address?” answered instantly",
            "Mute per trip",
          ]}
        >
          <ConciergeVisual />
        </DeepDive>

        <DeepDive
          reverse
          eyebrow="Smart budget"
          title="Real budgets, in any currency."
          body="Triplanio auto-pulls every hotel, transfer and activity price into a single budget — in your home currency — using live exchange rates. Add custom categories, override rates for cash purchases, and see exactly where the money goes."
          highlights={[
            "Auto-aggregated from bookings",
            "Live FX or manual rates",
            "Custom categories",
          ]}
        >
          <BudgetVisual />
        </DeepDive>
      </div>
    </section>
  );
}

window.DeepDives = DeepDives;
