import { useState } from 'react';

import { Donut, type Slice } from '@/charts/Donut';
import { Card, CardHead } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { INVOICES } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const COLOURS: Record<string, string> = {
  Card: 'var(--color-accent)',
  Transfer: 'var(--color-ink)',
  Wallet: 'var(--color-info)',
};

/**
 * How the ledger gets paid.
 *
 * Built from the invoice rows rather than from a second set of figures, so it
 * can never disagree with the table beside it — a dashboard whose chart and
 * table are separately authored is a dashboard that will eventually contradict
 * itself on camera.
 */
export function MethodMix() {
  const [active, setActive] = useState<number | null>(null);

  const slices: Slice[] = (['Card', 'Transfer', 'Wallet'] as const).map((method) => ({
    id: method,
    label: method,
    value: INVOICES.filter((i) => i.method === method).reduce((t, i) => t + i.total, 0),
    colour: COLOURS[method],
  }));
  const total = slices.reduce((t, s) => t + s.value, 0);

  return (
    <Card pane="methods" className="min-h-0 p-5">
      <CardHead
        title="Payment Methods"
        icon="wallet"
        action={<IconButton icon="dots" label="More actions" square size={34} />}
      />

      <div className="grid min-h-0 flex-1 place-items-center">
        <Donut slices={slices} active={active} onHover={setActive} size={212} thickness={28} />
      </div>

      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {slices.map((slice, i) => (
          <li key={slice.id}>
            <button
              type="button"
              data-legend={slice.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
              aria-pressed={active === i}
              className={cx(
                'flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors',
                active === i ? 'bg-sunken' : 'hover:bg-sunken/60',
              )}
            >
              <span
                aria-hidden="true"
                style={{ background: slice.colour }}
                className="h-2.5 w-2.5 shrink-0 rounded-full"
              />
              <span className="text-body min-w-0 flex-1 truncate text-[13px] font-semibold">
                {slice.label}
              </span>
              <span className="text-ink text-[13px] font-bold">{usd(slice.value)}</span>
              <span className="text-muted w-9 shrink-0 text-right text-[12px] tabular-nums">
                {Math.round((slice.value / total) * 100)}%
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
