import { SWAP_MS } from '@/motion/motion';

/**
 * The caption is the series', and it is deliberately not a date.
 *
 * "Before 2012 / After 2026" invites an argument about the year, and the year
 * is not the point: the point is that someone redesigned it. Naming the person
 * instead of the decade puts the work in the frame, lets the before be any kind
 * of bad rather than specifically an *old* kind, and stops the comparison
 * reading as "technology improved".
 */
const VIEWS = [
  { id: 'before', label: 'Before CJ' },
  { id: 'after', label: 'After CJ' },
] as const;

/**
 * The control that swaps the two designs.
 *
 * It belongs to neither of them, so it is styled like neither: a dark pill in
 * the page's own sans, floating clear of both layouts at the bottom of the
 * viewport, in neither page's typeface and in neither page's palette. The
 * moment it adopts the typography of the design on screen it starts to read as
 * part of that design rather than as the thing showing it.
 *
 * It is a `radiogroup` rather than two buttons, so the arrow keys move between
 * the two views the way they would in any segmented control, and a screen
 * reader announces which design is on screen instead of two unrelated buttons.
 * There is no date on it and no progress bar under it: the control says which
 * of two designs you are looking at, and nothing else.
 * The thumb slides under the labels on the same clock as the crossfade, so the
 * control and the page finish together.
 */
export function Toggle({
  view,
  onChange,
}: {
  view: 'before' | 'after';
  onChange: (next: 'before' | 'after') => void;
}) {
  const index = view === 'before' ? 0 : 1;

  const step = (delta: number) => {
    const next = VIEWS[(index + delta + VIEWS.length) % VIEWS.length];
    onChange(next.id);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Which design to show"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          step(1);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          step(-1);
        }
      }}
      className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 gap-0 rounded-full bg-black/85 p-1.5 font-sans backdrop-blur-md"
      style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.35)' }}
    >
      {/* The thumb, sized to one half and slid across the other. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-full bg-white"
        style={{
          transform: `translateX(${index * 100}%)`,
          transitionProperty: 'transform',
          transitionDuration: `${SWAP_MS}ms`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {VIEWS.map((v) => {
        const active = v.id === view;
        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(v.id)}
            className="relative flex w-[116px] items-center justify-center rounded-full px-5 py-3.5 transition-colors"
            style={{
              color: active ? '#000' : 'rgba(255, 255, 255, 0.7)',
              transitionDuration: `${SWAP_MS}ms`,
            }}
          >
            <span className="text-[13px] font-semibold leading-none tracking-[-0.01em]">
              {v.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
