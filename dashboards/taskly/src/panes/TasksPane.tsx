import { useState } from 'react';

import { AvatarStack, Badge, Card, CardHead, PriorityBadge } from '@/components/Bits';
import { Segmented, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { BoardHeader } from '@/features/BoardHeader';
import { COLUMNS, TASKS, type ColumnId, type Task } from '@/data/deck';
import { cx } from '@/lib/cx';

type ColFilter = 'all' | ColumnId;
type SortId = 'due' | 'priority' | 'progress';

const COL_FILTERS: { id: ColFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...COLUMNS.map((c) => ({ id: c.id as ColFilter, label: c.label })),
];

const SORTS: { id: SortId; label: string }[] = [
  { id: 'due', label: 'By due date' },
  { id: 'priority', label: 'By priority' },
  { id: 'progress', label: 'By progress' },
];

const RANK: Record<string, number> = { Urgent: 0, Normal: 1, 'Low Priority': 2 };
const COLS = 'grid-cols-[minmax(0,1fr)_132px_124px_132px_120px]';

/**
 * Task Overview: every column at once, which is the thing the board on the
 * dashboard cannot show. Assembly plus one table.
 */
export function TasksPane({ projectId, query }: { projectId: string; query: string }) {
  const [col, setCol] = useState<ColFilter>('all');
  const [sort, setSort] = useState<SortId>('due');
  const [selected, setSelected] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const rows = TASKS.filter((t) => t.projectId === projectId)
    .filter((t) => (col === 'all' ? true : t.column === col))
    .filter((t) =>
      q ? (t.title + ' ' + t.summary + ' ' + t.priority).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'priority') return RANK[a.priority] - RANK[b.priority];
      if (sort === 'progress') return b.checks[0] / b.checks[1] - a.checks[0] / a.checks[1];
      return a.due.localeCompare(b.due);
    });

  const open = rows.filter((t) => t.column !== 'done').length;

  return (
    <div data-pane="tasks" className="flex h-full flex-col gap-4">
      <BoardHeader projectId={projectId} onAdd={() => {}} />

      <Card pane="task-table" className="min-h-0 flex-1 p-5 pr-3">
        <CardHead
          title={
            <>
              All tasks{' '}
              <span className="text-muted ml-1 text-[14px] font-semibold">{rows.length}</span>
            </>
          }
          icon="tasks"
          className="pr-2"
          action={
            <>
              <Segmented name="Column" value={col} options={COL_FILTERS} onChange={setCol} />
              <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
            </>
          }
        />

        <div
          className={cx(
            'border-line text-muted mt-4 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11px] font-extrabold tracking-[0.05em] whitespace-nowrap uppercase',
            COLS,
          )}
        >
          <span>Task</span>
          <span>Column</span>
          <span>Priority</span>
          <span>Progress</span>
          <span>People</span>
        </div>

        <div data-scroller="tasks" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
          {rows.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <p className="text-muted m-0 text-[13px]">
                Nothing matches <span className="text-ink font-bold">{query || col}</span>.
              </p>
            </div>
          ) : (
            <ul className="m-0 list-none p-0">
              {rows.map((task) => (
                <li key={task.id}>
                  <Row
                    task={task}
                    selected={selected === task.id}
                    onSelect={() => setSelected((cur) => (cur === task.id ? null : task.id))}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
          <span>
            {rows.length} of {TASKS.filter((t) => t.projectId === projectId).length} tasks
          </span>
          <span>{open} still open</span>
        </div>
      </Card>
    </div>
  );
}

function Row({
  task,
  selected,
  onSelect,
}: {
  task: Task;
  selected: boolean;
  onSelect: () => void;
}) {
  const pct = Math.round((task.checks[0] / task.checks[1]) * 100);
  const columnLabel = COLUMNS.find((c) => c.id === task.column)?.label ?? '';

  return (
    <div className={cx('border-line border-b', selected && 'bg-sunken/60')}>
      <button
        type="button"
        data-row={task.id}
        onClick={onSelect}
        aria-expanded={selected}
        className={cx('grid w-full items-center gap-3 py-3 pr-3 text-left transition-colors', COLS)}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon
            name="chevron-right"
            size={14}
            className={cx('text-muted shrink-0 transition-transform', selected && 'rotate-90')}
          />
          <span className="text-ink min-w-0 truncate text-[13.5px] font-bold">{task.title}</span>
        </span>
        <span>
          <Badge tone={task.column === 'done' ? 'positive' : 'quiet'}>{columnLabel}</Badge>
        </span>
        <span>
          <PriorityBadge priority={task.priority} />
        </span>
        <span className="flex items-center gap-2">
          <span className="bg-sunken-deep h-1.5 flex-1 overflow-hidden rounded-full">
            <span
              style={{ width: pct + '%' }}
              className={cx(
                'block h-full rounded-full transition-[width] duration-500',
                pct === 100 ? 'bg-positive' : 'bg-accent',
              )}
            />
          </span>
          <span className="text-muted w-9 shrink-0 text-right text-[11.5px] tabular-nums">
            {pct}%
          </span>
        </span>
        <span>
          <AvatarStack faces={task.assignees} extra={task.extra} size={24} />
        </span>
      </button>

      {selected ? (
        <div data-detail={task.id} className="pr-3 pb-3.5 pl-9">
          <p className="text-body m-0 text-[12.5px] leading-[1.55]">{task.summary}</p>
          <p className="text-muted m-0 mt-2 flex items-center gap-3 text-[11.5px]">
            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={12} />
              {task.due}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="comment" size={12} />
              {task.comments} comments
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="link" size={12} />
              {task.links} links
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
