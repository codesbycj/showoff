import { useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Card, CardHead, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { CATEGORIES, TXNS, categoryTrail, type Status } from '@/data/deck';
import { TxnTable } from '@/features/DashCards';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

type StatusFilter = 'all' | Status;
type SortKey = 'activity' | 'stamp' | 'price';

const STATUSES: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Success', label: 'Success' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Failed', label: 'Failed' },
];

const MONTH_TICKS = ['Jan', 'Apr', 'Jul', 'Oct', 'Dec'];

/**
 * The full ledger.
 *
 * The three figures above the table are summed from the rows that are showing,
 * and the category list beside it is built from the status-and-search rows —
 * not from the rows after a category has been picked, which would leave
 * exactly one category standing and no way to switch.
 */
export function TransactionsPane({ query }: { query: string }) {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const base = TXNS.filter((t) => (status === 'all' ? true : t.status === status)).filter((t) =>
    q ? (t.activity + ' ' + t.category).toLowerCase().includes(q) : true,
  );
  const rows = base
    .filter((t) => (category ? t.category === category : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'activity') return a.activity.localeCompare(b.activity) * -dir;
      if (sort === 'price') return (a.price - b.price) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const total = rows.reduce((s, t) => s + t.price, 0);
  const failed = rows.filter((t) => t.status === 'Failed').length;

  const byCategory = CATEGORIES.map((c) => ({
    id: c,
    value: base.filter((t) => t.category === c).reduce((s, t) => s + t.price, 0),
    count: base.filter((t) => t.category === c).length,
  })).filter((c) => c.count > 0);
  const catMax = Math.max(...byCategory.map((c) => c.value), 1);

  const trailFor = category ?? byCategory[0]?.id ?? CATEGORIES[0];
  /* No useMemo: `categoryTrail` is a seeded twelve-step loop, and memoising
     it on a value derived from the filtered rows is the shape the React
     compiler refuses to preserve. */
  const trail = categoryTrail(trailFor);

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="transactions" className="grid h-full grid-cols-[1fr_320px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Showing"
            value={usd(total, true)}
            note={`${rows.length} of ${TXNS.length} rows`}
          />
          <Figure
            label="Average"
            value={usd(rows.length ? total / rows.length : 0, true)}
            note="per transaction"
          />
          <Figure label="Failed" value={String(failed)} note="need another attempt" />
        </div>

        <Card pane="ledger" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <>
                Ledger{' '}
                <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
              </>
            }
            icon={<Icon name="exchange" size={16} />}
            action={
              <Segmented
                name="status"
                size="sm"
                value={status}
                options={STATUSES}
                onChange={setStatus}
              />
            }
          />
          <TxnTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="ledger"
          />
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="by-category" className="shrink-0 p-4">
          <CardHead
            title="By category"
            action={
              category ? (
                <button
                  type="button"
                  data-action="clear-category"
                  onClick={() => setCategory(null)}
                  className="text-accent-deep hover:bg-accent-faint flex items-center gap-1 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors"
                >
                  <Icon name="close" size={12} strokeWidth={2.4} />
                  Clear
                </button>
              ) : (
                <span className="text-muted text-[11.5px]">Click to filter</span>
              )
            }
          />
          {byCategory.length === 0 ? (
            <p className="text-muted m-0 mt-3 text-[12.5px]">Nothing matches that filter.</p>
          ) : (
            <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
              {byCategory.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    data-category={c.id}
                    aria-pressed={category === c.id}
                    onClick={() => setCategory(category === c.id ? null : c.id)}
                    className={cx(
                      'w-full rounded-[10px] px-2 py-1.5 text-left transition-colors',
                      category === c.id ? 'bg-accent-tint' : 'hover:bg-sunken',
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-body text-[12px]">
                        {c.id} <span className="text-muted">· {c.count}</span>
                      </span>
                      <span className="tnum text-ink text-[12px] font-bold">{usd(c.value)}</span>
                    </span>
                    <Meter
                      value={(c.value / catMax) * 100}
                      tone="accent"
                      height={7}
                      className="mt-1.5"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card pane="trail" className="min-h-0 flex-1 p-4">
          <CardHead title={`${trailFor} over the year`} icon={<Icon name="chart" size={16} />} />
          <p className="text-muted m-0 mt-1 mb-2 text-[11.5px]">
            Pick a category on the left and this follows it.
          </p>
          <AreaChart
            values={trail}
            ticks={MONTH_TICKS}
            format={(n) => '$' + short(n)}
            label={`${trailFor} spend across twelve months`}
          />
        </Card>

        <Card pane="recent-marks" className="shrink-0 p-4">
          <CardHead
            title="Most seen"
            action={<span className="text-muted text-[11.5px]">this month</span>}
          />
          <ul className="m-0 mt-3 flex list-none items-center gap-2 p-0">
            {[...new Set(base.map((t) => t.mark))].slice(0, 6).map((m) => (
              <li key={m}>
                <Mark name={m} size={34} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Figure({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card pane={'fig-' + label.toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p className="tnum text-ink m-0 mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.03em]">
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}
