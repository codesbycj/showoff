import { useState } from 'react';

import { Card, CardHead } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { Flag } from '@/components/Icon';
import { MARKETS } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * Revenue by country.
 *
 * The reference draws a share percentage in a pill and nothing to scale, so the
 * three rows say "40%", "25%", "10%" and the reader has to hold the comparison
 * in their head. Here the row's own border fills to that share — the pill and
 * the bar are the same number, and the ranking is visible without reading.
 */
export function TopMarket() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Card pane="market" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Top Market"
        icon="globe"
        action={<IconButton icon="dots" label="More actions" square size={34} />}
      />

      <ul
        data-scroller="markets"
        className="scroll-region m-0 mt-2.5 flex min-h-0 flex-1 list-none flex-col gap-1.5 p-0 pr-1"
      >
        {MARKETS.map((market) => {
          const on = active === market.id;
          return (
            <li key={market.id}>
              <button
                type="button"
                data-market={market.id}
                onMouseEnter={() => setActive(market.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(market.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((cur) => (cur === market.id ? null : market.id))}
                aria-pressed={on}
                className={cx(
                  'border-line relative flex w-full items-center gap-2.5 overflow-hidden rounded-2xl border px-3 py-2 text-left transition-colors',
                  on ? 'bg-sunken' : 'hover:bg-sunken/60',
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ width: market.share + '%' }}
                  className="bg-accent absolute bottom-0 left-0 h-[3px] transition-[width] duration-500"
                />
                <Flag country={market.id} size={26} />
                <span className="text-ink min-w-0 flex-1 truncate text-[13px] font-bold">
                  {market.label}
                </span>
                <span className="text-body text-[13px] font-bold">{usd(market.revenue)}</span>
                <span className="bg-accent-soft text-accent-deep rounded-full px-2 py-[2px] text-[11.5px] font-bold">
                  {market.share}%
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
