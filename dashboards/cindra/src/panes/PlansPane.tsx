import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Badge, Card, CardHead, Meter } from '@/components/Bits';
import { Button, Segmented, Toggle } from '@/components/Controls';
import { Icon, type IconName } from '@/components/Icon';
import { PLANS, RULES, planTotal, planTrail, type Plan } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const GLYPH: Record<Plan['icon'], IconName> = {
  shield: 'shield',
  palm: 'palm',
  house: 'house',
  car: 'car',
};

const TOP_UPS = [50, 100, 250, 500];

const MONTH_TICKS = ['Jan', 'Apr', 'Jul', 'Oct', 'Dec'];

/**
 * Saving Plans in full: pick one, watch it fill, put money into it.
 *
 * The reference has no screen behind its Saving Plans card, so this one is
 * built out of what the card implies — a year of contributions, what is left,
 * and a way to add to it.
 */
export function PlansPane({ query }: { query: string }) {
  const [planId, setPlanId] = useState(PLANS[0].id);
  const [topUp, setTopUp] = useState(TOP_UPS[1]);
  const [added, setAdded] = useState(0);
  const [rules, setRules] = useState<Record<string, boolean>>(
    Object.fromEntries(RULES.map((r) => [r.id, r.on])),
  );

  const q = query.trim().toLowerCase();
  const list = PLANS.filter((p) => (q ? p.label.toLowerCase().includes(q) : true));
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const trail = useMemo(() => planTrail(plan.id), [plan.id]);

  const saved = plan.saved + added;
  const pct = Math.round((saved / plan.target) * 1000) / 10;

  return (
    <div data-pane="plans" className="grid h-full grid-cols-[320px_1fr] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="plan-list" className="min-h-0 shrink-0 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title="Your plans"
            action={
              <span className="tnum text-ink text-[12.5px] font-bold">
                {usd(planTotal() + added)}
              </span>
            }
          />

          <div data-scroller="plan-list" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {list.length === 0 ? (
              <p className="text-muted m-0 px-1 py-6 text-center text-[12.5px]">
                No plan matches <span className="text-ink font-bold">{query}</span>.
              </p>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {list.map((p) => {
                  const on = p.id === planId;
                  const amount = p.id === plan.id ? saved : p.saved;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        data-plan={p.id}
                        aria-pressed={on}
                        onClick={() => {
                          setPlanId(p.id);
                          setAdded(0);
                        }}
                        className={cx(
                          'w-full rounded-[11px] border p-3 text-left transition-colors',
                          on ? 'border-forest bg-sunken' : 'border-line hover:bg-sunken/70',
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={cx(
                              'grid h-9 w-9 shrink-0 place-items-center rounded-[10px]',
                              on ? 'bg-forest text-forest-fg' : 'bg-sunken-deep text-forest',
                            )}
                          >
                            <Icon name={GLYPH[p.icon]} size={17} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="text-ink block truncate text-[13px] font-bold">
                              {p.label}
                            </span>
                            <span className="tnum text-muted block text-[11px]">
                              {usd(amount)} of {usd(p.target)}
                            </span>
                          </span>
                          <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">
                            {Math.round((amount / p.target) * 100)}%
                          </span>
                        </span>
                        <Meter
                          value={(amount / p.target) * 100}
                          tone="accent"
                          height={7}
                          className="mt-2.5"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>

        {/*
        The list is four plans tall and the column is 790px, which left a
        400px band of empty card under it. Auto-save is what the plans
        actually run on, so it goes in the gap rather than padding filling it.
      */}
        <Card pane="rules" className="min-h-0 flex-1 p-4">
          <CardHead
            title="Auto-save"
            action={
              <span className="text-muted text-[11.5px]">
                {RULES.filter((r) => rules[r.id]).length} of {RULES.length} on
              </span>
            }
          />
          <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-1 p-0">
            {RULES.map((r) => (
              <li key={r.id}>
                <div className="hover:bg-sunken/70 flex items-center gap-3 rounded-[10px] p-2.5 transition-colors">
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[12.5px] font-bold">
                      {r.label}
                    </span>
                    <span className="text-muted block truncate text-[11px]">{r.note}</span>
                  </span>
                  <Toggle
                    name={r.id}
                    label={r.label}
                    on={!!rules[r.id]}
                    onChange={(nextOn) => setRules((cur) => ({ ...cur, [r.id]: nextOn }))}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="plan-detail" className="min-h-0 flex-[1.4] p-4">
          <CardHead
            title={plan.label}
            icon={<Icon name={GLYPH[plan.icon]} size={16} />}
            action={
              <Badge tone={pct >= 100 ? 'positive' : 'accent'}>
                {pct >= 100 ? 'Target reached' : `${pct}% of target`}
              </Badge>
            }
          />

          <p className="m-0 mt-3 flex flex-wrap items-baseline gap-3">
            <span
              data-figure="plan-saved"
              className="tnum text-ink text-[30px] leading-none font-extrabold tracking-[-0.03em]"
            >
              {usd(saved)}
            </span>
            <span className="tnum text-muted text-[12.5px]">
              of {usd(plan.target)} · {usd(Math.max(0, plan.target - saved))} to go
            </span>
          </p>

          <Meter value={pct} tone="accent" height={10} className="mt-3 mb-2" />

          <AreaChart
            values={trail}
            ticks={MONTH_TICKS}
            format={(n) => usd(n)}
            label={`${plan.label} over the year, ending at ${usd(plan.saved)}`}
          />
        </Card>

        <Card pane="topup" className="shrink-0 p-4">
          <CardHead title="Add to this plan" />
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <Segmented
              name="topup"
              size="sm"
              value={String(topUp)}
              options={TOP_UPS.map((a) => ({ id: String(a), label: usd(a) }))}
              onChange={(id) => setTopUp(Number(id))}
            />
            <Button
              icon="plus"
              variant="forest"
              name="topup"
              onClick={() => setAdded((v) => v + topUp)}
            >
              Add {usd(topUp)}
            </Button>
            {added > 0 ? (
              <Button variant="outline" name="undo" onClick={() => setAdded(0)}>
                Undo
              </Button>
            ) : null}
          </div>
          <p data-topup-note className="text-muted m-0 mt-3 text-[12px]">
            {added > 0
              ? `${usd(added)} added to ${plan.label} this session.`
              : `Adding to ${plan.label}, from the Everyday account.`}
          </p>
        </Card>
      </div>
    </div>
  );
}
