import type { ReactNode } from 'react';

import { cx } from '@/cx';
import { CHAR, WORD } from '@/motion/motion';

/* ------------------------------------------------------------ the wordmark */

/**
 * crux's own mark, in the reference's place and at its two sizes (192×32 in
 * the header, 240×40 in the footer). A plumb line: the word, and a bob hanging
 * off a thread, because that is what the product is for — finding true.
 */
export function Wordmark({ className, dark = false }: { className?: string; dark?: boolean }) {
  const ink = dark ? '#ffffff' : '#181D1F';
  return (
    <svg viewBox="0 0 192 32" className={className} role="img" aria-label="crux">
      <g transform="translate(0 2)">
        <line x1="7" y1="0" x2="7" y2="15" stroke="#15AEEA" strokeWidth="2.5" />
        <path d="M7 15 L13.5 28 H0.5 Z" fill="#15AEEA" />
      </g>
      <text
        x="22"
        y="25"
        fontFamily="var(--font-archivo)"
        fontSize="30"
        fontWeight="700"
        letterSpacing="-0.02em"
        fill={ink}
      >
        crux
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------- the entrances */

/**
 * A line of text split into words, one `<span>` each, as the reference marks
 * up every heading and paragraph in its panels.
 */
export function Words({
  as: Tag = 'span',
  text,
  className,
  start = 0,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  text: string;
  className?: string;
  /** Lets a heading and the paragraph under it share one running stagger. */
  start?: number;
}) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="feat-word"
          style={{ transitionDelay: `${(start + i) * WORD.staggerS}s` }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

/**
 * The same thing one character at a time, which is what the "why" panel does.
 *
 * Words are kept whole in a `whitespace-nowrap` wrapper so a line can still
 * break between words and never inside one — the reference's own structure,
 * and the reason a per-character stagger does not turn into a ransom note.
 */
export function Chars({ text, className }: { text: string; className?: string }) {
  let n = 0;
  return (
    <p className={className}>
      {text.split(' ').map((word, w) => (
        <span className="inline-block whitespace-nowrap" key={`${word}-${w}`}>
          {[...word, ' '].map((ch, i) => {
            const delay = n++ * CHAR.staggerS;
            return (
              <span
                key={i}
                className="feat-word"
                style={{ transitionDelay: `${delay}s`, transitionDuration: '0.35s' }}
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}

/* ---------------------------------------------------------------- the shell */

/**
 * Every block on this page is the same object: a 32px-radius coloured panel
 * inside a 16px white gutter. There is no container and no column grid — the
 * panels are the grid.
 */
export function Panel({
  tone,
  className,
  children,
  id,
  label,
}: {
  tone: string;
  className?: string;
  children: ReactNode;
  id?: string;
  label?: string;
}) {
  return (
    <section className="bg-white px-4 pb-4 max-md:px-3 max-md:pb-3" id={id} aria-label={label}>
      <div className="mx-auto max-w-[1440px]">
        <div
          className={cx(
            'relative overflow-clip rounded-[32px] max-md:rounded-[28px]',
            tone,
            className,
          )}
          data-in
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * The one button on the page: a dark rounded rectangle that lightens when it
 * is *pressed*.
 *
 * `active:`, not `hover:`. The reference writes `active:bg-[#3A4248]` on this
 * anchor and nothing else -- it has no hover state at all, which is unusual
 * enough that the hover pass had to go back and check it. The stylesheet does
 * carry a `.hover:bg-[#232930]` rule, but no element on the home page uses it.
 */
export function TryButton({ className, big = false }: { className?: string; big?: boolean }) {
  return (
    <a
      href="#download"
      className={cx(
        'relative z-10 inline-flex items-center justify-center overflow-hidden rounded-[8px]',
        'bg-ink text-white no-underline transition-colors duration-150 active:bg-[#3A4248]',
        big ? 'px-7 py-3' : 'px-5 py-2',
        className,
      )}
    >
      <span
        className={cx(
          'font-archivo relative z-10 whitespace-nowrap font-medium tracking-[0.02em]',
          big ? 'text-[20px] leading-[28px]' : 'text-[18px] leading-[24px] max-md:text-[16px]',
        )}
      >
        Try now
      </span>
    </a>
  );
}

/**
 * The App Store badge, drawn: the real one is Apple's mark and comes out
 * (rule 10).
 *
 * Its hover is the reference's, copied exactly: the fill does not change at
 * all. A `div` fills the anchor at `rgba(255,255,255,0.15)` with
 * `backdrop-blur-md`, sits at `opacity-0`, and fades to 1 over 300ms
 * `ease-out` on `group-hover/btn`. The blur is the point -- the badge frosts
 * rather than lightening.
 */
export function StoreBadge() {
  return (
    <a
      href="#download"
      className="group/btn bg-ink relative block h-[74px] w-[220px] overflow-hidden rounded-[14px] text-white no-underline"
      aria-label="Download crux"
    >
      <span className="absolute inset-0 rounded-[14px] bg-white/15 opacity-0 backdrop-blur-md transition-opacity duration-300 ease-out group-hover/btn:opacity-100" />
      <span className="relative z-[1] flex h-full items-center gap-3 px-5">
        <svg viewBox="0 0 24 24" className="size-8 shrink-0" aria-hidden="true" fill="currentColor">
          <path d="M12 2.5l2.2 4.6 5 .7-3.6 3.6.9 5-4.5-2.4-4.5 2.4.9-5L4.8 7.8l5-.7z" />
        </svg>
        <span className="flex flex-col leading-none">
          <span className="font-archivo text-[12px] uppercase tracking-[0.08em] text-white/70">
            Download for
          </span>
          <span className="font-archivo mt-1 text-[22px] font-semibold">iPhone</span>
        </span>
      </span>
    </a>
  );
}
