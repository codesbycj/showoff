import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { Button, SectionHeader } from '@/after/Parts';
import { apply } from '@/content/site';
import { POP, STAMP, STAMP_DRIFT } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { cx } from '@/cx';

/**
 * Apply now: the yellow block the page ends on.
 *
 * Two columns of equal width. On the left, in a sticky inner, the heading and
 * a photograph cut to a blob with three stamps pinned to it at fixed angles;
 * on the right the standfirst and the form, capped at 33.875rem so the fields
 * do not run the full half.
 *
 * The stamps scale in from nothing half a second after the block reaches the
 * middle of the viewport, and then drift upward with the scroll at a speed
 * each one keeps. The reference picks those speeds with `Math.random()` on
 * every load, so no two visits agree and no screenshot of this block is
 * reproducible; these are seeded from `motion.ts` instead. It is the only
 * number on the page that is deliberately not the reference's, and it is in
 * Declared departures.
 */
export function Apply() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [drift, setDrift] = useState(0);
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setShown(e.isIntersecting)),
      { rootMargin: `0px 0px -${Math.round((1 - STAMP.startAt) * 100)}% 0px` },
    );
    io.observe(el);

    if (reduced) return () => io.disconnect();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const span = box.height + window.innerHeight;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - box.top) / span));
        setDrift(progress);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced]);

  return (
    <section className="q-apply" id="apply">
      <div className="q-apply__container">
        <div className="q-apply__cols q__container">
          <div className="q-apply__column -left">
            <div className="q-apply__column-inner">
              <SectionHeader
                className="q-apply__header q-section-header"
                label={apply.label}
                heading={apply.heading}
              />

              <figure className="q-apply__photo" ref={ref}>
                <img src={apply.photo} alt={apply.photoAlt} loading="lazy" />
                {apply.stamps.map((stamp, i) => (
                  <span
                    key={stamp.text}
                    className="q-apply__photo-label"
                    style={{
                      scale: shown ? 1 : 0,
                      translate: `0 ${drift * STAMP_DRIFT.maxPx * STAMP_DRIFT.speeds[i]}px`,
                      transition: `scale ${STAMP.durationS}s ease ${STAMP.delayS}s`,
                    }}
                  >
                    {stamp.text}
                  </span>
                ))}
              </figure>
            </div>
          </div>

          <div className="q-apply__column -right">
            <p className="q-apply__description">{apply.body}</p>

            <form
              className={cx('q-apply__form q-form', sent && '-hide')}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="q-form__row -type-toggler">
                <div className="q-form__field">
                  <div className="q-form__toggler">
                    {apply.roles.map((role, i) => (
                      <label key={role}>
                        <input type="radio" name="role" defaultChecked={i === 0} />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="q-form__row -two-cols">
                <Field field={apply.fields.name}>
                  <input
                    type="text"
                    name="name"
                    placeholder={apply.fields.name.placeholder}
                    required
                  />
                </Field>
                <Field field={apply.fields.lastname}>
                  <input
                    type="text"
                    name="lastname"
                    placeholder={apply.fields.lastname.placeholder}
                    required
                  />
                </Field>
              </div>

              <div className="q-form__row">
                <Field field={apply.fields.email}>
                  <input
                    type="email"
                    name="email"
                    placeholder={apply.fields.email.placeholder}
                    required
                  />
                </Field>
                <Field field={apply.fields.phone}>
                  <input type="tel" name="phone" placeholder={apply.fields.phone.placeholder} />
                </Field>
                <Field field={apply.fields.roomType}>
                  <select name="room" defaultValue={apply.roomOptions[0]}>
                    {apply.roomOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field field={apply.fields.term}>
                  <input type="text" name="term" placeholder={apply.fields.term.placeholder} />
                </Field>
                <Field field={apply.fields.heard}>
                  <select name="heard" defaultValue={apply.heardOptions[0]}>
                    {apply.heardOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field field={apply.fields.extra}>
                  <textarea name="extra" rows={4} placeholder={apply.fields.extra.placeholder} />
                </Field>
              </div>

              <div className="q-form__field q-form__acceptance">
                <label>
                  <input type="checkbox" name="consent" required />
                  <span>
                    {apply.consent}
                    <a href="#privacy">{apply.privacy}</a>.
                  </span>
                </label>
              </div>

              <div className="q-form__row q-form__submit">
                <Button type="submit">{apply.submit}</Button>
              </div>
            </form>

            <div className={cx('q-apply__thanks', sent && '-active')} aria-live="polite">
              <h3>{apply.thanksTitle}</h3>
              <p>{apply.thanksBody}</p>
            </div>
          </div>
        </div>

        <div className="q-apply__banner-wrapper">
          {[1, 2, 3].map((n, i) => (
            <span
              key={n}
              className={`q-apply__banner-shape -shape-${n}`}
              style={{
                scale: shown ? 1 : 0,
                transition: `scale ${POP.durationS}s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  POP.delayBaseS + POP.delayStepS * i
                }s`,
              }}
            />
          ))}

          <div className="q-banner">
            <div className="q-banner__inner">
              <div className="q-banner__content">
                <h3 className="q-banner__heading">{apply.banner.title}</h3>
                <p className="q-banner__description">{apply.banner.body}</p>
              </div>
              <figure className="q-banner__photo">
                <img src={apply.banner.photo} alt={apply.banner.photoAlt} loading="lazy" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  field,
  children,
}: {
  field: { readonly label: string; readonly placeholder: string };
  children: ReactNode;
}) {
  return (
    <label className="q-form__field">
      <span className="q-form__label">{field.label}</span>
      {children}
    </label>
  );
}
