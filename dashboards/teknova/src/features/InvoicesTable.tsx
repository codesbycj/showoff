import { useState } from 'react';

import { Avatar } from '@/components/Avatar';
import { Badge, type Tone } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { SelectPill } from '@/components/Controls';
import { INVOICES, type Invoice, type InvoiceState } from '@/data/deck';
import type { FilterId } from '@/features/InvoiceSummary';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type SortId = 'recent' | 'total' | 'customer';

const SORTS: { id: SortId; label: string }[] = [
  { id: 'recent', label: 'Most recent' },
  { id: 'total', label: 'Largest first' },
  { id: 'customer', label: 'By customer' },
];

const TONE: Record<InvoiceState, Tone> = {
  Paid: 'accent',
  Awaiting: 'info',
  Overdue: 'warn',
  Draft: 'quiet',
};

const COLS = 'grid-cols-[84px_minmax(0,1fr)_100px_100px_52px_84px_92px]';

/** The ledger itself, narrowed by the summary tiles above and by the search. */
export function InvoicesTable({ query, state }: { query: string; state: FilterId }) {
  const [sort, setSort] = useState<SortId>('recent');

  const q = query.trim().toLowerCase();
  const rows = INVOICES.filter((i) => (state === 'all' ? true : i.state === state))
    .filter((i) =>
      q ? (i.id + ' ' + i.customer + ' ' + i.method).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'total') return b.total - a.total;
      if (sort === 'customer') return a.customer.localeCompare(b.customer);
      return INVOICES.indexOf(a) - INVOICES.indexOf(b);
    });

  const sum = rows.reduce((t, i) => t + i.total, 0);

  return (
    <Card pane="invoices" className="col-span-2 min-h-0 p-5 pr-3">
      <CardHead
        title={
          <>
            Invoices{' '}
            <span className="text-muted ml-1 text-[14px] font-semibold">{rows.length}</span>
          </>
        }
        icon="receipt"
        className="pr-2"
        action={<SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />}
      />

      <div
        className={cx(
          'border-line text-muted mt-4 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11.5px] font-bold tracking-[0.04em] uppercase',
          COLS,
        )}
      >
        <span>Invoice</span>
        <span>Customer</span>
        <span>Issued</span>
        <span>Due</span>
        <span>Items</span>
        <span>Total</span>
        <span>State</span>
      </div>

      <div data-scroller="invoices" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              No invoice matches <span className="text-ink font-bold">{query || state}</span>.
              <br />
              Clear the search or press Show all.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((invoice) => (
              <li key={invoice.id}>
                <Row invoice={invoice} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
        <span>
          {rows.length} of {INVOICES.length} invoices
        </span>
        <span className="text-ink font-bold">{usd(sum)}</span>
      </div>
    </Card>
  );
}

function Row({ invoice }: { invoice: Invoice }) {
  return (
    <div
      data-invoice={invoice.id}
      className={cx(
        'border-line hover:bg-sunken/60 grid items-center gap-3 border-b py-2.5 pr-3 transition-colors',
        COLS,
      )}
    >
      <span className="text-body text-[12.5px] font-semibold">{invoice.id}</span>
      <span className="flex min-w-0 items-center gap-2">
        <Avatar src={invoice.face} name={invoice.customer} size={26} />
        <span className="text-ink min-w-0 truncate text-[13px] font-bold">{invoice.customer}</span>
      </span>
      <span className="text-body text-[12.5px]">{invoice.issued}</span>
      <span
        className={cx(
          'text-[12.5px]',
          invoice.state === 'Overdue' ? 'text-warn-deep font-semibold' : 'text-body',
        )}
      >
        {invoice.due}
      </span>
      <span className="text-body text-[12.5px] tabular-nums">{invoice.items}</span>
      <span className="text-ink text-[13px] font-bold tabular-nums">{usd(invoice.total)}</span>
      <span>
        <Badge tone={TONE[invoice.state]}>{invoice.state}</Badge>
      </span>
    </div>
  );
}
