import { BRAND, FOOTER } from '@/content/site';
import { DUR, EASE } from '@/motion/motion';

/**
 * The footer, with the things a B2B site usually hides: an address, a phone
 * number and the hours a human answers it.
 *
 * Three link columns and a contact column, then the legal line. The one piece
 * of expression is the oversized wordmark along the bottom — a signature on
 * the work rather than a badge on top of it, and the only place in the design
 * where type is used purely as a shape.
 *
 * Links pick up the accent on hover rather than underlining, because the
 * footer already has more rules in it than anywhere else on the page and one
 * more would turn it into a grid.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-bone pb-8 pt-20 lg:pt-28">
      <div className="cc">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-5">
            <span className="t-label text-hivis">Visit</span>
            <address className="t-body text-bone/75 not-italic">
              {FOOTER.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="t-small text-bone/50">{FOOTER.contact.hours}</p>
            <div className="flex flex-col gap-1.5">
              <a href={`mailto:${FOOTER.contact.email}`} className="u-link t-body w-fit">
                {FOOTER.contact.email}
              </a>
              <a
                href={`tel:${FOOTER.contact.phone.replace(/\s/g, '')}`}
                className="u-link t-body w-fit"
              >
                {FOOTER.contact.phone}
              </a>
            </div>
          </div>

          {FOOTER.columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-5" aria-label={col.title}>
              <span className="t-label text-hivis">{col.title}</span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#footer"
                      className="t-body text-bone/70 hover:text-hivis"
                      style={{ transition: `color ${DUR.tint}s ${EASE.plain}` }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-bone/15 mt-16 border-t pt-7 lg:mt-24">
          <p className="t-small text-bone/45 max-w-[78ch]">{FOOTER.legal}</p>
          <p className="t-small text-bone/45 mt-2">
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.line}
          </p>
        </div>

        <div aria-hidden="true" className="mt-10 overflow-hidden lg:mt-14">
          <span className="font-display text-bone/10 block text-[26vw] font-bold lowercase leading-[0.75] tracking-[-0.06em]">
            {BRAND.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
