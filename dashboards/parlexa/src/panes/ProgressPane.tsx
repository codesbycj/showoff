import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  CALENDAR,
  COURSES,
  LEARNER,
  SKILLS,
  VOCAB,
  WEEK,
  courseProgress,
  daysMet,
  doneLessons,
  dueToday,
  metGoal,
  totalOf,
  vocabTotal,
  weekMinutes,
  type Skill,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const LENSES = [
  { id: 'now', label: 'Where I am' },
  { id: 'gain', label: 'What moved' },
];

/**
 * Progress — what the month actually did. Assembly only (rule 4).
 *
 * The reference's own nav promises this destination and never shows it. The
 * three things it has to answer: which skills moved, whether the streak is
 * real, and what "832 words" means.
 */
export function ProgressPane({ query }: { query: string }) {
  const [lens, setLens] = useState('now');

  const q = query.trim().toLowerCase();
  const skills = SKILLS.filter((s) => (q ? s.label.toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => (lens === 'gain' ? gain(b) - gain(a) : b.value - a.value));

  const started = COURSES.filter((c) => c.enrolled);
  const lessonsDone = started.reduce((t, c) => t + doneLessons(c), 0);

  return (
    <div data-pane="progress" className="flex h-full flex-col">
      <PageHead
        title="Progress"
        note={`${LEARNER.level} · ${weekMinutes()} minutes this week · ${lessonsDone} lessons finished`}
        action={
          <Segmented name="lens" value={lens} options={LENSES} onChange={(id) => setLens(id)} />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <Stat
          k="Current streak"
          v={`${LEARNER.streak} days`}
          note={`best so far ${LEARNER.bestStreak}`}
          icon="flame"
        />
        <Stat
          k="Days at goal"
          v={`${daysMet()} of ${CALENDAR.length}`}
          note={`${LEARNER.dailyGoal} minutes a day`}
          icon="target"
        />
        <Stat
          k="Words in the deck"
          v={vocabTotal().toLocaleString('en-US')}
          note={`${dueToday} due for review today`}
          icon="cards"
        />
        <Stat
          k="This week"
          v={`${weekMinutes()} min`}
          note={`over ${WEEK.filter((d) => totalOf(d) > 0).length} days`}
          icon="clock"
        />
      </ul>

      <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-4">
        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-4">
          <Card pane="skills" className="min-h-0 p-5">
            <CardHead
              title="Skills"
              note={
                lens === 'gain'
                  ? 'Sorted by what moved most since last month'
                  : 'Share of this level’s criteria met'
              }
              action={
                <Badge>
                  {skills.length} of {SKILLS.length}
                </Badge>
              }
            />
            <div data-scroller="skills" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
              {skills.length ? (
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {skills.map((s) => (
                    <li key={s.id} data-skill={s.id}>
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-ink text-[13px] font-semibold">{s.label}</span>
                        <span className="flex items-baseline gap-2">
                          <span className="tnum text-muted text-[10.5px]">
                            {s.wasValue}% a month ago
                          </span>
                          <span className="tnum text-positive text-[11.5px] font-semibold">
                            +{gain(s)}
                          </span>
                          <span className="tnum text-ink text-[14px] font-bold">{s.value}%</span>
                        </span>
                      </span>
                      {/*
                      Last month's mark rides on the bar rather than beside it:
                      the distance between the two is the point, and a second
                      number in a column is not a distance.
                    */}
                      <span className="relative mt-2 block">
                        <Meter value={s.value} height={10} />
                        <span
                          aria-hidden="true"
                          style={{ left: `calc(${s.wasValue}% - 1px)` }}
                          className="bg-ink absolute top-[-3px] h-4 w-[2px] rounded-full"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty what="skill" query={query} />
              )}
            </div>
          </Card>

          <Card pane="courses" className="shrink-0 p-5">
            <CardHead title="Courses under way" note={`${started.length} started`} />
            <div data-scroller="started" className="scroll-region mt-2.5 min-h-0 flex-1 pr-1">
              <ul className="m-0 flex list-none flex-col justify-between gap-3 p-0">
                {started.map((c) => (
                  <li key={c.id}>
                    <span className="flex items-baseline gap-2">
                      <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                        {c.title}
                      </span>
                      <span className="tnum text-muted shrink-0 text-[10.5px]">
                        {doneLessons(c)} of {c.lessons.length}
                      </span>
                    </span>
                    <span className="mt-1 block">
                      <Meter value={courseProgress(c)} height={6} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="grid min-h-0 grid-rows-[auto_1fr] gap-4">
          <Card pane="calendar" className="shrink-0 p-5">
            <CardHead
              title="Four weeks"
              note={`A filled square is a day at or over ${LEARNER.dailyGoal} minutes`}
            />
            {/*
              The streak is a claim about a calendar, so the calendar is on the
              screen. Twenty-eight squares, four rows of seven.
            */}
            <ul
              aria-label="Minutes each day for the last four weeks"
              className="m-0 mt-3 grid list-none grid-cols-7 gap-1.5 p-0"
            >
              {CALENDAR.map((minutes, i) => (
                <li key={i}>
                  <span
                    data-day={i}
                    title={minutes ? `${minutes} minutes` : 'nothing logged'}
                    className={cx(
                      'tnum grid h-9 place-items-center rounded-[9px] text-[11px] font-semibold',
                      minutes === 0
                        ? 'bg-sunken text-muted'
                        : metGoal(minutes)
                          ? 'bg-accent-deep text-accent-fg'
                          : 'bg-accent-faint text-accent-deep',
                    )}
                  >
                    {minutes || '—'}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-muted m-0 mt-3 text-[11.5px]">
              {daysMet()} of {CALENDAR.length} days at goal ·{' '}
              {CALENDAR.filter((m) => m === 0).length} missed entirely
            </p>
          </Card>

          <Card pane="vocab" className="shrink-0 p-5">
            <CardHead
              title="Vocabulary"
              note={`${vocabTotal().toLocaleString('en-US')} words, by how well they are known`}
              icon={<Icon name="cards" size={16} />}
            />
            {/*
              What "832 words" means, which the reference never says. These are
              the four states a review schedule is made of.
            */}
            <span className="bg-sunken mt-3 flex h-3 shrink-0 overflow-hidden rounded-full">
              {VOCAB.map((v, i) => (
                <span
                  key={v.id}
                  style={{
                    width: `${(v.count / vocabTotal()) * 100}%`,
                    background: `var(--color-accent-deep)`,
                    opacity: 0.35 + i * 0.22,
                  }}
                  className="block h-full"
                />
              ))}
            </span>
            <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              {VOCAB.map((v, i) => (
                <li key={v.id} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    style={{ background: 'var(--color-accent-deep)', opacity: 0.35 + i * 0.22 }}
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[12.5px] font-semibold">
                      {v.label}
                    </span>
                    <span className="text-muted block truncate text-[10.5px]">{v.note}</span>
                  </span>
                  <span className="tnum text-ink shrink-0 text-[13px] font-bold">
                    {v.count.toLocaleString('en-US')}
                  </span>
                  <span className="tnum text-muted w-[42px] shrink-0 text-right text-[11px]">
                    {((v.count / vocabTotal()) * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

const gain = (s: Skill) => s.value - s.wasValue;

function Stat({
  k,
  v,
  note,
  icon,
}: {
  k: string;
  v: string;
  note: string;
  icon: 'flame' | 'target' | 'cards' | 'clock';
}) {
  return (
    <li className="border-line bg-surface flex items-center gap-3 rounded-[var(--radius-card)] border p-5 shadow-[var(--shadow-card)]">
      <span
        aria-hidden="true"
        className="bg-accent-faint text-accent-deep grid h-11 w-11 shrink-0 place-items-center rounded-[14px]"
      >
        <Icon name={icon} size={19} />
      </span>
      <span className="min-w-0">
        <span className="text-muted block truncate text-[11.5px]">{k}</span>
        <span className="tnum text-ink mt-1 block truncate text-[20px] leading-none font-bold tracking-[-0.02em]">
          {v}
        </span>
        <span className="text-muted mt-1.5 block truncate text-[10.5px]">{note}</span>
      </span>
    </li>
  );
}
