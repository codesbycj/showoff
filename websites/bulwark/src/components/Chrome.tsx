import { useEffect, useState } from 'react';

import { Digits } from '@/components/Digits';
import { PROJECTS, STUDIO } from '@/data/projects';

/**
 * Everything round the edges: the mark, the menu, the corners and the counter.
 *
 * Grouped into the reference's own cascade groups rather than laid out in one
 * block, because the order they arrive in is a design decision -- the studio's
 * own name and the project's particulars first, the navigation after, the
 * corners last -- and that order is only visible if the groups are kept apart.
 *
 * The vertical type is set with `writing-mode` rather than a rotation. A
 * rotated element keeps its unrotated layout box, so a rotated wordmark
 * reserves a wide, short space and then draws outside it; `writing-mode` makes
 * the box the shape the text actually is, which is what lets the rail be
 * exactly as wide as the mark.
 */

/** The studio's local time, refreshed on the minute. */
function useStudioClock(): string {
  const read = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: STUDIO.timezone,
    }).format(new Date());

  const [now, setNow] = useState(read);

  useEffect(() => {
    // Align to the next minute, then tick on the minute, so the display never
    // sits up to 59 seconds stale after a load.
    let interval: number | undefined;
    const timeout = window.setTimeout(
      () => {
        setNow(read());
        interval = window.setInterval(() => setNow(read()), 60_000);
      },
      (60 - new Date().getSeconds()) * 1000,
    );
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return now;
}

export function Chrome({ active }: { active: number }) {
  const clock = useStudioClock();

  return (
    <>
      {/* ------------------------------------------------------ the rail */}
      <div
        className="absolute inset-y-0 left-0 flex w-[4vw] min-w-[54px] items-start justify-center pt-[3vh]"
        data-cascade="meta"
      >
        <div className="cascade-item flex items-start gap-2">
          <span
            className="text-[clamp(20px,1.7vw,30px)] font-semibold tracking-[-0.02em]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {STUDIO.mark}
            <sup className="ml-0.5 align-super text-[0.42em]">&copy;</sup>
          </span>
          <span
            className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.14em] opacity-55"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {STUDIO.copyright} &nbsp; {STUDIO.city} &nbsp; {STUDIO.phone}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------- the menu */}
      <div className="absolute left-[8vw] top-[3vh]" data-cascade="menu">
        <p className="cascade-item font-mono text-[10px] uppercase tracking-[0.16em] opacity-55">
          Menu
        </p>
        <ul className="mt-4 flex flex-col">
          {STUDIO.menu.map((item, i) => (
            <li key={item} className="cascade-item">
              <a
                href={`#${item.toLowerCase()}`}
                className="group inline-flex items-baseline gap-2 text-[clamp(16px,1.5vw,24px)] font-medium uppercase leading-[1.18] tracking-[-0.01em]"
              >
                {/* The arrow marks where you are rather than appearing on
                    hover, so the current section is legible without a pointer. */}
                <span
                  className="transition-opacity duration-[320ms] group-hover:opacity-100"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  aria-hidden="true"
                >
                  &rarr;
                </span>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* --------------------------------------------------- the corners */}
      <div data-cascade="chrome">
        {/* Where the studio is, and what time it is there. */}
        <p className="cascade-item absolute left-[28vw] top-[3vh] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.14em]">
          <span className="opacity-55">Working globally</span>
          <br />
          {STUDIO.city} {clock}
        </p>

        <p className="cascade-item absolute right-[4vw] top-[3vh] font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="opacity-55">For inquiries</span>{' '}
          <a
            href={`mailto:${STUDIO.email}`}
            className="underline decoration-[0.06em] underline-offset-[0.3em] transition-opacity duration-[320ms] hover:opacity-60"
          >
            {STUDIO.email}
          </a>
        </p>

        {/* In the reference this sits in the corner proper, in the same gutter
            as the rail, not in the menu's column. */}
        <p className="cascade-item absolute bottom-[3vh] left-[4vw] font-mono text-[10px] uppercase tracking-[0.14em] opacity-55">
          Scroll
        </p>

        <p className="cascade-item absolute bottom-[3vh] right-[4vw] font-mono text-[10px] uppercase tracking-[0.14em]">
          {STUDIO.showreel} <span aria-hidden="true">&#9654;</span>
        </p>

        {/*
          The counter, lower left rather than centred, with the index set
          large — in the reference the number is display-sized and the words
          either side of it are the same 10px as the rest of the chrome.
          Baseline-aligned so the small type sits on the number's baseline
          rather than floating beside its box.

          The index slides; the total does not, because it is not counting
          anything.
        */}
        <p className="cascade-item absolute bottom-[11vh] left-[13vw] flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="opacity-55">Selected work</span>
          <Digits
            value={String(active + 1).padStart(2, '0')}
            className="font-sans text-[clamp(40px,5.2vw,78px)] font-medium tracking-[-0.03em]"
          />
          <span className="opacity-55">/{String(PROJECTS.length).padStart(2, '0')}</span>
        </p>
      </div>
    </>
  );
}
