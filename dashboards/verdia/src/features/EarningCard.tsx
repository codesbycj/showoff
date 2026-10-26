import { useState } from 'react';

import { Card, CardHead, Delta, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { EARNING, earningTotal, type Currency } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

/**
 * Earning, by source.
 *
 * The reference's headline is $7,110.12 over four sources that total
 * $7,821.01 — and its "51%" pill is 4,000/7,821.01, so the parts are right and
 * the headline is not. Keeping the parts is what keeps the 51% true, so the
 * total is computed here and the headline follows it.
 *
 * Each bar is a chart mark: hovering one names its share, which is what the
 * single pinned "51%" in the reference is doing for one row only.
 */
export function EarningCard({ currency }: { currency: Currency }) {
  const [periodId, setPeriodId] = useState(EARNING[0].id);
  const [hover, setHover] = useState<string | null>(null);

  const period = EARNING.find((p) => p.id === periodId) ?? EARNING[0];
  const total = earningTotal(period);
  const max = Math.max(...period.sources.map((s) => s.amount));
  const toGoal = Math.round(Math.min(100, (total / period.goal) * 100));

  return (
    <Card pane="earning" className="min-h-0 p-5">
      <CardHead
        title="Earning"
        icon={<Icon name="wallet" size={16} />}
        action={
          <div className="text-right">
            <p className="m-0 flex items-center justify-end gap-1.5">
              <Icon name="target" size={14} className="text-goal" />
              <span className="tnum text-ink text-[13px] font-semibold">
                {money(period.goal, currency, false)}
              </span>
            </p>
            <Meter value={toGoal} tone="goal" height={4} className="mt-1.5 w-[64px]" />
          </div>
        }
      />

      <div className="mt-4">
        <p
          data-figure="earning-total"
          className="tnum text-ink m-0 text-[33px] leading-none font-semibold tracking-[-0.03em]"
        >
          {money(total, currency)}
        </p>
        <p className="m-0 mt-2 flex items-center gap-2">
          <Delta value={period.delta} />
          <span className="text-muted text-[12px]">vs last period</span>
        </p>
      </div>

      <Segmented
        name="period"
        size="sm"
        className="mt-3 self-start"
        value={periodId}
        options={EARNING.map((p) => ({ id: p.id, label: p.label }))}
        onChange={setPeriodId}
      />

      <ul className="m-0 mt-4 flex min-h-0 flex-1 list-none flex-col justify-end gap-3 p-0">
        {period.sources.map((s) => {
          const share = Math.round((s.amount / total) * 100);
          return (
            <li key={s.id} className="relative">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={cx(
                    'text-[12.5px] transition-colors',
                    hover === s.id ? 'text-ink font-semibold' : 'text-body',
                  )}
                >
                  {s.label}
                </span>
                <span className="tnum text-ink text-[12.5px] font-semibold">
                  {money(s.amount, currency)}
                </span>
              </div>

              <div
                data-mark={s.id}
                className="relative mt-1.5 cursor-pointer py-1"
                onPointerEnter={() => setHover(s.id)}
                onPointerLeave={() => setHover((cur) => (cur === s.id ? null : cur))}
              >
                <Meter
                  value={(s.amount / max) * 100}
                  tone={hover === s.id ? 'fill' : 'accent'}
                  height={9}
                >
                  {/*
                    The share pill. The reference pins it to salary with no way
                    to see any other source's share; here it rides whichever bar
                    is hovered, and falls back to salary at rest so the card
                    still reads the way the picture does.
                  */}
                  {hover === s.id || (hover === null && s.id === 'salary') ? (
                    <span
                      style={{ left: `calc(${(s.amount / max) * 100}% - 22px)` }}
                      className="bg-fill text-fill-fg tnum absolute -top-[4px] rounded-full px-2 py-[1px] text-[11px] font-semibold"
                    >
                      {share}%
                    </span>
                  ) : null}
                </Meter>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
