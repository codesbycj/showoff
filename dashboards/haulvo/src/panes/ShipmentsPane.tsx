import { useState } from 'react';

import { LegBars, type LegRow } from '@/charts/LegBars';
import { UtilBars } from '@/charts/UtilBars';
import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, SearchBox, Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  SHIPMENTS,
  LEGS,
  STATES,
  STATE_TONE,
  clientOf,
  countState,
  driverOf,
  palletsOf,
  stopsOf,
  truckOf,
  utilisation,
  weightOf,
  type Shipment,
  type ShipmentState,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

type Filter = 'all' | ShipmentState;

const SORTS = [
  { id: 'start', label: 'Starting soonest' },
  { id: 'weight', label: 'Heaviest' },
  { id: 'loads', label: 'Most loads' },
];

/**
 * Shipments. Assembly only (rule 4).
 *
 * Every shipment on the desk, in whatever state. The builder works on one;
 * this is the board the planner lives on.
 */
export function ShipmentsPane({ onOpen }: { onOpen: () => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState('start');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const rows = SHIPMENTS.filter((s) => (filter === 'all' ? true : s.state === filter))
    .filter((s) =>
      q
        ? (s.reference + ' ' + driverOf(s.driverId).name + ' ' + s.endPlace)
            .toLowerCase()
            .includes(q)
        : true,
    )
    .slice()
    .sort((a, b) =>
      sort === 'start'
        ? a.startAt.localeCompare(b.startAt)
        : sort === 'weight'
          ? weightOf(b) - weightOf(a)
          : b.loads.length - a.loads.length,
    );

  const legRows: LegRow[] = LEGS.map((kind) => {
    const loads = SHIPMENTS.flatMap((s) => s.loads).filter((l) => l.kind === kind);
    return { kind, loads: loads.length, weight: loads.reduce((t, l) => t + l.weight, 0) };
  });

  return (
    <div data-pane="shipments" className="flex h-full flex-col">
      <PageHead
        title="Shipments"
        action={
          <>
            <Segmented name="sort" value={sort} options={SORTS} onChange={(id) => setSort(id)} />
            <Button name="new-shipment" icon="plus" onClick={onOpen}>
              New shipment
            </Button>
          </>
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        {STATES.map((state) => (
          <li key={state}>
            <button
              type="button"
              data-state={state.replace(' ', '-')}
              aria-pressed={filter === state}
              onClick={() => setFilter(filter === state ? 'all' : state)}
              className={cx(
                'w-full rounded-[var(--radius-card)] border px-5 py-4 text-left transition-colors',
                filter === state
                  ? 'border-accent bg-accent-faint'
                  : 'border-line bg-surface hover:bg-sunken shadow-[var(--shadow-card)]',
              )}
            >
              <span className="text-muted block text-[12.5px] capitalize">{state}</span>
              <span className="tnum text-ink mt-2 block text-[26px] leading-none font-bold tracking-[-0.03em]">
                {countState(state)}
              </span>
              <span className="text-muted mt-2 block text-[11.5px]">
                {num(
                  SHIPMENTS.filter((s) => s.state === state).reduce((t, s) => t + weightOf(s), 0),
                )}{' '}
                lbs on the books
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="grid min-h-0 flex-1 grid-rows-[1.75fr_1fr] gap-4">
        <Card pane="shipments" className="min-h-0 p-5">
          <CardHead
            title={filter === 'all' ? 'All shipments' : filter}
            action={
              <>
                <SearchBox
                  value={query}
                  onChange={setQuery}
                  placeholder="Search reference or driver"
                  name="shipments"
                  className="w-[260px]"
                />
                <Badge>
                  {rows.length} of {SHIPMENTS.length}
                </Badge>
              </>
            }
          />

          <div data-scroller="shipments" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((s) => (
                  <li key={s.id}>
                    <Row
                      shipment={s}
                      open={open === s.id}
                      onToggle={() => setOpen(open === s.id ? null : s.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="shipment" query={query || filter} />
            )}
          </div>
        </Card>

        <div className="grid min-h-0 grid-cols-[1.3fr_1fr] gap-4">
          {/*
            Both read the same rows the list does, so a state filter, a sort or
            a search moves the chart as well as the table (rule 5). The maths
            is `utilisation()` out of the deck — change a load's weight and the
            bar moves.
          */}
          <Card pane="utilisation" className="min-h-0 p-5">
            <CardHead
              title="How full each truck is"
              note={`${rows.length} of ${SHIPMENTS.length} shipments · dashed line is a full load`}
            />
            <div className="mt-2 flex min-h-0 flex-1">
              <UtilBars
                label="Truck utilisation by shipment, as a percentage of the truck's capacity"
                bars={rows.map((s) => ({
                  id: s.id,
                  label: s.reference.replace('SHP-', ''),
                  value: utilisation(s),
                  weight: weightOf(s),
                  capacity: truckOf(s.truckId).capacity,
                  state: s.state,
                }))}
              />
            </div>
          </Card>

          <Card pane="legs" className="min-h-0 p-5">
            <CardHead title="On the books by leg" note="Every load across the six shipments" />
            <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center">
              <LegBars label="Weight on the books by leg kind" rows={legRows} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({
  shipment: s,
  open,
  onToggle,
}: {
  shipment: Shipment;
  open: boolean;
  onToggle: () => void;
}) {
  const driver = driverOf(s.driverId);
  const truck = truckOf(s.truckId);
  const stops = stopsOf(s);

  return (
    <button
      type="button"
      data-row={s.id}
      aria-expanded={open}
      onClick={onToggle}
      className={cx(
        'w-full rounded-[12px] border px-4 py-3 text-left transition-colors',
        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span className="flex items-center gap-3">
        <Avatar src={driver.face} name={driver.name} size={34} />
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13px] font-bold">
            {s.reference} · {s.loads.length} {s.loads.length === 1 ? 'load' : 'loads'}
          </span>
          <span className="text-muted block truncate text-[11.5px]">
            {driver.name} · {truck.model} · ends {s.endPlace}
          </span>
        </span>

        <Badge tone={STATE_TONE[s.state]}>{s.state}</Badge>

        <span className="tnum text-ink w-[90px] shrink-0 text-right text-[12.5px] font-semibold">
          {num(weightOf(s))} lbs
        </span>
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
              { k: 'Starts', v: s.startAt },
              { k: 'Stops', v: String(stops.length) },
              { k: 'Pallets', v: num(palletsOf(s)) },
              { k: 'Truck used', v: `${utilisation(s).toFixed(0)}%` },
            ].map((d) => (
              <span key={d.k} className="block">
                <span className="text-muted block text-[11px]">{d.k}</span>
                <span className="tnum text-ink mt-1 block text-[12.5px] font-bold">{d.v}</span>
              </span>
            ))}
          </span>
          <span className="mt-2.5 block">
            <Meter value={utilisation(s)} height={6} />
          </span>
          <span className="text-muted mt-2 block truncate text-[11.5px]">
            Clients:{' '}
            {Array.from(new Set(s.loads.map((l) => clientOf(l.clientId).contact))).join(', ')}
          </span>
        </span>
      ) : null}
    </button>
  );
}
