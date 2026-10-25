import { useState } from 'react';

import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { PAYOUTS, type Payout } from '@/data/deck';
import { cx } from '@/lib/cx';
import { dateLong, usd } from '@/lib/format';

type StateId = 'all' | 'cleared' | 'pending';

const STATES: { id: StateId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cleared', label: 'Cleared' },
  { id: 'pending', label: 'Pending' },
];

/**
 * Every payout, filterable by state and narrowed by the shell's search.
 *
 * The total in the footer is the total of what is *shown*, not of everything —
 * so a filter changes two numbers on screen and the control is visibly doing
 * something on film.
 */
export function PayoutHistory({ query }: { query: string }) {
  const [state, setState] = useState<StateId>('all');

  const q = query.trim().toLowerCase();
  const rows = PAYOUTS.filter((p) => (state === 'all' ? true : p.state === state)).filter((p) =>
    q ? (p.from + ' ' + p.project + ' ' + p.method).toLowerCase().includes(q) : true,
  );
  const total = rows.reduce((t, p) => t + p.amount, 0);

  return (
    <Card pane="payouts" className="col-span-2 min-h-0 p-6 pr-4">
      <CardHead
        title="Payout History"
        action={
          <div
            role="group"
            aria-label="Payout state"
            className="bg-sunken mr-2 flex items-center gap-1 rounded-full p-1"
          >
            {STATES.map((s) => (
              <button
                key={s.id}
                type="button"
                data-state={s.id}
                aria-pressed={state === s.id}
                onClick={() => setState(s.id)}
                className={cx(
                  'h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors',
                  state === s.id
                    ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(18_22_29/0.08)]'
                    : 'text-muted hover:text-ink',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        }
      />

      <div data-scroller="payouts" className="scroll-region mt-3 -mr-2 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center">
            <p className="text-muted m-0 text-[13px]">
              No payout matches <span className="text-ink font-semibold">{query || state}</span>.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((payout, i) => (
              <li key={payout.id} className={cx(i > 0 && 'border-line border-t')}>
                <Row payout={payout} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-2 text-[12.5px]">
        <span className="text-muted">
          {rows.length} of {PAYOUTS.length} payouts
        </span>
        <span className="text-ink font-semibold">{usd(total, true)}</span>
      </div>
    </Card>
  );
}

function Row({ payout }: { payout: Payout }) {
  return (
    <div data-payout={payout.id} className="flex items-center gap-3 py-3 pr-1">
      <Avatar src={payout.face} name={payout.from} size={40} />
      <div className="min-w-0 flex-1">
        <p className="text-ink m-0 truncate text-[13.5px] font-semibold">{payout.from}</p>
        <p className="text-muted m-0 mt-0.5 truncate text-[12.5px]">{payout.project}</p>
      </div>
      <div className="text-muted hidden w-[150px] shrink-0 text-[12.5px] xl:block">
        {payout.method}
      </div>
      <div className="text-muted w-[130px] shrink-0 text-[12.5px]">{dateLong(payout.date)}</div>
      <Badge tone={payout.state === 'cleared' ? 'positive' : 'quiet'}>
        {payout.state === 'cleared' ? 'Cleared' : 'Pending'}
      </Badge>
      <div className="text-ink w-[96px] shrink-0 text-right text-[14px] font-semibold">
        {usd(payout.amount, true)}
      </div>
    </div>
  );
}
