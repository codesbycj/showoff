import { useState } from 'react';

import { StateBadge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { Segmented } from '@/components/Controls';
import { INVOICES, type Invoice, type InvoiceState } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type FilterId = 'all' | InvoiceState;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Unpaid', label: 'Unpaid' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Paid', label: 'Paid' },
];

const COLS = 'grid-cols-[92px_minmax(0,1fr)_112px_104px_112px]';

/** The whole ledger of invoices, filtered by state and by the shell's search. */
export function InvoicesTable({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [filter, setFilter] = useState<FilterId>('all');

  const q = query.trim().toLowerCase();
  const rows = INVOICES.filter((i) => (filter === 'all' ? true : i.state === filter)).filter((i) =>
    q ? (i.name + ' ' + i.ref + ' ' + i.state).toLowerCase().includes(q) : true,
  );
  const sum = rows.reduce((t, i) => t + i.amount, 0);

  return (
    <Card pane="invoice-table" className="col-span-2 min-h-0 p-5 pr-3">
      <CardHead
        title={
          <>
            Invoices <span className="text-muted ml-1 text-[14px] font-normal">{rows.length}</span>
          </>
        }
        className="pr-2"
        action={
          <Segmented name="Invoice state" value={filter} options={FILTERS} onChange={setFilter} />
        }
      />

      <div
        className={cx(
          'border-line text-muted mt-4 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11px] font-medium tracking-[0.04em] whitespace-nowrap uppercase',
          COLS,
        )}
      >
        <span>Reference</span>
        <span>Client</span>
        <span>Issued</span>
        <span>State</span>
        <span className="text-right">Amount</span>
      </div>

      <div data-scroller="invoice-table" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              No invoice matches <span className="text-ink font-semibold">{query || filter}</span>.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((invoice) => (
              <li key={invoice.id}>
                <Row
                  invoice={invoice}
                  selected={selected === invoice.id}
                  onSelect={() => onSelect(invoice.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
        <span>
          {rows.length} of {INVOICES.length} invoices
        </span>
        <span className="text-ink font-semibold">{usd(sum, true)}</span>
      </div>
    </Card>
  );
}

function Row({
  invoice,
  selected,
  onSelect,
}: {
  invoice: Invoice;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-row={invoice.id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'border-line grid w-full items-center gap-3 border-b py-2.5 pr-3 text-left transition-colors',
        COLS,
        selected ? 'bg-raised' : 'hover:bg-raised/60',
      )}
    >
      <span className="text-muted text-[12px] tabular-nums">{invoice.ref}</span>
      <span className="flex min-w-0 items-center gap-2.5">
        <img
          src={invoice.face}
          alt={invoice.name}
          width={26}
          height={26}
          className="h-[26px] w-[26px] shrink-0 rounded-full object-cover"
        />
        <span className="text-ink min-w-0 truncate text-[13px] font-medium">{invoice.name}</span>
      </span>
      <span className="text-muted text-[12px]">{invoice.date}</span>
      <span>
        <StateBadge state={invoice.state} />
      </span>
      <span className="text-ink text-right text-[13px] font-semibold tabular-nums">
        {usd(invoice.amount, true)}
      </span>
    </button>
  );
}
