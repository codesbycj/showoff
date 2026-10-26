import { useState } from 'react';

import { Card, CardHead, Meter } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { cardByCategory, type Currency } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

/** Where this card's money went, by category. Computed from the ledger. */
export function CardBreakdownCard({ cardId, currency }: { cardId: string; currency: Currency }) {
  const [hover, setHover] = useState<string | null>(null);
  const rows = cardByCategory(cardId);
  const max = Math.max(...rows.map((r) => r.value), 1);
  const total = rows.reduce((t, r) => t + r.value, 0);

  return (
    <Card pane="breakdown" className="min-h-0 flex-1 p-5">
      <CardHead
        title="Where it goes"
        icon={<Icon name="pie" size={16} />}
        action={
          <span className="tnum text-muted text-[12.5px]">
            {rows.reduce((t, r) => t + r.count, 0)} charges
          </span>
        }
      />

      {rows.length === 0 ? (
        <p className="text-muted m-0 mt-4 text-[13px]">
          Nothing has been charged to this card yet.
        </p>
      ) : (
        <ul className="m-0 mt-4 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-3.5 p-0">
          {rows.map((r) => (
            <li
              key={r.id}
              data-mark={'cat-' + r.id}
              onPointerEnter={() => setHover(r.id)}
              onPointerLeave={() => setHover((cur) => (cur === r.id ? null : cur))}
              className="cursor-pointer"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={cx(
                    'text-[12.5px] transition-colors',
                    hover === r.id ? 'text-ink font-semibold' : 'text-body',
                  )}
                >
                  {r.label}
                </span>
                <span className="tnum text-ink text-[12.5px] font-semibold">
                  {hover === r.id
                    ? Math.round((r.value / total) * 100) + '% of spend'
                    : money(r.value, currency)}
                </span>
              </div>
              <Meter
                value={(r.value / max) * 100}
                tone={hover === r.id ? 'fill' : 'accent'}
                height={9}
                className="mt-1.5"
              />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
