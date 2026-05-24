/* global React, Icon, TriplanioMark, LangDropdown, useT */
const { useState: useState3 } = React;
const APP_URL_3 = "https://app.triplanio.com";

/* =========================================================
   Section 6 — Trust strip
========================================================= */
function Trust() {
  const t = useT();
  const items = [
    { icon: "globe",   key: "trust.languages" },
    { icon: "devices", key: "trust.devices" },
    { icon: "lock",    key: "trust.privacy" },
    { icon: "gift",    key: "trust.free" },
  ];
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="trust reveal" style={{ border: "1px solid var(--line)", borderRadius: 16 }}>
          {items.map((it) => (
            <div className="trust__item" key={it.key}>
              <span className="icon"><Icon name={it.icon} size={18} /></span>
              <span>{t(it.key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Section 7 — FAQ
========================================================= */
const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
];

function FAQ() {
  const t = useT();
  const [open, setOpen] = useState3(null);
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="faq">
          <div className="faq__intro reveal">
            <span className="eyebrow">{t("faq.eyebrow")}</span>
            <h2>{t("faq.h2")}</h2>
            <p>{t("faq.lede")}</p>
          </div>

          <div className="faq__list reveal">
            {FAQ_KEYS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={f.q}>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{t(f.q)}</span>
                    <span className="plus"><Icon name="plus" size={16} strokeWidth={2.2} /></span>
                  </button>
                  <div className="faq__a">
                    <div className="faq__a-inner">{t(f.a)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Section 8 — Final CTA banner
========================================================= */
function FinalCTA() {
  const t = useT();
  return (
    <section className="banner">
      <div className="reveal" style={{ position: "relative", zIndex: 1 }}>
        <h2>{t("finalcta.h2")}</h2>
        <p>{t("finalcta.lede")}</p>
        <a className="btn btn--white btn--lg" href={APP_URL_3}>
          {t("finalcta.cta")} <Icon name="arrowRight" size={16} className="chev" />
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   Section 9 — Footer
========================================================= */
function Footer({ lang, setLang }) {
  const t = useT();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="brand" aria-label="Triplanio — home" style={{ color: "var(--ink)" }}>
              <span className="brand__mark"><TriplanioMark size={26} /></span>
              <span>Triplanio</span>
            </a>
            <p className="tagline">{t("footer.tagline")}</p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>{t("footer.product")}</h4>
              <a href="#features">{t("footer.features")}</a>
              <a href="#how">{t("footer.how")}</a>
              <a href="#faq">{t("footer.faq")}</a>
            </div>
            <div className="footer__col">
              <h4>{t("footer.company")}</h4>
              <a href="#">{t("footer.about")}</a>
              <a href="#">{t("footer.contact")}</a>
            </div>
            <div className="footer__col">
              <h4>{t("footer.legal")}</h4>
              <a href="privacy.html">{t("footer.privacy")}</a>
              <a href="terms.html">{t("footer.terms")}</a>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <LangDropdown value={lang} onChange={setLang} direction="up" />
          </div>
        </div>

        <div className="footer__bottom">
          <span>{t("footer.copy")}</span>
          <div className="footer__social" aria-label="Social">
            <a href="#" aria-label="Twitter / X"><Icon name="twitter" size={16} /></a>
            <a href="#" aria-label="Instagram"><Icon name="instagram" size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Trust = Trust;
window.FAQ = FAQ;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
