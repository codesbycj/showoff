import { useEffect, useRef, useState } from 'react';

import '@/before/before.css';
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
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The before: the same company, on the site it bought in 2016.
 *
 * **This episode's angle is the over-animated.** Not shabby — *expensive*. A
 * premium theme with every option switched on, plus the two plugins the agency
 * added and the exit-intent modal marketing asked for in month two.
 *
 * Everything on it works and everything was signed off. The compound effect is
 * a page you cannot read a paragraph on, because at any moment there is a
 * gradient cycling behind the words, a chevron bouncing under them, a chat
 * bubble pulsing over them, a shine crossing every button, cards drifting on
 * offset sines, and a carousel about to take the quote away mid-sentence.
 *
 * Two defects matter more than the rest, and they are the same missing word:
 *
 *   * **reveal-on-scroll with no `once`** — the class is removed again on exit,
 *     so every element replays each time it re-enters and scrolling back up is
 *     a second performance;
 *   * **counters that restart** — the same bug applied to a number.
 *
 * It carries the same deck as the after: every module, every figure, every
 * story, the news row and the whole footer.
 */
export function BeforePage() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div className="b" ref={rootRef} id="b-top">
      <Progress />
      <Notify />
      <Head />
      <Hero reduced={reduced} />
      <Marquee />
      <Counters reduced={reduced} />
      <Features />
      <Story />
      <Voices reduced={reduced} />
      <Modules />
      <Posts />
      <Foot />
      <Chat />
      <Popup reduced={reduced} />
      <Reveal root={rootRef} reduced={reduced} />
    </div>
  );
}

function Progress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="b-progress" aria-hidden="true">
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}

function Notify() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div className="b-notify">
      <b>New:</b> {NEWS.items[2].text} ✨{' '}
      <a style={{ color: '#fff', textDecoration: 'underline' }} href="#b-top">
        Find out more
      </a>
      <button type="button" aria-label="Dismiss" onClick={() => setShown(false)}>
        ×
      </button>
    </div>
  );
}

function Head() {
  return (
    <header className="b-head">
      <div className="b-wrap">
        <div className="b-logo">{BRAND.name}</div>
        <nav className="b-nav" aria-label="Primary">
          <ul>
            {NAV.links.map((item) => (
              <li key={item}>
                <a href="#b-top">{item}</a>
              </li>
            ))}
            <li>
              <a href="#b-top">{NAV.login}</a>
            </li>
          </ul>
        </nav>
        <button className="b-btn" type="button">
          Free Trial
        </button>
      </div>
    </header>
  );
}

const WORDS = ['MARGINS', 'ROTAS', 'STOCK', 'PAYROLL'];

