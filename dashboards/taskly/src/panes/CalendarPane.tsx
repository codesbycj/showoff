import { useState } from 'react';

import { MonthGrid, MonthKey } from '@/charts/MonthGrid';
import { AvatarStack, Badge, Card, CardHead, PriorityBadge } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { BoardHeader } from '@/features/BoardHeader';
import { CALENDAR, COLUMNS, TASKS, type Task } from '@/data/deck';

/** The day a task is due, read out of its own label so the two cannot drift. */
const dayOf = (task: Task): number | null => {
  const m = task.due.match(/(\d+)/);
  return m ? Number(m[1]) : null;
};

/**
 * Calendar: the month at full size, and what is due on the selected day.
 *
 * The dashboard's month chip is a picture of a month; this is the one you can
 * act on. Picking a day rewrites the list beside it, and a day with nothing due
 * says so rather than showing an empty box.
 */
export function CalendarPane({ projectId, query }: { projectId: string; query: string }) {
  const [day, setDay] = useState(12);

  const q = query.trim().toLowerCase();
  const forDay = TASKS.filter((t) => t.projectId === projectId)
    .filter((t) => dayOf(t) === day)
    .filter((t) => (q ? (t.title + ' ' + t.summary).toLowerCase().includes(q) : true));

  const monthTotal = TASKS.filter((t) => t.projectId === projectId && dayOf(t) !== null).length;
  const later = TASKS.filter((t) => t.projectId === projectId)
    .filter((t) => {
      const d = dayOf(t);
      return d !== null && d > day;
    })
    .sort((a, b) => (dayOf(a) ?? 0) - (dayOf(b) ?? 0))
    .slice(0, 4);

  return (
    <div data-pane="calendar" className="flex h-full flex-col gap-4">
      <BoardHeader projectId={projectId} onAdd={() => {}} />

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(290px,340px)] gap-4">
        <Card pane="month" className="col-span-2 min-h-0 p-5">
          <CardHead
            title={CALENDAR.month + ' ' + CALENDAR.year}
            icon="calendar"
            action={<span className="text-muted text-[12.5px]">{monthTotal} dated tasks</span>}
          />

          <div className="mt-4 min-h-0 flex-1">
            <MonthGrid selected={day} onSelect={setDay} fill />
          </div>

          <div className="border-line mt-4 border-t pt-3">
            <MonthKey />
          </div>
        </Card>

        <Card pane="day" className="min-h-0 p-5">
          <CardHead
            title={CALENDAR.month + ' ' + day}
            icon="tasks"
            action={<Badge tone={forDay.length ? 'accent' : 'quiet'}>{forDay.length} due</Badge>}
          />

          <div data-scroller="day" className="scroll-region mt-3 -mr-2 min-h-0 flex-1 pr-2">
            {forDay.length === 0 ? (
              <div className="border-line grid h-full place-items-center rounded-2xl border border-dashed px-4 text-center">
                <p className="text-muted m-0 text-[12.5px]">
                  Nothing due on {CALENDAR.month} {day}.
                </p>
              </div>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {forDay.map((task) => (
                  <li
                    key={task.id}
                    data-due={task.id}
                    className="border-line rounded-2xl border p-3.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <PriorityBadge priority={task.priority} />
                      <Badge tone="quiet">{COLUMNS.find((c) => c.id === task.column)?.label}</Badge>
                    </div>
                    <p className="text-ink m-0 mt-2.5 text-[14px] font-extrabold">{task.title}</p>
                    <p className="text-muted m-0 mt-1 text-[12px] leading-[1.5]">{task.summary}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <AvatarStack faces={task.assignees} extra={task.extra} size={24} />
                      <span className="text-muted flex items-center gap-1.5 text-[11.5px]">
                        <Icon name="checklist" size={12} />
                        {task.checks[0]}/{task.checks[1]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {later.length ? (
            <div className="border-line mt-3 shrink-0 border-t pt-3">
              <p className="text-muted m-0 text-[11px] font-extrabold tracking-[0.05em] uppercase">
                Later this month
              </p>
              <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
                {later.map((task) => (
                  <li key={task.id} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span className="text-body min-w-0 flex-1 truncate text-[12px]">
                      {task.title}
                    </span>
                    <span className="text-muted shrink-0 text-[11.5px]">
                      {CALENDAR.month} {dayOf(task)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
