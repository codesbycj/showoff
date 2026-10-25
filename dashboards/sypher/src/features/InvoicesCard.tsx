import { useState } from 'react';

import { Badge, Card, CardHead, Check, Label } from '@/components/Bits';
import { SearchBox, SelectPill } from '@/components/Controls';
import { CompanyMark, Icon } from '@/components/Icon';
import { INVOICES, invoiceTotals, type Invoice, type InvoiceState } from '@/data/deck';
import { cx } from '@/lib/cx';
import { useMeasure } from '@/lib/useMeasure';
import { short, usd } from '@/lib/format';

type FilterId = 'all' | InvoiceState;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Unpaid', label: 'Unpaid' },
  { id: 'Resent request', label: 'Resent request' },
  { id: 'Paid', label: 'Paid' },
];

/**
 * "Auto" is the default and fits the page to the card.
 *
 * A fixed ten rows leaves a band of empty table under the last one at 900px and
 * clips at 820 — the reference can show one height because it is a picture.
 * Measuring the region and paginating to it means the table is full at every
 * viewport, and the fixed sizes are still there for anyone who wants them.
 */
const PAGE_SIZES = [
  { id: 'auto', label: 'Auto' },
  { id: '10', label: '10' },
  { id: '25', label: '25' },
];

const ROW_H = 39;

const COLS = 'grid-cols-[18px_minmax(0,1.3fr)_92px_minmax(0,1.4fr)_76px_28px]';

const TONE: Record<InvoiceState, 'accent' | 'warn' | 'danger'> = {
  Paid: 'accent',
  'Resent request': 'warn',
  Unpaid: 'danger',
};

/**
 * The invoice ledger: three totals, a filter, a search, a selectable table and
 * real pagination.
 *
 * The three figures at the top are computed from the rows, so they can never
 * disagree with the table under them — and the bar beneath is those same three
 * numbers to scale.
 */
