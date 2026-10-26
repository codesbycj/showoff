import { useState } from 'react';

import { Donut } from '@/charts/Donut';
import { Badge, Card, CardHead } from '@/components/Bits';
import { SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { CATEGORIES, MONTHS, spendDelta, spendTotal, type Currency } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

/**
 * Spending by category.
 *
 * The reference's four categories total $917.02 under a headline of $916.10.
 * Here the headline is the sum, always, because a card whose parts do not make
 * its total is the kind of thing a viewer notices on a 4K screen and nobody
 * notices while building.
 *
 * The legend is interactive: a category isolates in the ring. Two of the
 * reference's four legend entries are greyed with nothing to explain it —
 * reading that as a selection state is the only reading that makes it a
 * control rather than a mistake.
 */
export function SpendingCard({ currency }: { currency: Currency }) {
  const [monthIdx, setMonthIdx] = useState(MONTHS.length - 2); // April
  const [active, setActive] = useState<string | null>(null);

  const month = MONTHS[monthIdx];
  const total = spendTotal(month);
  const delta = spendDelta(monthIdx);
  const mover = CATEGORIES.find((c) => c.id === month.moverId);

  const slices = CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    value: month.spend[c.id] ?? 0,
    token: c.token,
  }));

  return (
    <Card pane="spending" className="min-h-0 p-5">
      <CardHead
        title="Spending"
        icon={<Icon name="bag" size={16} />}
        action={
          <SelectPill
            name="month"
            value={month.id}
            options={MONTHS.map((m) => ({ id: m.id, label: m.label }))}
            onChange={(id) => setMonthIdx(MONTHS.findIndex((m) => m.id === id))}
          />
        }
      />

      <div className="mt-2 flex min-h-0 flex-1 flex-col items-center justify-center">
        <Donut
          slices={slices}
          active={active}
          onActive={setActive}
          center={
            <div>
              <p
                data-figure="spend-total"
                className="tnum text-ink m-0 text-[25px] leading-none font-semibold tracking-[-0.03em]"
              >
                {money(active ? (month.spend[active] ?? 0) : total, currency)}
              </p>
              <p
                className={cx(
                  'tnum m-0 mt-1 text-[12.5px] font-semibold',
                  delta >= 0 ? 'text-danger' : 'text-positive',
                )}
              >
                {active
                  ? CATEGORIES.find((c) => c.id === active)?.label
                  : (delta >= 0 ? '+' : '') + delta + '%'}
              </p>
            </div>
          }
        />

        <Badge tone="accent" className="mt-3 gap-1.5">
          <Icon name="sparkle" size={13} />
          {mover?.label} spending is {month.moverPct >= 0 ? 'up' : 'down'}{' '}
          {Math.abs(month.moverPct)}%
        </Badge>
      </div>

      <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-x-3 gap-y-2 p-0">
        {slices.map((s) => {
          const dim = active !== null && active !== s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                data-legend={s.id}
                aria-pressed={active === s.id}
                onClick={() => setActive((cur) => (cur === s.id ? null : s.id))}
                /*
                 * Click only. An `onPointerEnter` that also set the category
                 * made the click un-pinnable: the pointer arrives, sets it,
                 * and the click that follows immediately toggles it back off —
                 * so the control could never isolate anything. The numeric
                 * diff is what found it, at 11 changed pixels on a beat that
                 * should have redrawn the ring.
                 */
                className={cx(
                  'flex h-8 w-full items-center gap-2 rounded-lg px-1.5 text-left transition-opacity duration-150',
                  dim ? 'opacity-45' : 'opacity-100',
                  active === s.id ? 'bg-sunken' : 'hover:bg-sunken',
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ background: `var(${s.token})` }}
                  className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                />
                <span className="text-body min-w-0 flex-1 truncate text-[12.5px]">{s.label}</span>
                <span className="tnum text-ink shrink-0 text-[12.5px] font-semibold">
                  {money(s.value, currency)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
