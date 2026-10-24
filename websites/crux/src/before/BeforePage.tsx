import { useEffect, useState } from 'react';

import {
  brand,
  caseStudy,
  community,
  download,
  faq,
  features,
  footer,
  hero,
  humans,
  inside,
  lesson,
  misinformation,
  nav,
  why,
} from '@/content/site';
import { cx } from '@/cx';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The before: **the agency portfolio piece**.
 *
 * It is the site of a studio that won something. The grid is immaculate, the
 * type is beautiful, the photography is graded, there is a preloader with a
 * counter in it, and after a full screen — after three full screens — you
 * still cannot say what crux is or what it costs.
 *
 * Nothing is missing. Every price, every photograph, every claim and every
 * answered question the rebuild makes is on this page too (rule 3). They are
 * at 10 and 11px, they are behind a hover or inside an accordion that is shut
 * when you arrive, and they are below six screens of mood. That is the
 * failure: not absence, *rank*. The page spends its whole budget on the
 * impression and none of it on the question the visitor actually has.
 *
 * The order it chooses, and what each block is for:
 *
 *   1. a preloader, because of course
 *   2. a 130px lowercase manifesto and the real headline at 10px beside it
 *   3. "ethos" — the three paragraphs that explain the product, set at 13px
 *      in a 340px column, next to a 300px word that says nothing
 *   4. a marquee of adjectives
 *   5. the four things it does, as abstract plates whose descriptions appear
 *      only on hover
 *   6. the misinformation line, whispered
 *   7. two "figures" — the lesson and the case study at 10px, as artefacts
 *   8. the index of all twenty lessons, which is the one thing this page does
 *      better than the rebuild (see the README)
 *   9. four awards
 *  10. the appendix: the prices, the eight questions and the four reviews
 *  11. a dark contact band with the App Store link as a line of 11px text
 */
export function BeforePage({ active = true }: { active?: boolean }) {
  return (
    <div className="pf">
      <Preload active={active} />
      <Chrome />
      <Hero />
      <Ethos />
      <Band active={active} />
      <Cases />
      <Whisper />
      <Figures />
      <Ledger />
      <Awards />
      <Humans />
      <Appendix />
      <Contact />
    </div>
  );
}

/* ------------------------------------------------------------- the preloader */

/**
 * The counter. It runs to 100 over 1.4s and lifts.
 *
 * Three constraints it is built around. It covers the hero rather than the
 * viewport, so the comparison control is never underneath it. It runs once —
 * the first time this pane is the visible one — rather than on every swap
 * back, because a preloader that reappears is a different and much stupider
 * kind of bad than the one being portrayed. And it does not run at all under
 * reduced motion, where the stylesheet takes it off the page entirely: a
 * frozen "0" over the hero would be worse than no preloader at all.
 *
 * The rAF loop is bounded and gated on `active` (rule 7): it stops at 1.4s,
 * and the hidden pane never starts it.
 */
