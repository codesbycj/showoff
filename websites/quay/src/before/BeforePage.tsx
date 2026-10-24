import { useState } from 'react';

import {
  announcement,
  apply,
  brand,
  extras,
  faq,
  hero,
  location,
  rooms,
  services,
  shared,
  subnav,
  tiles,
} from '@/content/site';
import { cx } from '@/cx';

/**
 * The before: quay's site as nine intakes of students left it.
 *
 * The angle is **the content-managed sprawl** (rule 3). Somebody paid for this
 * once; what happened since is that eleven people have had the keys and none
 * of them has ever had permission to delete anything. So the page carries four
 * separate navigations that grew one at a time, a banner from a campaign that
 * ended, three "temporary" notices, a sidebar of widgets nobody has looked at
 * since 2019, and every price in three different formats because three
 * different people typed them.
 *
 * It reads the same content deck as the after (rule 1): every room, every
 * price, every photograph, every service, every FAQ and the same application
 * form are on this page. They are simply in nine places, at 11px, below four
 * calls to action in four styles.
 *
 * Two things this page does that the after does not, and the README says so:
 * the phone number and the office hours are on it, and it has a date on the
 * bottom telling you when any of this was last true.
 */
export function BeforePage() {
  return (
    <div className="b">
      <UtilityBar />
      <Masthead />
      <MainNav />
      <QuickLinks />

      <div className="b__wrap">
        <p className="b__crumbs">
          <a href="#home">Home</a> &gt; <a href="#acc">Accommodation</a> &gt;{' '}
          <a href="#acc">Rooms &amp; Prices</a> &gt; All rooms (2026/27 intake)
        </p>

        <Banner />

        <p className="b__shout">
          {announcement.text} <em>BOOK TODAY!</em>
        </p>

        <div className="b__cols">
          <div className="b__main">
            <h1>Student accommodation in {brand.city} — rooms, prices and availability</h1>
            <p style={{ fontSize: 11, color: '#777', marginTop: -4 }}>
              Posted by <a href="#author">admin</a> on 14 March 2019 · Updated 2 September 2026 ·
              Filed under: Accommodation, Rooms, Prices, News, Uncategorised
            </p>
            <p>{hero.description}</p>

            <WelcomeBlocks />
            <RoomsSection />
            <SharedSection />
            <ServicesSection />
            <LocationSection />
            <ExtrasSection />
            <FaqSection />
            <ApplySection />
          </div>

          <Sidebar />
        </div>
      </div>

      <Footer />
      <CookieBar />
    </div>
  );
}

/* -------------------------------------------------- navigation, one of four */

