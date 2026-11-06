import { useState } from 'react';

import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, IconButton, SearchBox } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  DRIVERS,
  LEG_TOKEN,
  TRUCKS,
  clientOf,
  driverOf,
  palletsOf,
  shipmentOf,
  stopsOf,
  truckOf,
  utilisation,
  weightOf,
  LEGS,
  type Load,
  type LegKind,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

/** What the yard signs off before a truck leaves. */
const CHECKS = [
  { id: 'ch1', label: 'Load secured and strapped' },
  { id: 'ch2', label: 'Seal number recorded' },
  { id: 'ch3', label: 'Run sheet handed over' },
];

/**
 * The reference screen: building one shipment. Assembly only (rule 4).
 *
 * The loads on the left, the route and the resources on the right. **The
 * truck's utilisation is computed from the loads** — a planner's real check
 * before submitting, and something the reference never shows even though it
 * prints both numbers.
 */
export function BuildPane() {
  const draft = shipmentOf('sh1');
  const [query, setQuery] = useState('');
  const [openLoad, setOpenLoad] = useState<string | null>('ld1');
  const [truckId, setTruckId] = useState(draft.truckId);
  const [driverId, setDriverId] = useState(draft.driverId);
  const [state, setState] = useState<'editing' | 'draft' | 'submitted'>('editing');
  const [checks, setChecks] = useState<string[]>(['ch1']);
  const [leg, setLeg] = useState<LegKind | null>(null);

  const truck = truckOf(truckId);
  const driver = driverOf(driverId);
  const stops = stopsOf(draft);

  const q = query.trim().toLowerCase();
  const loads = draft.loads
    .filter((l) => (leg ? l.kind === leg : true))
    .filter((l) =>
      q ? (l.id + ' ' + l.kind + ' ' + clientOf(l.clientId).name).toLowerCase().includes(q) : true,
    );

  const used = (weightOf(draft) / truck.capacity) * 100;

  return (
    <div data-pane="build" className="flex h-full flex-col">
      <PageHead
        title="New shipment"
        note={`${draft.reference} · ${draft.loads.length} loads · ${num(weightOf(draft))} lbs`}
        back
        action={
          <>
            <Button
              variant="outline"
              name="save-draft"
              icon={state === 'draft' ? 'check' : undefined}
              onClick={() => setState(state === 'draft' ? 'editing' : 'draft')}
            >
              {state === 'draft' ? 'Draft saved' : 'Save as draft'}
            </Button>
            <Button
              name="submit"
              icon={state === 'submitted' ? 'check' : undefined}
              onClick={() => setState(state === 'submitted' ? 'editing' : 'submitted')}
            >
              {state === 'submitted' ? 'Submitted' : 'Submit'}
            </Button>
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.45fr] gap-4">
        <Card pane="loads" className="min-h-0 p-4">
          <div className="flex shrink-0 items-center gap-2">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search loads"
              name="loads"
              className="min-w-0 flex-1"
            />
            <IconButton
              icon="filter"
              label={leg ? `Filtering ${leg} legs` : 'Filter loads by leg'}
              name="filter"
              size={40}
              tone="outline"
              active={leg !== null}
              onClick={() => setLeg(leg === null ? LEGS[0] : (LEGS[LEGS.indexOf(leg) + 1] ?? null))}
            />
          </div>

          {/* Named, because a filter whose only sign is a tinted button is a
              filter nobody watching the take can read. */}
          {leg ? (
            <div className="border-line mt-2.5 flex shrink-0 items-center gap-2 rounded-[10px] border px-3 py-2">
              <span
                aria-hidden="true"
                style={{ background: `var(${LEG_TOKEN[leg]})` }}
                className="h-2 w-2 shrink-0 rounded-full"
              />
              <span className="text-ink truncate text-[11.5px] font-semibold">{leg} legs only</span>
              <span className="tnum text-muted ml-auto shrink-0 text-[11px]">
                {loads.length} of {draft.loads.length}
              </span>
            </div>
          ) : null}

          <button
            type="button"
            data-action="add-load"
            aria-disabled={true}
            aria-label="Add a load (not available)"
            title="Add a load — not available"
            tabIndex={-1}
            className="bg-accent-faint text-accent-deep mt-3 flex h-10 w-full shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-[10px] text-[13px] font-semibold"
          >
            <Icon name="plus" size={15} />
            Add load
          </button>

          <div data-scroller="loads" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {loads.length ? (
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {loads.map((l) => (
                  <li key={l.id}>
                    <LoadCard
                      load={l}
                      open={openLoad === l.id}
                      onToggle={() => setOpenLoad(openLoad === l.id ? null : l.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="load" query={query} />
            )}
          </div>
        </Card>

        <div className="grid min-h-0 grid-rows-[1.4fr_1fr] gap-4">
          <div className="grid min-h-0 grid-cols-[1.25fr_1fr] gap-4">
            <Card pane="route" className="min-h-0 p-4">
              <CardHead
                title="Route"
                note={`${stops.length} stops · ${num(palletsOf(draft))} pallets`}
                action={<Badge tone="accent">{draft.loads.length} loads</Badge>}
              />
              {/*
                The reference puts a **map** here. A map is a picture of a
                place, so drawing one is tracing rather than expressing an
                idea (rule 8), and a tile would be a network dependency in a
                take. The route is a sequence — so it is drawn as one.
              */}
              <div data-scroller="route" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
                <ol className="m-0 flex h-full list-none flex-col p-0">
                  {stops.map((s, i) => (
                    <li
                      key={s.at + s.place}
                      className={cx('flex shrink-0 gap-3', i < stops.length - 1 && 'grow')}
                    >
                      <span className="flex w-6 shrink-0 flex-col items-center">
                        <span
                          className={cx(
                            'tnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold',
                            s.done
                              ? 'bg-accent text-accent-fg'
                              : 'border-sunken-deep text-muted border bg-white',
                          )}
                        >
                          {i + 1}
                        </span>
                        {i < stops.length - 1 ? (
                          <span aria-hidden="true" className="bg-sunken-deep w-px flex-1" />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1 pb-3.5">
                        <span className="text-ink block truncate text-[12.5px] font-semibold">
                          {s.place}
                        </span>
                        <span className="text-muted tnum block truncate text-[11.5px]">
                          {s.at} · {s.address}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>

            <Card pane="resources" className="min-h-0 p-4">
              <CardHead title="Truck and driver" />

              <div className="mt-3 min-h-0 flex-1 overflow-hidden">
                <div className="border-line rounded-[10px] border p-3">
                  <span className="flex items-center gap-2">
                    <span className="bg-sunken text-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-lg">
                      <Icon name="truck" size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[12.5px] font-bold">
                        {truck.model}
                      </span>
                      <span className="text-muted tnum block truncate text-[11px]">
                        {truck.number} · {truck.kind} · {truck.trailer}
                      </span>
                    </span>
                    <IconButton
                      icon="pencil"
                      label="Change truck"
                      name="change-truck"
                      size={32}
                      tone="outline"
                      onClick={() =>
                        setTruckId(
                          TRUCKS[(TRUCKS.findIndex((t) => t.id === truckId) + 1) % TRUCKS.length]
                            .id,
                        )
                      }
                    />
                  </span>
                  <span className="mt-2.5 block">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-muted text-[11px]">Loaded</span>
                      <span className="tnum text-ink text-[11.5px] font-semibold">
                        {num(weightOf(draft))} of {num(truck.capacity)} lbs
                      </span>
                    </span>
                    <Meter
                      value={used}
                      tone={used > 100 ? 'danger' : 'accent'}
                      height={6}
                      className="mt-1.5"
                    />
                    <span
                      className={cx(
                        'tnum mt-1 block text-[11px] font-semibold',
                        used > 100 ? 'text-danger' : 'text-muted',
                      )}
                    >
                      {utilisation({ ...draft, truckId }).toFixed(0)}% of capacity
                      {used > 100 ? ' — over the limit' : ''}
                    </span>
                  </span>
                </div>

                <div className="border-line mt-2.5 rounded-[10px] border p-3">
                  <span className="flex items-center gap-2.5">
                    <Avatar src={driver.face} name={driver.name} size={34} />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[12.5px] font-bold">
                        {driver.name}
                      </span>
                      <span className="text-muted block truncate text-[11px]">
                        {driver.licence} · {driver.phone}
                      </span>
                    </span>
                    <IconButton
                      icon="pencil"
                      label="Change driver"
                      name="change-driver"
                      size={32}
                      tone="outline"
                      onClick={() =>
                        setDriverId(
                          DRIVERS[
                            (DRIVERS.findIndex((d) => d.id === driverId) + 1) % DRIVERS.length
                          ].id,
                        )
                      }
                    />
                  </span>
                  <span className="text-muted mt-2 flex items-center gap-1.5 truncate text-[11px]">
                    <Icon name="mail" size={12} />
                    {driver.email}
                  </span>
                </div>

                {/* The card ran a third empty below the driver block, and a
                    planner has a real third thing to do here. */}
                <div className="border-line mt-2.5 rounded-[10px] border p-3">
                  <span className="flex items-baseline gap-2">
                    <span className="text-muted block text-[11px] font-bold tracking-[0.08em] uppercase">
                      Before departure
                    </span>
                    <span className="tnum text-muted ml-auto text-[11px]">
                      {checks.length} of {CHECKS.length}
                    </span>
                  </span>
                  <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0">
                    {CHECKS.map((c) => {
                      const done = checks.includes(c.id);
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            data-check={c.id}
                            aria-pressed={done}
                            onClick={() =>
                              setChecks((cur) =>
                                cur.includes(c.id) ? cur.filter((x) => x !== c.id) : [...cur, c.id],
                              )
                            }
                            className="hover:bg-sunken flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left transition-colors"
                          >
                            <span
                              className={cx(
                                'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors',
                                done
                                  ? 'bg-accent border-accent text-accent-fg'
                                  : 'border-sunken-deep bg-white',
                              )}
                            >
                              {done ? <Icon name="check" size={12} strokeWidth={3} /> : null}
                            </span>
                            <span
                              className={cx(
                                'min-w-0 flex-1 truncate text-[12px]',
                                done ? 'text-muted line-through' : 'text-body',
                              )}
                            >
                              {c.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid min-h-0 grid-cols-[1fr_1.1fr] gap-4">
            <Card pane="endpoint" className="min-h-0 p-4">
              <CardHead title="End location and start time" />
              <dl className="m-0 mt-3 flex min-h-0 flex-1 flex-col gap-3">
                {[
                  {
                    k: 'End location',
                    v: draft.endPlace,
                    note: draft.endAddress,
                    icon: 'pin' as const,
                  },
                  {
                    k: 'Start time',
                    v: draft.startAt,
                    note: `${stops.length} stops planned`,
                    icon: 'clock' as const,
                  },
                  {
                    k: 'Cargo',
                    v: `${num(weightOf(draft))} lbs`,
                    note: `${num(palletsOf(draft))} pallets across ${draft.loads.length} loads`,
                    icon: 'box' as const,
                  },
                ].map((d) => (
                  <div
                    key={d.k}
                    className="border-line flex items-center gap-3 rounded-[10px] border p-3"
                  >
                    <span className="bg-sunken text-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-lg">
                      <Icon name={d.icon} size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <dt className="text-muted m-0 text-[11px]">{d.k}</dt>
                      <dd className="text-ink m-0 mt-0.5 truncate text-[12.5px] font-bold">
                        {d.v}
                      </dd>
                      <dd className="text-muted m-0 truncate text-[11px]">{d.note}</dd>
                    </span>
                  </div>
                ))}
              </dl>
            </Card>

            <Card pane="note" className="min-h-0 p-4">
              <CardHead
                title="Note for the driver"
                note="Sent with the run sheet"
                action={<Icon name="note" size={16} className="text-muted" />}
              />
              <p className="bg-sunken text-body m-0 mt-3 min-h-0 flex-1 overflow-auto rounded-[10px] p-3 text-[12.5px] leading-[19px]">
                {draft.note}
              </p>
              <p className="text-muted m-0 mt-2 shrink-0 text-[11px]">
                {state === 'submitted'
                  ? 'Submitted — the driver has the run sheet.'
                  : state === 'draft'
                    ? 'Saved as a draft. Nothing has been sent.'
                    : 'Not sent yet.'}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadCard({ load, open, onToggle }: { load: Load; open: boolean; onToggle: () => void }) {
  const client = clientOf(load.clientId);
  /*
   * The call button used to be the one control on this screen that did
   * nothing. It now swaps the client's company for their number, which is in
   * the deck already — an interaction that does nothing is what ruins a take
   * (rule 5).
   */
  const [phone, setPhone] = useState(false);
  return (
    <div
      className={cx(
        'rounded-[12px] border p-3.5 transition-colors',
        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <button
        type="button"
        data-load={load.id}
        aria-expanded={open}
        onClick={onToggle}
        className="w-full text-left"
      >
        <span className="flex items-center gap-2">
          <span className="tnum text-ink text-[12.5px] font-bold">
            Cargo {load.id.toUpperCase()}
          </span>
          <span
            className="ml-auto rounded-full px-2.5 py-[3px] text-[11px] font-bold text-white"
            style={{ background: `var(${LEG_TOKEN[load.kind]})` }}
          >
            {load.kind}
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

        <span className="mt-2.5 block">
          {load.stops.map((s, i) => (
            <span key={s.at} className="flex gap-2.5">
              <span className="flex w-3 shrink-0 flex-col items-center">
                <span
                  aria-hidden="true"
                  className={cx(
                    'mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2',
                    s.done ? 'bg-accent border-accent' : 'border-sunken-deep bg-white',
                  )}
                />
                {i === 0 ? (
                  <span aria-hidden="true" className="bg-sunken-deep w-px flex-1" />
                ) : null}
              </span>
              <span className="min-w-0 flex-1 pb-2">
                <span className="text-ink block truncate text-[12px] font-semibold">{s.place}</span>
                <span className="text-muted tnum block truncate text-[11px]">
                  {s.at} · {s.address}
                </span>
              </span>
            </span>
          ))}
        </span>
      </button>

      <div className="border-line mt-1 flex items-center gap-2.5 border-t pt-2.5">
        <span className="bg-sunken text-muted grid h-7 w-7 shrink-0 place-items-center rounded-full">
          <Icon name="user" size={14} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[12px] font-semibold">{client.name}</span>
          <span className="text-muted tnum block truncate text-[10.5px]">
            {phone ? client.phone : `Client · ${client.contact}`}
          </span>
        </span>
        <IconButton
          icon="phone"
          label={phone ? `Hide ${client.name}'s number` : `Call ${client.name}`}
          name={`call-${load.id}`}
          size={30}
          tone="outline"
          active={phone}
          onClick={() => setPhone(!phone)}
        />
      </div>

      {open ? (
        <div className="border-line mt-2.5 grid grid-cols-3 gap-2 border-t pt-2.5">
          {[
            { k: 'Weight', v: `${num(load.weight)} lbs` },
            { k: 'Pallets', v: String(load.pallets) },
            { k: 'Leg', v: load.kind },
          ].map((d) => (
            <span key={d.k} className="block">
              <span className="text-muted block text-[10.5px]">{d.k}</span>
              <span className="tnum text-ink mt-0.5 block text-[12px] font-bold">{d.v}</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