function Hero({ reduced }: { reduced: boolean }) {
  const [word, setWord] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    /*
     * The parallax, written as the theme wrote it: a scroll listener that sets
     * a transform with no rAF between the event and the style write. On a
     * trackpad it fires faster than the compositor can paint and the layer
     * tears behind the type.
     */
    const onScroll = () => {
      const el = imgRef.current;
      if (el) el.style.transform = `translateY(${window.scrollY * 0.32}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <section className="b-hero">
      <div className="b-hero-img" ref={imgRef} aria-hidden="true" />
      <div className="b-wrap">
        <h1>
          Take control of your <br />
          <span className="b-rotate">
            {WORDS[word]}
            <span className="b-caret">&nbsp;</span>
          </span>
        </h1>
        <p>{HERO.sub}</p>
        <div className="b-cta-row">
          <button className="b-btn" type="button">
            {HERO.primary}
          </button>
          <button className="b-btn b-btn-ghost" type="button">
            {HERO.secondary}
          </button>
        </div>
      </div>
      <div className="b-scroll" aria-hidden="true">
        Scroll
        <br />
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ marginTop: 6 }}>
          <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="b-marquee" aria-label={RAIL.label}>
      <div className="b-marquee-row">
        {[0, 1].map((c) => (
          <ul key={c} aria-hidden={c > 0 || undefined}>
            {RAIL.names.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Counters({ reduced }: { reduced: boolean }) {
  return (
    <section className="b-sec b-sec-dark">
      <div className="b-wrap">
        <h2 className="b-h2 b-aos">{RESULTS.heading}</h2>
        <div className="b-divider" />
        <div className="b-counters">
          {RESULTS.stats.map((item) => (
            <div key={item.label} className="b-aos">
              <Counter value={item.value} reduced={reduced} />
              <div className="b-counter-l">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The counter, with the period's defining bug: it restarts every time the
 * element re-enters the viewport. Scroll past, scroll back, and the figure you
 * were reading is at zero and climbing again.
 */
function Counter({ value, reduced }: { value: string; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const target = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.<]/g, '');
  const decimals = value.includes('.') ? 1 : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1800);
        setN(target * t);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          cancelAnimationFrame(raf);
          if (e.isIntersecting) run();
          else setN(0);
        }),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, reduced]);

  return (
    <div className="b-counter-n" ref={ref}>
      {(reduced ? target : n).toFixed(decimals)}
      {suffix}
    </div>
  );
}

function Features() {
  return (
    <section className="b-sec">
      <div className="b-wrap">
        <h2 className="b-h2 b-aos">{WHY.heading}</h2>
        <div className="b-divider" />
        <div className="b-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {WHY.cards.map((item) => (
            <div key={item.title} className="b-card b-aos">
              <div className="b-icon">
                <img src={item.icon} alt="" width={36} height={36} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const s = STORIES.items[0];
  return (
    <section className="b-sec b-sec-grey">
      <div className="b-wrap">
        <h2 className="b-h2 b-aos">{STORIES.label}</h2>
        <div className="b-divider" />
        <div className="b-split">
          <div className="b-aos">
            {/* A 7:5 photograph in a box that forces 300px of 16:9. object-fit: fill. */}
            <img src={s.image} alt="" loading="lazy" />
          </div>
          <div className="b-aos">
            <h3 style={{ fontSize: 20, letterSpacing: 1, textTransform: 'uppercase' }}>
              {CREW.heading}
            </h3>
            <div className="b-divider" style={{ margin: '12px 0 18px' }} />
            <p style={{ color: 'var(--b-grey)' }}>{CREW.body}</p>
            <ul className="b-list">
              {s.stats.map((st) => (
                <li key={st.label}>
                  <strong>{st.value}</strong> {st.label}
                </li>
              ))}
            </ul>
            <p style={{ fontStyle: 'italic', marginTop: 16 }}>&ldquo;{s.quote}&rdquo;</p>
            <p style={{ fontSize: 12, color: 'var(--b-grey)' }}>{s.cite}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The carousel, on a four-second timer, with no pause on hover or focus. The
 * most hostile thing on the page, and the one nobody argues about in a review
 * because in a review nobody is reading the quote.
 */
function Voices({ reduced }: { reduced: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % STORIES.items.length), 4000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section className="b-sec b-sec-dark">
      <div className="b-wrap">
        <h2 className="b-h2 b-aos">What Our Customers Say</h2>
        <div className="b-divider" />
        <div className="b-carousel">
          {STORIES.items.map((item, n) => (
            <div
              key={item.cite}
              className={['b-slide', n === i ? 'b-on' : ''].join(' ').trim()}
              aria-hidden={n !== i}
            >
              <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              <div style={{ fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                {item.cite}
              </div>
            </div>
          ))}
        </div>
        <div className="b-dots">
          {STORIES.items.map((item, n) => (
            <button
              key={item.cite}
              type="button"
              aria-current={n === i}
              aria-label={`Testimonial ${n + 1}`}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className="b-sec">
      <div className="b-wrap">
        <h2 className="b-h2 b-aos">{PLATFORM.label}</h2>
        <div className="b-divider" />
        <div className="b-prices">
          {PLATFORM.items.slice(0, 3).map((item, i) => (
            <div
              key={item.id}
              className={['b-price', i === 1 ? 'b-price-hot' : ''].join(' ').trim()}
            >
              {i === 1 ? <div className="b-ribbon">Most Popular</div> : null}
              <h3>{item.title}</h3>
              <div className="b-price-n">£149</div>
              <div className="b-price-p">per site, per month</div>
              <ul className="b-list" style={{ textAlign: 'left' }}>
                {item.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <button className="b-btn" type="button" style={{ marginTop: 18 }}>
                {CTA.button}
              </button>
            </div>
          ))}
        </div>
        <p className="b-sub" style={{ marginTop: 30, marginBottom: 0, fontSize: 12 }}>
          {RESULTS.caveat} {PLATFORM.items[3].title}: {PLATFORM.items[3].lines.join(' ')}
        </p>
      </div>
    </section>
  );
}

function Posts() {
  return (
    <section className="b-sec b-sec-grey">
      <div className="b-wrap">
        <h2 className="b-h2 b-aos">{NEWS.heading}</h2>
        <div className="b-divider" />
        <div className="b-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {NEWS.items.slice(0, 3).map((item) => (
            <div key={item.text} className="b-card b-aos" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 11, letterSpacing: 1.4, color: 'var(--b-grey)' }}>
                {item.kind}
              </div>
              <h3 style={{ marginTop: 10, textTransform: 'none', letterSpacing: 0, fontSize: 15 }}>
                {item.text}
              </h3>
              <a href="#b-top" style={{ fontSize: 12, fontWeight: 600 }}>
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Foot() {
  return (
    <footer className="b-foot">
      <div className="b-wrap">
        <div className="b-foot-cols">
          <div>
            <div className="b-logo" style={{ fontSize: 21 }}>
              {BRAND.name}
            </div>
            <p style={{ marginTop: 12 }}>{CTA.body}</p>
          </div>
          {FOOTER.columns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#b-top">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="b-foot-base">
          {FOOTER.legal} {FOOTER.disclaimer}
        </div>
      </div>
    </footer>
  );
}

function Chat() {
  return (
    <button className="b-chat" type="button" aria-label="Chat with us">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8 8 0 01-11.6 7.1L3 20.5l1.9-6.1A8 8 0 1121 11.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** The newsletter modal, six seconds in, over whatever you had got to. */
function Popup({ reduced }: { reduced: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setOpen(true), 6000);
    return () => window.clearTimeout(id);
  }, []);
  if (!open) return null;

  return (
    <div className="b-modal-bg" role="dialog" aria-modal="true" aria-label="Newsletter">
      <div className="b-modal">
        <button
          className="b-modal-x"
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <h3>Wait! Don&apos;t Go 👋</h3>
        <p>
          Join 12,000+ hospitality leaders getting our weekly insights. Plus get our free Restaurant
          Profitability Checklist!
        </p>
        <input type="email" placeholder="Enter your email address" aria-label="Email address" />
        <button className="b-btn" type="button" style={{ width: '100%' }}>
          {reduced ? null : <span className="b-spinner" />}
          Send Me The Checklist
        </button>
        <p style={{ fontSize: 11, marginTop: 10, marginBottom: 0 }}>
          No spam, unsubscribe anytime. Invented company, invented checklist.
        </p>
      </div>
    </div>
  );
}

/**
 * The theme's scroll reveal, with the bug intact: no `once`, so the class is
 * removed on exit and every element replays each time it re-enters.
 *
 * Under `prefers-reduced-motion` it resolves permanently instead. The before is
 * a bad design, not an unreachable one, and content that only exists after an
 * animation has run is the second thing.
 */
function Reveal({
  root,
  reduced,
}: {
  root: React.RefObject<HTMLDivElement | null>;
  reduced: boolean;
}) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>('.b-aos'));
    if (reduced) {
      targets.forEach((t) => t.classList.add('b-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('b-in', e.isIntersecting)),
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root, reduced]);

  return null;
}
