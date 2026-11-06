import { useMemo, useState } from 'react';

import { Bars } from '@/charts/Bars';
import { Ring } from '@/charts/Ring';
import { TrendChart } from '@/charts/TrendChart';
import { Badge, Card, CardHead } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, IconButton, Segmented, SelectPill } from '@/components/Controls';
import { Avatar } from '@/components/Bits';
import { FlagDisc, Icon } from '@/components/Icon';
import {
  CHANNELS,
  COUNTRIES,
  MONTHS,
  PARTIAL_MONTH,
  PLATFORM_SERIES,
  STALE_AFTER,
  attainment,
  averageDeal,
  channelReturn,
  closedWon,
  closingSoon,
  coverage,
  customerTotal,
  cycleDays,
  openDeals,
  platformBars,
  quota,
  repOf,
  repStats,
  stageOf,
  stalled,
  weightedPipeline,
  winRate,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, short, usd } from '@/lib/format';

type Queue = 'top' | 'stalled' | 'soon';

const QUEUES: { id: Queue; label: string }[] = [
  { id: 'top', label: 'Largest' },
  { id: 'stalled', label: 'Stalled' },
  { id: 'soon', label: 'Closing soon' },
];

const PERIODS = [
  { id: 'q', label: 'This quarter' },
  { id: 'h', label: 'Last 6 months' },
  { id: 'y', label: 'Year to date' },
];

/**
 * The reference screen. Assembly only (rule 4).
 *
 * The picture's headline row is three vanity counts — audience growth,
 * followers, emails sent. This one leads with what the category leads with:
 * closed-won against quota, weighted pipeline, win rate and average deal.
 * Every figure is arithmetic over the same twenty-four deals.
 */
