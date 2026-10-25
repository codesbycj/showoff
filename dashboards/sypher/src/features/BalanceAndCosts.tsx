import { useState } from 'react';

import { SignedBars, StackedBar } from '@/charts/Minis';
import { Card, CardHead, Label } from '@/components/Bits';
import { BALANCE, COSTS } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

/** Cash balance over the period, with the running average through it. */
export function BalanceCard() {
  return (
    <Card pane="balance" className="min-h-0 p-4">
      <CardHead
        title="Balance and costs"
        action={
          <span className="text-muted text-[11.5px]">Target &gt;{short(BALANCE.target)}</span>
        }
      />

      <div className="mt-3">
        <Label>Cash balance</Label>
        <p className="text-ink m-0 mt-1 text-[20px] leading-none font-semibold">
          {short(BALANCE.cash)}
        </p>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        <SignedBars bars={BALANCE.bars} height={116} />
      </div>
    </Card>
  );
}

/**
 * Costs by category: one bar to scale, then the lines under it.
 *
 * Hovering either the bar or a line lights both, and the figure at the top
 * becomes that category's — so the segment, the row and the total are the same
 * number three ways rather than three things to reconcile.
 */
export function CostsCard() {
  const [active, setActive] = useState<string | null>(null);
  const total = COSTS.reduce((t, c) => t + c.value, 0);
  const shown = active ? COSTS.find((c) => c.id === active) : null;

  return (
    <Card pane="costs" className="min-h-0 p-4">
      <CardHead
        title="Costs by category"
        action={
          <span data-costs-total className="text-ink text-[13px] font-semibold">
            {shown ? usd(shown.value) : usd(total)}
          </span>
        }
      />

      <div className="mt-3.5">
        <StackedBar lines={COSTS} active={active} onHover={setActive} />
      </div>

      <ul
        data-scroller="costs"
        className="scroll-region m-0 mt-2.5 -mr-1 flex min-h-0 flex-1 list-none flex-col p-0 pr-1"
      >
        {COSTS.map((line) => (
          <li key={line.id}>
            <button
              type="button"
              data-cost={line.id}
              onMouseEnter={() => setActive(line.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(line.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((cur) => (cur === line.id ? null : line.id))}
              aria-pressed={active === line.id}
              className={cx(
                'flex w-full items-center gap-2 rounded px-1.5 py-[3px] text-left transition-colors',
                active === line.id ? 'bg-sunken' : 'hover:bg-sunken/60',
              )}
            >
              <span
                aria-hidden="true"
                style={{ background: line.colour }}
                className="h-2 w-2 shrink-0 rounded-full"
              />
              <span className="text-body min-w-0 flex-1 truncate text-[12px]">{line.label}</span>
              <span className="text-ink shrink-0 text-[12px] font-medium">{short(line.value)}</span>
              <span className="text-muted w-8 shrink-0 text-right text-[11.5px]">
                {line.share}%
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
