import { Reveal } from '@/components/ui/Reveal';
import { FOOTER, NAV } from '@/data/home';
import { useSmoothScroll } from '@/motion/useSmoothScroll';

import { Wordmark } from './Wordmark';

/** Offices, socials and the way back to the top. */
export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="bg-backdrop text-paper px-5 pt-16 pb-8 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex flex-wrap items-center justify-between gap-6 border-b border-white/15 pb-8">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {NAV.map((item) => (
              <span key={item} className="opacity-70">
                {item}
              </span>
            ))}
          </nav>
          <Wordmark className="text-xl" />
        </Reveal>

        <Reveal className="grid gap-10 py-10 sm:grid-cols-2 md:grid-cols-4" delay={0.05}>
          {FOOTER.offices.map((office) => (
            <div key={office.city} className="text-xs leading-relaxed">
              <h2 className="mb-2">{office.city}</h2>
              <address className="not-italic opacity-60">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-2 block">{office.phone}</span>
                <span className="link-underline mt-1 inline-block">E-mail</span>
              </address>
            </div>
          ))}

          <div className="flex gap-5 text-xs md:col-start-4 md:justify-end">
            {FOOTER.socials.map((social) => (
              <span key={social} className="link-underline opacity-70">
                {social}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-[0.6875rem] opacity-60">
          <span>{FOOTER.copyright}</span>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-2"
          >
            {FOOTER.backToTop}
            <span
              aria-hidden
              className="transition-transform duration-[--dur-ui] ease-[--ease-ui] group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </button>
          <span>A front-end study. IOTA is not a real practice.</span>
        </div>
      </div>
    </footer>
  );
}
