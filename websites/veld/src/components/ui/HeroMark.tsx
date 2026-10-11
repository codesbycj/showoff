import { CarNumber } from '@/components/ui/CarNumber';

/**
 * The car number where it comes to rest in the hero — and, for the first few
 * seconds, the white screen the page loads behind.
 *
 * It belongs to the hero, not to the loader, because it is still there long
 * after the loader has gone; the loader only borrows it, by attribute, the
 * same way it borrows the hero stills. Keeping it here is also what makes
 * `?skip` show the finished hero rather than a hero with a hole in it.
 *
 * Two copies. The white one sits over a yellow one on identical transforms,
 * so at rest the yellow is invisible; it exists only to run 25ms behind
 * during the collapse, which is what turns a wipe into a trail.
 */
export function HeroMark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      <CarNumber
        data-loader-numeral="yellow"
        className="loader-numeral"
        fill="var(--color-signal)"
      />
      <CarNumber data-loader-numeral="white" className="loader-numeral" fill="#ffffff" />
    </div>
  );
}
