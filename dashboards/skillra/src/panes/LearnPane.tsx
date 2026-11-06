import { useState } from 'react';

import { Waveform } from '@/charts/Waveform';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import {
  COURSES,
  LEARNER,
  NOW_PLAYING,
  TASKS,
  TASK_TONE,
  TRACKS,
  WEEK,
  asClock,
  asHours,
  courseOf,
  courseProgress,
  courseSeconds,
  doneLessons,
  instructorOf,
  nextLesson,
  sessionsOn,
  taskProgress,
  todayMinutes,
  trackCounts,
  waveform,
  weekMinutes,
  type Course,
  type Track,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { TRACK_ICON } from '@/lib/tracks';

/**
 * Learn — the dropped screen. Assembly only (rule 4).
 *
 * The reference's blocks are all here: the greeting, the player, the course
 * in progress, the track counts, the week strip and the task board. What is
 * different is that every figure says what it is a share of, and the two
 * controls that did nothing now do something.
 */
export function LearnPane({
  query,
  track,
  onOpenCourse,
  onOpenTasks,
}: {
  query: string;
  track: string;
  onOpenCourse: (id: string) => void;
  onOpenTasks: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(NOW_PLAYING.at);
  const [day, setDay] = useState(15);

  const q = query.trim().toLowerCase();
  const inTrack = (t: Track) => track === 'all' || t === track;

  const course = courseOf(NOW_PLAYING.courseId);
  const lesson = course.lessons.find((l) => l.id === NOW_PLAYING.lessonId) ?? course.lessons[0];
  const current = COURSES.filter((c) => c.enrolled && inTrack(c.track)).filter((c) =>
    q ? (c.title + ' ' + c.blurb).toLowerCase().includes(q) : true,
  )[0];

  const tasks = TASKS.filter((t) => inTrack(t.track))
    .filter((t) => (q ? (t.title + ' ' + t.body).toLowerCase().includes(q) : true))
    .filter((t) => t.state !== 'done');

  return (
    <div data-pane="learn" className="flex h-full flex-col">
      <PageHead
        title={`Hello, ${LEARNER.name}`}
        note={`What do you want to learn today? · ${todayMinutes()} of ${LEARNER.dailyGoal} minutes so far`}
        action={
          <>
            <Badge tone={todayMinutes() >= LEARNER.dailyGoal ? 'positive' : 'accent'} dot>
              {((todayMinutes() / LEARNER.dailyGoal) * 100).toFixed(0)}% of today’s goal
            </Badge>
            <Badge>{asHours(weekMinutes() * 60)} this week</Badge>
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_330px] gap-4">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          {/*
            The player. The reference's prints "02:35" with no total beside it,
            a waveform that never moves and a play button that does nothing.
          */}
          <Card pane="player" className="shrink-0 flex-row items-center gap-4 p-4">
            <span
              aria-hidden="true"
              className="bg-invert text-invert-accent grid h-14 w-14 shrink-0 place-items-center rounded-[16px]"
            >
              <Icon name={TRACK_ICON[course.track]} size={22} />
            </span>
            <span className="w-[190px] shrink-0">
              <span className="text-ink block truncate text-[14px] font-bold">{lesson.title}</span>
              <span className="text-muted block truncate text-[11.5px]">
                {instructorOf(course.instructorId).name} · {course.title}
              </span>
            </span>
            <Waveform
              bars={waveform(lesson.id)}
              played={at / lesson.seconds}
              w={300}
              h={38}
              label={`${lesson.title}, ${asClock(at)} of ${asClock(lesson.seconds)}`}
            />
            <span className="tnum text-ink w-[96px] shrink-0 text-center text-[12.5px] font-semibold">
              {asClock(at)} / {asClock(lesson.seconds)}
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              <PlayerButton
                icon="skip-back"
                label="Back 30 seconds"
                name="back"
                onClick={() => setAt(Math.max(0, at - 30))}
              />
              <button
                type="button"
                data-action="play"
                aria-pressed={playing}
                title={playing ? 'Pause' : 'Play'}
                aria-label={playing ? 'Pause' : 'Play'}
                onClick={() => setPlaying(!playing)}
                className="bg-accent text-accent-fg grid h-11 w-11 place-items-center rounded-full transition-[filter] hover:brightness-95"
              >
                <Icon name={playing ? 'pause' : 'play'} size={17} />
              </button>
              <PlayerButton
                icon="skip-forward"
                label="Forward 30 seconds"
                name="forward"
                onClick={() => setAt(Math.min(lesson.seconds, at + 30))}
              />
            </span>
          </Card>

          <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-4">
            <Card pane="continue" className="min-h-0 p-5">
              {current ? (
                <ContinueCard course={current} onOpen={() => onOpenCourse(current.id)} />
              ) : (
                <Empty what="course" query={query || track} />
              )}
            </Card>

            <Card pane="tracks" className="min-h-0 p-5">
              <CardHead
                title="Your tracks"
                note="Lessons finished, of the ones you are enrolled in"
              />
              <div data-scroller="tracks" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                {/* justify-between, so five tracks fill the card rather than
                    stacking at the top of it. */}
                <ul className="m-0 flex h-full list-none flex-col justify-between gap-2 p-0">
                  {TRACKS.filter(inTrack).map((t) => {
                    const { done, total, courses } = trackCounts(t);
                    return (
                      <li key={t}>
                        <span className="border-line block rounded-[16px] border p-3.5">
                          <span className="flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className="bg-invert text-invert-accent grid h-9 w-9 shrink-0 place-items-center rounded-[12px]"
                            >
                              <Icon name={TRACK_ICON[t]} size={16} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="text-ink block truncate text-[12.5px] font-bold">
                                {t}
                              </span>
                              <span className="tnum text-muted block truncate text-[11px]">
                                {total ? `${done} of ${total} lessons` : 'not enrolled'} · {courses}{' '}
                                {courses === 1 ? 'course' : 'courses'}
                              </span>
                            </span>
                            <span className="tnum text-ink shrink-0 text-[13px] font-bold">
                              {total ? `${((done / total) * 100).toFixed(0)}%` : '—'}
                            </span>
                          </span>
                          <span className="mt-2 block">
                            <Meter value={total ? (done / total) * 100 : 0} height={6} />
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

        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="week" className="shrink-0 p-5">
            <CardHead title={LEARNER.month} note="Pick a day for what is on it" />
            {/*
              The reference's week strip has one day circled and nothing
              happens when another is picked. This one drives the two lines
              under it.
            */}
            <ul className="m-0 mt-3 grid list-none grid-cols-7 gap-1 p-0">
              {WEEK.map((d) => (
                <li key={d.date}>
                  <button
                    type="button"
                    data-day={d.date}
                    aria-pressed={day === d.date}
                    onClick={() => setDay(d.date)}
                    className={cx(
                      'w-full rounded-[12px] py-2 text-center transition-colors',
                      day === d.date
                        ? 'bg-accent text-accent-fg'
                        : 'text-muted hover:bg-sunken hover:text-ink',
                    )}
                  >
                    <span className="block text-[10px]">{d.day}</span>
                    <span className="tnum mt-0.5 block text-[14px] font-bold">{d.date}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-line mt-3 border-t pt-3">
              <span className="tnum text-muted block text-[11.5px]">
                {WEEK.find((d) => d.date === day)?.minutes ?? 0} minutes watched
              </span>
              <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
                {sessionsOn(day).length ? (
                  sessionsOn(day).map((s) => (
                    <li key={s.id} className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="bg-accent-faint text-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-[11px]"
                      >
                        <Icon name="people" size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block truncate text-[12px] font-bold">
                          {s.title}
                        </span>
                        <span className="tnum text-muted block truncate text-[10.5px]">
                          {s.from}–{s.to} · {s.track} · {instructorOf(s.withId).name}
                        </span>
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-muted text-[11.5px]">Nothing booked on the {day}th.</li>
                )}
              </ul>
            </div>
          </Card>

          <Card pane="tasks" className="min-h-0 flex-1 p-5">
            <CardHead
              title="Tasks board"
              note={`${tasks.length} open · ${asHours(TASKS.reduce((t, x) => t + x.logged, 0) * 60)} logged`}
              action={
                <button
                  type="button"
                  data-action="open-tasks"
                  onClick={onOpenTasks}
                  title="Open the task board"
                  className="border-line text-muted hover:bg-sunken hover:text-ink grid h-8 w-8 place-items-center rounded-full border transition-colors"
                >
                  <Icon name="chevron-right" size={14} />
                </button>
              }
            />
            <div data-scroller="tasks" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
              {tasks.length ? (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {tasks.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        data-task={t.id}
                        onClick={onOpenTasks}
                        title="Open the task board"
                        className="border-line hover:bg-sunken w-full rounded-[16px] border p-3.5 text-left transition-colors"
                      >
                        <span className="flex items-start gap-2">
                          <span className="text-ink min-w-0 flex-1 text-[13px] leading-tight font-bold">
                            {t.title}
                          </span>
                          <Badge tone={TASK_TONE[t.state]}>{t.track}</Badge>
                        </span>
                        <span className="text-body mt-1.5 block text-[11.5px] leading-[16px]">
                          {t.body}
                        </span>
                        <span className="mt-2.5 flex items-center gap-2">
                          <span className="min-w-0 flex-1">
                            <Meter value={taskProgress(t)} height={6} />
                          </span>
                          <span className="tnum text-muted shrink-0 text-[10.5px]">
                            {asHours(t.logged * 60)} of {asHours(t.budget * 60)}
                          </span>
                        </span>
                        <span className="tnum text-muted mt-1.5 block text-[10.5px]">
                          {t.from} – {t.to}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty what="task" query={query || track} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PlayerButton({
  icon,
  label,
  name,
  onClick,
}: {
  icon: 'skip-back' | 'skip-forward';
  label: string;
  name: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-action={name}
      title={label}
      aria-label={label}
      onClick={onClick}
      className="border-line text-body hover:bg-sunken hover:text-ink grid h-11 w-11 place-items-center rounded-full border transition-colors"
    >
      <Icon name={icon} size={15} />
    </button>
  );
}

function ContinueCard({ course, onOpen }: { course: Course; onOpen: () => void }) {
  const teacher = instructorOf(course.instructorId);
  const next = nextLesson(course);
  return (
    <>
      <CardHead title={course.title} note={course.blurb} />

      {/*
        The reference leads this card with a photograph of a person at a desk.
        A photograph of a scene is out of drawing range and free-licensed
        unbranded stock of one is not to hand (rule 8) — so the card leads
        with the instructor instead, which is a portrait this build has, and
        the thing a learner actually picks a course by.
      */}
      <div className="bg-accent-faint mt-4 flex shrink-0 items-center gap-3.5 rounded-[18px] p-4">
        <img
          src={teacher.face}
          alt=""
          width={56}
          height={56}
          className="bg-sunken h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0 flex-1">
          <span className="text-muted block text-[11px]">Taught by</span>
          <span className="text-ink block truncate text-[14px] font-bold">{teacher.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{teacher.title}</span>
        </span>
        <span className="shrink-0 text-right">
          <span className="text-ink flex items-center gap-1 text-[13px] font-bold">
            <Icon name="star-filled" size={13} className="text-accent-deep" />
            {course.rating.toFixed(1)}
          </span>
          <span className="tnum text-muted mt-0.5 block text-[10.5px]">
            {course.ratings.toLocaleString('en-US')} ratings
          </span>
        </span>
      </div>

      <dl className="border-line m-0 mt-4 grid shrink-0 grid-cols-3 gap-3 border-b pb-4">
        <div>
          <dt className="text-muted m-0 text-[11px]">Lessons</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">
            {doneLessons(course)} of {course.lessons.length}
          </dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Runtime</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">
            {asHours(courseSeconds(course))}
          </dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Level</dt>
          <dd className="text-ink m-0 mt-1 text-[14px] font-bold">{course.level}</dd>
        </div>
      </dl>

      <div className="mt-4 shrink-0">
        <span className="flex items-center gap-2">
          <span className="min-w-0 flex-1">
            <Meter value={courseProgress(course)} height={8} />
          </span>
          <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">
            {courseProgress(course).toFixed(0)}%
          </span>
        </span>
      </div>

      <div data-scroller="lessons" className="scroll-region mt-4 min-h-0 flex-1 pr-1">
        <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
          {course.lessons.map((l, i) => (
            <li key={l.id}>
              <span
                data-lesson={l.id}
                className={cx(
                  'flex items-center gap-3 rounded-[12px] border px-3 py-2',
                  l.id === next.id ? 'border-accent-deep bg-accent-faint' : 'border-line',
                )}
              >
                <span
                  className={cx(
                    'tnum grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold',
                    l.done
                      ? 'bg-positive-soft text-positive'
                      : 'border-sunken-deep text-muted border',
                  )}
                >
                  {l.done ? <Icon name="check" size={13} strokeWidth={2.4} /> : i + 1}
                </span>
                <span
                  className={cx(
                    'min-w-0 flex-1 truncate text-[12px] font-semibold',
                    l.done ? 'text-muted line-through' : 'text-ink',
                  )}
                >
                  {l.title}
                </span>
                <span className="tnum text-muted shrink-0 text-[11px]">{asClock(l.seconds)}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        data-action="continue"
        onClick={onOpen}
        className="bg-invert text-invert-fg mt-4 flex h-11 shrink-0 items-center justify-center gap-2 rounded-full text-[13px] font-bold transition-[filter] hover:brightness-125"
      >
        <Icon name="play" size={14} />
        Continue · {next.title}
      </button>
    </>
  );
}
