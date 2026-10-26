import { useState } from 'react';

import { Card, CardHead, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { TXNS, TXN_CATEGORIES, type Status } from '@/data/deck';
import { TransactionTable, type SortKey } from '@/features/TransactionTable';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';
import { sortTxns } from '@/lib/sortTxns';

type StatusFilter = 'all' | Status;

const STATUSES: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Failed', label: 'Failed' },
];

/**
 * The full ledger.
 *
 * The three figures above the table are summed from the rows that are
 * showing, so a filter restates them — a summary and a table that can drift
 * apart is a dashboard telling you two different things at once.
 */
export function TransactionsPane({ query }: { query: string }) {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();

  /*
   * The category list is built from `base` — everything the status filter and
   * the search let through — and *not* from the rows after a category has been
   * picked. Building it from the final rows left exactly one category standing
   * as soon as one was chosen, so there was no way to switch to another
   * without clearing first. The beat that tried reported MISSING.
   */
  const base = TXNS.filter((t) => (status === 'all' ? true : t.status === status)).filter((t) =>
    q ? (t.name + ' ' + t.category + ' ' + t.note).toLowerCase().includes(q) : true,
  );
  const rows = sortTxns(
    base.filter((t) => (category ? t.category === category : true)),
    sort,
    desc,
  );

  const total = rows.reduce((s, t) => s + t.amount, 0);
  const failed = rows.filter((t) => t.status === 'Failed').length;
  const pending = rows.filter((t) => t.status === 'Pending').length;

  const byCategory = TXN_CATEGORIES.map((c) => ({
    id: c,
    value: base.filter((t) => t.category === c).reduce((s, t) => s + t.amount, 0),
    count: base.filter((t) => t.category === c).length,
  }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.value - a.value);
  const catMax = Math.max(...byCategory.map((c) => c.value), 1);

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="transactions" className="grid h-full grid-cols-[1fr_304px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Showing"
            value={usd(total, true)}
            note={`${rows.length} of ${TXNS.length} rows`}
          />
          <Figure label="Pending" value={String(pending)} note="awaiting settlement" />
          <Figure label="Failed" value={String(failed)} note="need another attempt" tone="danger" />
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
          <TransactionTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="ledger"
          />
        </Card>
      </div>

      <Card pane="by-category" className="min-h-0 p-4">
        <CardHead
          title="By category"
          action={
            category ? (
              <button
                type="button"
                data-action="clear-category"
                onClick={() => setCategory(null)}
                className="text-accent-deep hover:bg-accent-soft flex items-center gap-1 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors"
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
          <p className="text-muted m-0 mt-4 text-[12.5px]">Nothing matches that filter.</p>
        ) : (
          <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
            {byCategory.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  data-category={c.id}
                  aria-pressed={category === c.id}
                  onClick={() => setCategory(category === c.id ? null : c.id)}
                  className={cx(
                    'w-full rounded-[10px] px-2 py-1.5 text-left transition-colors',
                    category === c.id ? 'bg-sunken' : 'hover:bg-sunken/70',
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-body text-[12px]">{c.id}</span>
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
    </div>
  );
}

function Figure({
  label,
  value,
  note,
  tone = 'ink',
}: {
  label: string;
  value: string;
  note: string;
  tone?: 'ink' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.03em]',
          tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}
