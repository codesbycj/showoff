import { useState } from 'react';

import { Card, CardHead, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Mark } from '@/components/Icon';
import { PAYMENTS, byCounterparty, type Status } from '@/data/deck';
import { PaymentHistory } from '@/features/DashCards';
import { usd } from '@/lib/format';

type FilterId = 'all' | Status;
type SortKey = 'name' | 'stamp' | 'amount';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Successful', label: 'Successful' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Failed', label: 'Failed' },
];

/**
 * The full payment history.
 *
 * The three figures above the table are summed from the rows that are showing,
 * and the counterparty split beside it is built from the same rows — so a
 * filter moves all three at once and none of them can drift.
 */
export function HistoryPane({ query }: { query: string }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = PAYMENTS.filter((p) => (filter === 'all' ? true : p.status === filter))
    .filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
      if (sort === 'amount') return (a.amount - b.amount) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const total = rows.reduce((s, p) => s + p.amount, 0);
  const failed = rows.filter((p) => p.status === 'Failed').length;
  const parties = byCounterparty(rows);
  const partyMax = Math.max(...parties.map((p) => p.value), 1);

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="history" className="grid h-full grid-cols-[1fr_320px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Showing"
            value={usd(total)}
            note={`${rows.length} of ${PAYMENTS.length} payments`}
          />
          <Figure
            label="Average"
            value={usd(rows.length ? Math.round(total / rows.length) : 0)}
            note="per payment"
          />
          <Figure label="Failed" value={String(failed)} note="need another attempt" />
        </div>

        <div className="flex shrink-0">
          <Segmented name="status" value={filter} options={FILTERS} onChange={setFilter} />
        </div>

        <PaymentHistory rows={rows} query={query} sort={sort} desc={desc} onSort={onSort} />
      </div>

      <Card pane="parties" className="min-h-0 p-4">
        <CardHead
          title="By counterparty"
          action={<span className="text-muted text-[11.5px]">{parties.length} parties</span>}
        />

        {parties.length === 0 ? (
          <p className="text-muted m-0 mt-4 text-[12.5px]">Nothing matches that filter.</p>
        ) : (
          <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
            {parties.map((p) => (
              <li key={p.id} data-mark={'party-' + p.mark}>
                <div className="flex items-center gap-2.5">
                  <Mark name={p.mark} size={30} />
                  <span className="min-w-0 flex-1">
                    <span className="text-body block truncate text-[12px]">{p.id}</span>
                    <span className="text-muted block text-[10.5px]">
                      {p.count} payment{p.count === 1 ? '' : 's'}
                    </span>
                  </span>
                  <span className="tnum text-ink shrink-0 text-[12px] font-bold">
                    {usd(p.value)}
                  </span>
                </div>
                <Meter
                  value={(p.value / partyMax) * 100}
                  tone="accent"
                  height={7}
                  className="mt-1.5"
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Figure({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card pane={'fig-' + label.toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p className="tnum text-ink m-0 mt-1.5 text-[22px] leading-none font-bold tracking-[-0.03em]">
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}
