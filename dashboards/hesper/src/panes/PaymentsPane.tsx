import { useMemo, useState } from 'react';

import { BarPair } from '@/charts/BarPair';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, IconButton, SearchBox, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  INVOICES,
  INVOICE_LABEL,
  MATTERS,
  billed,
  billingByMonth,
  clientOf,
  collected,
  matterOf,
  outstanding,
  overdue,
  personOf,
  type Invoice,
  type InvoiceStatus,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

type Lens = 'all' | InvoiceStatus | 'open';
type SortKey = 'issued' | 'amount' | 'client';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'issued', label: 'Newest first' },
  { id: 'amount', label: 'Largest first' },
  { id: 'client', label: 'By client' },
];

const TONE: Record<InvoiceStatus, 'positive' | 'warn' | 'danger'> = {
  paid: 'positive',
  due: 'warn',
  overdue: 'danger',
};

const day = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * Payment. Assembly only (rule 4).
 *
 * Every figure on this tab is the same `rate x hours` the Overview and Task
 * tabs read: the four stats are sums over the invoice list under them, and
 * the chart is those invoices grouped by their own issue and payment dates.
 * Press a stat and the list below is filtered to exactly the invoices that
 * stat counted — which is the test that the two agree.
 */
export function PaymentsPane() {
  const [lens, setLens] = useState<Lens>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('issued');
  const [open, setOpen] = useState<string | null>(null);

  const months = useMemo(() => billingByMonth(), []);
  const totalBilled = billed();
  const totalCollected = collected();

  const stats: {
    id: Lens;
    label: string;
    value: number;
    tone: 'ink' | 'positive' | 'warn' | 'danger';
  }[] = [
    { id: 'all', label: 'Billed this year', value: totalBilled, tone: 'ink' },
    { id: 'paid', label: 'Collected', value: totalCollected, tone: 'positive' },
    { id: 'open', label: 'Outstanding', value: outstanding(), tone: 'warn' },
    { id: 'overdue', label: 'Overdue', value: overdue(), tone: 'danger' },
  ];

  const q = query.trim().toLowerCase();
  const rows = INVOICES.filter((i) =>
    lens === 'all' ? true : lens === 'open' ? i.status !== 'paid' : i.status === lens,
  )
    .filter((i) => {
      if (!q) return true;
      const m = matterOf(i.matterId);
      return (i.id + ' ' + m.title + ' ' + clientOf(m.clientId).name).toLowerCase().includes(q);
    })
    .slice()
    .sort((a, b) =>
      sort === 'issued'
        ? b.issued.localeCompare(a.issued)
        : sort === 'amount'
          ? b.amount - a.amount
          : clientOf(matterOf(a.matterId).clientId).name.localeCompare(
              clientOf(matterOf(b.matterId).clientId).name,
            ),
    );

  return (
    <div data-pane="payments" className="flex h-full flex-col">
      <PageHead
        title="Billing and payments"
        action={
          <SelectPill name="sort" value={sort} options={SORTS} onChange={(id) => setSort(id)} />
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1.08fr_1fr] grid-rows-[auto_1fr] gap-4">
        <ul className="col-span-2 m-0 grid list-none grid-cols-4 gap-4 p-0">
          {stats.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                data-stat={s.id}
                aria-pressed={lens === s.id}
                onClick={() => setLens(lens === s.id ? 'all' : s.id)}
                className={cx(
                  'w-full rounded-[var(--radius-card)] border px-5 py-4 text-left transition-colors',
                  lens === s.id
                    ? 'border-accent bg-accent-faint'
                    : 'border-line bg-surface hover:bg-sunken shadow-[var(--shadow-card)]',
                )}
              >
                <span className="text-muted block text-[12.5px]">{s.label}</span>
                <span
                  className={cx(
                    'tnum mt-2 block text-[26px] leading-none font-bold tracking-[-0.03em]',
                    s.tone === 'ink' && 'text-ink',
                    s.tone === 'positive' && 'text-positive',
                    s.tone === 'warn' && 'text-warn',
                    s.tone === 'danger' && 'text-danger',
                  )}
                >
                  {usd(s.value)}
                </span>
                <span className="mt-3 block">
                  <Meter
                    value={(s.value / totalBilled) * 100}
                    height={6}
                    tone={s.id === 'overdue' ? 'danger' : s.id === 'paid' ? 'accent' : 'bright'}
                  />
                </span>
                <span className="text-muted tnum mt-2 block text-[11.5px]">
                  {/* "100% of billed" under the billed total is a sentence
                      saying nothing, so that one card counts the invoices
                      instead. */}
                  {s.id === 'all'
                    ? `${INVOICES.length} invoices`
                    : `${Math.round((s.value / totalBilled) * 1000) / 10}% of billed`}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <Card pane="billing" className="min-h-0 p-5">
          <CardHead
            title="Billed and collected"
            note="By the month each invoice was issued and paid"
            action={<IconButton icon="dots" label="Billing options" size={36} tone="outline" />}
          />

          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <BarPair
              pairs={months.map((m) => ({ label: m.month, a: m.billed, b: m.collected }))}
              format={(n) => (n === 0 ? '0' : '$' + short(n))}
              names={['billed', 'collected']}
              label={
                'Billed and collected by month: ' +
                months
                  .map((m) => `${m.month} billed ${usd(m.billed)}, collected ${usd(m.collected)}`)
                  .join('; ')
              }
            />
          </div>

          <ul className="m-0 mt-3 flex shrink-0 list-none items-center gap-4 p-0">
            {[
              { k: 'Billed', token: '--color-accent', v: totalBilled },
              { k: 'Collected', token: '--color-accent-pale', v: totalCollected },
            ].map((l) => (
              <li key={l.k} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{ background: `var(${l.token})` }}
                  className="h-2.5 w-2.5 rounded-[3px]"
                />
                <span className="text-muted text-[12px]">{l.k}</span>
                <span className="tnum text-ink text-[12px] font-bold">{usd(l.v)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card pane="invoices" className="min-h-0 p-5">
          <CardHead
            title="Invoices"
            note={
              lens === 'all'
                ? `${INVOICES.length} raised against ${MATTERS.length} matters`
                : `Filtered to ${lens === 'open' ? 'outstanding' : INVOICE_LABEL[lens as InvoiceStatus].toLowerCase()}`
            }
            action={
              lens === 'all' ? undefined : (
                <Button size="sm" variant="quiet" name="clear-lens" onClick={() => setLens('all')}>
                  Clear
                  <Icon name="close" size={13} strokeWidth={2.2} />
                </Button>
              )
            }
          />

          <div className="mt-3 flex shrink-0 items-center gap-2.5">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search invoices, matters and clients"
              name="invoices"
              className="min-w-0 flex-1"
            />
            <Badge>
              {rows.length} of {INVOICES.length}
            </Badge>
          </div>

          <div data-scroller="invoices" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((inv) => (
                  <li key={inv.id}>
                    <InvoiceRow
                      invoice={inv}
                      open={open === inv.id}
                      onToggle={() => setOpen(open === inv.id ? null : inv.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="invoice" query={query || 'that filter'} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function InvoiceRow({
  invoice,
  open,
  onToggle,
}: {
  invoice: Invoice;
  open: boolean;
  onToggle: () => void;
}) {
  const matter = matterOf(invoice.matterId);
  const client = clientOf(matter.clientId);
  const owner = personOf(matter.ownerId);

  return (
    <button
      type="button"
      data-row={invoice.id}
      aria-expanded={open}
      onClick={onToggle}
      className={cx(
        'w-full rounded-xl border px-3.5 py-3 text-left transition-colors',
        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span className="flex items-center gap-3">
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13.5px] font-semibold">{client.name}</span>
          <span className="text-muted mt-0.5 block truncate text-[12px]">
            {invoice.id} · {matter.title}
          </span>
        </span>
        <span className="tnum text-ink shrink-0 text-[14px] font-bold">{usd(invoice.amount)}</span>
        <Badge tone={TONE[invoice.status]}>{INVOICE_LABEL[invoice.status]}</Badge>
        <Icon
          name="chevron-down"
          size={14}
          strokeWidth={2.2}
          className={cx(
            'text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </span>

      {open ? (
        <span className="border-line mt-3 block border-t pt-3">
          <span className="grid grid-cols-4 gap-3">
            {[
              { k: 'Issued', v: day(invoice.issued) },
              { k: 'Due', v: day(invoice.due) },
              {
                k: invoice.paidOn ? 'Paid' : 'Status',
                v: invoice.paidOn ? day(invoice.paidOn) : INVOICE_LABEL[invoice.status],
              },
              { k: 'Fee earner', v: owner.name },
            ].map((d) => (
              <span key={d.k} className="block">
                <span className="text-muted block text-[11px]">{d.k}</span>
                <span className="text-ink mt-1 block truncate text-[12.5px] font-semibold">
                  {d.v}
                </span>
              </span>
            ))}
          </span>
          <span className="text-muted mt-2.5 block text-[11.5px]">
            {matter.hours} hours at USD {matter.rate}/h on {matter.type.toLowerCase()} work — this
            invoice is {Math.round((invoice.amount / (matter.hours * matter.rate)) * 100)}% of the
            matter.
          </span>
        </span>
      ) : null}
    </button>
  );
}
