import { BRAND, NAV } from '@/content/site';

/**
 * Four stacked full-width bars: a contact strip, the masthead, the nav, and a
 * news ticker. That stack *is* the 2012 header -- every band of it paid for by
 * a different person in the business, and none of them removable afterwards.
 *
 * Details that are deliberate rather than careless:
 *
 *   * the phone number appears twice above the fold, in two sizes, because the
 *     client asked for it twice.
 *   * "Home" carries the current-page state as a flat maroon tab, so the nav
 *     has two visual languages in one row: silver bevel and solid fill.
 *   * the search box is in the nav bar, floated right, 168px wide, with a GO!
 *     button -- the only search on the site and it is 14px tall.
 *   * the ticker is a real marquee. CSS rather than `<marquee>`, which is the
 *     one concession to the present: the element still renders in every browser
 *     but React has no business emitting it, and the animation is the same
 *     22-second linear crawl either way.
 */
export function Masthead() {
  return (
    <>
      <div className="b-top">
        <div className="b-top-in b-cf">
          <div className="b-top-phone">
            Call us today: 0161 496 0112 <span style={{ fontWeight: 'normal' }}>&nbsp;|&nbsp;</span>{' '}
            Mon&ndash;Fri 9am&ndash;5.30pm
          </div>
          <div className="b-top-links">
            <a href="#home">Home</a>
            <span>|</span>
            <a href="#contact">Contact Us</a>
            <span>|</span>
            <a href="#sitemap">Site Map</a>
            <span>|</span>
            <a href="#members">Members Area</a>
          </div>
        </div>
      </div>

      <div className="b-head">
        <div className="b-head-in b-cf">
          <div className="b-logo">
            <div className="b-logo-name">
              ember<em>health</em>
            </div>
            <div className="b-logo-tag">&ldquo;{BRAND.tagline}&rdquo;</div>
          </div>
          <div className="b-head-right">
            <div className="b-head-cta">0161 496 0112</div>
            <div className="b-head-sub">
              FREE UK delivery on all orders over &pound;50!
              <br />
              Showroom open Saturdays by appointment
            </div>
          </div>
        </div>
      </div>

      <div className="b-nav">
        <div className="b-nav-in b-cf">
          <ul className="b-cf">
            <li>
              <a href="#home" className="is-on">
                Home
              </a>
            </li>
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#panels">Shop Online</a>
            </li>
            <li>
              <a href="#faq">F.A.Q.</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
          <div className="b-nav-search">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ margin: 0 }}
              aria-label="Search this site"
            >
              <input type="text" className="b-field" defaultValue="Search our site..." />{' '}
              <button type="submit" className="b-btn b-btn-sm">
                GO!
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="b-ticker">
        <div className="b-ticker-in b-cf">
          <span className="b-ticker-tag">LATEST NEWS</span>
          <span className="b-ticker-track">
            <span className="b-blink">NEW!</span> Core Series 3 now in stock &mdash; order before
            2pm for same day dispatch &nbsp;&bull;&nbsp; As featured in Healthy Living Monthly
            (March issue, page 42) &nbsp;&bull;&nbsp; Ember Health is now an approved supplier to 12
            UK recovery studios &nbsp;&bull;&nbsp; Click here to download our 2012 brochure (PDF,
            4.2MB)
          </span>
        </div>
      </div>
    </>
  );
}
