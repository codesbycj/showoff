import { useState } from 'react';

import { AvatarStack, Badge, Count, PriorityBadge } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { COLUMNS, countFor, tasksFor, type ColumnId, type Task } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * The board: four column tabs, and the selected column's cards.
 *
 * The reference shows one column open with two cards in it, so the tabs are a
 * real selector here — every column has its own tasks, its own count and its
 * own empty state. Adding a card is the one thing the board cannot do, and the
 * "+" says so rather than pretending: see the note on the control.
 */
export function TaskBoard({ projectId, query }: { projectId: string; query: string }) {
  const [column, setColumn] = useState<ColumnId>('todo');

  const q = query.trim().toLowerCase();
  const all = tasksFor(projectId, column);
  const tasks = q
    ? all.filter((t) => (t.title + ' ' + t.summary + ' ' + t.priority).toLowerCase().includes(q))
    : all;

  return (
    <div data-card="board" className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div
        role="tablist"
        aria-label="Board columns"
        className="flex shrink-0 flex-wrap items-center gap-2"
      >
        {COLUMNS.map((col) => {
          const on = column === col.id;
          return (
            <div key={col.id} className="flex items-center">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                data-column={col.id}
                onClick={() => setColumn(col.id)}
                className={cx(
                  'flex h-10 items-center gap-2 rounded-full px-4 text-[13px] transition-colors',
                  on
                    ? 'bg-fill text-fill-fg font-bold'
                    : 'border-line text-body hover:bg-sunken hover:text-ink border font-semibold',
                )}
              >
                {col.label}
                <Count value={countFor(projectId, col.id)} tone={on ? 'fill' : 'quiet'} />
              </button>
              <IconButton
                icon="plus"
                label={'Add a card to ' + col.label}
                size={32}
                className="ml-1"
              />
            </div>
          );
        })}
      </div>

      <div data-scroller="board" className="scroll-region mt-4 -mr-2 min-h-0 flex-1 pr-2">
        {tasks.length === 0 ? (
          <div className="border-line grid h-full place-items-center rounded-[var(--radius-card)] border border-dashed px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              {q ? (
                <>
                  Nothing in this column matches <span className="text-ink font-bold">{query}</span>
                  .
                </>
              ) : (
                <>Nothing in this column yet.</>
              )}
            </p>
          </div>
        ) : (
          <ul className="m-0 grid h-full list-none auto-rows-fr grid-cols-2 gap-4 p-0">
            {tasks.map((task) => (
              <li key={task.id} className="min-h-0">
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(task.checks[0]);

  return (
    <article
      data-task={task.id}
      className="border-line bg-surface flex h-full flex-col rounded-[var(--radius-card)] border p-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <PriorityBadge priority={task.priority} />
          <Badge tone="pink" icon={<Icon name="clock" size={11} />}>
            {task.due}
          </Badge>
        </div>
        <IconButton
          icon="dots"
          label={'Actions for ' + task.title}
          size={30}
          onClick={() => setOpen((v) => !v)}
          active={open}
        />
      </div>

      <h3 className="text-ink m-0 mt-3 text-[19px] leading-tight font-extrabold tracking-[-0.02em]">
        {task.title}
      </h3>
      <p className="text-muted m-0 mt-1.5 text-[12.5px] leading-[1.5]">{task.summary}</p>

      {open ? (
        <div
          data-task-actions={task.id}
          className="bg-sunken mt-3 flex flex-wrap gap-1.5 rounded-2xl p-2"
        >
          {['Rename', 'Move column', 'Duplicate'].map((label) => (
            <span
              key={label}
              className="text-body rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto pt-4">
        <AvatarStack faces={task.assignees} extra={task.extra} size={28} />
      </div>

      <div className="border-line text-muted mt-4 flex items-center gap-4 border-t pt-3 text-[12px]">
        <span className="flex items-center gap-1.5">
          <Icon name="comment" size={14} />
          {task.comments}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="link" size={14} />
          {task.links}
        </span>
        <button
          type="button"
          data-check={task.id}
          onClick={() => setDone((d) => (d >= task.checks[1] ? 0 : d + 1))}
          aria-label={'Tick off a checklist item on ' + task.title}
          className={cx(
            'ml-auto flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-semibold transition-colors',
            done >= task.checks[1] ? 'text-positive' : 'text-muted hover:text-ink',
          )}
        >
          <Icon name="checklist" size={14} />
          {done}/{task.checks[1]}
        </button>
      </div>
    </article>
  );
}
