import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { IconArrowButton, IconArrowSlider } from '@/after/Icons';
import { cx } from '@/cx';

/* -------------------------------------------------------------- the wordmark */

/**
 * quay's mark.
 *
 * Rule 10: the brand marks are the one thing the series replaces rather than
 * copies. The reference's is a custom logotype with a coloured full stop in
 * the middle of the word; quay's is the same idea in the same place -- the
 * name set in the display face with the stop in the brand's pink -- at the two
 * sizes the reference uses it, 5.375rem in the header and the full page width
 * in the footer.
 */
export function Logo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1318 369"
      role="img"
      aria-label={title ?? 'quay.'}
      preserveAspectRatio="xMidYMid meet"
    >
      {/*
       * `textLength` with `lengthAdjust="spacingAndGlyphs"` pins the wordmark
       * to the box rather than to the metrics of whichever face has loaded,
       * which is what makes a substitute typeface safe to use for a logotype.
       *
       * The stop is a circle rather than a glyph, for the same reason the
       * reference draws its own: at this size a text period stretched to fill
       * a box is an oblong, and the whole point of the mark is a round dot in
       * the middle of the word.
       */}
      <text
        x="0"
        y="300"
        fontSize="369"
        fontWeight="700"
        letterSpacing="-0.04em"
        textLength="1130"
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
      >
        quay
      </text>
      <circle cx="1240" cy="222" r="78" fill="#f2a8d0" />
    </svg>
  );
}

/* ----------------------------------------------------------- the word rise */

/**
 * A line of text split into words, each in its own mask, for the page's
 * entrance. `as` keeps the real element -- an h1 stays an h1.
 */
