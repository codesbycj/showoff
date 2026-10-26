import { useState } from 'react';

import { Card, CardHead, Meter } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { GOALS, type Currency } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

/** Savings goals. Each row opens for what is left and when it is due. */
export function GoalsCard({ currency }: { currency: Currency }) {
  const [open, setOpen] = useState<string | null>(GOALS[0].id);

  return (
    <Card pane="goals" className="min-h-0 p-5">
      <CardHead
        title="Goals"
        icon={<Icon name="goal" size={16} />}
        action={<IconButton icon="plus" label="Add a goal" />}
      />

      <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-center gap-2 p-0">
        {GOALS.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          const isOpen = open === g.id;
          return (
            <li key={g.id}>
              <button
                type="button"
                data-goal={g.id}
                aria-expanded={isOpen}
                onClick={() => setOpen((cur) => (cur === g.id ? null : g.id))}
                className={cx(
                  'w-full rounded-2xl p-3 text-left transition-colors',
                  isOpen ? 'bg-sunken' : 'hover:bg-sunken/70',
                )}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-ink truncate text-[13px] font-semibold">{g.label}</span>
                  <span className="tnum text-ink shrink-0 text-[12.5px] font-semibold">{pct}%</span>
                </span>
                <Meter value={pct} tone="accent" height={8} className="mt-2" />
                <span className="text-muted mt-1.5 flex items-baseline justify-between gap-3 text-[11.5px]">
                  <span className="tnum">
                    {money(g.saved, currency, false)} of {money(g.target, currency, false)}
                  </span>
                  <span>{g.due}</span>
                </span>
                {isOpen ? (
                  <span className="text-body tnum mt-2 block text-[11.5px]">
                    {money(g.target - g.saved, currency, false)} left to put away.
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
