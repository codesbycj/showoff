import { useState } from 'react';

import { Badge, Card, CardHead } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { CARDS, LIMIT, type PayCard } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * The monthly spending limit.
 *
 * The reference draws the bar and the two figures and leaves the reader to do
 * the division; the line under it says what the bar means, and the bar turns
 * amber past three quarters — because the only reason to draw a limit is to
 * notice approaching it.
 */
export function SpendingLimit() {
  const share = (LIMIT.spent / LIMIT.of) * 100;
  const near = share >= 75;

  return (
    <Card pane="limit" className="shrink-0 p-5">
      <CardHead title="Monthly Spending Limit" />

      <div className="bg-sunken mt-4 flex h-3 overflow-hidden rounded-full">
        <span
          data-limit-bar
          style={{ width: share + '%' }}
          className={cx(
            'block h-full rounded-full transition-[width] duration-500',
            near ? 'bg-warn' : 'bg-accent',
          )}
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="text-ink m-0 text-[15px] font-extrabold">
          {usd(LIMIT.spent, true)}{' '}
          <span className="text-muted text-[12px] font-semibold">spent out of</span>
        </p>
        <p className="text-ink m-0 text-[15px] font-extrabold">{usd(LIMIT.of, true)}</p>
      </div>

      <p className="text-muted m-0 mt-1.5 text-[11.5px]">
        {Math.round(share)}% of the limit, with {usd(LIMIT.of - LIMIT.spent)} left this month.
      </p>
    </Card>
  );
}

/**
 * The cards.
 *
 * Both are drawn — a payment card is a small object and exactly what is in
 * drawing range — and the numbers are masked to four digits, because a build
 * with invented copy should not show something shaped like a real card number.
 * Revealing is a real toggle, and it reveals an obviously invented number.
 */
export function MyCards() {
  const [shown, setShown] = useState<string | null>(null);

  return (
    <Card pane="cards" className="min-h-0 p-5">
      <CardHead
        title="My Cards"
        action={
          <button
            type="button"
            data-add-card
            className="border-line text-ink hover:bg-sunken flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] font-bold transition-colors"
          >
            <Icon name="plus" size={13} />
            Add new
          </button>
        }
      />

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3">
        {CARDS.map((card) => (
          <CardArt
            key={card.id}
            card={card}
            revealed={shown === card.id}
            onToggle={() => setShown((cur) => (cur === card.id ? null : card.id))}
          />
        ))}
      </div>
    </Card>
  );
}

function CardArt({
  card,
  revealed,
  onToggle,
}: {
  card: PayCard;
  revealed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      data-card-art={card.id}
      onClick={onToggle}
      aria-pressed={revealed}
      aria-label={(revealed ? 'Hide' : 'Show') + ' the ' + card.label + ' card number'}
      className={cx(
        'relative flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl p-3 text-left transition-transform',
        card.tone === 'ink' ? 'bg-fill text-fill-fg' : 'bg-accent-strong text-white',
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-white/10"
      />

      <span className="relative flex items-start justify-between gap-2">
        <Badge tone="quiet" dot className="bg-white/20 text-white">
          {card.active ? 'Active' : 'Frozen'}
        </Badge>
        <span aria-hidden="true" className="flex -space-x-1.5">
          <span className="h-4 w-4 rounded-full bg-white/70" />
          <span className="h-4 w-4 rounded-full bg-white/40" />
        </span>
      </span>

      <span className="relative block">
        <span
          className={cx('block text-[11px]', card.tone === 'ink' ? 'opacity-70' : 'opacity-95')}
        >
          {card.label}
        </span>
        <span className="mt-0.5 block text-[12px] font-bold tracking-[0.05em] whitespace-nowrap">
          {revealed ? '4921 ' + card.last4 : '•••• ' + card.last4}
        </span>
        <span
          className={cx(
            'mt-1.5 flex items-center gap-3 text-[10px]',
            card.tone === 'ink' ? 'opacity-70' : 'opacity-95',
          )}
        >
          <span>EXP {card.expires}</span>
          <span>CVV {revealed ? card.cvv : '•••'}</span>
        </span>
      </span>
    </button>
  );
}
