import { useState } from 'react';

import { Card, CardHead, Empty } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { CARD_TXNS, type Currency } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Shopping', label: 'Shopping' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Food', label: 'Food' },
  { id: 'Bills', label: 'Bills' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

/** What this card has been spent on. Filterable, searchable, with a total. */
export function CardSpendCard({
  cardId,
  currency,
  query,
}: {
  cardId: string;
  currency: Currency;
  query: string;
}) {
  const [filter, setFilter] = useState<FilterId>('all');

  const q = query.trim().toLowerCase();
  const rows = CARD_TXNS.filter((t) => t.cardId === cardId)
    .filter((t) => (filter === 'all' ? true : t.category === filter))
    .filter((t) => (q ? (t.title + ' ' + t.category).toLowerCase().includes(q) : true));

  const total = rows.reduce((t, r) => t + Math.abs(r.amount), 0);

  return (
    <Card pane="card-spend" className="min-h-0 p-5 pr-2">
      <CardHead
        className="pr-3"
        title="Card Spend"
        icon={<Icon name="receipt" size={16} />}
        action={
          <span className="tnum text-ink text-[14px] font-semibold">{money(total, currency)}</span>
        }
      />

      <Segmented
        name="category"
        size="sm"
        className="mt-3 mr-3 self-start"
        value={filter}
        options={FILTERS}
        onChange={setFilter}
      />

      <div data-scroller="card-spend" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="charge" query={query || filter} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((t) => (
              <li key={t.id}>
                <div
                  data-row={t.id}
                  className="hover:bg-sunken flex items-center gap-3 rounded-2xl p-2.5 transition-colors"
                >
                  <Mark name={t.mark} size={32} />
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[12.5px] font-semibold">
                      {t.title}
                    </span>
                    <span className="text-muted block truncate text-[11px]">
                      {t.category} · {t.when}
                    </span>
                  </span>
                  <span className={cx('tnum text-ink shrink-0 text-[12.5px] font-semibold')}>
                    {money(t.amount, currency)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
