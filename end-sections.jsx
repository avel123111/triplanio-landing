/* global React, Icon, TriplanioMark, LangDropdown */
const { useState: useState3 } = React;
const APP_URL_3 = "https://app.triplanio.com";

/* =========================================================
   Section 6 — Trust strip
========================================================= */
function Trust() {
  const items = [
    { icon: "globe", t: "Available in English, Русский, Español" },
    { icon: "devices", t: "Works on any device — no app to install" },
    { icon: "lock", t: "Private by default — your trip is yours" },
    { icon: "gift", t: "Free to start, forever" },
  ];
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="trust reveal" style={{ border: "1px solid var(--line)", borderRadius: 16 }}>
          {items.map((it) => (
            <div className="trust__item" key={it.t}>
              <span className="icon"><Icon name={it.icon} size={18} /></span>
              <span>{it.t}</span>
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
const FAQS = [
  {
    q: "Is Triplanio free?",
    a: "Yes. You can plan a trip end-to-end without paying. Some advanced features — like the AI trip planner and AI voucher parsing — are part of an optional Pro plan.",
  },
  {
    q: "Can I invite people who don't have an account?",
    a: "Yes. Add them as offline participants while you plan; when you're ready, send them an invite and they can join in one click.",
  },
  {
    q: "What languages does Triplanio support?",
    a: "English, Russian and Spanish — switch any time in the header.",
  },
  {
    q: "How does the AI work?",
    a: "It generates draft itineraries from your description and helps fill in booking details from your vouchers. Everything is editable — AI is a starting point, not a black box.",
  },
  {
    q: "Can I track shared expenses?",
    a: "Yes. The budget engine supports multi-currency expenses, custom categories and split-by-shares between trip members.",
  },
  {
    q: "Will my data stay private?",
    a: "Yes. Your trips are visible only to you and the people you invite. Public share links exist only when you generate one.",
  },
  {
    q: "Do I need to install an app?",
    a: "No. Triplanio runs in any modern browser, on phone, tablet and desktop.",
  },
];

function FAQ() {
  const [open, setOpen] = useState3(null);
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="faq">
          <div className="faq__intro reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked.</h2>
            <p>Short answers to the things people always want to know first. Anything else — write to us inside the app.</p>
          </div>

          <div className="faq__list reveal">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={f.q}>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="plus"><Icon name="plus" size={16} strokeWidth={2.2} /></span>
                  </button>
                  <div className="faq__a">
                    <div className="faq__a-inner">{f.a}</div>
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
  return (
    <section className="banner">
      <div className="reveal" style={{ position: "relative", zIndex: 1 }}>
        <h2>Your next trip deserves better than 12 browser tabs.</h2>
        <p>Start planning in under a minute. Free, no card required.</p>
        <a className="btn btn--white btn--lg" href={APP_URL_3}>
          Start Planning <Icon name="arrowRight" size={16} className="chev" />
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   Section 9 — Footer
========================================================= */
function Footer({ lang, setLang }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="brand" aria-label="Triplanio — home" style={{ color: "var(--ink)" }}>
              <span className="brand__mark"><TriplanioMark size={26} /></span>
              <span>Triplanio</span>
            </a>
            <p className="tagline">Plan, share, travel.</p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how">How it works</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer__col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <LangDropdown value={lang} onChange={setLang} direction="up" />
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Triplanio</span>
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
