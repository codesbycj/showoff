import { useEffect, useRef, useState } from 'react';

import {
  BRAND,
  CREW,
  CTA,
  FOOTER,
  HERO,
  NAV,
  NEWS,
  PLATFORM,
  RAIL,
  RESULTS,
  STORIES,
  WHY,
} from '@/content/site';
import { useRise } from '@/motion/useRise';

/**
 * The after: a rebuild of the reference's home page, section for section, at
 * its measurements (rule 0). Only the words are mine.
 *
 *   hero       y0     h1174  ink; nav, badge, headline, sub, two buttons,
 *                            then a bone video panel that bleeds downward
 *   rail       y1174  h220   violet; a label pill and a scrolling logo row
 *   why        y1394  h844   white; heading at y1490, three cards at y1938
 *   results    y2238  h439   lime; heading left, a 2x2 stat grid from x732
 *   crew       y2678  h572   ink; label, headline, three lines, a button
 *   platform   y3250  h773   bone; a pill, one open module and three closed,
 *                            with a phone screenshot on the right
 *   stories    y4023  h963   white; a quote card and a photograph, two stats
 *   news       y5084  h~200  a scrolling row of six cards
 *   cta        y5196  h600   a lavender card beside a phone photograph
 *   footer     y5796  h807   ink; eight columns, an AI row, the big type
 *
 * The page is one measure wide — 1116px from x162 — and almost nothing is
 * full-bleed except the two scrolling rows and the section grounds. That is
 * what lets five background colours sit on top of each other without the page
 * coming apart.
 */
export function AfterPage() {
  const root = useRise<HTMLDivElement>();

  return (
    <div className="bg-bone text-ink font-sans" ref={root} id="top">
      <Hero />
      <Rail />
      <Why />
      <Results />
      <Crew />
      <Platform />
      <Stories />
      <News />
      <Cta />
      <Footer />
      <StickyChat />
    </div>
  );
}

/* --------------------------------------------------------------------- nav */

