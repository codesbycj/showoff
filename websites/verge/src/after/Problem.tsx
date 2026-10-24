import { PROBLEM } from '@/content/site';

/**
 * The problem, stated once, with a photograph of it.
 *
 * Most B2B pages skip this and open on the solution, which assumes the reader
 * already agrees there is something to solve. A facilities manager who has
 * never costed a car park does not. One section, three numbers and a picture
 * of stationary traffic at dusk does the work.
 *
 * The numbers are set at display size with the unit tucked against them, on a
 * hairline grid with no boxes — the same treatment the schemes section uses
 * for prices, so that "68%" and "£11 per rider" read as the same kind of fact.
 *
 * Dark section, light type: this is the only inverted band before the footer,
 * and it is inverted because the page is making its one negative argument here
 * and should look like it is doing something different.
 */
export function Problem() {
  return (
    <section id="problem" className="bg-ink text-bone py-20 lg:py-28">
      <div className="cc grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
        <div className="wipe flex flex-col gap-6">
          <span className="t-label text-hivis">{PROBLEM.label}</span>
          <h2 className="t-h2 max-w-[18ch]">{PROBLEM.title}</h2>
          <p className="t-lead text-bone/70 max-w-[54ch]">{PROBLEM.body}</p>

          <ul className="mt-6 flex flex-col gap-px">
            {PROBLEM.stats.map((stat) => (
              <li
                key={stat.label}
                className="border-bone/15 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t py-5"
              >
                <span className="font-display text-[44px] font-bold leading-none tracking-[-0.03em]">
                  {stat.figure}
                  <span className="text-hivis">{stat.unit}</span>
                </span>
                <span className="t-body text-bone/60 max-w-[34ch]">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="wipe self-end">
          <img
            src={PROBLEM.image}
            alt={PROBLEM.alt}
            width={1200}
            height={800}
            loading="lazy"
            className="block aspect-[3/2] w-full object-cover"
          />
          <figcaption className="t-small text-bone/45 mt-3">
            The 4.6-mile average UK commute, at 5.40pm.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
