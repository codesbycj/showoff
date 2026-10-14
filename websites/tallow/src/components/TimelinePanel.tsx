import type { ReactNode } from 'react';

/**
 * The editor chrome the tiles land in.
 *
 * The reference ships this as a flat 1576x783 PNG laid over the section at
 * 115% width. That is not reusable and does not resize, so it is rebuilt here
 * as DOM: a transport row, a ruler, and the track the tiles drop onto. Every
 * size inside is a container query unit against the panel's own width, so the
 * chrome scales as one piece instead of the type drifting out of proportion
 * with the box at other viewport widths.
 *
 * `children` is the tile track, handed in by the section so that the component
 * knows nothing about what lands on it.
 */

/** Second markers along the ruler. The clip is nominally 12s long. */
const TICKS = [0, 1, 2, 3, 4, 5, 6, 7];

export function TimelinePanel({ children }: { children: ReactNode }) {
  return (
    <div className="timeline-inner relative flex w-full max-w-[140rem] items-end">
      {/* The panel itself, bled slightly past the track on every side. */}
      <div
        aria-hidden="true"
        className="bg-panel absolute -top-[10%] -right-[1.5%] -bottom-[5%] -left-[1.5%] rounded-[3.2cqw] ring-1 ring-white/[0.06]"
      >
        {/*
          Every size in here is a container query unit against the panel, so the
          chrome scales with the box. The `max()` floors are what stop that going
          silly at phone width, where 1.15cqw is under 4px: below the floor the
          type would be rendering as grey mush rather than as small type.
        */}
        <div className="flex h-full flex-col gap-[1.4cqw] p-[max(10px,1.8cqw)]">
          {/* Transport: play state, playhead readout, clip duration. */}
          <div className="text-panel-dim flex items-center gap-[max(8px,1.4cqw)] text-[max(10px,1.15cqw)]">
            <button
              type="button"
              tabIndex={-1}
              className="grid size-[max(22px,3.4cqw)] shrink-0 place-items-center rounded-[max(6px,1cqw)] bg-white/[0.08]"
            >
              <span className="flex gap-[max(2px,0.4cqw)]">
                <span className="h-[max(8px,1.3cqw)] w-[max(2px,0.4cqw)] rounded-[1px] bg-white/80" />
                <span className="h-[max(8px,1.3cqw)] w-[max(2px,0.4cqw)] rounded-[1px] bg-white/80" />
              </span>
            </button>

            <span className="font-mono tracking-tight tabular-nums">
              <span className="text-white/85">00:01.25</span> / 00:12
            </span>

            <span className="hidden h-[1.6cqw] w-px bg-white/15 md:block" />

            <span className="hidden items-center gap-[0.7cqw] font-mono md:flex">
              <span>Dur</span>
              <span className="rounded-[0.6cqw] bg-white/[0.12] px-[0.8cqw] py-[0.25cqw] text-white/85">
                5s
              </span>
              <span>sec</span>
            </span>
          </div>

          {/*
            Ruler. Inset by a tick label's half-width on each side, because the
            labels are centred on their marks — flush to the panel's padding the
            0s and 7s labels hang half outside it and get clipped by the corner.
          */}
          <div className="relative mx-[1.6cqw] hidden h-[2.2cqw] md:block">
            <div className="absolute inset-x-0 top-[1.75cqw] h-px bg-white/10" />
            {/* The span of the clip these blocks make up. */}
            <div className="absolute top-[1.45cqw] left-0 h-[0.6cqw] w-[46%] rounded-full bg-white/20" />
            {TICKS.map((t) => (
              <div
                key={t}
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-[0.4cqw]"
                style={{ left: `${(t / (TICKS.length - 1)) * 100}%` }}
              >
                <span className="text-panel-dim font-mono text-[1.05cqw] leading-none">{t}s</span>
                <span className="h-[0.6cqw] w-px bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
