import { LEG_TOKEN, type LegKind } from '@/data/deck';
import { num } from '@/lib/format';

export interface LegRow {
  kind: LegKind;
  loads: number;
  weight: number;
}

/**
 * What the week is made of, by leg.
 *
 * Horizontal, because the three labels are words rather than dates and a
 * vertical axis would turn them on their side for no gain. The bars are
 * shares of the heaviest leg, so the longest always fills its track.
 */
export function LegBars({ rows, label }: { rows: LegRow[]; label: string }) {
  const hi = Math.max(1, ...rows.map((r) => r.weight));

  return (
    <ul role="img" aria-label={label} className="m-0 flex list-none flex-col gap-3 p-0">
      {rows.map((r) => (
        <li key={r.kind}>
          <span className="flex items-baseline gap-2">
            <span className="text-ink text-[12px] font-semibold">{r.kind}</span>
            <span className="tnum text-muted ml-auto text-[11px]">
              {r.loads} {r.loads === 1 ? 'load' : 'loads'}
            </span>
            <span className="tnum text-ink w-[76px] text-right text-[12px] font-bold">
              {num(r.weight)} lbs
            </span>
          </span>
          <span className="bg-sunken mt-1.5 block h-2.5 rounded-full">
            <span
              style={{
                width: `${(r.weight / hi) * 100}%`,
                background: `var(${LEG_TOKEN[r.kind]})`,
              }}
              className="block h-full rounded-full transition-[width] duration-500"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
