/**
 * The special offer: a dashed red box with a rotated sticker in it.
 *
 * Every element of this is a 2012 tell -- the dashed border, the Arial Black
 * sticker tilted eleven degrees, the triple exclamation marks, the "this month
 * only" that has been on the page for three years, and the expiry date written
 * out in full so nobody has to work it out. It is also, in its way, the most
 * honest block on the page: it is the only one that names a price.
 *
 * The modern page has no equivalent and does not want one. That is worth
 * noticing rather than mocking: the offer is doing a real job here, and the
 * rebuild quietly drops it.
 */
export function Offer() {
  return (
    <div className="b-offer">
      <div className="b-starburst">
        <span>
          SAVE
          <em>&pound;100</em>
        </span>
      </div>
      <h3>SPECIAL OFFER &mdash; THIS MONTH ONLY!!!</h3>
      <p style={{ marginBottom: '7px' }}>
        Order any Core Series 3 panel before <strong>31st March 2012</strong> and we will take a
        full <strong>&pound;100 off</strong> the recommended retail price, plus send you a free
        protective eyewear set (worth &pound;24.99) absolutely <span className="b-blink">FREE</span>
        . Simply quote <strong>EMBER100</strong> when you telephone your order through, or enter it
        in the discount box at the checkout.
      </p>
      <a href="#panels" className="b-btn">
        Order Now &raquo;
      </a>{' '}
      <span style={{ fontSize: '11px', color: '#8a8270' }}>
        or call <strong>0161 496 0112</strong> &mdash; lines open until 5.30pm
      </span>
    </div>
  );
}
