import { useState } from 'react';

import { Avatar, Badge, Card, CardHead, Empty } from '@/components/Bits';
import { SearchBox, Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ROUTES, driverOf, packagesToday, vehicleOf, type Route } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

type Lens = 'now' | 'planned' | 'done' | 'all';

const LENSES: { id: Lens; label: string }[] = [
  { id: 'now', label: 'On the way' },
  { id: 'planned', label: 'Planned' },
  { id: 'done', label: 'Completed' },
  { id: 'all', label: 'All' },
];

const SORTS = [
  { id: 'packages', label: 'Most packages' },
  { id: 'distance', label: 'Longest' },
  { id: 'id', label: 'By route id' },
];

/**
 * Routes. Assembly only (rule 4).
 *
 * Every load the depot has out, across drivers — the view the fleet screen
 * cannot give, because that one is a single driver at a time.
 */
export function RoutesPane() {
  const [lens, setLens] = useState<Lens>('all');
  const [sort, setSort] = useState('packages');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const rows = ROUTES.filter((r) => (lens === 'all' ? true : r.state === lens))
    .filter((r) =>
      q
        ? (r.id + ' ' + driverOf(r.driverId).name + ' ' + r.stops.map((s) => s.place).join(' '))
            .toLowerCase()
            .includes(q)
        : true,
    )
    .slice()
    .sort((a, b) =>
      sort === 'packages'
        ? b.packages - a.packages
        : sort === 'distance'
          ? b.distance - a.distance
          : a.id.localeCompare(b.id),
    );

  return (
    <div data-pane="routes" className="flex h-full flex-col">
      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        {[
          {
            k: 'Out now',
            v: String(ROUTES.filter((r) => r.state === 'now').length),
            n: 'routes on the road',
          },
          {
            k: 'Planned',
            v: String(ROUTES.filter((r) => r.state === 'planned').length),
            n: 'waiting on a bay',
          },
          { k: 'Packages today', v: num(packagesToday()), n: 'loaded or delivered' },
          {
            k: 'Miles today',
            v: ROUTES.filter((r) => r.state !== 'planned')
              .reduce((t, r) => t + r.distance, 0)
              .toFixed(1),
            n: 'across every route',
          },
        ].map((s) => (
          <li key={s.k}>
            <div
              data-stat={s.k.toLowerCase().replace(/[^a-z]/g, '')}
              className="border-line bg-surface rounded-[var(--radius-card)] border px-5 py-4 shadow-[var(--shadow-card)]"
            >
              <span className="text-muted block text-[12.5px]">{s.k}</span>
              <span className="tnum text-ink mt-2 block text-[26px] leading-none font-bold tracking-[-0.03em]">
                {s.v}
              </span>
              <span className="text-muted mt-2 block text-[11.5px]">{s.n}</span>
            </div>
          </li>
        ))}
      </ul>

      <Card pane="routes" className="min-h-0 flex-1 p-5">
        <CardHead
          title={LENSES.find((l) => l.id === lens)?.label ?? 'All'}
          action={
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search routes, drivers or stops"
                name="routes"
                className="w-[260px]"
              />
              <Segmented
                name="sort"
                size="sm"
                value={sort}
                options={SORTS}
                onChange={(id) => setSort(id)}
              />
              <Badge>
                {rows.length} of {ROUTES.length}
              </Badge>
            </>
          }
        />

        <ul className="m-0 mt-3 flex shrink-0 list-none gap-2 p-0">
          {LENSES.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                data-lens={l.id}
                aria-pressed={lens === l.id}
                onClick={() => setLens(l.id)}
                className={cx(
                  'flex h-9 items-center gap-2 rounded-full border px-4 text-[12.5px] font-semibold transition-colors',
                  lens === l.id
                    ? 'bg-ink text-ink-fg border-transparent'
                    : 'border-line text-body hover:bg-sunken hover:text-ink',
                )}
              >
                {l.label}
                <span
                  className={cx(
                    'tnum rounded-full px-1.5 text-[10.5px]',
                    lens === l.id ? 'bg-white/20' : 'bg-sunken text-muted',
                  )}
                >
                  {l.id === 'all' ? ROUTES.length : ROUTES.filter((r) => r.state === l.id).length}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div data-scroller="routes" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {rows.map((r) => (
                <li key={r.id}>
                  <Row
                    route={r}
                    open={open === r.id}
                    onToggle={() => setOpen(open === r.id ? null : r.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="route" query={query || LENSES.find((l) => l.id === lens)!.label} />
          )}
        </div>
      </Card>
    </div>
  );
}

function Row({ route, open, onToggle }: { route: Route; open: boolean; onToggle: () => void }) {
  const driver = driverOf(route.driverId);
  const vehicle = vehicleOf(driver.vehicleId);
  const first = route.stops[0];
  const last = route.stops[route.stops.length - 1];

  return (
    <button
      type="button"
      data-row={route.id}
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
            ID {route.id} · {num(route.packages)} packages
          </span>
          <span className="text-muted block truncate text-[11.5px]">
            {driver.name} · {vehicle.model} · {first.place} → {last.place}
          </span>
        </span>

        {route.state === 'now' ? <Badge tone="accent">On the way</Badge> : null}
        {route.state === 'planned' ? <Badge tone="quiet">Planned</Badge> : null}
        {route.state === 'done' ? <Badge tone="positive">Completed</Badge> : null}

        <span className="tnum text-ink w-[70px] shrink-0 text-right text-[12.5px] font-semibold">
          {route.distance} mi
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
              { k: 'Weight', v: `${num(route.weight)} lbs` },
              { k: 'Volume', v: `${num(route.volume)} in³` },
              { k: 'Time left', v: route.minutesLeft ? `${route.minutesLeft} min` : '—' },
              { k: 'Stops', v: String(route.stops.length) },
            ].map((d) => (
              <span key={d.k} className="block">
                <span className="text-muted block text-[11px]">{d.k}</span>
                <span className="tnum text-ink mt-1 block text-[12.5px] font-bold">{d.v}</span>
              </span>
            ))}
          </span>
          <span className="mt-3 block">
            {route.stops.map((s) => (
              <span key={s.at + s.place} className="flex items-center gap-2 py-1">
                <span
                  aria-hidden="true"
                  className={cx(
                    'h-2 w-2 shrink-0 rounded-full',
                    s.done ? 'bg-accent' : 'bg-sunken-deep',
                  )}
                />
                <span className="text-body truncate text-[11.5px]">
                  {s.at} · {s.place} · {s.address}
                </span>
              </span>
            ))}
          </span>
        </span>
      ) : null}
    </button>
  );
}
