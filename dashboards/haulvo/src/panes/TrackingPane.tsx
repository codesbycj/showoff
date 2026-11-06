import { useState } from 'react';

import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { SearchBox, Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  LEG_TOKEN,
  SHIPMENTS,
  STATE_TONE,
  clientOf,
  driverOf,
  progressOf,
  stopsOf,
  truckOf,
  weightOf,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

const LENSES = [
  { id: 'all', label: 'All runs' },
  { id: 'moving', label: 'On the road' },
  { id: 'booked', label: 'Booked' },
];

/**
 * Tracking. Assembly only (rule 4).
 *
 * Where each shipment has got to, as a share of its stops done — and the one
 * screen in this build that answers "will it be late": the next stop's time
 * against now.
 */
export function TrackingPane() {
  const [lens, setLens] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('sh2');

  const q = query.trim().toLowerCase();
  const rows = SHIPMENTS.filter((s) =>
    lens === 'moving' ? s.state === 'in transit' : lens === 'booked' ? s.state === 'booked' : true,
  ).filter((s) =>
    q
      ? (s.reference + ' ' + driverOf(s.driverId).name + ' ' + s.endPlace).toLowerCase().includes(q)
      : true,
  );

  const current = rows.find((s) => s.id === selected) ?? rows[0] ?? null;
  const stops = current ? stopsOf(current) : [];
  const next = stops.find((s) => !s.done);

  return (
    <div data-pane="tracking" className="flex h-full flex-col">
      <PageHead
        title="Tracking"
        note={`${SHIPMENTS.filter((s) => s.state === 'in transit').length} on the road · ${SHIPMENTS.filter((s) => s.state === 'booked').length} booked`}
        action={
          <Segmented name="lens" value={lens} options={LENSES} onChange={(id) => setLens(id)} />
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.35fr] gap-4">
        <Card pane="list" className="min-h-0 p-4">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search shipments"
            name="tracking"
            className="shrink-0"
          />
          <div data-scroller="tracking" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      data-row={s.id}
                      aria-pressed={current?.id === s.id}
                      onClick={() => setSelected(s.id)}
                      className={cx(
                        'w-full rounded-[12px] border p-3 text-left transition-colors',
                        current?.id === s.id
                          ? 'border-accent bg-accent-faint'
                          : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <Avatar
                          src={driverOf(s.driverId).face}
                          name={driverOf(s.driverId).name}
                          size={30}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[12.5px] font-bold">
                            {s.reference}
                          </span>
                          <span className="text-muted block truncate text-[11px]">
                            {driverOf(s.driverId).name} · {truckOf(s.truckId).model}
                          </span>
                          <span className="text-muted tnum block truncate text-[11px]">
                            ends {s.endPlace} · {num(weightOf(s))} lbs
                          </span>
                        </span>
                        <Badge tone={STATE_TONE[s.state]}>{s.state}</Badge>
                      </span>
                      <span className="mt-2.5 block">
                        <Meter value={progressOf(s)} height={6} />
                        <span className="tnum text-muted mt-1 block text-[10.5px]">
                          {stopsOf(s).filter((x) => x.done).length} of {stopsOf(s).length} stops
                          done
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="shipment" query={query || lens} />
            )}
          </div>
        </Card>

        <Card pane="detail" className="min-h-0 p-5">
          {current ? (
            <>
              <CardHead
                title={current.reference}
                note={`${truckOf(current.truckId).model} · ${num(weightOf(current))} lbs · ends ${current.endPlace}`}
                action={<Badge tone={STATE_TONE[current.state]}>{current.state}</Badge>}
              />

              <div className="border-line mt-4 grid shrink-0 grid-cols-3 gap-3 border-b pb-4">
                {[
                  { k: 'Progress', v: `${progressOf(current).toFixed(0)}%` },
                  { k: 'Next stop', v: next ? next.place : 'Delivered' },
                  { k: 'Due', v: next ? next.at.slice(5) : '—' },
                ].map((d) => (
                  <div key={d.k}>
                    <span className="text-muted block text-[11px]">{d.k}</span>
                    <span className="tnum text-ink mt-1 block truncate text-[14px] font-bold">
                      {d.v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-line mt-3 flex shrink-0 items-center gap-2.5 rounded-[12px] border p-3">
                <Avatar
                  src={driverOf(current.driverId).face}
                  name={driverOf(current.driverId).name}
                  size={34}
                />
                <span className="min-w-0 flex-1">
                  <span className="text-ink block truncate text-[12.5px] font-bold">
                    {driverOf(current.driverId).name}
                  </span>
                  <span className="text-muted tnum block truncate text-[11px]">
                    {driverOf(current.driverId).licence} · {driverOf(current.driverId).phone}
                  </span>
                </span>
                <span className="tnum text-muted shrink-0 text-[11.5px]">
                  {truckOf(current.truckId).number} · {truckOf(current.truckId).trailer}
                </span>
              </div>

              <div data-scroller="stops" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
                <ol className="m-0 flex h-full list-none flex-col p-0">
                  {stops.map((s, i) => (
                    <li
                      key={s.at + s.place}
                      className={cx(
                        'flex shrink-0 gap-3',
                        i < stops.length - 1 && 'max-h-[128px] grow',
                      )}
                    >
                      <span className="flex w-6 shrink-0 flex-col items-center">
                        <span
                          className={cx(
                            'tnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold',
                            s.done
                              ? 'bg-accent text-accent-fg'
                              : next && s.at === next.at
                                ? 'border-accent text-accent-deep border-2 bg-white'
                                : 'border-sunken-deep text-muted border bg-white',
                          )}
                        >
                          {i + 1}
                        </span>
                        {i < stops.length - 1 ? (
                          <span aria-hidden="true" className="bg-sunken-deep w-px flex-1" />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1 pb-4">
                        <span className="text-ink block truncate text-[13px] font-semibold">
                          {s.place}
                        </span>
                        <span className="text-muted tnum block truncate text-[11.5px]">
                          {s.at} · {s.address}
                        </span>
                        <span
                          className={cx(
                            'mt-1 flex items-center gap-1.5 text-[11px] font-semibold',
                            s.done
                              ? 'text-positive'
                              : next && s.at === next.at
                                ? 'text-accent-deep'
                                : 'text-muted',
                          )}
                        >
                          <Icon name={s.done ? 'check' : 'clock'} size={12} />
                          {s.done
                            ? 'Arrived'
                            : next && s.at === next.at
                              ? 'Next stop'
                              : 'Scheduled'}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-line mt-2 shrink-0 border-t pt-3">
                <span className="text-muted block text-[11px]">
                  On the truck · {current.loads.length}{' '}
                  {current.loads.length === 1 ? 'load' : 'loads'}
                </span>
                <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
                  {current.loads.map((l) => (
                    <li
                      key={l.id}
                      className="border-line flex items-center gap-2.5 rounded-[10px] border px-3 py-2"
                    >
                      <span
                        aria-hidden="true"
                        style={{ background: `var(${LEG_TOKEN[l.kind]})` }}
                        className="h-2 w-2 shrink-0 rounded-full"
                      />
                      <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                        {clientOf(l.clientId).contact}
                      </span>
                      <span className="text-muted shrink-0 text-[11.5px]">{l.kind}</span>
                      <span className="tnum text-ink w-[82px] shrink-0 text-right text-[12px] font-bold">
                        {num(l.weight)} lbs
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="grid min-h-0 flex-1 place-items-center">
              <Empty what="shipment" query={lens} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
