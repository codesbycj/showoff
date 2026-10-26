import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Segmented, Toggle } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { RECURRING, monthlyCost, type Recurring } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type CadenceId = 'all' | Recurring['cadence'];

const CADENCES: { id: CadenceId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Monthly', label: 'Monthly' },
  { id: 'Weekly', label: 'Weekly' },
  { id: 'Yearly', label: 'Yearly' },
];

/**
 * Recurring: what leaves the account on a schedule.
 *
 * The reference has no screen behind its Recurring entry — only a 16 on the
 * sidebar — so this one is built out of what the badge implies. Every figure
 * on it is computed from the switches, so turning one off moves the monthly
 * cost, the yearly cost and the split at once.
 */
export function RecurringPane({ query }: { query: string }) {
  const [cadence, setCadence] = useState<CadenceId>('all');
  const [on, setOn] = useState<Record<string, boolean>>(
    Object.fromEntries(RECURRING.map((r) => [r.id, r.on])),
  );

  const q = query.trim().toLowerCase();
  const rows = RECURRING.filter((r) => (cadence === 'all' ? true : r.cadence === cadence)).filter(
    (r) => (q ? r.label.toLowerCase().includes(q) : true),
  );

  const monthly = monthlyCost(on);
  const active = RECURRING.filter((r) => on[r.id]).length;

  const split = (['Monthly', 'Weekly', 'Yearly'] as const).map((c) => ({
    id: c,
    value: RECURRING.filter((r) => on[r.id] && r.cadence === c).reduce(
      (s, r) => s + (c === 'Weekly' ? r.amount * 4 : c === 'Yearly' ? r.amount / 12 : r.amount),
      0,
    ),
    count: RECURRING.filter((r) => on[r.id] && r.cadence === c).length,
  }));
  const splitMax = Math.max(...split.map((s) => s.value), 1);

  return (
    <div data-pane="recurring" className="grid h-full grid-cols-[1fr_330px] gap-4">
      <Card pane="rules" className="min-h-0 p-4 pr-1.5">
        <CardHead
          className="pr-2.5"
          title={
            <>
              Recurring{' '}
              <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
            </>
          }
          icon={<Icon name="repeat" size={16} />}
          action={
            <Segmented
              name="cadence"
              size="sm"
              value={cadence}
              options={CADENCES}
              onChange={setCadence}
            />
          }
        />

        <div data-scroller="rules" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length === 0 ? (
            <Empty what="recurring payment" query={query || cadence} />
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {rows.map((r) => (
                <li key={r.id}>
                  <div
                    className={cx(
                      'border-line flex items-center gap-3 rounded-[11px] border p-3 transition-colors',
                      on[r.id] ? 'hover:bg-sunken' : 'bg-sunken/60',
                    )}
                  >
                    <Mark name={r.mark} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[13px] font-bold">
                        {r.label}
                      </span>
                      <span className="text-muted block truncate text-[11px]">
                        {r.cadence} · next {r.next}
                      </span>
                    </span>
                    <span
                      className={cx(
                        'tnum shrink-0 text-[13px] font-bold transition-colors',
                        on[r.id] ? 'text-ink' : 'text-muted line-through',
                      )}
                    >
                      {usd(r.amount, true)}
                    </span>
                    <Toggle
                      name={r.id}
                      label={r.label}
                      on={!!on[r.id]}
                      onChange={(next) => setOn((cur) => ({ ...cur, [r.id]: next }))}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="cost" className="shrink-0 p-4">
          <CardHead title="What it costs" icon={<Icon name="dollar" size={16} />} />
          <p className="m-0 mt-3">
            <span className="text-muted block text-[11.5px]">Every month</span>
            <span
              data-figure="monthly"
              className="tnum text-ink mt-1 block text-[28px] leading-none font-extrabold tracking-[-0.03em]"
            >
              {usd(monthly, true)}
            </span>
          </p>
          <p className="m-0 mt-3 flex items-center justify-between gap-2">
            <span className="text-muted text-[11.5px]">Over a year</span>
            <span className="tnum text-ink text-[13px] font-bold">{usd(monthly * 12)}</span>
          </p>
          <p className="m-0 mt-2 flex items-center justify-between gap-2">
            <span className="text-muted text-[11.5px]">Active rules</span>
            <Badge tone="accent">
              {active} of {RECURRING.length}
            </Badge>
          </p>
        </Card>

        <Card pane="split" className="min-h-0 flex-1 p-4">
          <CardHead
            title="By cadence"
            action={<span className="text-muted text-[11.5px]">per month</span>}
          />
          <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
            {split.map((s) => (
              <li key={s.id} data-mark={'cadence-' + s.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-body text-[12px]">
                    {s.id} <span className="text-muted">· {s.count}</span>
                  </span>
                  <span className="tnum text-ink text-[12px] font-bold">{usd(s.value, true)}</span>
                </div>
                <Meter
                  value={(s.value / splitMax) * 100}
                  tone="accent"
                  height={7}
                  className="mt-1.5"
                />
              </li>
            ))}
          </ul>
          <p className="text-muted m-0 mt-2 text-[11px]">
            Weekly counts four times a month; yearly is spread across twelve.
          </p>
        </Card>
      </div>
    </div>
  );
}
