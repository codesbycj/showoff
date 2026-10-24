import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BENEFITS } from '@/content/site';
import { BARS, GROW, PLATE, STATS } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type Item = (typeof BENEFITS.items)[number];

/**
 * Five benefit rows, each a 1120x450 card: photograph left at 400 wide, copy
 * right at 720 with 40 of padding, sand background, 40px corners, 10px between
 * rows.
 *
 * Each row carries one small animation that fires when its top passes 43% of
 * the viewport, once, and never again. These are the reference's own
 * `ScrollTrigger.create` calls, one per row, and the five instruments are:
 *
 *   figures   count from 0 on `power3.out` over 0.8s, 0.2s apart, snapping to
 *             0.01 where the target has decimals and to 1 where it does not
 *   bars      two meters grow to 84% on the same curve and the same stagger
 *   grow      a square opens from nothing to 5rem
 *   pairs     two figures with units count up
 *   dial      an arc draws itself by running its dash offset to 0, then the
 *             figure inside it counts up 0.2s later
 *
 * The readout plate sits *inside* the photograph rather than beside it, which
 * is what makes the figures read as a measurement off the thing in the picture
 * rather than a statistic about it. Every plate is a different instrument, and
 * the geometry of each one is the reference's: 251x103 for the three figures,
 * 251x51 twice for the meters, 240x144 for the diagram, 250x96 for the pairs,
 * 186x142 for the dial. They are fixed rather than content-sized, because a
 * plate that grows with its text stops looking like hardware.
 */
