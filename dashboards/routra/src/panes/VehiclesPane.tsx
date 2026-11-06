import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { SearchBox, Segmented } from '@/components/Controls';
import { Icon, LoadSpace } from '@/components/Icon';
import { DRIVERS, ROUTES, VEHICLES, driverOf, type Vehicle } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

type Lens = 'all' | 'Truck' | 'Van';

const LENSES: { id: Lens; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Truck', label: 'Trucks' },
  { id: 'Van', label: 'Vans' },
];

const SORTS = [
  { id: 'service', label: 'Service soonest' },
  { id: 'payload', label: 'Largest payload' },
  { id: 'model', label: 'By model' },
];

/** Miles between services, so the meter has something to be a fraction of. */
const SERVICE_INTERVAL = 2_000;

/**
 * Vehicles. Assembly only (rule 4).
 *
 * The fleet itself: what each one can carry, who is in it today, and how far
 * it is from its next service. **The service meter is miles remaining over
 * the interval** — a bar that is not the ratio of the numbers beside it is
 * the defect this category produces most.
 */
export function VehiclesPane() {
  const [lens, setLens] = useState<Lens>('all');
  const [sort, setSort] = useState('service');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const rows = VEHICLES.filter((v) => (lens === 'all' ? true : v.kind === lens))
    .filter((v) => (q ? (v.model + ' ' + v.plate).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'service'
        ? a.serviceDueIn - b.serviceDueIn
        : sort === 'payload'
          ? b.payload - a.payload
          : a.model.localeCompare(b.model),
    );

  const crewOf = (v: Vehicle) => DRIVERS.filter((d) => d.vehicleId === v.id);
  const loadsOf = (v: Vehicle) =>
    ROUTES.filter((r) => crewOf(v).some((d) => d.id === r.driverId)).length;

  return (
    <div data-pane="vehicles" className="flex h-full flex-col">
      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        {[
          {
            k: 'In the fleet',
            v: String(VEHICLES.length),
            n: `${VEHICLES.filter((v) => v.kind === 'Truck').length} trucks, ${VEHICLES.filter((v) => v.kind === 'Van').length} vans`,
          },
          {
            k: 'Crewed today',
            v: String(new Set(DRIVERS.map((d) => d.vehicleId)).size),
            n: 'with a driver assigned',
          },
          {
            k: 'Service due',
            v: String(VEHICLES.filter((v) => v.serviceDueIn === 0).length),
            n: 'booked out until done',
          },
          {
            k: 'Total payload',
            v: num(VEHICLES.reduce((t, v) => t + v.payload, 0)) + ' lbs',
            n: 'if every vehicle ran full',
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

      <Card pane="vehicles" className="min-h-0 flex-1 p-5">
        <CardHead
          title="Fleet"
          note={`Service interval ${num(SERVICE_INTERVAL)} miles`}
          action={
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search model or plate"
                name="vehicles"
                className="w-[240px]"
              />
              <Segmented
                name="lens"
                size="sm"
                value={lens}
                options={LENSES}
                onChange={(id) => setLens(id)}
              />
              <Segmented
                name="sort"
                size="sm"
                value={sort}
                options={SORTS}
                onChange={(id) => setSort(id)}
              />
            </>
          }
        />

        <div data-scroller="vehicles" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0">
              {rows.map((v) => {
                const crew = crewOf(v);
                const due = v.serviceDueIn === 0;
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      data-row={v.id}
                      aria-expanded={open === v.id}
                      onClick={() => setOpen(open === v.id ? null : v.id)}
                      className={cx(
                        'w-full rounded-[12px] border p-4 text-left transition-colors',
                        open === v.id
                          ? 'border-accent bg-accent-faint'
                          : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="bg-sunken text-accent-deep grid h-10 w-10 shrink-0 place-items-center rounded-[10px]">
                          <Icon name="van" size={19} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[13px] font-bold">
                            {v.model}
                          </span>
                          <span className="text-muted tnum block truncate text-[11.5px]">
                            {v.kind} · {v.plate} · {crew.length} crew
                          </span>
                        </span>
                        {due ? <Badge tone="danger">Service due</Badge> : null}
                      </span>

                      <span className="mt-3 block">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-muted text-[11px]">To next service</span>
                          <span className="tnum text-ink text-[11.5px] font-semibold">
                            {num(v.serviceDueIn)} mi
                          </span>
                        </span>
                        <Meter
                          value={(v.serviceDueIn / SERVICE_INTERVAL) * 100}
                          tone={due ? 'danger' : 'accent'}
                          height={6}
                          className="mt-1.5"
                        />
                      </span>

                      {open === v.id ? (
                        <span className="border-line mt-3 block border-t pt-3">
                          <span className="flex gap-4">
                            <span className="grid shrink-0 grid-cols-2 gap-x-4 gap-y-2">
                              {[
                                { k: 'Payload', v: `${num(v.payload)} lbs` },
                                { k: 'Volume', v: `${num(v.volume)} in³` },
                                { k: 'Last service', v: v.servicedOn },
                                { k: 'Loads logged', v: String(loadsOf(v)) },
                              ].map((d) => (
                                <span key={d.k} className="block">
                                  <span className="text-muted block text-[10.5px]">{d.k}</span>
                                  <span className="tnum text-ink mt-0.5 block text-[12px] font-bold">
                                    {d.v}
                                  </span>
                                </span>
                              ))}
                            </span>
                            <span className="min-w-0 flex-1">
                              <LoadSpace length={v.length} width={v.width} className="w-full" />
                            </span>
                          </span>
                          {crew.length ? (
                            <span className="text-muted mt-2 block truncate text-[11px]">
                              Crewed by {crew.map((d) => driverOf(d.id).name).join(', ')}
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty what="vehicle" query={query || lens} />
          )}
        </div>
      </Card>
    </div>
  );
}
