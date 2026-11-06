import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  COURSES,
  LEVELS,
  LEVEL_TOKEN,
  asClock,
  asHours,
  courseProgress,
  courseSeconds,
  doneLessons,
  instructorOf,
  nextLesson,
  type Course,
  type Level,
  type Track,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { TRACK_ICON } from '@/lib/tracks';

type SortKey = 'progress' | 'rating' | 'length' | 'title';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'progress', label: 'Furthest along' },
  { id: 'rating', label: 'Best rated' },
  { id: 'length', label: 'Longest' },
  { id: 'title', label: 'By name' },
];

/**
 * Courses — the catalogue, and one course opened. Assembly only (rule 4).
 *
 * The reference's two course cards at the foot of its dashboard are the only
 * sight of a catalogue, and neither opens. This is the destination: every
 * course, filtered by level and by whether you are on it, with its lessons.
 */
export function CoursesPane({
  query,
  track,
  selected,
  onSelect,
}: {
  query: string;
  track: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [level, setLevel] = useState<'all' | Level>('all');
  const [scope, setScope] = useState<'all' | 'mine'>('all');
  const [sort, setSort] = useState<SortKey>('progress');

  const q = query.trim().toLowerCase();
  const rows = COURSES.filter((c) => (track === 'all' ? true : c.track === (track as Track)))
    .filter((c) => (level === 'all' ? true : c.level === level))
    .filter((c) => (scope === 'mine' ? c.enrolled : true))
    .filter((c) =>
      q
        ? (c.title + ' ' + c.blurb + ' ' + c.lessons.map((l) => l.title).join(' '))
            .toLowerCase()
            .includes(q)
        : true,
    )
    .slice()
    .sort((a, b) =>
      sort === 'rating'
        ? b.rating - a.rating
        : sort === 'length'
          ? courseSeconds(b) - courseSeconds(a)
          : sort === 'title'
            ? a.title.localeCompare(b.title)
            : courseProgress(b) - courseProgress(a),
    );

  const current = rows.find((c) => c.id === selected) ?? rows[0] ?? null;

  return (
    <div data-pane="courses" className="flex h-full flex-col">
      <PageHead
        title="Courses"
        note={`${COURSES.filter((c) => c.enrolled).length} of ${COURSES.length} started`}
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
              onChange={(id) => setLevel(id as 'all' | Level)}
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

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.05fr] gap-4">
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
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((c) => (
                  <li key={c.id}>
                    <Row course={c} active={current?.id === c.id} onSelect={() => onSelect(c.id)} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="course" query={query || level} />
            )}
          </div>
        </Card>

        <Card pane="detail" className="min-h-0 p-5">
          {current ? <Detail course={current} /> : <Empty what="course" query={query} />}
        </Card>
      </div>
    </div>
  );
}

function Row({
  course: c,
  active,
  onSelect,
}: {
  course: Course;
  active: boolean;
  onSelect: () => void;
}) {
  const teacher = instructorOf(c.instructorId);
  return (
    <button
      type="button"
      data-course={c.id}
      aria-pressed={active}
      onClick={onSelect}
      className={cx(
        'w-full rounded-[16px] border p-4 text-left transition-colors',
        active ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="bg-invert text-invert-accent grid h-11 w-11 shrink-0 place-items-center rounded-[14px]"
        >
          <Icon name={TRACK_ICON[c.track]} size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13.5px] font-bold">{c.title}</span>
          <span className="text-muted block truncate text-[11.5px]">
            {teacher.name} · {c.lessons.length} lessons · {asHours(courseSeconds(c))}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="text-ink flex items-center justify-end gap-1 text-[12.5px] font-bold">
            <Icon name="star-filled" size={12} className="text-accent-deep" />
            {c.rating.toFixed(1)}
          </span>
          <span className="tnum text-muted mt-0.5 block text-[10px]">
            {c.ratings.toLocaleString('en-US')}
          </span>
        </span>
      </span>

      <span className="mt-3 flex items-center gap-2">
        <span
          style={{ background: `var(${LEVEL_TOKEN[c.level]})` }}
          className="h-2 w-2 shrink-0 rounded-full"
          aria-hidden="true"
        />
        <span className="text-muted shrink-0 text-[11px]">{c.level}</span>
        <span className="min-w-0 flex-1">
          <Meter value={courseProgress(c)} height={6} />
        </span>
        <span className="tnum text-muted shrink-0 text-[10.5px]">
          {doneLessons(c)} of {c.lessons.length}
        </span>
      </span>
    </button>
  );
}

function Detail({ course: c }: { course: Course }) {
  const teacher = instructorOf(c.instructorId);
  const next = nextLesson(c);
  const done = doneLessons(c);

  return (
    <>
      <div className="bg-accent-faint shrink-0 rounded-[18px] p-5">
        <span className="flex items-center gap-2">
          <span className="bg-surface text-ink flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-bold">
            <Icon name={TRACK_ICON[c.track]} size={12} />
            {c.track}
          </span>
          <span
            style={{ background: `var(${LEVEL_TOKEN[c.level]})` }}
            className="text-level-fg ml-auto shrink-0 rounded-full px-2.5 py-[3px] text-[11px] font-bold"
          >
            {c.level}
          </span>
        </span>
        <span className="text-ink mt-2.5 block text-[19px] leading-tight font-extrabold tracking-[-0.02em]">
          {c.title}
        </span>
        <span className="text-body mt-1.5 block text-[12.5px] leading-[17px]">{c.blurb}</span>
        <span className="mt-3 flex items-center gap-2.5">
          <img
            src={teacher.face}
            alt=""
            width={34}
            height={34}
            className="bg-sunken h-[34px] w-[34px] shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[12.5px] font-bold">{teacher.name}</span>
            <span className="text-muted block truncate text-[11px]">{teacher.title}</span>
          </span>
          <span className="ml-auto shrink-0 text-right">
            <span className="text-ink flex items-center justify-end gap-1 text-[13px] font-bold">
              <Icon name="star-filled" size={13} className="text-accent-deep" />
              {c.rating.toFixed(1)}
            </span>
            <span className="tnum text-muted mt-0.5 block text-[10.5px]">
              {c.ratings.toLocaleString('en-US')} ratings
            </span>
          </span>
        </span>
      </div>

      <dl className="border-line m-0 mt-4 grid shrink-0 grid-cols-3 gap-3 border-b pb-4">
        <div>
          <dt className="text-muted m-0 text-[11px]">Lessons</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">
            {done} of {c.lessons.length}
          </dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Runtime</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">
            {asHours(courseSeconds(c))}
          </dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Left to watch</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">
            {asHours(c.lessons.filter((l) => !l.done).reduce((t, l) => t + l.seconds, 0))}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex shrink-0 items-center gap-2">
        <span className="min-w-0 flex-1">
          <Meter value={courseProgress(c)} height={8} />
        </span>
        <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">
          {courseProgress(c).toFixed(0)}%
        </span>
      </div>

      <div data-scroller="lessons" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
        <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
          {c.lessons.map((l, i) => (
            <li key={l.id}>
              <span
                data-lesson={l.id}
                className={cx(
                  'flex items-center gap-3 rounded-[12px] border px-3 py-2.5',
                  !l.done && l.id === next.id
                    ? 'border-accent-deep bg-accent-faint'
                    : 'border-line',
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
                <span
                  className={cx(
                    'min-w-0 flex-1 truncate text-[12.5px] font-semibold',
                    l.done ? 'text-muted line-through' : 'text-ink',
                  )}
                >
                  {l.title}
                </span>
                <span className="tnum text-muted shrink-0 text-[11.5px]">{asClock(l.seconds)}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
