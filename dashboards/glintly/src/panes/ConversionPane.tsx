import { useMemo, useState } from 'react';

import { Funnel } from '@/charts/Funnel';
import { Badge, Card, CardHead, Delta, Empty, Meter } from '@/components/Bits';
import { SearchBox, Segmented, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  GOALS,
  SEGMENTS,
  funnelFor,
  funnelRate,
  goalValue,
  stepRate,
  type Goal,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type GoalSort = 'completions' | 'share' | 'value';

const GOAL_SORTS: { id: GoalSort; label: string }[] = [
  { id: 'completions', label: 'Most completions' },
  { id: 'share', label: 'Closest to target' },
  { id: 'value', label: 'Highest value' },
];

const share = (g: Goal) => Math.round((g.completions / g.target) * 1000) / 10;

/**
 * Conversion. Assembly only (rule 4).
 *
 * The funnel and the goals are two views of one deck: sign-up, verify, trial
 * and paid appear in both, and both read the same figures — so a viewer who
 * compares the two cards on screen finds them agreeing.
 */
export function ConversionPane() {
  const [segmentId, setSegmentId] = useState(SEGMENTS[0].id);
  const [step, setStep] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<GoalSort>('completions');
  const [openGoal, setOpenGoal] = useState<string | null>(null);

  const steps = useMemo(() => funnelFor(segmentId), [segmentId]);
  const segment = SEGMENTS.find((s) => s.id === segmentId) ?? SEGMENTS[0];
  const rate = funnelRate(steps);
  const index = steps.findIndex((s) => s.id === step);
  const current = index >= 0 ? steps[index] : null;

  const q = query.trim().toLowerCase();
  const goals = GOALS.filter((g) => (q ? (g.label + ' ' + g.note).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'completions'
        ? b.completions - a.completions
        : sort === 'share'
          ? share(b) - share(a)
          : b.value - a.value || b.completions - a.completions,
    );

  return (
    <div data-pane="conversion" className="grid h-full grid-cols-[1.08fr_1fr] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="rate" className="shrink-0 p-4">
          <dl className="m-0 grid grid-cols-3 gap-4">
            <div data-stat="rate">
              <dt className="text-muted m-0 text-[12px]">End-to-end rate</dt>
              <dd className="m-0 mt-1.5 flex items-baseline gap-2">
                <span className="tnum text-ink text-[26px] leading-none font-bold tracking-[-0.03em]">
                  {rate}%
                </span>
                <Delta value={0.42} />
              </dd>
            </div>
            <div data-stat="paid" className="border-line border-l pl-4">
              <dt className="text-muted m-0 text-[12px]">Paid · {segment.label}</dt>
              <dd className="tnum text-ink m-0 mt-1.5 text-[26px] leading-none font-bold tracking-[-0.03em]">
                {num(steps[steps.length - 1].users)}
              </dd>
            </div>
            <div data-stat="value" className="border-line border-l pl-4">
              <dt className="text-muted m-0 text-[12px]">Goal value</dt>
              <dd className="tnum text-ink m-0 mt-1.5 text-[26px] leading-none font-bold tracking-[-0.03em]">
                {usd(goalValue())}
              </dd>
            </div>
          </dl>
        </Card>

        <Card pane="funnel" className="min-h-0 flex-1 p-4">
          <CardHead
            title="Conversion funnel"
            action={
              <Segmented
                name="segment"
                size="sm"
                value={segmentId}
                options={SEGMENTS.map((s) => ({ id: s.id, label: s.label }))}
                onChange={setSegmentId}
              />
            }
          />

          <div className="mt-3 flex min-h-0 flex-1 gap-4">
            <div className="flex min-h-0 w-[46%] shrink-0 flex-col">
              <Funnel
                bands={steps}
                active={step}
                onActive={setStep}
                label={
                  'Conversion funnel, ' +
                  segment.label.toLowerCase() +
                  ': ' +
                  steps.map((s) => `${s.label} ${num(s.users)}`).join(', ')
                }
              />
            </div>

            <ul className="m-0 flex min-h-0 flex-1 list-none flex-col p-0">
              {steps.map((s, i) => (
                <li key={s.id} className="flex min-h-0 flex-1 items-center">
                  <button
                    type="button"
                    data-step={s.id}
                    aria-pressed={step === s.id}
                    onClick={() => setStep(step === s.id ? null : s.id)}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors',
                      step === s.id
                        ? 'border-accent bg-accent-faint'
                        : 'hover:bg-sunken border-transparent',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      style={{ background: `var(--color-funnel-${i})` }}
                      className="h-7 w-[6px] shrink-0 rounded-full"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[13px] font-semibold">
                        {s.label}
                      </span>
                      <span className="tnum text-muted mt-0.5 block text-[11.5px]">
                        {num(s.users)} users
                      </span>
                    </span>
                    <span className="tnum text-body shrink-0 text-[12.5px] font-semibold">
                      {i === 0 ? '—' : stepRate(steps, i) + '%'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="border-line text-body m-0 mt-3 shrink-0 border-t pt-3 text-[12.5px]">
            {current && index > 0 ? (
              <>
                <span className="text-ink font-semibold">{num(current.users)}</span>{' '}
                {current.label.toLowerCase()} — {stepRate(steps, index)}% of the step before, and{' '}
                {Math.round((current.users / steps[0].users) * 1000) / 10}% of all{' '}
                {segment.label.toLowerCase()}.
              </>
            ) : (
              <>
                <span className="text-ink font-semibold">{num(steps[steps.length - 1].users)}</span>{' '}
                of {num(steps[0].users)} {segment.label.toLowerCase()} paid — {rate}% end to end.
                Press a band for its own figures.
              </>
            )}
          </p>
        </Card>
      </div>

      <Card pane="goals" className="min-h-0 p-4">
        <CardHead
          title="Goals and targets"
          action={
            <SelectPill
              name="goal-sort"
              value={sort}
              options={GOAL_SORTS}
              onChange={(id) => setSort(id)}
            />
          }
        />

        <div className="mt-3 flex shrink-0 items-center gap-2.5">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search goals"
            className="min-w-0 flex-1"
          />
          <Badge>
            {goals.length} of {GOALS.length}
          </Badge>
        </div>

        <div data-scroller="goals" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
          {goals.length ? (
            <ul className="m-0 flex min-h-full list-none flex-col gap-1.5 p-0">
              {goals.map((g) => {
                const open = openGoal === g.id;
                return (
                  /*
                     `basis-auto`, not `basis-0`: with a zero basis the row's
                     height is decided by the free space alone, so an expanded
                     row — or just a row whose two lines need more than its
                     share — paints straight through its own border. Auto
                     means the content is the floor and the growth is on top.
                  */
                  <li key={g.id} className="flex min-h-[74px] shrink-0 grow basis-auto">
                    <button
                      type="button"
                      data-row={g.id}
                      aria-expanded={open}
                      onClick={() => setOpenGoal(open ? null : g.id)}
                      className={cx(
                        'w-full rounded-xl border px-3 py-2.5 text-left transition-colors',
                        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[13px] font-semibold">
                            {g.label}
                          </span>
                          <span className="text-muted mt-0.5 block truncate text-[11.5px]">
                            {g.note}
                          </span>
                        </span>
                        <span className="tnum text-ink shrink-0 text-[13px] font-bold">
                          {num(g.completions)}
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
                      </span>

                      <span className="mt-2.5 flex items-center gap-3">
                        <Meter value={share(g)} className="min-w-0 flex-1" />
                        <span className="tnum text-muted shrink-0 text-[11.5px] font-semibold">
                          {share(g)}% of {num(g.target)}
                        </span>
                      </span>

                      {open ? (
                        <span className="border-line mt-2.5 block border-t pt-2.5">
                          <span className="grid grid-cols-3 gap-3">
                            <span className="block">
                              <span className="text-muted block text-[11px]">Remaining</span>
                              <span className="tnum text-ink mt-1 block text-[13px] font-bold">
                                {num(Math.max(0, g.target - g.completions))}
                              </span>
                            </span>
                            <span className="block">
                              <span className="text-muted block text-[11px]">Worth</span>
                              <span className="tnum text-ink mt-1 block text-[13px] font-bold">
                                {g.value ? usd(g.value) : 'No price'}
                              </span>
                            </span>
                            <span className="block">
                              <span className="text-muted block text-[11px]">Per completion</span>
                              <span className="tnum text-ink mt-1 block text-[13px] font-bold">
                                {g.value ? usd(Math.round(g.value / g.completions)) : '—'}
                              </span>
                            </span>
                          </span>
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty what="goal" query={query} />
          )}
        </div>
      </Card>
    </div>
  );
}
