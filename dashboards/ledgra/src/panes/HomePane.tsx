import { useMemo, useState } from 'react';

import { Heatmap } from '@/charts/Heatmap';
import { Badge, Card, CardHead, Delta, Empty, Meter } from '@/components/Bits';
import { Button, IconButton, SearchBox, Segmented, SelectPill } from '@/components/Controls';
import { Icon, Info } from '@/components/Icon';
import {
  ACCOUNT,
  BANDS,
  DAYS,
  EXPENSES,
  LEDGERS,
  MONTHS,
  REVENUE,
  TAXES,
  cashflow,
  flowLegend,
  flowTotal,
  netOf,
  taxShares,
  taxTotal,
  type Direction,
  type Tax,
  type TaxStatus,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { idr, shortIdr } from '@/lib/money';

const DIRECTIONS: { id: Direction; label: string }[] = [
  { id: 'inflow', label: 'Inflow' },
  { id: 'outflow', label: 'Outflow' },
];

const TONE: Record<TaxStatus, 'danger' | 'warn' | 'positive'> = {
  'Not Paid': 'danger',
  Scheduled: 'warn',
  Paid: 'positive',
};

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three rows of `fr`, so the lower row takes whatever is left and the cards
 * reach the bottom of the shell at 900px and at 1080px alike.
 */
export function HomePane({
  query,
  onQuery,
  onNavigate,
}: {
  query: string;
  onQuery: (next: string) => void;
  onNavigate: (tab: 'tax') => void;
}) {
  const [monthId, setMonthId] = useState(MONTHS[0].id);
  const [direction, setDirection] = useState<Direction>('inflow');
  const [exported, setExported] = useState(false);

  const scale = MONTHS.find((m) => m.id === monthId)?.scale ?? 1;
  const grid = useMemo(() => cashflow(direction, monthId), [direction, monthId]);
  const legend = flowLegend(grid);

  const shares = taxShares();
  const q = query.trim().toLowerCase();
  const taxes = TAXES.filter((t) => (q ? t.label.toLowerCase().includes(q) : true));
  const ledgerMax = Math.max(...LEDGERS.map((l) => l.amount), 1);

  return (
    <div data-pane="home" className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[21px] leading-none font-bold tracking-[-0.025em]">
            Overview dashboard
          </h2>
          <p className="text-muted m-0 mt-2 flex items-center gap-1.5 text-[12px]">
            <Icon name="calendar" size={14} />
            {ACCOUNT.range}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <SearchBox value={query} onChange={onQuery} placeholder="Search" className="w-[220px]" />
          <SelectPill
            name="month"
            value={monthId}
            options={MONTHS.map((m) => ({ id: m.id, label: m.label }))}
            onChange={setMonthId}
          />
          <Button
            icon={exported ? 'check' : 'export'}
            variant="accent"
            name="export"
            onClick={() => setExported((v) => !v)}
          >
            {exported ? 'Exported' : 'Export'}
          </Button>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-4">
        <Figure label="Total Revenue" value={idr(REVENUE * scale)} delta={7} />
        <Figure label="Total Expenses" value={idr(EXPENSES * scale)} delta={-4} goodWhen="down" />
        <Figure label="Net Profit/Loss" value={idr(netOf(scale))} delta={3} />
      </div>

      <Card pane="cashflow" className="min-h-0 flex-1 p-4">
        <CardHead
          title={
            <span className="flex items-center gap-1.5">
              Cash flow summary <Info />
            </span>
          }
          action={
            <Segmented
              name="direction"
              size="sm"
              value={direction}
              options={DIRECTIONS}
              onChange={setDirection}
            />
          }
        />

        <div className="mt-2.5 flex shrink-0 flex-wrap items-center gap-4">
          <p className="tnum text-ink m-0 text-[15px] font-bold">
            {idr(flowTotal(grid))}
            <span className="text-muted ml-2 text-[11.5px] font-medium">
              {direction === 'inflow' ? 'in' : 'out'} this month
            </span>
          </p>
          <ul className="m-0 ml-auto flex list-none items-center gap-3 p-0">
            {legend.map((v, i) => (
              <li key={v} className="text-muted flex items-center gap-1.5 text-[10.5px]">
                <span
                  aria-hidden="true"
                  style={{ background: `var(--color-heat-${i + 1})` }}
                  className="h-2.5 w-2.5 rounded-[3px]"
                />
                {shortIdr(v)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          <Heatmap
            grid={grid}
            days={BANDS}
            hours={DAYS}
            format={(n) => idr(n)}
            label={`Cash ${direction} by band and day, five bands from coldest to hottest`}
          />
        </div>
      </Card>

      <div className="grid min-h-0 flex-[1.1] grid-cols-[1fr_1.4fr] gap-4">
        <Card pane="accounts" className="min-h-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                Accounts Overview <Info />
              </span>
            }
            action={<IconButton icon="dots" label="Accounts options" size={30} />}
          />

          <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-3 p-0">
            {LEDGERS.map((l) => (
              <li key={l.id} data-mark={'ledger-' + l.id}>
                <p className="text-body m-0 flex items-center gap-1.5 text-[12px]">
                  {l.label}
                  <Info />
                </p>
                <p className="tnum text-ink m-0 mt-1 text-[16px] font-bold">{idr(l.amount)}</p>
                <Meter
                  value={(l.amount / ledgerMax) * 100}
                  tone={l.tone === 'accent' ? 'accent' : 'goal'}
                  height={8}
                  className="mt-2"
                />
                <p className="text-muted m-0 mt-1.5 text-[11px]">{l.note}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card pane="tax" className="min-h-0 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <span className="flex items-center gap-1.5">
                Tax Liabilities <Info />
              </span>
            }
            action={
              <button
                type="button"
                data-action="open-tax"
                onClick={() => onNavigate('tax')}
                className="text-accent-deep hover:bg-accent-faint flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors"
              >
                See all
                <Icon name="chevron-right" size={13} strokeWidth={2.2} />
              </button>
            }
          />

          <div className="mt-3 mr-2.5 shrink-0">
            <div className="flex h-3 overflow-hidden rounded-full">
              {shares.map((s) => (
                <span
                  key={s.id}
                  data-mark={'share-' + s.id}
                  style={{ width: s.pct + '%', background: `var(${s.token})` }}
                  className="block h-full"
                />
              ))}
              <span className="bg-sunken-deep block h-full flex-1" />
            </div>
            <ul className="m-0 mt-2 flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0">
              {shares.map((s) => (
                <li key={s.id} className="text-muted flex items-center gap-1.5 text-[11px]">
                  <span
                    aria-hidden="true"
                    style={{ background: `var(${s.token})` }}
                    className="h-2.5 w-2.5 rounded-full"
                  />
                  {s.label}
                  <span className="tnum text-ink font-bold">{s.pct}%</span>
                </li>
              ))}
              <li className="text-muted tnum ml-auto text-[11px]">{idr(taxTotal())} in total</li>
            </ul>
          </div>

          <div
            className={cx(
              'text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-2 border-b border-[var(--color-line)] px-2 pb-2 text-[10px] font-bold tracking-[0.06em] uppercase',
              'grid-cols-[minmax(0,1fr)_130px_96px_110px]',
            )}
          >
            <span>Tax type</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Date</span>
            <span className="text-right">Status</span>
          </div>

          <div data-scroller="tax" className="scroll-region min-h-0 flex-1 pr-2">
            {taxes.length === 0 ? (
              <Empty what="tax line" query={query} />
            ) : (
              <ul className="m-0 list-none p-0">
                {taxes.map((t) => (
                  <li key={t.id}>
                    <TaxRow tax={t} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Figure({
  label,
  value,
  delta,
  goodWhen = 'up',
}: {
  label: string;
  value: string;
  delta: number;
  goodWhen?: 'up' | 'down';
}) {
  return (
    <Card pane={'fig-' + label.split(' ')[1].toLowerCase()} className="p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-body m-0 flex items-center gap-1.5 text-[12px]">
          {label}
          <Info />
        </p>
        <IconButton icon="dots" label={label + ' options'} size={26} />
      </div>
      <p className="tnum text-ink m-0 mt-2.5 text-[23px] leading-none font-bold tracking-[-0.03em]">
        {value}
      </p>
      <p className="m-0 mt-2 flex items-center gap-1.5">
        <Delta value={delta} goodWhen={goodWhen} />
        <span className="text-muted text-[11px]">vs last month</span>
      </p>
    </Card>
  );
}

function TaxRow({ tax }: { tax: Tax }) {
  return (
    <div
      data-row={tax.id}
      className={cx(
        'border-line hover:bg-sunken mr-2.5 grid items-center gap-2 border-b px-2 py-2.5 transition-colors',
        'grid-cols-[minmax(0,1fr)_130px_96px_110px]',
      )}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          style={{ background: `var(${tax.token})` }}
          className="h-2.5 w-2.5 shrink-0 rounded-full"
        />
        <span className="text-ink min-w-0 truncate text-[12px] font-semibold">{tax.label}</span>
      </span>
      <span className="tnum text-ink text-right text-[12px] font-bold">{idr(tax.amount)}</span>
      <span className="tnum text-muted text-right text-[11px]">Due: {tax.due}</span>
      <span className="flex justify-end">
        <Badge tone={TONE[tax.status]}>
          {tax.status === 'Not Paid' ? <Icon name="warning" size={11} strokeWidth={2.2} /> : null}
          {tax.status}
        </Badge>
      </span>
    </div>
  );
}
