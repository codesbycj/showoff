import { useState } from 'react';

import { Icon, Wordmark } from '@/after/Marks';
import { Button, TextLink } from '@/after/Ui';
import { announcement, brand, footer, nav } from '@/content/site';
import { cx } from '@/cx';

/* ----------------------------------------------------------- the dark strip */

/**
 * `sticky` with no offset, which is what the reference writes. It is a no-op:
 * the bar stays in the flow and scrolls away, and only the header below it
 * pins. Copied as written, because `sticky top-0` instead leaves a dark strip
 * over the page for its whole length — which is what this looked like until it
 * was checked against the reference's own band at the same scroll position.
 */
export function AnnouncementBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-primary-2 sticky flex items-center justify-center gap-2 px-6 py-2 text-white">
      <p className="p-small text-white">
        <a className="p-small text-white underline-offset-2 hover:underline" href="#keynote">
          {announcement.text} <strong className="font-inter-semibold">{announcement.cta}</strong>
        </a>
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close this announcement"
        className="ml-2 grid size-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------- the header */

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cx(
        'sticky top-0 z-30 flex min-h-[58px] w-full items-center justify-center',
        'bg-primary-3 border-b border-[#E8EDEB] transition-colors duration-300 lg:min-h-[80px]',
      )}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" className="lg:mr-8" aria-label={`${brand.name}, home`}>
          <Wordmark className="lg:w-21.5 w-24" />
        </a>

        <div className="flex w-full items-center justify-between gap-6">
          <nav className="max-lg:hidden" aria-label="Main">
            <ul className="flex list-none items-center">
              {nav.primary.map((item) => (
                <li key={item.label} className="relative flex items-center lg:min-h-20">
                  <a
                    href={item.href}
                    className="p-small font-inter-medium text-primary-2 hover:text-primary-11 group relative flex cursor-pointer items-center gap-x-1 whitespace-nowrap p-3 no-underline transition-colors"
                  >
                    {item.label}
                    {item.menu ? (
                      <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                        <path
                          d="M3 5l3 3 3-3"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          fill="none"
                        />
                      </svg>
                    ) : null}
                  </a>
                </li>
              ))}
              <li className="relative flex items-center lg:min-h-20">
                <a
                  href={nav.accent.href}
                  className="p-small font-inter-medium text-primary-10 flex items-center gap-x-1 whitespace-nowrap p-3 no-underline transition-colors hover:text-[#17502C]"
                >
                  <span className="bg-primary-1 size-1.5 rounded-full" aria-hidden="true" />
                  {nav.accent.label}
                </a>
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="font-inter-medium text-primary-2 hidden text-[14px] lg:inline">
              {nav.locale}
            </span>
            <Button
              href="#login"
              variant="ghost"
              size="sm"
              roll
              arrow={false}
              className="max-lg:hidden"
            >
              {nav.login}
            </Button>
            <Button href="#demo" variant="dark" size="sm" roll arrow={false}>
              {nav.cta}
            </Button>

            <button
              type="button"
              className="grid size-9 place-items-center lg:hidden"
              aria-expanded={open}
              aria-label={open ? 'Close the menu' : 'Open the menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-5 flex-col gap-1">
                <span
                  className={cx(
                    'bg-primary-2 block h-px transition-transform duration-300',
                    open && 'translate-y-[5px] rotate-45',
                  )}
                />
                <span
                  className={cx('bg-primary-2 block h-px transition-opacity', open && 'opacity-0')}
                />
                <span
                  className={cx(
                    'bg-primary-2 block h-px transition-transform duration-300',
                    open && '-translate-y-[5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-greyscale-9 absolute left-0 right-0 top-full border-b bg-white px-4 py-4 lg:hidden">
          <ul className="flex list-none flex-col">
            {[...nav.primary, nav.accent].map((item) => (
              <li key={item.label} className="border-greyscale-9 border-b last:border-b-0">
                <a
                  href={item.href}
                  className="p-small font-inter-medium text-primary-2 block py-3 no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

/* ------------------------------------------------------------- the footer */

export function Footer() {
  return (
    <footer className="z-1 border-greyscale-2 bg-primary-2 relative border-b">
      <div className="container-x">
        {/* the closing call, on its own 472px band */}
        <section className="relative flex h-[472px] flex-col items-center overflow-hidden max-md:h-[415px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_120%,rgba(47,206,101,0.35),transparent_70%)]"
          />
          <div className="z-1 pt-22 relative flex w-[529px] max-w-full flex-col items-center gap-8 max-md:w-full max-md:gap-6 max-md:px-6 max-md:pt-14">
            <h2 className="font-pangea-medium m-0 text-center text-[34px] leading-[1.11] text-white max-md:text-[24px]">
              {footer.cta.heading}
            </h2>
            <p className="p-medium text-primary-9 text-center">{footer.cta.body}</p>
            <div className="flex items-center gap-4 max-md:w-full max-md:flex-col">
              <Button href="#demo" variant="primary" roll>
                {footer.cta.primary}
              </Button>
              <Button href="#sales" variant="ghost-dark" roll>
                {footer.cta.secondary}
              </Button>
            </div>
          </div>
        </section>

        <div className="border-greyscale-2 flex items-stretch justify-start border-x border-y max-lg:flex-col">
          <div className="border-greyscale-2 flex-[0_0_412px] border-r px-8 py-10 max-lg:w-full max-lg:flex-none max-lg:border-b max-lg:border-r-0 max-lg:px-6 max-lg:py-8">
            <Wordmark className="mb-0 h-7 w-auto" dark />
            <p className="p-small text-greyscale-5/80 mt-6">
              Over 100,000 people read the vane briefing for the ESG news that actually moves a
              number.
            </p>
            <form className="mt-4 flex flex-col" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="vane-newsletter">
                Your work email
              </label>
              <input
                id="vane-newsletter"
                type="email"
                placeholder="name@company.com"
                className="p-small border-primary-7 bg-primary-7 text-primary-9 placeholder:text-primary-9 h-12 w-full rounded-[2px] border px-4 py-2 shadow-none outline-none"
              />
              <p className="text-greyscale-7 mb-4 mt-1.5 text-[11px]">
                By subscribing you agree to the{' '}
                <a href="#privacy" className="underline">
                  privacy policy
                </a>
                .
              </p>
              <Button href="#subscribe" variant="primary" className="w-fit">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="flex flex-1 flex-wrap gap-10 p-10 max-lg:gap-8 max-lg:p-6">
            {footer.columns.map((column) => (
              <div
                key={column.title}
                className="w-[calc((100%-10rem)/5)] min-w-[140px] flex-none max-lg:w-[calc((100%-2rem)/2)]"
              >
                <h3 className="p-small font-inter-medium text-greyscale-6 mb-6 tracking-[-0.28px]">
                  {column.title}
                </h3>
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#footer"
                        className="p-small text-greyscale-5 flex items-center gap-2 whitespace-nowrap tracking-[-0.28px] no-underline transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-greyscale-2 flex items-center justify-between gap-6 border-x border-b px-8 py-6 max-lg:flex-col max-lg:items-start max-lg:px-6">
          <p className="font-inter text-greyscale-7 text-[12px]">{footer.address}</p>
          <div className="flex items-center gap-6">
            {footer.social.map((s) => (
              <TextLink key={s} href="#social" dark>
                {s}
              </TextLink>
            ))}
          </div>
          <p className="font-inter text-greyscale-7 text-[12px]">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * The line the page ends on.
 *
 * A 250px band pinned behind the footer: as you reach the bottom the footer
 * slides off it and this is what is left. The reference puts a photograph and
 * a 90% gradient behind one 18px sentence; this puts the same sentence over
 * the same gradient, drawn.
 */
export function ClosingBand() {
  return (
    <section className="-z-1 bg-primary-11 sticky bottom-0 flex h-[250px] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_20%_100%,rgba(47,206,101,0.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,24,0.92)_0%,rgba(3,31,24,0.55)_100%)] opacity-90" />
      </div>
      <div className="z-1 relative max-w-[996px] text-center max-md:px-6">
        <p className="font-inter-semibold m-0 text-[18px] leading-[1.5] text-white">
          {footer.closing}
        </p>
      </div>
      <span className="sr-only">
        <Icon name="star" />
      </span>
    </section>
  );
}
