import { useState } from 'react';

import { StackedArea } from '@/charts/StackedArea';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  COURSES,
  LEARNER,
  RANGES,
  SERIES,
  TASKS,
  bestDay,
  courseProgress,
  doneLessons,
  myRank,
  rangeData,
  ranked,
  taskProgress,
  tasksDone,
  totalOf,
  weekMinutes,
  type Course,
  type SeriesId,
  type Task,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const TINT: Record<Course['tint'], string> = {
  lavender: 'var(--color-tile-lavender)',
  blue: 'var(--color-tile-blue)',
  green: 'var(--color-tile-green)',
  pink: 'var(--color-tile-pink)',
};

const KIND_ICON: Record<SeriesId, 'book' | 'cards' | 'mic'> = {
  theory: 'book',
  practice: 'mic',
  lexicon: 'cards',
};

/**
 * Dashboard — the dropped screen. Assembly only (rule 4).
 *
 * The four blocks are the reference's own: pick a course, the week's chart,
 * today's homework, the friends board. What is different is that each number
 * is computed from the deck and says what it is a share *of*.
 */
export function DashboardPane({
  query,
  onOpenCourse,
}: {
  query: string;
  onOpenCourse: (id: string) => void;
}) {
  const [range, setRange] = useState('weekly');
  const [hidden, setHidden] = useState<SeriesId[]>([]);
  const [scope, setScope] = useState<'friends' | 'top'>('friends');

  const q = query.trim().toLowerCase();
  /* Every course, the ones already started first. Filtered to the three
     enrolled ones the card ran a quarter empty. */
  const courses = COURSES.filter((c) =>
    q ? (c.title + ' ' + c.blurb).toLowerCase().includes(q) : true,
  )
    .slice()
    .sort((a, b) => Number(b.enrolled) - Number(a.enrolled));

  const data = rangeData(range);
  const board = scope === 'top' ? ranked().slice(0, 3) : ranked();
  const best = bestDay();

  return (
    <div data-pane="dashboard" className="flex h-full flex-col">
      <PageHead
        title="Dashboard"
        note={`${LEARNER.language} · ${LEARNER.level} · ${LEARNER.today}`}
        action={
          <Badge tone="accent" dot>
            {tasksDone()} of {TASKS.length} tasks done today
          </Badge>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[330px_1fr] gap-4">
        <Card pane="courses" className="min-h-0 p-5">
          <CardHead
            title="Select a course"
            note={`${COURSES.filter((c) => c.enrolled).length} started, ${COURSES.length} in all`}
          />
          <div data-scroller="courses" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            {courses.length ? (
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {courses.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      data-course={c.id}
                      onClick={() => onOpenCourse(c.id)}
                      title={`Open ${c.title}`}
                      style={{ background: TINT[c.tint] }}
                      className="w-full rounded-[16px] p-4 text-left transition-[filter] duration-150 hover:brightness-[0.97]"
                    >
                      <span className="flex items-start gap-2">
                        <span className="text-ink min-w-0 flex-1 text-[16px] leading-tight font-bold">
                          {c.title}
                        </span>
                        {c.enrolled ? null : (
                          <span className="bg-surface text-ink shrink-0 rounded-full px-2 py-[2px] text-[10px] font-bold">
                            not started
                          </span>
                        )}
                      </span>
                      {/* text-body, not text-muted: a pastel ground does not
                          leave a muted grey enough contrast. */}
                      <span className="text-body mt-1.5 block text-[11.5px] leading-[16px]">
                        {c.blurb}
                      </span>
                      <span className="mt-3 block">
                        <Meter value={courseProgress(c)} height={6} />
                      </span>
                      <span className="mt-2 flex items-center gap-2">
                        <span className="text-ink flex items-center gap-1.5 text-[11px] font-semibold">
                          <Icon name="calendar" size={12} />
                          {c.starts}
                        </span>
                        <span className="tnum text-body text-[11px]">
                          {doneLessons(c)} of {c.lessons.length} lessons
                        </span>
                        <span className="ml-auto flex -space-x-2">
                          {c.classmates.map((face, i) => (
                            <img
                              key={i}
                              src={face}
                              alt=""
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="course" query={query} />
            )}
          </div>
        </Card>

        <div className="grid min-h-0 grid-rows-[1.25fr_1fr] gap-4">
          <Card pane="chart" className="min-h-0 p-5">
            <div className="flex shrink-0 items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-ink m-0 text-[17px] leading-tight font-bold">
                  Performance chart
                </h2>
                <p className="text-muted m-0 mt-1 text-[12px]">
                  {range === 'monthly' ? 'Four weeks' : 'This week'} ·{' '}
                  <span className="tnum text-ink font-semibold">{weekMinutes()} minutes</span> in
                  all, best on {best.day} at {totalOf(best)}
                </p>
              </div>
              <Segmented
                name="range"
                size="sm"
                value={range}
                options={RANGES}
                onChange={(id) => setRange(id)}
              />
            </div>

            {/* The legend is a control: each entry drops its band out of the
                stack, which is the only way to read one of three apart. */}
            <ul
              role="group"
              aria-label="Series"
              data-group="series"
              className="m-0 mt-2.5 flex shrink-0 list-none gap-1.5 p-0"
            >
              {SERIES.map((s) => {
                const off = hidden.includes(s.id);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      data-series={s.id}
                      aria-pressed={!off}
                      onClick={() =>
                        setHidden((cur) =>
                          cur.includes(s.id) ? cur.filter((x) => x !== s.id) : [...cur, s.id],
                        )
                      }
                      className={cx(
                        'flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-semibold transition-colors',
                        off
                          ? 'border-line text-muted hover:bg-sunken'
                          : 'border-line bg-sunken text-ink',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        style={{ background: off ? 'var(--color-sunken-deep)' : `var(${s.token})` }}
                        className="h-2.5 w-2.5 rounded-full"
                      />
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 flex min-h-0 flex-1">
              <StackedArea
                data={data}
                hidden={hidden}
                label={`Minutes of theory, practice and lexicon per ${range === 'monthly' ? 'week over four weeks' : 'day this week'}, stacked`}
              />
            </div>
          </Card>

          <div className="grid min-h-0 grid-cols-[1fr_1fr] gap-4">
            <Card pane="homework" className="min-h-0 p-5">
              <CardHead
                title="Homework"
                note="Check and complete tasks"
                action={<Badge>{tasksDone()} done</Badge>}
              />
              <div data-scroller="homework" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {TASKS.map((t) => (
                    <li key={t.id}>
                      <TaskRow task={t} />
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card pane="friends" className="min-h-0 p-5">
              <CardHead
                title="Friends score"
                note={`You are ${ordinal(myRank())} of ${ranked().length}`}
                action={
                  <Segmented
                    name="scope"
                    size="sm"
                    value={scope}
                    options={[
                      { id: 'friends', label: 'All' },
                      { id: 'top', label: 'Top 3' },
                    ]}
                    onChange={(id) => setScope(id as 'friends' | 'top')}
                  />
                }
              />
              <div data-scroller="friends" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {board.map((f, i) => (
                    <li
                      key={f.id}
                      data-friend={f.id}
                      className={cx(
                        'flex items-center gap-2.5 rounded-[12px] px-2 py-1.5',
                        f.me && 'bg-accent-faint',
                      )}
                    >
                      <span className="tnum text-muted w-[16px] shrink-0 text-[11px]">{i + 1}</span>
                      <img
                        src={f.face}
                        alt=""
                        width={30}
                        height={30}
                        className="bg-sunken h-[30px] w-[30px] shrink-0 rounded-full object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block truncate text-[12.5px] font-bold">
                          {f.name}
                          {f.me ? <span className="text-accent-deep"> · you</span> : null}
                        </span>
                        <span className="tnum text-muted block truncate text-[10.5px]">
                          {f.streak}-day streak · {f.words} words · {f.lessons} lessons
                        </span>
                      </span>
                      <span className="tnum text-ink shrink-0 text-[14px] font-bold">
                        {f.score.toLocaleString('en-US')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const ordinal = (n: number) => {
  const suffix =
    n % 10 === 1 && n % 100 !== 11
      ? 'st'
      : n % 10 === 2 && n % 100 !== 12
        ? 'nd'
        : n % 10 === 3 && n % 100 !== 13
          ? 'rd'
          : 'th';
  return `${n}${suffix}`;
};

/**
 * One daily task.
 *
 * The percentage is a count over a count, printed beside the bar. The
 * reference's "Learn 10 new words today — 57%" is five and seven tenths of a
 * word, and nothing on the screen says which.
 */
function TaskRow({ task: t }: { task: Task }) {
  const done = t.done >= t.target;
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={cx(
          'grid h-9 w-9 shrink-0 place-items-center rounded-[11px]',
          done ? 'bg-positive-soft text-positive' : 'bg-accent-faint text-accent-deep',
        )}
      >
        <Icon name={done ? 'check' : KIND_ICON[t.kind]} size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-ink min-w-0 truncate text-[12.5px] font-semibold">{t.what}</span>
          <span className="tnum text-muted shrink-0 text-[11px]">
            {t.done} of {t.target} {t.unit}
          </span>
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="min-w-0 flex-1">
            <Meter value={taskProgress(t)} height={6} />
          </span>
          <span className="tnum text-ink w-[34px] shrink-0 text-right text-[11px] font-bold">
            {taskProgress(t).toFixed(0)}%
          </span>
        </span>
      </span>
    </span>
  );
}
