import { useState } from 'react';

import { Donut } from '@/charts/Donut';
import { Card, CardHead } from '@/components/Bits';
import { SelectPill } from '@/components/Controls';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, SPANS, catTotal, type Category } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * The Statistic ring, with its Income / Expense pair above it.
 *
 * Both sides are real: the ring, the headline and the legend all redraw when
 * the tab changes, and the span control scales the figures so the card is not
 * showing the same month under three different labels.
 */
export function StatisticCard() {
  const [side, setSide] = useState<'income' | 'expense'>('expense');
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const [active, setActive] = useState<string | null>(null);

  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const scaleOf = (c: Category) => ({ ...c, amount: Math.round(c.amount * span.scale) });
  const income = INCOME_CATEGORIES.map(scaleOf);
  const expense = EXPENSE_CATEGORIES.map(scaleOf);
  const rows = side === 'income' ? income : expense;
  const total = catTotal(rows);
  const current = rows.find((r) => r.id === active);

  return (
    <Card pane="statistic" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Statistic"
        action={
          <SelectPill
            name="span"
            value={spanId}
            options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
            onChange={setSpanId}
          />
        }
      />

      <div role="tablist" aria-label="Income or expense" className="border-line mt-3 flex border-b">
        {(['income', 'expense'] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            data-side={id}
            aria-selected={side === id}
            onClick={() => {
              setSide(id);
              setActive(null);
            }}
            className={cx(
              'flex-1 pb-2 text-[12px] font-bold transition-colors',
              side === id
                ? 'text-ink border-forest -mb-px border-b-2'
                : 'text-muted hover:text-ink',
            )}
          >
            {id === 'income' ? 'Income' : 'Expense'}{' '}
            <span className="tnum font-semibold">
              ({usd(catTotal(id === 'income' ? income : expense))})
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex shrink-0 justify-center">
        <Donut
          slices={rows.map((r) => ({
            id: r.id,
            label: r.label,
            value: r.amount,
            token: r.token,
          }))}
          size={128}
          thickness={19}
          sweep={360}
          from={-90}
          active={active}
          onActive={setActive}
          center={
            <div>
              <p className="text-muted m-0 text-[10.5px]">
                {current ? current.label : side === 'income' ? 'Total Income' : 'Total Expense'}
              </p>
              <p className="tnum text-ink m-0 mt-1 text-[18px] leading-none font-extrabold tracking-[-0.02em]">
                {usd(current ? current.amount : total)}
              </p>
            </div>
          }
        />
      </div>

      <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-0.5 p-0">
        {rows.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              data-legend={r.id}
              aria-pressed={active === r.id}
              onClick={() => setActive(active === r.id ? null : r.id)}
              className={cx(
                'flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-opacity',
                active !== null && active !== r.id ? 'opacity-45' : 'opacity-100',
                active === r.id ? 'bg-sunken' : 'hover:bg-sunken',
              )}
            >
              <span
                style={{ background: `var(${r.token})` }}
                className={cx(
                  'grid h-[22px] shrink-0 place-items-center rounded-full px-1.5 text-[10px] font-bold',
                  r.fg === 'light' ? 'text-white' : 'text-ink',
                )}
              >
                {Math.round((r.amount / total) * 100)}%
              </span>
              <span className="text-body min-w-0 flex-1 truncate text-[12px]">{r.label}</span>
              <span className="tnum text-ink shrink-0 text-[12px] font-bold">{usd(r.amount)}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
