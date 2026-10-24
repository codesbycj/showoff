import { FOOTER } from '@/content/site';

/** jQuery's `swing`, which is the easing every scroll-to-top on the web had. */
const swing = (p: number) => 0.5 - Math.cos(p * Math.PI) / 2;
const SCROLL_MS = 600;

/**
 * Three floated columns, a centred legal block, and a link that scrolls you
 * back up.
 *
 * The scroll is `$('html, body').animate({scrollTop: 0}, 600)` rebuilt by hand:
 * 600ms on jQuery's `swing`, which is a cosine and therefore eases at both
 * ends. It predates `scroll-behavior: smooth` by about seven years and is a
 * better curve than it -- the browser's own smooth scroll is close to linear
 * with a hard stop. Worth knowing before dismissing the era wholesale.
 *
 * The footer also carries the two lines the modern page has nowhere to put: who
 * built it, and when it was last touched. Both were a point of pride.
 */
export function Footer() {
  const toTop = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, 0);
      return;
    }
    const from = window.scrollY;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / SCROLL_MS, 1);
      window.scrollTo(0, from * (1 - swing(p)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="b-foot">
      <div className="b-foot-in b-cf">
        <div className="b-foot-col">
          <h4>Quick Links</h4>
          <ul>
            {FOOTER.columns[0].links.map((link) => (
              <li key={link}>
                &raquo; <a href="#footer">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="b-foot-col">
          <h4>Information</h4>
          <ul>
            {FOOTER.columns[1].links.map((link) => (
              <li key={link}>
                &raquo; <a href="#footer">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="b-foot-col b-foot-col-last">
          <h4>Contact Us</h4>
          <ul>
            <li>Ember Health Ltd</li>
            <li>Unit 4b, Pennine Business Park</li>
            <li>Oldham Road, Manchester M24 1SX</li>
            <li>&nbsp;</li>
            <li>
              Telephone: <strong style={{ color: '#f6d173' }}>0161 496 0112</strong>
            </li>
            <li>Facsimile: 0161 496 0113</li>
            <li>
              E-mail: <a href="#contact">sales@emberhealth.co.uk</a>
            </li>
            <li>&nbsp;</li>
            <li>
              <a href="#top" onClick={toTop}>
                Back to top of page &uarr;
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="b-legal">
        <p>
          &copy; Copyright 2009&ndash;2012 Ember Health Ltd. All Rights Reserved. | Registered in
          England &amp; Wales No. 6841229 | VAT No. GB 104 2288 31
        </p>
        <p>{FOOTER.legal}</p>
        <p>
          Website design and hosting by <a href="#webworks">WebWorks Media</a> | Last updated: 14th
          March 2012 | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms</a> |{' '}
          <a href="#sitemap">Site Map</a>
        </p>
      </div>
    </div>
  );
}