function Preload({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  const [up, setUp] = useState(false);

  useEffect(() => {
    /*
     * The gate is `up`, which is state, and not a ran-once ref. A ref is what
     * this was first written with and it never ran at all: StrictMode mounts
     * the effect twice, the first pass sets the ref and is then torn down, and
     * the second pass reads the ref and returns. Gating on the finished state
     * instead makes the double mount harmless -- it cancels and restarts -- and
     * still means the counter does not replay every time the toggle comes back.
     */
    if (!active || reduced || up) return;

    const started = performance.now();
    let frame = requestAnimationFrame(function tick() {
      const t = Math.min(1, (performance.now() - started) / 1400);
      setN(Math.round(t * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setUp(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, up]);

  return (
    <div className={cx('pf-preload', up && '-up')} aria-hidden="true">
      <span className="pf-label">{brand.name} — studio edition</span>
      <span className="pf-preload__num">{String(n).padStart(3, '0')}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- the chrome */

function Chrome() {
  return (
    <>
      <div className="pf-chrome">
        <a className="pf-chrome__mark" href="#pf-top">
          {brand.name}
        </a>
        <nav className="pf-chrome__nav pf-label" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.label} className="pf-chrome__link" href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="pf-chrome__link" href="#pf-enquiries">
            Enquiries
          </a>
        </nav>
      </div>
      <span className="pf-rail pf-label" aria-hidden="true">
        scroll
      </span>
      <span className="pf-count pf-label" aria-hidden="true">
        01 / 10
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ the hero */

function Hero() {
  return (
    <header className="pf-hero" id="pf-top">
      <h1 className="pf-hero__display">
        <span>a practice</span>
        <span>of thinking well</span>
      </h1>
      <div className="pf-hero__foot">
        <div className="pf-hero__cap">
          <p className="pf-label">{hero.eyebrow}</p>
          <p className="pf-ethos__p" style={{ marginTop: 10 }}>
            {brand.name} is a considered object for the examined life. An idea, carefully made, in
            your pocket.
          </p>
        </div>
        {/* The rebuild's headline. It is on the page. Nobody will read it. */}
        <p className="pf-hero__claim pf-label">{hero.headingLines.join(' ')}</p>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- the ethos */

function Ethos() {
  return (
    <section className="pf-ethos" id="about">
      <p className="pf-ethos__ghost" aria-hidden="true">
        ethos
      </p>
      <div className="pf-ethos__inner">
        <div>
          <p className="pf-label" style={{ marginBottom: 36 }}>
            {why.eyebrow}
          </p>
          {/* The seven objects, at 56px, desaturated, numbered. */}
          <div className="pf-plates">
            {why.objects.map((o, i) => (
              <figure className="pf-plate" key={o.alt}>
                <img src={o.src} alt={o.alt} width={56} height={56} />
                <figcaption className="pf-label">Fig. {String(i + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="pf-ethos__col">
          {why.lines.map((line) => (
            <p className="pf-ethos__p" key={line.slice(0, 24)}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- the word band */

/**
 * Six adjectives, forever. The track holds them twice, which is how a marquee
 * is built, and `animation-play-state` is tied to `active` so the hidden pane
 * is not animating a thing nobody can see (rule 7).
 */
const BAND = ['clarity', 'rigour', 'doubt', 'attention', 'evidence', 'restraint'];

function Band({ active }: { active: boolean }) {
  return (
    <div className="pf-band" aria-hidden="true">
      <div className="pf-band__track" style={{ animationPlayState: active ? 'running' : 'paused' }}>
        {[...BAND, ...BAND, ...BAND, ...BAND].map((w, i) => (
          <span className="pf-label" key={`${w}-${i}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- the cases */

/**
 * What the product does, as four numbered plates in a horizontal scroller.
 *
 * The heading of each is 15px and the body is `opacity: 0` until the pointer
 * is over it — so on a phone, where there is no pointer, the four things crux
 * does are four abstract shapes and four short titles. This is the single
 * worst decision on the page and it is the most common one in the genre.
 */
function Cases() {
  return (
    <section className="pf-cases">
      <div className="pf-cases__head">
        <p className="pf-label">Selected studies</p>
        <p className="pf-label">04 artefacts — scroll</p>
      </div>
      <div className="pf-cases__strip">
        {features.map((f, i) => (
          <article className="pf-case" key={f.key}>
            <div className="pf-case__plate">
              <span className="pf-case__shape" />
            </div>
            <p className="pf-label">{String(i + 1).padStart(2, '0')}</p>
            <h2 className="pf-case__head">{f.heading}</h2>
            <p className="pf-case__body">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- the whisper */

function Whisper() {
  return (
    <section className="pf-note">
      <p className="pf-label" style={{ marginBottom: 18 }}>
        {misinformation.eyebrow}
      </p>
      <p className="pf-note__h">
        {misinformation.heading}. {misinformation.body}
      </p>
      <button className="pf-note__cta pf-label" type="button">
        {misinformation.cta}
      </button>
    </section>
  );
}

/* --------------------------------------------------------------- the figures */

/**
 * The lesson and the case study, as two plates of 10px type under glass.
 *
 * Both are the same content the rebuild gives a 776px panel each. The bold in
 * the lesson body is the deck's own `**` markup, rendered the same way the
 * after renders it — the string comes from this repository, not from a user.
 */
function Figures() {
  return (
    <section className="pf-figs">
      <article className="pf-fig">
        <div className="pf-fig__frame">
          <h3 className="pf-fig__t">{lesson.title}</h3>
          {lesson.body.map((p) => (
            <p
              className="pf-fig__p"
              key={p.slice(0, 20)}
              dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }}
            />
          ))}
          {lesson.asides.map((a) => (
            <p className="pf-fig__q" key={a}>
              — {a}
            </p>
          ))}
        </div>
        <p className="pf-label">Fig. 08 — artefact, interactive lesson</p>
      </article>
      <article className="pf-fig">
        <div className="pf-fig__frame">
          <p className="pf-fig__masthead">{caseStudy.masthead}</p>
          <p className="pf-fig__p">{caseStudy.body}</p>
          {caseStudy.claims.map((c) => (
            <p className="pf-fig__q" key={c}>
              — {c}
            </p>
          ))}
          <p className="pf-fig__q" style={{ marginTop: 8 }}>
            {caseStudy.note}
          </p>
        </div>
        <p className="pf-label">Fig. 09 — artefact, case study</p>
      </article>
    </section>
  );
}

/* ---------------------------------------------------------------- the ledger */

/**
 * Every lesson, listed, at rest.
 *
 * This is the thing the bad page does better. The rebuild puts the same twenty
 * titles in three marquee rows that never stop moving: you cannot scan them,
 * you cannot read the far end of a row, and you certainly cannot find one you
 * heard about. Here they are a two-column index with a figure number and a
 * thumbnail each — twenty selectable lines, all visible at once, in 420px of
 * page. The README says so.
 */
function Ledger() {
  return (
    <section className="pf-ledger" id="lessons">
      <div className="pf-ledger__head">
        <div>
          <p className="pf-label">{inside.eyebrow}</p>
          <p className="pf-label" style={{ marginTop: 10 }}>
            {inside.heading}
          </p>
        </div>
        <div className="pf-ledger__topics">
          <p className="pf-label">{inside.topics.join(' · ')}</p>
          <p className="pf-label" style={{ marginTop: 10 }}>
            {inside.body}
          </p>
        </div>
      </div>
      <div className="pf-ledger__cols">
        {inside.lessons.map((l, i) => (
          <a className="pf-entry" href="#lessons" key={l.label}>
            <span className="pf-entry__fig pf-label">{String(i + 1).padStart(2, '0')}</span>
            {'src' in l && l.src ? (
              <img src={l.src} alt="" width={20} height={20} />
            ) : (
              <span className="pf-entry__swatch" />
            )}
            <span className="pf-entry__label">{l.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- the awards */

/**
 * Four awards, all invented (rule 10: no real body's name on a page of
 * invented copy). They are the load-bearing wall of the whole genre: the
 * reason the page is shaped like this is that pages shaped like this win
 * things.
 */
const AWARDS = [
  { name: 'Formwork Awards', detail: 'Site of the day — March 2026' },
  { name: 'Pixelcrest', detail: 'Honourable mention — interface' },
  { name: 'The Grid Index', detail: 'Studio pick — editorial' },
  { name: 'Typeface Annual', detail: 'Shortlisted — digital typography' },
];

function Awards() {
  return (
    <section className="pf-awards">
      {AWARDS.map((a) => (
        <div className="pf-award" key={a.name}>
          <b>{a.name}</b>
          <span className="pf-label">{a.detail}</span>
        </div>
      ))}
    </section>
  );
}

/* ---------------------------------------------------------------- the humans */

function Humans() {
  return (
    <section className="pf-humans">
      <h2 className="pf-humans__h">{humans.heading}</h2>
      <p className="pf-humans__p">{humans.body}</p>
    </section>
  );
}

/* -------------------------------------------------------------- the appendix */

/**
 * Where the answers live: three `<details>`, shut.
 *
 * `<details>` rather than a hand-built accordion for one reason — it is closed
 * by default, keyboard-operable and announced correctly without any work,
 * which keeps the page's badness about *rank* rather than about something
 * being unreachable. The prices, the trial, the eight answers and the four
 * reviews are all in here, at 11px, under the word "appendix", eight screens
 * down.
 */
function Appendix() {
  return (
    <section className="pf-appendix" id="faq">
      <div className="pf-appendix__head">
        <p className="pf-label">Appendix</p>
      </div>

      <details className="pf-details">
        <summary>
          <span className="pf-label">i — {faq.heading.toLowerCase()}, pricing, trial</span>
          <span className="pf-label">{faq.items.length} entries</span>
        </summary>
        <dl className="pf-details__body">
          {faq.items.map((item) => (
            <div className="pf-qa" key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </details>

      <details className="pf-details">
        <summary>
          <span className="pf-label">
            ii — {community.eyebrow.toLowerCase()}: {community.heading.toLowerCase()}
          </span>
          <span className="pf-label">{community.quotes.length} entries</span>
        </summary>
        <div className="pf-details__body">
          {community.quotes.map((q) => (
            <figure className="pf-quote" key={q.who}>
              <p>{q.text}</p>
              <figcaption className="pf-label">{q.who}</figcaption>
            </figure>
          ))}
        </div>
      </details>

      <details className="pf-details">
        <summary>
          <span className="pf-label">iii — index</span>
          <span className="pf-label">{footer.columns.length} columns</span>
        </summary>
        <div style={{ padding: '4px 0 28px' }}>
          <div className="pf-links">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <span className="pf-label">{col.title}</span>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#pf-top">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}

/* --------------------------------------------------------------- the contact */

function Contact() {
  return (
    <footer className="pf-contact" id="pf-enquiries">
      <p className="pf-label" style={{ marginBottom: 28 }}>
        Enquiries
      </p>
      <p className="pf-contact__big">
        <a href="mailto:hello@crux.app">hello@crux.app</a>
      </p>
      <div className="pf-contact__grid">
        <div className="pf-contact__col">
          <span className="pf-label">{download.heading}</span>
          <p>
            Available — iOS. <a href="#pf-top">{download.store.name}</a>, {download.store.kicker}{' '}
            iPhone and iPad.
          </p>
        </div>
        <div className="pf-contact__col">
          <span className="pf-label">Colophon</span>
          <p>
            Set in Geist and IBM Plex Mono. Every lesson researched, written and fact-checked by
            people, and signed by whoever wrote it.
          </p>
        </div>
        <div className="pf-contact__col">
          <span className="pf-label">Elsewhere</span>
          <p>
            {footer.social.map((s, i) => (
              <span key={s}>
                {i > 0 && ' · '}
                <a href="#pf-top">{s}</a>
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="pf-colophon">
        <span className="pf-label">{brand.legal}</span>
        <span className="pf-label">Site — Studio Harrow</span>
      </div>
    </footer>
  );
}
