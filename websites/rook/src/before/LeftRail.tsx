import { MAKING, SUSTAIN } from '@/content/site';

const SWATCH: Record<string, string> = {
  clay: '#c4593a',
  moss: '#6c7a4f',
  sky: '#8fa9bd',
  butter: '#e8c15a',
  chalk: '#e4ded3',
  ink: '#2b2a27',
};

/**
 * The left rail: a category tree for a catalogue of two products, then five
 * more modules under it.
 *
 * The tree is the giveaway. A studio that makes two chairs does not need
 * thirty-one category links, but a shop platform ships with a category tree
 * and a tree looks wrong with two branches in it, so it gets filled -- by
 * material, by room, by colour, by price, by "shop by" anything at all.
 * Nothing here is a lie; it is all real navigation to pages that would each
 * contain the same two chairs.
 *
 * The filters underneath are the same instinct: faceted search over a range of
 * two. Six price bands, six colours and four materials can between them return
 * exactly two results, and most combinations return none.
 */
export function LeftRail() {
  return (
    <div className="b-left">
      <div className="b-box">
        <div className="b-box-h">SHOP BY CATEGORY</div>
        <ul className="b-cats">
          {[
            ['Dining chairs', ['Stacking', 'With arms', 'Upholstered', 'Outdoor']],
            ['Lounge chairs', ['Low back', 'Wool', 'Canvas']],
            ['Cafe &amp; contract', ['Bulk 10+', 'Bulk 50+', 'Trade account']],
            ['Spare parts', ['Feet &amp; glides', 'Seat pads', 'Fixings']],
            ['Clearance', ['Ex-display', 'Seconds', 'Last few']],
          ].map(([cat, subs]) => (
            <li key={cat as string}>
              <a href="#cat" dangerouslySetInnerHTML={{ __html: cat as string }} />
              <ul className="sub">
                {(subs as string[]).map((sub) => (
                  <li key={sub}>
                    <a href="#sub" dangerouslySetInnerHTML={{ __html: sub }} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="b-box">
        <div className="b-box-h">SHOP BY PRICE</div>
        <div className="b-box-b">
          {[
            'Under £100',
            '£100 — £200',
            '£200 — £300',
            '£300 — £400',
            '£400 — £500',
            'Over £500',
          ].map((band) => (
            <div className="b-check" key={band}>
              <label>
                <input type="checkbox" style={{ verticalAlign: 'middle' }} /> {band}{' '}
                <span style={{ color: '#999' }}>
                  ({band.includes('200') ? 1 : band.includes('300') ? 1 : 0})
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">SHOP BY COLOUR</div>
        <div className="b-box-b b-cf">
          <ul className="b-swatches b-cf">
            {Object.entries(SWATCH).map(([name, hex]) => (
              <li key={name}>
                <a
                  href="#colour"
                  className="b-swatch"
                  title={name}
                  aria-label={name}
                  style={{ background: hex }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h alt">WHY BUY FROM US?</div>
        <div className="b-box-b">
          <ul style={{ fontSize: '10px' }}>
            {MAKING.points.map((p) => (
              <li key={p.id} style={{ padding: '2px 0', borderBottom: '1px dotted #ddd' }}>
                <strong>
                  {p.figure}
                  {p.unit === '%' ? '%' : ` ${p.unit}`}
                </strong>{' '}
                &mdash; {p.title}
              </li>
            ))}
            <li style={{ padding: '2px 0' }}>
              <strong>{SUSTAIN.figures[1].figure}</strong> &mdash; {SUSTAIN.figures[1].label}
            </li>
          </ul>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">NEWSLETTER</div>
        <div className="b-box-b">
          <p style={{ fontSize: '10px' }}>
            Get £10 off your first order and hear about sales before anybody else.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ margin: 0 }}>
            <input
              type="text"
              aria-label="Email"
              placeholder="Your e-mail"
              style={{ width: '110px', border: '1px solid #999', padding: '3px', fontSize: '10px' }}
            />{' '}
            <button type="submit" className="b-btn">
              GO
            </button>
          </form>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">WE ACCEPT</div>
        <div className="b-box-b" style={{ textAlign: 'center' }}>
          {['VISA', 'MC', 'AMEX', 'PAYPAL', 'KLARNA'].map((p) => (
            <span className="b-badge" key={p}>
              {p}
            </span>
          ))}
          <div style={{ fontSize: '9px', color: '#888', paddingTop: '3px' }}>
            Secure 256-bit SSL checkout
          </div>
        </div>
      </div>
    </div>
  );
}
