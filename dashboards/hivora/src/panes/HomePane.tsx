import { useState } from 'react';

import { DayBars } from '@/charts/DayBars';
import { Waveform } from '@/charts/Waveform';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead, Search } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon, type IconName } from '@/components/Icon';
import {
  LIVE_CALL,
  MEMBERS,
  NOTICE_LENSES,
  PROJECTS,
  PROJECT_TONE,
  RECORDINGS,
  SPLIT,
  STATE_TONE,
  WEEK,
  WORKSPACE,
  asHours,
  asMinutes,
  changeOf,
  countState,
  memberOf,
  noticesFor,
  projectProgress,
  recordingOf,
  shareOf,
  tasksDone,
  tasksTotal,
  teamHours,
  totalHours,
  unwatched,
  waveform,
  type Notice,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const NOTICE_ICON: Record<Notice['kind'], IconName> = {
  invite: 'link',
  comment: 'comment',
  viewing: 'eye',
  mention: 'at',
};

/**
 * Home — the dropped screen. Assembly only (rule 4).
 *
 * The reference's blocks are all here: the hero, the members, the hours, the
 * statistics, the live call, the week strip, the recordings and the
 * notifications. What is different is that each figure says what it is a
 * share of, and the subscription upsell is gone — in its place, what a
 * workspace's fourth card is actually for.
 */
export function HomePane({
  query,
  onQuery,
  onOpenRecording,
  onOpenTeam,
}: {
  query: string;
  onQuery: (next: string) => void;
  onOpenRecording: (id: string) => void;
  onOpenTeam: () => void;
}) {
  const [lens, setLens] = useState('all');
  const [day, setDay] = useState(WEEK.findIndex((d) => d.date === 17));

  const q = query.trim().toLowerCase();
  const notices = noticesFor(lens).filter((n) =>
    q ? (memberOf(n.memberId).name + ' ' + n.body).toLowerCase().includes(q) : true,
  );
  const recent = RECORDINGS.filter((r) =>
    q ? (r.title + ' ' + r.topic).toLowerCase().includes(q) : true,
  ).slice(0, 5);

  return (
    <div data-pane="home" className="flex h-full flex-col">
      <PageHead
        title={`${WORKSPACE.weekday}, ${WORKSPACE.month}`}
        note={`${WORKSPACE.team} · ${MEMBERS.length} people · ${asHours(totalHours())} logged this week`}
        action={
          <>
            <Search value={query} onChange={onQuery} />
            <Badge tone="accent" dot>
              {unwatched()} to watch
            </Badge>
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_340px] gap-4">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          {/* The hero. The reference's carries a 3D render that cannot be
              recreated and must not be traced (rule 8); this one carries the
              call that is actually happening, which is what the floating pill
              lower down its own screen was for and could not be joined. */}
          <Card pane="live" className="shrink-0 flex-row items-center gap-5 p-5">
            <span
              aria-hidden="true"
              className="bg-accent-tint grid h-14 w-14 shrink-0 place-items-center rounded-[18px]"
            >
              <Icon name="video" size={24} className="text-accent-deep" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="bg-danger h-2 w-2 shrink-0 animate-none rounded-full" />
                <span className="text-muted text-[11.5px] font-semibold tracking-[0.06em] uppercase">
                  In progress · {LIVE_CALL.room}
                </span>
              </span>
              <span className="text-ink mt-1 block truncate text-[19px] leading-tight font-extrabold tracking-[-0.02em]">
                {LIVE_CALL.title}
              </span>
              <span className="text-muted tnum mt-1 block truncate text-[12px]">
                Started {LIVE_CALL.startedAt} · {LIVE_CALL.minutesIn} minutes in ·{' '}
                {LIVE_CALL.attendees.map((id) => memberOf(id).name.split(' ')[0]).join(', ')}
              </span>
            </span>
            <span className="flex shrink-0 -space-x-2">
              {LIVE_CALL.attendees.map((id) => (
                <img
                  key={id}
                  src={memberOf(id).face}
                  alt=""
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] rounded-full border-2 border-white object-cover"
                />
              ))}
            </span>
            <button
              type="button"
              data-action="join"
              className="bg-accent-deep text-accent-fg h-11 shrink-0 rounded-full px-5 text-[13px] font-bold transition-[filter] hover:brightness-110"
            >
              Join
            </button>
          </Card>

          <div
            className="grid min-h-0 shrink-0 grid-cols-[1fr_1.35fr] gap-4"
            style={{ height: 304 }}
          >
            <Card pane="members" className="min-h-0 p-5">
              <CardHead
                title="Members"
                note={`${MEMBERS.filter((m) => m.state === 'in a call').length} in a call now`}
                action={
                  <button
                    type="button"
                    data-action="open-team"
                    onClick={onOpenTeam}
                    title="Open the team board"
                    className="border-line text-muted hover:bg-sunken hover:text-ink grid h-8 w-8 place-items-center rounded-full border transition-colors"
                  >
                    <Icon name="arrow-right" size={14} />
                  </button>
                }
              />
              <div data-scroller="members" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {MEMBERS.map((m) => (
                    <li key={m.id} className="flex items-center gap-2.5 py-1">
                      <img
                        src={m.face}
                        alt=""
                        width={34}
                        height={34}
                        className="bg-sunken h-[34px] w-[34px] shrink-0 rounded-full object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block truncate text-[12.5px] font-bold">
                          {m.name}
                        </span>
                        <span className="text-muted block truncate text-[11px]">{m.role}</span>
                      </span>
                      <Badge tone={STATE_TONE[m.state]}>{m.state}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card pane="hours" className="min-h-0 p-5">
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-muted block text-[12px]">Hours this week</span>
                  <span className="tnum text-ink mt-1 block text-[30px] leading-none font-extrabold tracking-[-0.03em]">
                    {asHours(totalHours())}
                  </span>
                </div>
                <Badge tone={changeOf('focus') >= 0 ? 'positive' : 'danger'}>
                  focus {changeOf('focus') >= 0 ? '+' : ''}
                  {changeOf('focus').toFixed(0)}% on last week
                </Badge>
              </div>

              {/* Three shares of one stated total — the reference prints
                  +50% / +33% / +17% beside three bars and never says of what. */}
              <span className="bg-sunken mt-3 flex h-3 shrink-0 overflow-hidden rounded-full">
                {SPLIT.map((s) => (
                  <span
                    key={s.id}
                    style={{ width: `${shareOf(s.id)}%`, background: `var(${s.token})` }}
                    className="block h-full"
                  />
                ))}
              </span>
              <ul className="m-0 mt-2.5 flex shrink-0 list-none gap-4 p-0">
                {SPLIT.map((s) => (
                  <li key={s.id} className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        style={{ background: `var(${s.token})` }}
                        className="h-2 w-2 shrink-0 rounded-full"
                      />
                      <span className="text-muted truncate text-[11px]">{s.label}</span>
                    </span>
                    <span className="tnum text-ink mt-0.5 block text-[13px] font-bold">
                      {asHours(teamHours(s.id))}
                    </span>
                    <span className="tnum text-muted block text-[10.5px]">
                      {shareOf(s.id).toFixed(0)}% of the week
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex min-h-0 flex-1">
                <DayBars
                  week={WEEK}
                  label="Hours a day this week, stacked by calls, focus time and async work"
                />
              </div>
            </Card>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.35fr] gap-4">
            <Card pane="statistics" className="min-h-0 p-5">
              <CardHead title="Statistics" note={`${PROJECTS.length} projects on the board`} />
              <div className="mt-3 shrink-0">
                <span className="tnum text-ink text-[34px] leading-none font-extrabold tracking-[-0.03em]">
                  {tasksDone()}
                </span>
                <span className="tnum text-muted text-[20px] font-bold"> of {tasksTotal()}</span>
                <span className="text-muted ml-2 text-[12.5px]">tasks complete</span>
                <span className="mt-2.5 block">
                  <Meter value={(tasksDone() / tasksTotal()) * 100} height={8} />
                </span>
              </div>
              <ul className="m-0 mt-4 grid shrink-0 list-none grid-cols-3 gap-2 p-0">
                {(['complete', 'in progress', 'blocked'] as const).map((state) => (
                  <li
                    key={state}
                    className="border-line rounded-[14px] border px-3 py-2.5 text-center"
                  >
                    <span className="tnum text-ink block text-[20px] leading-none font-extrabold">
                      {countState(state)}
                    </span>
                    <span className="text-muted mt-1.5 block text-[10.5px] capitalize">
                      {state}
                    </span>
                  </li>
                ))}
              </ul>
              <div data-scroller="projects" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {PROJECTS.map((p) => (
                    <li key={p.id} data-project={p.id}>
                      <span className="flex items-baseline gap-2">
                        <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                          {p.name}
                        </span>
                        <Badge tone={PROJECT_TONE[p.state]}>{p.state}</Badge>
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="min-w-0 flex-1">
                          <Meter value={projectProgress(p)} height={5} />
                        </span>
                        <span className="tnum text-muted shrink-0 text-[10.5px]">
                          {p.done}/{p.total}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card pane="recordings" className="min-h-0 p-5">
              <CardHead
                title="Last recordings"
                note={`${unwatched()} of ${RECORDINGS.length} not watched yet`}
                action={
                  <Badge>
                    {recent.length} of {RECORDINGS.length}
                  </Badge>
                }
              />
              <div data-scroller="recent" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
                {recent.length ? (
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {recent.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          data-recording={r.id}
                          onClick={() => onOpenRecording(r.id)}
                          title={`Open ${r.title}`}
                          className="border-line hover:bg-sunken flex w-full items-center gap-3 rounded-[14px] border px-3 py-2.5 text-left transition-colors"
                        >
                          <span
                            aria-hidden="true"
                            className={cx(
                              'grid h-9 w-9 shrink-0 place-items-center rounded-full',
                              r.watched ? 'bg-sunken text-muted' : 'bg-accent-deep text-accent-fg',
                            )}
                          >
                            <Icon name="play" size={14} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="text-ink block truncate text-[12.5px] font-bold">
                              {r.title}
                            </span>
                            <span className="text-muted tnum block truncate text-[10.5px]">
                              {r.topic} · {r.date} · {asMinutes(r.seconds)} ·{' '}
                              {memberOf(r.ownerId).name}
                            </span>
                          </span>
                          <Waveform
                            bars={waveform(r.id).slice(0, 28)}
                            played={r.watched ? 1 : 0}
                            w={92}
                            h={26}
                            label={`${r.title}, ${asMinutes(r.seconds)}`}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty what="recording" query={query} />
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="week" className="shrink-0 p-5">
            <CardHead title={WORKSPACE.month} note="Pick a day to read its hours" />
            {/*
              The reference's week strip has one day boxed and nothing happens
              when another is picked. This one drives the figure under it.
            */}
            <ul className="m-0 mt-3 grid list-none grid-cols-6 gap-1.5 p-0">
              {WEEK.map((d, i) => (
                <li key={d.day}>
                  <button
                    type="button"
                    data-day={d.date}
                    aria-pressed={day === i}
                    onClick={() => setDay(i)}
                    className={cx(
                      'w-full rounded-[13px] py-2.5 text-center transition-colors',
                      day === i
                        ? 'bg-panel text-panel-fg'
                        : 'text-muted hover:bg-sunken hover:text-ink',
                    )}
                  >
                    <span className="block text-[10.5px]">{d.day}</span>
                    <span className="tnum mt-1 block text-[15px] font-bold">{d.date}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-line mt-3 flex items-baseline justify-between gap-2 border-t pt-3">
              <span className="text-muted text-[11.5px]">
                {WEEK[day].day} {WEEK[day].date} {WORKSPACE.month.split(' ')[0]}
              </span>
              <span className="tnum text-ink text-[14px] font-bold">
                {asHours(WEEK[day].calls + WEEK[day].focus + WEEK[day].async)}
              </span>
            </div>
          </Card>

          <Card pane="notices" className="min-h-0 flex-1 p-5">
            <CardHead
              title="Notifications"
              note={`${notices.length} of ${noticesFor('all').length}`}
              action={
                <span
                  aria-hidden="true"
                  title="Notifications are on"
                  className="border-line text-muted grid h-8 w-8 place-items-center rounded-full border"
                >
                  <Icon name="bell" size={14} />
                </span>
              }
            />
            <div className="mt-3 shrink-0">
              <Segmented
                name="lens"
                size="sm"
                value={lens}
                options={NOTICE_LENSES}
                onChange={(id) => setLens(id)}
                className="w-full"
              />
            </div>
            <div data-scroller="notices" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
              {notices.length ? (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {notices.map((n) => {
                    const who = memberOf(n.memberId);
                    return (
                      <li key={n.id}>
                        <button
                          type="button"
                          data-notice={n.id}
                          onClick={() =>
                            n.recordingId ? onOpenRecording(n.recordingId) : onOpenTeam()
                          }
                          title={
                            n.recordingId
                              ? `Open ${recordingOf(n.recordingId).title}`
                              : 'Open the team board'
                          }
                          className="border-line hover:bg-sunken w-full rounded-[14px] border p-3 text-left transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <img
                              src={who.face}
                              alt=""
                              width={30}
                              height={30}
                              className="bg-sunken h-[30px] w-[30px] shrink-0 rounded-full object-cover"
                            />
                            <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-bold">
                              {who.name}
                            </span>
                            <span
                              aria-hidden="true"
                              className="bg-accent-faint text-accent-deep grid h-7 w-7 shrink-0 place-items-center rounded-full"
                            >
                              <Icon name={NOTICE_ICON[n.kind]} size={13} />
                            </span>
                          </span>
                          <span className="text-body mt-1.5 block text-[11.5px] leading-[16px]">
                            {n.body}
                            {n.recordingId ? (
                              <span className="text-ink font-semibold">
                                {' '}
                                on “{recordingOf(n.recordingId).title}”
                              </span>
                            ) : null}
                          </span>
                          <span className="text-muted mt-1.5 flex items-center gap-2 text-[10.5px] capitalize">
                            {n.kind}
                            <span className="ml-auto">{n.ago}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Empty what="notification" query={query || lens} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
