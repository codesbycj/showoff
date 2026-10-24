import { useEffect, useState } from 'react';

import { Swoosh } from '@/after/Swoosh';
import { BRAND, NAV } from '@/content/site';
import { DUR, EASE } from '@/motion/motion';

/**
 * The header: a bar that sits over the hero and acquires a background once you
 * have left it.
 *
 * It is one of the few places where a fixed header earns its keep — this is a
 * page whose job is to get a facilities manager to book a call, and the button
 * that does it should never be more than a glance away. The compromise is that
 * it has to be legible over a photograph *and* over paper, which is why it
 * starts transparent with light type and swaps to bone with ink type at 80px
 * rather than trying to find one treatment that works on both.
 */
export function Shell() {
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[90]"
      style={{
        backgroundColor: past ? 'rgba(245, 242, 234, 0.92)' : 'transparent',
        backdropFilter: past ? 'blur(8px)' : 'none',
        borderBottom: past ? '1px solid rgba(18, 26, 38, 0.08)' : '1px solid transparent',
        transition: `background-color ${DUR.tint}s ${EASE.plain}, border-color ${DUR.tint}s ${EASE.plain}`,
      }}
    >
      <div className="cc flex items-center justify-between py-4">
        <a
          href="#top"
          className="flex items-baseline gap-2"
          aria-label={`${BRAND.name} — home`}
          style={{ color: past ? 'var(--color-ink)' : 'var(--color-bone)' }}
        >
          <Mark />
          <span className="font-display text-[23px] font-bold lowercase leading-none tracking-[-0.05em]">
            {BRAND.name}
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="u-link text-[15px]"
              style={{ color: past ? 'var(--color-ink)' : 'var(--color-bone)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#login"
            className="u-link text-[15px]"
            style={{ color: past ? 'var(--color-ink)' : 'var(--color-bone)' }}
          >
            Sign in
          </a>
          <Swoosh variant={past ? 'solid' : 'ghost'} className="text-[14px]">
            Book a walkthrough
          </Swoosh>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex size-10 items-center justify-center rounded-full lg:hidden"
          style={{
            backgroundColor: past ? 'transparent' : 'rgba(245, 242, 234, 0.15)',
            color: past ? 'var(--color-ink)' : 'var(--color-bone)',
          }}
        >
          <span className="relative block h-3 w-5">
            <span
              className="absolute left-0 block h-px w-5 bg-current transition-all"
              style={{
                top: open ? '6px' : '2px',
                transform: open ? 'rotate(45deg)' : 'none',
                transitionDuration: `${DUR.part}s`,
                transitionTimingFunction: EASE.snap,
              }}
            />
            <span
              className="absolute left-0 block h-px w-5 bg-current transition-all"
              style={{
                top: open ? '6px' : '10px',
                transform: open ? 'rotate(-45deg)' : 'none',
                transitionDuration: `${DUR.part}s`,
                transitionTimingFunction: EASE.snap,
              }}
            />
          </span>
        </button>
      </div>

      <div
        className="bg-bone overflow-hidden lg:hidden"
        style={{
          maxHeight: open ? '340px' : '0px',
          transition: `max-height ${DUR.sweep}s ${EASE.sweep}`,
        }}
      >
        <nav className="cc flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-ink py-2.5 text-[18px]"
            >
              {item.label}
            </a>
          ))}
          <Swoosh className="mt-3 self-start">Book a walkthrough</Swoosh>
        </nav>
      </div>
    </header>
  );
}

/** A chevron on its side: the verge of a road, and an arrow forward. */
function Mark() {
  return (
    <svg viewBox="0 0 18 16" className="w-[18px]" fill="none" aria-hidden="true">
      <path d="M1 15L9 1l8 14" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}
