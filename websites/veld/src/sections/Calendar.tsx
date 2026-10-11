import { img } from '@/assets/images';
import { Countdown } from '@/components/ui/Countdown';
import { DRIVER, RACES, SEASON_YEAR } from '@/data/home';
import { nextRace } from '@/data/race';

/**
 * The season. The next round is the one in signal yellow, which is decided
 * from the clock rather than hard-coded — the calendar in `data/home.ts`
 * rolls to the following year once the last round has been run, so this is
 * never a list of dates that have all already happened.
 */
export function Calendar({ loaded }: { loaded: boolean }) {
  const next = nextRace(RACES);

  return (
    <section id="calendar" className="bg-ink text-paper relative overflow-hidden py-28">
      <div className="px-gutter relative z-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <h2 data-reveal="words" className="text-h3 mb-12">
            Race calendar {SEASON_YEAR}
          </h2>

          <ol className="border-chalk-10 border-t">
            {RACES.map((race) => {
              const isNext = next?.round === race.round;
              return (
                <li
                  key={race.round}
                  data-reveal="fade"
                  className={`border-chalk-10 flex items-baseline justify-between gap-6 border-b py-5 ${
                    isNext ? 'text-signal' : ''
                  }`}
                >
                  <div>
                    <p className="font-display text-h4">
                      Round {race.round} — {race.circuit}
                    </p>
                    <p className="text-body-sm opacity-60">
                      {race.series} · {race.country}
                    </p>
                  </div>
                  <p className="text-body-sm shrink-0 tabular-nums opacity-80">{race.dates}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <div
              data-parallax
              data-parallax-start="-6"
              data-parallax-end="6"
              className="mb-8 overflow-hidden"
            >
              <img
                src={img('calendar-car.webp')}
                alt={`The ${DRIVER.series} car`}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>

            {next ? (
              <div className="border-chalk-10 border-t pt-6">
                <Countdown
                  target={next.start}
                  label={`Next: ${next.circuit}`}
                  running={loaded}
                  align="left"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
