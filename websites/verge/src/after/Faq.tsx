import { useEffect, useRef, useState } from 'react';

import { Swoosh } from '@/after/Swoosh';
import { FAQ } from '@/content/site';
import { DUR, EASE } from '@/motion/motion';

/**
 * The questions finance asks first, with the heading beside them.
 *
 * The heading's emphasis is inverted — the sentence is in slate and only the
 * clause naming the thing people actually want to know is at full strength.
 * A reader scanning lands on it and picks up the sentence around it.
 *
 * Each row opens to its *measured* height rather than to `auto`, which cannot
 * be transitioned. The measurement is held in state and kept current by a
 * ResizeObserver: reading it off a ref during render means the first open
 * animates to whatever the height was last time, and these answers are long
 * enough that it shows.
 *
 * One row open at a time. Five open rows is a wall of text with headings in it.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="cc grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-24">
        <div className="wipe flex flex-col items-start gap-7">
          <span className="t-label text-slate">{FAQ.label}</span>
          <h2 className="t-h3 text-slate max-w-[22ch]">
            {FAQ.lead} <span className="text-ink">{FAQ.highlight}</span> {FAQ.tail}
          </h2>
          <Swoosh>{FAQ.cta}</Swoosh>
        </div>

        <ul className="wipe flex flex-col">
          {FAQ.items.map((item, i) => (
            <Row
              key={item.q}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
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
  onToggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLParagraphElement>(null);
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
    <li className="border-ink/12 border-t last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-8 py-6 text-left"
      >
        <span className="t-h3 max-w-[34ch]">{item.q}</span>
        {/* A plus that becomes a minus: one stroke turns, the other does not. */}
        <span aria-hidden="true" className="relative mt-2 block size-4 shrink-0">
          <span className="bg-ink absolute left-0 top-1/2 block h-px w-4" />
          <span
            className="bg-ink absolute left-0 top-1/2 block h-px w-4"
            style={{
              transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              transition: `transform ${DUR.part}s ${EASE.snap}`,
            }}
          />
        </span>
      </button>

      <div
        className="overflow-hidden"
        style={{
          height: isOpen ? `${height}px` : '0px',
          opacity: isOpen ? 1 : 0,
          transition: `height ${DUR.part}s ${EASE.sweep}, opacity ${DUR.part}s ${EASE.plain}`,
        }}
      >
        <p ref={innerRef} className="t-body text-slate max-w-[64ch] pb-7">
          {item.a}
        </p>
      </div>
    </li>
  );
}
