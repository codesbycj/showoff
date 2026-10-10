import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal } from '@/components/ui/Reveal';
import { UPDATES } from '@/data/home';

/** The news list — the quietest block on the page, deliberately. */
export function LatestUpdates() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-32" aria-labelledby="updates-title">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2
            id="updates-title"
            className="text-[clamp(1.35rem,2.6vw,2.25rem)] font-light tracking-[-0.03em]"
          >
            {UPDATES.title}
          </h2>
        </Reveal>

        <ul className="border-hairline mt-8 border-t">
          {UPDATES.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.04}
              className="border-hairline group border-b"
            >
              <div className="hover:bg-ink/[0.02] grid grid-cols-1 items-baseline gap-2 py-4 transition-colors duration-[--dur-ui] ease-[--ease-ui] md:grid-cols-[minmax(0,14rem)_1fr_auto] md:gap-8">
                <div className="text-ink-faint flex gap-3 text-xs">
                  <span className="text-ink">{item.source}</span>
                  <time>{item.date}</time>
                </div>
                <p className="text-ink-soft max-w-[72ch] text-sm leading-snug">{item.text}</p>
                <span className="text-ink-faint text-xs tabular-nums">{item.time}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <ArrowLink>{UPDATES.cta}</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
