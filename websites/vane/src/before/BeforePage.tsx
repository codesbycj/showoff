import { useEffect, useState } from 'react';

import featuredPhoto from '@/assets/img/people/featured.webp';
import partnerPhoto from '@/assets/img/people/partner.webp';
import t1 from '@/assets/img/people/t-1.webp';
import t2 from '@/assets/img/people/t-2.webp';
import t3 from '@/assets/img/people/t-3.webp';
import t4 from '@/assets/img/people/t-4.webp';
import {
  agents,
  brand,
  clients,
  footer,
  hero,
  partnerMerger,
  partners,
  platform,
  reasons,
  recognition,
  resources,
  standards,
  stats,
  testimonials,
} from '@/content/site';
import { cx } from '@/cx';

const PEOPLE = [t1, t2, t3, t4];

/**
 * The before: vane's landing page after three years of conversion-rate
 * optimisation.
 *
 * The angle is **the conversion-optimised** (rule 3), and the reference earned
 * it: it runs AB Tasty in production. Somebody paid for every block on this
 * page and every block won its test. The countdown lifted demo requests. The
 * orange button beat the green one. The toast that says a stranger in Munich
 * just booked lifted it again. The sticky bar at the foot lifted it again.
 *
 * What nobody ever tested is all of them at once against a page that reads —
 * which is the whole argument of the episode, and the reason this page carries
 * every single thing the after does (rule 3: same content, differently buried)
 * while being 6,000px shorter and asking for the same thing eleven times.
 */
export function BeforePage({ active = true }: { active?: boolean }) {
  return (
    <div className="c">
      <UrgencyBar active={active} />
      <div className="c__trustbar">
        🔒 ISO 27001 certified · 🇪🇺 EU data residency · ⭐ 4.8/5 from 280+ reviews · 4,000+
        customers
      </div>
      <Nav />
      <Hero />
      <LogoStrip />
      <Pillars />
      <Stats />
      <ValueStack />
      <Standards />
      <AgentsBlock />
      <Proof />
      <ResourcesBlock />
      <PartnerBlock />
      <FormBlock />
      <Footer />
      <SocialProofToast active={active} />
      <StickyBar />
      <span className="c__chat">💬 Chat with sales</span>
    </div>
  );
}

/* ------------------------------------------------------------ the countdown */

/**
 * The countdown, which is the purest thing on the page: a timer that has been
 * running for three years and resets every time it reaches zero.
 *
 * It is stopped whenever the before is not the page on screen — two designs
 * are mounted at once and the hidden one may not keep an interval going
 * (rule 7).
 */
