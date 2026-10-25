import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { TRANSACTIONS, type Txn } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * The selected transaction, and how its category is running.
 *
 * Selecting a row redraws every figure here — including the category bar,
 * which is that category's share of everything on the ledger rather than a
 * fixed number, so it moves when the selection does.
 */
export function TxnDetail({ txn }: { txn: Txn }) {
  const [flagged, setFlagged] = useState(false);

  const sameCategory = TRANSACTIONS.filter((t) => t.categoryId === txn.categoryId);
  const categoryTotal = sameCategory.reduce((s, t) => s + t.amount, 0);
  const ledgerTotal = TRANSACTIONS.reduce((s, t) => s + t.amount, 0);
  const share = Math.round((categoryTotal / ledgerTotal) * 100);
  const others = sameCategory.filter((t) => t.id !== txn.id).slice(0, 4);

  const facts: [string, string][] = [
    ['Amount', (txn.direction === 'in' ? '+' : '-') + usd(txn.amount, true)],
    ['Date', txn.date],
    ['Method', txn.method],
    ['Reference', txn.id.toUpperCase().replace('T', 'TX-')],
  ];

  return (
    <Card pane="txn-detail" className="min-h-0 overflow-hidden p-5">
      <CardHead
        title={txn.merchant}
        icon={
          <span
            aria-hidden="true"
            style={{ background: 'var(--color-cat-' + txn.categoryId + ')' }}
            className="h-6 w-1.5 shrink-0 rounded-full"
          />
        }
      />

      <div className="mt-3 flex items-center gap-2">
        <Badge tone={txn.direction === 'in' ? 'positive' : 'quiet'}>
          {txn.direction === 'in' ? 'Money in' : 'Money out'}
        </Badge>
        <Badge tone="quiet">{txn.category}</Badge>
      </div>

      <p
        className={cx(
          'm-0 mt-4 text-[30px] leading-none font-semibold tracking-[-0.03em]',
          txn.direction === 'in' ? 'text-positive' : 'text-ink',
        )}
      >
        {(txn.direction === 'in' ? '+' : '-') + usd(txn.amount, true)}
      </p>

      <dl className="m-0 mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-muted text-[11px] font-medium tracking-[0.04em] uppercase">
              {label}
            </dt>
            <dd className="text-ink m-0 mt-1 text-[13.5px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-line mt-5 rounded-2xl border p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-muted text-[11px] font-medium tracking-[0.04em] uppercase">
            {txn.category}
          </span>
          <span className="text-ink text-[13px] font-semibold">{usd(categoryTotal, true)}</span>
        </div>
        <span className="bg-sunken mt-2.5 block h-2 overflow-hidden rounded-full">
          <span
            style={{ width: share + '%', background: 'var(--color-cat-' + txn.categoryId + ')' }}
            className="block h-full rounded-full transition-[width] duration-500"
          />
        </span>
        <p className="text-muted m-0 mt-2 text-[11.5px]">
          {share}% of everything on the ledger, across {sameCategory.length} transactions.
        </p>
      </div>

      {/* The rest of this category, out of the same ledger the table shows.
          Derived rather than authored, so the two can never disagree. */}
      <div className="border-line mt-4 min-h-0 flex-1 border-t pt-3">
        <p className="text-muted m-0 text-[11px] font-medium tracking-[0.04em] uppercase">
          Also in {txn.category}
        </p>
        {others.length === 0 ? (
          <p className="text-muted m-0 mt-2 text-[12px]">Nothing else in this category.</p>
        ) : (
          <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
            {others.map((other) => (
              <li key={other.id} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{ background: 'var(--color-cat-' + other.categoryId + ')' }}
                  className="h-4 w-1 shrink-0 rounded-full"
                />
                <span className="text-body min-w-0 flex-1 truncate text-[12px]">
                  {other.merchant}
                </span>
                <span className="text-muted shrink-0 text-[11.5px]">{other.date}</span>
                <span className="text-ink shrink-0 text-[12px] font-medium tabular-nums">
                  {usd(other.amount, true)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        data-flag
        onClick={() => setFlagged((v) => !v)}
        aria-pressed={flagged}
        className={cx(
          'mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors',
          flagged ? 'bg-warn-soft text-warn' : 'bg-raised text-body hover:text-ink',
        )}
      >
        <Icon name={flagged ? 'check' : 'filter'} size={15} />
        {flagged ? 'Flagged for review' : 'Flag for review'}
      </button>
    </Card>
  );
}