function UtilityBar() {
  return (
    <div className="b__utility">
      <div className="b__wrap">
        <span className="b__textsize">
          Text size <button type="button">A</button> <button type="button">A</button>{' '}
          <button type="button">A</button>
        </span>
        <a href="#contrast">High contrast</a>
        <label>
          Translate:{' '}
          <select defaultValue="English">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
            <option>中文</option>
          </select>
        </label>
        <span className="b__spacer" />
        <a href="#portal">Student portal login</a>
        <a href="#staff">Staff login</a>
        <a href="#sitemap">Sitemap</a>
        <a href="#access">Accessibility statement</a>
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <div className="b__masthead">
      <div className="b__wrap">
        <div>
          <div className="b__logo">
            quay<span>.</span>
          </div>
          <div className="b__strap">
            “all included” student living — operated by {brand.operator} since 2014
          </div>
        </div>
        <div className="b__mast-right">
          Enquiries (Mon–Fri, 9am–5pm):
          <div className="b__phone">{brand.phone}</div>
          <div>
            or email <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
          <div className="b__badges">
            <span className="b__badge">ANUK Accredited</span>
            <span className="b__badge">Safe Student Homes</span>
            <span className="b__badge">Est. 2014</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Eleven items, because eleven people each added one. */
const MAIN_NAV = [
  'Home',
  'Accommodation',
  'Rooms & Prices',
  'Availability 26/27',
  'Shared spaces',
  'Services',
  'Location & travel',
  'Infopoint',
  'Journal',
  'For parents',
  'Contact us',
];

function MainNav() {
  return (
    <div className="b__nav">
      <div className="b__wrap">
        <ul>
          {MAIN_NAV.map((item, i) => (
            <li key={item} className={i === 2 ? '-on' : ''}>
              <a href={`#${item.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="b__quick">
      <div className="b__wrap">
        <strong>Quick links:</strong> <a href="#apply">Apply now</a> |{' '}
        <a href="#viewing">Book a viewing</a> | <a href="#brochure">Download the brochure (PDF)</a>{' '}
        | <a href="#prices">Price list 26/27</a> | <a href="#prices25">Price list 25/26</a> |{' '}
        <a href="#floorplans">Floor plans</a> | <a href="#faq">FAQs</a> |{' '}
        <a href="#terms">Tenancy terms</a> | <a href="#parents">Parents’ guide</a> |{' '}
        <a href="#news">Latest news</a>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="b__banner">
      <img src={hero.photo} alt={hero.photoAlt} />
      <span className="b__flag">New for 2024/25</span>
      <span className="b__flag -green">Rooms still available!</span>
      <div className="b__banner-caption">
        Welcome to quay. — {brand.street}, {brand.postcode}. Rooms from £619 per person per month,
        all bills included. <a href="#apply">Click here to apply</a>.
      </div>
    </div>
  );
}

/* --------------------------------------------------------- the main column */

function WelcomeBlocks() {
  return (
    <div className="b__sect">
      <h2>{tiles.heading}</h2>
      <div className="b__sect-body">
        <div className="b__welcome">
          {tiles.items.map((tile) => (
            <div key={tile.key}>
              <img src={tile.photos[0].src} alt={tile.photos[0].alt} />
              <h4>{tile.title}</h4>
              <p>{tile.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The prices, three times.
 *
 * Rule 3 says the before has to carry the same content, and it does: every one
 * of the ten rooms is here with its price and its features. It is also where
 * the sprawl shows hardest -- the summary table, the detail accordions and the
 * sidebar all quote prices, in three formats, because three people typed them.
 */
function RoomsSection() {
  const [open, setOpen] = useState<string | null>('single-1st floor');

  return (
    <div className="b__sect" id="prices">
      <h2>{rooms.label} — 2026/27 academic year</h2>
      <div className="b__sect-body">
        <p className="b__small">
          <strong>PLEASE NOTE:</strong> the table below is for the 26/27 intake. For 25/26 prices
          please see the <a href="#prices25">old price list</a> (still available for reference).
        </p>

        <table className="b__table">
          <thead>
            <tr>
              <th>Room type</th>
              <th>Floors</th>
              <th>Size</th>
              <th>Price (from)</th>
              <th>Per week*</th>
              <th>Availability</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rooms.types.map((type) => {
              const size = type.variants[0].features.find((f) => f.icon === 'size');
              const monthly = Number(type.variants[0].price.replace(/[^0-9.]/g, '')) || 0;
              return (
                <tr key={type.key}>
                  <td>
                    <strong>{type.title}</strong>
                  </td>
                  <td>{type.variants.map((v) => v.floor.replace(' floor', '')).join(', ')}</td>
                  <td>{size ? size.text.replace('Room size: ', '') : '—'}</td>
                  <td className="b__price">{type.price.replace('from ', '')}</td>
                  <td>{monthly ? `${(monthly / 4.33).toFixed(2)} GBP` : 'POA'}</td>
                  <td>{type.key === 'single' ? '2 left' : 'Available'}</td>
                  <td>
                    <button type="button" className="b__cta-c">
                      Enquire
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="b__small">
          * Weekly figure is indicative and is calculated by dividing the monthly rent by 4.33. The
          monthly rent is the contractual figure. Prices shown include all utilities, wi-fi, a
          monthly room clean and use of all shared spaces.
        </p>

        <h3>Full room details</h3>
        {rooms.types.flatMap((type) =>
          type.variants.map((variant) => {
            const key = `${type.key}-${variant.floor}`;
            return (
              <div className={cx('b__acc', open === key && '-open')} key={key}>
                <button type="button" onClick={() => setOpen(open === key ? null : key)}>
                  {type.title} — {variant.floor} — {variant.price}
                </button>
                <div className="b__acc-body">
                  <img src={variant.photos[0].src} alt={variant.photos[0].alt} />
                  <p>{variant.lead}</p>
                  {rooms.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 20)}>{paragraph}</p>
                  ))}
                  <p>
                    <strong>{brand.promise}</strong>
                  </p>
                  <table className="b__table">
                    <tbody>
                      {variant.features.map((feature) => (
                        <tr key={feature.text}>
                          <td>{feature.text}</td>
                          <td>Yes</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="b__cta-row">
                    <button type="button" className="b__cta-b">
                      Apply for this room
                    </button>
                    <button type="button" className="b__cta-c">
                      View the floor plan
                    </button>
                    <span className="b__small">Ref: {key.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

function SharedSection() {
  return (
    <div className="b__sect">
      <h2>{shared.label}</h2>
      <div className="b__sect-body">
        <ul className="b__spaces">
          {shared.items.map((item) => (
            <li key={item.key}>
              <strong>{item.title}</strong> — {item.body}
            </li>
          ))}
        </ul>
        <div className="b__thumbs">
          {shared.items.flatMap((item) =>
            item.photos.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} />),
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <div className="b__sect">
      <h2>{services.label} — what is included</h2>
      <div className="b__sect-body">
        <div className="b__two">
          {services.groups.map((group) => (
            <table className="b__table" key={group.key}>
              <thead>
                <tr>
                  <th colSpan={2}>{group.title}</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td>✔</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        <div className="b__cta-row">
          <button type="button" className="b__cta-c">
            {services.cta} (PDF, 14.2MB)
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationSection() {
  return (
    <div className="b__sect">
      <h2>{location.label} — getting about</h2>
      <div className="b__sect-body">
        <div className="b__two">
          <table className="b__table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {location.items.map((item) => (
                <tr key={item.text}>
                  <td>{item.text}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <img
              src={location.map}
              alt={location.mapAlt}
              style={{ width: '100%', border: '1px solid #ccc' }}
            />
            <p className="b__small" style={{ marginTop: 4 }}>
              {location.card.address}. {location.card.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExtrasSection() {
  return (
    <div className="b__sect">
      <h2>{extras.label}</h2>
      <div className="b__sect-body">
        <ul className="b__extras">
          {extras.items.map((item) => (
            <li key={item.key}>
              {item.free ? <span className="b__free">FREE!!</span> : null}{' '}
              <strong>{item.title}</strong> — {item.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <div className="b__sect" id="faq">
      <h2>{faq.label} — frequently asked questions</h2>
      <div className="b__sect-body">
        <dl className="b__faq">
          {faq.items.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              {item.a.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
              {'list' in item && item.list ? (
                <dd>
                  <ul>
                    {item.list.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </dd>
              ) : null}
              {'tail' in item && item.tail ? item.tail.map((l) => <dd key={l}>{l}</dd>) : null}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function ApplySection() {
  const [sent, setSent] = useState(false);

  return (
    <div className="b__sect" id="apply">
      <h2>Application / enquiry form</h2>
      <div className="b__sect-body b__form">
        <p className="b__small">
          Fields marked <span className="b__req">*</span> are required. Please allow up to 5 working
          days for a reply. Do not use this form for maintenance requests — use the{' '}
          <a href="#portal">student portal</a>.
        </p>

        {sent ? (
          <p>
            <strong>{apply.thanksTitle}</strong> {apply.thanksBody}
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <table className="b__table">
              <tbody>
                <tr>
                  <td>I am a…</td>
                  <td>
                    {apply.roles.map((role, i) => (
                      <label key={role} style={{ marginRight: 10 }}>
                        <input type="radio" name="brole" defaultChecked={i === 0} /> {role}
                      </label>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>
                    {apply.fields.name.label.replace('*', '')} <span className="b__req">*</span>
                  </td>
                  <td>
                    <input type="text" name="bname" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    {apply.fields.lastname.label.replace('*', '')} <span className="b__req">*</span>
                  </td>
                  <td>
                    <input type="text" name="blast" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    {apply.fields.email.label.replace('*', '')} <span className="b__req">*</span>
                  </td>
                  <td>
                    <input type="email" name="bemail" required />
                  </td>
                </tr>
                <tr>
                  <td>{apply.fields.phone.label}</td>
                  <td>
                    <input type="tel" name="bphone" />
                  </td>
                </tr>
                <tr>
                  <td>{apply.fields.roomType.label}</td>
                  <td>
                    <select name="broom" defaultValue={apply.roomOptions[0]}>
                      {apply.roomOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>{apply.fields.heard.label}</td>
                  <td>
                    <select name="bheard" defaultValue={apply.heardOptions[0]}>
                      {apply.heardOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>{apply.fields.extra.label}</td>
                  <td>
                    <textarea name="bextra" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <label>
                      <input type="checkbox" required /> {apply.consent}
                      <a href="#privacy">{apply.privacy}</a>.
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="b__cta-row">
              <button type="submit" className="b__cta-a">
                SUBMIT ENQUIRY
              </button>
              <button type="button" className="b__cta-d">
                APPLY NOW!
              </button>
              <button type="button" className="b__cta-b">
                Book a viewing
              </button>
              <button type="button" className="b__cta-c">
                Download the brochure
              </button>
              <span className="b__small">or call {brand.phone}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------- navigation four, plus widgets */

function Sidebar() {
  return (
    <div className="b__side">
      <div className="b__box">
        <h4>In this section</h4>
        <ul>
          {subnav.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href="#prices25">Price list 25/26</a>
          </li>
          <li>
            <a href="#prices24">Price list 24/25</a>
          </li>
          <li>
            <a href="#floorplans">Floor plans</a>
          </li>
          <li>
            <a href="#terms">Tenancy terms</a>
          </li>
          <li>
            <a href="#parents">Parents’ guide</a>
          </li>
          <li>
            <a href="#covid">Covid-19 information</a>
          </li>
        </ul>
      </div>

      <div className="b__box">
        <h4>Apply</h4>
        <div className="b__box-body" style={{ textAlign: 'center' }}>
          <button type="button" className="b__cta-d">
            APPLY NOW!
          </button>
          <p className="b__small" style={{ marginTop: 6, marginBottom: 0 }}>
            Rooms from £619 pppm
          </p>
        </div>
      </div>

      <div className="b__box">
        <h4>Opening hours</h4>
        <div className="b__box-body">
          Reception desk: 24 hours
          <br />
          Enquiries: Mon–Fri 9am–5pm
          <br />
          Viewings: Sat 10am–2pm
          <br />
          <strong>{brand.phone}</strong>
        </div>
      </div>

      <div className="b__box b__news">
        <h4>Latest news</h4>
        <ul>
          <li>
            <span className="b__date">12 November 2021</span>
            <a href="#news1">New bike store now open!</a>
          </li>
          <li>
            <span className="b__date">3 October 2019</span>
            <a href="#news2">Freshers’ week — what’s on at quay.</a>
          </li>
          <li>
            <span className="b__date">18 July 2019</span>
            <a href="#news3">Summer works: lift maintenance 22–26 July</a>
          </li>
        </ul>
      </div>

      <div className="b__box">
        <h4>Find us on Facebook</h4>
        <div className="b__box-body">
          <div className="b__fbfeed">
            This content requires cookies. <a href="#cookies">Accept cookies</a> to view it.
          </div>
        </div>
      </div>

      <div className="b__box">
        <h4>Visitors</h4>
        <div className="b__box-body">
          <div className="b__counter">00428117</div>
          <p className="b__small" style={{ marginBottom: 0, textAlign: 'center' }}>
            since 11/09/2014
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- the footer */

function Footer() {
  return (
    <div className="b__footer">
      <div className="b__wrap">
        <div className="b__footer-cols">
          <div>
            <h5>Accommodation</h5>
            <ul>
              <li>
                <a href="#rooms">Rooms &amp; prices</a>
              </li>
              <li>
                <a href="#prices25">Prices 25/26</a>
              </li>
              <li>
                <a href="#prices24">Prices 24/25</a>
              </li>
              <li>
                <a href="#floorplans">Floor plans</a>
              </li>
              <li>
                <a href="#terms">Tenancy terms</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>About</h5>
            <ul>
              <li>
                <a href="#about">About quay.</a>
              </li>
              <li>
                <a href="#operator">{brand.operator}</a>
              </li>
              <li>
                <a href="#jobs">Work with us</a>
              </li>
              <li>
                <a href="#news">News archive</a>
              </li>
              <li>
                <a href="#covid">Covid-19 information</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Help</h5>
            <ul>
              <li>
                <a href="#faq">FAQs</a>
              </li>
              <li>
                <a href="#portal">Student portal</a>
              </li>
              <li>
                <a href="#maintenance">Report a fault</a>
              </li>
              <li>
                <a href="#complaints">Complaints procedure</a>
              </li>
              <li>
                <a href="#parents">Parents’ guide</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <p style={{ margin: 0 }}>
              quay.
              <br />
              {brand.street}
              <br />
              {brand.postcode}
              <br />
              <strong>{brand.phone}</strong>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </div>
          <div>
            <h5>Follow</h5>
            <ul>
              <li>
                <a href="#instagram">Instagram</a>
              </li>
              <li>
                <a href="#facebook">Facebook</a>
              </li>
              <li>
                <a href="#x">X (Twitter)</a>
              </li>
              <li>
                <a href="#yt">YouTube</a>
              </li>
              <li>
                <a href="#rss">RSS feed</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="b__legal">
          <span>{brand.legal}</span>
          <a href="#privacy">Privacy policy</a>
          <a href="#cookies">Cookie policy</a>
          <a href="#terms">Terms &amp; conditions</a>
          <a href="#access">Accessibility</a>
          <a href="#sitemap">Sitemap</a>
          <span className="b__spacer" style={{ flex: 1 }} />
          <span>Site last updated: 14/03/2019</span>
        </div>
      </div>
    </div>
  );
}

function CookieBar() {
  return (
    <div className="b__cookie">
      <div className="b__wrap">
        <span>
          This website uses cookies to improve your experience. We’ll assume you’re ok with this,
          but you can opt out if you wish. <a href="#cookies">Read more</a>
        </span>
        <button type="button" className="b__cta-a">
          Accept
        </button>
        <button type="button" className="b__cta-c">
          Cookie settings
        </button>
      </div>
    </div>
  );
}
