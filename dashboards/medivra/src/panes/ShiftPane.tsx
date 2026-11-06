import { useState } from 'react';

import { Ring } from '@/charts/Ring';
import { TrendArea } from '@/charts/TrendArea';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  BANDS,
  NOTES,
  NURSES,
  PATIENTS,
  RECOVERY_TARGET,
  SHIFT,
  STATE_TONE,
  TASKS,
  TASK_TONE,
  WARD,
  assignedHours,
  bandCount,
  bandOf,
  census,
  discharges,
  escalating,
  loadOf,
  nurseOf,
  taskNurse,
  patientOf,
  recoveryTrend,
  score,
  shiftProgress,
  shiftRemaining,
  stable,
  taskCount,
  taskProgress,
  type Band,
  type Task,
} from '@/data/deck';
import { cx } from '@/lib/cx';

const LENSES = [
  { id: 'open', label: 'Still to do' },
  { id: 'done', label: 'Done' },
  { id: 'all', label: 'All' },
];

/**
 * Dashboard — the dropped screen, rebuilt as a nursing shift board.
 *
 * Assembly only (rule 4). What the reference leaves out and a ward cannot run
 * without: an escalation score per patient with the band it falls in, a task
 * list that is this shift's actual work rather than one appointment repeated
 * five times, and a handover panel where the picture puts an AI credits
 * upsell.
 */