export function DashboardPane({ onNavigate }: { onNavigate: (tab: 'sales' | 'leads') => void }) {
  const [period, setPeriod] = useState(PERIODS[0].id);
  const [series, setSeries] = useState(PLATFORM_SERIES[0].id);
  const [queue, setQueue] = useState<Queue>('top');
  const [exported, setExported] = useState(false);

  const bars = useMemo(() => platformBars(series), [series]);
  const stats = useMemo(() => repStats(), []);
  const months = period === 'q' ? MONTHS.slice(3) : period === 'h' ? MONTHS.slice(0, 7) : MONTHS;

  const queueRows = (
    queue === 'stalled' ? stalled() : queue === 'soon' ? closingSoon() : openDeals()
  )
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const unit = PLATFORM_SERIES.find((s) => s.id === series)?.unit ?? 'count';

  return (
    <div data-pane="dashboard" className="flex h-full flex-col">
      <PageHead
        title="Revenue dashboard"
        subtitle="Where the quarter stands, and what is in the way"
        action={
          <>
            <SelectPill name="period" value={period} options={PERIODS} onChange={setPeriod} />
            <Button
              icon={exported ? 'check' : 'external'}
              name="export"
              onClick={() => setExported((v) => !v)}
            >
              {exported ? 'Shared' : 'Share'}
            </Button>
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-rows-[auto_1.15fr_1fr] gap-4">
        <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0">
          <li>
            <div
              data-kpi="won"
              className="bg-ink-fill text-ink-fg rounded-[var(--radius-card)] px-5 py-4"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[12.5px] opacity-70">
                  Closed won · {PERIODS.find((p) => p.id === period)?.label.toLowerCase()}
                </span>
                <Icon name="target" size={16} className="opacity-70" />
              </span>
              <span className="tnum mt-2 block text-[28px] leading-none font-bold tracking-[-0.03em]">
                {usd(closedWon())}
              </span>
              <span className="mt-3 block h-2 rounded-full bg-white/15">
                <span
                  style={{ width: Math.min(100, attainment()) + '%' }}
                  className="bg-accent block h-full rounded-full"
                />
              </span>
              <span className="tnum mt-2 block text-[11.5px] opacity-70">
                {attainment().toFixed(0)}% of the {usd(quota())} team quota
              </span>
            </div>
          </li>

          {[
            {
              id: 'weighted',
              label: 'Weighted pipeline',
              value: usd(weightedPipeline()),
              note: `${usd(openDeals().reduce((t, d) => t + d.value, 0))} raw, ${coverage().toFixed(1)}× cover`,
            },
            {
              id: 'winrate',
              label: 'Win rate',
              value: winRate().toFixed(0) + '%',
              note: `${cycleDays()} day average cycle`,
            },
            {
              id: 'avg',
              label: 'Average deal',
              value: usd(averageDeal()),
              note: `${openDeals().length} deals open now`,
            },
          ].map((k) => (
            <li key={k.id}>
              <div
                data-kpi={k.id}
                className="border-line bg-surface h-full rounded-[var(--radius-card)] border px-5 py-4 shadow-[var(--shadow-card)]"
              >
                <span className="text-muted block text-[12.5px]">{k.label}</span>
                <span className="tnum text-ink mt-2 block text-[28px] leading-none font-bold tracking-[-0.03em]">
                  {k.value}
                </span>
                <span className="text-muted mt-3 block text-[11.5px]">{k.note}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid min-h-0 grid-cols-[1.75fr_1fr_1.1fr] gap-4">
          <Card pane="revenue" className="min-h-0 p-5">
            <CardHead
              title="Revenue against forecast"
              action={<Badge tone="accent">{PARTIAL_MONTH} in progress</Badge>}
            />
            <div className="mt-3 flex min-h-0 flex-1 flex-col">
              <TrendChart
                points={months}
                partialLabel={PARTIAL_MONTH}
                format={(n) => '$' + short(n)}
                label={`Revenue by month: actual, forecast and plan, with ${PARTIAL_MONTH} still in progress`}
              />
            </div>
            <ul className="m-0 mt-2 flex shrink-0 list-none items-center gap-4 p-0">
              {[
                { k: 'Actual', c: 'var(--color-accent)' },
                { k: 'Forecast', c: 'var(--color-accent-deep)' },
                { k: 'Plan', c: 'var(--color-sunken-deep)' },
              ].map((l) => (
                <li key={l.k} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    style={{ background: l.c }}
                    className="h-2.5 w-2.5 rounded-[3px]"
                  />
                  <span className="text-muted text-[12px]">{l.k}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card pane="countries" className="min-h-0 p-5">
            <CardHead
              title="Customers by country"
              note={`${num(customerTotal())} in total`}
              action={
                <IconButton icon="dots" label="Country options" size={32} name="country-menu" />
              }
            />
            <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col p-0">
              {COUNTRIES.map((c) => (
                <li key={c.id} className="flex min-h-0 flex-1 items-center">
                  <div data-country={c.id} className="flex w-full items-center gap-3">
                    <FlagDisc bands={c.bands} dir={c.dir} size={24} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-ink truncate text-[12.5px] font-semibold">
                          {c.label}
                        </span>
                        <span className="tnum text-muted shrink-0 text-[11.5px]">
                          {num(c.customers)}
                        </span>
                      </span>
                      <span className="bg-sunken-deep mt-1.5 block h-1.5 rounded-full">
                        <span
                          style={{ width: (c.customers / COUNTRIES[0].customers) * 100 + '%' }}
                          className="bg-accent block h-full rounded-full"
                        />
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card pane="team" className="min-h-0 p-5">
            <CardHead
              title="Team against quota"
              action={
                <Button
                  size="sm"
                  variant="outline"
                  name="view-team"
                  onClick={() => onNavigate('sales')}
                >
                  View all
                  <Icon name="arrow-right" size={13} strokeWidth={2.2} />
                </Button>
              }
            />
            <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col p-0">
              {stats.map((s) => (
                <li key={s.rep.id} className="flex min-h-0 flex-1 items-center">
                  <div data-rep={s.rep.id} className="flex w-full items-center gap-3">
                    <Avatar src={s.rep.face} name={s.rep.name} size={34} />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[12.5px] font-semibold">
                        {s.rep.name}
                      </span>
                      <span className="tnum text-muted block text-[11px]">
                        {usd(s.won)} of {usd(s.rep.quota)}
                      </span>
                    </span>
                    <Ring value={s.attainment} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="grid min-h-0 grid-cols-[1fr_1.1fr_1.5fr] gap-4">
          <Card pane="platform" className="min-h-0 p-5">
            <CardHead
              title="Platform value"
              note="Last three months"
              action={
                <Segmented
                  name="series"
                  size="sm"
                  value={series}
                  options={PLATFORM_SERIES.map((s) => ({ id: s.id, label: s.label }))}
                  onChange={setSeries}
                />
              }
            />
            <div className="mt-3 flex min-h-0 flex-1 flex-col">
              <Bars
                bars={bars}
                format={(n) => (unit === 'usd' ? '$' + short(n) : num(n))}
                label={`${PLATFORM_SERIES.find((s) => s.id === series)?.label} over the last three months`}
              />
            </div>
          </Card>

          <Card pane="channels" className="min-h-0 p-5">
            <CardHead title="Channels" note="Spend against pipeline sourced" />
            <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col p-0">
              {CHANNELS.map((c) => (
                <li key={c.id} className="flex min-h-0 flex-1 items-center">
                  <div data-channel={c.id} className="w-full">
                    {/* Two lines, not three: at four rows in a 250px card the
                        third line overlapped the next row's title. */}
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-ink truncate text-[12.5px] font-semibold">
                        {c.label}
                      </span>
                      <span className="tnum text-muted shrink-0 text-[11.5px]">
                        {usd(c.spend)} · {num(c.leads)} leads · {channelReturn(c).toFixed(1)}×
                      </span>
                    </span>
                    <span className="bg-sunken-deep mt-1.5 block h-2 rounded-full">
                      <span
                        style={{
                          width:
                            (channelReturn(c) / Math.max(...CHANNELS.map(channelReturn))) * 100 +
                            '%',
                        }}
                        className={cx(
                          'block h-full rounded-full',
                          channelReturn(c) >= 15 ? 'bg-accent' : 'bg-accent-soft',
                        )}
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card pane="queue" className="min-h-0 p-5">
            <CardHead
              title="Deals to work"
              action={
                <Segmented
                  name="queue"
                  size="sm"
                  value={queue}
                  options={QUEUES}
                  onChange={(id) => setQueue(id)}
                />
              }
            />
            <p className="text-muted m-0 mt-1 shrink-0 text-[11.5px]">
              {stalled().length} untouched for {STALE_AFTER} days · {closingSoon().length} closing
              inside a fortnight
            </p>

            <div data-scroller="queue" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
              <ul className="m-0 list-none p-0">
                {queueRows.map((d) => (
                  <li key={d.id}>
                    <button
                      type="button"
                      data-row={d.id}
                      onClick={() => onNavigate('sales')}
                      title={`Open ${d.account} on the pipeline`}
                      className="border-line hover:bg-sunken flex w-full items-center gap-3 border-b py-2.5 text-left transition-colors last:border-b-0"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block truncate text-[12.5px] font-semibold">
                          {d.account}
                        </span>
                        <span className="text-muted block truncate text-[11px]">
                          {stageOf(d.stage).label} · closes {d.closeDate.slice(5)} ·{' '}
                          {repOf(d.ownerId).name.split(' ')[0]}
                        </span>
                      </span>
                      {d.idleDays >= STALE_AFTER ? (
                        <Badge tone="warn">{d.idleDays}d idle</Badge>
                      ) : null}
                      <span className="tnum text-ink shrink-0 text-[13px] font-bold">
                        {usd(d.value)}
                      </span>
                      {/* A probability, not a change — so no arrow and no
                          red/green. A Delta here would read as a fall. */}
                      <span className="tnum text-muted w-[46px] shrink-0 text-right text-[11.5px] font-semibold">
                        {Math.round(stageOf(d.stage).probability * 100)}%
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
