import { useMemo, useState } from 'react';

import { Donut } from '@/charts/Donut';
import { ReportBars } from '@/charts/ReportBars';
import { RevenueBars } from '@/charts/RevenueBars';
import { Badge, Card, CardHead, Delta, Empty } from '@/components/Bits';
import { Button, IconButton, SelectPill } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import {
  PERFORMANCE,
  PULSE,
  REPORT,
  SPANS,
  TXNS,
  perfTotal,
  productOf,
  revenue,
  txnTotal,
  type Status,
  type Txn,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

const TONE: Record<Status, 'positive' | 'warn' | 'danger'> = {
  Completed: 'positive',
  Pending: 'warn',
  Refunded: 'danger',
};

/** The dark "Update" card at the top of the row. */
export function PulseCard({ onSeeStats }: { onSeeStats: () => void }) {
  return (
    <section
      data-card="pulse"
      className="bg-forest relative flex min-h-0 flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-4"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 220 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <circle cx="198" cy="150" r="78" fill="var(--color-accent)" opacity="0.12" />
      </svg>

      <p className="relative m-0 flex items-center gap-2">
        <span className="bg-accent h-2 w-2 rounded-full" />
        <span className="text-forest-fg text-[12px] font-bold">Update</span>
        <span className="text-forest-fg/65 text-[11px]">{PULSE.date}</span>
      </p>

      <p className="text-forest-fg relative m-0 mt-3 text-[15px] leading-[21px] font-bold">
        {PULSE.headline}
      </p>

      <button
        type="button"
        data-action="see-stats"
        onClick={onSeeStats}
        className="text-accent relative mt-3 flex items-center gap-1.5 self-start text-[12.5px] font-bold transition-opacity hover:opacity-80"
      >
        See Statistics
        <Icon name="arrow-right" size={14} strokeWidth={2.2} />
      </button>
    </section>
  );
}

/** Net Income and Total Return, both summed from the ledger. */
export function MoneyCard({
  label,
  value,
  delta,
  goodWhen = 'up',
}: {
  label: string;
  value: number;
  delta: number;
  goodWhen?: 'up' | 'down';
}) {
  return (
    <Card
      pane={'money-' + label.split(' ')[0].toLowerCase()}
      className="min-h-0 justify-between p-4"
    >
      <div className="flex items-start justify-between">
        <p className="text-muted m-0 text-[12px]">{label}</p>
        <IconButton icon="dots" label={label + ' options'} size={28} />
      </div>
      <p
        data-figure={label.split(' ')[0].toLowerCase()}
        className="tnum text-ink m-0 mt-3 text-[27px] leading-none font-extrabold tracking-[-0.03em]"
      >
        {usd(value)}
      </p>
      <p className="m-0 mt-2 flex items-center gap-1.5">
        <Delta value={delta} goodWhen={goodWhen} />
        <span className="text-muted text-[11.5px]">from last month</span>
      </p>
    </Card>
  );
}

/** The transaction list down the left of the reference. */
export function TransactionList({
  query,
  open,
  onOpen,
  onSeeAll,
}: {
  query: string;
  open: string | null;
  onOpen: (id: string | null) => void;
  onSeeAll: () => void;
}) {
  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) =>
    q ? (productOf(t).name + ' ' + t.ref).toLowerCase().includes(q) : true,
  );

  return (
    <Card pane="txn-list" className="min-h-0 flex-1 p-4 pr-1.5">
      <CardHead
        className="pr-2.5"
        title="Transaction"
        action={<IconButton icon="dots" label="Transaction options" onClick={onSeeAll} />}
      />

      <div data-scroller="txns" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="order" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((t) => (
              <li key={t.id}>
                <TxnRow
                  txn={t}
                  open={open === t.id}
                  onToggle={() => onOpen(open === t.id ? null : t.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function TxnRow({ txn, open, onToggle }: { txn: Txn; open: boolean; onToggle: () => void }) {
  const product = productOf(txn);
  return (
    <div
      className={cx('rounded-[11px] transition-colors', open ? 'bg-sunken' : 'hover:bg-sunken/70')}
    >
      <button
        type="button"
        data-row={txn.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-2.5 p-2 text-left"
      >
        <Mark name={product.mark} size={34} />
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[12.5px] font-bold">{product.name}</span>
          <span className="text-muted block truncate text-[10.5px]">{txn.date}</span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <Badge tone={TONE[txn.status]}>{txn.status}</Badge>
          <span className="tnum text-muted text-[10px] tracking-[0.04em]">{txn.ref}</span>
        </span>
      </button>

      {open ? (
        <dl className="text-body m-0 grid grid-cols-3 gap-2 px-3 pb-2.5 text-[11px]">
          <div>
            <dt className="text-muted m-0">Quantity</dt>
            <dd className="tnum text-ink m-0 font-bold">{txn.qty}</dd>
          </div>
          <div>
            <dt className="text-muted m-0">Unit</dt>
            <dd className="tnum text-ink m-0 font-bold">{usd(product.price)}</dd>
          </div>
          <div>
            <dt className="text-muted m-0">Total</dt>
            <dd className="tnum text-ink m-0 font-bold">{usd(txnTotal(txn))}</dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}

/** The Revenue card, with its own span control. */
export function RevenueCard() {
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const months = useMemo(() => revenue(spanId), [spanId]);
  const income = months.reduce((t, m) => t + m.income, 0);
  const expenses = months.reduce((t, m) => t + m.expenses, 0);
  /* Margin as a share of income, which is what a margin is. */
  const delta = Math.round(((income - expenses) / Math.max(1, income)) * 100);

  return (
    <Card pane="revenue" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Revenue"
        action={
          <>
            <Legend tone="var(--color-forest)" label="Income" />
            <Legend tone="var(--color-accent)" label="Expenses" />
            <SelectPill
              name="span"
              value={spanId}
              options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
              onChange={setSpanId}
            />
          </>
        }
      />

      <p className="m-0 mt-2.5 flex flex-wrap items-baseline gap-2.5">
        <span
          data-figure="revenue"
          className="tnum text-ink text-[23px] leading-none font-extrabold tracking-[-0.03em]"
        >
          {usd(income)}
        </span>
        <Delta value={delta} />
        <span className="text-muted text-[11.5px]">margin over the window</span>
      </p>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <RevenueBars
          months={months}
          label={
            'Income against expenses: ' +
            months
              .map((m) => `${m.label} in ${short(m.income)}, out ${short(m.expenses)}`)
              .join('; ')
          }
        />
      </div>
    </Card>
  );
}

function Legend({ tone, label }: { tone: string; label: string }) {
  return (
    <span className="text-body flex items-center gap-1.5 text-[11.5px] font-semibold">
      <span aria-hidden="true" style={{ background: tone }} className="h-2 w-2 rounded-full" />
      {label}
    </span>
  );
}

/** The Sales Report bars. */
export function SalesReportCard() {
  return (
    <Card pane="report" className="min-h-0 flex-1 p-4">
      <CardHead title="Sales Report" action={<IconButton icon="dots" label="Report options" />} />
      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <ReportBars
          bars={REPORT}
          label={'Sales report: ' + REPORT.map((b) => `${b.label} ${b.value}`).join(', ')}
        />
      </div>
    </Card>
  );
}

/** Total View Performance: the ring, its tip and its legend. */
export function PerformanceCard({ onGuide, guided }: { onGuide: () => void; guided: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const total = perfTotal();
  const current = PERFORMANCE.find((s) => s.id === active);

  return (
    <Card pane="performance" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Total View Performance"
        action={<IconButton icon="dots" label="Performance options" />}
      />

      <div className="mt-3 grid min-h-0 flex-1 place-items-center">
        <Donut
          slices={PERFORMANCE}
          size={158}
          thickness={22}
          sweep={360}
          from={-90}
          active={active}
          onActive={setActive}
          center={
            <div>
              <p className="text-muted m-0 text-[10.5px]">
                {current ? current.label : 'Total Count'}
              </p>
              <p className="tnum text-ink m-0 mt-1 text-[21px] leading-none font-extrabold tracking-[-0.02em]">
                {short(current ? current.value : total)}
              </p>
            </div>
          }
        />
      </div>

      <p className="text-muted m-0 mt-3 text-center text-[11.5px] leading-[16px]">
        {guided
          ? 'Lift your score by listing two more products this week and replying to reviews within a day.'
          : 'Here are some tips on how to improve your score.'}
      </p>

      <Button
        variant="outline"
        name="guide"
        onClick={onGuide}
        className="mt-3 w-full justify-center"
      >
        {guided ? 'Hide tips' : 'Guide Views'}
      </Button>

      <ul className="m-0 mt-3 flex shrink-0 list-none justify-between gap-2 p-0">
        {PERFORMANCE.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              data-legend={s.id}
              aria-pressed={active === s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
              className={cx(
                'flex items-center gap-1.5 rounded-lg px-1.5 py-1 transition-opacity',
                active !== null && active !== s.id ? 'opacity-45' : 'opacity-100',
                active === s.id ? 'bg-sunken' : 'hover:bg-sunken',
              )}
            >
              <span
                aria-hidden="true"
                style={{ background: `var(${s.token})` }}
                className="h-2.5 w-2.5 shrink-0 rounded-full"
              />
              <span className="text-body text-[10.5px] whitespace-nowrap">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** The pale upsell panel at the foot of the right column. */
export function UpsellCard({ taken, onTake }: { taken: boolean; onTake: () => void }) {
  return (
    <section
      data-card="upsell"
      className="bg-bone relative shrink-0 overflow-hidden rounded-[var(--radius-card)] p-4"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 220 120"
        className="pointer-events-none absolute -top-4 -right-6 h-[120px] w-[200px]"
      >
        <path
          d="M110 10c4 36 24 56 60 60-36 4-56 24-60 60-4-36-24-56-60-60 36-4 56-24 60-60Z"
          fill="var(--color-forest)"
          opacity="0.09"
        />
      </svg>

      <p className="text-ink relative m-0 text-[14px] leading-[19px] font-bold">
        Level up your sales managing to the next level.
      </p>
      <p className="text-body relative m-0 mt-1.5 text-[11.5px] leading-[16px]">
        An any way to manage sales with care and precision.
      </p>
      <Button
        variant={taken ? 'accent' : 'forest'}
        name="upgrade"
        onClick={onTake}
        className="relative mt-3 w-full justify-center"
      >
        {taken ? 'Dravelo+ is on' : 'Update to Dravelo+'}
      </Button>
    </section>
  );
}
