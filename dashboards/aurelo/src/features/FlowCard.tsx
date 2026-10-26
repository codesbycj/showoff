import { useState } from 'react';

import { Card, CardHead } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { flow } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * Expenses & Income.
 *
 * The reference prints 60% / 40% over two bars that are nothing like 60:40.
 * Both numbers are the ledger here, so the split and the bars are the same
 * fact told twice — and hovering either one swaps the share for the amount.
 */
export function FlowCard() {
  const [hover, setHover] = useState<'expense' | 'income' | null>(null);
  const f = flow();

  const sides = [
    { id: 'expense' as const, label: 'Expenses', share: f.expenseShare, amount: f.expense },
    { id: 'income' as const, label: 'Income', share: f.incomeShare, amount: f.income },
  ];

  return (
    <Card pane="flow" className="min-h-0 flex-1 p-5">
      <CardHead
        title="Expenses & Income"
        action={<IconButton icon="dots-v" label="Flow options" />}
      />

      <div className="my-auto grid grid-cols-2 gap-5 pt-4">
        {sides.map((s) => (
          <div
            key={s.id}
            data-mark={s.id}
            onPointerEnter={() => setHover(s.id)}
            onPointerLeave={() => setHover((cur) => (cur === s.id ? null : cur))}
            className="cursor-pointer"
          >
            <p
              className={cx(
                'tnum m-0 text-[30px] leading-none font-bold tracking-[-0.03em] transition-colors',
                hover === s.id ? 'text-accent-deep' : 'text-ink',
              )}
            >
              {hover === s.id ? usd(s.amount) : s.share + '%'}
            </p>
            <p className="text-muted m-0 mt-1.5 text-[12.5px]">{s.label}</p>
            <span
              style={{ width: s.share + '%' }}
              className={cx(
                'mt-3 block h-3 min-w-[12%] rounded-full transition-[width,background-color] duration-300',
                s.id === 'expense' ? 'bg-accent' : 'bg-accent-soft',
                hover === s.id && 'bg-accent-deep',
              )}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
