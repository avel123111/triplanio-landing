/* global React, Icon, useT */
const APP_URL_2 = "https://app.triplanio.com";

/* =========================================================
   Section 2 — Problem
========================================================= */
function Problem() {
  const t = useT();
  return (
    <section className="section section--wash">
      <div className="container">
        <div className="problem reveal">
          <div>
            <span className="eyebrow">{t("problem.eyebrow")}</span>
            <h2 style={{ marginTop: 16 }}>
              {t("problem.h2_a")}<br />{t("problem.h2_b")}
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>{t("problem.lede")}</p>
          </div>

          <div className="collage" aria-hidden="true">
            <div className="collage__card collage__card--mail">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#ea4335" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  {t("problem.inbox")}
                </span>
              </div>
              <div className="mailrow">
                <span className="avatar">B</span>
                <div className="lines">
                  <div className="from">{t("problem.mail1_from")}</div>
                  <div className="subj">{t("problem.mail1_subj")}</div>
                </div>
              </div>
              <div className="mailrow">
                <span className="avatar">BA</span>
                <div className="lines">
                  <div className="from">{t("problem.mail2_from")}</div>
                  <div className="subj">{t("problem.mail2_subj")}</div>
                </div>
              </div>
              <div className="mailrow">
                <span className="avatar">CP</span>
                <div className="lines">
                  <div className="from">{t("problem.mail3_from")}</div>
                  <div className="subj">{t("problem.mail3_subj")}</div>
                </div>
              </div>
            </div>

            <div className="collage__card collage__card--notes">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{t("problem.notes_title")}</div>
              <div style={{ color: "#7c6b3a", lineHeight: 1.6 }}
                   dangerouslySetInnerHTML={{ __html: t("problem.notes_body_html") }} />
            </div>

            <div className="collage__card collage__card--tabs">
              <div className="tabstrip">
                <span className="t">{t("problem.tab1")}</span>
                <span className="t">{t("problem.tab2")}</span>
                <span className="t">{t("problem.tab3")}</span>
                <span className="t">{t("problem.tab4")}</span>
              </div>
              <div className="tabsbody">{t("problem.tabs_body")}</div>
            </div>
          </div>
        </div>

        <p className="problem__handoff reveal">{t("problem.handoff")}</p>
      </div>
    </section>
  );
}

/* =========================================================
   Section 3 — Features grid
========================================================= */
const FEATURES = [
  { icon: "timeline", titleKey: "f.timeline.title",  bodyKey: "f.timeline.body" },
  { icon: "users",    titleKey: "f.together.title",  bodyKey: "f.together.body" },
  { icon: "sparkles", titleKey: "f.ai.title",        bodyKey: "f.ai.body", warm: true },
  /* AI concierge — paper plane icon (Telegram-style), as requested. */
  { icon: "telegram", titleKey: "f.concierge.title", bodyKey: "f.concierge.body" },
  { icon: "wallet",   titleKey: "f.budget.title",    bodyKey: "f.budget.body", wide: true },
];

