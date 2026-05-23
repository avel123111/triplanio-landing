/* global React, ReactDOM, Header, Hero, Problem, Features, HowItWorks, DeepDives, Trust, FAQ, FinalCTA, Footer,
          TweaksPanel, TweakSection, TweakRadio, TweakSelect, useTweaks */
const { useState: useStateRoot, useEffect: useEffectRoot } = React;

/* Defaults are persisted by the host between EDITMODE markers.
   They live in index.html as window.TWEAK_DEFAULTS. */
const DEFAULTS = window.TWEAK_DEFAULTS || { palette: "atlantic", type: "modern", density: "standard" };

function useScrollReveal() {
  useEffectRoot(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    let raf = 0;
    const reveal = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        /* Reveal once the element's top crosses 90% of the viewport (i.e. ~10%
           of the element is on-screen). Generous so nothing gets stuck hidden. */
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
      });
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(reveal);
    };
    reveal();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
  const [lang, setLang] = useStateRoot("EN");
  const [t, setTweak] = useTweaks(DEFAULTS);

  /* Push tweaks onto <html> as data-attrs so the stylesheet swaps tokens. */
  useEffectRoot(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
    document.documentElement.setAttribute("data-type", t.type);
    document.documentElement.setAttribute("data-density", t.density);
  }, [t.palette, t.type, t.density]);

  useFontLoader(t.type);
  useScrollReveal();

  return (
    <>
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
