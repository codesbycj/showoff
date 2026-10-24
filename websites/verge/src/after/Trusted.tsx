import { TRUSTED } from '@/content/site';
import { MARQUEE } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The customer band, set as type rather than as logos.
 *
 * Every B2B page has this row and almost all of them run grey PNGs, which is
 * the one part of a site that cannot be invented honestly: a fictional
 * company's logo is still a logo somebody has to draw, and a real one is not
 * mine to use. Setting the names in the page's own display face sidesteps that
 * and reads better — eight names in one typeface is a list of customers, where
 * eight logos in eight typefaces is a collage.
 *
 * The movement is the simplest marquee there is: the row is rendered twice and
 * translated by exactly -50%, linearly, forever. Because the second copy is
 * identical and the shift is exactly half, the loop point is invisible — the
 * usual failure here is a gap at the seam, which is always an off-by-a-copy
 * error rather than a timing one.
 *
 * It stops entirely for reduced motion, and the names stay on screen.
 */
export function Trusted() {
  const reduced = useReducedMotion();
  const row = [...TRUSTED.names, ...TRUSTED.names];

  return (
    <section
      aria-label={TRUSTED.label}
      className="border-ink/10 bg-bone overflow-hidden border-y py-7"
    >
      <div className="cc mb-5">
        <span className="t-label text-slate">{TRUSTED.label}</span>
      </div>

      <div className={reduced ? 'cc flex flex-wrap gap-x-10 gap-y-3' : 'w-full overflow-hidden'}>
        <div
          className={reduced ? 'contents' : 'flex w-max items-center gap-14 pl-14'}
          style={
            reduced
              ? undefined
              : { animation: `verge-marquee ${MARQUEE.durationS}s linear infinite` }
          }
        >
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={!reduced && i >= TRUSTED.names.length}
              className="font-display text-ink/55 whitespace-nowrap text-[22px] font-semibold leading-none tracking-[-0.02em]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
