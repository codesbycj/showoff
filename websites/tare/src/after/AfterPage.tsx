import { useEffect, useRef, useState } from 'react';

import { BRAND, CTA, FOOTER, HERO, NAV, SERVICES, STEPS, USPS, WHO, WHY } from '@/content/site';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { useRise } from '@/motion/useRise';

/**
 * The after: a rebuild of the reference's home page, section for section, at
 * its measurements (rule 0). Only the words are mine.
 *
 *   nav      y0     h72    white, in flow
 *   hero     y72    h733   label, a 128px headline, a 36px sub, body,
 *                          two buttons; a mint panel with the Tax Man at x1100
 *   usps     y805   h189   three cream chips
 *   who      y994   h3722  pinned; six cards dealt onto a 128px heading
 *   services y4716  h858   forest; heading left, body right, six icon cards
 *   why      y5575  h725   forest; heading, four cards
 *   steps    y6299  4 x h900, grounds alternating cream / mint / pink
 *   cta      y9899  h668   mint; a 128px line and one button
 *   footer   y10567        forest; a printed receipt
 */
export function AfterPage() {
  const root = useRise<HTMLDivElement>();

  return (
    <div className="bg-white" ref={root} id="top">
      <Nav />
      <Hero />
      <Usps />
      <Who />
      <Services />
      <Why />
      <Steps />
      <Closing />
      <Footer />
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={[
        't-18 block leading-[0.84] tracking-[0.02em]',
        dark ? 'text-cream' : 'text-forest',
      ].join(' ')}
      style={{ fontSize: 22 }}
    >
      {BRAND.line1}
      <br />
      {BRAND.line2}
    </span>
  );
}

