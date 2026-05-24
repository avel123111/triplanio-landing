/* global React, Icon, useT */
const { useState: useState2 } = React;

/* =========================================================
   Section 5 — Deep dives (alternating)
========================================================= */

/* 5a — Three views (Timeline / Calendar / Map) */
function ThreeViewsVisual() {
  const t = useT();
  const [view, setView] = useState2("Map");
  const tabs = [
    { id: "Timeline", labelKey: "mockup.tab_timeline" },
    { id: "Calendar", labelKey: "mockup.tab_calendar" },
    { id: "Map",      labelKey: "mockup.tab_map" },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>
          {t("mockup.trip_title")}
        </div>
        <div className="app-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`app-tab ${view === tab.id ? "is-active" : ""}`}
              onClick={() => setView(tab.id)}
              style={{ cursor: "pointer", border: 0 }}
            >
              {t(tab.labelKey)}
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
            <span className="pin__lbl">{t("city.lisbon")}</span>
          </div>
          <div className="pin" style={{ left: "48%", top: "55%" }}>
            <span className="pin__dot" style={{ background: "var(--warm)" }} />
            <span className="pin__lbl">{t("city.porto")}</span>
          </div>
          <div className="pin" style={{ left: "78%", top: "44%" }}>
            <span className="pin__dot" style={{ background: "var(--success)" }} />
            <span className="pin__lbl">{t("city.barcelona")}</span>
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
            <span><i style={{ display: "inline-block", width: 10, height: 10, background: "rgba(33,103,226,.5)", borderRadius: 3, marginRight: 6 }} />{t("city.lisbon")}</span>
            <span><i style={{ display: "inline-block", width: 10, height: 10, background: "rgba(201,96,58,.5)", borderRadius: 3, marginRight: 6 }} />{t("city.porto")}</span>
            <span><i style={{ display: "inline-block", width: 10, height: 10, background: "rgba(31,138,91,.5)", borderRadius: 3, marginRight: 6 }} />{t("city.barcelona")}</span>
          </div>
        </div>
      )}

      {view === "Timeline" && (
        <div style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { d: "Jul 12", title: `${t("mockup.tag_flight")} LHR → LIS`,                                          tagKey: "mockup.tag_flight",   color: "var(--brand)" },
              { d: "Jul 13", title: `Tram 28`,                                                                       tagKey: "mockup.tag_activity", color: "var(--warm)" },
              { d: "Jul 16", title: `${t("mockup.tag_transfer")} ${t("city.lisbon")} → ${t("city.porto")}`,          tagKey: "mockup.tag_transfer", color: "var(--brand)" },
              { d: "Jul 18", title: `${t("mockup.tag_flight")} ${t("city.porto")} → BCN`,                            tagKey: "mockup.tag_flight",   color: "var(--brand)" },
              { d: "Jul 21", title: `Sagrada Família`,                                                               tagKey: "mockup.tag_activity", color: "var(--warm)" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "70px 1fr auto",
                alignItems: "center", gap: 10,
                background: "#fff", border: "1px solid var(--line)", borderRadius: 10,
                padding: "10px 12px", fontSize: 13,
              }}>
                <span style={{ color: "var(--muted)", fontWeight: 600, fontSize: 11.5 }}>{r.d}</span>
                <span>{r.title}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "rgba(33,103,226,.08)", color: r.color, fontWeight: 600 }}>{t(r.tagKey)}</span>
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
  const t = useT();
  return (
    <div className="chat" aria-hidden="true">
      <div className="bubble bubble--user">{t("planner.user_msg")}</div>
      <div className="bubble bubble--ai">
        {t("planner.ai_msg")}
        <div style={{ marginTop: 6 }}>
          <span className="typing"><span /><span /><span /></span>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8, marginTop: 4 }}>
        <div className="planresult">
          <Icon name="bed" />
          <div>
            <strong>{t("planner.res_lisbon")}</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{t("planner.res_lisbon_sub")}</div>
          </div>
          <span className="badge">{t("planner.badge_stay")}</span>
        </div>
        <div className="planresult">
          <Icon name="train" />
          <div>
            <strong>{t("planner.res_train")}</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{t("planner.res_train_sub")}</div>
          </div>
          <span className="badge">{t("planner.badge_transfer")}</span>
        </div>
        <div className="planresult">
          <Icon name="bed" />
          <div>
            <strong>{t("planner.res_porto")}</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{t("planner.res_porto_sub")}</div>
          </div>
          <span className="badge">{t("planner.badge_stay")}</span>
        </div>
        <div className="planresult">
          <Icon name="plane" />
          <div>
            <strong>{t("planner.res_flight")}</strong>
            <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{t("planner.res_flight_sub")}</div>
          </div>
          <span className="badge">{t("planner.badge_flight")}</span>
        </div>
      </div>
    </div>
  );
}

