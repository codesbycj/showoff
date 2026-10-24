import { useEffect, useRef, useState } from 'react';

import { FAQ as COPY } from '@/content/site';
import { FAQ, FAQ_DIM } from '@/motion/motion';
import { useMediaQuery } from '@/motion/useMediaQuery';

/**
 * The questions, beside a heading and an offer.
 *
 * Measured at 1440: the block is 1120 wide with 130px above and 200 below, the
 * heading column is 449 and the list is 520, and each question is its own
 * **sand card** -- `#f2ece2`, 16px corners, 24px of padding, 10px between them
 * -- rather than a row with a rule under it. That difference is most of the
 * look: a list of cards reads as a set of things you can open, where a list of
 * ruled rows reads as a table of contents.
 *
 * Three behaviours worth keeping:
 *
 *   * an answer opens by animating to its *measured* height rather than to
 *     `auto`, which cannot be transitioned. A ResizeObserver on the answer
 *     keeps that number current -- and it has to be state rather than a ref
 *     read during render, or the first open animates to whatever the height
 *     happened to be last time.
 *   * hovering one card dims the others to 0.3, but only above 991px and only
 *     while every card is shut. A dimmed card underneath an open answer reads
 *     as a bug, so the rule switches itself off the moment anything is open.
 *   * the heading's emphasis is inverted: the sentence is at 30% black and only
 *     the offer inside it is at full strength.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const wide = useMediaQuery(`(min-width: ${FAQ_DIM.minWidth + 1}px)`);
  const dimming = wide && open === null && hovered !== null;

  return (
    <section id="faq" className="px-5 lg:px-[160px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col justify-between gap-16 pb-[200px] pt-[130px] lg:flex-row lg:items-start lg:gap-[110px]">
        <div className="reveal flex flex-col items-start gap-10 lg:w-[449px] lg:shrink-0">
          <h2 className="text-[24px] font-medium leading-[120%] text-black/30">
            {COPY.lead} <span className="text-ink">{COPY.highlight}</span> {COPY.tail}
          </h2>
          <a
            href="#contact"
            className="bg-ink text-paper flex h-[60px] items-center rounded-full px-10 text-[15.2px] font-medium leading-[16.72px] transition-opacity duration-[400ms] hover:opacity-85"
          >
            {COPY.cta}
          </a>
        </div>

        <ul
          className="reveal flex flex-col gap-[10px] lg:w-[520px] lg:shrink-0"
          onMouseLeave={() => setHovered(null)}
        >
          {COPY.items.map((item, i) => (
            <Row
              key={item.q}
              item={item}
              isOpen={open === i}
              dimmed={dimming && hovered !== i}
              onToggle={() => setOpen(open === i ? null : i)}
              onHover={() => setHovered(i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Row({
  item,
  isOpen,
  dimmed,
  onToggle,
  onHover,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  dimmed: boolean;
  onToggle: () => void;
  onHover: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(() => setHeight(inner.offsetHeight));
    ro.observe(inner);
    setHeight(inner.offsetHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <li
      onMouseEnter={onHover}
      className="bg-sand flex flex-col gap-[3px] rounded-[16px] transition-opacity"
      style={{ opacity: dimmed ? FAQ_DIM.to : 1, transitionDuration: `${FAQ_DIM.durationMs}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-16 p-6 text-left"
      >
        <span className="text-[16px] font-medium leading-[140%]">{item.q}</span>
        {/* 27px tall, which is what sets a one-line card's height: 24 + 27 + 24
            = 75, plus the 3px gap under it = the reference's 78. */}
        <svg
          viewBox="0 0 18 27"
          className="h-[27px] w-[18px] shrink-0 transition-transform"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transitionDuration: `${FAQ.durationMs}ms`,
            transitionTimingFunction: FAQ.ease,
          }}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 3v20M2 16l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-[height,opacity]"
        style={{
          height: isOpen ? `${height}px` : '0px',
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${FAQ.durationMs}ms`,
          transitionTimingFunction: FAQ.ease,
        }}
      >
        {/* The card has no bottom padding of its own -- the reference puts a
            24px spacer element under the answer instead -- so this is where
            that air lives. */}
        <div ref={innerRef} className="px-6 pb-6 text-[13.5px] leading-[130%] text-black/50">
          {item.a}
        </div>
      </div>
    </li>
  );
}