export function Rise({
  as: Tag = 'span',
  text,
  className,
  variant,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  text: string;
  className?: string;
  variant?: 'slogan';
}) {
  const words = text.split(' ');
  return (
    <Tag className={className} data-rise={variant ?? 'standard'}>
      {words.map((word, i) => (
        <span className="q-rise" key={`${word}-${i}`}>
          <span className="q-rise__word" style={{ transitionDelay: `${i * 0.05}s` }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** The eyebrow and heading every block but the hero opens with. */
export function SectionHeader({
  label,
  heading,
  className,
}: {
  label: string;
  heading?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <Rise as="span" className="q-section-header__label" text={label} />
      {heading ? <Rise as="h2" className="q-section-header__heading" text={heading} /> : null}
    </header>
  );
}

/* ----------------------------------------------------------------- buttons */

/** The page's one button, with the arrow the reference sets as icon-font text. */
export function Button({
  as = 'button',
  href,
  children,
  className = '',
  variant,
  arrow = true,
  icon,
  onClick,
  type,
}: {
  as?: 'a' | 'button';
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: 'alt';
  arrow?: boolean;
  /** Overrides the arrow. The map button carries a pin; downloads an arrow. */
  icon?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const cls = ['q-btn', variant === 'alt' ? '-alt' : '', className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span>{children}</span>
      {icon ?? (arrow && variant !== 'alt' ? <IconArrowButton className="q-btn__icon" /> : null)}
    </>
  );
  if (as === 'a') {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type ?? 'button'} onClick={onClick}>
      {inner}
    </button>
  );
}

/** The round prev/next pair, used on every rail and gallery on the page. */
export function RailArrows({
  className,
  onPrev,
  onNext,
  label,
}: {
  className: string;
  onPrev: () => void;
  onNext: () => void;
  label: string;
}) {
  return (
    <div className={className}>
      <button type="button" aria-label={`Previous ${label}`} onClick={onPrev}>
        <IconArrowSlider size="1.5rem" />
      </button>
      <button type="button" aria-label={`Next ${label}`} onClick={onNext}>
        <IconArrowSlider size="1.5rem" />
      </button>
    </div>
  );
}

/* ----------------------------------------------------------- the galleries */

export type Photo = { readonly src: string; readonly alt: string };

/**
 * A photo gallery inside a card.
 *
 * Hand-rolled rather than Swiper, for one reason that matters here: these
 * galleries are invisible until the card they sit in is hovered, and a Swiper
 * inside a card whose *width* transitions has to be told to recalculate on
 * every frame of that transition or its slides sit at the old width. A fader
 * has nothing to recalculate.
 *
 * The reference's options are kept: one photograph at a time, looping, and
 * pagination and arrows only where there is more than one.
 */
export function Gallery({
  photos,
  paginationClass = 'q-gallery__pagination',
  navClass = 'q-gallery__nav',
  label,
}: {
  photos: readonly Photo[];
  paginationClass?: string;
  navClass?: string;
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const many = photos.length > 1;
  const go = (delta: number) => setIndex((i) => (i + delta + photos.length) % photos.length);

  return (
    <div className="q-gallery">
      {photos.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={i === 0 ? photo.alt : ''}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      ))}

      {many ? (
        <>
          <div className={paginationClass}>
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`${label}, photograph ${i + 1}`}
                aria-current={i === index}
                className={cx(
                  'swiper-pagination-bullet',
                  i === index && 'swiper-pagination-bullet-active',
                )}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <RailArrows
            className={navClass}
            label={label}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        </>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- the rail */

/**
 * A row of cards stepped one at a time, looping.
 *
 * The reference runs Swiper at `slidesPerView: 'auto'`, `loop: true` and
 * `allowTouchMove: false` for the two card rails, and `slidesPerView: 'auto'`
 * with the drag left on for the rooms gallery. Both are one transform on a
 * `max-content` row here, for the same reason the galleries are hand-rolled:
 * the cards change width under the pointer.
 *
 * The loop is a second copy of the row after the first. Stepping past the last
 * card slides into the copy, and once the transition has finished the index is
 * put back by `count` with the transition off -- so the row is endless and the
 * only cost is rendering each card twice.
 */
export function Rail({
  items,
  render,
  label,
  itemsClass = 'q-rail__items',
  navClass = 'q-rail__nav',
  paginationClass,
  draggable = false,
}: {
  items: readonly unknown[];
  render: (index: number, copy: number) => ReactNode;
  label: string;
  itemsClass?: string;
  navClass?: string;
  /** Set to draw a bullet a card under the rail, as the rooms gallery does. */
  paginationClass?: string;
  draggable?: boolean;
}) {
  const count = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const first = cards[0];
      const card = cards[index];
      if (!first || !card) return;
      setOffset(card.offsetLeft - first.offsetLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [index, count]);

  // Once the slide into the duplicate row has finished, jump back silently.
  useEffect(() => {
    if (index < count) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex((i) => i - count);
    }, 420);
    return () => window.clearTimeout(t);
  }, [index, count]);

  // Coming back past the first card is the same trick the other way round:
  // teleport forward a whole row with the transition off, then step back into
  // it on the next frame, so "previous" from card one slides rather than snaps.
  const pending = useRef<number | null>(null);
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => {
      setAnimate(true);
      if (pending.current !== null) {
        setIndex(pending.current);
        pending.current = null;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const step = (delta: number) => {
    if (delta < 0 && index === 0) {
      setAnimate(false);
      setIndex(count);
      pending.current = count - 1;
      return;
    }
    setIndex((i) => i + delta);
  };

  return (
    <>
      <div className={itemsClass}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: 'max-content',
            transform: `translateX(${-offset}px)`,
            transition: animate ? 'transform 0.4s cubic-bezier(0.47, 0.12, 0.5, 0.9)' : 'none',
            touchAction: draggable ? 'pan-y' : undefined,
          }}
        >
          {[0, 1].map((copy) => items.map((_, i) => render(i, copy)))}
        </div>
      </div>
      {paginationClass ? (
        <div className={paginationClass}>
          {items.map((_, i) => (
            <button
              key={`bullet-${i}`}
              type="button"
              aria-label={`${label} ${i + 1}`}
              aria-current={i === index % count}
              className={cx(
                'swiper-pagination-bullet',
                i === index % count && 'swiper-pagination-bullet-active',
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
      <RailArrows
        className={navClass}
        label={label}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
}
