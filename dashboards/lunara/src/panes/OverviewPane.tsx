import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Cohorts } from '@/charts/Cohorts';
import { Badge, Card, CardHead, Delta, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, IconButton, SelectPill, Segmented } from '@/components/Controls';
import { AssetDisc, Icon } from '@/components/Icon';
import {
  ACCOUNT,
  COHORT_MONTHS,
  COINS,
  HOLDINGS,
  SPANS,
  change24h,
  cohorts,
  costBasis,
  holdingOf,
  indices,
  pnl,
  pnlPct,
  pointLabel,
  portfolioCost,
  portfolioReturn,
  portfolioValue,
  share,
  value,
  valueSeries,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, short, usd } from '@/lib/format';

type SortKey = 'asset' | 'balance' | 'avgbuy' | 'price' | 'pnl' | 'value';

const WINDOWS = [
  { id: 'h2', label: 'Last 6 months' },
  { id: 'h1', label: 'Last 12 months' },
  { id: 'ytd', label: 'Year to date' },
];

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Four cards, wired to each other: picking a token tile filters the holdings
 * table under it, and the headline, the tiles, the table and the index tiles
 * are all arithmetic over the same six holdings — which is the one thing the
 * reference does not do.
 */
export function OverviewPane() {
  const [spanId, setSpanId] = useState(SPANS[3].id);
  const [windowId, setWindowId] = useState(WINDOWS[1].id);
  const [asset, setAsset] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('value');
  const [descending, setDescending] = useState(true);
  const [exported, setExported] = useState(false);

  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[3];
  const series = useMemo(() => valueSeries(spanId), [spanId]);
  const grid = useMemo(() => cohorts(), []);
  const tiles = useMemo(() => indices(), []);
  const total = portfolioValue();
  const day = change24h();

  const months = windowId === 'h2' ? COHORT_MONTHS.slice(-4) : COHORT_MONTHS;
  const shownGrid = windowId === 'h2' ? grid.slice(-4).map((r) => r.slice(-4)) : grid;

  const rows = HOLDINGS.filter((h) => (asset ? h.id === asset : true))
    .slice()
    .sort((a, b) => {
      const by =
        sort === 'asset'
          ? a.name.localeCompare(b.name)
          : sort === 'balance'
            ? a.quantity - b.quantity
            : sort === 'price'
              ? a.price - b.price
              : sort === 'pnl'
                ? pnlPct(a) - pnlPct(b)
                : value(a) - value(b);
      return descending ? -by : by;
    });

  const onSort = (key: SortKey) => {
    if (key === sort) setDescending((v) => !v);
    else {
      setSort(key);
      setDescending(true);
    }
  };

  const topVolume = COINS.slice().sort((a, b) => b.volume - a.volume)[0];

  return (
    <div data-pane="overview" className="flex h-full flex-col">
      <PageHead
        title="Overview dashboard"
        subtitle={`Hi ${ACCOUNT.holder.split(' ')[0]}, here's a look at your performance and analytics`}
        action={
          <>
            <SelectPill name="window" value={windowId} options={WINDOWS} onChange={setWindowId} />
            <Button
              icon={exported ? 'check' : 'download'}
              name="export"
              onClick={() => setExported((v) => !v)}
            >
              {exported ? 'Exported' : 'Export'}
            </Button>
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] grid-rows-[1.12fr_1fr] gap-4">
        <Card pane="value" className="min-h-0 p-5">
          <div className="flex shrink-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-ink m-0 text-[15px] leading-tight font-bold">Portfolio value</h2>
              <p className="text-muted m-0 mt-1 text-[12px]">
                {ACCOUNT.range} · updated {ACCOUNT.updated}
              </p>
              <p className="m-0 mt-3 flex flex-wrap items-center gap-2.5">
                <span className="tnum text-ink text-[34px] leading-none font-extrabold tracking-[-0.04em]">
                  {usd(total, true)}
                </span>
                <Delta value={Math.round(day * 100) / 100} />
              </p>
              <p className="text-muted m-0 mt-2 text-[12px]">
                <span className="text-positive font-bold">+{usd(total - portfolioCost())}</span> (
                {Math.round(portfolioReturn() * 100) / 100}%) since you started, against a{' '}
                {usd(portfolioCost())} cost basis
              </p>
            </div>
            <Segmented
              name="span"
              size="sm"
              value={spanId}
              options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
              onChange={setSpanId}
            />
          </div>

          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <AreaChart
              values={series}
              ticks={span.ticks}
              format={(n) => '$' + short(n)}
              pointLabel={(i) => pointLabel(spanId, i, series.length)}
              unit="portfolio value"
              label={`Portfolio value over ${span.label}, ending at ${usd(total)}`}
            />
          </div>

          <ul className="m-0 mt-3 grid shrink-0 list-none grid-cols-4 gap-2.5 p-0">
            {tiles.map((t) => (
              <li key={t.id}>
                <div
                  data-index={t.id}
                  title={t.note}
                  style={{ background: `var(${t.tile})` }}
                  className="h-full rounded-[14px] px-3 py-2.5"
                >
                  <span className="text-muted-tile block text-[11px] leading-[14px] font-semibold">
                    {t.label}
                  </span>
                  <span className="tnum text-ink mt-1.5 block text-[20px] leading-none font-extrabold tracking-[-0.02em]">
                    {t.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card pane="allocation" className="min-h-0 p-5">
          <CardHead
            title="Token allocation"
            action={
              asset ? (
                <Button
                  size="sm"
                  variant="outline"
                  name="clear-asset"
                  onClick={() => setAsset(null)}
                >
                  Clear
                  <Icon name="close" size={13} strokeWidth={2.2} />
                </Button>
              ) : (
                <IconButton
                  icon="dots"
                  label="Allocation options"
                  size={32}
                  name="allocation-menu"
                />
              )
            }
          />

          {/* grid-rows-3 and min-h-0 on both the list and the item: with the rows
              auto-sized, six tiles plus the volume footer overflowed the card and
              the footer painted over the last two. */}
          <ul className="m-0 mt-3 grid min-h-0 flex-1 list-none grid-cols-2 grid-rows-3 gap-2.5 p-0">
            {HOLDINGS.map((h) => (
              <li key={h.id} className="min-h-0 min-w-0">
                <button
                  type="button"
                  data-token={h.id}
                  aria-pressed={asset === h.id}
                  onClick={() => setAsset(asset === h.id ? null : h.id)}
                  style={{ background: `var(${h.tile})` }}
                  className={cx(
                    'flex h-full w-full flex-col justify-between rounded-[14px] p-3 text-left outline-2 outline-offset-2 outline-transparent transition-[outline]',
                    asset === h.id && 'outline-[var(--color-accent)]',
                    asset && asset !== h.id && 'opacity-55',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-muted-tile text-[12px] font-bold">{h.symbol}</span>
                    <span
                      className={cx(
                        'inline-flex items-center gap-0.5 text-[11px] font-bold',
                        h.change24h >= 0 ? 'text-positive-tile' : 'text-danger-tile',
                      )}
                    >
                      <Icon
                        name={h.change24h >= 0 ? 'arrow-up' : 'arrow-down'}
                        size={11}
                        strokeWidth={2.6}
                      />
                      {Math.abs(h.change24h)}%
                    </span>
                  </span>
                  <span className="mt-2 block">
                    <span className="tnum text-ink block text-[17px] leading-none font-extrabold tracking-[-0.02em]">
                      {usd(value(h))}
                    </span>
                    <span className="text-muted-tile tnum mt-1 block text-[10.5px] font-semibold">
                      {share(h).toFixed(1)}% of book
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="border-line mt-3 flex shrink-0 items-center justify-between gap-3 border-t pt-3">
            <span className="min-w-0">
              <span className="text-muted block text-[11.5px]">Highest volume, 24h</span>
              <span className="text-ink mt-0.5 block truncate text-[13px] font-bold">
                {topVolume.name} · {topVolume.symbol}
              </span>
            </span>
            <span className="tnum text-ink shrink-0 text-[17px] font-extrabold">
              ${short(topVolume.volume)}
            </span>
          </div>
        </Card>

        <Card pane="holdings" className="min-h-0 p-5">
          <CardHead
            title="My portfolio"
            action={
              <Badge tone={asset ? 'accent' : 'quiet'}>
                {rows.length} of {HOLDINGS.length}
              </Badge>
            }
          />

          <div className="border-line mt-3 grid shrink-0 grid-cols-[1.4fr_1fr_1fr_0.9fr_1.1fr_1fr] gap-3 border-b pb-2">
            {(
              [
                ['asset', 'Asset'],
                ['balance', 'Balance'],
                ['avgbuy', 'Avg. buy'],
                ['price', 'Price'],
                ['pnl', 'Profit / loss'],
                ['value', 'Value'],
              ] as [SortKey, string][]
            ).map(([key, label], i) => (
              <button
                key={label}
                type="button"
                data-sort={label.toLowerCase().replace(/[^a-z]/g, '')}
                onClick={() => onSort(key)}
                aria-label={`Sort by ${label}`}
                className={cx(
                  'flex h-7 items-center gap-1 text-[10.5px] font-bold tracking-[0.08em] uppercase transition-colors',
                  i >= 4 && 'justify-end',
                  sort === key ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {label}
                <Icon
                  name={sort === key ? (descending ? 'arrow-down' : 'arrow-up') : 'sort'}
                  size={12}
                  strokeWidth={2}
                  className={sort === key ? 'text-accent' : 'opacity-60'}
                />
              </button>
            ))}
          </div>

          <div data-scroller="holdings" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length ? (
              <ul className="m-0 list-none p-0">
                {rows.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      data-row={h.id}
                      onClick={() => setAsset(asset === h.id ? null : h.id)}
                      className="border-line hover:bg-sunken grid w-full grid-cols-[1.4fr_1fr_1fr_0.9fr_1.1fr_1fr] items-center gap-3 border-b py-3 text-left transition-colors last:border-b-0"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <AssetDisc symbol={h.symbol} tile={h.tile} size={30} />
                        <span className="min-w-0">
                          <span className="text-ink block truncate text-[13px] font-bold">
                            {h.name}
                          </span>
                          <span className="text-muted block text-[11px]">{h.symbol}</span>
                        </span>
                      </span>
                      <span className="tnum text-body text-[12.5px]">
                        {num(Math.round(h.quantity * 10_000) / 10_000)}
                      </span>
                      <span className="tnum text-body text-[12.5px]">{usd(h.avgBuy, true)}</span>
                      <span className="tnum text-body text-[12.5px]">{usd(h.price, true)}</span>
                      <span className="text-right">
                        <span
                          className={cx(
                            'tnum block text-[12.5px] font-bold',
                            pnl(h) >= 0 ? 'text-positive' : 'text-danger',
                          )}
                        >
                          {pnl(h) >= 0 ? '+' : '−'}
                          {usd(Math.abs(pnl(h)))}
                        </span>
                        <span className="text-muted tnum block text-[11px]">
                          {pnlPct(h) >= 0 ? '+' : ''}
                          {pnlPct(h).toFixed(2)}% on {usd(costBasis(h))}
                        </span>
                      </span>
                      <span className="tnum text-ink text-right text-[13.5px] font-extrabold">
                        {usd(value(h))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="holding" query={holdingOf(asset ?? 'btc').name} />
            )}
          </div>
        </Card>

        <Card pane="cohorts" className="min-h-0 p-5">
          <CardHead
            title="Buy cohorts"
            action={<IconButton icon="dots" label="Cohort options" size={32} name="cohort-menu" />}
          />
          <p className="text-muted m-0 mt-1 shrink-0 text-[12px]">
            What each month's purchases are worth, as a percent of what they cost
          </p>
          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <Cohorts
              grid={shownGrid}
              months={months}
              label={`Buy cohorts from ${months[0]} to ${months[months.length - 1]}, as a percent of cost`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
