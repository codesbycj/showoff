import { useState } from 'react';

import { DayBar } from '@/charts/DayBar';
import { WeekBars } from '@/charts/WeekBars';
import { Avatar, Badge, Card, CardHead, Empty } from '@/components/Bits';
import { IconButton, SearchBox } from '@/components/Controls';
import { Icon, LoadSpace } from '@/components/Icon';
import {
  DRIVERS,
  STATE_LABEL,
  STATE_ON_INK,
  STATE_TOKEN,
  activeRoute,
  asHours,
  dayFor,
  dayTotal,
  driverOf,
  routesFor,
  trucks,
  vans,
  vehicleOf,
  weekFor,
  type Driver,
  type Route,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * The driver rail on the left, and everything on the right is that driver:
 * the vehicle, the load, the routes and the day. Picking a driver changes all
 * four, which is the interaction the whole console is built around.
 */
export function FleetPane() {
  const [selected, setSelected] = useState('d3');
  const [query, setQuery] = useState('');
  const [state, setState] = useState<string | null>(null);

  const driver = driverOf(selected);
  const vehicle = vehicleOf(driver.vehicleId);
  const route = activeRoute(driver.id);
  const routes = routesFor(driver.id);
  const slices = dayFor(driver.id);
  const total = dayTotal(slices);
  const week = weekFor(driver.id);

  const q = query.trim().toLowerCase();
  const match = (d: Driver) =>
    q ? (d.name + ' ' + vehicleOf(d.vehicleId).model).toLowerCase().includes(q) : true;

  const groups: { id: string; label: string; drivers: Driver[] }[] = [
    {
      id: 'favourites',
      label: 'Favourites',
      drivers: DRIVERS.filter((d) => d.favourite).filter(match),
    },
    {
      id: 'trucks',
      label: 'Trucks',
      drivers: trucks()
        .filter((d) => !d.favourite)
        .filter(match),
    },
    {
      id: 'vans',
      label: 'Vans',
      drivers: vans()
        .filter((d) => !d.favourite)
        .filter(match),
    },
  ];
  const shown = groups.reduce((t, g) => t + g.drivers.length, 0);

  return (
    <div data-pane="fleet" className="flex h-full gap-4">
      <Card pane="drivers" className="w-[292px] shrink-0 p-4">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search drivers"
          name="drivers"
          className="shrink-0"
        />

        <div data-scroller="drivers" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
          {shown ? (
            groups.map((g) =>
              g.drivers.length ? (
                <div key={g.id} className="mb-3">
                  <p className="text-muted m-0 px-1 pb-1.5 text-[10.5px] font-bold tracking-[0.1em] uppercase">
                    {g.label}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                    {g.drivers.map((d) => (
                      <li key={d.id}>
                        <DriverRow
                          driver={d}
                          selected={selected === d.id}
                          onSelect={() => setSelected(d.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )
          ) : (
            <Empty what="driver" query={query} />
          )}
        </div>

        <div className="border-line mt-2 shrink-0 border-t pt-3">
          <button
            type="button"
            data-action="add-vehicle"
            aria-disabled={true}
            aria-label="Add a vehicle (not available)"
            title="Add a vehicle — not available"
            tabIndex={-1}
            className="bg-ink text-ink-fg flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full text-[12.5px] font-bold opacity-80"
          >
            <Icon name="plus" size={15} />
            Add new vehicle
          </button>
        </div>
      </Card>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <Card pane="driver" className="shrink-0 p-5">
          <div className="flex items-center gap-3">
            <Avatar src={driver.face} name={driver.name} size={44} />
            <div className="min-w-0 flex-1">
              <h2 className="text-ink m-0 truncate text-[17px] leading-tight font-bold">
                {driver.name}
              </h2>
              <p className="text-muted tnum m-0 mt-0.5 text-[12px]">
                ID {driver.badge} · on since {driver.startedAt}
              </p>
            </div>
            <StatePill state={driver.state} />
            <IconButton
              icon="chat"
              label={`Message ${driver.name}`}
              name="message"
              size={38}
              tone="outline"
            />
            <IconButton
              icon="phone"
              label={`Call ${driver.phone}`}
              name="call"
              size={38}
              tone="outline"
            />
            <IconButton
              icon="dots"
              label="Driver options"
              name="driver-menu"
              size={38}
              tone="outline"
            />
          </div>
        </Card>

        <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-4">
          <div className="flex min-h-0 flex-col gap-4">
            <Card pane="vehicle" className="min-h-0 shrink-0 basis-[46%] p-5">
              <CardHead
                title={vehicle.model}
                note={`${vehicle.kind} · plate ${vehicle.plate}`}
                action={
                  <Badge tone={vehicle.serviceDueIn === 0 ? 'danger' : 'quiet'}>
                    {vehicle.serviceDueIn === 0
                      ? 'Service due'
                      : `${num(vehicle.serviceDueIn)} mi to service`}
                  </Badge>
                }
              />
              <div className="mt-3 flex min-h-0 flex-1 gap-4">
                <dl className="m-0 grid shrink-0 grid-cols-2 content-start gap-x-4 gap-y-3">
                  {[
                    { k: 'Payload', v: `${num(vehicle.payload)} lbs`, icon: 'weight' as const },
                    { k: 'Load volume', v: `${num(vehicle.volume)} in³`, icon: 'box' as const },
                    { k: 'Load length', v: `${vehicle.length} in`, icon: 'ruler' as const },
                    { k: 'Load width', v: `${vehicle.width} in`, icon: 'ruler' as const },
                  ].map((d) => (
                    <div key={d.k}>
                      <dt className="text-muted m-0 flex items-center gap-1 text-[11px]">
                        <Icon name={d.icon} size={12} />
                        {d.k}
                      </dt>
                      <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">{d.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex min-w-0 flex-1 items-center">
                  <LoadSpace length={vehicle.length} width={vehicle.width} className="w-full" />
                </div>
              </div>
              <button
                type="button"
                data-action="documents"
                aria-disabled={true}
                aria-label="Documents (not available)"
                title="Documents — not available"
                tabIndex={-1}
                className="text-muted mt-2 flex h-7 shrink-0 cursor-not-allowed items-center gap-1.5 text-[12px] font-semibold underline decoration-dotted"
              >
                <Icon name="doc" size={14} />
                Documents
              </button>
            </Card>

            <Card pane="routes" className="min-h-0 flex-1 p-5">
              <CardHead
                title="Routes"
                note={
                  route ? `Now on the way · ${num(route.packages)} packages` : 'Nothing running'
                }
                action={<Badge tone="quiet">{routes.length}</Badge>}
              />
              <div data-scroller="routes" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
                {routes.length ? (
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {routes.map((r) => (
                      <li key={r.id}>
                        <RouteCard route={r} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty what="route" query={driver.name} />
                )}
              </div>
            </Card>
          </div>

          <Card pane="stats" className="min-h-0 p-5">
            <CardHead
              title="Driver statistics"
              note={`Average day · ${asHours(total)} logged`}
              action={<Badge tone="accent">This week</Badge>}
            />

            <div className="mt-4 shrink-0">
              <DayBar slices={slices} total={total} active={state} onActive={setState} />
              <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
                {slices.map((s) => {
                  const pct = (s.minutes / total) * 100;
                  return (
                    <li key={s.state}>
                      <button
                        type="button"
                        data-state={s.state}
                        aria-pressed={state === s.state}
                        onClick={() => setState(state === s.state ? null : s.state)}
                        className={cx(
                          'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors',
                          state === s.state ? 'bg-sunken' : 'hover:bg-sunken',
                          state && state !== s.state && 'opacity-55',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          style={{ background: `var(${STATE_TOKEN[s.state]})` }}
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                        />
                        <span className="text-body min-w-0 flex-1 truncate text-left text-[12.5px]">
                          {STATE_LABEL[s.state]}
                        </span>
                        <span className="tnum text-ink shrink-0 text-[12.5px] font-semibold">
                          {asHours(s.minutes)}
                        </span>
                        <span className="tnum text-muted w-[46px] shrink-0 text-right text-[12px]">
                          {pct.toFixed(1)}%
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-line mt-4 flex min-h-0 flex-1 flex-col border-t pt-3">
              <p className="text-muted m-0 shrink-0 text-[11px] font-bold tracking-[0.1em] uppercase">
                Working time per day
              </p>
              <div className="mt-2 flex min-h-0 flex-1 flex-col">
                <WeekBars
                  week={week}
                  label={`Working time per day for ${driver.name}, against an ${asHours(week[0].average)} average`}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DriverRow({
  driver,
  selected,
  onSelect,
}: {
  driver: Driver;
  selected: boolean;
  onSelect: () => void;
}) {
  const vehicle = vehicleOf(driver.vehicleId);
  return (
    <button
      type="button"
      data-driver={driver.id}
      aria-pressed={selected}
      onClick={onSelect}
      className={cx(
        'flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 text-left transition-colors',
        selected ? 'bg-accent-faint' : 'hover:bg-sunken',
      )}
    >
      <span className="relative shrink-0">
        <Avatar src={driver.face} name={driver.name} size={32} />
        <span
          aria-hidden="true"
          style={{ background: `var(${STATE_TOKEN[driver.state]})` }}
          className="ring-surface absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full ring-2"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-ink block truncate text-[12.5px] font-semibold">{driver.name}</span>
        <span className="text-muted block truncate text-[11px]">{vehicle.model}</span>
      </span>
      {/* The state's own colour is a *mark* colour — the amber is 2.36:1 on
          white and the light blue 2.43:1 — so the dot on the avatar carries
          the colour and this label is muted type. */}
      <span className="text-muted shrink-0 text-[9.5px] font-bold tracking-[0.06em] uppercase">
        {STATE_LABEL[driver.state]}
      </span>
    </button>
  );
}

function StatePill({ state }: { state: Driver['state'] }) {
  return (
    <span
      style={{ background: `var(${STATE_TOKEN[state]})` }}
      className={cx(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold',
        STATE_ON_INK.includes(state) ? 'text-ink' : 'text-white',
      )}
    >
      {STATE_LABEL[state]}
    </span>
  );
}

/**
 * One route.
 *
 * The reference puts a **map thumbnail** here. A map is a picture of a place,
 * so drawing one is tracing rather than expressing an idea (rule 8) — and a
 * static tile would be a network dependency in a take. The stops are a
 * timeline instead, which is what a dispatcher reads anyway: where it has
 * been, where it is going, and when.
 */
function RouteCard({ route }: { route: Route }) {
  return (
    <div
      data-route={route.id}
      className={cx(
        'rounded-[12px] border p-3.5',
        route.state === 'now' ? 'border-accent bg-accent-faint' : 'border-line',
      )}
    >
      <div className="flex items-center gap-2">
        <span className="tnum text-ink text-[12.5px] font-bold">ID {route.id}</span>
        <span className="text-muted text-[12px]">· {num(route.packages)} packages</span>
        {route.state === 'now' ? <Badge tone="accent">Now on the way</Badge> : null}
        {route.state === 'planned' ? <Badge tone="quiet">Planned</Badge> : null}
      </div>

      <ol className="m-0 mt-2.5 list-none p-0">
        {route.stops.map((s, i) => (
          <li key={s.at + s.place} className="flex gap-2.5">
            <span className="flex w-3 shrink-0 flex-col items-center">
              <span
                aria-hidden="true"
                className={cx(
                  'mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2',
                  s.done ? 'bg-accent border-accent' : 'border-sunken-deep bg-surface',
                )}
              />
              {i < route.stops.length - 1 ? (
                <span aria-hidden="true" className="bg-sunken-deep w-px flex-1" />
              ) : null}
            </span>
            <span className="min-w-0 flex-1 pb-2">
              <span className="text-ink block truncate text-[12px] font-semibold">{s.place}</span>
              <span className="text-muted tnum block truncate text-[11px]">
                {s.at} · {s.address}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <dl className="border-line m-0 grid grid-cols-4 gap-2 border-t pt-2.5">
        {[
          { k: 'Distance', v: `${route.distance} mi` },
          { k: 'Time left', v: route.minutesLeft ? `${route.minutesLeft} min` : '—' },
          { k: 'Weight', v: `${num(route.weight)} lbs` },
          { k: 'Volume', v: `${num(route.volume)} in³` },
        ].map((d) => (
          <div key={d.k}>
            <dt className="text-muted m-0 text-[10.5px]">{d.k}</dt>
            <dd className="tnum text-ink m-0 mt-0.5 text-[12px] font-bold">{d.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
