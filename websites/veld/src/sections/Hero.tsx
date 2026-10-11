import type { ReactNode } from 'react';

import { BgLines } from '@/components/ui/BgLines';
import { Countdown } from '@/components/ui/Countdown';
import { Grid } from '@/components/ui/Grid';
import { HeroMark } from '@/components/ui/HeroMark';
import { HeroStage } from '@/sections/HeroStage';
import { DRIVER, HERO, RACES } from '@/data/home';
import { nextRace } from '@/data/race';

/**
 * The first screen.
 *
 * It marks what can move — `data-loader-reveal` around each block of copy,
 * `data-odometer-element` on each number — and never decides when any of it
 * moves. The loader owns that, because the takeover and this arriving are one
 * movement that overlaps by 0.4s and only one timeline can own an overlap.
 */
export function Hero({ loaded, children }: { loaded: boolean; children?: ReactNode }) {
  const race = nextRace(RACES);

  return (
    <section
      id="hero"
      className="text-paper relative h-svh w-full overflow-hidden"
      // Present only while the loader still owns the screen. The stylesheet
      // hangs the hundred-times transform off it, so the mark is already
      // screen-filling on the first paint — and `?skip` renders it at rest
      // without a frame of white.
      {...(loaded ? {} : { 'data-loading': '' })}
    >
      <HeroStage />

      {/* Floor shadow, so the copy along the bottom holds up over any frame. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-50"
        style={{ backgroundImage: 'linear-gradient(0deg, #000, transparent)' }}
        aria-hidden="true"
      />

      <BgLines />

      <HeroMark />

      <div className="px-gutter relative z-10 flex h-full flex-col justify-between pt-24 pb-10 lg:pt-20 lg:pb-15">
        <Grid className="flex-1 content-center gap-y-10">
          <div
            data-loader-reveal
            className="col-span-6 flex flex-col gap-5 self-center sm:col-span-4 lg:col-span-3 lg:gap-8"
          >
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2.5">
                <div data-odometer-element className="font-display text-h3">
                  {stat.value}
                </div>
                <p className="text-body-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>

          <div
            data-loader-reveal
            className="col-span-6 col-start-7 flex flex-col items-end gap-5 self-center text-right sm:col-span-4 sm:col-start-9 lg:col-span-3 lg:col-start-10 lg:gap-8"
          >
            <p className="text-body-sm max-w-[16rem]">{HERO.asideIntro}</p>
            {HERO.aside.map((item) => (
              <div key={item.label} className="flex flex-col items-end gap-2">
                <p
                  className="text-body-sm font-bold"
                  {...(item.counts ? { 'data-odometer-element': '' } : {})}
                >
                  {item.value}
                </p>
                <p className="text-body-sm opacity-80">{item.label}</p>
              </div>
            ))}
          </div>
        </Grid>

        <Grid className="items-end gap-y-8">
          <div
            data-loader-reveal
            className="col-span-12 flex flex-col gap-5 md:col-span-6 lg:col-span-4"
          >
            <h1 className="text-h2">{DRIVER.fullName}</h1>
            <p className="text-body-sm max-w-[26rem] opacity-80">{HERO.intro}</p>
          </div>

          <div
            data-loader-reveal
            className="col-span-12 flex justify-start md:col-span-5 md:col-start-8 md:justify-end"
          >
            <Countdown
              target={race?.start ?? null}
              label={HERO.countdownLabel}
              running={loaded}
              align="right"
            />
          </div>
        </Grid>
      </div>

      {children}
    </section>
  );
}
