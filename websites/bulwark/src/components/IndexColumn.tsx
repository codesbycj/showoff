import { PROJECTS } from '@/data/projects';
import { ENTRY_PITCH_VH, FOCUS_OPACITY, LABEL_OPACITY } from '@/motion/motion';
import { wrap } from '@/motion/useWheelIndex';

/** Enough entries to cover the column at 20vh each, plus one either side. */
const SPAN = 3;

/**
 * The index down the right-hand side.
 *
 * Three readings off the reference carry this component:
 *
 * - **Entries sit on a 20vh pitch.** The project names fall at y = 264, 458,
 *   654, 848 in a 977px frame — gaps of 194, 196, 194, or 0.1993 of the
 *   height. Held in viewport heights so the rhythm survives a resize.
 *
 * - **The falloff is brutal.** The darkest pixel in each name measured 30, 187
 *   and 204 at distances 0, 1 and 2 from the centre — about 1.0, 0.24 and 0.16
 *   against this ground and ink. Only the centred entry is readable. A gentler
 *   curve turns the column into a wall of grey text and loses the focus that
 *   is the entire point of it.
 *
 * - **It is circular, and it runs backwards.** With FROMANOTHER centred the
 *   reference reads DAFI / DISTRICT2 / FROMANOTHER / IVENTIONS / WON J. YOU
 *   top to bottom, which is CMS indices 1, 0, 18, 17, 16 — descending, and
 *   wrapping past zero. The data file is stored in that order, so the column
 *   is a plain ascending list of slots; the wrap is the only extra step.
 *
 * Entries are positioned by the same `(--i - --pos)` calc as the plates rather
 * than by translating one track, because a circular list has no track to
 * translate — slot and project are different things once the list repeats.
 */
export function IndexColumn({ slot }: { slot: number }) {
  const slots: number[] = [];
  for (let d = -SPAN; d <= SPAN; d++) slots.push(slot + d);

  return (
    <nav
      className="index-mask absolute inset-y-0 right-[4vw] w-[26vw] min-w-[220px] overflow-hidden"
      data-cascade="index"
      aria-label="Selected work"
    >
      <ul className="absolute inset-0">
        {slots.map((s) => {
          const p = PROJECTS[wrap(s, PROJECTS.length)];
          const d = Math.abs(s - slot);
          const focus = FOCUS_OPACITY[Math.min(d, FOCUS_OPACITY.length - 1)];
          return (
            <li
              key={s}
              className="entry absolute inset-x-0 flex flex-col justify-center px-2 text-center"
              style={{
                ['--i' as string]: s,
                height: `${ENTRY_PITCH_VH * 100}vh`,
                ['--focus' as string]: focus,
              }}
              aria-current={d === 0 ? 'true' : undefined}
            >
              <div className="cascade-item">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ opacity: LABEL_OPACITY }}
                >
                  {p.role[0] ?? 'Selected work'}
                </p>
                <h2 className="mt-3 text-[clamp(17px,1.5vw,26px)] font-medium uppercase tracking-[-0.01em]">
                  {p.name}
                </h2>
                <p className="mx-auto mt-3 w-10 border-t border-current opacity-40" />
                {/*
                  Clamped to exactly three lines, and given the height of three
                  whether it fills them or not — otherwise a two-line blurb and
                  a four-line one centre their names at different heights inside
                  the 20vh box, and the names are what the rhythm is read from.
                */}
                <p
                  className="mx-auto mt-3 line-clamp-3 max-w-[30ch] text-[clamp(11px,0.85vw,13px)] leading-[1.5]"
                  style={{ height: 'calc(3 * 1.5em)' }}
                >
                  {p.blurb}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
