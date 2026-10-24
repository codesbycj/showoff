import pay0 from '@/assets/img/pay-0.svg';
import pay1 from '@/assets/img/pay-1.svg';
import pay2 from '@/assets/img/pay-2.svg';
import pay3 from '@/assets/img/pay-3.svg';
import { FOOTER } from '@/content/site';

const PAY = [pay0, pay1, pay2, pay3];

/**
 * The 290px right-hand column: six boxes, each with a maroon gradient title bar.
 *
 * This is where a 2012 site put everything it could not fit in the nav, and the
 * order is the order those things were added -- newsletter first because it was
 * the newest idea, opening hours fourth because somebody rang up and asked, the
 * hit counter last because it had been there since the first version and nobody
 * dared remove it.
 *
 * The counter is the detail worth keeping honest. It reads 0,041,882 and it is
 * not plausible: it is the number of page views, shown to customers, as a
 * trust signal. The modern page has an equivalent -- "trusted by 12,000+
 * households" -- and both are the same unverifiable claim. One of them just
 * knows not to show its working.
 */
export function Sidebar() {
  return (
    <>
      <div className="b-box">
        <div className="b-box-h">Newsletter Sign Up</div>
        <div className="b-box-b">
          <p style={{ marginBottom: '7px' }}>
            Join our mailing list for special offers, free health tips and news of our open days. We
            will never pass your details on to anybody else.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ margin: 0 }}>
            <p style={{ marginBottom: '5px' }}>
              <label htmlFor="b-nl-name">Your name:</label>
              <br />
              <input id="b-nl-name" type="text" className="b-field" />
            </p>
            <p style={{ marginBottom: '7px' }}>
              <label htmlFor="b-nl-mail">Your e-mail:</label>
              <br />
              <input id="b-nl-mail" type="text" className="b-field" />
            </p>
            <button type="submit" className="b-btn">
              Subscribe &raquo;
            </button>
          </form>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">Why Buy From Us?</div>
        <div className="b-box-b">
          <ul style={{ marginBottom: 0, paddingLeft: '17px', listStyle: 'square outside' }}>
            <li>Family run business established 2009</li>
            {FOOTER.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
            <li>FREE delivery on orders over &pound;50</li>
            <li>30 day no-quibble money back guarantee</li>
            <li>Friendly advice before and after you buy</li>
          </ul>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">Opening Hours</div>
        <div className="b-box-b">
          <table className="b-table" style={{ margin: 0 }} cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td>Monday &ndash; Friday</td>
                <td>9.00am &ndash; 5.30pm</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>By appointment</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>Closed</td>
              </tr>
              <tr>
                <td>Bank Holidays</td>
                <td>Please telephone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">We Accept</div>
        <div className="b-box-b" style={{ textAlign: 'center' }}>
          {PAY.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt=""
              width={44}
              height={31}
              style={{ margin: '0 3px', verticalAlign: 'middle' }}
            />
          ))}
          <p style={{ margin: '7px 0 0', fontSize: '10px', color: '#8a8270' }}>
            All transactions are processed over a secure 128-bit SSL connection.
          </p>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">Find Us</div>
        <div className="b-box-b">
          <p style={{ marginBottom: '5px' }}>
            Ember Health Ltd
            <br />
            Unit 4b, Pennine Business Park
            <br />
            Oldham Road
            <br />
            Manchester M24 1SX
          </p>
          <p className="b-more" style={{ marginBottom: 0 }}>
            <a href="#map">View map and directions &raquo;</a>
          </p>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">Site Information</div>
        <div className="b-box-b" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '6px' }}>
            <span className="b-counter">0,041,882</span>
          </p>
          <p style={{ fontSize: '10px', color: '#8a8270', marginBottom: '7px' }}>
            visitors since January 2009
          </p>
          <div>
            <span className="b-badge">Valid XHTML 1.0</span>
            <span className="b-badge">Valid CSS</span>
            <span className="b-badge">SSL Secured</span>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '10px', color: '#8a8270' }}>
            Best viewed in 1024&times;768 or higher
          </p>
        </div>
      </div>
    </>
  );
}
