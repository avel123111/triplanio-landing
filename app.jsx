/* global React, ReactDOM, Header, Hero, Problem, Features, HowItWorks, DeepDives, Trust, FAQ, FinalCTA, Footer,
          TweaksPanel, TweakSection, TweakRadio, TweakSelect, useTweaks, LangContext */
const { useState: useStateRoot, useEffect: useEffectRoot } = React;

const LANG_STORAGE_KEY = "triplanio.lang";
const SUPPORTED_LANGS = ["EN", "RU", "ES"];

function detectInitialLang() {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
  } catch (_) { /* localStorage may be unavailable in some embeds */ }
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (nav === "ru") return "RU";
  if (nav === "es") return "ES";
  return "EN";
}

/* Defaults are persisted by the host between EDITMODE markers.
   They live in index.html as window.TWEAK_DEFAULTS. */
const DEFAULTS = window.TWEAK_DEFAULTS || { palette: "atlantic", type: "modern", density: "standard" };

function useScrollReveal() {
  useEffectRoot(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Probe: is this document's animation timeline actually advancing?
       Some embed iframes freeze it, and we'd hide content that never reveals.
       If the timeline is paused, leave reveals fully visible. */
    let timelineLive = false;
    const t0 = document.timeline?.currentTime ?? 0;
    requestAnimationFrame(() => {
      const t1 = document.timeline?.currentTime ?? 0;
      timelineLive = t1 > t0;
      if (!timelineLive) return;

      document.documentElement.classList.add("reveal--ready");

      const reveal = () => {
        const vh = window.innerHeight;
        document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
        });
      };
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => { raf = 0; reveal(); });
      };
      reveal();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    });
  }, []);
}

/* Lazy-load Google fonts for the editorial / tech personalities so the
   metric-swap is honest when the user picks them. */
function useFontLoader(type) {
  useEffectRoot(() => {
    if (type === "editorial" && !document.getElementById("font-editorial")) {
      const l = document.createElement("link");
      l.id = "font-editorial";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";
      document.head.appendChild(l);
    }
    if (type === "tech" && !document.getElementById("font-tech")) {
      const l = document.createElement("link");
      l.id = "font-tech";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap";
      document.head.appendChild(l);
    }
  }, [type]);
}

function App() {
  const [lang, setLangRaw] = useStateRoot(detectInitialLang);
  const [t, setTweak] = useTweaks(DEFAULTS);

  const setLang = (next) => {
    setLangRaw(next);
    try { window.localStorage.setItem(LANG_STORAGE_KEY, next); } catch (_) {}
  };

  /* Push tweaks onto <html> as data-attrs so the stylesheet swaps tokens. */
  useEffectRoot(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
    document.documentElement.setAttribute("data-type", t.type);
    document.documentElement.setAttribute("data-density", t.density);
  }, [t.palette, t.type, t.density]);

  /* Reflect current lang on <html lang="..."> for a11y / SEO. */
  useEffectRoot(() => {
    const map = { EN: "en", RU: "ru", ES: "es" };
    document.documentElement.setAttribute("lang", map[lang] || "en");
  }, [lang]);

  useFontLoader(t.type);
  useScrollReveal();

  return (
    <LangContext.Provider value={lang}>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <DeepDives />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer lang={lang} setLang={setLang} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakSelect
          label="Mood"
          value={t.palette}
          options={[
            { value: "atlantic",  label: "Atlantic — confident blue" },
            { value: "sunset",    label: "Sunset — warm coral" },
            { value: "forest",    label: "Forest — green ink" },
            { value: "editorial", label: "Editorial — graphite & paper" },
          ]}
          onChange={(v) => setTweak("palette", v)}
        />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Personality"
          value={t.type}
          options={[
            { value: "modern",    label: "Modern" },
            { value: "editorial", label: "Serif" },
            { value: "tech",      label: "Tech" },
          ]}
          onChange={(v) => setTweak("type", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
            { value: "spacious", label: "Spacious" },
            { value: "standard", label: "Standard" },
            { value: "compact",  label: "Compact" },
          ]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
