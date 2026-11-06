import { useState } from 'react';

import { Badge, Card, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  COLUMNS,
  COLUMN_DEEP,
  PEOPLE,
  TAGS,
  TASKS,
  TINTS,
  clientOf,
  hoursProgress,
  personOf,
  stepProgress,
  type Column,
  type Task,
} from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * Board — the dropped screen. Assembly only (rule 4).
 *
 * The reference's four columns are all here. What is different is that a card
 * can be moved between them, every percentage has a denominator, and the
 * checklist in the Done column is actually ticked.
 */
export function BoardPane({
  query,
  onOpenTask,
}: {
  query: string;
  onOpenTask: (id: string) => void;
}) {
  const [tag, setTag] = useState('all');
  const [mine, setMine] = useState(false);
  /** Which column each task sits in — a board you cannot move a card on is a
      picture of a board. */
  const [moved, setMoved] = useState<Record<string, Column>>({});

  const columnOf = (t: Task) => moved[t.id] ?? t.column;

  const q = query.trim().toLowerCase();
  const visible = TASKS.filter((t) => (tag === 'all' ? true : t.tags.includes(tag)))
    .filter((t) => (mine ? t.assigneeIds.includes(PEOPLE[0].id) : true))
    .filter((t) =>
      q
        ? (t.title + ' ' + t.note + ' ' + clientOf(t.clientId).name).toLowerCase().includes(q)
        : true,
    );

  const move = (t: Task, by: 1 | -1) => {
    const order = COLUMNS.map((c) => c.id);
    const i = order.indexOf(columnOf(t));
    const next = order[Math.min(order.length - 1, Math.max(0, i + by))];
    setMoved((cur) => ({ ...cur, [t.id]: next }));
  };

  return (
    <div data-pane="board" className="flex h-full flex-col">
      <PageHead
        title="Board"
        note={`${visible.length} of ${TASKS.length} tasks · four columns`}
        action={
          <>
            <Segmented
              name="scope"
              value={mine ? 'mine' : 'all'}
              options={[
                { id: 'all', label: 'Everyone' },
                { id: 'mine', label: 'Mine' },
              ]}
              onChange={(id) => setMine(id === 'mine')}
            />
            <span className="flex -space-x-2">
              {PEOPLE.slice(0, 5).map((p) => (
                <img
                  key={p.id}
                  src={p.face}
                  alt=""
                  title={p.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </span>
          </>
        }
      />

      {/* The reference's "Filters" button opens nothing. These are the tags
          its own cards carry, and they filter the board. */}
      <ul
        role="group"
        aria-label="Tag"
        data-group="tag"
        className="m-0 mb-4 flex shrink-0 list-none items-center gap-1.5 overflow-hidden p-0"
      >
        <li className="text-muted mr-1 flex shrink-0 items-center gap-1.5 text-[12px]">
          <Icon name="filter" size={14} />
          Tags
        </li>
        {['all', ...TAGS].map((t) => (
          <li key={t}>
            <button
              type="button"
              data-tag={t.replace(/[^a-z]+/g, '-')}
              aria-pressed={tag === t}
              onClick={() => setTag(tag === t ? 'all' : t)}
              className={cx(
                'border-line h-9 rounded-full border px-3.5 text-[12px] whitespace-nowrap transition-colors',
                tag === t
                  ? 'bg-accent-deep text-accent-fg border-transparent font-semibold'
                  : 'bg-surface text-body hover:bg-sunken',
              )}
            >
              {t === 'all' ? 'Everything' : t}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid min-h-0 flex-1 grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const cards = visible.filter((t) => columnOf(t) === col.id);
          return (
            <Card key={col.id} pane={col.id} className="bg-sunken min-h-0 p-4">
              <div className="flex shrink-0 items-center gap-2 pb-3">
                <span
                  aria-hidden="true"
                  style={{ background: `var(${col.token})` }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                />
                <span
                  style={{ color: `var(${COLUMN_DEEP[col.id]})` }}
                  className="truncate text-[13.5px] font-bold"
                >
                  {col.label}
                </span>
                <Badge className="ml-auto">{cards.length}</Badge>
              </div>

              <div data-scroller={`col-${col.id}`} className="scroll-region min-h-0 flex-1 pr-1">
                {cards.length ? (
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {cards.map((t) => (
                      <li key={t.id}>
                        <TaskCard
                          task={t}
                          column={col.id}
                          onOpen={() => onOpenTask(t.id)}
                          onMove={(by) => move(t, by)}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty what="task" query={query || tag} />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({
  task: t,
  column,
  onOpen,
  onMove,
}: {
  task: Task;
  column: Column;
  onOpen: () => void;
  onMove: (by: 1 | -1) => void;
}) {
  const steps = t.steps.filter((s) => s.done).length;
  return (
    <div
      style={{ background: TINTS[t.tint] }}
      className="rounded-[16px] p-3.5 transition-[filter] duration-150"
    >
      <span className="flex flex-wrap items-center gap-1.5">
        {t.tags.map((tag) => (
          <span
            key={tag}
            className="text-ink rounded-full bg-white/70 px-2 py-[2px] text-[10.5px] font-semibold"
          >
            {tag}
          </span>
        ))}
      </span>

      <button
        type="button"
        data-task={t.id}
        onClick={onOpen}
        title={`Open ${t.title}`}
        className="mt-2 block w-full text-left"
      >
        <span className="text-ink block text-[13px] leading-tight font-bold">{t.title}</span>
        {/* text-body, not text-muted: a muted grey on the lilac tint is
            4.31:1, which is the one pastel it fails on. */}
        <span className="text-body mt-1.5 block text-[11px] leading-[15px]">{t.note}</span>
      </button>

      {column === 'done' ? (
        <ul className="m-0 mt-2.5 flex list-none flex-col gap-1 p-0">
          {t.steps.map((s) => (
            <li key={s.id} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="bg-done-deep text-ink-fg grid h-4 w-4 shrink-0 place-items-center rounded-full"
              >
                <Icon name="check" size={10} strokeWidth={3} />
              </span>
              <span className="text-body min-w-0 truncate text-[10.5px]">{s.what}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="mt-2.5 block">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-body text-[10.5px]">
              {steps} of {t.steps.length} steps
            </span>
            <span className="tnum text-ink text-[10.5px] font-bold">
              {stepProgress(t).toFixed(0)}%
            </span>
          </span>
          <span className="mt-1 block">
            <Meter value={stepProgress(t)} height={5} />
          </span>
          <span className="tnum text-body mt-1 block text-[10px]">
            {t.logged}h logged of {t.budget}h · {hoursProgress(t).toFixed(0)}% of the budget
          </span>
        </span>
      )}

      <span className="mt-3 flex items-center gap-2">
        <span className="flex shrink-0 -space-x-1.5">
          {t.assigneeIds.map((id) => (
            <img
              key={id}
              src={personOf(id).face}
              alt=""
              title={personOf(id).name}
              width={22}
              height={22}
              className="h-[22px] w-[22px] rounded-full border-2 border-white object-cover"
            />
          ))}
        </span>

        <span className="tnum text-body ml-auto flex shrink-0 items-center gap-2 text-[10.5px]">
          <span className="flex items-center gap-1">
            <Icon name="comment" size={11} />
            {t.comments}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="paperclip" size={11} />
            {t.files}
          </span>
        </span>

        {/* A board whose cards cannot move is a picture of a board. */}
        <span className="flex shrink-0 items-center gap-1">
          <MoveButton
            dir="back"
            name={`back-${t.id}`}
            disabled={column === 'todo'}
            onClick={() => onMove(-1)}
          />
          <MoveButton
            dir="on"
            name={`on-${t.id}`}
            disabled={column === 'done'}
            onClick={() => onMove(1)}
          />
        </span>
      </span>
    </div>
  );
}

function MoveButton({
  dir,
  name,
  disabled,
  onClick,
}: {
  dir: 'back' | 'on';
  name: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const label = dir === 'back' ? 'Move back a column' : 'Move on a column';
  return (
    <button
      type="button"
      data-action={name}
      aria-label={label}
      title={disabled ? `${label} — already at the end` : label}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? undefined : onClick}
      className={cx(
        'text-ink grid h-7 w-7 place-items-center rounded-full bg-white/70 transition-colors',
        disabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-white',
        dir === 'back' && 'rotate-180',
      )}
    >
      <Icon name="chevron-right" size={12} strokeWidth={2.4} />
    </button>
  );
}
