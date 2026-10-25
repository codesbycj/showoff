import { useState } from 'react';

import { ScoreMeter } from '@/charts/ScoreMeter';
import { StateBadge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { INVOICES, PAYMENT_SCORE, type Invoice, type InvoiceState } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const STATES: InvoiceState[] = ['Unpaid', 'Pending', 'Paid'];
const BAR: Record<InvoiceState, string> = {
  Unpaid: 'bg-danger',
  Pending: 'bg-warn',
  Paid: 'bg-positive',
};

/**
 * The ledger in three figures, and the selected invoice under them.
 *
 * Every number here is computed from the same rows the table shows, so the two
 * can never disagree — a dashboard whose summary and table are separately
 * authored will eventually contradict itself on camera.
 */
export function LedgerHealth({ invoice }: { invoice: Invoice }) {
  const [chased, setChased] = useState(false);
  const total = INVOICES.reduce((t, i) => t + i.amount, 0);
  const owed = INVOICES.filter((i) => i.state !== 'Paid').slice(0, 4);

  const rows = STATES.map((state) => {
    const items = INVOICES.filter((i) => i.state === state);
    return { state, count: items.length, sum: items.reduce((t, i) => t + i.amount, 0) };
  });

  return (
    <Card pane="health" className="min-h-0 overflow-hidden p-5">
      <CardHead title="Ledger health" />

      <div className="mt-3">
        <ScoreMeter score={PAYMENT_SCORE} />
      </div>

      <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
        {rows.map((row) => (
          <li key={row.state}>
            <div className="flex items-baseline justify-between gap-2">
              <StateBadge state={row.state} />
              <span className="text-ink text-[13px] font-semibold tabular-nums">
                {usd(row.sum, true)}
              </span>
            </div>
            <span className="bg-sunken mt-2 block h-1.5 overflow-hidden rounded-full">
              <span
                style={{ width: (row.sum / total) * 100 + '%' }}
                className={cx(
                  'block h-full rounded-full transition-[width] duration-500',
                  BAR[row.state],
                )}
              />
            </span>
            <p className="text-muted m-0 mt-1.5 text-[11.5px]">
              {row.count} invoice{row.count === 1 ? '' : 's'} ·{' '}
              {Math.round((row.sum / total) * 100)}% of the ledger
            </p>
          </li>
        ))}
      </ul>

      <div className="border-line mt-5 rounded-2xl border p-4">
        <p className="text-muted m-0 text-[11px] font-medium tracking-[0.04em] uppercase">
          Selected
        </p>
        <p className="text-ink m-0 mt-1.5 text-[14px] font-semibold">{invoice.name}</p>
        <p className="text-muted m-0 mt-0.5 text-[12px]">
          {invoice.ref} · issued {invoice.date} · due {invoice.due}
        </p>
        <p className="text-ink m-0 mt-3 text-[22px] leading-none font-semibold tracking-[-0.02em]">
          {usd(invoice.amount, true)}
        </p>
      </div>

      {/* What is still owed, soonest first — out of the same rows the table
          shows, so the two can never disagree. */}
      <div className="border-line mt-4 min-h-0 flex-1 border-t pt-3">
        <p className="text-muted m-0 text-[11px] font-medium tracking-[0.04em] uppercase">
          Still owed
        </p>
        <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
          {owed.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cx('h-1.5 w-1.5 shrink-0 rounded-full', BAR[item.state])}
              />
              <span className="text-body min-w-0 flex-1 truncate text-[12px]">{item.name}</span>
              <span className="text-muted shrink-0 text-[11.5px]">{item.due}</span>
              <span className="text-ink shrink-0 text-[12px] font-medium tabular-nums">
                {usd(item.amount, true)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-chase
        onClick={() => setChased((v) => !v)}
        aria-pressed={chased}
        disabled={invoice.state === 'Paid'}
        className={cx(
          'mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors',
          invoice.state === 'Paid'
            ? 'bg-sunken text-muted cursor-not-allowed'
            : chased
              ? 'bg-positive-soft text-positive'
              : 'bg-accent text-[#0b1626]',
        )}
      >
        <Icon name={chased ? 'check' : 'send'} size={15} />
        {invoice.state === 'Paid' ? 'Already paid' : chased ? 'Reminder sent' : 'Send reminder'}
      </button>
    </Card>
  );
}
