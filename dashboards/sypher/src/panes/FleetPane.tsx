import { useState } from 'react';

import { Badge, Card, CardHead, Label, type Tone } from '@/components/Bits';
import { SearchBox, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { FLEET, type Vehicle, type VehicleState } from '@/data/deck';
import { cx } from '@/lib/cx';

type FilterId = 'all' | VehicleState;
type SortId = 'utilisation' | 'miles' | 'driver';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'On route', label: 'On route' },
  { id: 'Loading', label: 'Loading' },
  { id: 'Idle', label: 'Idle' },
  { id: 'Maintenance', label: 'Maintenance' },
];

const SORTS: { id: SortId; label: string }[] = [
  { id: 'utilisation', label: 'Utilisation' },
  { id: 'miles', label: 'Miles' },
  { id: 'driver', label: 'Driver' },
];

const TONE: Record<VehicleState, Tone> = {
  'On route': 'accent',
  Loading: 'warn',
  Idle: 'quiet',
  Maintenance: 'danger',
};

const COLS = 'grid-cols-[96px_84px_minmax(0,1fr)_92px_124px_72px_92px]';

/**
 * Fleet: what the dashboard's "fleet utilisation 95.1%" is a percentage of.
 *
 * The summary down the right is computed from the rows that are showing, so
 * filtering the table re-states the summary — the two cannot drift.
 */
export function FleetPane({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortId>('utilisation');
  const [selected, setSelected] = useState(FLEET[0].id);

  const q = query.trim().toLowerCase();
  const rows = FLEET.filter((v) => (filter === 'all' ? true : v.state === filter))
    .filter((v) =>
      q ? (v.reg + ' ' + v.driver + ' ' + v.depot + ' ' + v.type).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'miles') return b.miles - a.miles;
      if (sort === 'driver') return a.driver.localeCompare(b.driver);
      return b.utilisation - a.utilisation;
    });

  const mean = rows.length
    ? Math.round(rows.reduce((t, v) => t + v.utilisation, 0) / rows.length)
    : 0;
  const miles = Math.round(rows.reduce((t, v) => t + v.miles, 0) * 10) / 10;

  const byState = (['On route', 'Loading', 'Idle', 'Maintenance'] as VehicleState[]).map((s) => ({
    state: s,
    count: rows.filter((v) => v.state === s).length,
  }));

  const vehicle = rows.find((v) => v.id === selected) ?? rows[0];

  return (
    <div
      data-pane="fleet"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(280px,320px)] gap-3"
    >
      <Card pane="fleet-table" className="col-span-2 min-h-0 p-4 pr-2">
        <CardHead
          title={
            <>
              Fleet <span className="text-muted ml-1 text-[13px] font-normal">{rows.length}</span>
            </>
          }
          className="pr-2"
          action={
            <>
              <div role="group" aria-label="Vehicle state" className="flex items-center gap-1">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    data-filter={f.id}
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={cx(
                      'h-7 rounded px-2.5 text-[12px] transition-colors',
                      filter === f.id
                        ? 'bg-sunken text-ink font-semibold'
                        : 'text-muted hover:text-ink',
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
              <SearchBox
                value={query}
                onChange={onQuery}
                placeholder="Search"
                hint="⌘F"
                className="w-[160px]"
              />
            </>
          }
        />

        <div
          className={cx(
            'border-line text-muted mt-3 grid shrink-0 items-center gap-3 border-b pr-2 pb-2 text-[11px] font-medium whitespace-nowrap',
            COLS,
          )}
        >
          <span>Reg</span>
          <span>Type</span>
          <span>Driver</span>
          <span>Depot</span>
          <span>Utilisation</span>
          <span>Miles</span>
          <span>State</span>
        </div>

        <div data-scroller="fleet" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
          {rows.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <p className="text-muted m-0 text-[12.5px]">
                No vehicle matches <span className="text-ink font-semibold">{query || filter}</span>
                .
              </p>
            </div>
          ) : (
            <ul className="m-0 list-none p-0">
              {rows.map((v) => (
                <li key={v.id}>
                  <Row
                    vehicle={v}
                    selected={selected === v.id}
                    onSelect={() => setSelected(v.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-2.5 pr-2 text-[11.5px]">
          <span>
            {rows.length} of {FLEET.length} vehicles
          </span>
          <span>
            {mean}% mean utilisation · {miles}k miles
          </span>
        </div>
      </Card>

      <Card pane="fleet-summary" className="min-h-0 p-4">
        <CardHead title="Fleet summary" />

        <div className="mt-3">
          <Label>Mean utilisation</Label>
          <p data-mean className="text-ink m-0 mt-1 text-[24px] leading-none font-semibold">
            {mean}%
          </p>
        </div>

        <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
          {byState.map((s) => (
            <li key={s.state}>
              <div className="flex items-center justify-between gap-2">
                <Badge tone={TONE[s.state]}>{s.state}</Badge>
                <span className="text-ink text-[12.5px] font-medium">{s.count}</span>
              </div>
              <span className="bg-sunken mt-1.5 block h-1.5 overflow-hidden rounded-full">
                <span
                  style={{ width: (rows.length ? (s.count / rows.length) * 100 : 0) + '%' }}
                  className={cx(
                    'block h-full rounded-full transition-[width] duration-500',
                    s.state === 'On route' && 'bg-accent',
                    s.state === 'Loading' && 'bg-warn',
                    s.state === 'Idle' && 'bg-sunken-deep',
                    s.state === 'Maintenance' && 'bg-danger',
                  )}
                />
              </span>
            </li>
          ))}
        </ul>

        {vehicle ? (
          <div className="border-line mt-auto rounded-lg border p-3.5">
            <Label>Selected</Label>
            <p className="text-ink m-0 mt-1.5 text-[14px] font-semibold">{vehicle.reg}</p>
            <p className="text-muted m-0 mt-0.5 text-[12px]">
              {vehicle.type} · {vehicle.driver}
            </p>
            <p className="text-body m-0 mt-2.5 flex items-center gap-1.5 text-[12px]">
              <Icon name="clock" size={12} />
              Next service {vehicle.nextService}
            </p>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

function Row({
  vehicle,
  selected,
  onSelect,
}: {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-row={vehicle.id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'border-line grid w-full items-center gap-3 border-b py-2 pr-2 text-left transition-colors',
        COLS,
        selected ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <span className="text-ink text-[12.5px] font-medium">{vehicle.reg}</span>
      <span className="text-muted text-[12px]">{vehicle.type}</span>
      <span className="text-body min-w-0 truncate text-[12.5px]">{vehicle.driver}</span>
      <span className="text-muted text-[12px]">{vehicle.depot}</span>
      <span className="flex items-center gap-2">
        <span className="bg-sunken-deep h-1.5 flex-1 overflow-hidden rounded-full">
          <span
            style={{ width: vehicle.utilisation + '%' }}
            className={cx(
              'block h-full rounded-full',
              vehicle.utilisation >= 85
                ? 'bg-accent'
                : vehicle.utilisation >= 70
                  ? 'bg-warn'
                  : 'bg-danger',
            )}
          />
        </span>
        <span className="text-muted w-8 shrink-0 text-right text-[11.5px]">
          {vehicle.utilisation}%
        </span>
      </span>
      <span className="text-body text-[12px]">{vehicle.miles}k</span>
      <span>
        <Badge tone={TONE[vehicle.state]}>{vehicle.state}</Badge>
      </span>
    </button>
  );
}
