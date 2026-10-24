import { BRAND, FOOTER, NAV } from '@/content/site';

/**
 * Four columns, a social row, a back-to-top, and a copyright bar.
 *
 * The address is here, at 14px, under "Quick links" — the same address the
 * modern design puts in a column of its own with the opening hours beside it.
 * Nothing is hidden; it is simply the ninth thing in the footer of an eleven-
 * block page.
 *
 * The social links are circles with letters in them, because the theme shipped
 * an icon font and nobody licensed the real one.
 */
export function Footer() {
  return (
    <>
      <footer className="b-foot">
        <div className="b-wrap b-row">
          <div style={{ float: 'left', width: '32%', paddingRight: '30px' }}>
            <h4>About {BRAND.name}</h4>
            <p style={{ fontSize: '13px' }}>{BRAND.blurb}</p>
            <ul style={{ marginTop: '14px' }}>
              {['in', 'X', 'f', 'ig'].map((s) => (
                <li key={s} style={{ display: 'inline-block', marginRight: '6px' }}>
                  <a
                    href="#social"
                    aria-label={s}
                    style={{
                      display: 'inline-block',
                      width: '30px',
                      height: '30px',
                      lineHeight: '30px',
                      textAlign: 'center',
                      border: '1px solid #3b5166',
                      borderRadius: '50%',
                      fontSize: '12px',
                    }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title} style={{ float: 'left', width: '22%', paddingRight: '20px' }}>
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

          <div style={{ float: 'left', width: '24%' }}>
            <h4>Get in touch</h4>
            <ul>
              {FOOTER.contact.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li style={{ paddingTop: '8px' }}>
                <a href={`tel:${FOOTER.contact.phone.replace(/\s/g, '')}`}>
                  {FOOTER.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${FOOTER.contact.email}`}>{FOOTER.contact.email}</a>
              </li>
              <li style={{ paddingTop: '8px', fontSize: '12px' }}>{FOOTER.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="b-wrap">
          <div className="b-foot-bar b-row">
            <div style={{ float: 'left' }}>
              © {new Date().getFullYear()} {BRAND.name} Ltd. All rights reserved. |{' '}
              <a href="#terms">Terms</a> | <a href="#privacy">Privacy</a> |{' '}
              <a href="#cookies">Cookie policy</a> | <a href="#sitemap">Sitemap</a>
            </div>
            <div style={{ float: 'right' }}>
              {NAV.map((n) => n.label).join(' · ')} &nbsp;
              <a href="#top">Back to top ↑</a>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: '#5d7082', paddingBottom: '20px' }}>
            {FOOTER.legal}
          </p>
        </div>
      </footer>
    </>
  );
}
