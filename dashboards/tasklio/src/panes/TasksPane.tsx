import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  COLUMNS,
  COLUMN_DEEP,
  TASKS,
  TINTS,
  clientOf,
  hoursBudgeted,
  hoursLogged,
  hoursProgress,
  openTasks,
  overdue,
  personOf,
  stepProgress,
  type Column,
  type Task,
} from '@/data/deck';
import { cx } from '@/lib/cx';

type SortKey = 'due' | 'budget' | 'progress' | 'title';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'due', label: 'Due first' },
  { id: 'progress', label: 'Furthest along' },
  { id: 'budget', label: 'Biggest' },
  { id: 'title', label: 'By name' },
];

/**
 * All tasks — one list, with one open. Assembly only (rule 4).
 *
 * A board answers "what is in flight"; it cannot answer "what is due this
 * week" or "what has run over its budget", because those cut across the
 * columns. The reference has no list view at all.
 */
export function TasksPane({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [column, setColumn] = useState<'all' | Column>('all');
  const [sort, setSort] = useState<SortKey>('due');

  const q = query.trim().toLowerCase();
  const rows = TASKS.filter((t) => (column === 'all' ? true : t.column === column))
    .filter((t) =>
      q
        ? (t.title + ' ' + t.note + ' ' + clientOf(t.clientId).name).toLowerCase().includes(q)
        : true,
    )
    .slice()
    .sort((a, b) =>
      sort === 'budget'
        ? b.budget - a.budget
        : sort === 'progress'
          ? stepProgress(b) - stepProgress(a)
          : sort === 'title'
            ? a.title.localeCompare(b.title)
            : a.due.localeCompare(b.due),
    );

  const current = rows.find((t) => t.id === selected) ?? rows[0] ?? null;

  return (
    <div data-pane="tasks" className="flex h-full flex-col">
      <PageHead
        title="All tasks"
        note={`${openTasks()} open of ${TASKS.length} · ${hoursLogged()}h logged of ${hoursBudgeted()}h budgeted`}
        action={
          <>
            <Segmented
              name="column"
              value={column}
              options={[
                { id: 'all', label: 'Every column' },
                ...COLUMNS.map((c) => ({ id: c.id, label: c.label })),
              ]}
              onChange={(id) => setColumn(id as 'all' | Column)}
            />
            <Segmented
              name="sort"
              value={sort}
              options={SORTS}
              onChange={(id) => setSort(id as SortKey)}
            />
          </>
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <Stat k="Open" v={String(openTasks())} note={`of ${TASKS.length} on the board`} />
        <Stat
          k="Overdue"
          v={String(overdue())}
          note="past their date, not done"
          tone={overdue() ? 'danger' : undefined}
        />
        <Stat k="Logged" v={`${hoursLogged()}h`} note={`of ${hoursBudgeted()}h budgeted`} />
        <Stat
          k="Over budget"
          v={String(TASKS.filter((t) => t.logged > t.budget).length)}
          note="more hours spent than planned"
        />
      </ul>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_360px] gap-4">
        <Card pane="list" className="min-h-0 p-5">
          <CardHead
            title={column === 'all' ? 'Everything' : COLUMNS.find((c) => c.id === column)?.label}
            note="Open one for its steps and its people"
            action={
              <Badge>
                {rows.length} of {TASKS.length}
              </Badge>
            }
          />
          <div data-scroller="list" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {rows.map((t) => (
                  <li key={t.id}>
                    <Row task={t} active={current?.id === t.id} onSelect={() => onSelect(t.id)} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="task" query={query || column} />
            )}
          </div>
        </Card>

        <Card pane="detail" className="min-h-0 p-5">
          {current ? <Detail task={current} /> : <Empty what="task" query={query} />}
        </Card>
      </div>
    </div>
  );
}

function Stat({ k, v, note, tone }: { k: string; v: string; note: string; tone?: 'danger' }) {
  return (
    <li className="border-line bg-surface rounded-[var(--radius-card)] border p-4 shadow-[var(--shadow-card)]">
      <span className="text-muted block text-[12px]">{k}</span>
      <span
        className={cx(
          'tnum mt-1.5 block text-[24px] leading-none font-bold tracking-[-0.03em]',
          tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {v}
      </span>
      <span className="text-muted mt-1.5 block truncate text-[11px]">{note}</span>
    </li>
  );
}

function Row({ task: t, active, onSelect }: { task: Task; active: boolean; onSelect: () => void }) {
  const col = COLUMNS.find((c) => c.id === t.column);
  return (
    <button
      type="button"
      data-task={t.id}
      aria-pressed={active}
      onClick={onSelect}
      className={cx(
        'flex w-full items-center gap-3 rounded-[14px] border px-3.5 py-2.5 text-left transition-colors',
        active ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span
        aria-hidden="true"
        style={{ background: TINTS[t.tint] }}
        className="h-9 w-1.5 shrink-0 rounded-full"
      />
      <span className="min-w-0 flex-1">
        <span className="text-ink block truncate text-[12.5px] font-bold">{t.title}</span>
        <span className="text-muted block truncate text-[11px]">
          {clientOf(t.clientId).name} · due {t.due}
        </span>
      </span>

      <span
        style={{ color: `var(${COLUMN_DEEP[t.column]})` }}
        className="w-[86px] shrink-0 text-[11px] font-semibold"
      >
        {col?.label}
      </span>

      <span className="w-[108px] shrink-0">
        <Meter value={stepProgress(t)} height={5} />
        <span className="tnum text-muted mt-1 block text-[10px]">
          {t.steps.filter((s) => s.done).length} of {t.steps.length} steps
        </span>
      </span>

      <span
        className={cx(
          'tnum w-[84px] shrink-0 text-right text-[11.5px]',
          t.logged > t.budget ? 'text-danger font-semibold' : 'text-muted',
        )}
      >
        {t.logged}h of {t.budget}h
      </span>

      <span className="flex shrink-0 -space-x-1.5">
        {t.assigneeIds.map((id) => (
          <img
            key={id}
            src={personOf(id).face}
            alt=""
            title={personOf(id).name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full border-2 border-white object-cover"
          />
        ))}
      </span>
    </button>
  );
}

function Detail({ task: t }: { task: Task }) {
  const client = clientOf(t.clientId);
  const col = COLUMNS.find((c) => c.id === t.column);
  return (
    <>
      <div style={{ background: TINTS[t.tint] }} className="shrink-0 rounded-[16px] p-4">
        <span className="flex flex-wrap items-center gap-1.5">
          {t.tags.map((tag) => (
            <span
              key={tag}
              className="text-ink rounded-full bg-white/70 px-2 py-[2px] text-[10.5px] font-semibold"
            >
              {tag}
            </span>
          ))}
          <span
            style={{ color: `var(${COLUMN_DEEP[t.column]})` }}
            className="ml-auto shrink-0 rounded-full bg-white/70 px-2.5 py-[2px] text-[10.5px] font-bold"
          >
            {col?.label}
          </span>
        </span>
        <span className="text-ink mt-2.5 block text-[16px] leading-tight font-bold">{t.title}</span>
        <span className="text-body mt-1.5 block text-[12px] leading-[16px]">{t.note}</span>
      </div>

      <dl className="border-line m-0 mt-4 grid shrink-0 grid-cols-3 gap-3 border-b pb-4">
        <div>
          <dt className="text-muted m-0 text-[11px]">Client</dt>
          <dd className="text-ink m-0 mt-1 truncate text-[13px] font-bold">{client.name}</dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Due</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[13px] font-bold">{t.due}</dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Hours</dt>
          <dd
            className={cx(
              'tnum m-0 mt-1 text-[13px] font-bold',
              t.logged > t.budget ? 'text-danger' : 'text-ink',
            )}
          >
            {t.logged} of {t.budget}
          </dd>
        </div>
      </dl>

      <div className="mt-4 shrink-0">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-muted text-[11px]">Budget used</span>
          <span className="tnum text-ink text-[12px] font-bold">
            {hoursProgress(t).toFixed(0)}%
          </span>
        </span>
        <span className="mt-1.5 block">
          <Meter value={hoursProgress(t)} height={7} />
        </span>
      </div>

      <div data-scroller="steps" className="scroll-region mt-4 min-h-0 flex-1 pr-1">
        <span className="text-muted block text-[11px]">
          Steps · {t.steps.filter((s) => s.done).length} of {t.steps.length}
        </span>
        <ol className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
          {t.steps.map((s) => (
            <li
              key={s.id}
              className="border-line flex items-center gap-2.5 rounded-[12px] border px-3 py-2"
            >
              <span
                className={cx(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-full',
                  s.done ? 'bg-positive-soft text-positive' : 'border-sunken-deep border',
                )}
              >
                {s.done ? <Icon name="check" size={12} strokeWidth={2.6} /> : null}
              </span>
              <span
                className={cx(
                  'min-w-0 flex-1 truncate text-[12px]',
                  s.done ? 'text-muted line-through' : 'text-ink font-semibold',
                )}
              >
                {s.what}
              </span>
            </li>
          ))}
        </ol>

        <span className="text-muted mt-4 block text-[11px]">On it</span>
        <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
          {t.assigneeIds.map((id) => {
            const who = personOf(id);
            return (
              <li
                key={id}
                className="border-line flex items-center gap-2.5 rounded-[12px] border px-3 py-2"
              >
                <img
                  src={who.face}
                  alt=""
                  width={26}
                  height={26}
                  className="bg-sunken h-[26px] w-[26px] shrink-0 rounded-full object-cover"
                />
                <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                  {who.name}
                </span>
                <span className="text-muted shrink-0 text-[11px]">{who.role}</span>
              </li>
            );
          })}
        </ul>

        <span className="tnum text-muted mt-4 flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Icon name="comment" size={12} />
            {t.comments} comments
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="paperclip" size={12} />
            {t.files} files
          </span>
        </span>
      </div>
    </>
  );
}
