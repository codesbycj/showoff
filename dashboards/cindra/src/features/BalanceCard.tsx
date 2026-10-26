import { useState } from 'react';

import { Icon } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * The dark green balance card.
 *
 * A payment card is interface, so it is drawn (rule 8). The reference prints a
 * live CVV in plain sight, which no real product does and no screenshot
 * should — it is masked here, with a control to reveal it, which is both the
 * honest behaviour and one more thing the take can do.
 */
export function BalanceCard() {
  const [shown, setShown] = useState(false);

  return (
    <section
      data-card="balance"
      className="bg-forest relative shrink-0 overflow-hidden rounded-[var(--radius-card)] p-4"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 260 150"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <circle cx="232" cy="136" r="74" fill="var(--color-accent)" opacity="0.1" />
        <circle cx="258" cy="24" r="46" fill="var(--color-accent)" opacity="0.07" />
      </svg>

      <div className="relative flex items-start justify-between">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <ellipse cx="9" cy="9" rx="6.5" ry="4.2" fill="var(--color-accent)" />
          <ellipse cx="15" cy="15" rx="6.5" ry="4.2" fill="var(--color-forest-fg)" opacity="0.65" />
        </svg>
        <Icon name="wifi" size={18} className="text-forest-fg/80 rotate-90" />
      </div>

      <p className="text-forest-fg relative m-0 mt-5 text-[15px] font-bold">{ACCOUNT.holder}</p>

      <div className="relative mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-forest-fg/70 m-0 text-[10.5px]">Balance Amount</p>
          <p className="tnum text-forest-fg m-0 mt-0.5 text-[19px] leading-none font-extrabold tracking-[-0.02em]">
            {usd(ACCOUNT.balance)}
          </p>
        </div>

        <div className="flex shrink-0 items-end gap-3">
          <div>
            <p className="text-forest-fg/70 m-0 text-[10px]">EXP</p>
            <p className="tnum text-forest-fg m-0 text-[12px] font-bold">{ACCOUNT.cardExpiry}</p>
          </div>
          <div>
            <p className="text-forest-fg/70 m-0 text-[10px]">CVV</p>
            <p className="tnum text-forest-fg m-0 text-[12px] font-bold">
              {shown ? ACCOUNT.cardCvv : '•••'}
            </p>
          </div>
          <button
            type="button"
            data-action="cvv"
            aria-pressed={shown}
            aria-label={shown ? 'Hide security code' : 'Show security code'}
            onClick={() => setShown((v) => !v)}
            className={cx(
              'text-forest-fg grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors',
              shown ? 'bg-accent text-forest-deep' : 'bg-white/15 hover:bg-white/25',
            )}
          >
            <Icon name={shown ? 'close' : 'lock'} size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
