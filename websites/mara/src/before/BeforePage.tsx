import '@/before/before.css';
import {
  ATELIER_IMAGE,
  BAND,
  BRAND,
  BRANDS,
  COLLAGE,
  FEATURED,
  FOOTER,
  HERO,
  MARQUEE,
  SPLITS,
  STATEMENT,
} from '@/content/site';

/**
 * The before: the same atelier, mid-migration.
 *
 * **This episode's angle is the abandoned refresh.** Somebody started a
 * redesign eighteen months ago. The hero got rebuilt — big display face, lots
 * of air, the new typeface — and then it stopped. Everything below it is still
 * the previous site: Lato, teal buttons, bootstrap-era cards, icons in circles,
 * images squashed where the new 4:5 product shots meet an old card template
 * that forces 16:9.
 *
 * The symptoms, all of them real:
 *
 *   * the new typeface is loaded and applied to the hero, while the old
 *     stylesheet still owns `h2`, so every heading below the fold is in the
 *     previous brand's face;
 *   * a placeholder block nobody came back to, still carrying its note;
 *   * a seasonal banner eighteen months stale, with the year left off;
 *   * a "new site coming soon" notice at the top, dated;
 *   * a breakpoint between 900 and 1100 where the old grid and the new
 *     container disagree;
 *   * two footers, the new strip pasted above the old one and never merged.
 *
 * This is the most damaging angle in the series precisely because the top of
 * the page is *good*. A visitor who likes the hero reads everything after it as
 * evidence that the company does not finish what it starts.
 *
 * It carries the same deck as the after: every product, every stockist, the
 * statement, the collage words and the whole footer.
 */
export function BeforePage() {
  return (
    <div className="b" id="b-top">
      <div className="b-notice">
        Our new website is coming soon — thanks for bearing with us! (Last updated: March)
      </div>

      <header className="b-head">
        <div className="b-wrap b-row">
          <div className="b-logo-new">{BRAND.name}</div>
          <nav className="b-nav">
            <ul>
              {SPLITS.map((s) => (
                <li key={s.id}>
                  <a href="#b-top">{s.title}</a>
                </li>
              ))}
              <li>
                <a href="#b-shop">Shop</a>
              </li>
              <li>
                <a href="#b-top">Stockists</a>
              </li>
              <li>
                <a href="#b-top">Contact</a>
              </li>
            </ul>
          </nav>
          <a className="b-btn-new" href="#b-shop">
            Shop now
          </a>
        </div>
      </header>

      {/* The one piece of the refresh that landed. */}
      <section className="b-hero-new">
        <img src={HERO.image} alt={HERO.alt} />
        <div className="b-wrap">
          <h1>{BRAND.name}</h1>
          <p>{STATEMENT.lead}</p>
          <a className="b-btn-new" href="#b-shop">
            {STATEMENT.heading}
          </a>
        </div>
      </section>

      <div className="b-sale">
        {MARQUEE.join(' ')} — SPRING SALE NOW ON! Use code SPRING at checkout.
      </div>

      <section className="b-sec" id="b-shop">
        <div className="b-wrap">
          <h2>Our Products</h2>
          <p className="b-sub">
            {STATEMENT.tailLeft}, {STATEMENT.tailRight}
          </p>
          <div className="b-col4">
            {FEATURED.items.map((item) => (
              <div className="b-card-old" key={item.name}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <h3>{item.name}</h3>
                <div className="b-price-old">£{item.price}</div>
                {item.badge ? <small>Save {item.badge}%</small> : null}
                <a className="b-btn-old" href="#b-shop">
                  Add to basket
                </a>
              </div>
            ))}
            {STATEMENT.items.map((item) => (
              <div className="b-card-old" key={item.name}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <h3>{item.name}</h3>
                <div className="b-price-old">£POA</div>
                <small>{item.note}</small>
                <a className="b-btn-old" href="#b-shop">
                  Add to basket
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="b-sec b-sec--grey">
        <div className="b-wrap">
          <h2>Ranges</h2>
          <div className="b-col3">
            {SPLITS.map((s) => (
              <div className="b-card-old" key={s.id}>
                <div className="b-icon-old" aria-hidden="true">
                  {s.title.slice(0, 1)}
                </div>
                <h3>{s.title}</h3>
                <p>{s.note}</p>
                <a href="#b-shop">Explore &raquo;</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="b-sec">
        <div className="b-wrap">
          <h2>About The Atelier</h2>
          <div className="b-row">
            <img
              src={ATELIER_IMAGE}
              alt="A portrait from the brand's archive"
              style={{ width: 300, height: 170, objectFit: 'fill' }}
              loading="lazy"
            />
            <div>
              <p>{FOOTER.statement}</p>
              <p>
                {COLLAGE.lead} <strong>{COLLAGE.words[0].word}</strong>. {COLLAGE.lead}{' '}
                <strong>{COLLAGE.words[1].word}</strong>.
              </p>
              <p>{BAND.rows.flat().join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Never filled in. */}
      <section className="b-sec b-sec--grey">
        <div className="b-wrap">
          <div className="b-placeholder">
            <strong>[ SECTION PLACEHOLDER — press/awards logos go here ]</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace this block before
              launch.
            </p>
          </div>
        </div>
      </section>

      <section className="b-sec">
        <div className="b-wrap">
          <h2>Stockists</h2>
          <table className="b-table-old">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Category</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {BRANDS.items.map((b) => (
                <tr key={b.name}>
                  <td>{b.name}</td>
                  <td>{b.kind}</td>
                  <td>{b.count ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The new footer strip, pasted above the old footer and never merged. */}
      <div className="b-foot-new">
        <div className="b-wrap">
          <span>{BRAND.name}</span>
          <span>{FOOTER.columns[1].lines[0]}</span>
        </div>
      </div>

      <footer className="b-foot">
        <div className="b-wrap">
          <div className="b-col3">
            {FOOTER.columns.map((col) => (
              <div key={col.title}>
                <h4>{col.title}</h4>
                {col.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="b-foot-bar">
            {FOOTER.meta.join(' | ')}
            <br />
            {FOOTER.legal}
          </div>
        </div>
      </footer>
    </div>
  );
}
