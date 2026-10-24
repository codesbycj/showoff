import { useState } from 'react';

import { AUDIENCE } from '@/content/site';
import { DUR, EASE, TOGGLE } from '@/motion/motion';

/**
 * Two audiences, one switch.
 *
 * A commute scheme is sold to a facilities or people lead and used by staff,
 * and the two want opposite things: one wants no fleet to manage and numbers
 * for a return, the other wants a cheaper bike and somewhere to dry a coat.
 * Most pages solve this by writing for the buyer and putting the rider in the
 * footer. A switch gives both the same space without doubling the page.
 *
 * Built as a real `tablist` with arrow-key support, because it is a tab
 * control and announcing it as anything else to a screen reader makes two
 * halves of the page unreachable. The inactive tab dims to 50% rather than
 * changing colour — the same treatment the schemes cards use for the ones you
 * are not on, so the page has one idea of "not this one".
 *
 * The panel does not animate its height. Two panels of different lengths
 * sliding past each other is a worse reading experience than one appearing,
 * and it is the kind of movement that looks clever once and is tiresome by the
 * third switch.
 */
export function Audience() {
  const [active, setActive] = useState(AUDIENCE.tabs[0].id);
  const current = AUDIENCE.tabs.find((t) => t.id === active) ?? AUDIENCE.tabs[0];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = AUDIENCE.tabs.findIndex((t) => t.id === active);
    const next =
      (i + (e.key === 'ArrowRight' ? 1 : -1) + AUDIENCE.tabs.length) % AUDIENCE.tabs.length;
    setActive(AUDIENCE.tabs[next].id);
  };

  return (
    <section id="employers" className="py-20 lg:py-28">
      <div className="cc">
        <div className="wipe flex flex-col gap-6">
          <span className="t-label text-slate">{AUDIENCE.label}</span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h2 max-w-[16ch]">{AUDIENCE.title}</h2>

            <div
              role="tablist"
              aria-label={AUDIENCE.title}
              onKeyDown={onKey}
              className="flex gap-6"
            >
              {AUDIENCE.tabs.map((tab) => {
                const on = tab.id === active;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    className="font-display text-[clamp(20px,1.8vw,26px)] font-semibold leading-none tracking-[-0.02em]"
                    style={{
                      opacity: on ? 1 : TOGGLE.dimTo,
                      transition: `opacity ${DUR.part}s ${EASE.snap}`,
                    }}
                  >
                    {tab.label}
                    <span
                      aria-hidden="true"
                      className="bg-hivis mt-2 block h-[3px] origin-left"
                      style={{
                        transform: on ? 'scaleX(1)' : 'scaleX(0)',
                        transition: `transform ${DUR.part}s ${EASE.snap}`,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20"
        >
          <ul className="flex flex-col gap-px">
            {current.points.map((point) => (
              <li key={point.title} className="border-ink/12 flex flex-col gap-2 border-t py-6">
                <h3 className="t-h3">{point.title}</h3>
                <p className="t-body text-slate max-w-[52ch]">{point.body}</p>
              </li>
            ))}
          </ul>

          <figure className="wipe self-start">
            <img
              key={current.image}
              src={current.image}
              alt={current.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="bg-mist block aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
