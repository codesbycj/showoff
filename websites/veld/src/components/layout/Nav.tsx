import { useEffect, useRef, useState } from 'react';

import { Monogram } from '@/components/layout/Monogram';
import { DRIVER, NAV_LINKS, SOCIALS } from '@/data/home';
import { gsap } from '@/motion/gsap';
import { EASE } from '@/motion/motion';
import { useSmoothScroll } from '@/motion/useSmoothScroll';

/**
 * The header, and the full-screen panel behind it.
 *
 * The panel takes its own scroll lock rather than setting `overflow: hidden`
 * directly: the loader holds one too, and whichever released last would
 * otherwise re-enable scrolling underneath the other. See `SmoothScroll`.
 */
export function Nav({ hidden }: { hidden: boolean }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const { lock, unlock, scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (open) lock('nav');
    else unlock('nav');
  }, [open, lock, unlock]);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-nav-item]');

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { autoAlpha: 1, pointerEvents: 'auto' });
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: EASE.ui },
        );
        gsap.fromTo(
          items,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, stagger: 0.05, delay: 0.15, ease: 'expo.out' },
        );
      } else {
        gsap.to(el, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.45,
          ease: 'power2.in',
          onComplete: () => gsap.set(el, { autoAlpha: 0, pointerEvents: 'none' }),
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  const jump = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(href), 380);
  };

  return (
    <>
      <header
        className={`px-gutter fixed inset-x-0 top-0 z-50 flex items-center justify-between py-6 transition-opacity duration-500 ${
          hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <a href="#hero" className="text-paper relative z-10">
          <Monogram className="h-7 w-auto" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="bg-signal text-ink relative z-10 grid size-10 place-items-center rounded-xs"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`bg-ink absolute left-0 block h-0.5 w-full transition-transform duration-300 ${
                open ? 'top-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`bg-ink absolute left-0 block h-0.5 w-full transition-transform duration-300 ${
                open ? 'top-1/2 -rotate-45' : 'top-full'
              }`}
            />
          </span>
        </button>
      </header>

      <div
        ref={panel}
        className="bg-ink text-paper fixed inset-0 z-40 flex flex-col justify-center opacity-0"
        style={{ pointerEvents: 'none' }}
      >
        <nav className="px-gutter">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="overflow-hidden">
                <button
                  data-nav-item
                  type="button"
                  onClick={() => jump(link.href)}
                  className="font-display text-display hover:text-signal block w-full py-1 text-left uppercase transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-gutter text-body-sm mt-12 flex flex-wrap gap-x-8 gap-y-2 opacity-60">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-signal transition-colors">
              {s.label}
            </a>
          ))}
          <span>{DRIVER.email}</span>
        </div>
      </div>
    </>
  );
}
