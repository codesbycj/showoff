import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { FLAG_ICON } from '@/lib/flags';
import {
  NURSES,
  PATIENTS,
  SHIFT,
  STATE_TONE,
  TASKS,
  WARD,
  assignedHours,
  bandOf,
  loadOf,
  nurseOf,
  patientsOf,
  score,
  taskNurse,
  tasksOf,
  unassignedHours,
  type Band,
  type Nurse,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const BAND_DOT: Record<Band, string> = {
  low: 'var(--color-band-low)',
  medium: 'var(--color-band-mid)',
  high: 'var(--color-band-high)',
};

const LENSES = [
  { id: 'load', label: 'By care hours' },
  { id: 'name', label: 'By name' },
  { id: 'escalating', label: 'Escalating first' },
];

/**
 * Assignments — who is looking after whom, and whether that is sustainable.
 *
 * Assembly only (rule 4). The reference's nav has a Schedules destination and
 * the picture never shows it; this is what it holds. A nurse's load is the sum
 * of their patients' acuity hours against the hours the roster gives them,
 * which
 * is the one number that decides whether the next admission can be taken.
 */
export function AssignmentsPane({
  query,
  onOpenPatient,
}: {
  query: string;
  onOpenPatient: (id: string) => void;
}) {
  const [lens, setLens] = useState('load');
  const [open, setOpen] = useState<string | null>('n2');

  const q = query.trim().toLowerCase();
  const nurses = NURSES.slice()
    .filter((n) =>
      q
        ? (
            n.name +
            ' ' +
            patientsOf(n.id)
              .map((p) => p.name)
              .join(' ')
          )
            .toLowerCase()
            .includes(q)
        : true,
    )
    .sort((a, b) =>
      lens === 'load'
        ? loadOf(b.id) - loadOf(a.id)
        : lens === 'escalating'
          ? escalatingOf(b.id) - escalatingOf(a.id)
          : a.name.localeCompare(b.name),
    );

  const covered = NURSES.reduce((t, n) => t + assignedHours(n.id), 0);
  const rostered = NURSES.reduce((t, n) => t + n.capacity, 0);

  return (
    <div data-pane="assignments" className="flex h-full flex-col">
      <PageHead
        title="Assignments"
        note={`${SHIFT.name}, ${SHIFT.start}–${SHIFT.end}. Care hours against the roster.`}
        action={
          <Segmented name="lens" value={lens} options={LENSES} onChange={(id) => setLens(id)} />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <Stat k="Care hours needed" v={`${covered}h`} note="sum of every patient's acuity" />
        <Stat k="Hours rostered" v={`${rostered}h`} note={`${NURSES.length} staff on the board`} />
        <Stat
          k="Spare capacity"
          v={`${unassignedHours()}h`}
          note="before the ward is at its limit"
          tone={unassignedHours() < 4 ? 'danger' : 'positive'}
        />
        <Stat
          k="Patients per nurse"
          v={(PATIENTS.length / NURSES.filter((n) => n.state !== 'late start').length).toFixed(1)}
          note={`${PATIENTS.length} patients on ${WARD.ward.split(' · ')[0]}`}
        />
      </ul>

      <Card pane="board" className="min-h-0 flex-1 p-5">
        <CardHead
          title="The board"
          note="One row per nurse. Open a row for the beds they hold."
          icon={<Icon name="people" size={16} />}
          action={
            <Badge>
              {nurses.length} of {NURSES.length}
            </Badge>
          }
        />
        <div data-scroller="board" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
          {nurses.length ? (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {nurses.map((n) => (
                <li key={n.id}>
                  <NurseRow
                    nurse={n}
                    open={open === n.id}
                    onToggle={() => setOpen(open === n.id ? null : n.id)}
                    onOpenPatient={onOpenPatient}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="nurse" query={query} />
          )}
        </div>
      </Card>
    </div>
  );
}

const escalatingOf = (nurseId: string) =>
  patientsOf(nurseId).filter((p) => bandOf(score(p.obs)) !== 'low').length;

function Stat({
  k,
  v,
  note,
  tone,
}: {
  k: string;
  v: string;
  note: string;
  tone?: 'positive' | 'danger';
}) {
  return (
    <li className="border-line bg-surface rounded-[var(--radius-card)] border p-5 shadow-[var(--shadow-card)]">
      <span className="text-muted block text-[12.5px]">{k}</span>
      <span
        className={cx(
          'tnum mt-2 block text-[26px] leading-none font-extrabold tracking-[-0.03em]',
          tone === 'positive' ? 'text-positive' : tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {v}
      </span>
      <span className="text-muted mt-2 block truncate text-[11.5px]">{note}</span>
    </li>
  );
}

function NurseRow({
  nurse: n,
  open,
  onToggle,
  onOpenPatient,
}: {
  nurse: Nurse;
  open: boolean;
  onToggle: () => void;
  onOpenPatient: (id: string) => void;
}) {
  const mine = patientsOf(n.id);
  const load = loadOf(n.id);
  const over = load > 100;
  const openTasks = tasksOf(n.id).filter((t) => t.state !== 'done').length;

  return (
    <div
      className={cx(
        'rounded-[14px] border transition-colors',
        open ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <button
        type="button"
        data-nurse={n.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <img
          src={n.face}
          alt=""
          width={38}
          height={38}
          className="bg-sunken h-[38px] w-[38px] shrink-0 rounded-full object-cover"
        />
        <span className="w-[190px] shrink-0">
          <span className="text-ink block truncate text-[13px] font-bold">{n.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{n.role}</span>
        </span>

        <Badge tone={STATE_TONE[n.state]}>{n.state}</Badge>

        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="tnum text-muted text-[11px]">
              {assignedHours(n.id)}h of {n.capacity}h · {mine.length} patients
            </span>
            <span className={cx('tnum text-[11.5px] font-bold', over ? 'text-danger' : 'text-ink')}>
              {load.toFixed(0)}%
            </span>
          </span>
          <span className="mt-1.5 block">
            <Meter value={Math.min(100, load)} height={8} tone={over ? 'over' : 'accent'} />
          </span>
        </span>

        <span className="flex w-[110px] shrink-0 items-center justify-end gap-1.5">
          {mine.map((p) => (
            <span
              key={p.id}
              aria-hidden="true"
              title={`${p.bed} scores ${score(p.obs)}`}
              style={{ background: BAND_DOT[bandOf(score(p.obs))] }}
              className="h-2.5 w-2.5 shrink-0 rounded-full"
            />
          ))}
        </span>

        <span className="tnum text-muted w-[72px] shrink-0 text-right text-[11.5px]">
          {openTasks} to do
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
        <div className="border-line border-t px-4 py-3">
          {mine.length ? (
            <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0">
              {mine.map((p) => {
                const s = score(p.obs);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      data-bed={p.id}
                      onClick={() => onOpenPatient(p.id)}
                      title={`Open ${p.name}`}
                      className="border-line w-full rounded-[11px] border bg-white px-3 py-2 text-left transition-colors hover:border-[var(--color-accent-soft)]"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          style={{ background: BAND_DOT[bandOf(s)] }}
                          className="h-2 w-2 shrink-0 rounded-full"
                        />
                        <span className="tnum text-ink shrink-0 text-[11.5px] font-bold">
                          {p.bed}
                        </span>
                        <span className="tnum text-muted ml-auto shrink-0 text-[11px]">
                          {p.acuity}h
                        </span>
                      </span>
                      <span className="text-ink mt-1 block truncate text-[12px] font-semibold">
                        {p.name}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5">
                        <span className="tnum text-muted text-[10.5px]">score {s}</span>
                        {p.flags.slice(0, 2).map((f) => (
                          <span key={f} title={f} aria-label={f} className="text-muted">
                            <Icon name={FLAG_ICON[f]} size={11} />
                          </span>
                        ))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-muted m-0 py-2 text-[12px]">
              No beds held. {n.name.split(' ')[0]} is the float for this shift.
            </p>
          )}
          <p className="text-muted m-0 mt-2.5 text-[11.5px]">
            {openTasks} of {tasksOf(n.id).length} tasks still open this shift
            {nurseOf(n.id).state === 'on break' ? ' · covered while on break' : ''}
            {TASKS.filter((t) => taskNurse(t) === n.id && t.state === 'overdue').length
              ? ' · one is overdue'
              : ''}
          </p>
        </div>
      ) : null}
    </div>
  );
}
