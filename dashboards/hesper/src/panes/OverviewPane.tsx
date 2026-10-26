import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { BillBars } from '@/charts/BillBars';
import { Avatar, Badge, Card, CardHead, Delta, Empty } from '@/components/Bits';
import { Button, IconButton, SelectPill, SortHeader } from '@/components/Controls';
import { PageHead } from '@/components/Chrome';
import { Icon, type IconName } from '@/components/Icon';
import {
  CASE_WINDOWS,
  PRIORITY_LABEL,
  RANGES,
  STATUS_LABEL,
  casesIn,
  clientOf,
  daysLeft,
  metrics,
  openMatters,
  personOf,
  pointLabel,
  profitGrowth,
  profitSeries,
  profitTotal,
  topClients,
  type Matter,
  type Priority,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { plural, short, usd } from '@/lib/format';

const METRIC_GLYPH: Record<string, IconName> = {
  growth: 'trend-up',
  clients: 'users',
  cases: 'scales',
  returning: 'refresh',
};

const PRIORITY_TONE: Record<Priority, 'danger' | 'warn' | 'positive'> = {
  high: 'danger',
  medium: 'warn',
  low: 'positive',
};

type SortKey = 'client' | 'matter' | 'type' | 'billable';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Two rows of cards, and they are wired to each other: picking a client in
 * Top Clients filters the table under it, and a row in that table opens the
 * matter on the Task tab. A card that only lights up when you hover it is a
 * card with nothing to film.
 */
export function OverviewPane({
  onNavigate,
  onOpenMatter,
}: {
  onNavigate: (tab: 'tasks') => void;
  onOpenMatter: (id: string) => void;
}) {
  const [rangeId, setRangeId] = useState(RANGES[0].id);
  const [client, setClient] = useState<string | null>(null);
  const [windowId, setWindowId] = useState(CASE_WINDOWS[0].id);
  const [sort, setSort] = useState<SortKey>('billable');
  const [descending, setDescending] = useState(true);
  const [exported, setExported] = useState(false);

  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[0];
  const series = useMemo(() => profitSeries(rangeId), [rangeId]);
  const total = profitTotal(series);
  const growth = profitGrowth(series);
  const tiles = useMemo(() => metrics(), []);
  const clients = useMemo(() => topClients(5), []);
  const cases = casesIn(windowId);
  /* Distinct clients with something open — not the length of the Top Clients
     list, which is five whatever the firm is working on. */
  const openClients = new Set(openMatters().map((m) => m.clientId)).size;

  const rows = openMatters()
    .filter((m) => (client ? m.clientId === client : true))
    .slice()
    .sort((a, b) => {
      const by =
        sort === 'client'
          ? clientOf(a.clientId).name.localeCompare(clientOf(b.clientId).name)
          : sort === 'matter'
            ? a.title.localeCompare(b.title)
            : sort === 'type'
              ? a.type.localeCompare(b.type)
              : a.rate - b.rate;
      return descending ? -by : by;
    });

  const onSort = (column: string) => {
    if (column === sort) setDescending((v) => !v);
    else {
      setSort(column as SortKey);
      setDescending(true);
    }
  };

  return (
    <div data-pane="overview" className="flex h-full flex-col">
      <PageHead
        title="Company Overview"
        action={
          <Button
            icon={exported ? 'check' : 'upload'}
            name="export"
            onClick={() => setExported((v) => !v)}
          >
            {exported ? 'Exported' : 'Export'}
          </Button>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1.18fr_1fr] grid-rows-2 gap-4">
        <Card pane="profit" tone="tint" className="min-h-0 p-5">
          <div className="flex min-h-0 flex-1 gap-4">
            <div className="flex w-[290px] shrink-0 flex-col justify-between">
              <div>
                <h2 className="text-ink m-0 text-[17px] leading-tight font-bold tracking-[-0.01em]">
                  Total profit
                </h2>
                <SelectPill
                  name="range"
                  icon="calendar"
                  align="left"
                  className="mt-3"
                  value={rangeId}
                  options={RANGES.map((r) => ({ id: r.id, label: r.period }))}
                  onChange={setRangeId}
                />
              </div>

              <p className="m-0 flex flex-wrap items-center gap-2.5">
                <span className="tnum text-ink text-[32px] leading-none font-bold tracking-[-0.035em]">
                  {usd(total, true)}
                </span>
                <Delta value={growth} chip />
              </p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <AreaChart
                values={series}
                ticks={range.ticks}
                format={(n) => short(n)}
                gridColor="var(--color-accent-pale)"
                pointLabel={(i) => pointLabel(rangeId, i)}
                unit="in fees"
                label={`Profit over ${range.period}, totalling ${usd(total)}`}
              />
            </div>
          </div>

          <ul className="m-0 mt-4 grid shrink-0 list-none grid-cols-4 gap-3 p-0">
            {tiles.map((m) => (
              <li key={m.id}>
                <div data-metric={m.id} className="bg-surface h-full rounded-xl p-3">
                  <span className="flex items-start gap-2">
                    <span className="bg-accent-faint text-accent-deep grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                      <Icon name={METRIC_GLYPH[m.icon]} size={15} />
                    </span>
                    <span className="text-muted text-[11.5px] leading-[15px]">{m.label}</span>
                  </span>
                  <span className="tnum text-ink mt-2.5 block text-[22px] leading-none font-bold tracking-[-0.02em]">
                    {m.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card pane="clients" className="min-h-0 p-5">
          <CardHead
            title="Top Clients"
            note="Top clients by billable hours"
            action={<IconButton icon="dots" label="Client options" size={36} tone="outline" />}
          />
          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <BillBars
              rows={clients.map((c) => ({
                id: c.client.id,
                label: c.client.name,
                hours: c.hours,
                value: c.value,
              }))}
              active={client}
              onActive={setClient}
              format={(v) => usd(v)}
              label={
                'Top clients by billable hours: ' +
                clients.map((c) => `${c.client.name} ${c.hours} hours`).join(', ')
              }
            />
          </div>
        </Card>

        <Card pane="matters" className="min-h-0 p-5">
          <CardHead
            title="Client in progress"
            note={
              client
                ? `${rows.length} open for ${clientOf(client).name}`
                : `${rows.length} matters open across ${openClients} clients`
            }
            action={
              client ? (
                <Button
                  size="sm"
                  variant="quiet"
                  name="clear-client"
                  onClick={() => setClient(null)}
                >
                  Clear filter
                  <Icon name="close" size={13} strokeWidth={2.2} />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="quiet"
                  name="all-matters"
                  onClick={() => onNavigate('tasks')}
                >
                  View all
                  <Icon name="arrow-right" size={14} strokeWidth={2.2} />
                </Button>
              )
            }
          />

          <div className="border-line mt-3 grid shrink-0 grid-cols-[1.1fr_1.5fr_0.8fr_0.7fr] gap-3 border-b pb-2.5">
            <SortHeader
              label="Client"
              column="client"
              active={sort === 'client'}
              descending={descending}
              onSort={onSort}
            />
            <SortHeader
              label="Matter"
              column="matter"
              active={sort === 'matter'}
              descending={descending}
              onSort={onSort}
            />
            <SortHeader
              label="Type"
              column="type"
              active={sort === 'type'}
              descending={descending}
              onSort={onSort}
            />
            <SortHeader
              label="Billable"
              column="billable"
              active={sort === 'billable'}
              descending={descending}
              onSort={onSort}
              className="justify-end"
            />
          </div>

          <div data-scroller="matters" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length ? (
              <ul className="m-0 list-none p-0">
                {rows.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      data-row={m.id}
                      onClick={() => onOpenMatter(m.id)}
                      title={`Open ${m.title} on Task`}
                      className="border-line hover:bg-sunken grid w-full grid-cols-[1.1fr_1.5fr_0.8fr_0.7fr] items-center gap-3 border-b px-0 py-3 text-left transition-colors last:border-b-0"
                    >
                      <span className="text-ink min-w-0 truncate text-[13px] font-semibold">
                        {clientOf(m.clientId).name}
                      </span>
                      <span className="text-body min-w-0 truncate text-[13px]">{m.title}</span>
                      <span className="text-muted min-w-0 truncate text-[13px]">{m.type}</span>
                      <span className="tnum text-ink text-right text-[13px] font-semibold">
                        USD {m.rate}/h
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="matter" query={clientOf(client ?? 'c1').name} />
            )}
          </div>
        </Card>

        <Card pane="cases" className="relative min-h-0 p-5">
          <CardHead
            title="Progress Case"
            action={
              <SelectPill
                name="window"
                value={windowId}
                options={CASE_WINDOWS}
                onChange={setWindowId}
              />
            }
          />

          <div data-scroller="cases" className="scroll-region mt-3 min-h-0 flex-1 pr-2 pb-14">
            {cases.length ? (
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {cases.map((m) => (
                  <li key={m.id}>
                    <CaseCard matter={m} onOpen={() => onOpenMatter(m.id)} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="case" query={CASE_WINDOWS.find((w) => w.id === windowId)?.label ?? ''} />
            )}
          </div>

          {/* The reference floats this over the list; the scroller carries the
              padding so nothing is permanently hidden behind it. */}
          <div className="from-surface pointer-events-none absolute right-5 bottom-5 left-5 bg-gradient-to-t to-transparent pt-6">
            <Button
              name="view-all"
              className="pointer-events-auto w-full"
              onClick={() => onNavigate('tasks')}
            >
              View All
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/** One case in the Progress Case list. */
function CaseCard({ matter, onOpen }: { matter: Matter; onOpen: () => void }) {
  const owner = personOf(matter.ownerId);
  const left = daysLeft(matter.due);
  return (
    <button
      type="button"
      data-case={matter.id}
      onClick={onOpen}
      className="border-line hover:border-accent/50 hover:bg-sunken w-full rounded-xl border px-3.5 py-3 text-left transition-colors"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-accent-deep truncate text-[12px] font-semibold italic">
          {clientOf(matter.clientId).name}
        </span>
        <Badge tone={PRIORITY_TONE[matter.priority]}>{PRIORITY_LABEL[matter.priority]}</Badge>
      </span>

      <span className="text-ink mt-1.5 block truncate text-[15px] font-bold">{matter.title}</span>

      <span className="mt-2 flex items-center gap-2">
        <Avatar src={owner.face} name={owner.name} size={22} />
        <span className="text-muted truncate text-[12px]">{owner.name}</span>
      </span>

      <span className="bg-sunken mt-2.5 flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5">
        <span className="text-body flex min-w-0 items-center gap-1.5 text-[12px]">
          <span
            aria-hidden="true"
            className={cx(
              'h-1.5 w-1.5 shrink-0 rounded-full',
              matter.status === 'waiting' && 'bg-warn',
              matter.status === 'review' && 'bg-accent',
              matter.status === 'filed' && 'bg-positive',
            )}
          />
          <span className="truncate">{STATUS_LABEL[matter.status]}</span>
        </span>
        <span className="tnum text-muted shrink-0 text-[11.5px]">
          {left < 0 ? `${plural(-left, 'day')} over` : `${plural(left, 'day')} left`}
        </span>
      </span>
    </button>
  );
}