function Nav() {
  return (
    <header className="bg-white">
      <nav className="u flex h-[72px] items-center justify-between gap-6" aria-label="Primary">
        <a
          className="focus-visible:outline-forest focus-visible:outline-2 focus-visible:outline-offset-4"
          href="#top"
        >
          <Logo />
        </a>
        <ul className="m-0 hidden list-none gap-10 p-0 md:flex">
          {NAV.links.map((l) => (
            <li key={l}>
              <a className="t-15 hover:text-forest/60 transition-colors" href="#top">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            className="btn border-forest hover:bg-forest hover:text-cream hidden border sm:inline-flex"
            href="#cta"
          >
            {NAV.secondary}
          </a>
          <a className="btn bg-forest text-cream hover:bg-forest/85" href="#cta">
            {NAV.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}

/* --------------------------------------------------------------------- hero */

/**
 * The page's one real idea, and the thing worth rebuilding carefully: the Tax
 * Man is **thirteen drawings and a click**.
 *
 * He starts as himself, and every click puts him in another disguise — a paper
 * bag, a clock face, a traffic cone, arrows through the head, a moustache and
 * glasses. The label beside him is hand-lettered and says so. Nothing else on
 * the page moves, which is exactly why this lands: it is the only interactive
 * thing in the design and it is a joke rather than a feature.
 *
 * Rebuilt as a button, not a div with an onClick, so it is reachable by
 * keyboard and announces itself. The drawings are cross-faded over 0.14s —
 * quick enough to flick, slow enough not to read as a glitch.
 */
function Hero() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const next = () => setI((v) => (v + 1) % HERO.mugs.length);

  /* 733px tall, so the three promise chips land at y805 as they do in the reference. */
  return (
    <section className="relative min-h-[733px] bg-white pb-[64px] pt-[48px]">
      {/*
       * The panel is positioned, not a grid column. In the reference the
       * headline runs the **full 1216px measure** and the mint panel sits
       * behind its right-hand end — which is why "TAX MAN TOGETHER" can be two
       * words wide and still clear the drawing. Built as a two-column grid the
       * headline loses a third of its measure and breaks to three lines.
       */}
      <div className="u relative">
        <p className="t-18 bg-mint-pale rise m-0 inline-block px-[10px] py-[6px]">{HERO.label}</p>
        <h1 className="t-128 rise mb-0 mt-[20px] max-w-[1216px]">{HERO.heading}</h1>
        <p className="t-36 rise mb-0 mt-[30px]">{HERO.sub}</p>
        <p className="t-15 rise mb-0 mt-[26px] max-w-[560px]">{HERO.body}</p>
        <div className="rise mt-[32px] flex flex-wrap gap-3">
          <a className="btn bg-forest text-cream hover:bg-forest/85" href="#cta">
            {HERO.primary}
            <span aria-hidden="true">›</span>
          </a>
          <a className="btn border-forest hover:bg-forest hover:text-cream border" href="#cta">
            {HERO.secondary}
            <span aria-hidden="true">›</span>
          </a>
        </div>

        {/*
         * Measured off the capture: the panel is 384x430 with its right edge on
         * the container's, and the drawing is 298 wide sitting 63px above the
         * panel's top so his head breaks out of it. The overhang is the whole
         * composition — inside the box he is an illustration, out of it he is
         * looking at you.
         */}
        <div className="bg-mint-pale pointer-events-none absolute right-0 top-[200px] hidden h-[430px] w-[384px] lg:block" />

        <div className="absolute right-[42px] top-[137px] hidden items-start lg:flex">
          <img className="mr-[10px] mt-[128px] w-[112px]" src={HERO.clickLabel} alt="" />
          <button
            className="focus-visible:outline-forest pointer-events-auto relative block w-[298px] focus-visible:outline-2 focus-visible:outline-offset-4"
            type="button"
            onClick={next}
            aria-label={`Change the tax man’s disguise (${i + 1} of ${HERO.mugs.length})`}
            style={{ cursor: `url("${HERO.hand}") 16 4, pointer` }}
          >
            {HERO.mugs.map((m, n) => (
              <img
                className={['mug w-full', n === 0 ? 'block' : 'absolute inset-0'].join(' ')}
                key={m}
                src={m}
                alt=""
                aria-hidden="true"
                style={{ opacity: n === i ? 1 : 0, transition: reduced ? 'none' : undefined }}
              />
            ))}
          </button>
        </div>
      </div>
    </section>
  );
}

/** The ring-and-tick that marks each of the three promises. */
function Tick() {
  return (
    <svg
      className="shrink-0"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="7.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m5 8.7 2.6 2.6L12 6.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Usps() {
  return (
    <section className="bg-white pb-[48px]">
      <ul className="u m-0 grid list-none gap-4 p-0 md:grid-cols-3">
        {USPS.map((u) => (
          <li
            className="bg-cream rise t-18 flex items-center gap-3 rounded-[2px] px-6 py-5"
            key={u}
          >
            <Tick />
            {u}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------------- who */

/**
 * Six cards dealt onto a 128px heading while the section is pinned.
 *
 * The reference pins for 3,722px — four screens — and brings one card in per
 * screen, each slightly rotated and offset so they pile like dealt paper. The
 * heading never leaves, so the cards cover it as they land, which is the whole
 * effect: the question "who it's for" is buried by its own answers.
 */
function Who() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Reduced motion is derived below, not stored: writing it from the effect
    // body is a cascading render.
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const read = () => {
      const r = el.getBoundingClientRect();
      const distance = r.height - window.innerHeight;
      setP(distance > 0 ? Math.min(1, Math.max(0, -r.top / distance)) : 0);
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [reduced]);

  const n = WHO.cards.length;
  /* With motion reduced every card is simply already in its slot. */
  const progress = reduced ? 1 : p;

  return (
    <div className="relative" ref={wrapRef} style={{ height: '420vh' }}>
      <section className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-white">
        <p className="t-18 m-0">{WHO.label}</p>
        <h2 className="t-128 mb-0 mt-[20px] text-center">{WHO.heading}</h2>
        <p className="t-18 mb-0 mt-[24px]">{WHO.sub}</p>

        <div className="pointer-events-none absolute inset-0">
          {WHO.cards.map((card, idx) => {
            /* Each card owns a slice of the pin and slides up into its slot. */
            const start = idx / n;
            const t = Math.min(1, Math.max(0, (progress - start) * n * 1.6));
            const rot = (idx - (n - 1) / 2) * 3.2;
            const x = (idx - (n - 1) / 2) * 118;
            return (
              <article
                className="absolute left-1/2 top-1/2 w-[223px] rounded-[2px] p-[22px]"
                key={card.title}
                style={{
                  background: card.tint,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${(1 - t) * 70}vh)) rotate(${rot}deg)`,
                  opacity: t > 0 ? 1 : 0,
                  zIndex: idx,
                }}
              >
                <h3 className="t-36 m-0">{card.title}</h3>
                <p className="t-15 mb-0 mt-[16px]">{card.body}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------- services */

function Services() {
  return (
    <section className="bg-forest text-cream py-[130px]">
      <div className="u grid gap-10 lg:grid-cols-[587px_1fr]">
        <div>
          <p className="t-18 rise border-cream/60 m-0 inline-block border px-[10px] py-[6px]">
            {SERVICES.label}
          </p>
          <h2 className="t-48 rise mb-0 mt-[24px]">{SERVICES.heading}</h2>
          <p className="t-18 rise mb-0 mt-[20px]">{SERVICES.sub}</p>
        </div>
        <p className="t-15 rise m-0 self-end">{SERVICES.body}</p>
      </div>

      {/*
       * Six cards in a row wider than the page, clipped by the viewport — the
       * reference scrolls them. The sixth is cut by the right edge, which is
       * the tell that the row continues.
       */}
      <div className="mt-[64px] w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="m-0 flex w-max list-none gap-[26px] px-[112px] py-0">
          {SERVICES.items.map((s) => (
            <li className="w-[318px] shrink-0 border border-white/15 p-[28px]" key={s.title}>
              <img className="size-[114px]" src={s.icon} alt="" />
              <h3 className="t-24 mb-0 mt-[24px]">{s.title}</h3>
              <p className="t-15 mb-0 mt-[12px] text-white/75">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="bg-forest text-cream pb-[130px]">
      <div className="u text-center">
        <p className="t-18 rise text-forest m-0 inline-block bg-white px-[10px] py-[6px]">
          {WHY.label}
        </p>
        <h2 className="t-48 rise mb-0 mt-[24px]">{WHY.heading}</h2>
        <p className="t-18 text-mint rise mb-0 mt-[20px]">{WHY.sub}</p>
        <div className="rise mt-[32px]">
          <a
            className="btn border-mint text-mint hover:bg-mint hover:text-forest border"
            href="#cta"
          >
            {WHY.cta}
            <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>

      <ul className="u m-0 mt-[64px] grid list-none gap-[26px] p-0 md:grid-cols-2 lg:grid-cols-4">
        {WHY.items.map((w) => (
          <li className="border-mint/55 rise border p-[24px] text-center" key={w.title}>
            <h3 className="t-24 text-mint m-0">{w.title}</h3>
            <p className="t-15 mb-0 mt-[12px] text-white/80">{w.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------- steps */

function Steps() {
  return (
    <>
      {STEPS.map((s) => (
        <section
          className="flex min-h-[900px] items-center"
          key={s.n}
          style={{ background: s.tint }}
        >
          <div className="u grid items-center gap-10 lg:grid-cols-[1fr_486px]">
            <div>
              <p className="t-18 rise m-0">{s.n}</p>
              <h2 className="t-72 rise mb-0 mt-[24px]">{s.title}</h2>
              <p className="t-18 rise mb-0 mt-[22px] max-w-[600px]">{s.sub}</p>
              <p className="t-15 rise mb-0 mt-[80px] max-w-[500px]">{s.body}</p>
            </div>
            <img
              className="rise w-full max-w-[486px] justify-self-end"
              src={s.art}
              alt=""
              loading="lazy"
            />
          </div>
        </section>
      ))}
    </>
  );
}

function Closing() {
  return (
    <section className="bg-mint py-[130px] text-center" id="cta">
      <div className="u">
        <h2 className="t-128 rise mx-auto mb-0 mt-0 max-w-[857px]">{CTA.heading}</h2>
        <p className="t-18 rise mb-0 mt-[28px]">{CTA.sub}</p>
        <div className="rise mt-[36px]">
          <a className="btn bg-forest text-cream hover:bg-forest/85" href="#cta">
            {CTA.button}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- footer */

/**
 * The footer is a **printed receipt** — a white docket on the forest ground,
 * with a zigzag torn edge, the sitemap set as line items, and two totals at
 * the bottom.
 *
 * The torn edge is a CSS mask of repeating triangles rather than an image, so
 * it stays sharp at any width and takes the paper's own colour. The whole
 * thing is the reference's one joke about being an accountant, and it is the
 * part of the page people remember.
 */
function Footer() {
  const zig =
    'linear-gradient(135deg, #000 25%, transparent 25%) -10px 0/20px 20px repeat-x, linear-gradient(225deg, #000 25%, transparent 25%) -10px 0/20px 20px repeat-x';

  return (
    <footer className="bg-forest px-5 pb-[48px] pt-[100px]">
      <div className="mx-auto w-full max-w-[640px]">
        <div className="relative bg-white px-[40px] pb-[40px] pt-[44px] text-black">
          <div className="flex items-start justify-between gap-6">
            <Logo />
            <p className="t-24 m-0 max-w-[248px] text-right">{FOOTER.tagline}</p>
          </div>

          <div className="mt-[36px] grid gap-8 sm:grid-cols-3">
            {FOOTER.columns.map((col) => (
              <div key={col.title}>
                <p className="t-18 m-0">{col.title}</p>
                <ul className="m-0 mt-[10px] list-none p-0">
                  {col.links.map((l) => (
                    <li key={l} className="py-[2px]">
                      <a className="t-14 hover:underline" href="#top">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="t-18 mb-0 mt-[40px] border-t border-dashed border-black/35 pt-[22px] text-center">
            {FOOTER.stamp}
          </p>

          <dl className="m-0 mt-[18px]">
            {FOOTER.totals.map((t) => (
              <div className="flex justify-between gap-4 py-[3px]" key={t.label}>
                <dt className="t-18 m-0">{t.label}</dt>
                <dd className="t-18 m-0">{t.value}</dd>
              </div>
            ))}
          </dl>

          <p className="t-14 mb-0 mt-[26px] text-center text-black/55">{FOOTER.legal}</p>
          <p className="t-14 mb-0 mt-[8px] text-center text-black/55">{FOOTER.copy}</p>

          {/* The torn edge: a mask, not a picture, so it is sharp at any width. */}
          <div
            className="absolute inset-x-0 bottom-[-18px] h-[20px] bg-white"
            aria-hidden="true"
            style={{ WebkitMaskImage: zig, maskImage: zig }}
          />
        </div>
      </div>
    </footer>
  );
}