export function ShiftPane({
  query,
  onOpenPatient,
}: {
  query: string;
  onOpenPatient: (id: string) => void;
}) {
  const [lens, setLens] = useState('open');
  const [band, setBand] = useState<Band | null>(null);

  const q = query.trim().toLowerCase();
  const tasks = TASKS.filter((t) =>
    lens === 'done' ? t.state === 'done' : lens === 'open' ? t.state !== 'done' : true,
  )
    .filter((t) => (band ? bandOf(score(patientOf(t.patientId).obs)) === band : true))
    .filter((t) =>
      q ? (patientOf(t.patientId).name + ' ' + t.what).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) => a.at.localeCompare(b.at));

  const onShift = NURSES.filter((n) => n.state !== 'late start');

  return (
    <div data-pane="shift" className="flex h-full flex-col">
      <PageHead
        title="Today's nursing"
        note="Patient care, medications, vital checks and shift tasks in one place."
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_300px_320px] gap-4">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="overview" className="shrink-0 p-5">
            <CardHead
              title="Patient care overview"
              note={`${WARD.beds} beds · ${census()} occupied`}
              action={
                <Badge tone={taskCount('overdue') ? 'danger' : 'positive'} dot>
                  {taskCount('overdue')} overdue
                </Badge>
              }
            />

            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-muted text-[12px]">Shift tasks complete</span>
                <span className="tnum text-ink text-[12.5px] font-bold">
                  {taskCount('done')} of {TASKS.length}
                </span>
              </div>
              <div className="mt-2">
                <Meter value={taskProgress()} height={10} />
              </div>
              <div className="text-muted tnum mt-1.5 flex justify-between text-[10.5px]">
                <span>0%</span>
                <span>{taskProgress().toFixed(0)}% done</span>
                <span>100%</span>
              </div>
            </div>

            {/*
              Four counts off one list, so they add up. The reference's read
              128 / 86 / 12 / 24, which leaves thirty patients in no category.
            */}
            <ul className="m-0 mt-4 grid list-none grid-cols-4 gap-3 p-0">
              <Counter
                label="On the ward"
                value={census()}
                total={WARD.beds}
                caption={`of ${WARD.beds} beds`}
              />
              <Counter
                label="Stable"
                value={stable()}
                total={census()}
                caption={`of ${census()} patients`}
                tone="band-low"
              />
              <Counter
                label="Escalating"
                value={escalating()}
                total={census()}
                caption="score 5 or above"
                tone="band-high"
              />
              <Counter
                label="Discharges"
                value={discharges()}
                total={census()}
                caption="planned today"
                tone="band-mid"
              />
            </ul>
          </Card>

          <Card pane="tasks" className="min-h-0 flex-1 p-5">
            <CardHead
              title="Due this shift"
              note={
                band
                  ? `Filtered to patients scoring ${BANDS.find((b) => b.id === band)?.label.replace('Score ', '')}`
                  : 'Medications, observations, assessments and personal care'
              }
              icon={<Icon name="clock" size={16} />}
              action={
                <>
                  <Segmented
                    name="lens"
                    size="sm"
                    value={lens}
                    options={LENSES}
                    onChange={(id) => setLens(id)}
                  />
                  <Badge>
                    {tasks.length} of {TASKS.length}
                  </Badge>
                </>
              }
            />
            <div data-scroller="tasks" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
              {tasks.length ? (
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {tasks.map((t) => (
                    <li key={t.id}>
                      <TaskRow task={t} onOpen={() => onOpenPatient(t.patientId)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty what="task" query={query || lens} />
              )}
            </div>
          </Card>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="bands" className="shrink-0 p-5">
            <CardHead title="Escalation" note="By aggregate observation score" />
            {/*
              The band is a filter, not a legend: clicking one narrows the
              task list beside it, which is what a nurse in charge does with
              this number.
            */}
            <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
              {BANDS.map((b) => {
                const count = bandCount(b.id);
                const on = band === b.id;
                return (
                  <li key={b.id}>
                    <button
                      type="button"
                      data-band={b.id}
                      aria-pressed={on}
                      onClick={() => setBand(on ? null : b.id)}
                      className={cx(
                        'w-full rounded-[12px] border px-3 py-2.5 text-left transition-colors',
                        on ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          style={{
                            background: `var(--color-band-${b.id === 'medium' ? 'mid' : b.id})`,
                          }}
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                        />
                        <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-bold">
                          {b.label}
                        </span>
                        <span className="tnum text-ink shrink-0 text-[16px] font-extrabold">
                          {count}
                        </span>
                      </span>
                      <span className="text-muted mt-1 block truncate text-[11px]">
                        {b.action} · {b.every}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card pane="trend" className="min-h-0 flex-1 p-5">
            <CardHead
              title={`${((bandCount('low') / PATIENTS.length) * 100).toFixed(0)}% in band 0–4`}
              note={`Target ${RECOVERY_TARGET}% · dashed line`}
            />
            <div className="mt-3 flex min-h-0 flex-1">
              <TrendArea
                points={recoveryTrend()}
                target={RECOVERY_TARGET}
                label="Share of the ward scoring 0 to 4, hour by hour through the shift, against the ward's target"
              />
            </div>
          </Card>

          <Card pane="shift" className="shrink-0 p-5">
            <CardHead title="Shift info" note={`${SHIFT.name} · ${SHIFT.start}–${SHIFT.end}`} />
            <div className="mt-3">
              <Meter value={shiftProgress()} height={8} />
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <span className="tnum text-ink text-[12.5px] font-bold">
                  {shiftProgress().toFixed(0)}% elapsed
                </span>
                {/* Derived from the same clock as the percentage, so the two
                    cannot disagree the way the reference's do. */}
                <span className="tnum text-muted text-[11.5px]">{shiftRemaining()} remaining</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="staff" className="shrink-0 p-5">
            <CardHead
              title="Nurses on the ward"
              note={`${onShift.length} of ${NURSES.length} on shift · hours against the roster`}
            />
            <ul className="m-0 mt-2.5 flex list-none flex-col gap-2 p-0">
              {NURSES.map((n) => (
                <li key={n.id}>
                  <span className="flex items-center gap-2.5">
                    <img
                      src={n.face}
                      alt=""
                      width={28}
                      height={28}
                      className="bg-sunken h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[12px] font-bold">
                        {n.name}
                      </span>
                      <span className="text-muted block truncate text-[10.5px]">{n.role}</span>
                    </span>
                    <Badge tone={STATE_TONE[n.state]}>{n.state}</Badge>
                  </span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <span className="min-w-0 flex-1">
                      <Meter
                        value={Math.min(100, loadOf(n.id))}
                        height={5}
                        tone={loadOf(n.id) > 100 ? 'over' : 'accent'}
                      />
                    </span>
                    <span className="tnum text-muted shrink-0 text-[10px]">
                      {assignedHours(n.id)}h of {n.capacity}h
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card pane="handover" className="min-h-0 flex-1 p-5">
            {/*
              The reference gives this slot to an AI assistant selling credits
              and asking about heart-rate variability, which is a consumer
              wearable's metric and not a nursing one. A ward's fourth panel is
              the handover: the artefact the next shift cannot start without.
            */}
            <CardHead
              title="Handover notes"
              note="Written this shift, carried to the next"
              icon={<Icon name="note" size={16} />}
            />
            <div data-scroller="notes" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {NOTES.map((n) => {
                  const patient = patientOf(n.patientId);
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        data-note={n.id}
                        onClick={() => onOpenPatient(n.patientId)}
                        title={`Open ${patient.name}`}
                        className="border-line hover:bg-sunken w-full rounded-[12px] border p-3 text-left transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="tnum text-ink shrink-0 text-[11.5px] font-bold">
                            {patient.bed}
                          </span>
                          <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                            {patient.name}
                          </span>
                          <span className="tnum text-muted shrink-0 text-[10.5px]">{n.at}</span>
                        </span>
                        <span className="text-body mt-1.5 block text-[11.5px] leading-[16px]">
                          {n.body}
                        </span>
                        <span className="text-muted mt-1.5 block truncate text-[10.5px]">
                          {nurseOf(n.nurseId).name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Counter({
  label,
  value,
  total,
  caption,
  tone = 'accent',
}: {
  label: string;
  value: number;
  total: number;
  caption: string;
  tone?: 'accent' | 'band-low' | 'band-mid' | 'band-high';
}) {
  return (
    <li className="border-line bg-sunken flex items-center gap-3 rounded-[14px] border p-3">
      <Ring value={value} total={total} tone={tone} label={`${value} ${label}, of ${total}`} />
      <span className="min-w-0">
        <span className="tnum text-ink block text-[20px] leading-none font-extrabold">{value}</span>
        <span className="text-ink mt-1 block truncate text-[11.5px] font-semibold">{label}</span>
        <span className="text-muted mt-0.5 block truncate text-[10.5px]">{caption}</span>
      </span>
    </li>
  );
}

function TaskRow({ task: t, onOpen }: { task: Task; onOpen: () => void }) {
  const patient = patientOf(t.patientId);
  const kind: Record<Task['kind'], 'pill' | 'heart' | 'stethoscope' | 'people'> = {
    medication: 'pill',
    observations: 'heart',
    assessment: 'stethoscope',
    'personal care': 'people',
  };
  return (
    <button
      type="button"
      data-task={t.id}
      onClick={onOpen}
      title={`Open ${patient.name}`}
      className={cx(
        'flex w-full items-center gap-3 rounded-[12px] border px-3 py-2 text-left transition-colors',
        t.state === 'overdue' ? 'border-danger bg-danger-soft' : 'border-line hover:bg-sunken',
      )}
    >
      <span className="tnum text-ink w-[40px] shrink-0 text-[12px] font-bold">{t.at}</span>
      <span
        aria-hidden="true"
        className="bg-accent-faint text-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-[10px]"
      >
        <Icon name={kind[t.kind]} size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-ink block truncate text-[12.5px] font-semibold">{t.what}</span>
        <span className="text-muted tnum block truncate text-[11px]">
          {patient.bed} · {patient.name} · {nurseOf(taskNurse(t)).name}
        </span>
      </span>
      <Badge tone={TASK_TONE[t.state]}>{t.state}</Badge>
    </button>
  );
}
