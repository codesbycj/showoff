import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  COURSES,
  LEVELS,
  courseMinutes,
  courseProgress,
  doneLessons,
  type Course,
  type Lesson,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const TINT: Record<Course['tint'], string> = {
  lavender: 'var(--color-tile-lavender)',
  blue: 'var(--color-tile-blue)',
  green: 'var(--color-tile-green)',
  pink: 'var(--color-tile-pink)',
};

const KIND_ICON: Record<Lesson['kind'], 'book' | 'cards' | 'mic'> = {
  theory: 'book',
  practice: 'mic',
  lexicon: 'cards',
};

/**
 * Courses — the catalogue, and one course opened. Assembly only (rule 4).
 *
 * The reference's "Select a course" card shows three tiles and no way to see
 * what is in one. This is the destination its own nav promises: every course,
 * filtered by level and by whether you are on it, with the lesson list.
 */
export function CoursesPane({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [level, setLevel] = useState<'all' | (typeof LEVELS)[number]>('all');
  const [scope, setScope] = useState<'all' | 'mine'>('all');

  const q = query.trim().toLowerCase();
  const rows = COURSES.filter((c) => (level === 'all' ? true : c.level === level))
    .filter((c) => (scope === 'mine' ? c.enrolled : true))
    .filter((c) =>
      q
        ? (c.title + ' ' + c.blurb + ' ' + c.lessons.map((l) => l.title).join(' '))
            .toLowerCase()
            .includes(q)
        : true,
    );

  const current = rows.find((c) => c.id === selected) ?? rows[0] ?? null;
  const next = current ? current.lessons.find((l) => !l.done) : undefined;

  return (
    <div data-pane="courses" className="flex h-full flex-col">
      <PageHead
        title="Courses"
        note={`${COURSES.filter((c) => c.enrolled).length} of ${COURSES.length} started · every level from A2 to C1`}
        action={
          <>
            <Segmented
              name="scope"
              value={scope}
              options={[
                { id: 'all', label: 'All courses' },
                { id: 'mine', label: 'Mine' },
              ]}
              onChange={(id) => setScope(id as 'all' | 'mine')}
            />
            <Segmented
              name="level"
              value={level}
              options={[
                { id: 'all', label: 'Any level' },
                ...LEVELS.map((l) => ({ id: l, label: l })),
              ]}
              onChange={(id) => setLevel(id as 'all' | (typeof LEVELS)[number])}
            />
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.1fr] gap-4">
        <Card pane="catalogue" className="min-h-0 p-5">
          <CardHead
            title={scope === 'mine' ? 'Your courses' : 'Catalogue'}
            note="Open one to see its lessons"
            action={
              <Badge>
                {rows.length} of {COURSES.length}
              </Badge>
            }
          />
          <div data-scroller="catalogue" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {rows.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      data-course={c.id}
                      aria-pressed={current?.id === c.id}
                      onClick={() => onSelect(c.id)}
                      className={cx(
                        'w-full rounded-[16px] border p-4 text-left transition-colors',
                        current?.id === c.id
                          ? 'border-accent-deep bg-accent-faint'
                          : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          style={{ background: TINT[c.tint] }}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px]"
                        >
                          <Icon name="book" size={19} className="text-ink" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[14px] font-bold">
                            {c.title}
                          </span>
                          <span className="text-muted block truncate text-[11.5px]">
                            {c.level} · {c.lessons.length} lessons · {courseMinutes(c)} minutes
                          </span>
                        </span>
                        {c.enrolled ? (
                          <Badge tone="accent">started</Badge>
                        ) : (
                          <Badge>not started</Badge>
                        )}
                      </span>
                      <span className="mt-3 flex items-center gap-2">
                        <span className="min-w-0 flex-1">
                          <Meter value={courseProgress(c)} height={6} />
                        </span>
                        <span className="tnum text-muted w-[72px] shrink-0 text-right text-[11px]">
                          {doneLessons(c)} of {c.lessons.length}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="course" query={query || level} />
            )}
          </div>
        </Card>

        <Card pane="detail" className="min-h-0 p-5">
          {current ? (
            <>
              <div
                style={{ background: TINT[current.tint] }}
                className="shrink-0 rounded-[16px] p-4"
              >
                <span className="flex items-center gap-2">
                  <span className="text-ink text-[18px] leading-tight font-bold">
                    {current.title}
                  </span>
                  <span className="bg-surface text-ink ml-auto shrink-0 rounded-full px-2.5 py-[3px] text-[11.5px] font-bold">
                    {current.level}
                  </span>
                </span>
                <span className="text-body mt-2 block text-[12.5px] leading-[17px]">
                  {current.blurb}
                </span>
                <span className="mt-3 flex items-center gap-3">
                  <span className="text-ink flex items-center gap-1.5 text-[11.5px] font-semibold">
                    <Icon name="calendar" size={13} />
                    starts {current.starts}
                  </span>
                  <span className="text-body tnum text-[11.5px]">
                    {courseMinutes(current)} minutes in all
                  </span>
                  <span className="ml-auto flex -space-x-2">
                    {current.classmates.map((face, i) => (
                      <img
                        key={i}
                        src={face}
                        alt=""
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </span>
                </span>
              </div>

              <div className="mt-4 flex shrink-0 items-center gap-2">
                <span className="min-w-0 flex-1">
                  <Meter value={courseProgress(current)} height={8} />
                </span>
                <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">
                  {courseProgress(current).toFixed(0)}%
                </span>
              </div>

              <div data-scroller="lessons" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {current.lessons.map((l, i) => (
                    <li key={l.id}>
                      <span
                        data-lesson={l.id}
                        className={cx(
                          'flex items-center gap-3 rounded-[12px] border px-3 py-2.5',
                          l.done ? 'border-line bg-sunken' : 'border-line',
                        )}
                      >
                        <span
                          className={cx(
                            'tnum grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11.5px] font-bold',
                            l.done
                              ? 'bg-positive-soft text-positive'
                              : 'border-sunken-deep text-muted border',
                          )}
                        >
                          {l.done ? <Icon name="check" size={14} strokeWidth={2.4} /> : i + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cx(
                              'block truncate text-[12.5px] font-semibold',
                              l.done ? 'text-muted line-through' : 'text-ink',
                            )}
                          >
                            {l.title}
                          </span>
                          <span className="text-muted flex items-center gap-1.5 text-[11px] capitalize">
                            <Icon name={KIND_ICON[l.kind]} size={11} />
                            {l.kind}
                          </span>
                        </span>
                        <span className="tnum text-muted shrink-0 text-[11.5px]">
                          {l.minutes} min
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* The lesson list stops short on a five-lesson course, and the
                  one thing missing from a course page is where to resume. */}
              <div className="border-line mt-3 flex shrink-0 items-center gap-3 rounded-[14px] border p-3">
                <span
                  aria-hidden="true"
                  className="bg-accent-deep text-accent-fg grid h-10 w-10 shrink-0 place-items-center rounded-full"
                >
                  <Icon name="play" size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-muted block text-[11px]">
                    {next ? 'Next up' : 'Finished'}
                  </span>
                  <span className="text-ink block truncate text-[13px] font-bold">
                    {next ? next.title : 'Every lesson in this course is done'}
                  </span>
                </span>
                <span className="tnum text-muted shrink-0 text-[11.5px]">
                  {next
                    ? `${next.minutes} min · ${current.lessons.length - doneLessons(current)} left`
                    : `${courseMinutes(current)} min in all`}
                </span>
              </div>
            </>
          ) : (
            <div className="grid min-h-0 flex-1 place-items-center">
              <Empty what="course" query={query || level} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
