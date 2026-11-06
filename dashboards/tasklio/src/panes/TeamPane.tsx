import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  CLIENTS,
  COLUMNS,
  COLUMN_DEEP,
  PEOPLE,
  TASKS,
  TINTS,
  clientOf,
  loadOf,
  loadPercent,
  personOf,
  stepProgress,
  tasksOf,
  type Person,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const LENSES = [
  { id: 'load', label: 'Most loaded' },
  { id: 'open', label: 'Most open tasks' },
  { id: 'name', label: 'By name' },
];

/**
 * Team — who is holding what. Assembly only (rule 4).
 *
 * The reference's sidebar promises a Team destination and never shows it, and
 * the five avatars above its board say nothing about who is doing what. A
 * studio lead opens this to answer one question: can anyone take another job.
 */
export function TeamPane({
  query,
  onOpenTask,
}: {
  query: string;
  onOpenTask: (id: string) => void;
}) {
  const [lens, setLens] = useState('load');
  const [open, setOpen] = useState<string | null>('u2');

  const q = query.trim().toLowerCase();
  const rows = PEOPLE.filter((p) => (q ? (p.name + ' ' + p.role).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      lens === 'name'
        ? a.name.localeCompare(b.name)
        : lens === 'open'
          ? tasksOf(b.id).filter((t) => t.column !== 'done').length -
            tasksOf(a.id).filter((t) => t.column !== 'done').length
          : loadPercent(b.id) - loadPercent(a.id),
    );

  const rostered = PEOPLE.reduce((h, p) => h + p.capacity, 0);
  const taken = PEOPLE.reduce((h, p) => h + loadOf(p.id), 0);

  return (
    <div data-pane="team" className="flex h-full flex-col">
      <PageHead
        title="Team"
        note={`${PEOPLE.length} people · ${taken.toFixed(0)}h of ${rostered}h rostered this week`}
        action={
          <Segmented name="lens" value={lens} options={LENSES} onChange={(id) => setLens(id)} />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <Stat k="Hours rostered" v={`${rostered}h`} note={`${PEOPLE.length} people`} />
        <Stat k="Hours taken" v={`${taken.toFixed(0)}h`} note="by everything not done" />
        <Stat
          k="Spare"
          v={`${(rostered - taken).toFixed(0)}h`}
          note="before the studio is full"
          tone={rostered - taken < 8 ? 'danger' : 'positive'}
        />
        <Stat k="Clients" v={String(CLIENTS.length)} note="with work on the board" />
      </ul>

      <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-4">
        <Card pane="board" className="min-h-0 p-5">
          <CardHead
            title="Who is holding what"
            note="Open a row for their tasks"
            action={
              <Badge>
                {rows.length} of {PEOPLE.length}
              </Badge>
            }
          />
          <div data-scroller="people" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((p) => (
                  <li key={p.id}>
                    <PersonRow
                      person={p}
                      open={open === p.id}
                      onToggle={() => setOpen(open === p.id ? null : p.id)}
                      onOpenTask={onOpenTask}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="person" query={query} />
            )}
          </div>
        </Card>

        <Card pane="clients" className="min-h-0 p-5">
          <CardHead title="Clients" note="Tasks on the board, by column" />
          <div data-scroller="clients" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            <ul className="m-0 flex h-full list-none flex-col justify-between gap-2 p-0">
              {CLIENTS.map((c) => {
                const mine = TASKS.filter((t) => t.clientId === c.id);
                return (
                  <li key={c.id}>
                    <span className="border-line block rounded-[14px] border p-3.5">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          style={{ background: TINTS[c.tint] }}
                          className="h-9 w-9 shrink-0 rounded-[12px]"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[12.5px] font-bold">
                            {c.name}
                          </span>
                          <span className="tnum text-muted block truncate text-[11px]">
                            {mine.length} {mine.length === 1 ? 'task' : 'tasks'} ·{' '}
                            {mine.reduce((h, t) => h + t.budget, 0)}h budgeted
                          </span>
                        </span>
                      </span>
                      {/* One bar per client, split by column — the share of
                          their work that has not shipped yet. */}
                      <span className="mt-2.5 flex gap-1">
                        {COLUMNS.map((col) => {
                          const n = mine.filter((t) => t.column === col.id).length;
                          return n ? (
                            <span
                              key={col.id}
                              title={`${n} in ${col.label}`}
                              style={{ background: `var(${col.token})`, flexGrow: n }}
                              className="h-2 rounded-full"
                            />
                          ) : null;
                        })}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  k,
  v,
  note,
  tone,
}: {
  k: string;
  v: string;
  note: string;
  tone?: 'positive' | 'danger';
}) {
  return (
    <li className="border-line bg-surface rounded-[var(--radius-card)] border p-4 shadow-[var(--shadow-card)]">
      <span className="text-muted block text-[12px]">{k}</span>
      <span
        className={cx(
          'tnum mt-1.5 block text-[24px] leading-none font-bold tracking-[-0.03em]',
          tone === 'positive' ? 'text-positive' : tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {v}
      </span>
      <span className="text-muted mt-1.5 block truncate text-[11px]">{note}</span>
    </li>
  );
}

function PersonRow({
  person: p,
  open,
  onToggle,
  onOpenTask,
}: {
  person: Person;
  open: boolean;
  onToggle: () => void;
  onOpenTask: (id: string) => void;
}) {
  const mine = tasksOf(p.id);
  const live = mine.filter((t) => t.column !== 'done');
  const pct = loadPercent(p.id);
  const over = pct > 100;

  return (
    <div
      className={cx(
        'rounded-[16px] border transition-colors',
        open ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <button
        type="button"
        data-person={p.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <img
          src={p.face}
          alt=""
          width={38}
          height={38}
          className="bg-sunken h-[38px] w-[38px] shrink-0 rounded-full object-cover"
        />
        <span className="w-[170px] shrink-0">
          <span className="text-ink block truncate text-[13px] font-bold">{p.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{p.role}</span>
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="tnum text-muted text-[11px]">
              {loadOf(p.id).toFixed(1)}h of {p.capacity}h · {live.length} open
            </span>
            <span className={cx('tnum text-[11.5px] font-bold', over ? 'text-danger' : 'text-ink')}>
              {pct.toFixed(0)}%
            </span>
          </span>
          <span className="mt-1.5 block">
            <Meter value={Math.min(100, pct)} height={7} tone={over ? 'over' : 'accent'} />
          </span>
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
      </button>

      {open ? (
        <div className="border-line border-t px-4 py-3">
          {mine.length ? (
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
              {mine.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    data-assigned={t.id}
                    onClick={() => onOpenTask(t.id)}
                    title={`Open ${t.title}`}
                    className="border-line w-full rounded-[12px] border bg-white px-3 py-2 text-left transition-colors hover:border-[var(--color-accent-soft)]"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        style={{ background: TINTS[t.tint] }}
                        className="h-2 w-2 shrink-0 rounded-full"
                      />
                      <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                        {t.title}
                      </span>
                      <span
                        style={{ color: `var(${COLUMN_DEEP[t.column]})` }}
                        className="shrink-0 text-[10.5px] font-semibold"
                      >
                        {COLUMNS.find((c) => c.id === t.column)?.label}
                      </span>
                    </span>
                    <span className="mt-1.5 flex items-center gap-2">
                      <span className="min-w-0 flex-1">
                        <Meter value={stepProgress(t)} height={4} />
                      </span>
                      <span className="tnum text-muted shrink-0 text-[10px]">
                        {clientOf(t.clientId).name}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted m-0 py-2 text-[12px]">
              Nothing assigned. {p.name.split(' ')[0]} is free this week.
            </p>
          )}
          <p className="text-muted m-0 mt-2.5 text-[11.5px]">
            {personOf(p.id).email} · {mine.length - live.length} finished this week
          </p>
        </div>
      ) : null}
    </div>
  );
}
