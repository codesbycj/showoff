import { useEffect, useRef, useState } from 'react';

import { IconArrowDownload, IconMap } from '@/after/Icons';
import { Button, Gallery, Rail, Rise, SectionHeader } from '@/after/Parts';
import { extras, faq, location, services, shared, slogan, tiles } from '@/content/site';
import { BARS } from '@/motion/motion';
import { cx } from '@/cx';

/* ------------------------------------------------------------- the slogan */

/**
 * Five lines laid across the page in one wrapping flex row, with a shape or a
 * masked photograph between each pair. The indents nobody could design by hand
 * are a side effect: the shapes are flex items like the words, so the lines
 * break and centre themselves around them.
 *
 * The shapes start at `scale: 0` and spin in from 120 degrees when the block
 * arrives, 0.15s apart, on `back.out(1.7)`.
 */
export function Slogan() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setShown(e.isIntersecting)),
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pop = (i: number) => ({
    scale: shown ? 1 : 0,
    rotate: shown ? '0deg' : '120deg',
    transition: `scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + 0.15 * i}s, rotate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + 0.15 * i}s`,
  });

  return (
    <section className="q-slogan">
      <div className="q-slogan__container q__container">
        <div className="q-slogan__items" ref={ref}>
          <Word line={0} />
          <figure className="q-slogan__image -image-1" style={pop(0)}>
            <img src={slogan.photos[0].src} alt={slogan.photos[0].alt} loading="lazy" />
          </figure>
          <Word line={1} />
          <span className="q-slogan__shape -shape-1" style={pop(1)} />
          <Word line={2} />
          <span className="q-slogan__shape -shape-2" style={pop(2)} />
          <Word line={3} />
          <span className="q-slogan__shape -shape-3" style={pop(3)} />
          <Word line={4} />
          <figure className="q-slogan__image -image-2" style={pop(4)}>
            <img src={slogan.photos[1].src} alt={slogan.photos[1].alt} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}

/** One slogan line, with its one wonky letter. */
function Word({ line }: { line: number }) {
  const { text, wonk } = slogan.lines[line];
  if (wonk < 0) {
    return <Rise as="span" className="q-slogan__word" text={text} variant="slogan" />;
  }
  return (
    <div className="q-slogan__word" data-rise="slogan">
      <span className="q-rise">
        <span className="q-rise__word">
          {text.slice(0, wonk)}
          <em>{text[wonk]}</em>
          {text.slice(wonk + 1)}
        </span>
      </span>
    </div>
  );
}

/* -------------------------------------------------------------- the tiles */

/**
 * Four cards in one flex row. The one under the pointer takes a third of the
 * row and the other three share what is left; the copy only exists in the wide
 * one and fades in a quarter second behind the width, so the words arrive
 * after the box has stopped moving.
 *
 * The first card carries `-active` until the pointer has been somewhere, which
 * is what the reference does -- a row of four identical narrow cards with no
 * copy in any of them is not a resting state anyone would ship.
 */
