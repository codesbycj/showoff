import { useEffect, useRef, useState } from 'react';

import { IconArrowButton, IconClose } from '@/after/Icons';
import { Button, Logo } from '@/after/Parts';
import { announcement, brand, footer, nav, subnav } from '@/content/site';
import { SPY } from '@/motion/motion';
import { cx } from '@/cx';

/* ------------------------------------------------------------ announcement */

/**
 * The pink strip over the header.
 *
 * Its height is a custom property the rest of the page reads: the header sits
 * at `--announcement-bar-height` and the floating CTA at
 * `--header-fixed-top + 1rem`, so closing the bar moves both without either
 * knowing the bar exists. The reference writes the property on `<html>` from
 * JS; this writes it on the page root through a class, which is the same thing
 * without a second page having to share it.
 */
export function AnnouncementBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="q-announcement">
      <p className="q-announcement__text">{announcement.text}</p>
      <button
        type="button"
        className="q-announcement__close"
        aria-label="Close this announcement"
        onClick={onClose}
      >
        <IconClose size="0.75rem" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------- the header */

export function Header({ ctaHidden }: { ctaHidden: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="q-header">
      <div className="q-header__container q__container">
        <a className="q-header__logo" href="#top">
          <Logo title={`${brand.plain}, home`} />
        </a>

        <nav className="q-header__nav" aria-label="Main">
          <ul className="q-header__nav-list">
            {nav.primary.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="q-header__lang">
          <li>
            <a href="#language">{nav.language}</a>
          </li>
        </ul>

        <div className="q-header__cta-spacer" aria-hidden="true">
          <Button as="a" href="#apply">
            {nav.cta}
          </Button>
        </div>

        <button
          type="button"
          className={cx('q-header__toggler', open && '-active')}
          aria-expanded={open}
          aria-label={open ? 'Close the menu' : 'Open the menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="q-header__toggler-line" />
          <span className="q-header__toggler-line" />
          <span className="q-header__toggler-line" />
        </button>
      </div>

      <div className={cx('q-header__cta', ctaHidden && '-scroll-hide')}>
        <Button as="a" href="#apply">
          {nav.cta}
        </Button>
      </div>

      <div className={cx('q-header__overlay', open && '-active')} inert={!open}>
        <nav className="q-header__overlay-nav" aria-label="Main, small screens">
          <ul className="q-header__overlay-nav-list">
            {nav.primary.map((item, i) => (
              <li key={item.label} className={i === 0 ? '-current' : ''}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  <span>
                    <IconArrowButton size="1.25rem" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="q-header__overlay-lang">
          <li className="-current">
            <a href="#language">EN</a>
          </li>
          <li>
            <a href="#language">{nav.language}</a>
          </li>
        </ul>

        <div className="q-header__overlay-social">
          <ul className="q-header__overlay-social-list">
            {nav.social.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------- the subnav */

/**
 * The white pill rail that sticks under the hero and follows you down.
 *
 * The scroll spy is the reference's own: one IntersectionObserver with
 * `rootMargin: '-20% 0px -70% 0px'` and `threshold: 0`, which is a 10% band
 * across the middle of the viewport -- whichever section is crossing it is the
 * one lit. Past the last section the whole rail hides itself.
 */
export function SubNav() {
  const [active, setActive] = useState(subnav[0].href.slice(1));
  const [hidden, setHidden] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ids = subnav.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).at(0);
        if (hit) {
          setActive(hit.target.id);
          setHidden(false);
        }
      },
      { root: null, rootMargin: SPY.rootMargin, threshold: SPY.threshold },
    );
    sections.forEach((section) => io.observe(section));

    const last = sections.at(-1);
    const onScroll = () => {
      if (!last) return;
      setHidden(last.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      ref={railRef}
      className={cx('q-subnav', hidden && '-hide', listOpen && '-list-active')}
      aria-label="On this page"
    >
      <div className="q-subnav__slider">
        <ul className="q-subnav__list">
          {subnav.map((item) => {
            const on = item.href.slice(1) === active;
            return (
              <li key={item.label} className={cx('q-subnav__item', on && '-active')}>
                <a
                  className="q-subnav__link"
                  href={item.href}
                  aria-current={on ? 'true' : undefined}
                  onClick={() => setListOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/*
         * Below 768 the rail collapses to the section you are in, with this
         * cross -- rotated 45deg, so it reads as a plus until it is open --
         * to drop the other five. Six pills do not fit on a phone, and the
         * reference does not try to make them.
         */}
        <button
          type="button"
          className={cx('q-subnav__toggler', listOpen && '-active')}
          aria-expanded={listOpen}
          aria-label={listOpen ? 'Hide the other sections' : 'Show the other sections'}
          onClick={() => setListOpen((v) => !v)}
        >
          <span className="q-subnav__toggler-icon">
            <IconClose size="1.5rem" />
          </span>
        </button>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------- the footer */

export function Footer() {
  return (
    <footer className="q-footer">
      <div className="q-footer__container q__container">
        <div className="q-footer__top">
          <div className="q-footer__columns">
            {footer.columns.map((column) => (
              <div className="q-footer__column" key={column.title}>
                <p className="q-footer__column-title">{column.title}</p>
                {'lines' in column ? (
                  <div className="q-footer__column-content">
                    <p>
                      {column.lines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                ) : (
                  <ul className="q-footer__column-list">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="q-footer__up-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {footer.up}
          </button>
        </div>

        <div className="q-footer__middle">
          {/* The wordmark at page width, where the reference puts its own. */}
          <Logo className="q-footer__logo" />
        </div>

        <div className="q-footer__bottom">
          <div className="q-footer__bottom-mobile">
            <p className="q-footer__copyright">{brand.legal}</p>
            <nav aria-label="Legal, small screens">
              <ul className="q-footer__legal-list">
                {footer.columns[4].links?.slice(0, 2).map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="q-footer__operator">{brand.operator}</p>
          </div>

          <div className="q-footer__bottom-desktop">
            <div className="q-footer__bottom-left">
              <p className="q-footer__operator">{brand.operator}</p>
            </div>
            <div className="q-footer__bottom-center">
              <p className="q-footer__copyright">{brand.legal}</p>
            </div>
            <div className="q-footer__bottom-right">
              <nav aria-label="Legal">
                <ul className="q-footer__legal-list">
                  {footer.columns[4].links?.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