/* 5c — Concierge phone */
function ConciergeVisual() {
  const t = useT();
  return (
    <div style={{ background: "linear-gradient(180deg, #eef2f9, #f6f8fc)", padding: 24 }}>
      <div className="phone">
        <div className="phone__head">
          <span className="av">T</span>
          <div>
            <div className="name">Triplanio</div>
            <div className="sub">{t("phone.via")}</div>
          </div>
          <Icon name="telegram" size={16} stroke="none" fill="#2167e2" style={{ marginLeft: "auto" }} />
        </div>
        <div className="phone__body">
          <div className="phone__time">{t("phone.today")}</div>
          <div className="bubble bubble--ai">{t("phone.b1")}</div>
          <div className="bubble bubble--user" style={{ alignSelf: "flex-end" }}>{t("phone.u1")}</div>
          <div className="bubble bubble--ai">{t("phone.b2")}</div>
          <div className="bubble bubble--user" style={{ alignSelf: "flex-end" }}>{t("phone.u2")}</div>
          <div className="bubble bubble--ai">{t("phone.b3")}</div>
        </div>
      </div>
    </div>
  );
}

/* 5d — Budget chart */
function BudgetVisual() {
  const t = useT();
  const rows = [
    { k: "mini.hotels",     pct: 42, amt: "€2,025", ccy: "$2,190", color: "#2167e2" },
    { k: "mini.flights",    pct: 28, amt: "€1,350", ccy: "$1,460", color: "#5b8fff" },
    { k: "mini.transfers",  pct: 9,  amt: "€434",   ccy: "$469",   color: "#9bb6ff" },
    { k: "mini.activities", pct: 13, amt: "€627",   ccy: "$678",   color: "#c9603a" },
    { k: "mini.food_misc",  pct: 8,  amt: "€384",   ccy: "$415",   color: "#1f8a5b" },
  ];
  return (
    <div className="budget">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>
          {t("mini.total")}
        </span>
        <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{t("mini.home_ccy")}</span>
      </div>
      <div className="budget__total">
        <span className="big">€4,820</span>
        <span className="delta">{t("mini.under_plan")}</span>
      </div>
      <div className="budget__bar">
        {rows.map((r) => <i key={r.k} style={{ width: `${r.pct}%`, background: r.color }} />)}
      </div>
      <div className="budget__rows" style={{ marginTop: 8 }}>
        {rows.map((r) => (
          <div className="budget__row" key={r.k}>
            <span className="sw" style={{ background: r.color }} />
            <span>{t(r.k)}</span>
            <span className="amt">{r.amt}</span>
            <span className="ccy">{r.ccy}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeepDive({ reverse, eyebrowKey, titleKey, bodyKey, highlightKeys, children }) {
  const t = useT();
  return (
    <div className={`deep ${reverse ? "deep--reverse" : ""} reveal`}>
      <div className="deep__copy">
        <span className="tag-eyebrow"><span className="dot" />{t(eyebrowKey)}</span>
        <h3>{t(titleKey)}</h3>
        <p>{t(bodyKey)}</p>
        <ul className="deep__highlights">
          {highlightKeys.map((k) => (
            <li key={k}>
              <span className="check"><Icon name="check" size={12} strokeWidth={2.4} /></span>
              <span>{t(k)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="deep__visual">{children}</div>
    </div>
  );
}

function DeepDives() {
  const t = useT();
  return (
    <section className="section section--wash">
      <div className="container">
        <div className="section__head section__head--left reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">{t("dd.eyebrow")}</span>
          <h2 style={{ maxWidth: 18 + "ch" }}>{t("dd.h2")}</h2>
        </div>

        <DeepDive
          eyebrowKey="dd.threeviews.eyebrow"
          titleKey="dd.threeviews.title"
          bodyKey="dd.threeviews.body"
          highlightKeys={["dd.threeviews.h1", "dd.threeviews.h2", "dd.threeviews.h3"]}
        >
          <ThreeViewsVisual />
        </DeepDive>

        <DeepDive
          reverse
          eyebrowKey="dd.planner.eyebrow"
          titleKey="dd.planner.title"
          bodyKey="dd.planner.body"
          highlightKeys={["dd.planner.h1", "dd.planner.h2", "dd.planner.h3"]}
        >
          <PlannerVisual />
        </DeepDive>

        <DeepDive
          eyebrowKey="dd.concierge.eyebrow"
          titleKey="dd.concierge.title"
          bodyKey="dd.concierge.body"
          highlightKeys={["dd.concierge.h1", "dd.concierge.h2", "dd.concierge.h3"]}
        >
          <ConciergeVisual />
        </DeepDive>

        <DeepDive
          reverse
          eyebrowKey="dd.budget.eyebrow"
          titleKey="dd.budget.title"
          bodyKey="dd.budget.body"
          highlightKeys={["dd.budget.h1", "dd.budget.h2", "dd.budget.h3"]}
        >
          <BudgetVisual />
        </DeepDive>
      </div>
    </section>
  );
}

window.DeepDives = DeepDives;
