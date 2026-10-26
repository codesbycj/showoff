import { useMemo, useState } from 'react';

import { BandChart } from '@/charts/BandChart';
import { Gauge } from '@/charts/Gauge';
import { Heatmap } from '@/charts/Heatmap';
import { Badge, Card, CardHead, Delta, Meter } from '@/components/Bits';
import { Button, IconButton, SelectPill } from '@/components/Controls';
import { Icon, Info } from '@/components/Icon';
import {
  ACTIVE_SALES,
  CATEGORIES,
  DAYS,
  HOURS,
  NEW_SALES,
  PERIODS,
  PERFORMANCE,
  PRODUCTS,
  PRODUCT_REVENUE,
  SPANS,
  VISIT_DELTA,
  analytics,
  analyticsTotals,
  peakOf,
  revenueOf,
  salesIn,
  totalSales,
  visitTotal,
  visits,
  type Category,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three rows of `fr`, so the lower row takes whatever is left and every card
 * reaches the bottom of the shell at 900px and at 1080px alike.
 */
export function DashboardPane({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: (tab: 'products') => void;
}) {
  const [category, setCategory] = useState<Category | 'all'>('Cosmetics');
  const [periodId, setPeriodId] = useState(PERIODS[0].id);
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const [widgetAdded, setWidgetAdded] = useState(false);

  const bands = useMemo(() => analytics(spanId), [spanId]);
  const peak = peakOf(bands);
  const totals = analyticsTotals(bands);
  const grid = useMemo(() => visits(), []);
  const periodScale = PERIODS.find((p) => p.id === periodId)?.scale ?? 1;

  const q = query.trim().toLowerCase();
  const top = PRODUCTS.filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => revenueOf(b) - revenueOf(a));
  const leader = top[0];

  return (
    <div data-pane="dashboard" className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[22px] leading-none font-extrabold tracking-[-0.03em]">
            Dashboard
          </h2>
          <p className="text-muted m-0 mt-1.5 text-[12.5px]">
            Track your sales and performance of your strategy
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <Button icon="filter" variant="outline" name="filters">
            Filters
          </Button>
          <Button
            icon={widgetAdded ? 'check' : 'plus'}
            variant="solid"
            name="add-widget"
            onClick={() => setWidgetAdded((v) => !v)}
          >
            {widgetAdded ? 'Widget added' : 'Add Widget'}
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-[0.92] grid-cols-[1.35fr_1fr_1fr] gap-4">
        <Card pane="overview" className="min-h-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                Product overview <Info />
              </span>
            }
            action={
              <SelectPill
                name="period"
                value={periodId}
                options={PERIODS.map((p) => ({ id: p.id, label: p.label }))}
                onChange={setPeriodId}
              />
            }
          />

          <p className="m-0 mt-3">
            <span
              data-figure="total-sales"
              className="tnum text-ink block text-[26px] leading-none font-extrabold tracking-[-0.035em]"
            >
              {usd(salesIn(category) * periodScale)}
            </span>
            <span className="text-muted mt-1.5 block text-[11.5px]">
              {category === 'all' ? 'Total sales' : `Sales in ${category}`}
            </span>
          </p>

          <div className="mt-auto">
            <p className="text-muted m-0 flex items-center justify-between gap-2 text-[11.5px]">
              Select by product
              <span className="text-ink font-semibold">New sales: {num(NEW_SALES)}</span>
            </p>

            <div className="bg-sunken mt-2 flex items-center gap-1 rounded-full p-1">
              {(['all', ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  data-category={c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={cx(
                    'flex h-8 min-w-0 flex-1 items-center justify-center gap-1 rounded-full px-2 text-[11.5px] font-semibold transition-colors',
                    category === c ? 'bg-accent-deep text-white' : 'text-muted hover:text-ink',
                  )}
                >
                  <span className="truncate">{c === 'all' ? 'All' : c}</span>
                </button>
              ))}
            </div>

            <p className="text-muted m-0 mt-2 text-[11px]">
              {category === 'all'
                ? `${PRODUCTS.length} lines, ${usd(totalSales() * periodScale)} in total.`
                : `${PRODUCTS.filter((p) => p.category === category).length} lines in ${category}.`}
            </p>
          </div>
        </Card>

        <StatCard
          name="active-sales"
          label="Active sales"
          value={ACTIVE_SALES.value}
          delta={ACTIVE_SALES.delta}
          onDetails={() => onNavigate('products')}
        >
          <div className="flex h-[52px] items-end gap-1.5">
            {[0.5, 0.78, 0.42, 1, 0.64].map((f, i) => (
              <span
                key={i}
                style={{ height: f * 100 + '%' }}
                className={cx('w-3 rounded-full', i === 3 ? 'bg-accent' : 'bg-accent-faint')}
              />
            ))}
          </div>
        </StatCard>

        <StatCard
          name="product-revenue"
          label="Product Revenue"
          value={PRODUCT_REVENUE.value}
          delta={PRODUCT_REVENUE.delta}
          onDetails={() => onNavigate('products')}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="var(--color-accent-faint)"
              strokeWidth="8"
            />
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22 * 0.62} ${2 * Math.PI * 22}`}
              transform="rotate(-90 28 28)"
            />
          </svg>
        </StatCard>
      </div>

      <div className="grid min-h-0 flex-[1.12] grid-cols-[1.9fr_1fr] gap-4">
        <Card pane="analytics" className="min-h-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                Analytics <Info />
              </span>
            }
            action={
              <>
                <SelectPill
                  name="span"
                  value={spanId}
                  options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
                  onChange={setSpanId}
                />
                <IconButton icon="filter" label="Analytics filters" tone="outline" size={34} />
              </>
            }
          />

          <div className="mt-3 flex shrink-0 items-start justify-between gap-6">
            <p className="m-0">
              <span className="tnum text-ink flex items-baseline gap-2 text-[19px] leading-none font-extrabold tracking-[-0.03em]">
                {(totals.net >= 0 ? '+' : '-') + usd(Math.abs(totals.net))}
                <Delta value={totals.netDelta} />
              </span>
              <span className="text-muted mt-1.5 block text-[11.5px]">sales, start to end</span>
            </p>
            <p className="m-0 text-right">
              <span className="tnum text-ink flex items-baseline justify-end gap-2 text-[19px] leading-none font-extrabold tracking-[-0.03em]">
                {totals.conversion}%
                <Delta value={totals.conversionDelta} />
              </span>
              <span className="text-muted mt-1.5 block text-[11.5px]">Conv. rate</span>
            </p>
          </div>

          <div className="mt-2 flex min-h-0 flex-1 flex-col">
            <BandChart
              bands={bands}
              peakId={peak.id}
              label={'Sales by month: ' + bands.map((b) => `${b.label} ${usd(b.value)}`).join(', ')}
            />
          </div>
        </Card>

        <Card pane="performance" className="min-h-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                Sales Performance <Info />
              </span>
            }
          />

          {/*
            `shrink-0` with its own size, not `flex-1`: given the row's share
            the 190px gauge overflowed its box and the legend underneath was
            drawn through the arc.
          */}
          <div className="mt-3 flex shrink-0 justify-center">
            <div className="relative">
              <Gauge
                pct={PERFORMANCE.pct}
                size={158}
                thickness={19}
                label={`Sales performance: ${PERFORMANCE.pct}% ${PERFORMANCE.since}`}
              />
              <div className="absolute inset-x-0 bottom-0 text-center">
                <p className="tnum text-ink m-0 text-[21px] leading-none font-extrabold tracking-[-0.03em]">
                  {PERFORMANCE.pct}%
                </p>
                <p className="text-muted m-0 mt-1 text-[11px]">{PERFORMANCE.since}</p>
              </div>
            </div>
          </div>

          <ul className="m-0 mt-auto flex shrink-0 list-none flex-col gap-2 p-0 pt-3">
            <Legend
              tone="var(--color-accent)"
              label="Total Sales per day"
              note={num(PERFORMANCE.perDay)}
            />
            <Legend
              tone="var(--color-accent-faint)"
              label="Average Sales"
              note={num(PERFORMANCE.average)}
            />
          </ul>

          <button
            type="button"
            data-action="performance-details"
            onClick={() => onNavigate('products')}
            className="text-accent-deep hover:bg-accent-faint mt-3 flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg text-[12px] font-bold transition-colors"
          >
            See Details
            <Icon name="arrow-right" size={14} strokeWidth={2.2} />
          </button>
        </Card>
      </div>

      <div className="grid min-h-0 flex-[1.36] grid-cols-[1.35fr_1fr] gap-4">
        <Card pane="visits" className="min-h-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                Total visits by hourly <Info />
              </span>
            }
            action={
              <>
                <span className="tnum text-ink text-[15px] font-extrabold">
                  {num(visitTotal(grid))}
                </span>
                <Badge tone="positive">+{VISIT_DELTA}%</Badge>
                <IconButton icon="speaker" label="Announce this" size={32} />
              </>
            }
          />
          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <Heatmap
              grid={grid}
              days={DAYS}
              hours={HOURS}
              label="Visits by day and hour, five bands from coldest to hottest"
            />
          </div>
        </Card>

        <Card pane="top-products" className="min-h-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                Top Products <Info />
              </span>
            }
            action={
              <button
                type="button"
                data-action="products-details"
                onClick={() => onNavigate('products')}
                className="text-accent-deep hover:bg-accent-faint flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors"
              >
                See Details
                <Icon name="arrow-right" size={13} strokeWidth={2.2} />
              </button>
            }
          />

          {leader ? (
            <div className="bg-sunken mt-3 shrink-0 rounded-[11px] p-3">
              <p className="m-0 flex items-baseline justify-between gap-2">
                <span className="text-ink truncate text-[12.5px] font-bold">{leader.name}</span>
                <span className="tnum text-ink shrink-0 text-[13px] font-extrabold">
                  {usd(revenueOf(leader), true)}
                </span>
              </p>
              <Meter
                value={(leader.unitsSold / leader.target) * 100}
                tone="accent"
                height={7}
                className="mt-2"
              />
              <p className="text-muted m-0 mt-1.5 text-[11px]">
                {Math.round((leader.unitsSold / leader.target) * 100)}% of target achieved
              </p>
            </div>
          ) : null}

          <div
            className={cx(
              'text-muted mt-3 grid shrink-0 items-center gap-2 px-1 pb-1.5 text-[10.5px] font-bold whitespace-nowrap',
              'grid-cols-[minmax(0,1fr)_72px_84px_60px_92px]',
            )}
          >
            <span>Product</span>
            <span className="text-right">Sales</span>
            <span className="text-right">Revenue</span>
            <span className="text-right">Stock</span>
            <span className="text-right">Status</span>
          </div>

          <div data-scroller="top" className="scroll-region min-h-0 flex-1 pr-1.5">
            <ul className="m-0 list-none p-0">
              {top.map((p) => (
                <li key={p.id}>
                  <div
                    data-row={p.id}
                    className="border-line hover:bg-sunken grid grid-cols-[minmax(0,1fr)_72px_84px_60px_92px] items-center gap-2 border-b px-1 py-2 transition-colors"
                  >
                    <span className="text-ink min-w-0 truncate text-[12px] font-semibold">
                      {p.name}
                    </span>
                    <span className="tnum text-body text-right text-[11.5px]">
                      {num(p.unitsSold)} pcs
                    </span>
                    <span className="tnum text-ink text-right text-[11.5px] font-bold">
                      {usd(revenueOf(p))}
                    </span>
                    <span className="tnum text-body text-right text-[11.5px]">{num(p.stock)}</span>
                    <span className="flex justify-end">
                      <Badge tone={p.stock > 0 ? 'positive' : 'danger'}>
                        {p.stock > 0 ? 'In Stock' : 'Out of stock'}
                      </Badge>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  name,
  label,
  value,
  delta,
  children,
  onDetails,
}: {
  name: string;
  label: string;
  value: number;
  delta: number;
  children: React.ReactNode;
  onDetails: () => void;
}) {
  return (
    <Card pane={name} className="min-h-0 p-4">
      <CardHead
        title={
          <span className="flex items-center gap-1.5">
            {label} <Info />
          </span>
        }
      />
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="m-0">
          <span className="tnum text-ink block text-[24px] leading-none font-extrabold tracking-[-0.035em]">
            {usd(value)}
          </span>
          <span className="mt-2 flex items-center gap-1.5">
            <span className="text-muted text-[11px]">vs last month</span>
            <Delta value={delta} />
          </span>
        </p>
        <div className="shrink-0">{children}</div>
      </div>

      <button
        type="button"
        data-action={name + '-details'}
        onClick={onDetails}
        className="text-accent-deep hover:bg-accent-faint mt-auto flex h-9 items-center justify-center gap-1.5 rounded-lg text-[12px] font-bold transition-colors"
      >
        See Details
        <Icon name="arrow-right" size={14} strokeWidth={2.2} />
      </button>
    </Card>
  );
}

function Legend({ tone, label, note }: { tone: string; label: string; note: string }) {
  return (
    <li className="flex items-center gap-2">
      <span aria-hidden="true" style={{ background: tone }} className="h-2.5 w-2.5 rounded-full" />
      <span className="text-body min-w-0 flex-1 truncate text-[11.5px]">{label}</span>
      <span className="tnum text-ink shrink-0 text-[11.5px] font-bold">{note}</span>
    </li>
  );
}
