import { Wordmark } from '@/after/Wordmark';
import { BRAND, HERO } from '@/content/site';

/**
 * The hero, measured off the reference at a 1440 viewport.
 *
 *   section   0,0       1440x900, the photograph full bleed
 *   kicker    1232,120  176x56    Clash 40/56 500 uppercase, lime, flush right
 *   labels    y449      x32 / x696 / x1342, Clash 16/22.4 500 uppercase, white
 *   rule      y487      a **dotted** hairline under all three
 *   wordmark  32,583    1376x284, fitted to the measure, white
 *
 * Absolute positions rather than a flex column, because the reference's are
 * absolute and the three blocks do not share a rhythm — 120, 449, 583 is not a
 * scale, it is three decisions. Laying them out with `mt-auto` put the rule
 * 100px low and the wordmark with it.
 *
 * The three labels are not evenly spaced either: 32, 696, 1342. The first is
 * flush left, the last flush right, the middle one sits where it lands.
 */
export function Hero() {
  return (
    <section className="relative isolate h-[900px] w-full overflow-hidden">
      <img
        className="absolute inset-0 size-full object-cover"
        src={HERO.image}
        alt={HERO.alt}
        width={2400}
        height={1800}
        fetchPriority="high"
      />

      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        <h2 className="t-40 text-lime absolute right-[32px] top-[120px] m-0">{BRAND.kicker}</h2>

        <div className="absolute inset-x-[32px] top-[449px]">
          <div className="flex items-baseline justify-between gap-6 text-white">
            <p className="t-16 m-0">{HERO.labels[0]}</p>
            <p className="t-16 m-0 hidden sm:block">{HERO.labels[1]}</p>
            <p className="t-16 m-0 text-right">{HERO.labels[2]}</p>
          </div>
          <div className="mt-[16px] border-t border-dotted border-white/80" />
        </div>

        <div className="absolute inset-x-[32px] top-[583px]">
          <Wordmark text={BRAND.name} className="text-white" />
        </div>
      </div>
    </section>
  );
}