export function Benefits() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      BENEFITS.items.forEach((item) => {
        const row = root.querySelector<HTMLElement>(`[data-benefit="${item.id}"]`);
        if (!row) return;

        const countTo = (el: HTMLElement, to: number) => {
          const decimals = String(to).split('.')[1]?.length ?? 0;
          return gsap.to(el, {
            innerText: to,
            duration: STATS.durationS,
            ease: STATS.ease,
            snap: { innerText: decimals ? 0.01 : 1 },
            onUpdate() {
              el.innerText = Number(el.innerText).toFixed(decimals);
            },
          });
        };

        const play = () => {
          const tl = gsap.timeline();

          (item.stats ?? []).forEach((stat, i) => {
            const el = row.querySelector<HTMLElement>(`[data-stat="${stat.id}"]`);
            if (el) tl.add(countTo(el, stat.to), i * STATS.stagger);
          });

          (item.bars ?? []).forEach((bar, i) => {
            const el = row.querySelector<HTMLElement>(`[data-bar="${bar.id}"]`);
            if (el)
              tl.to(
                el,
                { width: BARS.to, duration: BARS.durationS, ease: BARS.ease },
                i * BARS.stagger,
              );
          });

          if (item.grow) {
            const el = row.querySelector<HTMLElement>('[data-grow]');
            if (el) tl.to(el, { width: GROW.to, duration: GROW.durationS, ease: GROW.ease }, 0);
          }

          if (item.arc) {
            const dial = row.querySelector<SVGPathElement>('[data-arc]');
            const num = row.querySelector<HTMLElement>(`[data-stat="${item.arc.id}"]`);
            if (dial)
              tl.to(dial, { strokeDashoffset: 0, duration: STATS.durationS, ease: STATS.ease }, 0);
            if (num) tl.add(countTo(num, item.arc.to), STATS.stagger);
          }
        };

        if (reduced) {
          // The finished state, with nothing counting: the numbers are the
          // information, and the counting is the decoration.
          (item.stats ?? []).forEach((s) => {
            const el = row.querySelector<HTMLElement>(`[data-stat="${s.id}"]`);
            if (el) el.innerText = String(s.to);
          });
          (item.bars ?? []).forEach((b) => {
            const el = row.querySelector<HTMLElement>(`[data-bar="${b.id}"]`);
            if (el) el.style.width = BARS.to;
          });
          const grow = row.querySelector<HTMLElement>('[data-grow]');
          if (grow) grow.style.width = GROW.to;
          const dial = row.querySelector<SVGPathElement>('[data-arc]');
          if (dial) dial.style.strokeDashoffset = '0';
          const arcNum = item.arc && row.querySelector<HTMLElement>(`[data-stat="${item.arc.id}"]`);
          if (arcNum && item.arc) arcNum.innerText = String(item.arc.to);
          return;
        }

        ScrollTrigger.create({
          trigger: row,
          start: `top ${STATS.startWhenTopPasses * 100}%`,
          once: true,
          onEnter: play,
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="benefits" className="px-5 lg:px-[160px]">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="flex flex-col items-center gap-2 pt-[120px]">
          <p className="t-eyebrow reveal">{BENEFITS.eyebrow}</p>
          <h2 className="t-h3 reveal text-center tracking-[-0.01em]">{BENEFITS.title}</h2>
        </div>

        <div className="flex flex-col gap-[10px] pb-20 pt-[40px]">
          {BENEFITS.items.map((item) => (
            <article
              key={item.id}
              data-benefit={item.id}
              className="reveal bg-sand flex flex-col overflow-hidden rounded-[40px] lg:h-[450px] lg:flex-row"
            >
              <div className="relative lg:w-[400px] lg:shrink-0">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-[280px] w-full rounded-[40px] object-cover lg:h-[450px]"
                />
                <Readout item={item} />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 p-7 lg:p-10">
                <div className="flex flex-col gap-3 lg:pr-[60px]">
                  <h3 className="t-h2">{item.title}</h3>
                  <p className="text-[16px] leading-[140%] text-black/50">{item.body}</p>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-[13.5px] leading-[130%] text-black/50">{item.copy}</p>
                  <ul className="flex flex-col gap-[10px] sm:flex-row">
                    {item.tiles.map((tile) => (
                      <li
                        key={tile}
                        className="flex-1 rounded-[12px] border border-black/10 pb-8 pl-3.5 pr-[12.8px] pt-3.5 sm:h-[78px]"
                      >
                        <span className="-mt-[3px] block w-[130px] text-[13.5px] leading-[130%] text-black/50">
                          {tile}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The 8px uppercase mono the plates label everything in. */
function Micro({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-paper font-mono text-[8px] uppercase leading-[120%] tracking-[-0.03em] ${className}`}
    >
      {children}
    </span>
  );
}

const PLATE_SKIN = 'rounded-[8px] bg-white/[0.17]';

/**
 * The instrument laid over the photograph. Five variants, one per row, each at
 * the reference's own size.
 *
 * The blur is 35px, which is heavy enough that the plate reads as frosted glass
 * over any part of any of the five photographs -- the reason it can be the same
 * 17% white in all five without one of them going muddy.
 */
function Readout({ item }: { item: Item }) {
  const layout = item.plate?.layout;

  if (item.stats && layout === 'figures') {
    return (
      <div
        className={`${PLATE_SKIN} absolute bottom-[30px] left-[30px] flex h-[103px] w-[251px] flex-col justify-between px-5 py-4`}
        style={{ backdropFilter: `blur(${PLATE.blurPx}px)` }}
      >
        <Micro>{item.plate?.head}</Micro>
        <ul className="flex gap-[26px]">
          {item.stats.map((stat) => (
            <li key={stat.id} className="flex w-[53px] flex-col gap-[1.6px]">
              <Micro>{stat.code}</Micro>
              <span className="text-paper text-[13.5px] font-medium leading-[130%]">
                <span data-stat={stat.id}>0</span>
                {stat.suffix}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (item.stats && layout === 'pairs') {
    return (
      <div
        className={`${PLATE_SKIN} absolute bottom-[30px] left-[30px] flex h-[96px] w-[250px] flex-col justify-between px-4 py-[14.88px]`}
        style={{ backdropFilter: `blur(${PLATE.blurPx}px)` }}
      >
        <ul className="flex gap-5">
          {item.stats.map((stat) => (
            <li key={stat.id} className="flex flex-col justify-between gap-[7px]">
              <span className="text-paper font-mono text-[10px] leading-[120%] tracking-[-0.03em]">
                {stat.code}
              </span>
              <span className="flex items-end gap-[0.5ch]">
                <span className="text-paper text-[24px] font-medium leading-[120%]">
                  <span data-stat={stat.id}>0</span>
                </span>
                <Micro className="pb-[3px] normal-case">{stat.suffix}</Micro>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (item.bars) {
    return (
      <div className="absolute bottom-10 left-10 flex flex-col gap-[13px]">
        {item.bars.map((bar) => (
          <div
            key={bar.id}
            className={`${PLATE_SKIN} flex h-[51px] w-[251px] flex-col gap-3 px-4 pb-3.5 pt-3`}
            style={{ backdropFilter: `blur(${PLATE.blurPx}px)` }}
          >
            <span className="flex items-center justify-between">
              <Micro>{bar.label}</Micro>
              <Micro className="normal-case">{bar.value}</Micro>
            </span>
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
              <span data-bar={bar.id} className="bg-paper block h-full w-0 rounded-full" />
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (item.grow) {
    const [top, right, bottom, left] = item.grow.around;
    return (
      // No plate on this one: the labels sit directly on the photograph around
      // a square of light, which is why it is the only readout with no glass
      // behind it. 240x144, 76px down from the top of the card.
      <div className="absolute left-[30px] top-[76px] h-[144px] w-[240px]">
        <Micro className="absolute left-1/2 top-0 -translate-x-1/2">{top}</Micro>
        <Micro className="absolute right-0 top-1/2 -translate-y-1/2">{right}</Micro>
        <Micro className="absolute bottom-0 left-1/2 -translate-x-1/2">{bottom}</Micro>
        <Micro className="absolute left-0 top-1/2 -translate-y-1/2">{left}</Micro>
        <span
          data-grow
          className="absolute left-1/2 top-1/2 block h-20 w-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), rgba(255,68,58,0.65) 55%, rgba(255,68,58,0.15))',
          }}
        />
      </div>
    );
  }

  if (item.arc) {
    return (
      <div
        className={`${PLATE_SKIN} absolute bottom-[30px] left-[30px] flex h-[142px] w-[186px] flex-col justify-between p-4`}
        style={{ backdropFilter: `blur(${PLATE.blurPx}px)` }}
      >
        <div className="flex flex-col items-center gap-3">
          <Micro>{item.plate?.head}</Micro>
          <div className="relative flex h-[54px] w-[107px] items-end justify-center">
            <svg
              viewBox="0 0 107 54"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 52a48.5 48.5 0 0 1 97 0"
                stroke="currentColor"
                className="text-paper"
                strokeOpacity={0.1}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <path
                data-arc
                d="M5 52a48.5 48.5 0 0 1 97 0"
                stroke="currentColor"
                className="text-paper"
                strokeWidth={5}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </svg>
            <span className="relative flex w-[70px] flex-col items-center">
              <span className="text-paper text-[24px] font-medium leading-[120%]">
                <span data-stat={item.arc.id}>0</span>
              </span>
              <Micro>{item.arc.unit}</Micro>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
