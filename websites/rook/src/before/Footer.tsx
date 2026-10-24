import { FOOTER, NAV, SUSTAIN } from '@/content/site';

/** Six columns of links, which is what a sitemap looks like when it is pasted into a footer. */
const COLUMNS: Array<{ title: string; links: string[] }> = [
  { title: 'Shop', links: FOOTER.columns[0].links },
  { title: 'Help', links: FOOTER.columns[1].links },
  {
    title: 'About us',
    links: ['Our story', 'The press', 'The team', 'Careers', 'Press enquiries', 'Awards'],
  },
  {
    title: 'Services',
    links: ['Trade accounts', 'Bulk orders', 'Samples', 'Finance', 'Gift vouchers', 'Showroom'],
  },
  {
    title: 'Categories',
    links: ['Dining chairs', 'Lounge chairs', 'Stacking', 'Outdoor', 'Spare parts', 'Clearance'],
  },
  {
    title: 'Connect',
    links: ['Instagram', 'Facebook', 'Pinterest', 'YouTube', 'Newsletter', 'Blog'],
  },
];

/**
 * The footer: thirty-six links in six columns, then a legal line, then a last
 * paragraph of keywords.
 *
 * This is the page's second navigation and it is larger than the first. It
 * exists because every department wanted its page linked from every page, and
 * a footer is the only place where that request can always be granted.
 *
 * The address is in here too, at 10px, between "Careers" and a copyright
 * notice -- the same address the modern design gives a column of its own.
 */
export function Footer() {
  return (
    <div className="b-foot">
      <div className="b-foot-in b-cf">
        {COLUMNS.map((col, i) => (
          <div
            key={col.title}
            // An array, not an interpolation: prettier's tailwind plugin eats
            // the space inside `${cond ? ' last' : ''}` and silently welds the
            // two class names together.
            className={['b-foot-col', i === COLUMNS.length - 1 ? 'last' : ''].join(' ').trim()}
          >
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#footer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="b-foot-in b-cf" style={{ paddingTop: 0 }}>
        <div className="b-foot-col" style={{ width: '330px' }}>
          <h4>Contact</h4>
          <div style={{ fontSize: '10px', color: '#555' }}>
            {FOOTER.contact.address.join(', ')}
            <br />
            Tel: <strong>{FOOTER.contact.phone}</strong> &mdash;{' '}
            <a href={`mailto:${FOOTER.contact.email}`}>{FOOTER.contact.email}</a>
            <br />
            {FOOTER.contact.hours}
          </div>
        </div>
        <div className="b-foot-col" style={{ width: '620px' }}>
          <h4>Also on this site</h4>
          <div style={{ fontSize: '10px' }}>
            {NAV.links
              .map((n) => n.label)
              .concat(['Take-back scheme', 'Guarantee', 'Delivery information', 'Sitemap'])
              .map((label, i, all) => (
                <span key={label}>
                  <a href="#footer">{label}</a>
                  {i < all.length - 1 ? ' | ' : ''}
                </span>
              ))}
          </div>
          <div style={{ fontSize: '10px', color: '#555', paddingTop: '4px' }}>{SUSTAIN.body}</div>
        </div>
      </div>

      <div className="b-legal">
        <p>
          &copy; 2011&ndash;2026 rook chair studio Ltd. All rights reserved. Registered in England
          &amp; Wales No. 7742019. VAT GB 114 8823 04. Prices include VAT. E&amp;OE.
        </p>
        <p>{FOOTER.legal}</p>
        <p>
          chairs | dining chairs | stacking chairs | cafe chairs | lounge chairs | contract seating
          | chairs uk | chairs yorkshire | buy chairs online | cheap chairs | chair spare parts |
          trade chairs | bulk chairs | chairs with free delivery
        </p>
      </div>
    </div>
  );
}
