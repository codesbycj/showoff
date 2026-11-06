import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  TASKS,
  TASK_STATES,
  TASK_TONE,
  asHours,
  countTasks,
  courseOf,
  instructorOf,
  loggedMinutes,
  taskProgress,
  type Task,
  type Track,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { TRACK_ICON } from '@/lib/tracks';

/**
 * Tasks — the board, in three columns. Assembly only (rule 4).
 *
 * The reference's Tasks Board is a single column headed by an "In Progress"
 * dropdown that never opens, and each card logs hours against a date range
 * with no budget to log them against. Here the state is the column, and every
 * card states what it is working towards.
 */
export function TasksPane({ query, track }: { query: string; track: string }) {
  const [open, setOpen] = useState<string | null>('t1');
  const [lens, setLens] = useState<'board' | 'list'>('board');

  const q = query.trim().toLowerCase();
  const rows = TASKS.filter((t) => (track === 'all' ? true : t.track === (track as Track))).filter(
    (t) => (q ? (t.title + ' ' + t.body + ' ' + t.track).toLowerCase().includes(q) : true),
  );

  const budget = TASKS.reduce((t, x) => t + x.budget, 0);

  return (
    <div data-pane="tasks" className="flex h-full flex-col">
      <PageHead
        title="Tasks board"
        note={`${rows.length} of ${TASKS.length} · ${asHours(loggedMinutes() * 60)} logged of ${asHours(budget * 60)} budgeted`}
        action={
          <Segmented
            name="lens"
            value={lens}
            options={[
              { id: 'board', label: 'Board' },
              { id: 'list', label: 'One list' },
            ]}
            onChange={(id) => setLens(id as 'board' | 'list')}
          />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <Stat
          k="Logged"
          v={asHours(loggedMinutes() * 60)}
          note={`of ${asHours(budget * 60)} budgeted`}
        />
        <Stat k="To do" v={String(countTasks('to do'))} note="not started yet" />
        <Stat k="In progress" v={String(countTasks('in progress'))} note="open right now" />
        <Stat k="Done" v={String(countTasks('done'))} note="this month" />
      </ul>

      {lens === 'board' ? (
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
          {TASK_STATES.map((state) => {
            const column = rows.filter((t) => t.state === state);
            return (
              <Card key={state} pane={state.replace(' ', '-')} className="min-h-0 p-5">
                <CardHead
                  title={state[0].toUpperCase() + state.slice(1)}
                  note={`${asHours(column.reduce((t, x) => t + x.logged, 0) * 60)} logged`}
                  action={<Badge tone={TASK_TONE[state]}>{column.length}</Badge>}
                />
                <div
                  data-scroller={`col-${state.replace(' ', '-')}`}
                  className="scroll-region mt-3 min-h-0 flex-1 pr-1"
                >
                  {column.length ? (
                    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                      {column.map((t) => (
                        <li key={t.id}>
                          <TaskCard
                            task={t}
                            open={open === t.id}
                            onToggle={() => setOpen(open === t.id ? null : t.id)}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted m-0 py-4 text-[12px]">
                      Nothing {state === 'done' ? 'finished' : state} in this filter.
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card pane="list" className="min-h-0 flex-1 p-5">
          <CardHead
            title="Everything, in order of what is due first"
            note="The same tasks, one column"
            action={
              <Badge>
                {rows.length} of {TASKS.length}
              </Badge>
            }
          />
          <div data-scroller="list" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {rows
                  .slice()
                  .sort((a, b) => a.to.localeCompare(b.to))
                  .map((t) => (
                    <li key={t.id}>
                      <TaskCard
                        task={t}
                        open={open === t.id}
                        onToggle={() => setOpen(open === t.id ? null : t.id)}
                        wide
                      />
                    </li>
                  ))}
              </ul>
            ) : (
              <Empty what="task" query={query || track} />
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

function Stat({ k, v, note }: { k: string; v: string; note: string }) {
  return (
    <li className="border-line bg-surface rounded-[var(--radius-card)] border p-5 shadow-[var(--shadow-card)]">
      <span className="text-muted block text-[12px]">{k}</span>
      <span className="tnum text-ink mt-1.5 block text-[24px] leading-none font-extrabold tracking-[-0.03em]">
        {v}
      </span>
      <span className="text-muted mt-1.5 block truncate text-[11px]">{note}</span>
    </li>
  );
}

function TaskCard({
  task: t,
  open,
  onToggle,
  wide = false,
}: {
  task: Task;
  open: boolean;
  onToggle: () => void;
  wide?: boolean;
}) {
  const course = t.courseId ? courseOf(t.courseId) : null;
  return (
    <button
      type="button"
      data-task={t.id}
      aria-expanded={open}
      onClick={onToggle}
      className={cx(
        'w-full rounded-[16px] border p-3.5 text-left transition-colors',
        open ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span className={cx('flex items-start gap-2', wide && 'items-center')}>
        <span
          aria-hidden="true"
          className="bg-invert text-invert-accent grid h-8 w-8 shrink-0 place-items-center rounded-[11px]"
        >
          <Icon name={TRACK_ICON[t.track]} size={15} />
        </span>
        <span className="text-ink min-w-0 flex-1 text-[13px] leading-tight font-bold">
          {t.title}
        </span>
        <Badge tone={TASK_TONE[t.state]}>{t.track}</Badge>
      </span>

      <span className="text-body mt-2 block text-[11.5px] leading-[16px]">{t.body}</span>

      <span className="mt-2.5 flex items-center gap-2">
        <span className="min-w-0 flex-1">
          <Meter value={taskProgress(t)} height={6} />
        </span>
        <span className="tnum text-muted shrink-0 text-[10.5px]">
          {asHours(t.logged * 60)} of {asHours(t.budget * 60)}
        </span>
      </span>

      <span className="tnum text-muted mt-2 flex items-center gap-1.5 text-[10.5px]">
        <Icon name="clock" size={11} />
        {t.from} – {t.to}
        {t.logged > t.budget ? (
          <span className="text-danger ml-auto font-semibold">over budget</span>
        ) : null}
      </span>

      {open && course ? (
        <span className="border-line mt-3 block border-t pt-3">
          <span className="text-muted block text-[11px]">Set with</span>
          <span className="mt-1.5 flex items-center gap-2.5">
            <img
              src={instructorOf(course.instructorId).face}
              alt=""
              width={28}
              height={28}
              className="bg-sunken h-7 w-7 shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0 flex-1">
              <span className="text-ink block truncate text-[12px] font-semibold">
                {course.title}
              </span>
              <span className="text-muted block truncate text-[10.5px]">
                {instructorOf(course.instructorId).name} · {course.level}
              </span>
            </span>
          </span>
        </span>
      ) : null}
    </button>
  );
}