export function InvoicesCard({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const [filter, setFilter] = useState<FilterId>('Unpaid');
  const [size, setSize] = useState('auto');
  const [scroller, scrollerSize] = useMeasure<HTMLDivElement>();
  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);

  const totals = invoiceTotals();
  const q = query.trim().toLowerCase();

  const matching = INVOICES.filter((i) => (filter === 'all' ? true : i.state === filter)).filter(
    (i) => (q ? (i.company + ' ' + i.contact).toLowerCase().includes(q) : true),
  );

  const perPage =
    size === 'auto'
      ? Math.max(4, Math.floor((scrollerSize.h || ROW_H * 10) / ROW_H))
      : Number(size);
  const pages = Math.max(1, Math.ceil(matching.length / perPage));
  const current = Math.min(page, pages);
  const rows = matching.slice((current - 1) * perPage, current * perPage);

  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const allOnPage = rows.length > 0 && rows.every((r) => picked.includes(r.id));

  return (
    <Card pane="invoices" className="min-h-0 p-4 pr-2">
      <CardHead title="Invoices" className="pr-2" />

      <div className="mt-3 grid grid-cols-[1.4fr_1fr_1fr] gap-4 pr-2">
        <Figure label="Paid" value={totals.paid} total={totals.total} />
        <Figure label="Resent request" value={totals.resent} total={totals.total} />
        <Figure label="Unpaid" value={totals.unpaid} total={totals.total} />
      </div>

      <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full pr-2">
        <span
          style={{ width: (totals.paid / totals.total) * 100 + '%' }}
          className="bg-accent block h-full"
        />
        <span
          style={{ width: (totals.resent / totals.total) * 100 + '%' }}
          className="block h-full bg-[var(--color-cat-insurance)]"
        />
        <span
          style={{ width: (totals.unpaid / totals.total) * 100 + '%' }}
          className="bg-sunken-deep block h-full"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 pr-2">
        <div role="group" aria-label="Invoice state" className="flex items-center gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              data-filter={f.id}
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setPage(1);
              }}
              className={cx(
                'h-7 rounded px-2.5 text-[12px] transition-colors',
                filter === f.id ? 'bg-sunken text-ink font-semibold' : 'text-muted hover:text-ink',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <SearchBox
          value={query}
          onChange={onQuery}
          placeholder="Search"
          hint="⌘F"
          className="w-[180px]"
        />
      </div>

      <div
        className={cx(
          'border-line text-muted mt-3 grid shrink-0 items-center gap-3 border-b pr-2 pb-2 text-[11px] font-medium whitespace-nowrap',
          COLS,
        )}
      >
        <Check
          checked={allOnPage}
          onChange={() =>
            setPicked((cur) =>
              allOnPage
                ? cur.filter((id) => !rows.some((r) => r.id === id))
                : [...new Set([...cur, ...rows.map((r) => r.id)])],
            )
          }
          label="Select every invoice on this page"
          name="all"
        />
        <span>Company</span>
        <span className="flex items-center gap-1">
          Issue date
          <Icon name="arrow-up" size={10} />
        </span>
        <span>Contact</span>
        <span>Value</span>
        <span />
      </div>

      <div
        ref={scroller}
        data-scroller="invoices"
        className="scroll-region -mr-1 min-h-0 flex-1 pr-2"
      >
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[12.5px]">
              No invoice matches <span className="text-ink font-semibold">{query || filter}</span>.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((invoice) => (
              <li key={invoice.id}>
                <Row
                  invoice={invoice}
                  picked={picked.includes(invoice.id)}
                  onToggle={() => toggle(invoice.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line mt-1 flex shrink-0 items-center justify-between border-t pt-2.5 pr-2">
        <div className="text-muted flex items-center gap-2 text-[11.5px]">
          Show by
          <SelectPill
            name="size"
            value={size}
            options={PAGE_SIZES}
            onChange={(v) => {
              setSize(v);
              setPage(1);
            }}
            align="left"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-page="prev"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="text-muted hover:bg-sunken hover:text-ink grid h-7 w-7 place-items-center rounded transition-colors disabled:opacity-35"
          >
            <Icon name="chevron-left" size={14} />
          </button>
          <span data-page-label className="text-body text-[12px] tabular-nums">
            {current} <span className="text-muted">/ {pages}</span>
          </span>
          <button
            type="button"
            data-page="next"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={current === pages}
            aria-label="Next page"
            className="text-muted hover:bg-sunken hover:text-ink grid h-7 w-7 place-items-center rounded transition-colors disabled:opacity-35"
          >
            <Icon name="chevron-right" size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
}

function Figure({ label, value, total }: { label: string; value: number; total: number }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="text-ink m-0 mt-1 text-[19px] leading-none font-semibold">{short(value)}</p>
      <p className="text-muted m-0 mt-1 text-[11.5px]">{((value / total) * 100).toFixed(1)}%</p>
    </div>
  );
}

function Row({
  invoice,
  picked,
  onToggle,
}: {
  invoice: Invoice;
  picked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-invoice={invoice.id}
      className={cx(
        'border-line grid items-center gap-3 border-b py-2 pr-2 transition-colors',
        COLS,
        picked ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <Check
        checked={picked}
        onChange={onToggle}
        label={'Select ' + invoice.company}
        name={invoice.id}
      />
      <span className="flex min-w-0 items-center gap-2">
        <CompanyMark mark={invoice.mark} tint={invoice.tint} size={22} />
        <span className="text-ink min-w-0 truncate text-[12.5px] font-medium">
          {invoice.company}
        </span>
      </span>
      <span className="text-body text-[12px]">{invoice.issued}</span>
      <span className="text-muted min-w-0 truncate text-[12px]">{invoice.contact}</span>
      <span className="text-ink text-[12.5px] font-medium">{usd(invoice.value)}</span>
      <span className="justify-self-end">
        <Badge tone={TONE[invoice.state]} className="px-1.5">
          {invoice.state === 'Resent request' ? 'Resent' : invoice.state}
        </Badge>
      </span>
    </div>
  );
}
