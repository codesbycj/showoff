import { useState } from 'react';

import {
  ABOUT,
  AWARDS,
  BRAND,
  EARTH,
  FAQ,
  FOOTER,
  HERO,
  INGREDIENTS,
  PRODUCTS,
  QUIZ,
  SPACES,
  STATS,
  STORIES,
  STORIES_PEOPLE,
} from '@/content/site';
import { useRise } from '@/motion/useRise';

/**
 * The after: a rebuild of the reference's home page, section for section, at
 * its measurements (rule 0). Only the words are mine.
 *
 *   hero         y0      h900    four 60px lines at x30; a tile grid at the right
 *   ingredients  y1100   h236    one 60px sentence with images set between words
 *   products     y1536   h900    two cards, price, swatches, add to cart
 *   stats        y2358            three bordered claims
 *   spaces       y2636   h566    a 60px paragraph and a row of tiles
 *   people       y3402   h553    three review cards
 *   quiz         y4841   h422    two tabs and a four-option form
 *   about        y5462   h600    two people, each a portrait, a blurb and a quote
 *   awards       y6263            three groups of rows: title, award, year
 *   stories      y7294            a scrolling row of story cards
 *   earth                         a line and a button
 *   faq                           an accordion beside a chair
 *
 * The whole page is **one ground colour and four type sizes**. All of its
 * colour is in the photography, which is why a grid of yellow, lilac and olive
 * product shots reads as a palette even though the page itself has none.
 */
export function AfterPage() {
  const root = useRise<HTMLDivElement>();

  return (
    <div className="bg-paper text-ink" ref={root} id="top">
      <Nav />
      <Hero />
      <Ingredients />
      <Products />
      <Stats />
      <Spaces />
      <People />
      <Quiz />
      <About />
      <Awards />
      <Stories />
      <Earth />
      <Faqs />
      <Footer />
    </div>
  );
}

/**
 * The whole chrome: a wordmark and a hamburger. No links, no cart, no search.
 *
 * A furniture brand with two products does not need a nav, and leaving it out
 * is what lets the first screen be a headline and a grid of photographs with
 * nothing competing for the top-right corner.
 */
