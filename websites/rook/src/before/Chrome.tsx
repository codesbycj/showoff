import { BRAND, FOOTER, NAV } from '@/content/site';

/**
 * Four stacked bars before the page has said what it sells: a utility strip, a
 * masthead with a search and a phone number, a primary nav, a secondary nav,
 * and a scrolling offer ticker.
 *
 * Each one was reasonable on the day it was added. The utility bar came from
 * customer services, the second nav from whoever runs the sales, the ticker
 * from the marketing agency, and the phone number is 19px because the owner
 * asked for it to be bigger twice. Nothing has ever been removed, which is the
 * actual mechanism behind every page that looks like this.
 *
 * The cost is countable: five bars and 120px of vertical space before the
 * content, eleven links in the primary nav, nine in the secondary, and a
 * search box that is the third most prominent thing on a page selling two
 * products.
 */
export function Chrome() {
  return (
    <>
      <div className="b-util">
        <div className="b-util-in b-cf">
          <div className="b-util-l">
            <strong>FREE UK DELIVERY</strong> on orders over £50
            <span className="sep">|</span>
            Mon&ndash;Fri 9&ndash;5.30
            <span className="sep">|</span>
            <a href="#track">Track my order</a>
          </div>
          <div className="b-util-r">
            <a href="#account">My account</a>
            <span className="sep">|</span>
            <a href="#login">Sign in</a>
            <span className="sep">|</span>
            <a href="#register">Register</a>
            <span className="sep">|</span>
            <a href="#wishlist">Wishlist (0)</a>
            <span className="sep">|</span>
            <a href="#help">Help</a>
            <span className="sep">|</span>
            GBP &pound;
          </div>
        </div>
      </div>

      <div className="b-mast">
        <div className="b-mast-in b-cf">
          <div className="b-logo">
            <div className="b-logo-name">
              ROOK<em>DIRECT</em>
            </div>
            <div className="b-logo-tag">
              Chairs &amp; Seating Direct From The Factory &mdash; Est. 1974
            </div>
          </div>

          <div className="b-search">
            <form onSubmit={(e) => e.preventDefault()} style={{ margin: 0 }}>
              <select aria-label="Category">
                <option>All departments</option>
                <option>Dining chairs</option>
                <option>Lounge chairs</option>
                <option>Stacking chairs</option>
                <option>Spare parts</option>
              </select>{' '}
              <input type="text" defaultValue="Search 2 products..." aria-label="Search" />{' '}
              <button type="submit" className="b-btn buy">
                SEARCH
              </button>
              <div style={{ fontSize: '10px', color: '#777', paddingTop: '4px' }}>
                Popular: <a href="#s1">stacking chair</a>, <a href="#s2">yellow chair</a>,{' '}
                <a href="#s3">chair for cafe</a>, <a href="#s4">replacement feet</a>,{' '}
                <a href="#s5">trade account</a>
              </div>
            </form>
          </div>

          <div className="b-mast-r">
            <div className="b-phone">{FOOTER.contact.phone}</div>
            <div style={{ fontSize: '10px', color: '#777' }}>
              Lines open now &mdash; speak to a real person
            </div>
            <div className="b-basket">
              <strong>Basket:</strong> 0 items &mdash; &pound;0.00 &nbsp;
              <a href="#basket">View</a> | <a href="#checkout">Checkout</a>
            </div>
          </div>
        </div>
      </div>

      <div className="b-nav">
        <div className="b-nav-in b-cf">
          <ul className="b-cf">
            {['Home', 'Dining chairs', 'Lounge chairs', 'Stacking', 'Outdoor', 'Spare parts']
              .concat(NAV.links.map((n) => n.label))
              .concat(['Trade', 'Clearance'])
              .map((label) => (
                <li key={label}>
                  <a href="#nav">{label}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="b-nav2">
        <div className="b-nav2-in b-cf">
          <strong style={{ paddingRight: '6px' }}>TODAY:</strong>
          <a href="#sale">SALE NOW ON</a>
          <a href="#clearance">CLEARANCE</a>
          <a href="#new">NEW IN</a>
          <a href="#bulk">BULK ORDERS</a>
          <a href="#trade">TRADE PRICES</a>
          <a href="#gift">GIFT VOUCHERS</a>
          <a href="#finance">0% FINANCE</a>
          <a href="#samples">FREE SAMPLES</a>
          <a href="#returns">30 DAY RETURNS</a>
        </div>
      </div>

      <div className="b-ticker">
        <div className="b-ticker-in">
          <span className="b-ticker-track">
            <span className="b-blink">NEW!</span> {BRAND.name.toUpperCase()} Perch now in four
            colourways from £240 &nbsp;&bull;&nbsp; Order before 2pm for same day dispatch
            &nbsp;&bull;&nbsp; 11,400 chairs pressed and counting &nbsp;&bull;&nbsp; Winner:
            Northern Design Awards 2025 &nbsp;&bull;&nbsp; Trade customers call{' '}
            {FOOTER.contact.phone} for a quote &nbsp;&bull;&nbsp; Ask about our 10 year frame
            guarantee &nbsp;&bull;&nbsp; We take chairs back at end of life
          </span>
        </div>
      </div>
    </>
  );
}