export function Tiles() {
  const [active, setActive] = useState(0);

  return (
    <section className="q-tiles" id="welcome">
      <div className="q-tiles__container q__container">
        <SectionHeader
          className="q-tiles__header q-section-header"
          label={tiles.label}
          heading={tiles.heading}
        />

        <div className="q-tiles__items">
          {tiles.items.map((tile, i) => (
            <div
              key={tile.key}
              className={cx('q-tile', i === active && '-active')}
              onMouseEnter={() => setActive(i)}
            >
              <div className="q-tile__photos">
                <Gallery photos={tile.photos} label={tile.title} />
              </div>
              <div className="q-tile__content">
                <h3 className="q-tile__heading">{tile.title}</h3>
                <p className="q-tile__description">{tile.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- the shared spaces */

export function SharedSpaces() {
  return (
    <section className="q-rail" id="shared">
      <div className="q__container">
        <SectionHeader
          className="q-rail__header q-section-header"
          label={shared.label}
          heading={shared.heading}
        />

        <Rail
          items={shared.items}
          label="shared space"
          render={(i, copy) => {
            const item = shared.items[i];
            return (
              <article className="q-rail__item" key={`${item.key}-${copy}`}>
                <div className="q-rail__item-photos">
                  <Gallery photos={item.photos} label={item.title} />
                </div>
                <div className="q-rail__item-content">
                  <h3 className="q-rail__item-heading">{item.title}</h3>
                  <div className="q-rail__item-description">
                    <p>{item.body}</p>
                  </div>
                </div>
              </article>
            );
          }}
        />
      </div>

      <Marquee />
    </section>
  );
}

/**
 * The four-word marquee under the shared spaces.
 *
 * Two copies of the run, the pair translated half its width over 20 seconds.
 * The reference builds this at runtime -- it clones its own contents, measures
 * the copy and writes a keyframe with that number in it -- which means its
 * marquee is wrong after a resize. Two copies and -50% is the same motion and
 * survives one.
 */
function Marquee() {
  const run = (copy: number) => (
    <div className="q-marquee__run" key={copy} aria-hidden={copy > 0}>
      <span className="q-marquee__item -shape-1" />
      <span className="q-marquee__item -text">{shared.marquee.words[0]}</span>
      <figure className="q-marquee__item -image -image-1">
        <img src={shared.marquee.photos[0].src} alt="" loading="lazy" />
      </figure>
      <span className="q-marquee__item -text">{shared.marquee.words[1]}</span>
      <span className="q-marquee__item -shape-2" />
      <span className="q-marquee__item -text">{shared.marquee.words[2]}</span>
      <figure className="q-marquee__item -image -image-2">
        <img src={shared.marquee.photos[1].src} alt="" loading="lazy" />
      </figure>
      <span className="q-marquee__item -text">{shared.marquee.words[3]}</span>
    </div>
  );

  return (
    <div className="q-marquee">
      <div className="q-marquee__track">{[0, 1].map(run)}</div>
    </div>
  );
}

/* ----------------------------------------------------------- the services */

/**
 * Two accordion rows, each with a photograph that appears beside it.
 *
 * The behaviour is the reference's, including the part that reads like a bug
 * and is not: clicking the row that is already open does not close it, it
 * opens the *next* one. With only two rows and a picture tied to each, a
 * closed state would be a blank half of a screen -- so the control cycles
 * instead of toggling.
 */
export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section className="q-services" id="services">
      <div className="q__container">
        <SectionHeader className="q-services__header q-section-header" label={services.label} />

        <div className="q-services__items">
          {services.groups.map((group, i) => (
            <div key={group.key} className={cx('q-services__item', i === open && '-active')}>
              <figure className="q-services__photo">
                <img src={group.photo} alt={group.photoAlt} loading="lazy" />
              </figure>

              <button
                type="button"
                className="q-services__toggler"
                aria-expanded={i === open}
                onClick={() => setOpen((cur) => (cur === i ? (i + 1) % services.groups.length : i))}
              >
                <span className="q-services__toggler-inner">{group.title}</span>
                <span className="q-services__toggler-icon">
                  <span className="q-plus" />
                  <span className="q-plus -v" />
                </span>
              </button>

              <div className="q-services__main">
                <div className="q-services__content">
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* The guide lives inside the parents' panel, not under the
                    block -- so it is only offered to whoever opened that one. */}
                {i === 1 ? (
                  <div className="q-services__button">
                    {/* Outlined, with a download arrow: the guide is a PDF. */}
                    <Button
                      as="a"
                      href="#parents"
                      className="-fit"
                      variant="alt"
                      icon={<IconArrowDownload className="q-btn__icon" />}
                    >
                      {services.cta}
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- the location */

/**
 * Eight travel times drawn as a stack of coloured bars, each growing sideways
 * out of nothing 0.2s behind the one above it.
 *
 * Each bar is two pseudo elements -- a slab and the chamfered point on its end
 * -- so the point travels with the bar rather than waiting at the far edge for
 * it. Hovering a bar lifts its whole row 20px out of the stack, up for the
 * odd rows and down for the even ones.
 */
export function Location({ onOpenMap }: { onOpenMap: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: `0px 0px -${Math.round((1 - BARS.startAt) * 100)}% 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="q-location" id="location">
      <div className="q__container">
        <SectionHeader
          className="q-location__header q-section-header"
          label={location.label}
          heading={location.heading}
        />

        <div className="q-location__items" ref={ref}>
          <span className="q-location__mask-fixer" />
          {location.items.map((item) => (
            <div
              key={item.text}
              className={cx('q-location__item', shown && '-active')}
              data-time={item.time}
            >
              <span className="q-location__item-bar" />
              <p className="q-location__item-heading">{item.time}</p>
              <p className="q-location__item-description">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Outlined, with a pin rather than an arrow: the reference's
            `is-style-alternative` and `is-style-map` on one button. */}
        <Button
          className="-fit"
          variant="alt"
          icon={<IconMap className="q-btn__icon" />}
          onClick={onOpenMap}
        >
          {location.cta}
        </Button>
      </div>
    </section>
  );
}

/** The map, opened over the page from the button under the bars. */
export function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={cx('q-location__modal', open && '-active')}
      inert={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="q-location__modal-inner">
        <div className="q-location__modal-map">
          <img src={location.map} alt={location.mapAlt} loading="lazy" />

          <div className="q-location__modal-info">
            <figure className="q-location__modal-info-image">
              <img src={location.street} alt={location.streetAlt} loading="lazy" />
            </figure>
            <div className="q-location__modal-info-content">
              <h3 className="q-location__modal-info-title">{location.card.title}</h3>
              <p className="q-location__modal-info-subtitle">{location.card.address}</p>
              <p className="q-location__modal-info-description">{location.card.body}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="q-lightbox__close"
        aria-label="Close the map"
        onClick={onClose}
      >
        <CloseGlyph />
      </button>
    </div>
  );
}

function CloseGlyph() {
  return (
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5 L19 19 M19 5 L5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------- the extras */

export function Extras() {
  return (
    <section className="q-rail" id="extras">
      <div className="q__container">
        <SectionHeader
          className="q-rail__header q-section-header"
          label={extras.label}
          heading={extras.heading}
        />

        <Rail
          items={extras.items}
          label="extra"
          render={(i, copy) => {
            const item = extras.items[i];
            return (
              <article className="q-rail__item" key={`${item.key}-${copy}`}>
                {item.free ? <span className="q-rail__item-badge">{extras.freeLabel}</span> : null}
                <div className="q-rail__item-photos">
                  <Gallery photos={item.photos} label={item.title} />
                </div>
                <div className="q-rail__item-content">
                  <h3 className="q-rail__item-heading">{item.title}</h3>
                  <div className="q-rail__item-description">
                    <p>{item.body}</p>
                  </div>
                </div>
              </article>
            );
          }}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- the infopoint */

/**
 * Six questions, one open at a time, each on its own colour.
 *
 * The first is open at rest, which is the reference's own resting state and
 * not a detail to drop: six shut rows is a block with no content in it, and
 * the open one is what tells you the colours are rows rather than buttons.
 */
export function Infopoint() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="q-faq" id="infopoint">
      <div className="q-faq__container q__container">
        <div className="q-faq__header-wrapper">
          <SectionHeader
            className="q-faq__header q-section-header"
            label={faq.label}
            heading={faq.heading}
          />
        </div>

        <div>
          <div className="q-faq__items">
            {faq.items.map((item, i) => (
              <div key={item.q} className={cx('q-faq__item', i === open && '-active')}>
                <button
                  type="button"
                  className="q-faq__toggler"
                  aria-expanded={i === open}
                  onClick={() => setOpen((cur) => (cur === i ? null : i))}
                >
                  <span>{item.q}</span>
                  <span className="q-faq__toggler-icon">
                    <span className="q-plus" />
                    <span className="q-plus -v" />
                  </span>
                </button>

                <div className="q-faq__content">
                  <div className="q-faq__content-inner">
                    <div className="q-faq__content-text">
                      {item.a.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      {'list' in item && item.list ? (
                        <ul>
                          {item.list.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                      {'tail' in item && item.tail
                        ? item.tail.map((line) => <p key={line}>{line}</p>)
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="q-faq__button">
            <Button as="a" href="#infopoint" className="-fit" variant="alt">
              {faq.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Re-exported so the page can place a heading without importing Parts twice. */
export { Rise };