function Nav() {
  return (
    <header className="bg-paper/95 sticky top-0 z-40 backdrop-blur-sm">
      <div className="u flex h-[60px] items-center justify-between gap-6">
        <a
          className="t-19b focus-visible:outline-ink focus-visible:outline-2 focus-visible:outline-offset-4"
          href="#top"
        >
          {BRAND.name}
        </a>
        <button
          className="border-line hover:border-ink focus-visible:outline-ink grid size-[34px] place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          type="button"
          aria-label="Menu"
        >
          <span className="block">
            <span className="bg-ink mb-[4px] block h-px w-[14px]" />
            <span className="bg-ink block h-px w-[14px]" />
          </span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="u grid min-h-[840px] items-start gap-10 pt-[49px] lg:grid-cols-[500px_1fr]">
      <div className="flex h-full flex-col justify-between">
        <h1 className="t-60 m-0 max-w-[470px]">
          {HERO.lines.map((line) => (
            <span className="rise block" key={line}>
              {line}
            </span>
          ))}
        </h1>
        <p className="t-19 rise mb-[49px] mt-10">{HERO.foot}</p>
      </div>

      {/*
       * Seven tiles on a four-column grid with three deliberately left empty.
       * The holes are the composition — filled in, it is a catalogue page.
       */}
      {/* The grid half is a touch darker than the type half — two grounds, not one. */}
      <ul className="bg-stone/25 m-0 grid list-none grid-cols-2 gap-[10px] p-0 sm:grid-cols-4">
        {HERO.tiles.map((t, i) => (
          <li
            className={[
              'rise',
              i === 2 ? 'sm:col-start-2' : '',
              i === 5 ? 'sm:col-start-3' : '',
            ].join(' ')}
            key={t}
          >
            <span className="frame block aspect-square w-full">
              <img
                className="size-full object-cover"
                src={t}
                alt=""
                loading={i < 3 ? 'eager' : 'lazy'}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The ingredients line: one sentence at 60px with small square images set
 * between the words, wrapping as text. Because the pictures are inline they
 * reflow with the sentence instead of sitting in slots, which is why it reads
 * as a sentence that happens to contain chairs.
 */
function Ingredients() {
  return (
    <section className="u py-[100px]">
      <p className="t-60 rise m-0 mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-[14px] gap-y-[6px] text-center">
        {INGREDIENTS.parts.map((part, i) =>
          part.img ? (
            <img
              className="inline-block size-[52px] rounded-[6px] object-cover align-middle"
              key={i}
              src={part.img}
              alt={part.alt}
              loading="lazy"
            />
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </p>
    </section>
  );
}

function Products() {
  return (
    <section className="u grid gap-[10px] md:grid-cols-2">
      {PRODUCTS.map((p) => (
        <article className="rise bg-stone/40 rounded-[10px] p-[18px]" key={p.id}>
          <span className="frame block aspect-[4/3] w-full">
            <img className="size-full object-contain" src={p.image} alt={p.alt} loading="lazy" />
          </span>

          <div className="mt-[18px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="t-14b m-0">{p.name}</p>
              <p className="t-30 m-0 mt-[4px]">
                {p.priceLabel}
                {p.price}
              </p>
            </div>

            <div>
              <p className="t-14b m-0">{p.swatchLabel}</p>
              <ul className="m-0 mt-[8px] flex list-none gap-[6px] p-0">
                {p.swatches.map((c) => (
                  <li key={c}>
                    <button
                      className="focus-visible:outline-ink block size-[22px] rounded-full border border-black/10 focus-visible:outline-2 focus-visible:outline-offset-2"
                      type="button"
                      style={{ background: c }}
                      aria-label={`Colour ${c}`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <a className="btn bg-ink text-paper hover:bg-mute" href="#top">
              {p.cta}
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

function Stats() {
  return (
    <section className="u grid gap-[10px] pt-[10px] md:grid-cols-3">
      {STATS.map((s) => (
        <div className="rise border-line rounded-[10px] border p-[18px]" key={s.label}>
          <p className="t-11 text-mute m-0">{s.label}</p>
          <p className="t-30 m-0 mt-[52px]">{s.value}</p>
        </div>
      ))}
    </section>
  );
}

function Spaces() {
  return (
    <section className="u py-[100px]">
      <h2 className="t-60 rise m-0 mx-auto max-w-[1100px] text-center">{SPACES.heading}</h2>
      <ul className="m-0 mt-[60px] grid list-none grid-cols-2 gap-[10px] p-0 md:grid-cols-5">
        {SPACES.tiles.map((t) => (
          <li className="rise" key={t}>
            <span className="frame block aspect-[3/4] w-full">
              <img className="size-full object-cover" src={t} alt="" loading="lazy" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function People() {
  return (
    <section className="u pb-[100px]">
      <h2 className="t-60 rise m-0">{STORIES_PEOPLE.heading}</h2>
      <ul className="m-0 mt-[48px] grid list-none gap-[10px] p-0 md:grid-cols-3">
        {STORIES_PEOPLE.items.map((p) => (
          <li className="rise border-line rounded-[10px] border p-[18px]" key={p.name}>
            <p className="t-14b m-0">{p.name}</p>
            <p className="t-14 text-mute m-0 mt-[12px]">{p.body}</p>
            <p className="t-14 m-0 mt-[16px]" aria-label={`${p.stars} out of 5`}>
              {'★'.repeat(p.stars)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Quiz() {
  const [tab, setTab] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section className="u pb-[100px]">
      <div className="flex flex-wrap gap-[40px]">
        {QUIZ.tabs.map((t, i) => (
          <button
            className={[
              't-60 focus-visible:outline-ink inline-flex items-center gap-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4',
              i === tab ? 'text-ink' : 'text-mute',
            ].join(' ')}
            key={t}
            type="button"
            onClick={() => setTab(i)}
            aria-pressed={i === tab}
          >
            <span className="bg-ink inline-block size-[10px] rounded-full" aria-hidden="true" />
            {t}
          </button>
        ))}
      </div>

      <div className="bg-stone/40 mt-[40px] rounded-[10px] p-[30px]">
        {tab === 0 ? (
          <>
            <p className="t-19 m-0">{QUIZ.question}</p>
            <ul className="m-0 mt-[24px] grid list-none gap-[10px] p-0 md:grid-cols-2">
              {QUIZ.options.map((o) => (
                <li key={o}>
                  <button
                    className={[
                      't-14 focus-visible:outline-ink w-full rounded-[6px] border px-[16px] py-[14px] text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                      choice === o ? 'border-ink bg-paper' : 'border-line hover:border-ink',
                    ].join(' ')}
                    type="button"
                    onClick={() => setChoice(o)}
                    aria-pressed={choice === o}
                  >
                    {o}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <label className="t-19 block" htmlFor="rook-ask">
              {QUIZ.askLabel}
            </label>
            <textarea
              className="t-14 border-line focus-visible:outline-ink mt-[16px] h-[108px] w-full resize-none rounded-[6px] border bg-transparent p-[14px] focus-visible:outline-2"
              id="rook-ask"
              placeholder={QUIZ.askPlaceholder}
            />
          </>
        )}
        <button className="btn bg-ink text-paper hover:bg-mute mt-[24px]" type="button">
          {QUIZ.submit}
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="u pb-[100px]">
      <h2 className="t-60 rise m-0">{ABOUT.heading}</h2>
      <ul className="m-0 mt-[48px] grid list-none gap-[10px] p-0 md:grid-cols-2">
        {ABOUT.people.map((p) => (
          <li className="rise border-line rounded-[10px] border p-[18px]" key={p.name}>
            <div className="flex items-start gap-[18px]">
              <span className="frame block size-[126px] shrink-0 rounded-[6px]">
                <img className="size-full object-cover" src={p.image} alt="" loading="lazy" />
              </span>
              <span>
                <span className="t-19b block">{p.name}</span>
                <span className="t-14b text-mute block">{p.role}</span>
              </span>
              <p className="t-14 text-mute m-0 hidden max-w-[173px] lg:block">{p.blurb}</p>
            </div>
            <p className="t-30 m-0 mt-[48px]">{p.quote}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The awards table: three groups of rows, each a title at x30, an award at
 * x491 and a year at x1343. Set at **30px** — the same size as the quotes —
 * which is why a list of fourteen prizes reads as a section rather than as
 * small print.
 */
function Awards() {
  return (
    <section className="u pb-[100px]">
      <h2 className="t-60 rise m-0">{AWARDS.heading}</h2>
      <div className="mt-[60px]">
        {AWARDS.groups.map((g) => (
          <div className="rise mb-[60px]" key={g.title}>
            {g.rows.map((row, i) => (
              <div
                className="border-line grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b py-[12px] lg:grid-cols-[320px_1fr_auto]"
                key={row[0] + String(i)}
              >
                <p className="t-30 text-mute m-0 font-normal">{i === 0 ? g.title : ''}</p>
                <p className="t-30 m-0 font-normal">{row[0]}</p>
                <p className="t-30 m-0 font-normal tabular-nums">{row[1]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="pb-[100px]">
      <h2 className="u t-60 rise m-0">{STORIES.heading}</h2>
      <div className="mt-[48px] w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="m-0 flex w-max list-none gap-[10px] px-[30px] py-0">
          {STORIES.items.map((s) => (
            <li
              className="border-line w-[360px] shrink-0 rounded-[10px] border p-[18px]"
              key={s.title}
            >
              <span className="frame block aspect-[4/5] w-full rounded-[6px]">
                <img className="size-full object-cover" src={s.image} alt="" loading="lazy" />
              </span>
              <p className="t-19b m-0 mt-[18px]">{s.title}</p>
              <p className="t-14 text-mute m-0 mt-[10px]">{s.body}</p>
              <p className="t-11 text-mute m-0 mt-[16px]">{s.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Earth() {
  return (
    <section className="u pb-[100px] text-center">
      <h2 className="t-60 rise m-0">{EARTH.heading}</h2>
      <p className="t-19 rise text-mute mx-auto mb-0 mt-[20px] max-w-[560px]">{EARTH.body}</p>
      <div className="rise mt-[28px]">
        <a className="btn bg-ink text-paper hover:bg-mute" href="#top">
          {EARTH.cta}
        </a>
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="u grid gap-[40px] pb-[100px] lg:grid-cols-[420px_1fr]">
      <span className="frame rise block aspect-square w-full rounded-[10px]">
        <img className="size-full object-contain" src={FAQ.image} alt="" loading="lazy" />
      </span>

      <ul className="m-0 list-none p-0">
        {FAQ.items.map((item) => {
          const isOpen = open === item.q;
          return (
            <li className="border-line rise border-b" key={item.q}>
              <h3 className="m-0">
                <button
                  className="focus-visible:outline-ink flex w-full items-center justify-between gap-6 py-[20px] text-left focus-visible:outline-2 focus-visible:-outline-offset-2"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : item.q)}
                >
                  <span className="t-19">{item.q}</span>
                  <span
                    className="text-mute shrink-0 transition-transform"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-300"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <p className="t-14 text-mute m-0 max-w-[640px] pb-[20px]">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="u border-line border-t py-[40px]">
      <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
        <p className="t-19b m-0">{BRAND.name}</p>
        <div className="grid gap-10 sm:grid-cols-3">
          {FOOTER.columns.map((c) => (
            <div key={c.title}>
              <p className="t-14b m-0">{c.title}</p>
              <ul className="m-0 mt-[10px] list-none p-0">
                {c.links.map((l) => (
                  <li key={l} className="py-[2px]">
                    <a className="t-14 text-mute hover:text-ink transition-colors" href="#top">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="t-11 text-mute m-0 mt-[40px] max-w-[760px]">{FOOTER.legal}</p>
      <p className="t-11 text-mute m-0 mt-[6px]">{FOOTER.copy}</p>
    </footer>
  );
}
