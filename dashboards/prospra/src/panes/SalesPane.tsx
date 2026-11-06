import { useState } from 'react';

import { Avatar, Badge, Card, CardHead } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, SearchBox, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  OPEN_STAGES,
  STALE_AFTER,
  TEAM,
  attainment,
  closedWon,
  openDeals,
  quota,
  repOf,
  stageOf,
  weightedPipeline,
  weightedThisQuarter,
  type Deal,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

const SORTS = [
  { id: 'value', label: 'Largest first' },
  { id: 'close', label: 'Closing soonest' },
  { id: 'idle', label: 'Most neglected' },
];

/**
 * Sales — the pipeline board. Assembly only (rule 4).
 *
 * Each column header carries the count, the **raw** total and the
 * **weighted** total, because a board that only sums the raw value tells the
 * quarter it is bigger than it is. The quarter bar across the top is closed
 * plus weighted against quota, which is the one line that answers "are we
 * going to make it".
 */
export function SalesPane() {
  const [owner, setOwner] = useState('all');
  const [sort, setSort] = useState('value');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const visible = openDeals()
    .filter((d) => (owner === 'all' ? true : d.ownerId === owner))
    .filter((d) => (q ? (d.account + ' ' + d.source).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'value'
        ? b.value - a.value
        : sort === 'close'
          ? a.closeDate.localeCompare(b.closeDate)
          : b.idleDays - a.idleDays,
    );

  const ownerOptions = [
    { id: 'all', label: 'Whole team' },
    ...TEAM.filter((r) => r.quota > 0).map((r) => ({ id: r.id, label: r.name })),
  ];

  const deal = visible.find((d) => d.id === selected) ?? null;
  /* Only the deals that close inside the quarter count towards it. */
  const committed = closedWon() + weightedThisQuarter();

  return (
    <div data-pane="sales" className="flex h-full flex-col">
      <PageHead
        title="Sales pipeline"
        subtitle="Every open deal by stage, weighted against its probability"
        action={
          <>
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search accounts"
              name="deals"
              className="w-[220px]"
            />
            <SelectPill name="owner" value={owner} options={ownerOptions} onChange={setOwner} />
            <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
          </>
        }
      />

      <Card pane="quarter" className="mb-4 shrink-0 p-5">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <h2 className="text-ink m-0 text-[15px] leading-tight font-bold">The quarter</h2>
            <p className="text-muted m-0 mt-1 text-[12px]">
              {usd(closedWon())} closed and {usd(weightedThisQuarter())} weighted in-quarter,
              against a {usd(quota())} quota
            </p>
          </div>
          <div className="tnum flex shrink-0 items-baseline gap-2">
            <span className="text-ink text-[26px] leading-none font-bold tracking-[-0.03em]">
              {((committed / quota()) * 100).toFixed(0)}%
            </span>
            <span className="text-muted text-[12px]">committed</span>
          </div>
        </div>
        <div className="bg-sunken-deep mt-3 flex h-3 overflow-hidden rounded-full">
          <span
            style={{ width: Math.min(100, attainment()) + '%' }}
            className="bg-accent-deep block h-full"
            title="Closed won"
          />
          <span
            style={{
              width:
                Math.min(100 - Math.min(100, attainment()), (weightedPipeline() / quota()) * 100) +
                '%',
            }}
            className="hatched block h-full"
            title="Weighted pipeline"
          />
        </div>
      </Card>

      <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-4">
        <div className="grid min-h-0 grid-cols-4 gap-3">
          {OPEN_STAGES.map((stage) => {
            const column = visible.filter((d) => d.stage === stage.id);
            const raw = column.reduce((t, d) => t + d.value, 0);
            return (
              <div
                key={stage.id}
                data-column={stage.id}
                className="bg-panel flex min-h-0 flex-col rounded-[var(--radius-card)] p-3"
              >
                <div className="shrink-0">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      style={{ background: `var(${stage.token})` }}
                      className="h-2.5 w-2.5 rounded-full"
                    />
                    <span className="text-ink text-[12.5px] font-bold">{stage.label}</span>
                    <span className="tnum text-muted ml-auto text-[11.5px]">{column.length}</span>
                  </span>
                  <span className="tnum text-muted mt-1.5 block text-[11px]">
                    ${short(raw)} raw · ${short(raw * stage.probability)} weighted
                  </span>
                </div>

                <div
                  data-scroller={`stage-${stage.id}`}
                  className="scroll-region mt-2.5 min-h-0 flex-1 pr-1"
                >
                  {column.length ? (
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {column.map((d) => (
                        <li key={d.id}>
                          <DealCard
                            deal={d}
                            selected={selected === d.id}
                            onSelect={() => setSelected(selected === d.id ? null : d.id)}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted m-0 px-1 py-4 text-center text-[11.5px]">
                      Nothing at this stage.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Card pane="detail" className="min-h-0 p-5">
          {deal ? (
            <>
              <CardHead
                title={deal.account}
                note={`${stageOf(deal.stage).label} · ${Math.round(stageOf(deal.stage).probability * 100)}% probability`}
                action={
                  <Button
                    size="sm"
                    variant="outline"
                    name="close-detail"
                    onClick={() => setSelected(null)}
                  >
                    Close
                    <Icon name="close" size={13} strokeWidth={2.2} />
                  </Button>
                }
              />

              <p className="m-0 mt-4 shrink-0">
                <span className="tnum text-ink text-[30px] leading-none font-bold tracking-[-0.03em]">
                  {usd(deal.value)}
                </span>
                <span className="text-muted tnum mt-1.5 block text-[12px]">
                  {usd(deal.value * stageOf(deal.stage).probability)} weighted at this stage
                </span>
              </p>

              <dl className="border-line m-0 mt-4 grid shrink-0 grid-cols-2 gap-x-4 gap-y-3 border-t pt-4">
                {[
                  { k: 'Owner', v: repOf(deal.ownerId).name },
                  { k: 'Source', v: deal.source },
                  { k: 'Created', v: deal.created },
                  { k: 'Expected close', v: deal.closeDate },
                  { k: 'Last touched', v: `${deal.idleDays} days ago` },
                  {
                    k: 'Age',
                    v: `${Math.round(
                      (new Date(deal.closeDate).getTime() - new Date(deal.created).getTime()) /
                        86_400_000,
                    )} day cycle`,
                  },
                ].map((d) => (
                  <div key={d.k}>
                    <dt className="text-muted m-0 text-[11px]">{d.k}</dt>
                    <dd className="text-ink m-0 mt-1 truncate text-[12.5px] font-semibold">
                      {d.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-line mt-4 shrink-0 border-t pt-4">
                <span className="text-muted block text-[11px]">Stage</span>
                <ol className="m-0 mt-2 flex list-none gap-1 p-0">
                  {OPEN_STAGES.map((s, i) => (
                    <li key={s.id} className="min-w-0 flex-1">
                      <span
                        aria-hidden="true"
                        style={{
                          background:
                            i <= OPEN_STAGES.findIndex((x) => x.id === deal.stage)
                              ? `var(${s.token})`
                              : 'var(--color-sunken-deep)',
                        }}
                        className="block h-2 rounded-full"
                      />
                      <span className="text-muted mt-1.5 block truncate text-[10.5px]">
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {deal.idleDays >= STALE_AFTER ? (
                <p className="bg-warn-soft text-warn m-0 mt-4 shrink-0 rounded-xl px-3 py-2.5 text-[12px]">
                  Nobody has touched this in {deal.idleDays} days.
                </p>
              ) : null}
            </>
          ) : (
            <>
              <CardHead title="Deal detail" note="Pick a card to open it" />
              <div className="grid min-h-0 flex-1 place-items-center px-6 text-center">
                <p className="text-muted m-0 text-[13px]">
                  Nothing selected. Press a card in any column to see its value, its weighted value
                  and how long it has been open.
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function DealCard({
  deal,
  selected,
  onSelect,
}: {
  deal: Deal;
  selected: boolean;
  onSelect: () => void;
}) {
  const owner = repOf(deal.ownerId);
  return (
    <button
      type="button"
      data-deal={deal.id}
      aria-pressed={selected}
      onClick={onSelect}
      className={cx(
        'bg-surface w-full rounded-[12px] border p-3 text-left transition-colors',
        selected ? 'border-accent-deep' : 'hover:border-line border-transparent',
      )}
    >
      <span className="text-ink block truncate text-[12.5px] font-semibold">{deal.account}</span>
      <span className="tnum text-ink mt-1.5 block text-[15px] leading-none font-bold">
        {usd(deal.value)}
      </span>
      <span className="mt-2.5 flex items-center gap-2">
        <Avatar src={owner.face} name={owner.name} size={22} />
        <span className="text-muted truncate text-[11px]">{deal.closeDate.slice(5)}</span>
        {deal.idleDays >= STALE_AFTER ? (
          <Badge tone="warn" className="ml-auto">
            {deal.idleDays}d
          </Badge>
        ) : null}
      </span>
    </button>
  );
}