function UrgencyBar({ active }: { active: boolean }) {
  const [left, setLeft] = useState(8077);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setLeft((v) => (v <= 0 ? 8077 : v - 1)), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  const hh = String(Math.floor(left / 3600)).padStart(2, '0');
  const mm = String(Math.floor((left % 3600) / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <div className="c__urgency">
      ⚡ Q1 ONBOARDING CLOSES SOON — BOOK YOUR DEMO BEFORE THE DEADLINE
      <span className="c__count">
        {hh}:{mm}:{ss}
      </span>
    </div>
  );
}

function Nav() {
  return (
    <div className="c__nav">
      <div className="c__wrap">
        <span className="c__logo">
          vane<span>.</span>
        </span>
        <nav>
          <a href="#platform">Platform</a>
          <a href="#pricing">Pricing</a>
          <a href="#customers">Customers</a>
          <a href="#resources">Resources</a>
          <a href="#company">Company</a>
        </nav>
        <span className="c__nav-right">
          <a className="c-btn c-btn--link" href="#login">
            Log in
          </a>
          <a className="c-btn c-btn--ghost" href="#trial">
            Start free trial
          </a>
          <a className="c-btn c-btn--green" href="#demo">
            Book a demo
          </a>
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- the hero */

function Hero() {
  return (
    <section className="c__hero">
      <div className="c__wrap">
        <div>
          <span className="c__eyebrow">🚀 #1 rated carbon platform 2026</span>
          <h1>
            Cut carbon reporting costs by <em>52%</em> — guaranteed*
          </h1>
          <p className="c__sub">{hero.body}</p>
          <ul className="c__ticks">
            <li>Audit-ready CSRD reports in days, not quarters</li>
            <li>4 AI agents that do the collection for you</li>
            <li>Set up in 14 days with a named analyst</li>
          </ul>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <a className="c-btn c-btn--hero" href="#demo">
              Get my free demo →
            </a>
            <a className="c-btn c-btn--link" href="#guide">
              or download the 2026 guide (PDF)
            </a>
          </div>
          <p className="c__risk">
            No credit card required · Cancel any time · 30-day money-back guarantee · *Average
            across 40 customers in 2025, see small print
          </p>
        </div>

        <div className="c__shot">
          <div className="c__shot-bar">vane · Group overview · FY 2026</div>
          <div className="c__shot-body">
            <div className="c__kpis">
              <div className="c__kpi">
                <b>418,902</b>
                <span>tCO₂e total</span>
              </div>
              <div className="c__kpi">
                <b>86.4%</b>
                <span>in scope 3</span>
              </div>
              <div className="c__kpi">
                <b>−12.1%</b>
                <span>vs. target</span>
              </div>
            </div>
            <svg viewBox="0 0 420 120" style={{ width: '100%', height: 'auto' }} aria-hidden="true">
              <path
                d="M0 96 L38 88 L76 98 L114 74 L152 82 L190 62 L228 72 L266 48 L304 56 L342 36 L380 44 L418 18"
                fill="none"
                stroke="#18a957"
                strokeWidth="2.5"
              />
              <path
                d="M0 96 L38 88 L76 98 L114 74 L152 82 L190 62 L228 72 L266 48 L304 56 L342 36 L380 44 L418 18 L418 120 L0 120 Z"
                fill="rgba(24,169,87,0.14)"
              />
            </svg>
            <p style={{ fontSize: 11, color: '#5b6670', margin: 0 }}>
              Purchased goods 184,220 · Upstream transport 71,940 · Fuel &amp; energy 48,305
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <div className="c__logos">
      <div className="c__wrap">
        <p>Trusted by 4,000+ companies worldwide 🌍</p>
        <div className="c__logo-row">
          {clients.logos.map((l) => (
            <span key={l.name}>{l.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- the four cards */

function Pillars() {
  return (
    <section className="c__sect" id="platform">
      <div className="c__wrap">
        <h2 style={{ textAlign: 'center' }}>
          Everything you need to measure, reduce and report ✅
        </h2>
        <p style={{ textAlign: 'center', color: '#5b6670', marginBottom: 22 }}>
          {platform.heading} {platform.headingTwo}
        </p>
        <div className="c__grid4">
          {platform.cards.map((card, i) => (
            <div className="c__card" key={card.key}>
              {i === 0 ? <span className="c__flag">Most popular</span> : null}
              {i === 3 ? <span className="c__flag">New for 2026</span> : null}
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <ul style={{ fontSize: 13, color: '#5b6670' }}>
                {card.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              <a className="c-btn c-btn--link" href="#platform">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="c__sect -tint">
      <div className="c__wrap">
        <h2 style={{ textAlign: 'center' }}>
          {stats.heading} {stats.headingEm}
        </h2>
        <div className="c__stats">
          {stats.items.map((s) => (
            <div className="c__stat" key={s.figure}>
              <b>{s.figure}</b>
              <span>{s.body}</span>
            </div>
          ))}
        </div>
        <p className="c__smallprint" style={{ textAlign: 'center' }}>
          *Figures are averages reported by customers surveyed in Q4 2025 (n=40) and are not a
          guarantee of results for any individual organisation. Savings depend on the systems you
          are replacing, the scope of your inventory and the quality of your supplier data.
        </p>
      </div>
    </section>
  );
}

/** The value stack: the price the page is careful never to actually quote. */
function ValueStack() {
  return (
    <section className="c__sect">
      <div className="c__wrap c__grid2">
        <div>
          <h2>What you get on day one</h2>
          <p style={{ color: '#5b6670' }}>
            Everything in the platform, the four agents, and a named analyst. No modules to buy
            separately and nothing held back for the enterprise tier.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            <a className="c-btn c-btn--green" href="#demo">
              Book a call
            </a>
            <a className="c-btn c-btn--ghost" href="#pricing">
              See pricing
            </a>
          </div>
        </div>
        <div className="c__stack">
          <table>
            <tbody>
              {reasons.cards.map((c, i) => (
                <tr key={c.key}>
                  <td>{c.title}</td>
                  <td>
                    <span className="c__strike">£{[4800, 3600, 2400, 6000][i]}</span> Included
                  </td>
                </tr>
              ))}
              {reasons.columns.map((c) => (
                <tr key={c.label}>
                  <td>{c.label}</td>
                  <td>
                    <span className="c__strike">£1,200</span> Included
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <b>Total value</b>
                </td>
                <td>
                  <b>£20,400</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Standards() {
  return (
    <section className="c__sect -tint">
      <div className="c__wrap">
        <h2 style={{ textAlign: 'center', fontSize: 24 }}>{standards.label}</h2>
        <div className="c__badges">
          {standards.badges.map((b) => (
            <span className="c__badge" key={b.mark}>
              {b.mark}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentsBlock() {
  return (
    <section className="c__sect -dark" id="copilot">
      <div className="c__wrap">
        <h2 style={{ textAlign: 'center' }}>
          {agents.headingTop} {agents.headingBottom} 🤖
        </h2>
        <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 20px' }}>{agents.body}</p>
        <div className="c__grid4">
          {agents.list.map((a) => (
            <div className="c__card" key={a.name} style={{ background: '#132b45', border: 0 }}>
              <h3>{a.name}</h3>
              <p style={{ color: '#aec4d8' }}>{a.body}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 20 }}>
          <a className="c-btn c-btn--hero" href="#demo">
            Start my free trial →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- the social proof block */

function Proof() {
  return (
    <section className="c__sect" id="customers">
      <div className="c__wrap">
        <h2 style={{ textAlign: 'center' }}>{testimonials.heading} ⭐⭐⭐⭐⭐</h2>

        <div className="c__grid2" style={{ marginBottom: 14 }}>
          <div className="c__card" style={{ display: 'flex', gap: 14 }}>
            <img
              src={featuredPhoto}
              alt=""
              style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 8 }}
            />
            <div>
              <span className="c__stars">★★★★★</span>
              <h3 style={{ marginTop: 6 }}>{testimonials.featured.headline}</h3>
              <p>{testimonials.featured.quote}</p>
              <p style={{ fontSize: 12, marginBottom: 0 }}>
                <b>{testimonials.featured.person.name}</b>, {testimonials.featured.person.role}
              </p>
            </div>
          </div>
          <div className="c__card">
            <h3>Recognised by</h3>
            <ul style={{ fontSize: 14, color: '#5b6670' }}>
              {recognition.cards.map((c) => (
                <li key={c.key}>
                  <b>{c.mark}</b> — {c.title}. {c.body}
                </li>
              ))}
            </ul>
            <ul style={{ fontSize: 14, color: '#5b6670' }}>
              {partnerMerger.points.map((p) => (
                <li key={p.title}>
                  <b>{p.title}</b> — {p.body}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="c__quotes">
          {testimonials.cards.map((card, i) => (
            <div className="c__quote" key={card.company}>
              <span className="c__stars">★★★★★</span>
              <p style={{ marginTop: 6 }}>{card.quote}</p>
              <p style={{ color: '#18a957', fontWeight: 700, marginBottom: 0 }}>
                {card.stat} {card.statNote}
              </p>
              <span className="c__who">
                <img src={PEOPLE[i]} alt="" />
                <span>
                  {card.person} · {card.company}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesBlock() {
  return (
    <section className="c__sect -tint" id="resources">
      <div className="c__wrap">
        <h2>{resources.heading}</h2>
        <div className="c__grid3">
          {resources.cards.map((card) => (
            <div className="c__card" key={card.title}>
              <span className="c__flag">Free</span>
              <h3>{card.title}</h3>
              <a className="c-btn c-btn--navy" href="#resources">
                {card.cta}
              </a>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16, fontSize: 14, color: '#5b6670' }}>
          <b>{resources.mediaName}</b> — {resources.mediaLabel}. {resources.mediaBody}{' '}
          <a href="#fathom">{resources.mediaCta}</a>
        </p>
      </div>
    </section>
  );
}

function PartnerBlock() {
  return (
    <section className="c__sect -green" id="company">
      <div className="c__wrap c__grid2">
        <div>
          <h2>{partners.heading}</h2>
          <p>{partners.body}</p>
          <a className="c-btn c-btn--hero" href="#partners">
            {partners.cta} →
          </a>
          <p style={{ marginTop: 14, fontSize: 13 }}>{partners.logos.join(' · ')}</p>
        </div>
        <div className="c__card" style={{ background: 'rgba(255,255,255,0.08)', border: 0 }}>
          <p style={{ fontSize: 16 }}>{partners.quote}</p>
          <span className="c__who" style={{ color: '#cdf0dc' }}>
            <img src={partnerPhoto} alt="" style={{ width: 38, height: 38, borderRadius: '50%' }} />
            <span>
              {partners.person.name} · {partners.person.role}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- the form */

function FormBlock() {
  const [sent, setSent] = useState(false);

  return (
    <section className="c__sect" id="demo">
      <div className="c__wrap c__grid2">
        <div>
          <h2>Book your free 30-minute demo 🎯</h2>
          <ul className="c__ticks">
            <li>We walk your own data through the platform</li>
            <li>You get the CSRD gap list whether you buy or not</li>
            <li>No sales deck, no obligation</li>
          </ul>
          <p style={{ fontSize: 13, color: '#5b6670' }}>
            Average response time: 2 hours. 4,000+ companies already run on {brand.name}.
          </p>
          <div className="c__badges" style={{ justifyContent: 'flex-start' }}>
            {standards.badges.slice(0, 6).map((b) => (
              <span className="c__badge" key={b.mark}>
                {b.mark}
              </span>
            ))}
          </div>
        </div>

        <form
          className="c__form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <p style={{ margin: 0 }}>
              <b>Thanks!</b> Somebody will be in touch within two hours.
            </p>
          ) : (
            <>
              <div className="c__two">
                <div>
                  <label htmlFor="cf-first">First name*</label>
                  <input id="cf-first" required />
                </div>
                <div>
                  <label htmlFor="cf-last">Last name*</label>
                  <input id="cf-last" required />
                </div>
              </div>
              <label htmlFor="cf-email">Work email*</label>
              <input id="cf-email" type="email" required />
              <label htmlFor="cf-phone">Phone*</label>
              <input id="cf-phone" type="tel" required />
              <label htmlFor="cf-company">Company*</label>
              <input id="cf-company" required />
              <div className="c__two">
                <div>
                  <label htmlFor="cf-size">Company size*</label>
                  <select id="cf-size">
                    <option>Select…</option>
                    <option>1–50</option>
                    <option>51–250</option>
                    <option>251–1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cf-role">Your role*</label>
                  <select id="cf-role">
                    <option>Select…</option>
                    <option>Sustainability</option>
                    <option>Finance</option>
                    <option>Operations</option>
                    <option>Procurement</option>
                  </select>
                </div>
              </div>
              <label htmlFor="cf-country">Country*</label>
              <input id="cf-country" required />
              <label htmlFor="cf-when">When do you need to report?*</label>
              <select id="cf-when">
                <option>Select…</option>
                <option>This quarter</option>
                <option>This year</option>
                <option>Next year</option>
                <option>Just looking</option>
              </select>
              <label htmlFor="cf-notes">Anything else</label>
              <textarea id="cf-notes" rows={3} />
              <label style={{ fontWeight: 400, fontSize: 12 }}>
                <input type="checkbox" style={{ width: 'auto', marginRight: 6 }} required /> I agree
                to the privacy policy and to receiving product updates.
              </label>
              <button className="c-btn c-btn--hero" type="submit" style={{ width: '100%' }}>
                Get my free demo →
              </button>
              <p className="c__risk" style={{ textAlign: 'center' }}>
                🔒 Your data is safe. We never share it. Unsubscribe any time.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------------------------------------------- the toast, the bar, the chat */

const TOASTS = [
  ['Sofia in Munich', 'just booked a demo', '2 minutes ago'],
  ['Daniel in Rotterdam', 'downloaded the CSRD guide', '6 minutes ago'],
  ['Amira in Lyon', 'started a free trial', '11 minutes ago'],
  ['Tom in Leeds', 'booked a call with sales', '14 minutes ago'],
] as const;

function SocialProofToast({ active }: { active: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % TOASTS.length), 5200);
    return () => window.clearInterval(id);
  }, [active]);

  const [who, what, when] = TOASTS[i];
  return (
    <div className="c__toast">
      <img src={PEOPLE[i]} alt="" />
      <span>
        <b>
          {who} {what}
        </b>
        <span>{when} · verified by Proofly</span>
      </span>
    </div>
  );
}

function StickyBar() {
  return (
    <div className="c__sticky">
      <div className="c__wrap">
        <p>
          Ready to cut your reporting costs by 52%?
          <small>Free 30-minute demo · no credit card · 4,000+ customers</small>
        </p>
        <span style={{ display: 'flex', gap: 10 }}>
          <a
            className="c-btn c-btn--ghost"
            href="#guide"
            style={{ background: 'transparent', color: '#fff', borderColor: '#fff' }}
          >
            Download guide
          </a>
          <a className="c-btn c-btn--hero" href="#demo">
            Book a demo →
          </a>
        </span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="c__footer">
      <div className="c__wrap">
        <div className="c__footer-cols">
          {footer.columns.slice(0, 5).map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#footer">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={cx('c__legal')}>
          <span>{footer.copyright}</span>
          <span>{footer.address}</span>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#cookies">Cookie settings</a>
        </div>
        <p className="c__smallprint">
          *Savings and percentages quoted on this page are averages reported by customers surveyed
          in Q4 2025 (n=40) and are not a guarantee of results. The 30-day money-back guarantee
          applies to annual plans purchased directly and excludes implementation fees. Certification
          marks shown indicate the standards the platform supports; they are not an endorsement.
        </p>
      </div>
    </div>
  );
}
