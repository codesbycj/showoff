import tplHero from '@/assets/img/tpl-hero.webp';
import { BRAND, FOOTER, NAV, TRUSTED } from '@/content/site';

/**
 * The top of a bought theme: a utility strip, a logo with a tagline under it,
 * a nav with a call-to-action in it, a full-bleed hero with a dark scrim, and
 * a row of greyed-out client names.
 *
 * Four of the page's five button styles appear in this one screen — the blue
 * in the header, the green and the ghost in the hero, and the text link under
 * them. None of them was chosen; each arrived with the block it sits in.
 *
 * The hero photograph is the tell. It is a meeting room, because the theme's
 * demo had a meeting room, and nothing about a cycle-to-work scheme is in it.
 * Swapping it for a photograph of a bike would not fix the page, but it is the
 * first thing anyone notices and the last thing anyone changes.
 */
export function Chrome() {
  return (
    <>
      <div className="b-top">
        <div className="b-wrap b-row">
          <div style={{ float: 'left' }}>
            <strong>{FOOTER.contact.phone}</strong> &nbsp;|&nbsp; {FOOTER.contact.email}{' '}
            &nbsp;|&nbsp; {FOOTER.contact.hours}
          </div>
          <div style={{ float: 'right' }}>
            <a href="#login">Client login</a> &nbsp;|&nbsp; <a href="#rider">Rider portal</a>{' '}
            &nbsp;|&nbsp; <a href="#help">Support</a> &nbsp;|&nbsp; EN
          </div>
        </div>
      </div>

      <header className="b-head">
        <div className="b-wrap b-row">
          <div className="b-logo">
            {BRAND.name}
            <span>.</span>
            <small>Sustainable Mobility Solutions</small>
          </div>

          <nav className="b-nav">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              {NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label} ▾</a>
                </li>
              ))}
              <li>
                <a href="#about">About us</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact" className="b-btn b-btn--blue">
                  Get a quote
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="b-hero" style={{ backgroundImage: `url(${tplHero})` }}>
        <div className="b-wrap b-hero-in">
          <h1>Innovative Mobility Solutions For The Modern Workplace</h1>
          <p>
            {BRAND.blurb} We deliver best-in-class, end-to-end sustainable commuting programmes
            tailored to your organisation&rsquo;s unique requirements.
          </p>
          <a href="#contact" className="b-btn b-btn--green">
            Request a callback
          </a>
          <a href="#schemes" className="b-btn b-btn--ghost">
            Our solutions
          </a>
          <div style={{ marginTop: '22px' }}>
            <a href="#video" className="b-btn b-btn--text" style={{ color: '#ffffff !important' }}>
              <span style={{ color: '#ffffff' }}>▶ Watch our 2-minute overview →</span>
            </a>
          </div>
        </div>
      </section>

      <div className="b-logos b-center">
        <div className="b-wrap">
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#95a5a6',
            }}
          >
            Trusted by leading organisations nationwide
          </p>
          <ul>
            {TRUSTED.names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
