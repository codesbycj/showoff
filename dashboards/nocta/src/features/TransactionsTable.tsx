import { useState } from 'react';

import { Card, CardHead } from '@/components/Card';
import { Segmented, SelectPill } from '@/components/Controls';
import { TRANSACTIONS, type Txn } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type DirId = 'all' | 'in' | 'out';

const DIRS: { id: DirId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'in', label: 'Money in' },
  { id: 'out', label: 'Money out' },
];

const CATEGORIES = [
  { id: 'all', label: 'All categories' },
  { id: 'activity', label: 'Activity' },
  { id: 'meals', label: 'Meals' },
  { id: 'office', label: 'Office supplies' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'internet', label: 'Internet & Telephone' },
  { id: 'other', label: 'Other' },
] as const;

type CatId = (typeof CATEGORIES)[number]['id'];

const COLS = 'grid-cols-[minmax(0,1fr)_160px_104px_120px_104px]';

/**
 * Every transaction, narrowed three ways.
 *
 * The footer totals what is *shown*, not everything, so one click on a filter
 * changes two numbers on screen — which is what makes it obvious on film that
 * the control did something.
 */
export function TransactionsTable({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [dir, setDir] = useState<DirId>('all');
  const [cat, setCat] = useState<CatId>('all');

  const q = query.trim().toLowerCase();
  const rows = TRANSACTIONS.filter((t) => (dir === 'all' ? true : t.direction === dir))
    .filter((t) => (cat === 'all' ? true : t.categoryId === cat))
    .filter((t) =>
      q ? (t.merchant + ' ' + t.category + ' ' + t.method).toLowerCase().includes(q) : true,
    );

  const inSum = rows.filter((t) => t.direction === 'in').reduce((s, t) => s + t.amount, 0);
  const outSum = rows.filter((t) => t.direction === 'out').reduce((s, t) => s + t.amount, 0);

  return (
    <Card pane="txns" className="col-span-2 min-h-0 p-5 pr-3">
      <CardHead
        title={
          <>
            Transactions{' '}
            <span className="text-muted ml-1 text-[14px] font-normal">{rows.length}</span>
          </>
        }
        className="pr-2"
        action={
          <>
            <Segmented name="Direction" value={dir} options={DIRS} onChange={setDir} />
            <SelectPill name="category" value={cat} options={CATEGORIES} onChange={setCat} />
          </>
        }
      />

      <div
        className={cx(
          'border-line text-muted mt-4 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11px] font-medium tracking-[0.04em] whitespace-nowrap uppercase',
          COLS,
        )}
      >
        <span>Merchant</span>
        <span>Category</span>
        <span>Date</span>
        <span>Method</span>
        <span className="text-right">Amount</span>
      </div>

      <div data-scroller="txns" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              Nothing matches <span className="text-ink font-semibold">{query || cat}</span>.
              <br />
              Clear the search or set the category back to All.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((txn) => (
              <li key={txn.id}>
                <Row txn={txn} selected={selected === txn.id} onSelect={() => onSelect(txn.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
        <span className="text-muted">
          {rows.length} of {TRANSACTIONS.length} transactions
        </span>
        <span className="flex items-center gap-4">
          <span className="text-positive font-semibold">+{usd(inSum, true)}</span>
          <span className="text-danger font-semibold">-{usd(outSum, true)}</span>
        </span>
      </div>
    </Card>
  );
}

function Row({ txn, selected, onSelect }: { txn: Txn; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      data-row={txn.id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'border-line grid w-full items-center gap-3 border-b py-2.5 pr-3 text-left transition-colors',
        COLS,
        selected ? 'bg-raised' : 'hover:bg-raised/60',
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          style={{ background: 'var(--color-cat-' + txn.categoryId + ')' }}
          className="h-7 w-1 shrink-0 rounded-full"
        />
        <span className="text-ink min-w-0 truncate text-[13px] font-medium">{txn.merchant}</span>
      </span>
      <span className="text-muted truncate text-[12px]">{txn.category}</span>
      <span className="text-muted text-[12px]">{txn.date}</span>
      <span className="text-muted text-[12px]">{txn.method}</span>
      <span
        className={cx(
          'text-right text-[13px] font-semibold tabular-nums',
          txn.direction === 'in' ? 'text-positive' : 'text-ink',
        )}
      >
        {(txn.direction === 'in' ? '+' : '-') + usd(txn.amount, true)}
      </span>
    </button>
  );
}
