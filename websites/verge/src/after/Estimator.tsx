import { useId, useState } from 'react';

import { Swoosh } from '@/after/Swoosh';
import { ESTIMATOR } from '@/content/site';
import { DUR, EASE } from '@/motion/motion';

/** Invented rates, kept here rather than in the deck because they are arithmetic. */
const RATE = {
  milesPerEmployeePerMonth: 2,
  poolBikesPerHundred: 1.5,
  poolPerBikePerMonth: 68,
  avgRiderSavingPerYear: 410,
  kgCo2PerRiderPerYear: 190,
};

/**
 * A number the reader can change, which is the only interactive thing on the
 * page that is not a link.
 *
 * It exists because the three cards answer "what does it cost per rider" and
 * every facilities manager immediately asks the harder question — "what does
 * it come to for *us*". One slider and three derived figures answer it in ten
 * seconds, which is faster than a form that emails a PDF.
 *
 * Two deliberate restraints:
 *
 *   * **It does not count up.** The figures change as you drag, directly. An
 *     odometer roll would be a nice effect and would make the number unreadable
 *     for the half-second you are still dragging, which is the half-second
 *     somebody is comparing two headcounts.
 *   * **It says it is invented.** A calculator on a page like this implies a
 *     quote; this one carries a line saying the rates are illustrative, in the
 *     same size as the figures rather than in grey underneath them.
 *
 * The maths is plain and in one place: uptake × headcount gives riders, and
 * everything else is a multiplication off that.
 */
export function Estimator() {
  const [headcount, setHeadcount] = useState(ESTIMATOR.defaults.headcount);
  const id = useId();

  const riders = Math.round(headcount * ESTIMATOR.defaults.uptake);
  const poolBikes = Math.max(2, Math.round((headcount / 100) * RATE.poolBikesPerHundred));
  const monthly = headcount * RATE.milesPerEmployeePerMonth + poolBikes * RATE.poolPerBikePerMonth;
  const riderSaving = riders * RATE.avgRiderSavingPerYear;
  const co2 = Math.round((riders * RATE.kgCo2PerRiderPerYear) / 100) / 10;

  const figures = [
    {
      value: `£${monthly.toLocaleString('en-GB')}`,
      label: 'a month, all three schemes',
      accent: true,
    },
    { value: riders.toLocaleString('en-GB'), label: 'riders in year one, at one in six' },
    { value: `£${riderSaving.toLocaleString('en-GB')}`, label: 'saved across your people, a year' },
    { value: `${co2}t`, label: 'CO₂e not emitted, a year' },
  ];

  return (
    <section id="pricing" className="bg-mist/50 py-20 lg:py-28">
      <div className="cc grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-20">
        <div className="wipe flex flex-col gap-5">
          <span className="t-label text-slate">{ESTIMATOR.label}</span>
          <h2 className="t-h2">{ESTIMATOR.title}</h2>
          <p className="t-body text-slate max-w-[46ch]">{ESTIMATOR.body}</p>

          <div className="mt-4 flex flex-col gap-3">
            <label htmlFor={id} className="t-label text-slate">
              Headcount
            </label>
            <div className="flex items-center gap-5">
              <input
                id={id}
                type="range"
                min={25}
                max={5000}
                step={25}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="accent-hivis h-1 w-full cursor-pointer"
              />
              <output
                htmlFor={id}
                className="font-display w-[5ch] text-right text-[26px] font-bold leading-none tracking-[-0.03em]"
              >
                {headcount.toLocaleString('en-GB')}
              </output>
            </div>
          </div>

          <p className="t-small text-slate mt-2">{ESTIMATOR.note}</p>

          <Swoosh className="mt-4 self-start">Get a real number</Swoosh>
        </div>

        <ul className="grid grid-cols-1 gap-px sm:grid-cols-2">
          {figures.map((fig) => (
            <li
              key={fig.label}
              className="wipe border-ink/15 flex flex-col gap-2 border-t py-7 sm:px-2"
            >
              <span
                className={`font-display text-[clamp(34px,3.4vw,46px)] font-bold leading-none tracking-[-0.03em] ${
                  fig.accent ? 'text-hivis' : 'text-ink'
                }`}
                style={{ transition: `color ${DUR.tint}s ${EASE.plain}` }}
              >
                {fig.value}
              </span>
              <span className="t-small text-slate max-w-[26ch]">{fig.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