function Hero() {
  return (
    <section className="bg-ink text-bone relative">
      <nav className="u flex h-[76px] items-center justify-between gap-6" aria-label="Primary">
        <a
          className="t-28 font-display focus-visible:outline-lime -ml-1 lowercase focus-visible:outline-2 focus-visible:outline-offset-4"
          href="#top"
        >
          {BRAND.name}
        </a>
        <ul className="m-0 hidden list-none gap-9 p-0 lg:flex">
          {NAV.links.map((l) => (
            <li key={l}>
              {/* Four of the five carry a dropdown marker in the reference. */}
              <a
                className="t-16 hover:text-peri inline-flex items-center gap-2 transition-colors"
                href="#top"
              >
                {l}
                {l === 'Customers' ? null : (
                  <span className="text-white/45" aria-hidden="true">
                    +
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <a className="t-16 hover:text-peri hidden transition-colors sm:inline" href="#top">
            {NAV.login}
          </a>
          <a className="btn bg-bone text-ink hover:bg-peri" href="#cta">
            {NAV.cta}
          </a>
        </div>
      </nav>

      <div className="u pt-[84px] text-center">
        {/* The badge is a hairline pill with a dot, a label and a rating. */}
        <p className="rise m-0 mx-auto inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2">
          <span className="bg-peri size-[7px] shrink-0 rounded-full" aria-hidden="true" />
          <span className="t-14">{HERO.badge}</span>
          <span className="text-white/25" aria-hidden="true">
            |
          </span>
          <span className="t-14 tnum">★ {HERO.rating}</span>
        </p>

        <h1 className="t-72 rise mx-auto mb-0 mt-[44px] max-w-[880px] text-balance">
          {HERO.headlineLead} <span className="text-peri">{HERO.headlineAccent}</span>
        </h1>

        <p className="t-20 rise mx-auto mb-0 mt-[28px] max-w-[880px] text-white/80">{HERO.sub}</p>

        <div className="rise mt-[44px] flex flex-wrap justify-center gap-3">
          <a className="btn bg-bone text-ink hover:bg-peri" href="#cta">
            {HERO.primary}
          </a>
          <a className="btn text-bone border border-white/25 hover:bg-white/10" href="#platform">
            {HERO.secondary}
          </a>
        </div>
      </div>

      {/*
       * The product video, in a bone panel that starts inside the hero and is
       * clipped by the section below it. Muted, looping and `playsInline`, so
       * it behaves as a moving screenshot rather than as media.
       */}
      <div className="u pt-[64px]">
        <div className="bg-off relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-[12px]">
          <video
            className="size-full object-cover"
            src={HERO.video}
            autoPlay
            muted
            loop
            playsInline
            aria-label="A product walkthrough"
          />
        </div>
      </div>
      <div className="h-[80px]" />
    </section>
  );
}

/* -------------------------------------------------------------------- rail */

function Rail() {
  return (
    <section className="bg-violet py-[48px]" aria-label={RAIL.label}>
      <p className="t-14 text-bone mx-auto mb-[40px] w-fit rounded-full border border-white/25 px-4 py-2">
        {RAIL.label}
      </p>
      <div className="w-full overflow-hidden">
        <div
          className="flex w-max items-center"
          data-rail
          style={{ animation: 'mise-rail 40s linear infinite' }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="m-0 flex list-none items-center gap-[64px] p-0 pr-[64px]"
              aria-hidden={copy > 0 || undefined}
            >
              {RAIL.names.map((n) => (
                <li
                  key={n}
                  className="font-display text-bone/90 whitespace-nowrap text-[22px] font-semibold tracking-[-0.02em]"
                >
                  {n}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- why */

function Why() {
  return (
    <section className="bg-white py-[96px]">
      <div className="u">
        <h2 className="t-40 rise m-0 text-center">{WHY.heading}</h2>
        <ul className="m-0 mt-[92px] grid list-none gap-[48px] p-0 md:grid-cols-3">
          {WHY.cards.map((c) => (
            <li key={c.title} className="rise">
              <img className="h-[276px] w-full object-contain" src={c.icon} alt="" loading="lazy" />
              <h3 className="t-28 mb-0 mt-[36px]">{c.title}</h3>
              <p className="t-20 mb-0 mt-[20px]">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- results */

function Results() {
  return (
    <section className="bg-lime py-[80px]">
      {/*
       * This section does **not** use the page's 1116px measure. Its heading
       * starts at x48 and its stats at x732 and x1074 — a full-width grid with
       * a 48px gutter, which is why the lime band reads as wider than
       * everything above and below it even though the ground is the same width.
       */}
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-[48px] lg:grid-cols-[482px_1fr]">
        <div className="flex flex-col justify-between gap-10">
          <h2 className="t-40 rise m-0 max-w-[482px]">{RESULTS.heading}</h2>
          <div>
            <a className="btn bg-ink text-lime hover:bg-violet hover:text-bone" href="#cta">
              {RESULTS.cta}
            </a>
            <p className="t-14n mb-0 mt-4 text-black/55">{RESULTS.caveat}</p>
          </div>
        </div>

        {/* Four figures in a 2x2 grid, each over a hairline rule. */}
        <dl className="m-0 grid grid-cols-1 gap-x-[24px] gap-y-[40px] sm:grid-cols-2">
          {RESULTS.stats.map((s) => (
            <div className="rise border-t border-black/20 pt-[16px]" key={s.label}>
              <dt className="t-14 m-0">{s.label}</dt>
              <dd className="t-72 tnum m-0 mt-[8px]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- crew */

function Crew() {
  return (
    <section className="bg-ink text-bone py-[128px] text-center">
      <div className="u">
        <p className="t-14 rise m-0 text-white/70">{CREW.label}</p>
        <h2 className="t-40 rise mx-auto mb-0 mt-[32px] max-w-[760px] text-balance">
          {CREW.heading}
        </h2>
        <p className="t-20 rise mx-auto mb-0 mt-[36px] max-w-[860px] text-white/80">{CREW.body}</p>
        <div className="rise mt-[56px]">
          <a className="btn border border-white/25 hover:bg-white/10" href="#platform">
            {CREW.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- platform */

/**
 * One module open and three closed, with the open one's phone screenshot
 * beside it. The closed items are set in the **same 48px** as the open one and
 * only the colour changes — `#140018` against `#796f7b` — which is why the
 * list reads as a stack of headings rather than as a menu.
 */
function Platform() {
  const [active, setActive] = useState(PLATFORM.items[0].id);
  const open = PLATFORM.items.find((i) => i.id === active) ?? PLATFORM.items[0];

  return (
    <section className="bg-bone py-[96px]" id="platform">
      <div className="u">
        <p className="t-14 mb-[48px] w-fit rounded-full border border-black/15 px-4 py-2">
          {PLATFORM.label}
        </p>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {PLATFORM.items.map((item) =>
              item.id === active ? (
                <div key={item.id}>
                  <h2 className="t-list m-0">{item.title}</h2>
                  {item.lines.map((line) => (
                    <p className="t-20 mb-0 mt-[14px] max-w-[640px]" key={line}>
                      {line}
                    </p>
                  ))}
                  <a
                    className="t-16 mt-[26px] inline-flex items-center gap-2 underline underline-offset-4"
                    href="#platform"
                  >
                    {item.link}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              ) : (
                <button
                  className="t-list text-mute hover:text-ink focus-visible:outline-ink mt-[34px] block text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                >
                  {item.title}
                </button>
              ),
            )}
          </div>

          <div className="hidden lg:block">
            <img
              className="w-[300px] rounded-[28px]"
              key={open.id}
              src={open.phone}
              alt={`${open.title} on a phone`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- stories */

function Stories() {
  const [i, setI] = useState(0);
  const item = STORIES.items[i];
  const n = STORIES.items.length;

  return (
    <section className="bg-white py-[96px]">
      <div className="u">
        <div className="flex items-center justify-between gap-4">
          <p className="t-14 m-0 rounded-full border border-black/15 px-4 py-2">{STORIES.label}</p>
          <div className="flex gap-2">
            {(['prev', 'next'] as const).map((d) => (
              <button
                className="focus-visible:outline-ink grid size-[36px] place-items-center rounded-full border border-black/20 transition-colors hover:border-black focus-visible:outline-2 focus-visible:outline-offset-2"
                key={d}
                type="button"
                aria-label={d === 'prev' ? 'Previous story' : 'Next story'}
                onClick={() => setI((v) => (v + (d === 'next' ? 1 : -1) + n) % n)}
              >
                {d === 'prev' ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[60px] grid gap-[24px] lg:grid-cols-2">
          <div className="bg-off flex flex-col rounded-[12px] p-[40px]">
            <blockquote className="m-0">
              <p className="t-28 m-0">{item.quote}</p>
              <cite className="t-14n mt-[36px] block not-italic text-black/60">{item.cite}</cite>
            </blockquote>

            <dl className="m-0 mt-auto grid grid-cols-2 gap-[24px] pt-[80px]">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <dt className="t-14 m-0 text-black/60">{s.label}</dt>
                  <dd className="t-48 tnum m-0 mt-[8px]">{s.value}</dd>
                </div>
              ))}
            </dl>

            <a
              className="t-16 mt-[28px] inline-flex items-center gap-2 underline underline-offset-4"
              href="#top"
            >
              {item.link}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <img
            className="h-[500px] w-full rounded-[12px] object-cover"
            src={item.image}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- news */

function News() {
  return (
    <section className="bg-white pb-[64px]">
      <h2 className="u t-16 m-0 mb-[24px]">{NEWS.heading}</h2>
      <div className="w-full overflow-hidden">
        <div
          className="flex w-max"
          data-rail
          style={{ animation: 'mise-rail 48s linear infinite' }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="m-0 flex list-none gap-[16px] p-0 pr-[16px]"
              aria-hidden={copy > 0 || undefined}
            >
              {NEWS.items.map((item) => (
                <li
                  className="flex w-[256px] shrink-0 items-center gap-3 rounded-[10px] border border-black/10 p-3"
                  key={item.text}
                >
                  <img
                    className="size-[44px] shrink-0 rounded-[6px] object-cover"
                    src={item.img}
                    alt=""
                    loading="lazy"
                  />
                  <span>
                    <span className="t-14 block">{item.kind}</span>
                    <span className="t-14n block text-black/60">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- cta */

function Cta() {
  return (
    <section className="bg-white pb-[96px]" id="cta">
      <div className="u grid gap-[24px] lg:grid-cols-2">
        <div className="bg-peri/70 flex flex-col justify-between rounded-[12px] p-[40px]">
          <h2 className="t-40 m-0 max-w-[488px]">{CTA.heading}</h2>
          <div>
            <p className="t-20 mb-[32px] mt-[40px] max-w-[488px]">{CTA.body}</p>
            <a className="btn bg-violet text-bone hover:bg-ink w-full justify-between" href="#cta">
              {CTA.button}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <img
          className="h-[420px] w-full rounded-[12px] object-cover"
          src={CTA.image}
          alt=""
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer */

function Footer() {
  return (
    <footer className="bg-ink text-bone pt-[48px]">
      <div className="u">
        <p className="t-28 font-display m-0 lowercase">{BRAND.name}</p>

        <div className="mt-[48px] grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[...FOOTER.columns, ...FOOTER.columns2].map((col) => (
            <div key={col.title}>
              <p className="t-12 m-0 text-white/45">{col.title}</p>
              <ul className="m-0 mt-[12px] list-none p-0">
                {col.links.map((l) => (
                  <li key={l} className="py-[3px]">
                    <a className="t-14n hover:text-peri transition-colors" href="#top">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[64px] flex flex-wrap items-center justify-end gap-5 border-t border-white/10 pt-[24px]">
          <p className="t-14n m-0 text-white/70">{FOOTER.ask}</p>
          {['✻', '✺', '✹', '↻'].map((g) => (
            <span className="t-20 text-white/45" key={g} aria-hidden="true">
              {g}
            </span>
          ))}
        </div>

        <div className="mt-[16px] flex flex-wrap justify-between gap-4 pb-[24px]">
          <p className="t-14n m-0 text-white/45">{FOOTER.legal}</p>
          <ul className="m-0 flex list-none flex-wrap gap-6 p-0">
            {FOOTER.meta.map((m) => (
              <li key={m}>
                <a className="t-14n hover:text-peri text-white/45 transition-colors" href="#top">
                  {m}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="t-14n m-0 max-w-[900px] pb-[24px] text-white/35">{FOOTER.disclaimer}</p>
      </div>

      {/* The sign-off: one line, fitted to the full width, clipped at the foot. */}
      <div className="overflow-hidden px-6">
        <p className="font-display text-peri m-0 whitespace-nowrap text-center text-[12.4vw] font-semibold leading-[0.95] tracking-[-0.03em]">
          {FOOTER.bigType}
        </p>
      </div>
    </footer>
  );
}

/* The pill that follows you down the right-hand edge of every section. */
function StickyChat() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className="btn bg-violet text-bone hover:bg-ink fixed right-[20px] top-1/2 z-50 -translate-y-1/2 shadow-lg transition-opacity"
      ref={ref}
      href="#cta"
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }}
    >
      {NAV.cta}
      <span aria-hidden="true">💬</span>
    </a>
  );
}