function FeatureCard({ f }) {
  const t = useT();
  return (
    <article className={`card reveal ${f.wide ? "card--wide" : ""}`}>
      <div>
        <span className={`card__icon ${f.warm ? "card__icon--warm" : ""}`}>
          <Icon name={f.icon} size={22} />
        </span>
        <h3>{t(f.titleKey)}</h3>
        <p>{t(f.bodyKey)}</p>
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
  const t = useT();
  const rows = [
    { k: "mini.hotels",     pct: 42, amt: "€2,025", ccy: "$2,190", color: "#2167e2" },
    { k: "mini.flights",    pct: 28, amt: "€1,350", ccy: "$1,460", color: "#5b8fff" },
    { k: "mini.activities", pct: 18, amt: "€868",   ccy: "$938",   color: "#c9603a" },
    { k: "mini.food",       pct: 12, amt: "€577",   ccy: "$624",   color: "#1f8a5b" },
  ];
  return (
    <div className="budget" style={{ padding: 0 }}>
      <div className="budget__total" style={{ marginBottom: 12 }}>
        <span className="big" style={{ fontSize: 26 }}>€4,820</span>
        <span className="delta">{t("mini.under")}</span>
      </div>
      <div className="budget__bar" style={{ marginBottom: 12 }}>
        {rows.map((r) => <i key={r.k} style={{ width: `${r.pct}%`, background: r.color }} />)}
      </div>
      <div className="budget__rows">
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

function Features() {
  const t = useT();
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">{t("features.eyebrow")}</span>
          <h2>{t("features.h2")}</h2>
          <p className="lede" style={{ margin: "14px auto 0" }}>{t("features.lede")}</p>
        </div>

        <div className="features">
          {FEATURES.map((f) => <FeatureCard f={f} key={f.titleKey} />)}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Section 4 — How it works
========================================================= */
function StepThumb({ kind }) {
  const t = useT();
  if (kind === "create") {
    return (
      <div className="step__thumb" aria-hidden="true">
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
          {t("thumb.new_trip")}
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12, color: "var(--ink)" }}>
            <span style={{ color: "var(--muted)", marginRight: 8 }}>{t("thumb.where")}</span>
            {t("city.lisbon")} · {t("city.porto")} · {t("city.barcelona")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12 }}>
              <span style={{ color: "var(--muted)", marginRight: 6 }}>{t("thumb.from")}</span> {t("thumb.from_date")}
            </div>
            <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12 }}>
              <span style={{ color: "var(--muted)", marginRight: 6 }}>{t("thumb.to")}</span> {t("thumb.to_date")}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, fontSize: 11.5 }}>
            <span style={{ background: "rgba(33,103,226,.08)", color: "var(--brand)", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>{t("thumb.organizer")}</span>
            <span style={{ background: "var(--wash)", color: "var(--muted)", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>{t("thumb.travelers")}</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "ai") {
    const results = ["thumb.ai_result_1", "thumb.ai_result_2", "thumb.ai_result_3"];
    return (
      <div className="step__thumb" aria-hidden="true">
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
          {t("thumb.ai_planner")}
        </div>
        <div style={{ background: "var(--wash)", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
          {t("thumb.ai_prompt")}
        </div>
        <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
          {results.map((k) => (
            <div key={k} style={{
              fontSize: 12, padding: "8px 10px",
              background: "#fff", border: "1px solid var(--line)", borderRadius: 8,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }} />
              {t(k)}
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
        {t("thumb.day_of_travel")}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand), #5b8fff)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>AI</span>
          <div style={{ background: "#eef2f9", padding: "8px 10px", borderRadius: 10, borderBottomLeftRadius: 4 }}>
            {t("thumb.cancel_msg")}
          </div>
        </div>
        <div style={{ alignSelf: "flex-end", background: "var(--brand)", color: "#fff", padding: "8px 10px", borderRadius: 10, borderBottomRightRadius: 4, fontSize: 12, maxWidth: "80%" }}>
          {t("thumb.confirm")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--muted)" }}>
          <span style={{ width: 6, height: 6, borderRadius: 50, background: "var(--success)" }} />
          {t("thumb.confirmed")}
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const t = useT();
  const steps = [
    { num: "1", kind: "create", titleKey: "how.s1.title", bodyKey: "how.s1.body" },
    { num: "2", kind: "ai",     titleKey: "how.s2.title", bodyKey: "how.s2.body" },
    { num: "3", kind: "travel", titleKey: "how.s3.title", bodyKey: "how.s3.body" },
  ];
  return (
    <section className="section" id="how">
      <div className="container">
        <div className="section__head reveal" style={{ marginBottom: 64 }}>
          <span className="eyebrow">{t("how.eyebrow")}</span>
          <h2>{t("how.h2")}</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" key={s.num} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="step__num">{s.num}</span>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.bodyKey)}</p>
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
