import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead, Search } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  MEMBERS,
  PROJECTS,
  PROJECT_TONE,
  RECORDINGS,
  ROLES,
  SPLIT,
  STATE_TONE,
  asHours,
  asMinutes,
  memberHours,
  projectProgress,
  totalHours,
  type Member,
} from '@/data/deck';
import { cx } from '@/lib/cx';

type SortKey = 'hours' | 'calls' | 'focus' | 'name';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'hours', label: 'Most hours' },
  { id: 'calls', label: 'Most in calls' },
  { id: 'focus', label: 'Most focus time' },
  { id: 'name', label: 'By name' },
];

/**
 * Team — who is doing what, and whether the balance is right.
 *
 * Assembly only (rule 4). The reference's Members card is six faces with
 * nothing behind them. This is what a lead opens it for: where everyone is,
 * how their week divides, what they lead and what they recorded.
 */
export function TeamPane({
  query,
  onQuery,
  onOpenRecording,
}: {
  query: string;
  onQuery: (next: string) => void;
  onOpenRecording: (id: string) => void;
}) {
  const [role, setRole] = useState<'all' | (typeof ROLES)[number]>('all');
  const [sort, setSort] = useState<SortKey>('hours');
  const [open, setOpen] = useState<string | null>('m1');

  const q = query.trim().toLowerCase();
  const rows = MEMBERS.filter((m) => (role === 'all' ? true : m.role === role))
    .filter((m) => (q ? (m.name + ' ' + m.role).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'name'
        ? a.name.localeCompare(b.name)
        : sort === 'calls'
          ? b.calls - a.calls
          : sort === 'focus'
            ? b.focus - a.focus
            : memberHours(b) - memberHours(a),
    );

  const inCall = MEMBERS.filter((m) => m.state === 'in a call').length;
  const focusing = MEMBERS.filter((m) => m.state === 'focusing').length;

  return (
    <div data-pane="team" className="flex h-full flex-col">
      <PageHead
        title="Team"
        note={`${MEMBERS.length} people · ${asHours(totalHours())} this week · ${inCall} in a call, ${focusing} focusing`}
        action={
          <>
            <Search value={query} onChange={onQuery} />
            <Segmented
              name="sort"
              value={sort}
              options={SORTS}
              onChange={(id) => setSort(id as SortKey)}
            />
          </>
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-5 gap-3 p-0">
        <RoleTile
          id="all"
          label="Everyone"
          count={MEMBERS.length}
          active={role === 'all'}
          onPick={() => setRole('all')}
        />
        {ROLES.map((r) => (
          <RoleTile
            key={r}
            id={r}
            label={r}
            count={MEMBERS.filter((m) => m.role === r).length}
            active={role === r}
            onPick={() => setRole(role === r ? 'all' : r)}
          />
        ))}
      </ul>

      <Card pane="board" className="min-h-0 flex-1 p-5">
        <CardHead
          title={role === 'all' ? 'Everyone' : role}
          note="Open a row for the week, the projects and the recordings"
          action={
            <Badge>
              {rows.length} of {MEMBERS.length}
            </Badge>
          }
        />
        <div data-scroller="board" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
          {rows.length ? (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {rows.map((m) => (
                <li key={m.id}>
                  <MemberRow
                    member={m}
                    open={open === m.id}
                    onToggle={() => setOpen(open === m.id ? null : m.id)}
                    onOpenRecording={onOpenRecording}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="person" query={query || role} />
          )}
        </div>
      </Card>
    </div>
  );
}

function RoleTile({
  id,
  label,
  count,
  active,
  onPick,
}: {
  id: string;
  label: string;
  count: number;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        data-role={id.toLowerCase()}
        aria-pressed={active}
        onClick={onPick}
        className={cx(
          'w-full rounded-[18px] border px-4 py-3 text-left transition-colors',
          active
            ? 'border-accent-deep bg-accent-faint'
            : 'border-line bg-surface hover:bg-sunken shadow-[var(--shadow-card)]',
        )}
      >
        <span className="text-muted block truncate text-[12px]">{label}</span>
        <span className="tnum text-ink mt-1.5 block text-[22px] leading-none font-extrabold tracking-[-0.03em]">
          {count}
        </span>
      </button>
    </li>
  );
}

function MemberRow({
  member: m,
  open,
  onToggle,
  onOpenRecording,
}: {
  member: Member;
  open: boolean;
  onToggle: () => void;
  onOpenRecording: (id: string) => void;
}) {
  const hours = memberHours(m);
  const leads = PROJECTS.filter((p) => p.leadId === m.id);
  const mine = RECORDINGS.filter((r) => r.ownerId === m.id);

  return (
    <div
      className={cx(
        'rounded-[18px] border transition-colors',
        open ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <button
        type="button"
        data-member={m.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <img
          src={m.face}
          alt=""
          width={40}
          height={40}
          className="bg-sunken h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <span className="w-[190px] shrink-0">
          <span className="text-ink block truncate text-[13.5px] font-bold">{m.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{m.role}</span>
        </span>

        <Badge tone={STATE_TONE[m.state]}>{m.state}</Badge>

        {/* One bar per person, split the same three ways as the week. */}
        <span className="min-w-0 flex-1">
          <span className="bg-sunken flex h-2.5 overflow-hidden rounded-full">
            {SPLIT.map((s) => (
              <span
                key={s.id}
                style={{ width: `${(m[s.id] / hours) * 100}%`, background: `var(${s.token})` }}
                className="block h-full"
              />
            ))}
          </span>
          <span className="tnum text-muted mt-1 block text-[10.5px]">
            {SPLIT.map((s) => `${s.label.toLowerCase()} ${asHours(m[s.id])}`).join(' · ')}
          </span>
        </span>

        <span className="tnum text-ink w-[72px] shrink-0 text-right text-[13px] font-bold">
          {asHours(hours)}
        </span>

        <Icon
          name="chevron-down"
          size={14}
          strokeWidth={2.2}
          className={cx(
            'text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div className="border-line grid grid-cols-2 gap-4 border-t px-4 py-3">
          <div>
            <span className="text-muted block text-[11px]">
              Leads {leads.length} {leads.length === 1 ? 'project' : 'projects'}
            </span>
            <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
              {leads.length ? (
                leads.map((p) => (
                  <li key={p.id}>
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
                      <span className="tnum text-muted shrink-0 text-[10.5px]">due {p.due}</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-muted text-[11.5px]">
                  Nothing of their own this cycle — {m.name.split(' ')[0]} is on{' '}
                  {RECORDINGS.filter((r) => r.attendees.includes(m.id)).length} other calls.
                </li>
              )}
            </ul>
          </div>

          <div>
            <span className="text-muted block text-[11px]">
              Recorded {mine.length} {mine.length === 1 ? 'session' : 'sessions'}
            </span>
            <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
              {mine.length ? (
                mine.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      data-session={r.id}
                      onClick={() => onOpenRecording(r.id)}
                      title={`Open ${r.title}`}
                      className="border-line flex w-full items-center gap-2.5 rounded-[11px] border bg-white px-3 py-2 text-left transition-colors hover:border-[var(--color-accent-soft)]"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-accent-faint text-accent-deep grid h-7 w-7 shrink-0 place-items-center rounded-full"
                      >
                        <Icon name="play" size={12} />
                      </span>
                      <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                        {r.title}
                      </span>
                      <span className="tnum text-muted shrink-0 text-[10.5px]">
                        {asMinutes(r.seconds)}
                      </span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-muted text-[11.5px]">No recordings of their own yet.</li>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
