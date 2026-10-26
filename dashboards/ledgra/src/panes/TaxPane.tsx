import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Button, SearchBox, Segmented } from '@/components/Controls';
import { Icon, Info } from '@/components/Icon';
import { TAXES, taxTotal, type Tax, type TaxStatus } from '@/data/deck';
import { cx } from '@/lib/cx';
import { idr } from '@/lib/money';

type FilterId = 'all' | TaxStatus;
type SortKey = 'label' | 'amount' | 'stamp';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Not Paid', label: 'Not Paid' },
  { id: 'Scheduled', label: 'Scheduled' },
  { id: 'Paid', label: 'Paid' },
];

const TONE: Record<TaxStatus, 'danger' | 'warn' | 'positive'> = {
  'Not Paid': 'danger',
  Scheduled: 'warn',
  Paid: 'positive',
};

const COLS = 'grid-cols-[minmax(0,1fr)_140px_110px_130px_120px]';

/**
 * Tax & Compliance.
 *
 * The sidebar puts a 3 against it — three lines not yet paid — and nothing
 * behind it, so this one is built out of the same six lines the Home tab's
 * stacked bar is computed from. Marking one paid moves the badge, the
 * outstanding figure and the bar at once.
 */
export function TaxPane({ query, onQuery }: { query: string; onQuery: (next: string) => void }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortKey>('amount');
  const [desc, setDesc] = useState(true);
  const [paid, setPaid] = useState<string[]>([]);

  const statusOf = (t: Tax): TaxStatus => (paid.includes(t.id) ? 'Paid' : t.status);

  const q = query.trim().toLowerCase();
  const rows = TAXES.filter((t) => (filter === 'all' ? true : statusOf(t) === filter))
    .filter((t) => (q ? t.label.toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'label') return a.label.localeCompare(b.label) * -dir;
      if (sort === 'stamp') return (a.stamp - b.stamp) * dir;
      return (a.amount - b.amount) * dir;
    });

  const outstanding = TAXES.filter((t) => statusOf(t) !== 'Paid').reduce((s, t) => s + t.amount, 0);
  const settled = taxTotal() - outstanding;
  const unpaid = TAXES.filter((t) => statusOf(t) === 'Not Paid').length;
  const max = Math.max(...TAXES.map((t) => t.amount), 1);

  const head = (key: SortKey, text: string, align: 'left' | 'right' = 'right') => (
    <button
      type="button"
      data-sort={key}
      aria-pressed={sort === key}
      onClick={() => {
        if (sort === key) setDesc((v) => !v);
        else {
          setSort(key);
          setDesc(true);
        }
      }}
      className={cx(
        'hover:text-ink flex items-center gap-1 transition-colors',
        align === 'right' ? 'justify-end' : 'justify-start',
        sort === key ? 'text-ink' : 'text-muted',
      )}
    >
      {text}
      <Icon
        name="chevron-down"
        size={11}
        strokeWidth={2.6}
        className={cx(
          'transition-[transform,opacity]',
          sort === key ? 'opacity-100' : 'opacity-0',
          sort === key && !desc && 'rotate-180',
        )}
      />
    </button>
  );

  return (
    <div data-pane="tax" className="grid h-full grid-cols-[1fr_320px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex shrink-0 justify-end">
          <SearchBox value={query} onChange={onQuery} placeholder="Search" className="w-[240px]" />
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Outstanding"
            value={idr(outstanding)}
            note={`${unpaid} not paid`}
            tone={unpaid ? 'danger' : 'ink'}
          />
          <Figure label="Settled" value={idr(settled)} note="cleared this cycle" tone="positive" />
          <Figure label="Total" value={idr(taxTotal())} note={`${TAXES.length} lines`} />
        </div>

        <Card pane="lines" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <span className="flex items-center gap-1.5">
                Tax lines <Info />
                <span className="text-muted ml-1 text-[12px] font-semibold">{rows.length}</span>
              </span>
            }
            action={
              <Segmented
                name="status"
                size="sm"
                value={filter}
                options={FILTERS}
                onChange={setFilter}
              />
            }
          />

          <div
            className={cx(
              'text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-2 border-b border-[var(--color-line)] px-2 pb-2 text-[10px] font-bold tracking-[0.06em] uppercase',
              COLS,
            )}
          >
            {head('label', 'Tax type', 'left')}
            {head('amount', 'Amount')}
            {head('stamp', 'Date')}
            <span className="text-right">Status</span>
            <span className="text-right">Action</span>
          </div>

          <div data-scroller="lines" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="tax line" query={query || filter} />
            ) : (
              <ul className="m-0 list-none p-0">
                {rows.map((t) => (
                  <li key={t.id}>
                    <div
                      data-row={t.id}
                      className={cx(
                        'border-line hover:bg-sunken mr-2.5 grid items-center gap-2 border-b px-2 py-2.5 transition-colors',
                        COLS,
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span
                          aria-hidden="true"
                          style={{ background: `var(${t.token})` }}
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                        />
                        <span className="text-ink min-w-0 truncate text-[12.5px] font-semibold">
                          {t.label}
                        </span>
                      </span>
                      <span className="tnum text-ink text-right text-[12px] font-bold">
                        {idr(t.amount)}
                      </span>
                      <span className="tnum text-muted text-right text-[11px]">Due: {t.due}</span>
                      <span className="flex justify-end">
                        <Badge tone={TONE[statusOf(t)]}>
                          {statusOf(t) === 'Not Paid' ? (
                            <Icon name="warning" size={11} strokeWidth={2.2} />
                          ) : null}
                          {statusOf(t)}
                        </Badge>
                      </span>
                      <span className="flex justify-end">
                        <Button
                          icon={statusOf(t) === 'Paid' ? 'check' : 'plus'}
                          variant={statusOf(t) === 'Paid' ? 'accent' : 'outline'}
                          name={'pay-' + t.id}
                          onClick={() =>
                            setPaid((cur) =>
                              cur.includes(t.id) ? cur.filter((x) => x !== t.id) : [...cur, t.id],
                            )
                          }
                          className="h-8 px-2.5 text-[11.5px]"
                        >
                          {statusOf(t) === 'Paid' ? 'Paid' : 'Mark paid'}
                        </Button>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <Card pane="split" className="min-h-0 p-4">
        <CardHead
          title={
            <span className="flex items-center gap-1.5">
              By line <Info />
            </span>
          }
          action={<span className="text-muted text-[11.5px]">{TAXES.length}</span>}
        />
        <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
          {TAXES.map((t) => (
            <li key={t.id} data-mark={'line-' + t.id}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-body min-w-0 truncate text-[12px]">{t.label}</span>
                <span className="tnum text-ink shrink-0 text-[12px] font-bold">
                  {idr(t.amount, false)}
                </span>
              </div>
              <Meter
                value={(t.amount / max) * 100}
                tone={statusOf(t) === 'Paid' ? 'accent' : 'goal'}
                height={7}
                className="mt-1.5"
              />
            </li>
          ))}
        </ul>
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
  tone?: 'ink' | 'positive' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[19px] leading-none font-bold tracking-[-0.03em]',
          tone === 'positive' && 'text-positive',
          tone === 'danger' && 'text-danger',
          tone === 'ink' && 'text-ink',
        )}
      >
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}
